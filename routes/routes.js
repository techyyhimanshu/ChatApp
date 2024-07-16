const express = require('express')
const router = express.Router()
const userController=require("../controllers/userController")

router.route(["/login","/"]).get((req, res) => {
    res.render('login')
})

router.route("/chats").get((req, res) => {
    if(req.session.user){
        res.render('homepage',{ users: req.session.allUsers, currentUser:req.session.user})
    }
    else{
        res.redirect("/login")
    }
})
router.route('/api/user/login').post(userController.authenticateUser)
module.exports = router