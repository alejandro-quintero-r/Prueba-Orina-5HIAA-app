const {Router} = require('express');
const router = Router();

const {isAuthenticated, isAdmin, isLab_Staff, isPhysician} = require('../helpers/auth');

const {renderForm, findUserByIdentification, findOrders, editOrder, editOrderForm } = require('../controllers/orders.controllers')

// Creación de órdenes médicas
router.get('/orders/form', isAuthenticated, isPhysician, renderForm);
router.post('/orders/form', isAuthenticated, isPhysician, findUserByIdentification);

// Visualización de órdenes médicas
router.get('/orders/allOrders',isAuthenticated, isLab_Staff, findOrders);

// Programar fecha y hora para la cita medica
router.get('/orders/bookingForm/:id', isAuthenticated, editOrderForm); ///Formulario para editar ordenes
router.put('/orders/bookingForm/:id', isAuthenticated, editOrder); //actualiza orden








module.exports = router;