const jwt = require("jwt-then");

module.exports = {
  authCheck(req, res, next) {
    const { password } = req.body;
    if (password.length < 6) {
      res.status(401).send("Password must be atleast 6 characters long.");
    }
    else next();
  },

  async tokenCheck(req, res, next) {
    try {
      const token = req.headers['authorization'];
     // console.log("token du tocken check : ", token);
      const decodedToken = await jwt.verify(token, process.env.SECRET);
    //  console.log("token decodedToken check : ", decodedToken);
      const userId = decodedToken.userId;
    //  console.log(userId);
      if (userId) {
        req.body.userId = userId;
        next();
      } else {
        throw 'Invalid user ID';
      }
    } catch (e) {
      console.log(e);
      res.status(401).json({
        error: new Error('Invalid request!')
      });
    }
  }
}   