import pool from './db.js'

const initDatabase = async () => {
  try {
    // Create users table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)

    // Create routine_data table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS routine_data (
        id SERIAL PRIMARY KEY,
        user_name VARCHAR(50) NOT NULL,
        date DATE NOT NULL,
        data JSONB NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(user_name, date)
      )
    `)

    // Insert default user if not exists
    await pool.query(`
      INSERT INTO users (username, password)
      VALUES ('sumo@gmail.com', 'sumosofa')
      ON CONFLICT (username) DO NOTHING
    `)

    console.log('✅ Database tables created successfully!')
    console.log('✅ Default user created: sumo@gmail.com')
    
  } catch (error) {
    console.error('❌ Error initializing database:', error)
  } finally {
    pool.end()
  }
}

initDatabase()
