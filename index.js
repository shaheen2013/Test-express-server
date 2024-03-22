const express = require("express");

const app = express();
// The express.json() function is a built-in middleware function in Express. It parses incoming requests with JSON payloads and is based on body-parser.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = 8000;


app.get('/me', function (req, res) {
    let apiKey = 'api2024';
    if (apiKey === req.headers.apikey) {
       res.status(200).json({status:true,message:'Authenticate successfully' });
        } else {
         res.status(401).json({ status: false, message: 'Invalid Api Key' });
        }
});




app.get("/sum",(req,res)=>{
    const num1 = Number(req?.query?.num1);
    const num2 = Number(req?.query?.num2);
    const dataType = req?.query?.dataType

    let data;

    if(dataType==="object"){
        data = {id:1, input: {num1,num2} ,output:Number(num1)+Number(num2)||0 }
        res.status(200).json(data);
    }
    else{
        data = [{id:1, input: {num1,num2} ,output:Number(num1)+Number(num2)||0 }]
    }
    
    res.status(200).json(data);
})

app.get("/",(_,res)=>{
    res.status(200).json({ msg: "Welcome to test" });
})



app.listen(port, () => console.log("server started on", port));