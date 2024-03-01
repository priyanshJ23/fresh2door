const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const axios  = require("axios")
const app = express();

const corsOptions = {
    origin: "https://fresh2door-3.onrender.com" // frontend URI (ReactJS)
}
app.use(express.json({limit: "10mb"}));
app.use(cors(corsOptions));


const PORT = process.env.PORT

// MongoDB
console.log(process.env.MONGODB_URL)
mongoose.set('strictQuery', false)
mongoose.connect(process.env.MONGODB_URL)
.then(() => console.log("Connect to Database"))
.catch((err) => console.log(err))

// Schema
const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String,
        unique: true
    },
    password: String,
    confirmPassword: String,
    image: String,
})

const userModel = mongoose.model("user", userSchema)

// Api
app.get("/", (req, res) => {
    res.send("server is running")
})

// app.post("/signup", (req, res) => {
//     console.log(req.body)
//     const {email} = req.body

//     userModel.findOne({email : email},(err,result) => {
//         console.log(result)
//         console.log(err)
//     })
// })

// api login
// app.post("/login", async (req, res) => {
//     console.log(req.body)
//     const {email} = req.body
//     userModel.findOne({email : email}, (err,result) => {
//         if(result) {
//             console.log(result)
//             res.send({message: "Login successfully", alert : true})
//         }
//     })
// })

app.post("/login", async (req, res) => {
    try {
        console.log(req.body); // log the request body to the console
        const { email } = req.body; // extract the email from the request body using destructuring

        const result = await userModel.findOne({ email: email }).exec();

        if (result) {
            const dataSend = {
                _id: result._id,
                firstName: result.firstName,
                lastName: result.lastName,
                email: result.email,
                image: result.image,
              };
              console.log(dataSend);
            res.send({message: "Login successfully", alert : true, data: dataSend})
        }else {
            res.send({ message: "Email not registered, please sign up", alert : false })
        }

    } catch (err) {
        console.log(err); // log any errors to the console
        res.status(500).send("Server Error"); // send an error response to the client
    }
});

// api signup
app.post("/signup", async (req, res) => {
    try {
        console.log(req.body); // log the request body to the console
        const { email } = req.body; // extract the email from the request body using destructuring

        const result = await userModel.findOne({ email: email }).exec();

        if (result) {
            res.send({message: "Email already exist", alert: false})
        } else {
            const data = userModel(req.body)
            const save = data.save()
            res.send({ message: "Successfully sign up", alert : true})
        }
    } catch (err) {
        console.log(err); // log any errors to the console
        res.status(500).send("Server Error"); // send an error response to the client
    }
});

// product section
const schemaProduct = mongoose.Schema({
    name : String,
    category : String,
    image : String,
    price : String,
    description : String
})
app.post('/getlocation', async (req, res) => {
    try {
        let lat = req.body.latlong.lat
        let long = req.body.latlong.long
        console.log(lat, long)

        let location = await axios
            .get("https://api.opencagedata.com/geocode/v1/json?q=" + lat + "+" + long + "&key=74c89b3be64946ac96d777d08b878d43")
            .then(async res => {
                let response = res.data.results[0].components; 
                let { village, city, state_district, state, postcode } = response
                return String(state_district + "," + "\n" + postcode)
            })
            .catch(error => {
                console.error(error)
            })
        res.send({ location })

    } catch (error) {
        console.error(error.message)
        res.send("Server Error")
    }
})
const productModel = mongoose.model("product", schemaProduct)

// save product api
app.post("/uploadProduct", async(req, res) => {
    console.log(req.body)
    const data = await productModel(req.body)
    const datasave = await data.save()
    res.send({message: "Upload successfully"})
})

// get products
app.get("/product", async (req, res) => {
    const data = await productModel.find({})
    res.send(JSON.stringify(data))
})

app.listen(PORT, () => {
    console.log(`server is running at ${PORT}`)
})

app.get("/test", (req, res) => {
    res.send("test working")
})