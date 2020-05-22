const router = require("express").Router();
const userController = require("../controllers/userController");
const middlewearController = require('../controllers/middlewearController');
const twitteController = require('../controllers/twitteController');

router.post("/login", userController.login);
router.post("/register", middlewearController.authCheck , userController.register);
router.post("/dashboard", middlewearController.tokenCheck, twitteController.twitte);
router.get("/dashboard", twitteController.getTwitte);
router.post("/id_author", userController.getAuthors);

module.exports = router;
