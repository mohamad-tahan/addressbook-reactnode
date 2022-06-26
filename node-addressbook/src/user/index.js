const { Router } = require('express');
const { get, register, login } = require('./controller/user');
const {addCont, getCont, removeContact, updateContact, getContbyId} = require('../contact/controller/contact')
const router = Router();
const testMiddleware = require('../../middleware/test');

// req -> from postman
// res -> your api response

router.get('/', testMiddleware(), (req, res) => get(req, res));
router.post('/auth/register', register);
router.post('/auth/login', login);
router.post('/auth/addcontact', testMiddleware(),addCont);
router.delete('/auth/removecontact', testMiddleware(), removeContact);
router.put('/auth/updatecontact', testMiddleware(), updateContact);
router.get('/auth/getcontacts', testMiddleware(), (req, res) => getCont(req, res));
router.get('/auth/getcontactsbyId', testMiddleware(), (req, res) => getContbyId(req, res));

module.exports = router;