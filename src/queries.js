const data = require('./data-refactored.js')

export const getAccountData = (accountName, year) => {
  const accountData = data.filter(record => (record.Accounts === accountName && record['Years (Date)'] === year))
  const series = []
  const negative = []
  const positive = []
  const tweets = []
  const queries = []
  const hashtags = []
  const mentions = []
  const likedPosts = []
  const likedUsers = []
  const tweeted = []


  accountData.forEach(rec => {
    negative.push(rec['Sum of Negative'])
    positive.push(rec['Sum of Positive'])
    tweets.push(rec['Sum of Tweets'])
    queries.push(rec['Sum of Queries'])
    hashtags.push(rec['Number of Hashtags'])
    mentions.push(rec['Number of Mentions'])
    likedPosts.push(rec['Number of Post Liked'])
    likedUsers.push(rec['Number of User Liked'])
    tweeted.push(rec['Number of Tweeted'])
  })
  
  series.push({
    name: "Sum of Tweets",
    data: tweets
  })
  series.push({
    name: "Sum of Queries",
    data: queries
  })

  series.push({
    name: "Sum of Positive",
    data: positive
  })

  series.push({
    name: "Sum of Negative",
    data: negative
  })

  series.push({
    name: "Number of Hashtags",
    data: hashtags
  })

  series.push({
    name: "Number of Mentions",
    data: mentions
  })

  series.push({
    name: "Liked Posts",
    data: likedPosts
  })

  series.push({
    name: "Number of User Liked Posts",
    data: likedUsers
  })

  series.push({
    name: "Number of Hashtags",
    data: tweeted
  })

  return series
} 

export const getTweetsData = (accountName, year) => {
  const accountData = data.filter(record => (record.Accounts === accountName && record['Years (Date)'] === year))
  const series = []
  const tweets = []
  const hashtags = []
  const mentions = []
  const tweeted = []


  accountData.forEach(rec => {
    tweets.push(rec['Sum of Tweets'])
    hashtags.push(rec['Number of Hashtags'])
    mentions.push(rec['Number of Mentions'])
    tweeted.push(rec['Number of Tweeted'])
  })
  
  series.push({
    name: "Sum of Tweets",
    data: tweets
  })

  series.push({
    name: "Number of Hashtags",
    data: hashtags
  })

  series.push({
    name: "Number of Mentions",
    data: mentions
  })


  series.push({
    name: "Number of Tweeted",
    data: tweeted
  })

  return series
} 

export const getLikesData = (accountName, year) => {
  const accountData = data.filter(record => (record.Accounts === accountName && record['Years (Date)'] === year))
  const series = []

  const likedPosts = []
  const likedUsers = []


  accountData.forEach(rec => {
    likedPosts.push(rec['Number of Post Liked'])
    likedUsers.push(rec['Number of User Liked'])
  })

  series.push({
    name: "Liked Posts",
    data: likedPosts
  })

  series.push({
    name: "Number of User Liked Posts",
    data: likedUsers
  })

  return series
} 

export const getReTweetsData = (accountName, year) => {
  const accountData = data.filter(record => (record.Accounts === accountName && record['Years (Date)'] === year))
  const series = []

  const retweetedTweets = []
  const retweetedUsers = []


  accountData.forEach(rec => {
    retweetedTweets.push(rec['Number of Retweeted'])
    retweetedUsers.push(rec['Number of User Retweeted'])
  })

  series.push({
    name: "Retweeted tweets",
    data: retweetedTweets
  })

  series.push({
    name: "Number of User Retweeted",
    data: retweetedUsers
  })

  return series
} 

export const getTweetCategoryData = (accountName, year) => {
  const accountData = data.filter(record => (record.Accounts === accountName && record['Years (Date)'] === year))
  const series = []

  const positiveTweets = []
  const negativeTweets = []
  const queryTweets = []


  accountData.forEach(rec => {
    positiveTweets.push(rec['Sum of Positive'])
    negativeTweets.push(rec['Sum of Negative'])
    queryTweets.push(rec['Sum of Queries'])
  })

  series.push({
    name: "Positive tweets",
    data: positiveTweets
  })

  series.push({
    name: "Negative tweets",
    data: negativeTweets
  })

  series.push({
    name: "Neutral/Query tweets",
    data: queryTweets
  })

  return series
} 

export const getHashtagTweetCategoryData = (accountName, year) => {
  const accountData = data.filter(record => (record.Accounts === accountName && record['Years (Date)'] === year))
  const series = []

  const positiveTweets = []
  const negativeTweets = []
  const queryTweets = []


  accountData.forEach(rec => {
    positiveTweets.push(rec['Sum of Positive Hashtag'])
    negativeTweets.push(rec['Sum of Negative Hashtag'])
    queryTweets.push(rec['Sum of Query Hashtag'])
  })

  series.push({
    name: "Positive tweets",
    data: positiveTweets
  })

  series.push({
    name: "Negative tweets",
    data: negativeTweets
  })

  series.push({
    name: "Neutral/Query tweets",
    data: queryTweets
  })

  return series
} 

export const getMentionTweetCategoryData = (accountName, year) => {
  const accountData = data.filter(record => (record.Accounts === accountName && record['Years (Date)'] === year))
  const series = []

  const positiveTweets = []
  const negativeTweets = []
  const queryTweets = []


  accountData.forEach(rec => {
    positiveTweets.push(rec['Sum of Positive Mentions'])
    negativeTweets.push(rec['Sum of Negative Mentions'])
    queryTweets.push(rec['Sum of Query Mentions'])
  })

  series.push({
    name: "Positive tweets",
    data: positiveTweets
  })

  series.push({
    name: "Negative tweets",
    data: negativeTweets
  })

  series.push({
    name: "Neutral/Query tweets",
    data: queryTweets
  })

  return series
} 

export const getPositiveMentionUserData = (accountName, year) => {
  const accountData = data.filter(record => (record.Accounts === accountName && record['Years (Date)'] === year))
  const series = []

  const positiveTweets = []
  const negativeTweets = []
  const queryTweets = []


  accountData.forEach(rec => {
    positiveTweets.push(rec['Positive Mentions Users'])
    negativeTweets.push(rec['Negative Mentions Users'])
    queryTweets.push(rec['Query Mention Users'])
  })

  series.push({
    name: "Positive users",
    data: positiveTweets
  })

  series.push({
    name: "Negative users",
    data: negativeTweets
  })

  series.push({
    name: "Neutral/Query users",
    data: queryTweets
  })

  return series
} 

export const getPositiveHashtagUserData = (accountName, year) => {
  const accountData = data.filter(record => (record.Accounts === accountName && record['Years (Date)'] === year))
  const series = []

  const positiveTweets = []
  const negativeTweets = []
  const queryTweets = []


  accountData.forEach(rec => {
    positiveTweets.push(rec['Positive Hashtag Users'])
    negativeTweets.push(rec['Negative Hashtag Users'])
    queryTweets.push(rec['Query Hashtag Users'])
  })

  series.push({
    name: "Positive users",
    data: positiveTweets
  })

  series.push({
    name: "Negative users",
    data: negativeTweets
  })

  series.push({
    name: "Neutral/Query users",
    data: queryTweets
  })

  return series
} 