const express = require("express");
const app = express()

app.get("/", (req, res) => {
    res.send("Hello, this is kio");
})

app.listen(80, () => {
    console.log("Webserver started on port 80")
})
