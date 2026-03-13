import React, { useState, useEffect } from 'react'
import { LogOut, Calendar, TrendingUp } from 'lucide-react'
import UserPanel from './UserPanel'
import CalendarView from './CalendarView'
import Analytics from './Analytics'
import { format } from 'date-fns'

const Dashboard = ({ onLogout }) => {
  const [currentDate, setCurrentDate] = useState(format(new Date(), 'yyyy-MM-dd'))
  const [view, setView] = useState('dashboard')
  const [routineData, setRoutineData] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Load from localStorage
    const saved = localStorage.getItem('sumoRoutineData')
    if (saved) {
      setRoutineData(JSON.parse(saved))
    }
    setLoading(false)
  }, [])

  const updateUserData = async (user, data) => {
    const newData = {
      ...routineData,
      [currentDate]: {
        ...routineData[currentDate],
        [user]: data
      }
    }
    setRoutineData(newData)
    
    // Save to localStorage
    localStorage.setItem('sumoRoutineData', JSON.stringify(newData))
  }

  const handleSave = async (user, data) => {
    await updateUserData(user, data)
  }

  const getUserData = (user, date = currentDate) => {
    return routineData[date]?.[user] || {}
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-red-500 to-blue-500 bg-clip-text text-transparent">
                SUMO ❤️💙
              </h1>
              <span className="text-gray-600">|</span>
              <span className="text-gray-700 font-medium">{format(new Date(currentDate), 'MMMM dd, yyyy')}</span>
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={() => setView('dashboard')}
                className={`px-4 py-2 rounded-lg transition ${view === 'dashboard' ? 'bg-purple-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              >
                Dashboard
              </button>
              <button
                onClick={() => setView('calendar')}
                className={`px-4 py-2 rounded-lg transition flex items-center gap-2 ${view === 'calendar' ? 'bg-purple-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              >
                <Calendar size={18} />
                History
              </button>
              <button
                onClick={() => setView('analytics')}
                className={`px-4 py-2 rounded-lg transition flex items-center gap-2 ${view === 'analytics' ? 'bg-purple-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              >
                <TrendingUp size={18} />
                Insights
              </button>
              <button
                onClick={onLogout}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition flex items-center gap-2"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      {view === 'dashboard' && (
        <div className="container mx-auto p-4">
          <div className="grid md:grid-cols-2 gap-4">
            <UserPanel
              user="Moni"
              color="red"
              emoji="❤️"
              data={getUserData('Moni')}
              onUpdate={(data) => updateUserData('Moni', data)}
              onSave={handleSave}
            />
            <UserPanel
              user="Surya"
              color="blue"
              emoji="💙"
              data={getUserData('Surya')}
              onUpdate={(data) => updateUserData('Surya', data)}
              onSave={handleSave}
            />
          </div>
        </div>
      )}

      {view === 'calendar' && (
        <CalendarView
          routineData={routineData}
          onDateSelect={setCurrentDate}
          currentDate={currentDate}
        />
      )}

      {view === 'analytics' && (
        <Analytics routineData={routineData} />
      )}
    </div>
  )
}

export default Dashboard
