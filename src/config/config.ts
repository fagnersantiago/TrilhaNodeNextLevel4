 class Config {
    constructor() {

      const env = process.env.URL_MAIL || "dev";
  
      switch (env) {
        case "dev":
          
         return {
  
            URL_MAIL:'http://localhost:3333/answers'
        }
        case "prod": return {
        }
      }
    }
  }
  
 module.exports = new Config()