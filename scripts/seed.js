const bcrypt=require('bcryptjs'); const {pool}=require('../src/config/db');
(async()=>{ const pass=process.env.SEED_SUPERADMIN_PASSWORD||'Admin12345'; const email=process.env.SEED_SUPERADMIN_EMAIL||'admin@smartdata.local'; const hash=await bcrypt.hash(pass,10);
 await pool.query("INSERT INTO tenants(name,code,status) VALUES('Smart Data','SMARTDATA','active') ON CONFLICT(code) DO NOTHING");
 const t=await pool.query("SELECT id FROM tenants WHERE code='SMARTDATA'");
 await pool.query(`INSERT INTO users(tenant_id,name,email,password_hash,role,status) VALUES($1,$2,$3,$4,'SUPER_ADMIN','active') ON CONFLICT(email) DO UPDATE SET password_hash=EXCLUDED.password_hash, role='SUPER_ADMIN', status='active'`,[t.rows[0].id,'Super Admin',email,hash]);
 await pool.query("INSERT INTO subscription_plans(name,price,user_limit,task_limit,features) VALUES('Trial',0,5,100,'Trial access'),('Basic',999,10,1000,'Basic tasks'),('Standard',2499,50,10000,'QR and analytics'),('Enterprise',9999,500,100000,'Full features') ON CONFLICT(name) DO NOTHING");
 console.log(`Seed completed. Login: ${email} / ${pass}`); await pool.end(); })().catch(e=>{console.error(e);process.exit(1)});
