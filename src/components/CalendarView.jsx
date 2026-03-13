import React, { useState } from 'react'
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, parseISO } from 'date-fns'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const CalendarView = ({ routineData, onDateSelect, currentDate }) => {
  const [viewDate, setViewDate] = useState(new Date())
  
  const monthStart = startOfMonth(viewDate)
  const monthEnd = endOfMonth(viewDate)
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd })
  
  const previousMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1))
  }
  
  const nextMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1))
  }
  
  const hasData = (date) => {
    const dateStr = format(date, 'yyyy-MM-dd')
    return routineData[dateStr] && (routineData[dateStr].Moni || routineData[dateStr].Surya)
  }
  
  const handleDateClick = (date) => {
    const dateStr = format(date, 'yyyy-MM-dd')
    onDateSelect(dateStr)
  }
  
  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-2xl shadow-lg p-6 max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <button onClick={previousMonth} className="p-2 hover:bg-gray-100 rounded-lg">
            <ChevronLeft size={24} />
          </button>
          <h2 className="text-2xl font-bold">{format(viewDate, 'MMMM yyyy')}</h2>
          <button onClick={nextMonth} className="p-2 hover:bg-gray-100 rounded-lg">
            <ChevronRight size={24} />
          </button>
        </div>
        
        <div className="grid grid-cols-7 gap-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-center font-semibold text-gray-600 py-2">
              {day}
            </div>
          ))}
          
          {daysInMonth.map(day => {
            const isSelected = isSameDay(parseISO(currentDate), day)
            const hasRoutine = hasData(day)
            
            return (
              <button
                key={day.toString()}
                onClick={() => handleDateClick(day)}
                className={`
                  p-3 rounded-lg text-center transition
                  ${isSelected ? 'bg-purple-500 text-white' : 'hover:bg-gray-100'}
                  ${hasRoutine && !isSelected ? 'bg-green-100 border-2 border-green-400' : ''}
                `}
              >
                <div>{format(day, 'd')}</div>
                {hasRoutine && <div className="text-xs mt-1">✓</div>}
              </button>
            )
          })}
        </div>
        
        <div className="mt-6 text-sm text-gray-600">
          <div className="flex gap-4 justify-center">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-100 border-2 border-green-400 rounded"></div>
              <span>Has data</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-purple-500 rounded"></div>
              <span>Selected</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CalendarView
