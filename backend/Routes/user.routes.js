const router = require("express").Router();
const userController = require("../Controllers/userController");
const { verifyTokenAndAuthorization, verifyToken } = require("../middleware/verifyToken");

router.put("/:id", verifyTokenAndAuthorization, userController.updateUser);
router.post("/:id",verifyTokenAndAuthorization, userController.deleteUser);
router.get("/:id",verifyToken, userController.getUser);

module.exports = router;
