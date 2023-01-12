const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const cors = require("cors");

const port = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const filePath = "./click.json";

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/click", (req, res) => {
  console.log(req.body);
  const link = req.body.link;
  let data;

  if (!link) return res.status(400).send({ message: "Link is required" });

  try {
    if (!fs.existsSync(filePath))
      fs.writeFileSync(filePath, JSON.stringify({}));

    data = fs.readFileSync(filePath, "utf8");
    data = JSON.parse(data);

    if (data.hasOwnProperty(link)) data[link]++;
    else data[link] = 1;

    fs.writeFileSync(filePath, JSON.stringify(data));

    res.send({ status: "success" });
  } catch (err) {
    res.status(500).send(err);
  }
});

app.delete("/click", (req, res) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify({}));
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get("/click", (req, res) => {
  const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
  res.send(data);
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
