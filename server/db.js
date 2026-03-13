import pg from 'pg'
import dotenv from 'dotenv'

dotenv.config()

const { Pool } = pg

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
})

// Test connection
pool.on('connect', () => {
  console.log('✅ Connected to NeonDB successfully!')
})

pool.on('error', (err) => {
  console.error('❌ Database connection error:', err.message)
})

export default pool
