const fs = require("fs");
const util = require("util");

/**
 * We want to use async/await with fs.readFile - util.promisfy gives us that
 */
const readFile = util.promisify(fs.readFile);

/**
 * Logic for fetching information
 */
class HomePageService {
	/**'
	 * Constructor
	 * @param {*} datafile Path to a JSOn file that contains the formation data
	 */
	constructor(datafile) {
		this.datafile = datafile;
	}

	/**
	 * Fetches homepage data from the JSON file provided to the constructor
	 */
	async getData() {
		const data = await readFile(this.datafile, "UTF-8");
		return JSON.parse(data).homepage;
	}
}

module.exports = HomePageService;
