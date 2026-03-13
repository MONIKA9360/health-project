import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import pool from './db.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

// Middleware
app.use(cors())
app.use(express.json())

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'SUMO Backend is running ❤️💙' })
})

// Login endpoint
app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body

    const result = await pool.query(
      'SELECT * FROM users WHERE username = $1 AND password = $2',
      [username, password]
    )

    if (result.rows.length > 0) {
      res.json({ 
        success: true, 
        message: 'Login successful',
        user: { username: result.rows[0].username }
      })
    } else {
      res.status(401).json({ 
        success: false, 
        message: 'Invalid credentials' 
      })
    }
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({ success: false, message: 'Server error' })
  }
})

// Save routine data
app.post('/api/routine', async (req, res) => {
  try {
    const { userName, date, data } = req.body

    const result = await pool.query(
      `INSERT INTO routine_data (user_name, date, data, updated_at)
       VALUES ($1, $2, $3, CURRENT_TIMESTAMP)
       ON CONFLICT (user_name, date)
       DO UPDATE SET data = $3, updated_at = CURRENT_TIMESTAMP
       RETURNING *`,
      [userName, date, JSON.stringify(data)]
    )

    res.json({ 
      success: true, 
      message: 'Routine saved',
      data: result.rows[0]
    })
  } catch (error) {
    console.error('Save routine error:', error)
    res.status(500).json({ success: false, message: 'Server error' })
  }
})

// Get routine data for a specific date
app.get('/api/routine/:date', async (req, res) => {
  try {
    const { date } = req.params

    const result = await pool.query(
      'SELECT * FROM routine_data WHERE date = $1',
      [date]
    )

    const routineData = {}
    result.rows.forEach(row => {
      routineData[row.user_name] = row.data
    })

    res.json({ success: true, data: routineData })
  } catch (error) {
    console.error('Get routine error:', error)
    res.status(500).json({ success: false, message: 'Server error' })
  }
})

// Get all routine data
app.get('/api/routine', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM routine_data ORDER BY date DESC'
    )

    const allData = {}
    result.rows.forEach(row => {
      if (!allData[row.date]) {
        allData[row.date] = {}
      }
      allData[row.date][row.user_name] = row.data
    })

    res.json({ success: true, data: allData })
  } catch (error) {
    console.error('Get all routine error:', error)
    res.status(500).json({ success: false, message: 'Server error' })
  }
})

app.listen(PORT, () => {
  console.log(`🚀 SUMO Backend running on http://localhost:${PORT}`)
  console.log(`❤️💙 Ready to serve Moni & Surya`)
})
