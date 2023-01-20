const express  = require("express")
const browser = require("./browser")
// const teamBrowser = require("./test")
const teamBrowser = require("./teamBrowser")
const app = express()

app.use(express.json());

// browser.newBrowser()
teamBrowser.newBrowser()

app.listen(9000,()=>{
    console.log("server is running on 9000");
})