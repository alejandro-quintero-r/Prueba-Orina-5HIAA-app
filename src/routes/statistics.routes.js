const {Router} = require('express');
const router = Router();

const {renderGenderGraphics, anormalResultsList, renderCityGraphics} = require('../controllers/statistics.controllers')

router.get('/statistics/gender', renderGenderGraphics);
router.get('/statistics/city', renderCityGraphics);
router.get('/statistics/AnormalResultsTracking', anormalResultsList);



module.exports = router;