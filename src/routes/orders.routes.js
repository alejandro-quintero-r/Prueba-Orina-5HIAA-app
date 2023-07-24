const {Router} = require('express');
const router = Router();

const {isAuthenticated, isAdmin, isLab_Staff, isPhysician} = require('../helpers/auth');

const {renderForm, findUserByIdentification, findOrders } = require('../controllers/orders.controllers')

// Creación de órdenes médicas
router.get('/orders/form', isAuthenticated, isPhysician, renderForm);
router.post('/orders/form', isAuthenticated, isPhysician, findUserByIdentification);

// Visualización de órdenes médicas
router.get('/orders/allOrders',isAuthenticated, isLab_Staff, findOrders);



module.exports = router;