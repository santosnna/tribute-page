const express = require("express");

const router = express.Router();

module.exports = (params) => {
	const { formationService } = params;

	router.get("/", async (req, res, next) => {
		try {
			const formationsList = await formationService.getFormationsList();

			return res.render("layout", {
				pageTitle: "Formations",
				template: "formations",
				formationsList,
			});
		} catch (err) {
			return next(err);
		}
	});

	router.get("/:shortname", async (req, res, next) => {
		try {
			const formation = await formationService.getFormation(
				req.params.shortname
			);

			return res.render("layout", {
				pageTitle: formation.title,
				template: "formation-detail",
				formation,
			});
		} catch (err) {
			return next(err);
		}
	});

	return router;
};
