import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { BarChart, PieChart, TrendingUp, TrendingDown, CheckSquare, Clock, AlertCircle, Calendar } from 'lucide-react'

interface TaskStats {
  total: number
  completed: number
  pending: number
  overdue: number
  byPriority: {
    high: number
    medium: number
    low: number
  }
  byCategory: {
    [key: string]: number
  }
  completionRate: number
  averageCompletionTime: number
}

interface WeeklyData {
  week: string
  completed: number
  created: number
}

const AnalyticsPage = () => {
  const [stats] = useState<TaskStats>({
    total: 50,
    completed: 32,
    pending: 15,
    overdue: 3,
    byPriority: {
      high: 12,
      medium: 23,
      low: 15
    },
    byCategory: {
      'Travail': 18,
      'Personnel': 12,
      'Développement': 8,
      'Formation': 6,
      'Management': 4,
      'Santé': 2
    },
    completionRate: 64,
    averageCompletionTime: 3.2
  })

  const [weeklyData] = useState<WeeklyData[]>([
    { week: 'Sem 1', completed: 8, created: 12 },
    { week: 'Sem 2', completed: 12, created: 10 },
    { week: 'Sem 3', completed: 15, created: 14 },
    { week: 'Sem 4', completed: 18, created: 16 },
    { week: 'Sem 5', completed: 14, created: 11 },
    { week: 'Sem 6', completed: 16, created: 13 },
    { week: 'Sem 7', completed: 20, created: 15 },
    { week: 'Sem 8', completed: 22, created: 18 }
  ])

  const [selectedPeriod, setSelectedPeriod] = useState('month')

  const getPriorityPercentage = (priority: keyof typeof stats.byPriority) => {
    return Math.round((stats.byPriority[priority] / stats.total) * 100)
  }

  const getCategoryPercentage = (category: string) => {
    return Math.round((stats.byCategory[category] / stats.total) * 100)
  }

  const getCompletionTrend = () => {
    const lastWeeks = weeklyData.slice(-4)
    const firstHalf = lastWeeks.slice(0, 2).reduce((sum, week) => sum + week.completed, 0) / 2
    const secondHalf = lastWeeks.slice(2).reduce((sum, week) => sum + week.completed, 0) / 2
    return secondHalf > firstHalf ? 'up' : 'down'
  }

  const trend = getCompletionTrend()
  const trendPercentage = Math.abs(Math.round(((weeklyData[weeklyData.length - 1].completed - weeklyData[weeklyData.length - 2].completed) / weeklyData[weeklyData.length - 2].completed) * 100))

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Statistiques et analyses</h1>
          <p className="text-gray-600 mt-2">Suivez vos performances et votre productivité</p>
        </div>
        
        <select
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(e.target.value)}
          className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
        >
          <option value="week">Cette semaine</option>
          <option value="month">Ce mois</option>
          <option value="quarter">Ce trimestre</option>
          <option value="year">Cette année</option>
        </select>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total des tâches</CardTitle>
            <CheckSquare className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">
              Toutes les tâches créées
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tâches complétées</CardTitle>
            <CheckSquare className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
            <p className="text-xs text-muted-foreground">
              {stats.completionRate}% de taux de réussite
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">En cours</CardTitle>
            <Clock className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.pending}</div>
            <p className="text-xs text-muted-foreground">
              Tâches à terminer
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">En retard</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.overdue}</div>
            <p className="text-xs text-muted-foreground">
              Échéances dépassées
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Completion Trend */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart className="h-5 w-5" />
              <span>Tendance de completion</span>
            </CardTitle>
            <CardDescription>
              Évolution des tâches complétées par semaine
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {trend === 'up' ? (
                    <TrendingUp className="h-4 w-4 text-green-600" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-600" />
                  )}
                  <span className={`text-sm font-medium ${
                    trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {trend === 'up' ? '+' : '-'}{trendPercentage}% cette semaine
                  </span>
                </div>
              </div>
              
              <div className="space-y-3">
                {weeklyData.slice(-6).map((week, index) => (
                  <div key={week.week} className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 w-12">{week.week}</span>
                    <div className="flex-1 mx-3">
                      <div className="flex space-x-1">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-500 h-2 rounded-full"
                            style={{ width: `${(week.completed / 25) * 100}%` }}
                          />
                        </div>
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full"
                            style={{ width: `${(week.created / 25) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-green-600">{week.completed} terminées</div>
                      <div className="text-xs text-blue-600">{week.created} créées</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Priority Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <PieChart className="h-5 w-5" />
              <span>Répartition par priorité</span>
            </CardTitle>
            <CardDescription>
              Distribution des tâches selon leur priorité
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-red-500 rounded-full" />
                    <span className="text-sm">Priorité haute</span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-medium">{stats.byPriority.high}</span>
                    <span className="text-xs text-gray-500 ml-1">({getPriorityPercentage('high')}%)</span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-red-500 h-2 rounded-full"
                    style={{ width: `${getPriorityPercentage('high')}%` }}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                    <span className="text-sm">Priorité moyenne</span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-medium">{stats.byPriority.medium}</span>
                    <span className="text-xs text-gray-500 ml-1">({getPriorityPercentage('medium')}%)</span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-yellow-500 h-2 rounded-full"
                    style={{ width: `${getPriorityPercentage('medium')}%` }}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full" />
                    <span className="text-sm">Priorité faible</span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-medium">{stats.byPriority.low}</span>
                    <span className="text-xs text-gray-500 ml-1">({getPriorityPercentage('low')}%)</span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: `${getPriorityPercentage('low')}%` }}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Category Analysis */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart className="h-5 w-5" />
            <span>Répartition par catégorie</span>
          </CardTitle>
          <CardDescription>
            Analyse de vos tâches par domaine d\'activité
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(stats.byCategory).map(([category, count]) => (
              <div key={category} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{category}</span>
                  <div className="text-right">
                    <span className="text-sm">{count}</span>
                    <span className="text-xs text-gray-500 ml-1">({getCategoryPercentage(category)}%)</span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${getCategoryPercentage(category)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Taux de completion</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.completionRate}%</div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div 
                className="bg-green-500 h-2 rounded-full"
                style={{ width: `${stats.completionRate}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Excellent! Vous terminez la plupart de vos tâches
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Temps moyen de completion</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.averageCompletionTime} jours</div>
            <p className="text-xs text-muted-foreground mt-2">
              Temps moyen entre création et completion
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Productivité</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <span className="text-2xl font-bold text-green-600">Élevée</span>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Basé sur votre taux de completion et régularité
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default AnalyticsPage