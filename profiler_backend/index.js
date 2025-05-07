import express from "express";
import instaCheck from "./insta.js";
import cors from "cors";
import report from "./report.js";
const app = express();
const port = process.env.PORT || 6431;

app.use(express.json());
app.use(cors());

app.listen(port, () => console.log(`backend listening on port : ${port}`));

app.get("/insta", (req, res) => {
	res.send("Hello Worsdddsld!");
});

app.post("/insta", async (req, res) => {
	const resultInsta = await instaCheck(req.body.username);
	res.send(resultInsta);
});

app.post("/report", async (req, res) => {
	const reports = await report(req.body.username);
	console.log(reports)
	res.send(reports);
})


app.get("/", async (req, res) => {
	res.send("hi")
})