const {Router} = require('express');
const router = Router();

const {isAuthenticated, isAdmin, isLab_Staff, isPhysician} = require('../helpers/auth');

const {addResult, renderForm, findResults, findMyResults} = require('../controllers/results.controllers')

router.get('/results/form/:orderID', isAuthenticated, renderForm);
router.post('/results/form', isAuthenticated, addResult);

// Visualización de resultados médicos
router.get('/results/allResults', isAuthenticated, isPhysician, findResults);

// Visualización de resultados para cada paciente
router.get('/results/myResults', isAuthenticated, findMyResults);



module.exports = router;