const express=require("express");
const app=express();
const bodyParser=require("body-parser");
const { urlencoded } = require("body-parser");
const https=require("https");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.get("/",function(req,res){
res.sendFile(__dirname+"/signup.html");
});
app.post("/",function(req,res){
var firstname=req.body.fname;
var lastname=req.body.lname;
var email=req.body.email;
var data={
    members:[
        {
            email_address:email,
            status:"subscribed",
            merge_fields:{
               FNAME:firstname,
               LNAME:lastname
            }
        }
    ]
};
const jsonData=JSON.stringify(data);

const url="https://us17.api.mailchimp.com/3.0/lists/67a90567cd";   
const options={method:"POST",
    auth:"puneet01:1abca58bc6337b7fdf79e7c8143675bc-us17"
}
const request=https.request(url,options,function(response){
    if(response.statusCode===200)
    res.sendFile(__dirname+"/sucess.html");
    else
    res.sendFile(__dirname+"/failure.html");
response.on("data",function(data){
console.log(JSON.parse(data));
});

});
request.write(jsonData);
request.end();
});
app.post("/failure",function(req,res){
res.redirect("/");
});
app.listen(process.env.PORT|| 3000);
//1abca58bc6337b7fdf79e7c8143675bc-us17 replace X in url with 17
//67a90567cd list id
//curl -X POST \
//'https://server.api.mailchimp.com/3.0/lists/{list_id}?skip_merge_validation=<SOME_BOOLEAN_VALUE>&skip_duplicate_check=<SOME_BOOLEAN_VALUE>' \
//-H 'authorization: Basic <USERNAME:PASSWORD>' \
//-d '{"members":[],"update_existing":false}'
