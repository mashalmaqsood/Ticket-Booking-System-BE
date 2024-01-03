const express= require("express")
const {createTerminal,getAllTerminals,updateTerminal}=require("../controllers/terminal")
const userauth = require("../middleware/userauth")
const router= express.Router();

router.post('/createTerminal',createTerminal)
router.get('/getAllTerminals',userauth,getAllTerminals)
router.put('/updateTerminal/:id',updateTerminal)

module.exports = router;