const express = require('express')
const User = require('../models/Users')
const passport = require('passport')

const route = express.Router()



route.get('/register',  (req,res) => {
    res.render('register')

})

route.post('/register',async (req,res) => {


    
    const {email,username,password,isProfessional} = req.body
    if(isProfessional){

        const usr = new User({email,username,isProfessional})
        const registeredUser = await  User.register(usr,password)
    }
    else{
        const usr = new User({email,username})
        const registeredUser = await User.register(usr,password)
    }
    
    res.redirect('/bids/all')


})

route.get('/login', (req,res) => {

    res.render('login')
})

route.post('/login', passport.authenticate('local', { 
    failureFlash: true,
     failureRedirect: '/user/login',
    successFlash: true}), (req,res)=> {

     req.flash('success', 'successfully logged in , welcome back :)')
        console.log(req.user)
     res.redirect('/bids/all')
        


     })

route.get('/logout', (req,res) => {

    req.logOut()
    res.redirect('/bids/all')
})







module.exports.userRouter = route