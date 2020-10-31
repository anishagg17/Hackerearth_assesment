const fs = require("fs");
const express = require("express");
const bodyParser = require("body-parser");
const { exec } = require("child_process");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/compile", (req, res) => {
  let { code, inp, type } = req.body;
  console.log("req.body", req.body);
  switch (type) {
    case "cpp":
      fs.writeFile("./code.cpp", code, error => {
        if (error) console.error(error);

        fs.writeFile("./inp.txt", inp, error => {
          if (error) console.log(error);
        });

        exec("g++ code.cpp && ./a.out < inp.txt", (error, stdout, stderr) => {
          let output;
          if (error) {
            console.error(error);
            output = { out: error, status: 500 };
            return res.json({ out: error.message, status: 501 });
          }
          if (stderr) {
            output = { out: stdout, status: 500 };
          } else {
            output = { out: stdout, status: 200 };
          }
          return res.json(output);
        });
      });
      break;
    case "py":
      fs.writeFile("./code.py", code, error => {
        if (error) console.error(error);

        fs.writeFile("./inp.txt", inp, error => {
          if (error) console.log(error);
        });

        exec("cat inp.txt | python3 code.py", (error, stdout, stderr) => {
          let output;
          if (error) {
            console.error(error);
            output = { out: error, status: 500 };
            return res.json({ out: error.message, status: 501 });
          }

          if (stderr) {
            output = { out: stdout, status: 500 };
          } else {
            output = { out: stdout, status: 200 };
          }
          return res.json(output);
        });
      });
      break;
    default:
      return res.json({ out: "make sure to have correct file", status: 501 });
  }
});

let port = 5000 || process.env.PORT;
app.listen(port, () => console.log(`listening on ${port}`));
