const router = require("express").Router();

module.exports = (params) => {
	const { formationService } = params;

	router.get("/", async (req, res) => {
		const formationsList = await formationService.getFormationsList();
		try {
			return res.render("layout", {
				pageTitle: "Albums",
				template: "albums",
				formationsList,
			});
		} catch (err) {
			return next(err);
		}
	});

	router.get("/:albumName", async (req, res) => {
		const { albumName } = req.params;
		const album = await formationService.getAlbum(albumName);
		try {
			return res.render("layout", {
				pageTitle: album,
				template: "album-detail",
				album,
			});
		} catch (err) {
			return next(err);
		}
	});
	return router;
};
