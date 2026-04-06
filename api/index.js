process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const menuRoutes = require('./routes/menuRoutes');
const orderRoutes = require('./routes/orderRoutes');
const tableRoutes = require('./routes/tableRoutes');
const reservationRoutes = require('./routes/reservationRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const announcementRoutes = require('./routes/announcementRoutes');

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
