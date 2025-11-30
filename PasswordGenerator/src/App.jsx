import { useState } from 'react'
import PasswordGenerator from './components/PasswordGenerator'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <PasswordGenerator />
    </div>
  )
}

export default App
