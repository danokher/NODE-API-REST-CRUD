/* 0 Node.js intall */

/* 1 console type npm init -y to create package.json */

/* 2 create new file server.js */

/* 3 you can run this file with node command
typing node server.js */

/* 4 I want to run this files with package.json so
on "scripts" inside package.json I create "serve"
and follow with this command ("serve": "node server.js") 
so If i want to run this files, I type npm run serve */

/* 5 Install Express in the project, npm i express 
we will see node_modules folder 
, you will see in dependecies on package.json*/

/* 6 Looking into express documentation */

/* 7 const + express viariable and require the 
package from express */
/* ---------------------------------------- */
const Product = require('./models/productModel')
/* ---------------------------------------- */
const express = require('express')
const app = express()


/* ---------------------------------------- */

app.use(express.json())

/* ---------------------------------------- */

app.use(express.urlencoded({extended: false}))

/* ---------------------------------------- */

/* 8 Access this website through web browser, we need 
to declare routes */

/* 9 .get means getRoute then acces to callback function with
2 parameters, request and respond */

/* ROUTES */

app.get("/", (req, res) => {
    res.send('Hello NODE API')
})

/* 10 You have to stop the process to acces localhost:3000 on the 
web browser, ctrl + c and yes, and run it again npm run serve */

/* 11 we can choose application like postman or imsomniac to 
interact with our application, download and install */

/* 12 GET http://localhost:3000 on insomnia to connect */

/* 13 Im going to use git to keep tracking of my code
stop terminal and type git init */

/* new file .gitignore because we dont want to save evrthng 
on git, inside we type node_modules */

/* type git add . to add every file
and the git commit -m "" to save every
file that has been change or added,
we could add git commit -m "initial project" */

/* Next instal Nodemon, every time I change
smthng I have to stop my app and run it again
thats why we use Nodemon npm i nodemon -D 
we will see installed on package.json*/

/* we add on the json scripts
"dev": "nodemon server.js"
and type npm run dev instead of serve 
watch out the coma! at the end of serve */

/* another route if we go to insomnia and click send
we will see Hello Blog */

app.get("/blog", (req, res) => {
    res.send('Hello Blog')
})


/* How to connect to the app to a Database
like MongoDB, we need mongoose package
go to npmjs.com and search mongoose that is
npm i mongoose   stop server and install
and npm run dev again */

/* free database on Mongodb amazonAWS
create new user admin password admin
IP Address 0.0.0.0 Description anyone can access
finish and wait the database creation
then click connect, your application
and copy the below and change user and password
and the collection name after the .net/ 
remove <> from the password */

const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://admin:admin@apirestcrud.g5s25ti.mongodb.net/Node-API?retryWrites=true&w=majority')
.then(() => {
    console.log('connected to MongoDB')
    app.listen(3000, ()=> {
        console.log(`Node Api is running on port 3000`)
    });
}).catch((error) => {
    console.log(error)
})

/* Create a model for data in database
we have our node app connected to mongoDB
remember if i want to save info from the node app
to the database, by using model on the app,
 product model in databse will be product data 
 inside product model we have product schema 
 lets create a folder named models, inside
 we create new file for example productModel.js
 we need to include mongoose in this file

 const mongoose = require('mongoose') 

 everything that iteract with DB we use mongoose
 In order to create product model we need 
 product shcema 

 const productSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required : [true, "Please enter a product name"]
        },
        quantity: {
            type: Number,
            required: true,
            default: 0
        },
        price: {
            type: Number,
            required: true,
        },
        image: {
            type: String,
            required: false,
        }
    },
    {
        timestamps: true
    }
 )
 
 */ 

 /* We have schema now we can create model
 
 const Product = mongoose.model('Product', productSchema);

 to export this out 

 module.exports = Product;

 */

 /* Use a model to save data in mongoDB
 when a user hit this route
 route for saving data into the DB
 method should be POST
 
 app.post('/product', (req, res) => {
    console.log(req.body);
    res.send(req.body)
 })
 
 */
/* ----------------------------------------- */
 app.post('/products', async(req, res) => {
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product);

    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
 })

 /* ----------------------------------------- */

 /* go to Insomnia, create a new folder Node API
 create a new request the method sould be POST
 http://localhost:3000/product 
 it responds nothing because we didnt send nothing
 to this URL 
 go to insomnia, body, json, and create data that
 we want to send 

 {
    "name": "soap",
    "quantity": 5,
    "price": 5,
    "image": "https://t1.uc.ltmcdn.com/es/posts/6/3/5/propiedades_del_jabon_de_rosa_mosqueta_44536_600.webp"
 } 

 
 
 we have to specify json middleware so our app can understand json
 
 app.use(express.json())
 
 at the beginning before routes not here it wont work

 and then we send
 */

 /* now lets save data that we get from request or the clients
 to the database 
 
 lets remove this 
 
 app.post('/product', (req, res) => {
    -> console.log(req.body);
    -> res.send(req.body)
 })

 app.post('/product', (req, res) => {
    
 })

 and do this 

app.post('/product', async(req, res) => {
    try {
        const product = await Product

    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
 })

we interact with database so we should put await and async
and then we put Product.create(req.body) for new model

 and import on the top product model

 const Product = require('./models/productModel')

 we want to respond back with the data that we stored into
 the database so we put res.status(200).json(product);
 
 if we send on insomnia, we will see new record which is
 id, createdAT, updatedAt, means that we successfully save 
 data into mongoDB

 go into mongoDB Browse Collections, we will see the data
 inside products inside Node API */

 /* save more data into the database 
 like shampoo and soy sauce and send with post on insomnia
 refresh on mongo and we will see the new data */

 /*  Fetch or get data from database 
 
app.get('/products', async(req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
 })

 */

 app.get('/products', async(req, res) => {   // get request, route products, change app.post to product"s" too
    try {                                           // should be async callback function because we have to interact with database
        const products = await Product.find({});        // then we use req and res, and try and catch to handle alert
        res.status(200).json(products);                 // we declare variable product, and use productmodel to access data in the DB
    } catch (error) {                                     // function find to get all products, with empty curly braces that mean it will get all products.
        res.status(500).json({message: error.message})   // respond this products to clients
    }
 })

 /* lets test it, insomnia, Node API, new request,
 rename Fetch Products (get) and the previous one should be
 smthng like Save a Product (post) 
 
 we paste on Fetch Products http://localhost:3000/products and send to our app */

 /* we get all the products from the DB, if we want a single product
 from ID, pretty much the same but specifying the ID
 
 we add :id, declare const product no products, and .findById(id);
 we declare id -> const {id} = req.params;
 and dont use curly braces, it should take as an argument, 
 rather than being inside an object.

 like this */

 app.get('/products/:id', async(req, res) => {   
    try {        
        const {id} = req.params;                                  
        const product = await Product.findById(id);       
        res.status(200).json(product);                
    } catch (error) {                                     
        res.status(500).json({message: error.message})   
    }
 })

 /* Lets test it, insomnia, duplicate Fetch Products, 
 name it Fetch a Product by ID, grab an id from the list 
 and add to the url on Fetch a Product, products/345345... */

 /* Update or edit data in the database 
 lets create a new route with put (to update a product)
 and with .findByIdAndUpdate  we have to type 2 parameters
 first one the ID second one the data that we want to update
 req.body sent from clients */

 app.put('/products/:id', async(req, res) => {   
    try {        
        const {id} = req.params;                                  
        const product = await Product.findByIdAndUpdate(id, req.body); 
        if(!product){                        // we cannot find any product in database
           return res.status(404).json({message: `cannot find any product with the ID ${id}`}) 
        }  
        const updatedProduct = await Product.findById(id);    // to have the latest information from the DB
        res.status(200).json(updatedProduct);      // if the product is updated successfully     

    } catch (error) {                                     
        res.status(500).json({message: error.message})   
    }
 })

 /* go to insomnia, duplicate fetch a product by id,
 to Update a Product by ID and select PUT instead of GET
 in our route we specified put, go to body, json, 
 
 {
    "name": "Baby Shampoo"
 }

 and we updated the name
 
 */

 /* If we want to use form url enconde instead of jason
 just put name on the left and shampoo on the right
 or add field price and change the price
 but we need to set the middleware

 --> app.use(express.urlencoded({extended: false})) 

 But at the begining not here, it wont work */

 /* Remove or Delete data from the DataBase 
 .delete and .findIdAndDelete */

 app.delete('/products/:id', async(req, res) => {   
    try {        
        const {id} = req.params;                                  
        const product = await Product.findByIdAndDelete(id); 
        if(!product){                        
           return res.status(404).json({message: `cannot find any product with the ID ${id}`}) 
        }    
        res.status(200).json(product);       

    } catch (error) {                                     
        res.status(500).json({message: error.message})   
    }
 })

 /* Insomnia, Node API, new http request, paste an ID and method DELETE */
 
