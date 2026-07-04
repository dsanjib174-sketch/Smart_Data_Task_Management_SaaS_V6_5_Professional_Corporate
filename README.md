# Smart Data Task Management SaaS V6.5 Professional Corporate Edition

Node.js + Express + PostgreSQL SaaS starter with JWT-ready session auth, multi-tenant schema, Super Admin, Smart Data Employee Portal, Client Admin Portal, Client Users, Task Management, QR Complaint, comments, attachments, notifications table, subscription plans, invoice generation, analytics and Render deployment.

## Render Commands
First deploy on old database:
```bash
npm install && npm run db:reset && npm run seed
```
Start:
```bash
npm start
```

After first successful deploy, use:
```bash
npm install && npm run db:init && npm run seed
```

## Environment Variables
```env
NODE_ENV=production
DATABASE_URL=postgresql://...
SESSION_SECRET=change-this-long-secret
APP_NAME=Smart Data Task Management
SEED_SUPERADMIN_EMAIL=admin@smartdata.local
SEED_SUPERADMIN_PASSWORD=Admin12345
PASSWORD_RESET_CODE=RESET2026
```

## Login
Email: admin@smartdata.local  
Password: Admin12345

## Important
If you used previous broken versions, run `db:reset` one time only. It clears old tables.
