const router = require("express").Router();
const controllers = require("./controllers");

// Basic CRUD
router
    .route("/")
    .post(controllers.create)
    .get(controllers.list)
    .patch(controllers.edit)
    .delete(controllers.delete);

router.post("/siswa/pair", controllers.hubungkanSekolahDenganSiswa);
router.patch("/siswa/unpair", controllers.putuskanHubunganSekolahDenganSiswa);

module.exports = router;
