
const express = require('express')
const router = express.Router();
const Controller = require('../controller/dep');
const validation=require('../validations/dep');
router.post('/dep',validation,Controller.Create);
router.get('/:id',validation,Controller.findById);
router.put('/dep',validation,Controller.update);
router.delete('/:id',validation,Controller.destroy);
module.exports=router;