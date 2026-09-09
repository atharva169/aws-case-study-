import { useEffect, useMemo, useState } from 'react'
import {
  CheckCircle2,
  Circle,
  Clock3,
  ListTodo,
} from 'lucide-react'
import Header from './components/layout/Header'
import Sidebar from './components/layout/Sidebar'
import WelcomeSection from './components/dashboard/WelcomeSection'
import StatCard from './components/dashboard/StatCard'
import TaskList from './components/dashboard/TaskList'
import CloudStatus from './components/dashboard/CloudStatus'
import AddTaskModal from './components/tasks/AddTaskModal'
import DeleteTaskModal from './components/tasks/DeleteTaskModal'
import ArchitectureModal from './components/architecture/ArchitectureModal'
import WellArchitected from './components/wellArchitected/WellArchitected'
import Toast from './components/ui/Toast'
import initialTasks from './data/initialTasks'

const STORAGE_KEY = 'taskflow_tasks'

function App() {
  const [tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem(STORAGE_KEY)
    if (storedTasks) {
      try {
        return JSON.parse(storedTasks)
      } catch {
        return initialTasks
      }
    }
    return initialTasks
  })
  const [search, setSearch] = useState('')
  const [activeView, setActiveView] = useState('dashboard')
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [taskToDelete, setTaskToDelete] = useState(null)
  const [isArchitectureOpen, setIsArchitectureOpen] = useState(false)
  const [failureMode, setFailureMode] = useState('healthy')
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  const [toast, setToast] = useState({ message: '', type: 'success', visible: false })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  }, [tasks])

  useEffect(() => {
    if (!toast.visible) return undefined

    const timer = window.setTimeout(() => {
      setToast((current) => ({ ...current, visible: false }))
    }, 2200)

    return () => window.clearTimeout(timer)
  }, [toast.visible])

  const filteredTasks = useMemo(() => {
    const term = search.trim().toLowerCase()

    return tasks.filter((task) => {
      const matchesSearch =
        !term ||
        task.title.toLowerCase().includes(term) ||
        task.description.toLowerCase().includes(term)

      if (!matchesSearch) return false

      if (activeView === 'completed') return task.status === 'Completed'
      if (activeView === 'pending') return task.status === 'Pending' || task.status === 'In Progress'
      return true
    })
  }, [tasks, search, activeView])

  const stats = useMemo(() => {
    const total = tasks.length
    const completed = tasks.filter((task) => task.status === 'Completed').length
    const inProgress = tasks.filter((task) => task.status === 'In Progress').length
    const pending = tasks.filter((task) => task.status === 'Pending').length

    return { total, completed, inProgress, pending }
  }, [tasks])

  const showToast = (message, type = 'success') => {
    setToast({ message, type, visible: true })
  }

  const createTask = (taskInput) => {
    const newTask = {
      id: Date.now() + Math.random(),
      title: taskInput.title,
      description: taskInput.description,
      priority: taskInput.priority,
      status: taskInput.status,
      createdAt: new Date().toISOString().slice(0, 10),
    }

    setTasks((current) => [newTask, ...current])
    setIsAddOpen(false)
    showToast('Task created successfully')
  }

  const toggleTaskComplete = (taskId) => {
    setTasks((current) =>
      current.map((task) => {
        if (task.id !== taskId) return task

        const nextStatus = task.status === 'Completed' ? 'Pending' : 'Completed'
        return { ...task, status: nextStatus }
      }),
    )

    const task = tasks.find((item) => item.id === taskId)
    if (task) {
      showToast(task.status === 'Completed' ? 'Task marked as pending' : 'Task marked as completed')
    }
  }

  const deleteTask = (taskId) => {
    const task = tasks.find((item) => item.id === taskId)
    if (!task) return

    setTaskToDelete(task)
    setIsDeleteOpen(true)
  }

  const confirmDeleteTask = () => {
    if (!taskToDelete) return

    setTasks((current) => current.filter((task) => task.id !== taskToDelete.id))
    setIsDeleteOpen(false)
    setTaskToDelete(null)
    showToast('Task deleted', 'danger')
  }

  const simulateFailure = () => {
    setFailureMode('down')
    showToast('Instance AZ-1 is unavailable', 'info')
  }

  const restoreInstance = () => {
    setFailureMode('healthy')
    showToast('Instance AZ-1 restored', 'success')
  }

  const handleNavigation = (view) => {
    setActiveView(view)
    setMobileSidebarOpen(false)
  }

  const statsCards = [
    { label: 'Total Tasks', value: stats.total, description: 'All your tasks', icon: ListTodo, accent: '#FF9900' },
    { label: 'In Progress', value: stats.inProgress, description: 'Currently working', icon: Clock3, accent: '#F5B942' },
    { label: 'Pending', value: stats.pending, description: 'Waiting to start', icon: Circle, accent: '#7D8490' },
    { label: 'Completed', value: stats.completed, description: 'Successfully completed', icon: CheckCircle2, accent: '#36D399' },
  ]

  return (
    <div className="min-h-screen bg-[#080A0F] text-slate-100">
      <div className="mx-auto flex min-h-screen max-w-[1600px] flex-col lg:flex-row">
        <div className={`${mobileSidebarOpen ? 'block' : 'hidden'} lg:block`}>
          <Sidebar activeView={activeView} onSelectView={handleNavigation} />
        </div>

        <main className="flex min-h-screen flex-1 flex-col">
          <Header
            search={search}
            onSearchChange={setSearch}
            onToggleSidebar={() => setMobileSidebarOpen((current) => !current)}
            mobileSidebarOpen={mobileSidebarOpen}
          />

          <div className="flex-1 space-y-6 p-4 md:p-6 xl:p-8">
            <WelcomeSection onAddTask={() => setIsAddOpen(true)} />

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {statsCards.map((card) => (
                <StatCard
                  key={card.label}
                  icon={card.icon}
                  label={card.label}
                  value={card.value}
                  description={card.description}
                  accent={card.accent}
                />
              ))}
            </div>

            <div className="grid gap-6 xl:grid-cols-[minmax(0,1.7fr)_minmax(300px,0.8fr)]">
              <TaskList
                tasks={filteredTasks}
                onToggleComplete={toggleTaskComplete}
                onDelete={deleteTask}
                onViewAll={() => setActiveView('my-tasks')}
              />

              <CloudStatus onViewArchitecture={() => setIsArchitectureOpen(true)} />
            </div>

            <WellArchitected />
          </div>

          <footer className="border-t border-white/10 bg-[#0B0E13]/80 px-4 py-5 text-center text-sm text-slate-400 md:px-6">
            <p className="font-semibold text-white">TaskFlow</p>
            <p className="mt-1">Simple tasks. Reliable infrastructure.</p>
            <p className="mt-2 text-slate-500">Built as an AWS Well-Architected Framework demonstration.</p>
            <p className="mt-3 text-slate-500">© 2026 TaskFlow</p>
          </footer>
        </main>
      </div>

      <AddTaskModal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} onCreate={createTask} />

      <DeleteTaskModal
        task={taskToDelete}
        isOpen={isDeleteOpen}
        onClose={() => {
          setIsDeleteOpen(false)
          setTaskToDelete(null)
        }}
        onConfirm={confirmDeleteTask}
      />

      <ArchitectureModal
        isOpen={isArchitectureOpen}
        onClose={() => setIsArchitectureOpen(false)}
        failureMode={failureMode}
        onSimulateFailure={simulateFailure}
        onRestoreInstance={restoreInstance}
      />

      <Toast message={toast.message} type={toast.type} visible={toast.visible} />
    </div>
  )
}

export default App
