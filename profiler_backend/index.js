import express from "express";
import instaCheck from "./insta.js";
import fuelerCheck from "./fueler.js";
import calendlyCheck from "./calendly.js";
import behanceCheck from "./behance.js";
import dribbbleCheck from "./dribbble.js";
import buyCheck from "./buy.js";
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

app.post("/fueler", async (req, res) => {
	const resultFueler = await fuelerCheck(req.body.username);
	console.log(resultFueler)
	res.send(resultFueler);
});
app.post("/insta", async (req, res) => {
	const resultInsta = await instaCheck(req.body.username);
	res.send(resultInsta);
});

app.post("/report", async (req, res) => {
	const reports = await report(req.body.username);
	console.log(reports, )
	res.send(reports);
})

app.post("/calendly", async (req, res) => {
	const resultCalendly = await calendlyCheck(req.body.username);
	res.send(resultCalendly);
});

app.post("/behance", async (req, res) => {
	const resultBehance = await behanceCheck(req.body.username);
	res.send(resultBehance);
});

app.post("/buy", async (req, res) => {
	const resultBuy = await buyCheck(req.body.username);
	res.send(resultBuy);
})

app.post("/dribbble", async (req, res) => {
	const resultDribbble = await dribbbleCheck(req.body.username);
	res.send(resultDribbble);
});

app.get("/", async (req, res) => {
	res.send("hi")
})