const express  = require("express")
const browser = require("./browser")
// const teamBrowser = require("./test")
const teamBrowser = require("./teamBrowser")
const app = express()

app.use(express.json());

// browser.newBrowser()
teamBrowser.newBrowser()
app.get('/msTeams',async(req,res)=>{
    res.send("Called Successfully!!!")

})

app.listen(9000,()=>{
    console.log("server is running on 9000");
})