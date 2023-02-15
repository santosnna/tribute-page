const express = require("express");

const formationRoute = require("./formations");

const router = express.Router();

module.exports = (params) => {
	const { homePageService, formationService } = params;

	router.get("/", async (req, res, next) => {
		try {
			const homepage = await homePageService.getData();
			const membersList = await formationService.getMembersList();
			const albumsList = await formationService.getAlbumsList();

			return res.render("layout", {
				pageTitle: "Fletwood Mac",
				template: "index",
				homepage,
				membersList,
				albumsList,
			});
		} catch (err) {
			return next(err);
		}
	});

	router.use("/formations", formationRoute(params));
	return router;
};
