// import pack
const express = require('express');
const admin = require('firebase-admin');
const bcrypt = require('bcrypt');
const path = require('path');
const nodemailer = require("nodemailer");
const fs = require('fs');

// firebase admin setup 
var serviceAccount = require("./ttcs-ecd84-firebase-adminsdk-zoqih-02deeabd91.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

let db = admin.firestore();
// declare static 
let staticPath = path.join(__dirname,"public");
//
const app = express();
// middlewares
app.use(express.static(staticPath));
app.use(express.json());
// routes
//home routes
app.get("/", (req,res)=>{
    res.sendFile(path.join(staticPath,"index.html"));
})
// login 
app.get('/login', (req,res) =>{
    res.sendFile(path.join(staticPath, "login.html"));
})
app.post('/login', (req,res) => {
    let { email , password } = req.body;

    if(!email.length || !password.length){
        return res.json({'alert':'fill all'});
    }
    db.collection('users').doc(email).get()
    .then(user => {
        if(!user.exists){ // if email does not exits
            return res.json({'alert': 'log in email does not exits'})
        }else{
            bcrypt.compare(password, user.data().password, (err, result)=>{
                if(result){
                    let data = user.data();
                    return res.json({
                        name: data.name,
                        email: data.email,
                        seller: data.seller,
                    })
                }else{
                    return res.json({'alert': 'password in incorrect'});
                }
            })
        }
    })
})
// sign up
app.get('/signup',(req,res)=>{

    res.sendFile(path.join(staticPath, "signup.html"));
})
app.post('/signup',(req,res)=>{
    let {name, email, password, number, tac, notification } = req.body;

    if(name.length <3 ){
        return res.json({'alert' : 'name must be 3 letters long'});
    }else if(!email.length){
        return res.json({'alert': 'enter your email'});
    }else if(password.length < 8){
        return res.json({'alert':'password should be 8 letters long'});
    }else if(!number.length){
        return res.json({'alert' : 'enter your phone number'});
    }else if(!Number(number) || number.length < 10){
        return res.json({'alert' : 'invalid number'});
    }else if(!tac){
        return res.json({'alert':'you must agree to our terms'});
    }
    //store user
    db.collection('users').doc(email).get()
    .then(user =>{
        if(user.exists){
            return res.json({'alert' : 'email already exists'});
        }else{
            // encrypt the password
            bcrypt.genSalt(10, (err, salt)=>{
                bcrypt.hash(password, salt,(err, hash) =>{
                    req.body.password = hash;
                    db.collection('users').doc(email).set(req.body)
                    .then(data =>{
                        res.json({
                            name: req.body.name,
                            email: req.body.email,
                            seller: req.body.seller,
                        })
                    })
                })
            })
        }
      })
  
})
//product
app.get('/ukiyo',(req,res)=>{
    res.sendFile(path.join(staticPath, "Ukiyo.html"));
})
app.get('/mabu',(req,res)=>{
    res.sendFile(path.join(staticPath, "mabu.html"));
})
app.get('/meat',(req,res)=>{
    res.sendFile(path.join(staticPath, "meatzero.html"));
})
app.get('/mup',(req,res)=>{
    res.sendFile(path.join(staticPath, "mupsres.html"));
})
app.get('/drink',(req,res)=>{
    res.sendFile(path.join(staticPath, "ddrinks.html"));
})
app.get('/sanji',(req,res)=>{
    res.sendFile(path.join(staticPath, "Sanji.html"));
})
//cart
app.get('/cart',(req,res)=>{
    res.sendFile(path.join(staticPath, "cart.html"));
})
//about
app.get('/about',(req,res)=>{
    res.sendFile(path.join(staticPath, "about.html"));
})
//check out
app.get('/checkout', (req,res)=>{
    res.sendFile(path.join(staticPath,"checkout.html"));
})
app.post('/order', (req, res) => {
    const { order, email, add } = req.body;
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "clonemup02@gmail.com" ,// generated ethereal user
            pass: "juemkzteydqhwzne", // generated ethereal password
        },
    })
    const mailOption = {
        from: 'clonemup02@gmail.com',
        to: email,
        subject: 'Order placed',
        html:
        `
        <html>
        <body>
        <div>
        <h1 class = "heading">dear ${email.split('@')[0]}, <span>your order is sucess</span>
        </h1>
        </div>
        </body>
        </html>
        `
    }
    let docName = email + Math.floor(Math.random() * 123456789);
    db.collection('order')
      .doc(docName)
      .set(req.body)
      .then(data => {
        transporter.sendMail(mailOption,(err,info)=>{
            if(err){
                res.json({'alert':'oops'})
            }else{
                res.json({'alert':'Đặt hàng thành công!'})
            }
        })
      })
      .catch(error => {
        console.error('Error saving order:', error);
        res.json({ alert: 'An error occurred while placing the order' });
      });
  });
  
// email-gift //

app.post('/sendMail-gift',async(req,res) =>{
    const {email} = req.body;
    let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "clonemup02@gmail.com" ,// generated ethereal user
      pass: "juemkzteydqhwzne", // generated ethereal password
    },
    });
  // send mail with defined transport object
    await transporter.sendMail({
    from: "clonemup02@gmail.com", // sender address
    to: `${email}`, // list of receivers
    subject: "Gift", // Subject line
    text: "Niềm vui của bạn là phần thưởng cho chúng tôi! Hãy đặt hàng ngay nào!", // plain text body
    html:
    `<html>
    <body>
    <div>
    <h1>Trở thành khách hàng để nhận những ưu đãi tốt nhất</h1>
    <a href = "/login">Đăng kí</a>
    </div>
    </body>
    </html>
    ` 
    , 
  },(err) =>{
    if(err){
        return res.json({
            message: "Loi  0 ngu ",
            err,
        });
    }
    return res.json({
        message: `Done , ${email}`,
    })
  });
})

// 404
app.get('/404',(req,res)=>{
    res.sendFile(path.join(staticPath, "404.html"));
})

app.use((req,res)=>{
    res.redirect('/404');
})
app.listen(3002,()=>{
    console.log('listening on port 3002.......');
})