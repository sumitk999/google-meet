const express  = require("express")
// const browser = require("./browser")
const teamBrowser = require("./teamBrowser copy")
// const puppeteer  = require('puppeteer')
// import * as path from 'path';
// const join = require('./public/routes/route')
const app = express()




app.use(express.json());
// app.get("/join",()=>{
    
// })
// browser.newBrowser()
teamBrowser.newBrowser()
// app.use('/meet',join)
app.listen(9000,()=>{
    console.log("server is running on 9000");
})