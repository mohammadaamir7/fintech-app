const data = require('./data')

export const getAccountData = (accountName, year) => {
  const accountData = data.filter(record => (record.Accounts === accountName && record['Years (Date)'] === year))
  const series = []
  const negative = []
  const positive = []
  const tweets = []
  const queries = []

  accountData.map(rec => {
    negative.push(rec['Sum of Negative'])
    positive.push(rec['Sum of Positive'])
    tweets.push(rec['Sum of Tweets'])
    queries.push(rec['Sum of Queries'])
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

  return series
} 