const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');
const { authMiddleware, roleCheck } = require('../middleware/auth');

router.get('/categories', menuController.getCategories);
router.post('/categories', authMiddleware, roleCheck('admin', 'manager'), menuController.createCategory);
router.get('/items', menuController.getMenuItems);
router.post('/items', authMiddleware, roleCheck('admin', 'manager'), menuController.createMenuItem);
router.put('/items/:id', authMiddleware, roleCheck('admin', 'manager'), menuController.updateMenuItem);
router.delete('/items/:id', authMiddleware, roleCheck('admin', 'manager'), menuController.deleteMenuItem);

module.exports = router;
