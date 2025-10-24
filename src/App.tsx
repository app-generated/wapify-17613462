import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import TasksPage from './pages/TasksPage'
import CategoriesPage from './pages/CategoriesPage'
import AnalyticsPage from './pages/AnalyticsPage'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/tasks" element={<TasksPage />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App