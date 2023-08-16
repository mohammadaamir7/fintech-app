const fs = require('fs')
const data = []

for (let index = 0; index < 5; index++) {
  const obj = {}
  obj["Number of People Retweeted"] = Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000;
  obj["Number of People Liked"] = Math.floor(Math.random() * (4000 - 1000 + 1)) + 1000;
  obj["Number of Positive People"] = Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000;
  obj["Number of Negative People"] = Math.floor(Math.random() * (4000 - 1000 + 1)) + 1000;
  obj["Number of Neutral People"] = Math.floor(Math.random() * (2000 - 1000 + 1)) + 1000;
  obj["Number of Positive Predictions"] = Math.floor(Math.random() * (2000 - 1000 + 1)) + 1000;
  obj["Number of Negative Predictions"] = Math.floor(Math.random() * (2000 - 1000 + 1)) + 1000;
  obj["Number of Neutral Predictions"] = Math.floor(Math.random() * (2000 - 1000 + 1)) + 1000;
  data.push(obj)
}

const jsonContent = `const jsonData = ${JSON.stringify(data, null, 2)};\n\nmodule.exports = jsonData;`;

fs.writeFileSync('D:/fintech-app/fintech-app/src/offer-data.js', jsonContent)