const path = require('path')
module.exports = {
  rootDir: path.join(__dirname, 'tests'),
  testEnvironment: "node",
  "transform": {
    "^.+\\.tsx?$": "ts-jest"
  },
}
