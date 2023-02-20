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
	 * Get album information provided a name
	 * @param {*} name
	 */
	async getAlbum(name) {
		const data = await this.getAlbumsList();
		const album = data.find((element) => {
			return element.name === name;
		});

		console.log(album);
		if (!album) return null;
		return {
			name: album.name,
			released: album.released,
			cover: album.cover,
		};
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
			summary: formation.summary,
			picture: formation.picture,
			details: formation.details,
			albums: formation.albums,
		};
	}

	/**
	 * Get a list of formation
	 */
	async getFormationsList() {
		const data = await this.getData();
		return data.map((formation) => {
			return {
				member: formation.member,
				shortname: formation.shortname,
				summary: formation.summary,
				picture: formation.picture,
				details: formation.details,
				albums: formation.albums,
			};
		});
	}

	/**
	 * Returns an array of albums (covers and names)
	 */
	async getAlbumsList() {
		const list = await this.getData();
		return list.map((formation) => {
			for (const album of formation.albums) {
				return album;
			}
		});
	}

	/**
	 * Returns an array of formation names, short names and pictures
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
	 * Fetches formation data from the JSON file provided to the constructor
	 */
	async getData() {
		const data = await readFile(this.datafile, "UTF-8");
		return JSON.parse(data).formations;
	}
}

module.exports = FormationService;
