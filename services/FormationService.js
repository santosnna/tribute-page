const fs = require("fs");
const util = require("util");

/**
 * We want to use async/await with fs.readFile - util.promisfy gives us that
 */
const readFile = util.promisify(fs.readFile);

/**
 * Logic for fetching formation information
 */
class FormationService {
	/**
	 * Constructor
	 * @param {*} datafile Path to a JSOn file that contains the formation data
	 */
	constructor(datafile) {
		this.datafile = datafile;
	}

	/**
	 *
	 * @param {*} name of the album being searched
	 * @returns an object
	 */
	async getAlbum(name) {
		const list = await this.getAlbumsList();
		const album = list.find((album) => {
			return album.name === name;
		});
		if (!album) return null;
		return {
			name: album.name,
			released: album.released,
			cover: album.cover,
		};
	}

	/**
	 *
	 * @returns
	 */
	async getAlbumsList() {
		const list = await this.getData();
		return list
			.map((formation) => {
				return formation.albums;
			})
			.flat();
	}

	/**
	 * Get formation information provided a shortname
	 * @param {*} shortname
	 */
	async getFormation(shortname) {
		const data = await this.getData();
		const formation = data.find((element) => {
			return element.shortname === shortname;
		});
		if (!formation) return null;
		return {
			title: formation.title,
			member: formation.member,
			shortname: formation.shortname,
			duration: formation.duration,
			summary: formation.summary,
			picture: formation.picture,
			details: formation.details,
			albums: formation.albums,
		};
	}

	/**
	 * Get a list of formations
	 * @returns array of formation names, shortnames, summary of the phase, pictures and albums
	 */
	async getFormationsList() {
		const data = await this.getData();
		return data.map((formation) => {
			return {
				member: formation.member,
				shortname: formation.shortname,
				duration: formation.duration,
				summary: formation.summary,
				picture: formation.picture,
				details: formation.details,
				albums: formation.albums,
			};
		});
	}

	/**
	 * Fetches a list of band members
	 * @returns array of member names, shortnames and pictures
	 */
	async getMembersList() {
		const data = await this.getData();

		// We are using map() to transform the array we get into another one
		return data.map((formation) => {
			return {
				member: formation.member,
				shortname: formation.shortname,
				picture: formation.picture,
			};
		});
	}

	/**
	 * Fetches information from the JSON file provided to the constructor
	 * @param {*} information
	 * @returns JSON
	 */
	async getData(information) {
		const data = await readFile(this.datafile, "UTF-8");

		switch (information) {
			case "homepage":
				return JSON.parse(data).homepage;
			default:
				return JSON.parse(data).formations;
		}
	}
}

module.exports = FormationService;
