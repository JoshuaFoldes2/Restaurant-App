
const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set('view engine','ejs');
var orderNumber = 1;
// First you need to create a connection to the database
// Be sure to replace 'user' and 'password' with the correct values
const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Fol@2061',
  port: '3306',
  database:"restaurant"
});
app.get("/route",function(req,res){
  con.query("SELECT * FROM order" + orderNumber,function(err,results){console.log(results.length);
    res.json(results);
  })
});
con.connect(function(err){
  if (err) console.log("not connected");
  else console.log("Connected!");

});
app.get("/", function(req,res){
    res.render("index");
});
app.get("/customerLogin", function(req,res){
    res.render("customerLogin");
});
app.get("/customerLogin2", function(req,res){
    res.render("customerLogin2");
});
app.get("/Signup", function(req,res){
    res.render("Signup");
});
app.get("/employeeLogin", function(req,res){
    res.render("employeeLogin");
});
app.get("/employeeLogin2", function(req,res){
    res.render("employeeLogin2");
});
app.get("/Menu", function(req,res){
    res.render("Menu");
});
app.get("/profile", function(req,res){
    res.render("profile");
});
app.get("/checkout", function(req,res){
    res.render("checkout");
});
app.get("/employeePage", function(req,res){
    res.render("employeePage");
});
app.post("/customerLogin", function(req,res){
    const email = req.body.email;
    const password = req.body.password;
    con.query("SELECT * FROM customer WHERE email = '" + email + "' AND password = '" + password + "'",function(err,results){if(err) console.log(err); else console.log(results.length);
        if(results.length > 0){
            con.query("SELECT * FROM login",function(err2,results2){if(err2) console.log(err2); else console.log(results2.length)
                  if(results2.length > 0)
                      con.query("DELETE FROM login",function(err3,results3){if(err3) console.log(err3); con.query("INSERT INTO login SELECT * FROM customer WHERE email = '" + email + "' AND password = '" + password + "'",function(err4,results4){if(err4) console.log(err4)});
              });
                  else
                      con.query("INSERT INTO login SELECT * FROM customer WHERE email = '" + email + "' AND password = '" + password + "'",function(err3,results3){if(err3) console.log(err3)});
            });
            res.redirect("/Menu");
        }
        else
            res.redirect("/customerLogin2");
    });
});
app.post("/guestLogin", function(req,res){
            con.query("SELECT * FROM login",function(err2,results2){if(err2) console.log(err2); else console.log(results2.length)
                  if(results2.length > 0)
                      con.query("DELETE FROM login",function(err3,results3){if(err3) console.log(err3); con.query("INSERT INTO login (email,password,name,phoneNumber) VALUES ('guest@gmail.com','a','guest','0')",function(err4,results4){if(err4) console.log(err4)});
              });
                  else
                      con.query("INSERT INTO login  (email,password,name,phoneNumber) VALUES ('guest@gmail.com','a','guest','0')",function(err3,results3){if(err3) console.log(err3)});
            });
            res.redirect("/Menu");
});
app.post("/EmployeeLogin", function(req,res){
    const email = req.body.email;
    const password = req.body.password;
    con.query("SELECT * FROM employee WHERE email = '" + email + "' AND password = '" + password + "'",function(err,results){if(err) console.log(err); else console.log(results.length);
        if(results.length > 0){
            con.query("SELECT * FROM login",function(err2,results2){if(err2) console.log(err2); else console.log(results2.length)
                  if(results2.length > 0)
                      con.query("DELETE FROM login",function(err3,results3){if(err3) console.log(err3); con.query("INSERT INTO login SELECT * FROM employee WHERE email = '" + email + "' AND password = '" + password + "'",function(err4,results4){if(err4) console.log(err4)});
              });
                  else
                      con.query("INSERT INTO login SELECT * FROM employee WHERE email = '" + email + "' AND password = '" + password + "'",function(err3,results3){if(err3) console.log(err3)});
            });
            res.redirect("/employeePage");
        }
        else
            res.redirect("/EmployeeLogin2");
    });
});
app.post("/Signup", function(req,res){
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
    const phoneNumber = req.body.phoneNumber;
    con.query("INSERT INTO customer (email, password, name, phoneNumber) VALUES ('" + email + "','" + password + "','" + name + "','" + phoneNumber + "')",function(err,results){if(err) console.log(err); else console.log("data inserted");
    res.redirect("/customerLogin");
    });
});
app.post("/profile",function(req,res){
  con.query("SELECT * FROM login WHERE name = 'guest'",function(err2,results2){if(err2) console.log(err2); else console.log(results2.length)
      if(results2.length > 0)
        res.redirect("/customerLogin");
      else
        res.redirect("/profile");
  });
});
app.post("/checkout",function(req,res){
  con.query("SELECT * FROM login WHERE name = 'guest'",function(err2,results2){if(err2) console.log(err2); else console.log(results2.length)
      if(results2.length > 0)
        res.redirect("/customerLogin");
      else
        res.redirect("/checkout");
  });
});
app.post("/addFood1",function(req,res){
  console.log(orderNumber);
  const quantity = req.body.quantity1;
  const size = req.body.sizer1;
  const name = req.body.name1;
  const spiciness = req.body.heatr1;
  const price = req.body.price1;
    con.query("SHOW TABLES LIKE 'order" + orderNumber + "'",function(err2,results2){
      console.log("results2");
      if(results2.length == 0)
        con.query("CREATE TABLE order" + orderNumber + " (quantity VARCHAR(255), size VARCHAR(255),name VARCHAR(255),spiciness VARCHAR(255),price VARCHAR(255))",function(err3,results3){
          console.log("new table");
          con.query("INSERT INTO order" + orderNumber + " (quantity,size,name,spiciness,price) VALUES ('" + quantity + "','"+ size + "','" + name + "','" + spiciness + "','" + price + "')",function(err4,results4){console.log("added1");});
        });
      else
        con.query("INSERT INTO order" + orderNumber + " (quantity,size,name,spiciness,price) VALUES ('" + quantity + "','"+ size + "','" + name + "','" + spiciness + "','" + price + "')",function(err4,results4){console.log("added2");});
    });
    res.redirect("/Menu");
});
app.post("/addFood1",function(req,res){
  const quantity = req.body.quantity1;
  const size = req.body.sizer1;
  const name = req.body.name1;
  const spiciness = req.body.heatr1;
  const price = req.body.price1;
    con.query("SHOW TABLES LIKE 'order" + orderNumber + "'",function(err2,results2){
      if(results2.length == 0)
        con.query("CREATE TABLE order" + orderNumber + " (quantity VARCHAR(255), size VARCHAR(255),name VARCHAR(255),spiciness VARCHAR(255),price VARCHAR(255))",function(err3,results3){
          con.query("INSERT INTO order" + orderNumber + " (quantity,size,name,spiciness,price) VALUES ('" + quantity + "','"+ size + "','" + name + "','" + spiciness + "','" + price + "')",function(err4,results4){});
        });
      else
        con.query("INSERT INTO order" + orderNumber + " (quantity,size,name,spiciness,price) VALUES ('" + quantity + "','"+ size + "','" + name + "','" + spiciness + "','" + price + "')",function(err4,results4){});
    });
    res.redirect("/Menu");
});
app.post("/addFood2",function(req,res){
  const quantity = req.body.quantity2;
  const size = req.body.sizer2;
  const name = req.body.name2;
  const spiciness = req.body.heatr2;
  const price = req.body.price2;
    con.query("SHOW TABLES LIKE 'order" + orderNumber + "'",function(err2,results2){
      if(results2.length == 0)
        con.query("CREATE TABLE order" + orderNumber + " (quantity VARCHAR(255), size VARCHAR(255),name VARCHAR(255),spiciness VARCHAR(255),price VARCHAR(255))",function(err3,results3){
          con.query("INSERT INTO order" + orderNumber + " (quantity,size,name,spiciness,price) VALUES ('" + quantity + "','"+ size + "','" + name + "','" + spiciness + "','" + price + "')'",function(err4,results4){});
        });
      else
        con.query("INSERT INTO order " + orderNumber + "(quantity,size,name,spiciness,price) VALUES ('" + quantity + "','"+ size + "','" + name + "','" + spiciness + "','" + price + "')'",function(err4,results4){});
    });
    res.redirect("/Menu");
});
app.post("/addFood3",function(req,res){
  const quantity = req.body.quantity3;
  const size = req.body.sizer3;
  const name = req.body.name3;
  const spiciness = req.body.heatr3;
  const price = req.body.price3;
    con.query("SHOW TABLES LIKE 'order" + orderNumber + "'",function(err2,results2){
      if(results2.length == 0)
        con.query("CREATE TABLE order" + orderNumber + " (quantity VARCHAR(255), size VARCHAR(255),name VARCHAR(255),spiciness VARCHAR(255),price VARCHAR(255))",function(err3,results3){
          con.query("INSERT INTO order" + orderNumber + " (quantity,size,name,spiciness,price) VALUES ('" + quantity + "','"+ size + "','" + name + "','" + spiciness + "','" + price + "')",function(err4,results4){});
        });
      else
        con.query("INSERT INTO order" + orderNumber + " (quantity,size,name,spiciness,price) VALUES ('" + quantity + "','"+ size + "','" + name + "','" + spiciness + "','" + price + "')",function(err4,results4){});
    });
    res.redirect("/Menu");
});
app.post("/addFood4",function(req,res){
  const quantity = req.body.quantity4;
  const size = req.body.sizer4;
  const name = req.body.name4;
  const spiciness = req.body.heatr4;
  const price = req.body.price4;
    con.query("SHOW TABLES LIKE 'order" + orderNumber + "'",function(err2,results2){
      if(results2.length == 0)
        con.query("CREATE TABLE order" + orderNumber + " (quantity VARCHAR(255), size VARCHAR(255),name VARCHAR(255),spiciness VARCHAR(255),price VARCHAR(255))",function(err3,results3){
          con.query("INSERT INTO order" + orderNumber + " (quantity,size,name,spiciness,price) VALUES ('" + quantity + "','"+ size + "','" + name + "','" + spiciness + "','" + price + "')",function(err4,results4){});
        });
      else
        con.query("INSERT INTO order" + orderNumber + " (quantity,size,name,spiciness,price) VALUES ('" + quantity + "','"+ size + "','" + name + "','" + spiciness + "','" + price + "')",function(err4,results4){});
    });
    res.redirect("/Menu");
});
app.post("/addFood5",function(req,res){
  const quantity = req.body.quantity5;
  const size = req.body.sizer5;
  const name = req.body.name5;
  const spiciness = req.body.heatr5;
  const price = req.body.price5;
    con.query("SHOW TABLES LIKE 'order" + orderNumber + "'",function(err2,results2){
      if(results2.length == 0)
        con.query("CREATE TABLE order" + orderNumber + " (quantity VARCHAR(255), size VARCHAR(255),name VARCHAR(255),spiciness VARCHAR(255),price VARCHAR(255))",function(err3,results3){
          con.query("INSERT INTO order" + orderNumber + " (quantity,size,name,spiciness,price) VALUES ('" + quantity + "','"+ size + "','" + name + "','" + spiciness + "','" + price + "')",function(err4,results4){});
        });
      else
        con.query("INSERT INTO order" + orderNumber + " (quantity,size,name,spiciness,price) VALUES ('" + quantity + "','"+ size + "','" + name + "','" + spiciness + "','" + price + "')",function(err4,results4){});
    });
    res.redirect("/Menu");
});
app.post("/addFood6",function(req,res){
  const quantity = req.body.quantity6;
  const size = req.body.sizer6;
  const name = req.body.name6;
  const spiciness = req.body.heatr6;
  const price = req.body.price6;
    con.query("SHOW TABLES LIKE 'order" + orderNumber + "'",function(err2,results2){
      if(results2.length == 0)
        con.query("CREATE TABLE order" + orderNumber + " (quantity VARCHAR(255), size VARCHAR(255),name VARCHAR(255),spiciness VARCHAR(255),price VARCHAR(255))",function(err3,results3){
          con.query("INSERT INTO order" + orderNumber + " (quantity,size,name,spiciness,price) VALUES ('" + quantity + "','"+ size + "','" + name + "','" + spiciness + "','" + price + "')",function(err4,results4){});
        });
      else
        con.query("INSERT INTO order" + orderNumber + " (quantity,size,name,spiciness,price) VALUES ('" + quantity + "','"+ size + "','" + name + "','" + spiciness + "','" + price + "')",function(err4,results4){});
    });
    res.redirect("/Menu");
});
let port = process.env.PORT;
if(port == null || port == "")
    port = 3000;
    
app.listen(port, function(){
    console.log("Server Started...");
});
