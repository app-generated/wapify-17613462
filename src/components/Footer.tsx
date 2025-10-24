import React from 'react'
import { CheckSquare } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <CheckSquare className="h-6 w-6 text-primary" />
            <span className="text-lg font-semibold text-gray-900">TaskFlow</span>
          </div>
          
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
            <p className="text-sm text-gray-600">
              © 2024 TaskFlow. Tous droits réservés.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                Confidentialité
              </a>
              <a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                Conditions
              </a>
              <a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer