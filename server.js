const express = require("express");
const path = require("path");

const HomePageService = require("./services/HomePageService");
const FormationService = require("./services/FormationService");
const routes = require("./routes");

const app = express();
const homePageService = new HomePageService("./data/homepage.json");
const formationService = new FormationService("./data/formations.json");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"));

app.use(express.static(path.join(__dirname, "./static")));

// This has something to do with getting variables to places without explicitly sending them as an object
app.use(async (req, res, next) => {
	try {
		const names = await formationService.getMembersList();
		const albums = await formationService.getAlbumsList();
		res.locals.memberNames = names;
		res.locals.albumsNames = albums;
		return next();
	} catch (err) {
		return next(err);
	}
});

app.use("/", routes({ homePageService, formationService }));

app.use((err, req, res, next) => {
	res.locals.message = err.message;
	console.log(res.locals.message);
	console.error(err);
	const status = err.status || 500;
	res.locals.status = status;
	console.log(res.locals.status);
	res.status(status);
	res.render("error");
});

app.listen(3000, () => {
	console.log(`Server listening on port 3000!`);
});
