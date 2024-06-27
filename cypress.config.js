const { defineConfig } = require("cypress");
require('dotenv').config();

module.exports = defineConfig({
  reporter: "cypress-mochawesome-reporter",
  e2e: {
    setupNodeEvents(on, config) {
      require("cypress-mochawesome-reporter/plugin")(on);
    },
    env:{
      ID_BOARD: process.env.ID_BOARD,
      API_KEY: process.env.API_KEY,
      TOKEN: process.env.TOKEN
    }
    // video: true,
  },
});
