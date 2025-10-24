import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { BarChart, CheckSquare, Clock, ListTodo, Plus, Tag, TrendingUp } from 'lucide-react'

interface Task {
  id: string
  title: string
  completed: boolean
  priority: 'low' | 'medium' | 'high'
  dueDate?: string
}

const HomePage = () => {
  const [recentTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Finaliser le rapport mensuel',
      completed: false,
      priority: 'high',
      dueDate: '2024-01-15'
    },
    {
      id: '2',
      title: 'Préparer la présentation client',
      completed: false,
      priority: 'high',
      dueDate: '2024-01-14'
    },
    {
      id: '3',
      title: 'Réviser les contrats',
      completed: true,
      priority: 'medium'
    },
    {
      id: '4',
      title: 'Organiser la réunion équipe',
      completed: false,
      priority: 'medium',
      dueDate: '2024-01-16'
    }
  ])

  const completedTasks = recentTasks.filter(task => task.completed).length
  const pendingTasks = recentTasks.filter(task => !task.completed).length
  const urgentTasks = recentTasks.filter(task => !task.completed && task.priority === 'high').length

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600'
      case 'medium': return 'text-yellow-600'
      case 'low': return 'text-green-600'
      default: return 'text-gray-600'
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Bienvenue sur TaskFlow
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Organisez vos tâches, gérez vos priorités et restez productif
        </p>
        <Link to="/tasks">
          <Button size="lg" className="inline-flex items-center space-x-2">
            <Plus className="h-5 w-5" />
            <span>Créer une nouvelle tâche</span>
          </Button>
        </Link>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tâches complétées</CardTitle>
            <CheckSquare className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{completedTasks}</div>
            <p className="text-xs text-muted-foreground">
              Sur {recentTasks.length} tâches totales
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tâches en cours</CardTitle>
            <Clock className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{pendingTasks}</div>
            <p className="text-xs text-muted-foreground">
              À terminer
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tâches urgentes</CardTitle>
            <TrendingUp className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{urgentTasks}</div>
            <p className="text-xs text-muted-foreground">
              Priorité haute
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <ListTodo className="h-5 w-5" />
              <span>Tâches récentes</span>
            </CardTitle>
            <CardDescription>
              Vos dernières tâches créées ou modifiées
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTasks.slice(0, 4).map((task) => (
                <div key={task.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      task.completed ? 'bg-green-500' : 'bg-gray-300'
                    }`} />
                    <div>
                      <p className={`font-medium ${
                        task.completed ? 'line-through text-gray-500' : 'text-gray-900'
                      }`}>
                        {task.title}
                      </p>
                      {task.dueDate && (
                        <p className="text-sm text-gray-500">Échéance: {task.dueDate}</p>
                      )}
                    </div>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full bg-white ${getPriorityColor(task.priority)}`}>
                    {task.priority === 'high' ? 'Haute' : task.priority === 'medium' ? 'Moyenne' : 'Faible'}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Link to="/tasks">
                <Button variant="outline" className="w-full">
                  Voir toutes les tâches
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Tag className="h-5 w-5" />
              <span>Actions rapides</span>
            </CardTitle>
            <CardDescription>
              Accédez rapidement aux fonctionnalités principales
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Link to="/tasks">
                <Button variant="outline" className="w-full justify-start">
                  <Plus className="h-4 w-4 mr-2" />
                  Créer une nouvelle tâche
                </Button>
              </Link>
              
              <Link to="/categories">
                <Button variant="outline" className="w-full justify-start">
                  <Tag className="h-4 w-4 mr-2" />
                  Gérer les catégories
                </Button>
              </Link>
              
              <Link to="/analytics">
                <Button variant="outline" className="w-full justify-start">
                  <BarChart className="h-4 w-4 mr-2" />
                  Voir les statistiques
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default HomePage