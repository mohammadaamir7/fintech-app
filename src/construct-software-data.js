const fs = require('fs')
const data = []

for (let index = 0; index < 5; index++) {
  const obj = {}
  obj["Release"] = index + 1;
  obj["Number of Positive Hashtag Tweets"] = Math.floor(Math.random() * (4000 - 1000 + 1)) + 1000;
  obj["Number of Negative Hashtag Tweets"] = Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000;
  obj["Number of Neutral Hashtag Tweets"] = Math.floor(Math.random() * (4000 - 1000 + 1)) + 1000;
  obj["Number of Positive Mention Tweets"] = Math.floor(Math.random() * (2000 - 1000 + 1)) + 1000;
  obj["Number of Negative Mention Tweets"] = Math.floor(Math.random() * (2000 - 1000 + 1)) + 1000;
  obj["Number of Neutral Mention Tweets"] = Math.floor(Math.random() * (2000 - 1000 + 1)) + 1000;
  data.push(obj)
}

const jsonContent = `const jsonData = ${JSON.stringify(data, null, 2)};\n\nmodule.exports = jsonData;`;

fs.writeFileSync('D:/fintech-app/fintech-app/src/software-update-data.js', jsonContent)