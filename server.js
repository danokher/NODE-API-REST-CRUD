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

const express = require('express')
const app = express()

app.listen(3000, ()=> {
    console.log(`Node Api is running on port 3000`)
})

/* 8 Access this website through web browser, we need 
to declare routes */

/* 9 .get means getRoute then acces to callback function with
2 parameters, request and respond */

app.get("/", (req, res) => {
    res.send('Hello NODE API')
})

/* 10 You have to stop the process to acces localhost:3000 on the 
web browser, ctrl + c and yes. and run it again npm run serve */

/* 11 we can choose application like postman or imsomniac to 
interact with our application, download and install */

/* 12 GET http://localhost:3000 on insomnia to connect */

/* 13 Im going to use git to keep tracking of my code
stop terminal and type git init */

/* new file .gitignore because we dont want to save evrthng 
on git, inside we type node_modules */