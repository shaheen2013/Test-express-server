const express = require("express");

const app = express();
// The express.json() function is a built-in middleware function in Express. It parses incoming requests with JSON payloads and is based on body-parser.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = 8000;

app.get("/sum",(req,res)=>{
    
    const num1 = Number(req?.query?.num1);
    const num2 = Number(req?.query?.num2);
    
    res.status(200).json([{id:1, input: {num1,num2} ,output:Number(num1)+Number(num2)||0 }]);
})

app.get("/",(req,res)=>{
    res.status(200).json({ msg: "Welcome to test" });
})



app.listen(port, () => console.log("server started on", port));