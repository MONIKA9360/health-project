const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

export const login = async (username, password) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    })
    return await response.json()
  } catch (error) {
    console.error('Login error:', error)
    return { success: false, message: 'Connection error' }
  }
}

export const saveRoutineData = async (userName, date, data) => {
  try {
    const response = await fetch(`${API_URL}/routine`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userName, date, data })
    })
    return await response.json()
  } catch (error) {
    console.error('Save routine error:', error)
    return { success: false, message: 'Connection error' }
  }
}

export const getRoutineByDate = async (date) => {
  try {
    const response = await fetch(`${API_URL}/routine/${date}`)
    return await response.json()
  } catch (error) {
    console.error('Get routine error:', error)
    return { success: false, message: 'Connection error' }
  }
}

export const getAllRoutineData = async () => {
  try {
    const response = await fetch(`${API_URL}/routine`)
    return await response.json()
  } catch (error) {
    console.error('Get all routine error:', error)
    return { success: false, message: 'Connection error' }
  }
}
