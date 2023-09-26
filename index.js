const express = require('express')
const app = express()

app.use(express.json())
app.get('/',(req,res)=>{
    res.send('GET / Method')
})

//connect to MongoDB
const mongoose = require('mongoose')
mongoose
  .connect("mongodb+srv://Toghrul20:020020@e-commercial.k4zsocw.mongodb.net/?retryWrites=true&w=majority")
  .then(() => console.log("T-> MongoDB is connected"))
  .catch(() => console.log("T-> !!MongoDB is NOT CONNECTED!!"));


// Routes 
const productRoutes = require('./routes/products') 
const usersRoutes = require('./routes/users')
app.use('/products',productRoutes)
app.use('/users', usersRoutes)


app.listen(3000, ()=> console.log('T-> Server is running PORT:3000'))