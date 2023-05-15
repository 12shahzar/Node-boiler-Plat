const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
// var authRoutes = require("./routes/auth");

const app = express();

const { PORT } = require("./core/index");
const { customerModel } = require("./dbmodule/module");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(express.json());
app.use(morgan("short"));

app.post("/customerData", (req, res, next) => {

  console.log(req.body.Techstack);
  if (!req.body.Techstack) {
    res.status(409).send(`
    Please send DefaultLocationName  in json body
    e.g:
    "StudentId":"1",
`);
    return;
  } else {
    const newStudent = new customerModel({
      Techstack: req.body.Techstack,
      Link: req.body.Link,
      Profile: req.body.Profile,
      Datecostumer: req.body.Datecostumer,
      isOn:req.body.isOn,
      isOnboard:req.body.isOnboard,
    });

    newStudent.save()
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: "an error occured : " + err,
        });
      });
  }
});



app.get("/customers", (req, res) => {
  customerModel.find({}, (err, data) => {
    if (!err) {
      res.send({
        message: "got all cutomers successfully",
        data: data,
      });
    } else {
      res.status(500).send({
        message: "server error",
      });
    }
  });
});
















app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
