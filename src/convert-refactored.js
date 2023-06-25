const data = require('./data')
const fs = require('fs')
data.forEach(obj => {
  obj["Number of Hashtags"] = Math.floor(Math.random() * (2000 - 10000 + 1)) + 10000;
  obj["Number of Mentions"] = Math.floor(Math.random() * (2000 - 10000 + 1)) + 10000;
  obj["Number of Tweeted"] = Math.floor(Math.random() * (20000 - 10000 + 1)) + 10000;
  obj["Number of Post Liked"] = Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000;
  obj["Number of User Liked"] = Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000;
  obj["Positive Users"] = Math.floor(Math.random() * (100 - 1 + 1)) + 1;
  obj["Negative Users"] = Math.floor(Math.random() * (100 - 1 + 1)) + 1;
  obj["Neutral Users"] = Math.floor(Math.random() * (100 - 1 + 1)) + 1;
  obj["Number of Retweeted"] = Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000;
  obj["Number of User Retweeted"] = Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000;
  obj["Sum of Positive Hashtag"] = Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000;
  obj["Sum of Positive Mentions"] = Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000;
  obj["Sum of Negative Hashtag"] = Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000;
  obj["Sum of Negative Mentions"] = Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000;
  obj["Sum of Query Hashtag"] = Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000;
  obj["Sum of Query Mentions"] = Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000;
  obj["Positive Hashtag Users"] = Math.floor(Math.random() * (100 - 1 + 1)) + 1;
  obj["Negative Hashtag Users"] = Math.floor(Math.random() * (100 - 1 + 1)) + 1;
  obj["Query Hashtag Users"] = Math.floor(Math.random() * (100 - 1 + 1)) + 1;
  obj["Query Mention Users"] = Math.floor(Math.random() * (100 - 1 + 1)) + 1;
  obj["Neutral Hashtag Users"] = Math.floor(Math.random() * (100 - 1 + 1)) + 1;
  obj["Positive Mentions Users"] = Math.floor(Math.random() * (100 - 1 + 1)) + 1;
  obj["Negative Mentions Users"] = Math.floor(Math.random() * (100 - 1 + 1)) + 1;
  obj["Neutral Mentions Users"] = Math.floor(Math.random() * (100 - 1 + 1)) + 1;
})

const jsonContent = `const jsonData = ${JSON.stringify(data, null, 2)};\n\nmodule.exports = jsonData;`;

fs.writeFileSync('/home/dev/fintech/fintech-app/src/data-refactored.js', jsonContent)