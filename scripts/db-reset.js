const fs=require('fs'); const path=require('path'); const {pool}=require('../src/config/db');
(async()=>{ await pool.query('DROP SCHEMA public CASCADE; CREATE SCHEMA public;'); await pool.query(fs.readFileSync(path.join(__dirname,'../sql/schema.sql'),'utf8')); console.log('DB reset completed'); await pool.end(); })().catch(e=>{console.error(e);process.exit(1)});
