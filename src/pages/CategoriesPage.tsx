import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Plus, Edit, Trash, Tag, ListTodo } from 'lucide-react'

interface Category {
  id: string
  name: string
  color: string
  description: string
  taskCount: number
  createdAt: string
}

const CategoriesPage = () => {
  const [categories, setCategories] = useState<Category[]>([
    {
      id: '1',
      name: 'Travail',
      color: '#3b82f6',
      description: 'Tâches liées au travail et aux projets professionnels',
      taskCount: 12,
      createdAt: '2024-01-01'
    },
    {
      id: '2',
      name: 'Personnel',
      color: '#10b981',
      description: 'Tâches personnelles et vie privée',
      taskCount: 8,
      createdAt: '2024-01-02'
    },
    {
      id: '3',
      name: 'Santé',
      color: '#f59e0b',
      description: 'Rendez-vous médicaux et bien-être',
      taskCount: 3,
      createdAt: '2024-01-03'
    },
    {
      id: '4',
      name: 'Développement',
      color: '#8b5cf6',
      description: 'Projets de développement et apprentissage',
      taskCount: 15,
      createdAt: '2024-01-04'
    },
    {
      id: '5',
      name: 'Management',
      color: '#ef4444',
      description: 'Gestion d\'équipe et réunions',
      taskCount: 6,
      createdAt: '2024-01-05'
    },
    {
      id: '6',
      name: 'Juridique',
      color: '#6b7280',
      description: 'Documents légaux et contrats',
      taskCount: 4,
      createdAt: '2024-01-06'
    },
    {
      id: '7',
      name: 'Voyage',
      color: '#06b6d4',
      description: 'Planification et réservations de voyages',
      taskCount: 2,
      createdAt: '2024-01-07'
    },
    {
      id: '8',
      name: 'Formation',
      color: '#84cc16',
      description: 'Cours et certifications professionnelles',
      taskCount: 9,
      createdAt: '2024-01-08'
    }
  ])

  const [showAddForm, setShowAddForm] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [newCategory, setNewCategory] = useState({
    name: '',
    color: '#3b82f6',
    description: ''
  })

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault()
    if (newCategory.name.trim()) {
      const category: Category = {
        id: Date.now().toString(),
        name: newCategory.name,
        color: newCategory.color,
        description: newCategory.description,
        taskCount: 0,
        createdAt: new Date().toISOString().split('T')[0]
      }
      setCategories([category, ...categories])
      setNewCategory({ name: '', color: '#3b82f6', description: '' })
      setShowAddForm(false)
    }
  }

  const handleEditCategory = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingCategory && editingCategory.name.trim()) {
      setCategories(categories.map(category => 
        category.id === editingCategory.id ? editingCategory : category
      ))
      setEditingCategory(null)
    }
  }

  const deleteCategory = (id: string) => {
    const category = categories.find(c => c.id === id)
    if (category && category.taskCount > 0) {
      alert(`Impossible de supprimer la catégorie "${category.name}" car elle contient ${category.taskCount} tâche(s).`)
      return
    }
    
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette catégorie ?')) {
      setCategories(categories.filter(category => category.id !== id))
    }
  }

  const predefinedColors = [
    '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6',
    '#ef4444', '#6b7280', '#06b6d4', '#84cc16',
    '#f97316', '#ec4899', '#14b8a6', '#a855f7'
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestion des catégories</h1>
          <p className="text-gray-600 mt-2">Organisez vos tâches par catégories personnalisées</p>
        </div>
        <Button 
          onClick={() => setShowAddForm(true)}
          className="inline-flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Nouvelle catégorie</span>
        </Button>
      </div>

      {/* Add Category Form */}
      {showAddForm && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Ajouter une nouvelle catégorie</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddCategory} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nom *</label>
                <Input
                  type="text"
                  value={newCategory.name}
                  onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                  placeholder="Nom de la catégorie"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={newCategory.description}
                  onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                  placeholder="Description de la catégorie"
                  rows={3}
                  className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Couleur</label>
                <div className="flex items-center space-x-3">
                  <Input
                    type="color"
                    value={newCategory.color}
                    onChange={(e) => setNewCategory({ ...newCategory, color: e.target.value })}
                    className="w-16 h-10"
                  />
                  <div className="flex flex-wrap gap-2">
                    {predefinedColors.map((color) => (
                      <button
                        key={color}
                        type="button"
                        onClick={() => setNewCategory({ ...newCategory, color })}
                        className={`w-6 h-6 rounded-full border-2 ${
                          newCategory.color === color ? 'border-gray-900' : 'border-gray-300'
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-3">
                <Button type="submit">Ajouter la catégorie</Button>
                <Button type="button" variant="outline" onClick={() => setShowAddForm(false)}>
                  Annuler
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Edit Category Form */}
      {editingCategory && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Modifier la catégorie</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleEditCategory} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nom *</label>
                <Input
                  type="text"
                  value={editingCategory.name}
                  onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={editingCategory.description}
                  onChange={(e) => setEditingCategory({ ...editingCategory, description: e.target.value })}
                  rows={3}
                  className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Couleur</label>
                <div className="flex items-center space-x-3">
                  <Input
                    type="color"
                    value={editingCategory.color}
                    onChange={(e) => setEditingCategory({ ...editingCategory, color: e.target.value })}
                    className="w-16 h-10"
                  />
                  <div className="flex flex-wrap gap-2">
                    {predefinedColors.map((color) => (
                      <button
                        key={color}
                        type="button"
                        onClick={() => setEditingCategory({ ...editingCategory, color })}
                        className={`w-6 h-6 rounded-full border-2 ${
                          editingCategory.color === color ? 'border-gray-900' : 'border-gray-300'
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-3">
                <Button type="submit">Sauvegarder</Button>
                <Button type="button" variant="outline" onClick={() => setEditingCategory(null)}>
                  Annuler
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Card key={category.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: category.color }}
                  />
                  <CardTitle className="text-lg">{category.name}</CardTitle>
                </div>
                <div className="flex items-center space-x-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setEditingCategory(category)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteCategory(category.id)}
                    className="text-red-600 hover:text-red-700"
                    disabled={category.taskCount > 0}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              {category.description && (
                <CardDescription>{category.description}</CardDescription>
              )}
            </CardHeader>
            
            <CardContent>
              <div className="flex items-center justify-between text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <ListTodo className="h-4 w-4" />
                  <span>{category.taskCount} tâche(s)</span>
                </div>
                
                <div className="text-xs text-gray-400">
                  Créée le {category.createdAt}
                </div>
              </div>
              
              {category.taskCount > 0 && (
                <div className="mt-3">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full"
                      style={{ 
                        backgroundColor: category.color,
                        width: `${Math.min((category.taskCount / 20) * 100, 100)}%`
                      }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Utilisation: {category.taskCount}/20 tâches
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {categories.length === 0 && (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <Tag className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 text-lg mb-4">Aucune catégorie créée</p>
              <p className="text-gray-400 text-sm mb-6">
                Créez votre première catégorie pour organiser vos tâches
              </p>
              <Button onClick={() => setShowAddForm(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Créer une catégorie
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default CategoriesPage