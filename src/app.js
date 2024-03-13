const express = require('express');
const port = 8080; 
const app = express();
const handlebars = require('express-handlebars');
const { generateToken, authToken } = require('./utils');


/** middlewares */
app.use(express.static(`${__dirname}/public`))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

/** handlebars config */
app.engine('handlebars',handlebars.engine());
app.set('views',__dirname+'/views');
app.set('view engine','handlebars');


/** "DATABASE" */
const users = [{ first_name: 'john', email: 'JohnDoe@gmail.com', password: '1234' }];



//** VIEWS  ROUTES */

app.get('/register', (req, res)=>{
    res.render('register')
})
app.get('/login', (req, res)=>{
    res.render('login')
})
app.get('/home', (req, res)=>{
    res.render('home')
})


/** API Routes */




app.post('/api/register', (req, res)=>{
    const {first_name, email, password} = req.body; 

    if(users.find(u=>u.email == email && u.password == password)){
        return res.status(400).send({status:'error', error:'User already exists'})
    }

    const user = {first_name, email, password}
    users.push(user)
    console.log(users); 


    const access_token = generateToken(user)
    res.send({status:'success', message:'successful register', access_token})

})

app.post('/api/login', (req, res)=>{
    const {email, password} = req.body; 

    const user = users.find(u=>u.email == email && u.password == password)
    if(!user){
        return res.status(400).send({status:'error', error:'invalid credentials'})
    }

    const access_token = generateToken(user);
    res.send({status:'success', message:'successful login', access_token})

})

app.get('/api/current', authToken, (req, res)=>{
    res.send({status:'sucesss', payload: req.user})
})



app.listen(port, ()=>console.log(`up and running on port ${port}`))