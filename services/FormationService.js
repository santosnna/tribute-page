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
   * Get details about the formation provided
   * @param {*} shortname
   */
  async getDetails(formation) {
    const details = formation.details.map(formation => {
      return {
        year: details.year,
        fact: details.fact
      };
    });
    console.log(details);
  }

  /**
   * Get formation information provided a shortname
   * @param {*} shortname
   */
  async getFormation(shortname) {
    const data = await this.getData();
    const formation = data.find(element => {
      return element.shortname === shortname;
    });
    if (!formation) return null;
    return {
      title: formation.title,
      member: formation.member,
      shortname: formation.shortname,
      summary: formation.summary,
      details: formation.details,
      picture: formation.picture
    };
  }

  /**
   * Returns a list of formation name and short name
   */
  async getMembers() {
    const data = await this.getData();

    // We are using map() to transform the array we get into another one
    return data.map(formation => {
      return {
        member: formation.member,
        shortname: formation.shortname
      };
    });
  }

  /**
   * Get a list of formation
   */
  async getList() {
    const data = await this.getData();
    return data.map(formation => {
      return {
        title: formation.title,
        member: formation.member,
        shortname: formation.shortname,
        summary: formation.summary,
        details: formation.details,
        picture: formation.picture
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

// formationService = new FormationService('./data/formations.json');

// const foo = async () => {
//   formation = await formationService.getList();
//   console.log(formation);
// };

// foo();


// const fs = require("fs");
// const util = require("util");

// /**
//  * We want to use async/await with fs.readFile - util.promisfy gives us that
//  */
// const readFile = util.promisify(fs.readFile);

// /**
//  * Logic for fetching formation information
//  */
// class FormationService {
//   /**
//    * Constructor
//    * @param {*} datafile Path to a JSOn file that contains the formation data
//    */
//   constructor(datafile) {
//     this.datafile = datafile;
//   }

//   /**
//    * Returns a list of formation name and short name
//    */
//   async getNames() {
//     const data = await this.getData();

//     // We are using map() to transform the array we get into another one
//     return data.map(formation => {
//       return {
//         name: formation.member,
//         shortname: formation.shortname
//       };
//     });
//   }


//   /**
//    * Get formation information provided a shortname
//    * @param {*} shortname
//    */
//   async getFormation(shortname) {
//     const data = await this.getData();
//     const speaker = data.find(elm => {
//       return elm.shortname === shortname;
//     });
//     if (!formation) return null;
//     return {
//       title: formation.title,
//       member: formation.member,
//       shortname: formation.shortname,
//       description: formation.description
//     };
//   }

//   /**
//    * Returns a list of formation with only the basic information
//    */
//   async getListShort() {
//     const data = await this.getData();
//     return data.map(formation => {
//       return {
//         member: formation.member,
//         shortname: formation.shortname,
//         title: formation.title
//       };
//     });
//   }

//   /**
//    * Get a list of formation
//    */
//   async getList() {
//     const data = await this.getData();
//     return data.map(formation => {
//       return {
//         member: formation.member,
//         shortname: formation.shortname,
//         title: formation.title,
//         summary: formation.summary
//       };
//     });
//   }

//   /**
//    * Fetches formation data from the JSON file provided to the constructor
//    */
//   async getData() {
//     const data = await readFile(this.datafile, "utf8");
//     return JSON.parse(data).speakers;
//   }
// }

// module.exports = FormationService;