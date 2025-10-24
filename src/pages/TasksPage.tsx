import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Plus, Search, Edit, Trash, Check, X, Calendar } from 'lucide-react'

interface Task {
  id: string
  title: string
  description: string
  completed: boolean
  priority: 'low' | 'medium' | 'high'
  category: string
  dueDate?: string
  createdAt: string
}

const TasksPage = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Finaliser le rapport mensuel',
      description: 'Compiler toutes les données du mois et préparer le rapport pour la direction',
      completed: false,
      priority: 'high',
      category: 'Travail',
      dueDate: '2024-01-15',
      createdAt: '2024-01-10'
    },
    {
      id: '2',
      title: 'Préparer la présentation client',
      description: 'Créer les slides et préparer la démonstration produit',
      completed: false,
      priority: 'high',
      category: 'Travail',
      dueDate: '2024-01-14',
      createdAt: '2024-01-09'
    },
    {
      id: '3',
      title: 'Réviser les contrats',
      description: 'Relire et valider les nouveaux contrats fournisseurs',
      completed: true,
      priority: 'medium',
      category: 'Juridique',
      createdAt: '2024-01-08'
    },
    {
      id: '4',
      title: 'Organiser la réunion équipe',
      description: 'Planifier et envoyer les invitations pour la réunion hebdomadaire',
      completed: false,
      priority: 'medium',
      category: 'Management',
      dueDate: '2024-01-16',
      createdAt: '2024-01-07'
    },
    {
      id: '5',
      title: 'Faire les courses',
      description: 'Acheter les provisions pour la semaine',
      completed: false,
      priority: 'low',
      category: 'Personnel',
      createdAt: '2024-01-11'
    },
    {
      id: '6',
      title: 'Réserver les billets d\'avion',
      description: 'Réserver les vols pour le voyage d\'affaires du mois prochain',
      completed: true,
      priority: 'medium',
      category: 'Voyage',
      createdAt: '2024-01-06'
    },
    {
      id: '7',
      title: 'Mettre à jour le site web',
      description: 'Ajouter les nouvelles fonctionnalités et corriger les bugs',
      completed: false,
      priority: 'high',
      category: 'Développement',
      dueDate: '2024-01-20',
      createdAt: '2024-01-05'
    },
    {
      id: '8',
      title: 'Appeler le dentiste',
      description: 'Prendre rendez-vous pour le contrôle annuel',
      completed: false,
      priority: 'low',
      category: 'Santé',
      createdAt: '2024-01-04'
    }
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [filterPriority, setFilterPriority] = useState<string>('all')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'medium' as 'low' | 'medium' | 'high',
    category: '',
    dueDate: ''
  })

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesPriority = filterPriority === 'all' || task.priority === filterPriority
    const matchesStatus = filterStatus === 'all' || 
                         (filterStatus === 'completed' && task.completed) ||
                         (filterStatus === 'pending' && !task.completed)
    
    return matchesSearch && matchesPriority && matchesStatus
  })

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault()
    if (newTask.title.trim()) {
      const task: Task = {
        id: Date.now().toString(),
        title: newTask.title,
        description: newTask.description,
        completed: false,
        priority: newTask.priority,
        category: newTask.category,
        dueDate: newTask.dueDate || undefined,
        createdAt: new Date().toISOString().split('T')[0]
      }
      setTasks([task, ...tasks])
      setNewTask({ title: '', description: '', priority: 'medium', category: '', dueDate: '' })
      setShowAddForm(false)
    }
  }

  const handleEditTask = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingTask && editingTask.title.trim()) {
      setTasks(tasks.map(task => 
        task.id === editingTask.id ? editingTask : task
      ))
      setEditingTask(null)
    }
  }

  const toggleTaskCompletion = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  const deleteTask = (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette tâche ?')) {
      setTasks(tasks.filter(task => task.id !== id))
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'high': return 'Haute'
      case 'medium': return 'Moyenne'
      case 'low': return 'Faible'
      default: return priority
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestion des tâches</h1>
          <p className="text-gray-600 mt-2">Organisez et suivez vos tâches quotidiennes</p>
        </div>
        <Button 
          onClick={() => setShowAddForm(true)}
          className="inline-flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Nouvelle tâche</span>
        </Button>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Rechercher des tâches..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              <option value="all">Toutes les priorités</option>
              <option value="high">Priorité haute</option>
              <option value="medium">Priorité moyenne</option>
              <option value="low">Priorité faible</option>
            </select>
            
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              <option value="all">Tous les statuts</option>
              <option value="pending">En cours</option>
              <option value="completed">Terminées</option>
            </select>
            
            <div className="text-sm text-gray-500 flex items-center">
              {filteredTasks.length} tâche(s) trouvée(s)
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Add Task Form */}
      {showAddForm && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Ajouter une nouvelle tâche</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddTask} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Titre *</label>
                  <Input
                    type="text"
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                    placeholder="Titre de la tâche"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Catégorie</label>
                  <Input
                    type="text"
                    value={newTask.category}
                    onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
                    placeholder="Catégorie"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                  placeholder="Description de la tâche"
                  rows={3}
                  className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Priorité</label>
                  <select
                    value={newTask.priority}
                    onChange={(e) => setNewTask({ ...newTask, priority: e.target.value as 'low' | 'medium' | 'high' })}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option value="low">Faible</option>
                    <option value="medium">Moyenne</option>
                    <option value="high">Haute</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date d\'échéance</label>
                  <Input
                    type="date"
                    value={newTask.dueDate}
                    onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                  />
                </div>
              </div>
              
              <div className="flex space-x-3">
                <Button type="submit">Ajouter la tâche</Button>
                <Button type="button" variant="outline" onClick={() => setShowAddForm(false)}>
                  Annuler
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Edit Task Form */}
      {editingTask && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Modifier la tâche</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleEditTask} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Titre *</label>
                  <Input
                    type="text"
                    value={editingTask.title}
                    onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Catégorie</label>
                  <Input
                    type="text"
                    value={editingTask.category}
                    onChange={(e) => setEditingTask({ ...editingTask, category: e.target.value })}
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={editingTask.description}
                  onChange={(e) => setEditingTask({ ...editingTask, description: e.target.value })}
                  rows={3}
                  className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Priorité</label>
                  <select
                    value={editingTask.priority}
                    onChange={(e) => setEditingTask({ ...editingTask, priority: e.target.value as 'low' | 'medium' | 'high' })}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option value="low">Faible</option>
                    <option value="medium">Moyenne</option>
                    <option value="high">Haute</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date d\'échéance</label>
                  <Input
                    type="date"
                    value={editingTask.dueDate || ''}
                    onChange={(e) => setEditingTask({ ...editingTask, dueDate: e.target.value })}
                  />
                </div>
              </div>
              
              <div className="flex space-x-3">
                <Button type="submit">Sauvegarder</Button>
                <Button type="button" variant="outline" onClick={() => setEditingTask(null)}>
                  Annuler
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Tasks List */}
      <div className="grid grid-cols-1 gap-4">
        {filteredTasks.map((task) => (
          <Card key={task.id} className={task.completed ? 'opacity-75' : ''}>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4 flex-1">
                  <button
                    onClick={() => toggleTaskCompletion(task.id)}
                    className={`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center ${
                      task.completed 
                        ? 'bg-green-500 border-green-500 text-white' 
                        : 'border-gray-300 hover:border-green-500'
                    }`}
                  >
                    {task.completed && <Check className="h-3 w-3" />}
                  </button>
                  
                  <div className="flex-1">
                    <h3 className={`text-lg font-semibold ${
                      task.completed ? 'line-through text-gray-500' : 'text-gray-900'
                    }`}>
                      {task.title}
                    </h3>
                    
                    {task.description && (
                      <p className={`text-sm mt-1 ${
                        task.completed ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        {task.description}
                      </p>
                    )}
                    
                    <div className="flex items-center space-x-4 mt-3">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        getPriorityColor(task.priority)
                      }`}>
                        {getPriorityLabel(task.priority)}
                      </span>
                      
                      {task.category && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {task.category}
                        </span>
                      )}
                      
                      {task.dueDate && (
                        <span className="inline-flex items-center text-xs text-gray-500">
                          <Calendar className="h-3 w-3 mr-1" />
                          {task.dueDate}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 ml-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setEditingTask(task)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteTask(task.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTasks.length === 0 && (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <p className="text-gray-500 text-lg mb-4">Aucune tâche trouvée</p>
              <p className="text-gray-400 text-sm">Modifiez vos filtres ou créez une nouvelle tâche</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default TasksPage