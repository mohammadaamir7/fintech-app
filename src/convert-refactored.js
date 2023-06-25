const data = require('./data')
const fs = require('fs')
data.forEach(obj => {
  obj["Number of Hashtags"] = Math.floor(Math.random() * (1000 - 500 + 1)) + 500;
  obj["Number of Mentions"] = Math.floor(Math.random() * (300 - 100 + 1)) + 100;
  obj["Number of Tweeted"] = Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000;
  obj["Number of Post Liked"] = Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000;
  obj["Number of User Liked"] = Math.floor(Math.random() * (300 - 100 + 1)) + 100;
  obj["Positive Users"] = Math.floor(Math.random() * (100 - 1 + 1)) + 1;
  obj["Negative Users"] = Math.floor(Math.random() * (100 - 1 + 1)) + 1;
  obj["Neutral Users"] = Math.floor(Math.random() * (100 - 1 + 1)) + 1;
})

const jsonContent = `const jsonData = ${JSON.stringify(data, null, 2)};\n\nmodule.exports = jsonData;`;

fs.writeFileSync('/home/dev/fintech/fintech-app/src/data-refactored.js', jsonContent)