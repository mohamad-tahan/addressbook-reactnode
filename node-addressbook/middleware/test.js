function testMiddleware() {
    return (req, res, next) => {
      console.log(`- - ${req.query.id} - -`);
  
      // check jwt token if it is valid
      // validate forms
  
      next();
      // res.send('result');
    }
  }
  
  module.exports = testMiddleware;