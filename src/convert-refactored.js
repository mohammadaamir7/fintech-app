const data = require('./data-refactored')
const fs = require('fs')
data.forEach(obj => {
  obj["Number of Complaints"] = Math.floor(Math.random() * (2000 - 10000 + 1)) + 10000;

  obj["Number of Hashtags"] = Math.floor(Math.random() * (2000 - 10000 + 1)) + 10000;
  obj["Number of Mentions"] = Math.floor(Math.random() * (2000 - 10000 + 1)) + 10000;
  obj["Number of Tweeted"] = Math.floor(Math.random() * (20000 - 10000 + 1)) + 10000;
  obj["Number of Post Liked"] = Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000;
  obj["Number of User Liked"] = Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000;
  obj["Number of Hashtag Post Liked"] = Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000;
  obj["Number of Hashtag User Liked"] = Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000;
  obj["Number of Mentions Post Liked"] = Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000;
  obj["Number of Mentions User Liked"] = Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000;
  obj["Positive Users"] = Math.floor(Math.random() * (100 - 1 + 1)) + 1;
  obj["Negative Users"] = Math.floor(Math.random() * (100 - 1 + 1)) + 1;
  obj["Neutral Users"] = Math.floor(Math.random() * (100 - 1 + 1)) + 1;
  obj["Number of Retweeted"] = Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000;
  obj["Number of User Retweeted"] = Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000;
  obj["Number of Hashtag Retweeted"] = Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000;
  obj["Number of Hashtag User Retweeted"] = Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000;
  obj["Number of Mentions Retweeted"] = Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000;
  obj["Number of Mentions User Retweeted"] = Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000;
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
  obj["Number of Positive Post Liked"] = Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000;
  obj["Number of Positive User Liked"] = Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000;
  obj["Number of Negative Post Liked"] = Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000;
  obj["Number of Negative User Liked"] = Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000;
  obj["Number of Neutral Post Liked"] = Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000;
  obj["Number of Neutral User Liked"] = Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000;
  obj["Number of Positive Retweeted"] = Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000;
  obj["Number of Positive User Retweeted"] = Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000;
  obj["Number of Negative Retweeted"] = Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000;
  obj["Number of Negative User Retweeted"] = Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000;
  obj["Number of Neutral Retweeted"] = Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000;
  
  obj["Number of Neutral User Retweeted"] = Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000;

  obj["Number of Positive Hashtag Post Liked"] = Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000;
  obj["Number of Positive Hashtag User Liked"] = Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000;
  obj["Number of Negative Hashtag Post Liked"] = Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000;
  obj["Number of Negative Hashtag User Liked"] = Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000;
  obj["Number of Neutral Hashtag Post Liked"] = Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000;
  obj["Number of Neutral Hashtag User Liked"] = Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000;
  obj["Number of Positive Hashtag Retweeted"] = Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000;
  obj["Number of Positive Hashtag User Retweeted"] = Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000;
  obj["Number of Negative Hashtag Retweeted"] = Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000;
  obj["Number of Negative Hashtag User Retweeted"] = Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000;
  obj["Number of Neutral Hashtag Retweeted"] = Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000;
  obj["Number of Neutral Hashtag User Retweeted"] = Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000;
  obj["Number of Positive Mentions Post Liked"] = Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000;
  obj["Number of Positive Mentions User Liked"] = Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000;
  obj["Number of Negative Mentions Post Liked"] = Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000;
  obj["Number of Negative Mentions User Liked"] = Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000;
  obj["Number of Neutral Mentions Post Liked"] = Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000;
  obj["Number of Neutral Mentions User Liked"] = Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000;
  obj["Number of Positive Mentions Retweeted"] = Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000;
  obj["Number of Positive Mentions User Retweeted"] = Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000;
  obj["Number of Negative Mentions Retweeted"] = Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000;
  obj["Number of Negative Mentions User Retweeted"] = Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000;
  obj["Number of Neutral Mentions Retweeted"] = Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000;
  obj["Number of Neutral Mentions User Retweeted"] = Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000;


  obj["Sum of Positive Tweets"] = Math.floor(Math.random() * (50000 - 10000 + 1)) + 10000;
  obj["Sum of Negative Tweets"] = Math.floor(Math.random() * (50000 - 10000 + 1)) + 10000;
  obj["Sum of Nuetral Tweets"] = Math.floor(Math.random() * (50000 - 10000 + 1)) + 10000;
  obj["Number of Positive Tweeted"] = Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000;
  obj["Number of Negative Tweeted"] = Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000;
  obj["Number of Neutral Tweeted"] = Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000;
})

const jsonContent = `const jsonData = ${JSON.stringify(data, null, 2)};\n\nmodule.exports = jsonData;`;

fs.writeFileSync('D:/fintech-app/fintech-app/src/data-refactored.js', jsonContent)