const express = require("express");
const QRCode = require("qrcode");
const router = express.Router();
const { pool: db } = require("../config/db");
const { requireAuth } = require("../middleware/auth");

// QR List Page
router.get("/", requireAuth, async (req, res) => {
  const tenantId = req.user.tenant_id;

  const result = await db.query(
    "SELECT * FROM qr_locations WHERE tenant_id=$1 ORDER BY floor_name, location_name",
    [tenantId]
  );

  res.render("qr/locations", {
    title: "QR Location Master",
    locations: result.rows
  });
});

// Create QR Location
router.post("/create", requireAuth, async (req, res) => {
  const tenantId = req.user.tenant_id;
  const { floor_name, location_name, department } = req.body;

  const baseUrl = process.env.APP_URL || "https://your-app.onrender.com";

  const complaintUrl =
    `${baseUrl}/complaint/new?tenant=${tenantId}` +
    `&floor=${encodeURIComponent(floor_name)}` +
    `&location=${encodeURIComponent(location_name)}`;

  const qrCode = await QRCode.toDataURL(complaintUrl);

  await db.query(
    `INSERT INTO qr_locations 
    (tenant_id, floor_name, location_name, department, qr_code, complaint_url)
    VALUES ($1,$2,$3,$4,$5,$6)`,
    [tenantId, floor_name, location_name, department, qrCode, complaintUrl]
  );

  res.redirect("/qr-locations");
});

module.exports = router;
