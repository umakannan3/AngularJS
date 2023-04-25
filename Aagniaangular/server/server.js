const express = require("express");
const cors = require('cors');

const data = require('mysql');

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.static('public'));


//establish the connection:

let con = data.createConnection({
    host : "localhost",
    user : "root",
    password : "9952251932@uma" ,
    database : "customer"
})

con.connect(function(error){
    if(error)
    {
        console.log(error);
    }else{
        console.log("Success");
    }
})

app.get('/getdetails',(request,respond)=> {
    let sql = "select * from customerdetails";
    con.query(sql,(error,result)=>{
        if(error){
            respond.send(error);
        }else{
            respond.send({status: true , data:result});
        }
        
    })
})

app.post("/add", (req, res) => {
    let details = {
      name: req.body.name,
      address: req.body.address,
      pincode: req.body.pincode,
      city: req.body.city,
      country: req.body.country
    };
    let sql = "INSERT INTO customerdetails SET ?";
    con.query(sql, details, (error) => {
      if (error) {
        res.send({ status: false, message: "Customer created Failed" });
      } else {
        res.send({ status: true, message: "Customer created successfully" });
      }
    });
  });

  app.get("/:sno", (req, res) => {
    var sno = req.params.sno;
    var sql = "SELECT * FROM customerdetails WHERE sno=" + sno;
    con.query(sql, function (error, result) {
      if (error) {
        console.log("Error Connecting to DB");
      } else {
        res.send({ status: true, data: result });
      }
    });
  });

 app.put("/update/:sno", (req, res) => {
    let sql =
      "UPDATE customerdetails SET name='" +
      req.body.name +
      "', address='" +
      req.body.address +
      "',pincode='" +
      req.body.pincode +
      "',city='" +
      req.body.city +
      "',country='" +
      req.body.country + 
      "'  WHERE sno=" +
      req.params.sno;
    console.log(sql);
    con.query(sql, (error, result) => {
      if (error) {
        res.send({ status: false, message: "Customer Updated Failed" });
      } else {
        res.send({ status: true, message: "Customer Updated successfully" });
      }
    });
  });

app.delete("/delete/:sno", (req, res) => {
    let sql = "DELETE FROM customerdetails WHERE sno=" + req.params.sno + "";
    con.query(sql, (error) => {
      if (error) {
        res.send({ status: false, message: "Customer Deleted Failed" });
      } else {
        res.send({ status: true, message: "Customer Deleted successfully" });
      }
    })});

app.listen(3302,()=>{
    console.log("Server running on port:3302");})
