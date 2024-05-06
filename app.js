const express=require("express")
const collection = require("./mongo")
const cors = require("cors")
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.get("/",cors(),(req,res)=>{

})


app.post("/",async(req,res)=>{
    const{name,email,password}=req.body

    try{
        const check=await collection.findOne({email:email})

        if(check){
            res.json("exist")
        }
        else{
            res.json("not exist")
        }

    }
    catch(e){
        res.json("fail")
    }

})



app.post("/signup",async(req,res)=>{
    const{name,email,password}=req.body

    const data={
        name:name,
        email:email,
        password:password
    }

    try{
        const check=await collection.findOne({email:email})

        if(check){
            res.json("exist")
        }
        else{
            res.json("notexist")
            await collection.insertMany([data])
        }

    }
    catch(e){
        res.json("fail")
    }

})

app.listen(8000,()=>{
    console.log("port connected");
})
















// const express =  require ("express");
// const app = express();
// const mongoose = require("mongoose");
// const cors = require("cors");

// app.use(express.json());
// app.use(cors());

// app.use(express.urlencoded({ extended: true }))

// app.get("/",(req,res)=> {
//     res.send("App is running")
// })

// const users = mongoose.model('Users',{
//     name:{
//         type:String,
//     },
//     email:{
//         type:String,
//         unique:true,
//     },
//     password:{
//         type:String,
//     },
//     cartData:{
//         type:Object,
//     },
//     date: {
//         type:Date,
//         default:Date.now,
//     }

// })

// app.post('/signup',async(req,resp)=> {
//     let check = await Users.findOne({email:req.body.email});
//     if(check) {
//         return res.status(400).json({success:false,errors:"existing users found with same email"});
//     }
//     let cart = {};
//     for(let i =0;i<300;i++) {
//         cart[i]=0;
//     }

//     const user = new Users({
//         name:req.body.username,
//         name:req.body.email,
//         password:req.body.password,
//         cartData:cart, 
//     })

//     await user.save();

//     const data = {
//         user:{
//             id:user.id
//         }
//     }

//     const token = jwt.sign(data,'sec_ecom');
//     res.json({success:true,token})
// })



// app.listen(8000,()=>{
//     console.log("port connected");
// })

