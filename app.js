const express = require('express')
const app = express();
const cors = require('cors');
const productRouter = require('./routes/product.route');
const userRouter = require('./routes/user.route');



// middleware
app.use(express.json())
app.use(cors())


app.get('/', (req, res) => {
    res.send('Route is working  ')
})

app.use('/api/v1/product', productRouter);
app.use('/api/v1/user', userRouter);

// Default error handler 
const errorHandeler = (err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }
    res.status(500).json({
        error: err
    })
}

app.use(errorHandeler)

module.exports = app;
