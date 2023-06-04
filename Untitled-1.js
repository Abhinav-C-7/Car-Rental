const express = require("express");
const { Client } = require('pg');
const bodyParser = require("body-parser");
const app = express();
app.use(express.static("public"));

app.set('view engine', 'ejs');

const client = new Client({
    user: 'postgres',
    password: 'Aezakmi724#',
    host: 'localhost',
    database: 'Car-Rental',
    port: '5432',
  });
  
  client.connect()
  .then(() => {
    console.log('Connected to the database');
  })
  .catch((err) => {
    console.error('Error connecting to the database', err);
  });




app.use(bodyParser.urlencoded({extended:true}));



app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
});


//RECIEVING EMAIL AND PASSWORD

app.post("/",function(req,res){


    var mail=req.body.email;
    var pass=req.body.password;
    

    var query ='INSERT INTO user_login(email,password) VALUES($1,$2)';

    client.query(query,[mail,pass],(err,result)=>{

       
    });





    res.sendFile(__dirname+"/main.html");

});





//DATA RECIVED FROM MAIN ie CAR AND PRICE

app.use(express.json());
var car;
var price;
var car_id;
var userid;


app.post('/main', (req, res) => {
 
  car=req.body.key1;
  car_id=Number(req.body.key2);
  price=Number(req.body.key3);
  
  
  res.sendStatus(200);
  
  
});

app.post("/checkout",function(req,res){
  
  var first_name = req.body.fname;
  var last_name = req.body.lname;
  var days = Number(req.body.days);
  var address=req.body.address;
  var final_price=(price*days);
  

  client.connect()
  .then(()=>
  {

    var query_2 ='SELECT user_id FROM user_login WHERE user_id=(SELECT MAX(user_id) FROM user_login )';

     return client.query(query_2);
  })
  .then(result =>
    {
      userid = (result.rows[0].user_id);

      var query_1 ='INSERT INTO checkout(first_name,last_name,address,rental_days,bill_amount,user_id,car_id) VALUES($1,$2,$3,$4,$5,$6,$7)';

      return client.query(query_1,[first_name,last_name,address,days,final_price,userid,car_id]);

    })
    .then(()=>{
      console.log("Data entered ");
    }
    )

  
   
     
    

   

  });
  
  



  res.render("price",{total:final_price,car:car,days:days,baseprice:price});











app.listen(3333,function(){
    console.log("Server is  running");
});