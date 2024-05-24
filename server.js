const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql");
let app = express();
app.use(cors());
app.use(bodyParser.json());
const HOST = 5000;

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "parol2004",
  database: "magazine",
});

connection.connect((err) => {
  if (!err) {
    console.log("SUCCESS");
  } else {
    console.log(err);
  }
});

app.get("/users/:id", (req, res) => {
  connection.query(
    `SELECT * FROM goods WHERE id = ${req.params.id}`,
    (err, data) => {
      console.log(data);
      if (data.length > 0 && Array.isArray(data)) {
        res.json(data);
      } else {
        res.json({ error: "There are no data" });
      }
    }
  );
});

app.get("/goods", (req, res) => {
  connection.query(`SELECT * FROM goods`, (err, data) => {
    if (!err) {
      console.log(data);
      if (data.length > 0 && Array.isArray(data)) {
        res.json(data);
      } else {
        res.json({ error: "There are no data" });
      }
    } else {
      console.log(err);
    }
  });
});

app.get("/bag", (req, res) => {
  connection.query(`SELECT * FROM bag`, (err, data) => {
    console.log(data);
    if (data.length > 0 && Array.isArray(data)) {
      res.json(data);
    } else {
      res.json({ error: "There are no data" });
    }
  });
});

app.get("/orders", (req, res) => {
  connection.query(`SELECT * FROM orders`, (err, data) => {
    console.log(data);
    if (data.length > 0 && Array.isArray(data)) {
      res.json(data);
    } else {
      res.json({ error: "There are no data" });
    }
  });
});

app.post("/add", (req, res) => {
  let goods = req.body;
  console.log(goods);
  connection.query(
    `INSERT INTO goods (goodsname, goodsdescription, storename, storeadress, goodsprice, goodscount)
        VALUES ('${goods.goodsname}', '${goods.goodsdescription}', '${goods.storename}', '${goods.storeadress}', '${goods.goodsprice}', '${goods.goodscount}')`,
    (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log(data);
        res.json(data);
      }
    }
  );
});

app.delete("/delete/:id", (req, res) => {
  let goodId = req.params.id;
  console.log(goodId);
  connection.query(`DELETE FROM goods WHERE id = ${goodId}`, (err, data) => {
    if (err) {
      console.log(err);
    } else {
        if (data.length > 0 && Array.isArray(data)) {
            connection.query(`ALTER TABLE goods AUTO_INCREMENT = MAX(id);`)
            res.json(data);
          } else {
            connection.query('ALTER TABLE goods AUTO_INCREMENT = 0;')
            res.json({ error: "There are no data" });
          }
    }
  });
});

app.put('/change/:id', (req,res)=> {
    let goodId=req.params.id;
    let changingGoods = req.body
    connection.query(
        `UPDATE goods SET goodsname = '${changingGoods.goodsname}',
        goodsdescription = '${changingGoods.goodsdescription}',
        storename = '${changingGoods.storename}',
        storeadress = '${changingGoods.storeadress}',
        goodsprice = ${changingGoods.goodsprice},
        goodscount = ${changingGoods.goodscount}
        WHERE id = ${goodId};`,

        (err,data)=> {
            if(err) {
                console.log(err)
            } else {
                console.log(data)
                res.json(data)
            }
        })
} )

app.listen(HOST, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`localhost: ${HOST}`);
  }
});
