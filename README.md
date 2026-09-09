# AI-Powered Autonomous SOC Analyst Agent

## Case Study
**"Design and Deployment of a Highly Available, Multi-Tier Cloud-Native Application using the AWS Well-Architected Framework"**

A B.Tech Cloud Computing case study documenting the deployment of a highly available AWS prototype for the AI-Powered Autonomous SOC Analyst Agent, and its evaluation against all six pillars of the AWS Well-Architected Framework.

> **Scope note:** This repository's AWS deployment is an infrastructure prototype focused on networking, load balancing, and Auto Scaling. It intentionally does **not** deploy the full application stack (frontend, backend, database, cache) described below — see [Current Limitations](#current-limitations).

---

## Overview

The AI-Powered Autonomous SOC Analyst Agent is a Security Operations Center (SOC) assistant application that supports CVE/vulnerability ingestion, security-intelligence processing, exploit-intelligence correlation, and AI-assisted analysis through an agent-based workflow, with real-time updates over WebSockets.

**Original application architecture:**

| Layer | Technologies |
|---|---|
| Frontend | Next.js 16, React 19, TypeScript, Tailwind CSS, Three.js / React Three Fiber, GSAP, Clerk (auth) |
| Backend | FastAPI, Python 3.12, WebSockets, LangGraph-based agent workflow |
| Data | PostgreSQL 16, Redis 7 |
| Local orchestration | Docker / Docker Compose |

For this case study, the AWS deployment is deliberately simplified to a lightweight demonstration HTTP service so the exercise can focus on the AWS Well-Architected infrastructure layer rather than a full production rollout.

---

## Architecture

**Deployed (verified) architecture — ap-south-1 (Mumbai):**

```
                              INTERNET
                                 |
                                 v
                  +----------------------------+
                  |  Application Load Balancer |
                  |  soc-alb | Internet-facing  |
                  |  Listener: HTTP :80         |
                  +--------------+-------------+
                                 |
                                 v
                  +----------------------------+
                  |  Target Group               |
                  |  soc-target-group | HTTP:8000|
                  +--------------+-------------+
                                 |
                +----------------+----------------+
                |                                 |
                v                                 v
     +---------------------+          +---------------------+
     | EC2 Instance        |          | EC2 Instance        |
     | ap-south-1a         |          | ap-south-1b         |
     | soc-ec2-sg  :8000   |          | soc-ec2-sg  :8000   |
     +---------------------+          +---------------------+
                ^                                 ^
                |                                 |
                +----------------+----------------+
                                 |
                     Auto Scaling Group: soc-asg
                     Min = 2 | Desired = 2 | Max = 3
                     Launch Template: soc-launch-template (t3.micro)

     All resources inside VPC: soc-vpc (12.0.0.0/16)
     Subnets: 12.0.1.0/24 (ap-south-1a) - 12.0.2.0/24 (ap-south-1b)
     Internet Gateway: soc-igw
```

*No database tier is deployed in this prototype.* See [Current Limitations](#current-limitations) and [Proposed Production Architecture](#proposed-production-architecture).

---

## AWS Services

| Component | AWS Service | Configuration | Purpose |
|---|---|---|---|
| VPC | Amazon VPC | 12.0.0.0/16 | Network isolation |
| Subnets | Amazon VPC | 12.0.1.0/24 and 12.0.2.0/24 | Multi-AZ networking |
| Internet Gateway | Amazon VPC | soc-igw | Internet connectivity |
| Security Groups | EC2 / VPC | soc-ec2-sg, soc-alb-sg | Network access control |
| Launch Template | EC2 | t3.micro, Amazon Linux 2023 | Standardized instance launch |
| Auto Scaling Group | EC2 | Min 2, Desired 2, Max 3 | High availability and scaling |
| Target Group | Elastic Load Balancing | HTTP :8000 | Instance registration and health checks |
| Application Load Balancer | Elastic Load Balancing | Internet-facing, HTTP :80 | Traffic distribution |
| EC2 Instances | Amazon EC2 | Amazon Linux 2023, t3.micro | Application compute |

PostgreSQL and Redis are part of the original application design but were **not** deployed as AWS managed services (RDS / ElastiCache) in this prototype.

---

## Network Architecture

- **VPC:** `soc-vpc` — `12.0.0.0/16`
- **Public Subnet A:** `soc-public-subnet-a` — `12.0.1.0/24` — `ap-south-1a`
- **Public Subnet B:** `soc-public-subnet-b` — `12.0.2.0/24` — `ap-south-1b`
- **Internet Gateway:** `soc-igw`, attached to `soc-vpc`
- **Route table:** both public subnets route `0.0.0.0/0` to the Internet Gateway
- **Security Groups:** `soc-ec2-sg` (EC2 instances), `soc-alb-sg` (load balancer)

---

## High Availability

- Two Availability Zones (`ap-south-1a`, `ap-south-1b`) in use for the application tier.
- Two EC2 instances run behind the ALB at all times, one per AZ.
- The Target Group performs health checks on port 8000 and only routes to healthy instances.
- **Verified:** after a troubleshooting fix (see [Troubleshooting](#troubleshooting)), the Target Group showed **2/2 healthy targets**, one in each AZ, and the ALB successfully served the application.

## Auto Scaling

- **Auto Scaling Group:** `soc-asg`
- **Min:** 2 | **Desired:** 2 | **Max:** 3
- **Launch Template:** `soc-launch-template` (t3.micro, Amazon Linux 2023, key pair `soc-key`)
- An **Instance Refresh** was used during troubleshooting to roll out a corrected Launch Template version across the fleet, replacing misconfigured instances automatically.

## Load Balancing

- **Application Load Balancer:** `soc-alb` — Internet-facing, IPv4
- **Listener:** HTTP :80 → forwards to `soc-target-group`
- **Target Group:** `soc-target-group` — HTTP :8000, target type Instance

## Security

- Dedicated VPC isolation rather than the account's default VPC.
- Security groups scope traffic separately for the load balancer (`soc-alb-sg`) and EC2 instances (`soc-ec2-sg`).
- The ALB is the sole public entry point to the application tier.
- **Not yet implemented in this prototype:** private subnets for compute/data, IAM roles, Secrets Manager / Parameter Store, HTTPS/TLS. See [Current Limitations](#current-limitations).

---

## Deployment

1. Create VPC `soc-vpc` (`12.0.0.0/16`).
2. Create public subnets `soc-public-subnet-a` (`12.0.1.0/24`, ap-south-1a) and `soc-public-subnet-b` (`12.0.2.0/24`, ap-south-1b).
3. Create and attach Internet Gateway `soc-igw`.
4. Associate both subnets with a route table containing `0.0.0.0/0` to `soc-igw`.
5. Create security groups `soc-ec2-sg` and `soc-alb-sg`.
6. Create Launch Template `soc-launch-template` (Amazon Linux 2023, t3.micro, 8 GiB root volume, key pair `soc-key`) with a startup script that runs a lightweight Python HTTP server on `0.0.0.0:8000`.
7. Create Target Group `soc-target-group` (Instance target type, HTTP, port 8000).
8. Create Auto Scaling Group `soc-asg` (Min 2 / Desired 2 / Max 3, spanning both AZs) attached to the Target Group.
9. Create internet-facing Application Load Balancer `soc-alb` with an HTTP :80 listener forwarding to `soc-target-group`.

> The Python HTTP server in Step 6 is a deployment demonstration used to validate the infrastructure. It is **not** the full production SOC Analyst application described under [Overview](#overview).

## Testing

| Test | Expected Result | Actual Result | Status |
|---|---|---|---|
| ALB accessibility | Application page loads | Application page successfully loaded | PASS |
| Target health | Healthy EC2 targets registered | 2 healthy targets | PASS |
| Multi-AZ deployment | Targets distributed across two AZs | Targets in ap-south-1a and ap-south-1b | PASS |
| ASG integration | Instances managed by the ASG | 2 instances managed by `soc-asg` | PASS |
| HTTP listener | ALB accepts HTTP :80 and forwards correctly | HTTP :80 listener forwards to `soc-target-group` | PASS |

No load test, chaos/failure-injection test, or security penetration test was performed — these are listed under [Future Enhancements](#future-enhancements).

---

## Well-Architected Framework

| Pillar | Status | Primary Gap |
|---|---|---|
| Operational Excellence | Partially addressed | No CloudWatch monitoring/logging configured |
| Security | Partially addressed | Public-subnet-only design; no IAM roles / Secrets Manager |
| Reliability | **Strongly addressed** | No backup/DR for a data tier (none deployed yet) |
| Performance Efficiency | Partially addressed | No performance metrics or load testing performed |
| Cost Optimization | Partially addressed | No automated cost tracking/alarms configured |
| Sustainability | Partially addressed | Right-sizing is fixed, not data-driven yet |

A full pillar-by-pillar analysis (objective, current implementation, evidence, benefits, limitations, and recommended improvements) is provided in `Case_Study_Report.pdf`.

---

## Current Limitations

- **No database tier is deployed.** PostgreSQL and Redis are part of the application's conceptual architecture but were not provisioned as Amazon RDS / Amazon ElastiCache in this prototype.
- EC2 instances run in **public subnets**, not private subnets behind a NAT Gateway.
- **No HTTPS/TLS** — the ALB listener is HTTP-only; no Route 53 domain or ACM certificate is configured.
- **No centralized monitoring** (CloudWatch dashboards, alarms, log aggregation) is set up.
- The prototype is **EC2-based**, not container-native (no ECS/Fargate deployment).
- **Single-region** deployment with no cross-region disaster recovery.

To maintain scope and deployment simplicity, the implemented prototype focuses on the highly available application tier. A private database tier is proposed as the next production enhancement below.

## Proposed Production Architecture

```
Internet
   |
   v
Route 53 (DNS) + ACM (TLS)         [optional production enhancement]
   |
   v
Application Load Balancer (HTTPS)
   |
   v
Application Tier
+-------------------------------+
| EC2 Auto Scaling / ECS Fargate|
| Multiple Availability Zones   |
+-------------------------------+
   |
   +-------------------+
   |                   |
   v                   v
RDS PostgreSQL      ElastiCache Redis
(Multi-AZ,          (proposed)
 private subnet)     private subnet
```

**Proposed — NOT deployed as part of this case study:**
- Amazon RDS for PostgreSQL (Multi-AZ, private subnets) as the persistent data tier.
- Amazon ElastiCache for Redis (private subnets) as the cache/session tier.
- Private subnets + NAT Gateway for application and data resources.
- Route 53 + ACM for a custom domain and HTTPS termination.
- Amazon ECS with Fargate as a container-native alternative to EC2 for the application tier.
- IAM least-privilege roles and AWS Secrets Manager / Systems Manager Parameter Store for credentials.

---

## Troubleshooting

1. The ALB initially returned a **502 Bad Gateway** error.
2. The Target Group had **zero registered targets**.
3. ASG-to-Target-Group integration was reviewed and confirmed correct.
4. Targets began appearing once the ASG integration was confirmed.
5. Both targets initially registered as **unhealthy**.
6. Root cause: the original startup script attempted package-installation operations requiring outbound internet access, but the instances had no public IPv4 connectivity at boot — so the application never started on port 8000.
7. The Launch Template was updated with a **simplified startup script** with no package-installation dependency.
8. An **Auto Scaling Instance Refresh** was triggered to roll out the fix.
9. Two new instances became healthy; one old instance briefly showed **"Draining"** during replacement.
10. The ALB was re-tested and **successfully served the application page**.

---

## Evidence

AWS Console screenshots captured during this deployment (see `Case_Study_Report.pdf` for the full annotated set, and the `screenshots/` folder in this repository):

- VPC `soc-vpc` — CIDR 12.0.0.0/16
- Public subnets — ap-south-1a and ap-south-1b
- Internet Gateway `soc-igw` — Attached
- Route table — subnet associations
- Security group `soc-ec2-sg`
- Launch Template `soc-launch-template`
- Auto Scaling Group `soc-asg` — Desired=2, Min=2, Max=3, 2/2 healthy
- Application Load Balancer `soc-alb` — Active, Internet-facing
- Target Group `soc-target-group` — 2 healthy targets
- `[PLACEHOLDER] Browser screenshot showing "AI-Powered Autonomous SOC Analyst"` *(not captured in this deployment run)*

## Project Structure

```
.
├── README.md
├── Case_Study_Report.pdf
├── Architecture_Diagram.png          # deployed (verified) architecture
├── Architecture_Diagram_Proposed.png # proposed production architecture
└── screenshots/                      # AWS Console evidence referenced above
```

*(This structure reflects the deliverables produced for this case study. It does not assume any application source code beyond what is described under [Overview](#overview).)*

## Future Enhancements

- Deploy Amazon RDS for PostgreSQL (Multi-AZ) and Amazon ElastiCache for Redis in private subnets.
- Move EC2 instances into private subnets behind a NAT Gateway.
- Add an HTTPS listener via AWS Certificate Manager, optionally with a Route 53 custom domain.
- Configure CloudWatch dashboards, alarms, and centralized logging.
- Attach least-privilege IAM roles and adopt Secrets Manager / Parameter Store for credentials.
- Migrate the containerized application onto Amazon ECS with Fargate.
- Add dynamic, metric-based Auto Scaling policies.
- Perform a dedicated instance-failover test and a baseline load test.
- Set up AWS Budgets / Cost Explorer alarms.

## Conclusion

This case study successfully deployed and verified a highly available, multi-AZ application/compute tier on AWS for the AI-Powered Autonomous SOC Analyst Agent, including recovery from a real deployment issue. The prototype deliberately omits a database tier, HTTPS, private subnets, and centralized monitoring — each gap is disclosed explicitly and mapped to a specific proposed production enhancement rather than glossed over. See `Case_Study_Report.pdf` for the complete Well-Architected analysis.

## Disclaimer / Deployment Cost

Running the Application Load Balancer, multiple EC2 instances, and associated networking resources on AWS may incur charges depending on your account's AWS Free Tier eligibility and usage. No specific pricing figures are claimed in this repository. Resources created for this case study should be reviewed and decommissioned after evaluation to avoid unintended ongoing charges.
