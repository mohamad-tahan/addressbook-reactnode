const { Router } = require('express');
const { get, register, login } = require('./controller/user');
const {addCont, getCont, removeContact, updateContact} = require('../contact/controller/contact')
const router = Router();
const testMiddleware = require('../../middleware/test');

// req -> from postman
// res -> your api response

router.get('/', testMiddleware(), (req, res) => get(req, res));
router.post('/auth/register', register);
router.post('/auth/login', login);
router.post('/auth/addcontact', addCont)
router.delete('/auth/removecontact', removeContact);
router.put('/auth/updatecontact', updateContact);
router.get('/getcontacts', testMiddleware(), (req, res) => getCont(req, res));


module.exports = router;