process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('../backend/src/routes/authRoutes');
const menuRoutes = require('../backend/src/routes/menuRoutes');
const orderRoutes = require('../backend/src/routes/orderRoutes');
const tableRoutes = require('../backend/src/routes/tableRoutes');
const reservationRoutes = require('../backend/src/routes/reservationRoutes');
const paymentRoutes = require('../backend/src/routes/paymentRoutes');
const announcementRoutes = require('../backend/src/routes/announcementRoutes');

const app = express();

app.use(cors({
  origin: ['https://restaurant-ms-gilt.vercel.app', 'http://localhost:5173'],
  credentials: true
}));
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/menu', menuRoutes);
app.use('/orders', orderRoutes);
app.use('/tables', tableRoutes);
app.use('/reservations', reservationRoutes);
app.use('/payments', paymentRoutes);
app.use('/announcements', announcementRoutes);

module.exports = app;
