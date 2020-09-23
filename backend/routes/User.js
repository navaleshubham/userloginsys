var express= require('express')
var cors=require('cors')
var bcrypt=require('bcryptjs')
var router=express.Router()
const  User=require('../models/User')
router.use(bodyParser.json()); // for parsing application/json
router.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
const jwt = require('jsonwebtoken');


router.post('/Register',(req,res)=>{
    console.log(req.body)
    User.find({email:req.body.email},(err,result)=>{
        if(err){
            return res.send({'error':err});
        }
        else{
            if(result.length==0) {
                bcrypt.hash(req.body.password, 10, async function (err, hash) {
                    req.body.password = hash;
                    await User.create(req.body, (err, User) => {
                        if (err) {
                            return res.send({'error': err});
                        }
                        else {
                            User.save()
                            token=jwt.sign({email:req.body.email}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 1500 });
                            console.log(User,token)
                            return res.send({'User':User,'token':token});
                        }
                    })
                })
            }
            else{
                return res.send("User alredy present");
            }

        }
    })
})

router.post('/Login',(req , res)=>{

    User.find({email:req.body.email},(error,result)=>{
        if(error){
            console.error(error)
        }
        else{
            console.log(result)
            if(result.length!==0){
                bcrypt.compare(req.body.password, result[0].password, function (err, results) {
                    if (err) {
                        return res.send(err)
                        console.log(err)
                    } else {
                        if (results) {
                            token = jwt.sign({
                                    email: result.email
                                },
                                process.env.ACCESS_TOKEN_SECRET, {expiresIn: 1500});
                            data = {}
                            data.data = result[0]
                            data.token = token
                            console.log(data)
                            return res.send(data);
                        }
                    }
                })
            }
        else {
            return res.send('User not found')
            }
        }
    })
})
module.exports=router;