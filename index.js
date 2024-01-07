import express from "express";

const app = express();

app.get("/", async (req, res) => {
  res.send("It is working");
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Running on PORT ${PORT}`);
});
