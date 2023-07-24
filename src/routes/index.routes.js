const {Router} = require('express')
const router =Router();

const {renderIndex } = require('../controllers/index.controllers')

router.get('/', renderIndex);


module.exports = router;