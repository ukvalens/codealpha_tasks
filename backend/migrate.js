const pool = require('./src/config/database');

async function migrate() {
  try {
    await pool.query(`ALTER TABLE users ADD COLUMN IF NOT EXISTS reset_pending BOOLEAN DEFAULT false`);
    console.log('✅ Migration done: reset_pending column added');
    process.exit(0);
  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    process.exit(1);
  }
}

migrate();
