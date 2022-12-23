const { createUserServices, userLoginServices } = require("../services/users.service")
const bcrypt = require('bcrypt');
require('dotenv').config();
const jwt = require('jsonwebtoken');


module.exports.createUser = async (req, res) => {
    try {
        // save or create
        // create
        const result = await createUserServices(req.body)
        // result.logger()
        // instance creation -> do something-> use save() method
        // const product = new Product(req.body);
        // const result = await product.save()
        res.status(200).json({
            status: 'success',
            message: 'user post successfully',
            data: result,
        })
    } catch (error) {
        res.status(400).json({
            status: "Failed",
            message: "user is not inserted",
            message: error.message
        })
    }
}


module.exports.loginUser = async (req, res) => {
    // res.send("hitted");

    try {
        const user = await userLoginServices(req.body.username);
        // console.log(user.length);
        if (user && user.length > 0) {
            const isValidPassword = await bcrypt.compare(req.body.password, user[0].password);
            if (isValidPassword) {

                // IF Valid Password we need generate access token;
                const token = jwt.sign({
                    username: user[0].username,
                    userID: user[0]._id
                }, process.env.ACCESS_TOKEN, {
                    expiresIn: '1h'
                });
                res.status(200).json({
                    status: 'success',
                    message: 'Loing successfully',
                    token,
                })


            } else {
                res.status(403).json({
                    message1: "Authentication failed!"
                })
            }

        } else {
            res.status(403).json({
                message2: "Authentication failed!"
            })
        }

    } catch (error) {
        res.status(403).json({
            message3: "Authentication failed info!"
        })
    }
}