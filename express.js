const  express = require('express')
const morgan = require('morgan')
const app = express()
const productRoutes = require('./routes/product.routes')


app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended:false}))


app.get("/",(req,res)=>{
  res.send("welcome to express server")
})


// Product Routes
app.use('/product',productRoutes)

app.listen(8000 , () => {
  console.log('Server start at http://localhost:8000');
})