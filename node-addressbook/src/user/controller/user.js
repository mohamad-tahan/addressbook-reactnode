const { getUsers, getById, addUser, getByEmail } = require('../service');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const TOKEN_SECRET = process.env.TOKEN_SECRET || "";

console.log("hi");



async function get(req, res) {
    console.log(req);
  try {
    console.log(req.query);

    if (req.query.id) { // ?id=k1231 -> query paramet
      const id = req.query.id;
      const result = await getById(id);
      console.log('result of specific user =>', result);
      return res.send(result);
    }

    const result = await getUsers();
    console.log('result =>', result);

    return res.send(result);
  } catch (error) {
    console.log(error);
  }
}

async function register(req, res) {
  try {
    console.log(req.body);

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    const addUserResult = await addUser(req.body, hashPassword);
    console.log('addUserResult =>', addUserResult);
    
    return res.send({ user: addUserResult._id });
  } catch (error) {
    console.log(error);
  }
}

async function login(req, res) {
  try {
    const user = await getByEmail(req.body.email);
    if (!user) return res.status(400).send('invalid credentials');

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('invalid credentials');

    const token = jwt.sign(
      {_id: user._id, name: user.name, email: user.email},
      TOKEN_SECRET
    );

    return res.header('token', token).send({token:  `${token}`});
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

module.exports = {
  get,
  register,
  login,
};