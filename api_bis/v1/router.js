const router = require("express").Router();
const controllers = require("./controllers");

// Basic CRUD
router
    .route("/")
    .post(controllers.create)
    .get(controllers.list)
    .patch(controllers.edit)
    .delete(controllers.delete);

router.patch("/driver/set", controllers.setSupirBis);
router.patch("/status/set-emergency", controllers.setKondisiDarurat);
router.patch("/status/unset-emergency", controllers.setKondisiNormal);

module.exports = router;
