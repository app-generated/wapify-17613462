import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { CheckSquare, Home, ListTodo, Tag, BarChart } from 'lucide-react'

const Header = () => {
  const location = useLocation()

  const isActive = (path: string) => {
    return location.pathname === path
  }

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <CheckSquare className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-gray-900">TaskFlow</span>
          </Link>
          
          <nav className="flex space-x-8">
            <Link
              to="/"
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/') 
                  ? 'bg-primary text-white' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <Home className="h-4 w-4" />
              <span>Accueil</span>
            </Link>
            
            <Link
              to="/tasks"
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/tasks') 
                  ? 'bg-primary text-white' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <ListTodo className="h-4 w-4" />
              <span>Tâches</span>
            </Link>
            
            <Link
              to="/categories"
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/categories') 
                  ? 'bg-primary text-white' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <Tag className="h-4 w-4" />
              <span>Catégories</span>
            </Link>
            
            <Link
              to="/analytics"
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/analytics') 
                  ? 'bg-primary text-white' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <BarChart className="h-4 w-4" />
              <span>Statistiques</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header