import React, { useState } from 'react'
import { Droplet, Moon, Sun, Coffee, Utensils, Bus, Heart, MessageCircle } from 'lucide-react'

const UserPanel = ({ user, color, emoji, data, onUpdate, onSave }) => {
  const [localData, setLocalData] = useState(data)
  const [hasChanges, setHasChanges] = useState(false)
  const [saving, setSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState('')

  const updateField = (field, value) => {
    const newData = { ...localData, [field]: value }
    setLocalData(newData)
    setHasChanges(true)
  }

  const handleSave = async () => {
    setSaving(true)
    setSaveMessage('')
    await onSave(user, localData)
    setHasChanges(false)
    setSaveMessage('✓ Saved!')
    setTimeout(() => setSaveMessage(''), 2000)
    setSaving(false)
  }

  const bgColor = color === 'red' ? 'bg-red-50' : 'bg-blue-50'
  const borderColor = color === 'red' ? 'border-red-300' : 'border-blue-300'
  const buttonColor = color === 'red' ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'
  const textColor = color === 'red' ? 'text-red-600' : 'text-blue-600'

  return (
    <div className={`${bgColor} rounded-2xl shadow-lg p-6 border-2 ${borderColor}`}>
      <div className="flex items-center justify-between mb-6">
        <h2 className={`text-3xl font-bold ${textColor} flex items-center gap-2`}>
          {emoji} {user}
        </h2>
        <div className="flex items-center gap-2">
          {saveMessage && (
            <span className="text-green-600 font-medium">{saveMessage}</span>
          )}
          <button
            onClick={handleSave}
            disabled={!hasChanges || saving}
            className={`${buttonColor} text-white px-6 py-2 rounded-lg font-medium transition disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {saving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>

      <div className="space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto pr-2">
        {/* Morning Routine */}
        <Section title="Morning Routine" icon={<Sun size={20} />}>
          <TimeInput label="Wake up time" value={localData.wakeUpTime} onChange={(v) => updateField('wakeUpTime', v)} />
          <Checkbox label="Brush teeth" checked={localData.brushTeeth} onChange={(v) => updateField('brushTeeth', v)} />
          <Checkbox label="Face wash" checked={localData.faceWash} onChange={(v) => updateField('faceWash', v)} />
          <Checkbox label="Bathroom visit" checked={localData.bathroomMorning} onChange={(v) => updateField('bathroomMorning', v)} />
          <Select label="Drink" value={localData.morningDrink} onChange={(v) => updateField('morningDrink', v)} options={['Juice', 'Tea', 'Coffee']} />
          <Checkbox label="Breakfast eaten" checked={localData.breakfast} onChange={(v) => updateField('breakfast', v)} />
          <TextInput label="What breakfast" value={localData.breakfastWhat} onChange={(v) => updateField('breakfastWhat', v)} />
          <NumberInput label="Water intake (glasses)" value={localData.waterMorning} onChange={(v) => updateField('waterMorning', v)} />
        </Section>

        {/* Bath Tracking */}
        <Section title="Bath Tracking" icon={<Droplet size={20} />}>
          <Checkbox label="Bath taken" checked={localData.bathTaken} onChange={(v) => updateField('bathTaken', v)} />
          <Checkbox label="Head bath" checked={localData.headBath} onChange={(v) => updateField('headBath', v)} />
          <Checkbox label="Body bath" checked={localData.bodyBath} onChange={(v) => updateField('bodyBath', v)} />
        </Section>

        {/* Travel to College */}
        <Section title="Travel to College" icon={<Bus size={20} />}>
          <TimeInput label="Bus boarding time" value={localData.busBoardingTime} onChange={(v) => updateField('busBoardingTime', v)} />
          <Select label="Activity during travel" value={localData.travelActivity} onChange={(v) => updateField('travelActivity', v)} 
            options={['Call', 'Reels', 'Study', 'Work', 'Reading']} />
        </Section>

        {/* College Routine */}
        <Section title="College Routine" icon={<Utensils size={20} />}>
          <Checkbox label="Reached college" checked={localData.reachedCollege} onChange={(v) => updateField('reachedCollege', v)} />
          <Checkbox label="Entered class" checked={localData.enteredClass} onChange={(v) => updateField('enteredClass', v)} />
          <Checkbox label="Hourly water reminder" checked={localData.hourlyWater} onChange={(v) => updateField('hourlyWater', v)} />
          <Checkbox label="Break bathroom visit" checked={localData.breakBathroom} onChange={(v) => updateField('breakBathroom', v)} />
          <Checkbox label="Water after bathroom" checked={localData.waterAfterBathroom} onChange={(v) => updateField('waterAfterBathroom', v)} />
          <Checkbox label="Lunch eaten" checked={localData.lunch} onChange={(v) => updateField('lunch', v)} />
          <TextInput label="What lunch" value={localData.lunchWhat} onChange={(v) => updateField('lunchWhat', v)} />
          <NumberInput label="Afternoon water (glasses)" value={localData.waterAfternoon} onChange={(v) => updateField('waterAfternoon', v)} />
          <Checkbox label="Returned to class" checked={localData.returnedClass} onChange={(v) => updateField('returnedClass', v)} />
        </Section>

        {/* Evening Routine */}
        <Section title="Evening Routine" icon={<Coffee size={20} />}>
          <TimeInput label="Bus boarded time" value={localData.busEveningTime} onChange={(v) => updateField('busEveningTime', v)} />
          <Select label="Activity during travel" value={localData.travelActivityEvening} onChange={(v) => updateField('travelActivityEvening', v)} 
            options={['Call', 'Reels', 'Study', 'Work']} />
          <Checkbox label="Reached home" checked={localData.reachedHome} onChange={(v) => updateField('reachedHome', v)} />
          <Checkbox label="Face wash" checked={localData.faceWashEvening} onChange={(v) => updateField('faceWashEvening', v)} />
          <Checkbox label="Bathroom visit" checked={localData.bathroomEvening} onChange={(v) => updateField('bathroomEvening', v)} />
          <NumberInput label="Water intake (glasses)" value={localData.waterEvening} onChange={(v) => updateField('waterEvening', v)} />
          <Checkbox label="Snacks" checked={localData.snacks} onChange={(v) => updateField('snacks', v)} />
          <Select label="Drink" value={localData.eveningDrink} onChange={(v) => updateField('eveningDrink', v)} options={['Juice', 'Tea', 'Coffee']} />
        </Section>

        {/* Night Routine */}
        <Section title="Night Routine" icon={<Moon size={20} />}>
          <Checkbox label="Dinner eaten" checked={localData.dinner} onChange={(v) => updateField('dinner', v)} />
          <TextInput label="What dinner" value={localData.dinnerWhat} onChange={(v) => updateField('dinnerWhat', v)} />
          <NumberInput label="Water intake (glasses)" value={localData.waterNight} onChange={(v) => updateField('waterNight', v)} />
          <Checkbox label="Bathroom after dinner" checked={localData.bathroomNight} onChange={(v) => updateField('bathroomNight', v)} />
        </Section>

        {/* Sleep Tracking */}
        <Section title="Sleep Tracking" icon={<Moon size={20} />}>
          <TimeInput label="Sleep time" value={localData.sleepTime} onChange={(v) => updateField('sleepTime', v)} />
          <TimeInput label="Wake time" value={localData.sleepWakeTime} onChange={(v) => updateField('sleepWakeTime', v)} />
          {localData.sleepTime && localData.sleepWakeTime && (
            <div className="text-sm text-gray-600 mt-2">
              Sleep Hours: {calculateSleepHours(localData.sleepTime, localData.sleepWakeTime)}
            </div>
          )}
          <Select label="Sleep quality" value={localData.sleepQuality} onChange={(v) => updateField('sleepQuality', v)} 
            options={['Good sleep', 'Normal sleep', 'Bad sleep']} />
          <Checkbox label="Dreams came" checked={localData.dreams} onChange={(v) => updateField('dreams', v)} />
          {localData.dreams && (
            <TextArea label="Dream description" value={localData.dreamDesc} onChange={(v) => updateField('dreamDesc', v)} />
          )}
        </Section>

        {/* Extra Activities */}
        <Section title="Today Extra Activities" icon={<Heart size={20} />}>
          <TextArea label="Exercise" value={localData.exercise} onChange={(v) => updateField('exercise', v)} />
          <TextInput label="Mood" value={localData.mood} onChange={(v) => updateField('mood', v)} />
          <TextInput label="Stress level" value={localData.stress} onChange={(v) => updateField('stress', v)} />
          <TextArea label="Health notes" value={localData.healthNotes} onChange={(v) => updateField('healthNotes', v)} />
          <TextArea label="Important events" value={localData.importantEvents} onChange={(v) => updateField('importantEvents', v)} />
        </Section>

        {/* Private Message */}
        <Section title="Message to My Love" icon={<MessageCircle size={20} />}>
          <TextArea 
            label="Private thoughts you can't say through phone..." 
            value={localData.privateMessage} 
            onChange={(v) => updateField('privateMessage', v)} 
            rows={4}
          />
        </Section>
      </div>
    </div>
  )
}

// Helper Components
const Section = ({ title, icon, children }) => (
  <div className="bg-white/60 rounded-lg p-4 shadow-sm">
    <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
      {icon} {title}
    </h3>
    <div className="space-y-3">
      {children}
    </div>
  </div>
)

const Checkbox = ({ label, checked, onChange }) => (
  <label className="flex items-center gap-2 cursor-pointer">
    <input
      type="checkbox"
      checked={checked || false}
      onChange={(e) => onChange(e.target.checked)}
      className="w-5 h-5 rounded cursor-pointer"
    />
    <span className="text-sm">{label}</span>
  </label>
)

const TimeInput = ({ label, value, onChange }) => (
  <div>
    <label className="block text-sm font-medium mb-1">{label}</label>
    <input
      type="time"
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
    />
  </div>
)

const TextInput = ({ label, value, onChange }) => (
  <div>
    <label className="block text-sm font-medium mb-1">{label}</label>
    <input
      type="text"
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
    />
  </div>
)

const NumberInput = ({ label, value, onChange }) => (
  <div>
    <label className="block text-sm font-medium mb-1">{label}</label>
    <input
      type="number"
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
      min="0"
    />
  </div>
)

const Select = ({ label, value, onChange, options }) => (
  <div>
    <label className="block text-sm font-medium mb-1">{label}</label>
    <select
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
    >
      <option value="">Select...</option>
      {options.map(opt => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
  </div>
)

const TextArea = ({ label, value, onChange, rows = 3 }) => (
  <div>
    <label className="block text-sm font-medium mb-1">{label}</label>
    <textarea
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      rows={rows}
      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none resize-none"
    />
  </div>
)

const calculateSleepHours = (sleepTime, wakeTime) => {
  if (!sleepTime || !wakeTime) return '0h 0m'
  
  const [sleepHour, sleepMin] = sleepTime.split(':').map(Number)
  const [wakeHour, wakeMin] = wakeTime.split(':').map(Number)
  
  let totalMinutes = (wakeHour * 60 + wakeMin) - (sleepHour * 60 + sleepMin)
  if (totalMinutes < 0) totalMinutes += 24 * 60
  
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60
  
  return `${hours}h ${minutes}m`
}

export default UserPanel
