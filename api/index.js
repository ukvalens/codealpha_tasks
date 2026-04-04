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

const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json());

app.get('/', (req, res) => res.json({ message: 'Restaurant Management System API' }));
app.use('/api/auth', authRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/tables', tableRoutes);
app.use('/api/reservations', reservationRoutes);
app.use('/api/payments', paymentRoutes);

module.exports = app;
