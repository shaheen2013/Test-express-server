const { default: axios } = require("axios");
const express = require("express");

var cors = require("cors");

const app = express();
app.use(cors());
// The express.json() function is a built-in middleware function in Express. It parses incoming requests with JSON payloads and is based on body-parser.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = 8000;

app.get("/me", function (req, res) {
  let apiKey = "api2024";
  if (apiKey === req.headers.apikey) {
    res
      .status(200)
      .json({ status: true, message: "Authenticate successfully" });
  } else {
    res.status(401).json({ status: false, message: "Invalid Api Key" });
  }
});

app.get("/weather", async (req, res) => {
  try {
    const result = await axios.get(
      "https://api.weatherapi.com/v1/current.json",
      {
        headers: {
          "Content-Type": "application/json",
        },
        params: {
          key: "985df3cfb735405390f105505242303",
          q: req?.query?.city,
        },
      }
    );

    res.status(200).json(result?.data);
  } catch (error) {
    res.status(200).json({ message: "location not found" });
  }
});

app.get("/sum", async (req, res) => {
  const num1 = Number(req?.query?.num1);
  const num2 = Number(req?.query?.num2);

  const dataType = req?.query?.dataType;

  let data;

  if (dataType === "object") {
    data = {
      id: 1,
      input: { num1, num2 },
      output: Number(num1) + Number(num2) || 0,
      status: true,
    };

    const zapierWebhookUrl = `https://hooks.zapier.com/hooks/catch/18308677/3xijgiy/?num1=${num1}&num2=${num2}`;
    const result = await axios.post(zapierWebhookUrl, {
      data,
    });
    console.log({ result });

    if (result?.status === "success") res.status(200).json(data);
  } else {
    data = [
      {
        id: 1,
        input: { num1, num2 },
        output: Number(num1) + Number(num2) || 0,
      },
    ];
  }

  res.status(200).json(data);
});

app.get("/", (req, res) => {
  res.status(200).json({ msg: "Welcome to test" });
});

app.listen(port, () => console.log("server started on", port));
