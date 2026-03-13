import React from 'react'
import { Droplet, Moon, Utensils, TrendingUp, Award } from 'lucide-react'

const Analytics = ({ routineData }) => {
  const calculateStats = (user) => {
    const dates = Object.keys(routineData)
    let totalWater = 0
    let totalSleep = 0
    let mealsCount = 0
    let daysWithData = 0
    
    dates.forEach(date => {
      const data = routineData[date]?.[user]
      if (data) {
        daysWithData++
        const water = (parseInt(data.waterMorning) || 0) + 
                     (parseInt(data.waterAfternoon) || 0) + 
                     (parseInt(data.waterEvening) || 0) + 
                     (parseInt(data.waterNight) || 0)
        totalWater += water
        
        if (data.sleepTime && data.sleepWakeTime) {
          const sleepHours = calculateSleepHoursNum(data.sleepTime, data.sleepWakeTime)
          totalSleep += sleepHours
        }
        
        if (data.breakfast) mealsCount++
        if (data.lunch) mealsCount++
        if (data.dinner) mealsCount++
      }
    })
    
    return {
      avgWater: daysWithData > 0 ? (totalWater / daysWithData).toFixed(1) : 0,
      avgSleep: daysWithData > 0 ? (totalSleep / daysWithData).toFixed(1) : 0,
      totalMeals: mealsCount,
      streak: daysWithData
    }
  }
  
  const moniStats = calculateStats('Moni')
  const suryaStats = calculateStats('Surya')
  
  return (
    <div className="container mx-auto p-4">
      <div className="grid md:grid-cols-2 gap-6">
        <UserStats user="Moni" emoji="❤️" color="red" stats={moniStats} />
        <UserStats user="Surya" emoji="💙" color="blue" stats={suryaStats} />
      </div>
    </div>
  )
}

const UserStats = ({ user, emoji, color, stats }) => {
  const bgColor = color === 'red' ? 'bg-red-50' : 'bg-blue-50'
  const borderColor = color === 'red' ? 'border-red-300' : 'border-blue-300'
  const textColor = color === 'red' ? 'text-red-600' : 'text-blue-600'
  
  return (
    <div className={`${bgColor} rounded-2xl shadow-lg p-6 border-2 ${borderColor}`}>
      <h2 className={`text-2xl font-bold ${textColor} mb-6 flex items-center gap-2`}>
        {emoji} {user}'s Insights
      </h2>
      
      <div className="space-y-4">
        <StatCard
          icon={<Droplet size={24} />}
          label="Avg Water Intake"
          value={`${stats.avgWater} glasses/day`}
          color={color}
        />
        
        <StatCard
          icon={<Moon size={24} />}
          label="Avg Sleep Hours"
          value={`${stats.avgSleep} hours/day`}
          color={color}
        />
        
        <StatCard
          icon={<Utensils size={24} />}
          label="Total Meals"
          value={`${stats.totalMeals} meals`}
          color={color}
        />
        
        <StatCard
          icon={<Award size={24} />}
          label="Routine Streak"
          value={`${stats.streak} days 🔥`}
          color={color}
        />
      </div>
    </div>
  )
}

const StatCard = ({ icon, label, value, color }) => {
  const iconColor = color === 'red' ? 'text-red-500' : 'text-blue-500'
  
  return (
    <div className="bg-white/60 rounded-lg p-4 flex items-center gap-4">
      <div className={iconColor}>{icon}</div>
      <div className="flex-1">
        <div className="text-sm text-gray-600">{label}</div>
        <div className="text-xl font-bold">{value}</div>
      </div>
    </div>
  )
}

const calculateSleepHoursNum = (sleepTime, wakeTime) => {
  if (!sleepTime || !wakeTime) return 0
  
  const [sleepHour, sleepMin] = sleepTime.split(':').map(Number)
  const [wakeHour, wakeMin] = wakeTime.split(':').map(Number)
  
  let totalMinutes = (wakeHour * 60 + wakeMin) - (sleepHour * 60 + sleepMin)
  if (totalMinutes < 0) totalMinutes += 24 * 60
  
  return totalMinutes / 60
}

export default Analytics
