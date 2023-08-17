const data = require("./data-refactored.js");
const offerData = require("./offer-data.js");
const softwareData = require("./software-update-data.js");
const monthlyData = require("./monthlyData.js");

const filterData = (data, field) => {
  let total = 0;
  data.forEach((record) => (total += record[field]));
  return total;
};

const structureAccounts = (accountNames) => {
  if (accountNames.includes("Bank") && !accountNames.includes("Fintech")) {
    return ["Bank1", "bank2", "Bank3"];
  } else if (
    accountNames.includes("Fintech") &&
    !accountNames.includes("Bank")
  ) {
    return ["Fintech4", "Fintech5"];
  } else if (
    accountNames.includes("Fintech") &&
    accountNames.includes("Bank")
  ) {
    return ["Bank1", "bank2", "Bank3", "Fintech4", "Fintech5"];
  } else if (
    accountNames.includes("Bank1") ||
    accountNames.includes("bank2") ||
    accountNames.includes("Bank3") ||
    accountNames.includes("Fintech4") ||
    accountNames.includes("Fintech5")
  ) {
    return [...accountNames];
  } else {
    return ["Bank1", "bank2", "Bank3", "Fintech4", "Fintech5"];
  }
};

export const getAccountData = (accountName, year) => {
  const accountData = data.filter(
    (record) =>
      record.Accounts === accountName && record["Years (Date)"] === year
  );
  const series = [];
  const negative = [];
  const positive = [];
  const tweets = [];
  const queries = [];
  const hashtags = [];
  const mentions = [];
  const likedPosts = [];
  const likedUsers = [];
  const tweeted = [];

  accountData.forEach((rec) => {
    negative.push(rec["Sum of Negative"]);
    positive.push(rec["Sum of Positive"]);
    tweets.push(rec["Sum of Tweets"]);
    queries.push(rec["Sum of Queries"]);
    hashtags.push(rec["Number of Hashtags"]);
    mentions.push(rec["Number of Mentions"]);
    likedPosts.push(rec["Number of Post Liked"]);
    likedUsers.push(rec["Number of User Liked"]);
    tweeted.push(rec["Number of Tweeted"]);
  });

  series.push({
    name: "Sum of Tweets",
    data: tweets,
  });
  series.push({
    name: "Sum of Queries",
    data: queries,
  });

  series.push({
    name: "Sum of Positive",
    data: positive,
  });

  series.push({
    name: "Sum of Negative",
    data: negative,
  });

  series.push({
    name: "Number of Hashtags",
    data: hashtags,
  });

  series.push({
    name: "Number of Mentions",
    data: mentions,
  });

  series.push({
    name: "Liked Posts",
    data: likedPosts,
  });

  series.push({
    name: "Number of User Liked Posts",
    data: likedUsers,
  });

  series.push({
    name: "Number of Hashtags",
    data: tweeted,
  });

  return series;
};

export const getTweetsData = (accountNames, year, month, startDate, endDate) => {
  const initialValue = [...accountNames];
  accountNames = structureAccounts(accountNames);

  const series = [];
  const tweets = [];
  const hashtags = [];
  const mentions = [];
  const tweeted = [];
  let timePeriodIterator = []
  let timePeriodAttribute = ""

  const categories = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const dates = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30,
  ];

  const requiredData = month !== "month" ? monthlyData : data

  const accountData = requiredData.filter((record) => {
    for (let index = 0; index < accountNames.length; index++) {
     if (month !== "month" && startDate !== "startDate") {
        console.log('second if')
        if (
          record.Accounts === accountNames[index] &&
          record["Years (Date)"] === year &&
          record["Months (Date)"] === month &&
          (record["Date"] >= startDate && record["Date"] <= endDate)
        ) {
          return true;
        }
      } else {
        console.log('else')
        if (
          record.Accounts === accountNames[index] &&
          record["Years (Date)"] === year
        ) {
          return true;
        }
      }
    }

    return false;
  });

  if(month !== "month"){
    timePeriodIterator = dates
    timePeriodAttribute = "Date"
  }else{
    timePeriodIterator = categories
    timePeriodAttribute = "Months (Date)"
  }

  for (let index = 0; index < timePeriodIterator.length; index++) {
    const filteredData = accountData.filter(
      (record) => record[timePeriodAttribute] === timePeriodIterator[index]
    );
    if (
      initialValue.includes("Hashtag") &&
      !initialValue.includes("Mentions")
    ) {
      if (
        initialValue.includes("Positive") &&
        !initialValue.includes("Negative") &&
        !initialValue.includes("Neutral/Queries")
      ) {
        hashtags.push(filterData(filteredData, "Sum of Positive Hashtag"));
      } else if (
        initialValue.includes("Negative") &&
        !initialValue.includes("Positive") &&
        !initialValue.includes("Neutral/Queries")
      ) {
        hashtags.push(filterData(filteredData, "Sum of Negative Hashtag"));
      } else if (
        initialValue.includes("Neutral/Queries") &&
        !initialValue.includes("Negative") &&
        !initialValue.includes("Positive")
      ) {
        hashtags.push(filterData(filteredData, "Sum of Query Hashtag"));
      } else if (
        initialValue.includes("Positive") &&
        initialValue.includes("Neutral/Queries") &&
        !initialValue.includes("Negative")
      ) {
        hashtags.push(
          filterData(filteredData, "Sum of Positive Hashtag") +
            filterData(filteredData, "Sum of Query Hashtag")
        );
      } else if (
        !initialValue.includes("Positive") &&
        initialValue.includes("Neutral/Queries") &&
        initialValue.includes("Negative")
      ) {
        hashtags.push(
          filterData(filteredData, "Sum of Negative Hashtag") +
            filterData(filteredData, "Sum of Query Hashtag")
        );
      } else if (
        initialValue.includes("Positive") &&
        !initialValue.includes("Neutral/Queries") &&
        initialValue.includes("Negative")
      ) {
        hashtags.push(
          filterData(filteredData, "Sum of Positive Hashtag") +
            filterData(filteredData, "Sum of Negative Hashtag")
        );
      } else if (
        initialValue.includes("Positive") &&
        initialValue.includes("Neutral/Queries") &&
        initialValue.includes("Negative")
      ) {
        hashtags.push(
          filterData(filteredData, "Sum of Positive Hashtag") +
            filterData(filteredData, "Sum of Negative Hashtag") +
            filterData(filteredData, "Sum of Query Hashtag")
        );
      } else {
        hashtags.push(filterData(filteredData, "Number of Hashtags"));
      }
    } else if (
      !initialValue.includes("Hashtag") &&
      initialValue.includes("Mentions")
    ) {
      if (
        initialValue.includes("Positive") &&
        !initialValue.includes("Negative") &&
        !initialValue.includes("Neutral/Queries")
      ) {
        mentions.push(filterData(filteredData, "Sum of Positive Mentions"));
      } else if (
        initialValue.includes("Negative") &&
        !initialValue.includes("Positive") &&
        !initialValue.includes("Neutral/Queries")
      ) {
        mentions.push(filterData(filteredData, "Sum of Negative Mentions"));
      } else if (
        initialValue.includes("Neutral/Queries") &&
        !initialValue.includes("Negative") &&
        !initialValue.includes("Positive")
      ) {
        mentions.push(filterData(filteredData, "Sum of Query Mentions"));
      } else if (
        initialValue.includes("Positive") &&
        initialValue.includes("Neutral/Queries") &&
        !initialValue.includes("Negative")
      ) {
        mentions.push(
          filterData(filteredData, "Sum of Positive Mentions") +
            filterData(filteredData, "Sum of Query Mentions")
        );
      } else if (
        !initialValue.includes("Positive") &&
        initialValue.includes("Neutral/Queries") &&
        initialValue.includes("Negative")
      ) {
        mentions.push(
          filterData(filteredData, "Sum of Negative Mentions") +
            filterData(filteredData, "Sum of Query Mentions")
        );
      } else if (
        initialValue.includes("Positive") &&
        !initialValue.includes("Neutral/Queries") &&
        initialValue.includes("Negative")
      ) {
        mentions.push(
          filterData(filteredData, "Sum of Positive Mentions") +
            filterData(filteredData, "Sum of Negative Mentions")
        );
      } else if (
        initialValue.includes("Positive") &&
        initialValue.includes("Neutral/Queries") &&
        initialValue.includes("Negative")
      ) {
        mentions.push(
          filterData(filteredData, "Sum of Positive Mentions") +
            filterData(filteredData, "Sum of Negative Mentions") +
            filterData(filteredData, "Sum of Query Mentions")
        );
      } else {
        mentions.push(filterData(filteredData, "Number of Mentions"));
      }
    } else if (
      initialValue.includes("Hashtag") &&
      initialValue.includes("Mentions")
    ) {
      if (
        initialValue.includes("Positive") &&
        !initialValue.includes("Negative") &&
        !initialValue.includes("Neutral/Queries")
      ) {
        mentions.push(filterData(filteredData, "Sum of Positive Mentions"));
        hashtags.push(filterData(filteredData, "Sum of Positive Hashtag"));
      } else if (
        initialValue.includes("Negative") &&
        !initialValue.includes("Positive") &&
        !initialValue.includes("Neutral/Queries")
      ) {
        mentions.push(filterData(filteredData, "Sum of Negative Mentions"));
        hashtags.push(filterData(filteredData, "Sum of Negative Hashtag"));
      } else if (
        initialValue.includes("Neutral/Queries") &&
        !initialValue.includes("Negative") &&
        !initialValue.includes("Positive")
      ) {
        mentions.push(filterData(filteredData, "Sum of Query Mentions"));
        hashtags.push(filterData(filteredData, "Sum of Query Hashtag"));
      } else if (
        initialValue.includes("Positive") &&
        initialValue.includes("Neutral/Queries") &&
        !initialValue.includes("Negative")
      ) {
        mentions.push(
          filterData(filteredData, "Sum of Positive Mentions") +
            filterData(filteredData, "Sum of Query Mentions")
        );
        hashtags.push(
          filterData(filteredData, "Sum of Positive Hashtag") +
            filterData(filteredData, "Sum of Query Hashtag")
        );
      } else if (
        !initialValue.includes("Positive") &&
        initialValue.includes("Neutral/Queries") &&
        initialValue.includes("Negative")
      ) {
        mentions.push(
          filterData(filteredData, "Sum of Negative Mentions") +
            filterData(filteredData, "Sum of Query Mentions")
        );
        hashtags.push(
          filterData(filteredData, "Sum of Negative Hashtag") +
            filterData(filteredData, "Sum of Query Hashtag")
        );
      } else if (
        initialValue.includes("Positive") &&
        !initialValue.includes("Neutral/Queries") &&
        initialValue.includes("Negative")
      ) {
        mentions.push(
          filterData(filteredData, "Sum of Positive Mentions") +
            filterData(filteredData, "Sum of Negative Mentions")
        );
        hashtags.push(
          filterData(filteredData, "Sum of Positive Hashtag") +
            filterData(filteredData, "Sum of Negative Hashtag")
        );
      } else if (
        initialValue.includes("Positive") &&
        initialValue.includes("Neutral/Queries") &&
        initialValue.includes("Negative")
      ) {
        mentions.push(
          filterData(filteredData, "Sum of Positive Mentions") +
            filterData(filteredData, "Sum of Negative Mentions") +
            filterData(filteredData, "Sum of Query Mentions")
        );
        hashtags.push(
          filterData(filteredData, "Sum of Positive Hashtag") +
            filterData(filteredData, "Sum of Negative Hashtag") +
            filterData(filteredData, "Sum of Query Hashtag")
        );
      } else {
        mentions.push(filterData(filteredData, "Number of Mentions"));
        hashtags.push(filterData(filteredData, "Number of Hashtags"));
      }
    } else {
      if (
        initialValue.includes("Positive") &&
        !initialValue.includes("Negative") &&
        !initialValue.includes("Neutral/Queries")
      ) {
        tweets.push(filterData(filteredData, "Sum of Positive Tweets"));
        tweeted.push(filterData(filteredData, "Number of Positive Tweeted"));
        mentions.push(filterData(filteredData, "Sum of Positive Mentions"));
        hashtags.push(filterData(filteredData, "Sum of Positive Hashtag"));
      } else if (
        !initialValue.includes("Positive") &&
        initialValue.includes("Negative") &&
        !initialValue.includes("Neutral/Queries")
      ) {
        tweets.push(filterData(filteredData, "Sum of Negative Tweets"));
        tweeted.push(filterData(filteredData, "Number of Negative Tweeted"));
        mentions.push(filterData(filteredData, "Sum of Negative Mentions"));
        hashtags.push(filterData(filteredData, "Sum of Negative Hashtag"));
      } else if (
        !initialValue.includes("Positive") &&
        !initialValue.includes("Negative") &&
        initialValue.includes("Neutral/Queries")
      ) {
        tweets.push(filterData(filteredData, "Sum of Nuetral Tweets"));
        tweeted.push(filterData(filteredData, "Number of Neutral Tweeted"));
        mentions.push(filterData(filteredData, "Sum of Query Mentions"));
        hashtags.push(filterData(filteredData, "Sum of Query Hashtag"));
      } else if (
        initialValue.includes("Positive") &&
        !initialValue.includes("Negative") &&
        initialValue.includes("Neutral/Queries")
      ) {
        tweets.push(
          filterData(filteredData, "Sum of Positive Tweets") +
            filterData(filteredData, "Sum of Nuetral Tweets")
        );
        tweeted.push(
          filterData(filteredData, "Number of Positive Tweeted") +
            filterData(filteredData, "Number of Neutral Tweeted")
        );
        mentions.push(
          filterData(filteredData, "Sum of Positive Mentions") +
            filterData(filteredData, "Sum of Query Mentions")
        );
        hashtags.push(
          filterData(filteredData, "Sum of Positive Hashtag") +
            filterData(filteredData, "Sum of Query Hashtag")
        );
      } else if (
        !initialValue.includes("Positive") &&
        initialValue.includes("Negative") &&
        initialValue.includes("Neutral/Queries")
      ) {
        tweets.push(
          filterData(filteredData, "Sum of Negative Tweets") +
            filterData(filteredData, "Sum of Nuetral Tweets")
        );
        tweeted.push(
          filterData(filteredData, "Number of Negative Tweeted") +
            filterData(filteredData, "Number of Neutral Tweeted")
        );
        mentions.push(
          filterData(filteredData, "Sum of Negative Mentions") +
            filterData(filteredData, "Sum of Query Mentions")
        );
        hashtags.push(
          filterData(filteredData, "Sum of Negative Hashtag") +
            filterData(filteredData, "Sum of Query Hashtag")
        );
      } else if (
        initialValue.includes("Positive") &&
        initialValue.includes("Negative") &&
        !initialValue.includes("Neutral/Queries")
      ) {
        tweets.push(
          filterData(filteredData, "Sum of Positive Tweets") +
            filterData(filteredData, "Sum of Negative Tweets")
        );
        tweeted.push(
          filterData(filteredData, "Number of Positive Tweeted") +
            filterData(filteredData, "Number of Negative Tweeted")
        );
        mentions.push(
          filterData(filteredData, "Sum of Positive Mentions") +
            filterData(filteredData, "Sum of Negative Mentions")
        );
        hashtags.push(
          filterData(filteredData, "Sum of Positive Hashtag") +
            filterData(filteredData, "Sum of Negative Hashtag")
        );
      } else if (
        initialValue.includes("Positive") &&
        initialValue.includes("Negative") &&
        initialValue.includes("Neutral/Queries")
      ) {
        tweets.push(
          filterData(filteredData, "Sum of Positive Tweets") +
            filterData(filteredData, "Sum of Negative Tweets") +
            filterData(filteredData, "Sum of Nuetral Tweets")
        );
        tweeted.push(
          filterData(filteredData, "Number of Positive Tweeted") +
            filterData(filteredData, "Number of Negative Tweeted") +
            filterData(filteredData, "Number of Neutral Tweeted")
        );
        mentions.push(
          filterData(filteredData, "Sum of Positive Mentions") +
            filterData(filteredData, "Sum of Negative Mentions") +
            filterData(filteredData, "Sum of Query Mentions")
        );
        hashtags.push(
          filterData(filteredData, "Sum of Positive Hashtag") +
            filterData(filteredData, "Sum of Negative Hashtag") +
            filterData(filteredData, "Sum of Query Hashtag")
        );
      } else {
        tweets.push(filterData(filteredData, "Sum of Tweets"));
        tweeted.push(filterData(filteredData, "Number of Tweeted"));
        mentions.push(filterData(filteredData, "Number of Mentions"));
        hashtags.push(filterData(filteredData, "Number of Hashtags"));
      }
    }
  }

  if (
    (initialValue.includes("Hashtag") && !initialValue.includes("Mentions")) ||
    (initialValue.includes("Hashtag") &&
      !initialValue.includes("Mentions") &&
      (initialValue.includes("Positive") ||
        initialValue.includes("Negative") ||
        initialValue.includes("Neutral/Queries")))
  ) {
    series.push({
      name: "Hashtags",
      data: hashtags,
      color: "#ffffff",
    });
  } else if (
    (!initialValue.includes("Hashtag") && initialValue.includes("Mentions")) ||
    (initialValue.includes("Mentions") &&
      !initialValue.includes("Hashtag") &&
      (initialValue.includes("Positive") ||
        initialValue.includes("Negative") ||
        initialValue.includes("Neutral/Queries")))
  ) {
    series.push({
      name: "Mentions",
      data: mentions,
      color: "#ffffff",
    });
  } else if (
    (initialValue.includes("Hashtag") && initialValue.includes("Mentions")) ||
    (initialValue.includes("Mentions") &&
      initialValue.includes("Hashtag") &&
      (initialValue.includes("Positive") ||
        initialValue.includes("Negative") ||
        initialValue.includes("Neutral/Queries")))
  ) {
    series.push({
      name: "Hashtags",
      data: hashtags,
      color: "#ffffff",
    });

    series.push({
      name: "Mentions",
      data: mentions,
      color: "#ffffff",
    });
  } else {
    series.push({
      name: "Hashtags",
      data: hashtags,
      color: "#ffffff",
    });

    series.push({
      name: "Mentions",
      data: mentions,
      color: "#ffffff",
    });

    series.push({
      name: "Tweeted",
      data: tweeted,
      color: "#ffffff",
    });
  }

  return series;
};

export const getTweetsAnalysis = (accountNames, year, month, startDate, endDate) => {
  const initialValue = [...accountNames];
  accountNames = structureAccounts(accountNames);

  const series = [];
  const tweets = [];
  let timePeriodIterator = []
  let timePeriodAttribute = ""

  const categories = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const dates = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30,
  ];

  const requiredData = month !== "month" ? monthlyData : data

  const accountData = requiredData.filter((record) => {
    for (let index = 0; index < accountNames.length; index++) {
     if (month !== "month" && startDate !== "startDate") {
        console.log('second if')
        if (
          record.Accounts === accountNames[index] &&
          record["Years (Date)"] === year &&
          record["Months (Date)"] === month &&
          (record["Date"] >= startDate && record["Date"] <= endDate)
        ) {
          return true;
        }
      } else {
        console.log('else')
        if (
          record.Accounts === accountNames[index] &&
          record["Years (Date)"] === year
        ) {
          return true;
        }
      }
    }

    return false;
  });

  if(month !== "month"){
    timePeriodIterator = dates
    timePeriodAttribute = "Date"
  }else{
    timePeriodIterator = categories
    timePeriodAttribute = "Months (Date)"
  }

  for (let index = 0; index < timePeriodIterator.length; index++) {
    const filteredData = accountData.filter(
      (record) => record[timePeriodAttribute] === timePeriodIterator[index]
    );
    if (
      initialValue.includes("Positive") &&
      !initialValue.includes("Negative") &&
      !initialValue.includes("Neutral/Queries")
    ) {
      tweets.push(filterData(filteredData, "Sum of Positive Tweets"));
    } else if (
      !initialValue.includes("Positive") &&
      initialValue.includes("Negative") &&
      !initialValue.includes("Neutral/Queries")
    ) {
      tweets.push(filterData(filteredData, "Sum of Negative Tweets"));
    } else if (
      !initialValue.includes("Positive") &&
      !initialValue.includes("Negative") &&
      initialValue.includes("Neutral/Queries")
    ) {
      tweets.push(filterData(filteredData, "Sum of Nuetral Tweets"));
    } else if (
      initialValue.includes("Positive") &&
      !initialValue.includes("Negative") &&
      initialValue.includes("Neutral/Queries")
    ) {
      tweets.push(
        filterData(filteredData, "Sum of Positive Tweets") +
          filterData(filteredData, "Sum of Nuetral Tweets")
      );
    } else if (
      !initialValue.includes("Positive") &&
      initialValue.includes("Negative") &&
      initialValue.includes("Neutral/Queries")
    ) {
      tweets.push(
        filterData(filteredData, "Sum of Negative Tweets") +
          filterData(filteredData, "Sum of Nuetral Tweets")
      );
    } else if (
      initialValue.includes("Positive") &&
      initialValue.includes("Negative") &&
      !initialValue.includes("Neutral/Queries")
    ) {
      tweets.push(
        filterData(filteredData, "Sum of Positive Tweets") +
          filterData(filteredData, "Sum of Negative Tweets")
      );
    } else if (
      initialValue.includes("Positive") &&
      initialValue.includes("Negative") &&
      initialValue.includes("Neutral/Queries")
    ) {
      tweets.push(
        filterData(filteredData, "Sum of Positive Tweets") +
          filterData(filteredData, "Sum of Negative Tweets") +
          filterData(filteredData, "Sum of Nuetral Tweets")
      );
    } else {
      tweets.push(filterData(filteredData, "Sum of Tweets"));
    }
  }
  series.push({
    name: "Tweets",
    data: tweets,
    color: "#ffffff",
  });

  return series;
};

export const getLikesData = (accountNames, year, month, startDate, endDate) => {
  const initialValue = [...accountNames];
  accountNames = structureAccounts(accountNames);

  const series = [];

  const likedPosts = [];
  const likedUsers = [];
  let timePeriodIterator = []
  let timePeriodAttribute = ""

  const categories = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const dates = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30,
  ];

  const requiredData = month !== "month" ? monthlyData : data

  const accountData = requiredData.filter((record) => {
    for (let index = 0; index < accountNames.length; index++) {
     if (month !== "month" && startDate !== "startDate") {
        console.log('second if')
        if (
          record.Accounts === accountNames[index] &&
          record["Years (Date)"] === year &&
          record["Months (Date)"] === month &&
          (record["Date"] >= startDate && record["Date"] <= endDate)
        ) {
          return true;
        }
      } else {
        console.log('else')
        if (
          record.Accounts === accountNames[index] &&
          record["Years (Date)"] === year
        ) {
          return true;
        }
      }
    }

    return false;
  });

  if(month !== "month"){
    timePeriodIterator = dates
    timePeriodAttribute = "Date"
  }else{
    timePeriodIterator = categories
    timePeriodAttribute = "Months (Date)"
  }

  for (let index = 0; index < timePeriodIterator.length; index++) {
    const filteredData = accountData.filter(
      (record) => record[timePeriodAttribute] === timePeriodIterator[index]
    );
    if (
      initialValue.includes("Hashtag") &&
      !initialValue.includes("Mentions")
    ) {
      if (
        initialValue.includes("Positive") &&
        !initialValue.includes("Negative") &&
        !initialValue.includes("Neutral/Queries")
      ) {
        likedPosts.push(
          filterData(filteredData, "Number of Positive Hashtag Post Liked")
        );
        likedUsers.push(
          filterData(filteredData, "Number of Positive Hashtag User Liked")
        );
      } else if (
        initialValue.includes("Negative") &&
        !initialValue.includes("Positive") &&
        !initialValue.includes("Neutral/Queries")
      ) {
        likedPosts.push(
          filterData(filteredData, "Number of Negative Hashtag Post Liked")
        );
        likedUsers.push(
          filterData(filteredData, "Number of Negative Hashtag User Liked")
        );
      } else if (
        initialValue.includes("Neutral/Queries") &&
        !initialValue.includes("Negative") &&
        !initialValue.includes("Positive")
      ) {
        likedPosts.push(
          filterData(filteredData, "Number of Neutral Hashtag Post Liked")
        );
        likedUsers.push(
          filterData(filteredData, "Number of Neutral Hashtag User Liked")
        );
      } else if (
        initialValue.includes("Positive") &&
        initialValue.includes("Neutral/Queries") &&
        !initialValue.includes("Negative")
      ) {
        likedPosts.push(
          filterData(filteredData, "Number of Positive Hashtag Post Liked") +
            filterData(filteredData, "Number of Neutral Hashtag Post Liked")
        );
        likedUsers.push(
          filterData(filteredData, "Number of Positive Hashtag User Liked") +
            filterData(filteredData, "Number of Neutral Hashtag User Liked")
        );
      } else if (
        !initialValue.includes("Positive") &&
        initialValue.includes("Neutral/Queries") &&
        initialValue.includes("Negative")
      ) {
        likedPosts.push(
          filterData(filteredData, "Number of Negative Hashtag Post Liked") +
            filterData(filteredData, "Number of Neutral Hashtag Post Liked")
        );
        likedUsers.push(
          filterData(filteredData, "Number of Negative Hashtag User Liked") +
            filterData(filteredData, "Number of Neutral Hashtag User Liked")
        );
      } else if (
        initialValue.includes("Positive") &&
        !initialValue.includes("Neutral/Queries") &&
        initialValue.includes("Negative")
      ) {
        likedPosts.push(
          filterData(filteredData, "Number of Positive Hashtag Post Liked") +
            filterData(filteredData, "Number of Negative Hashtag Post Liked")
        );
        likedUsers.push(
          filterData(filteredData, "Number of Positive Hashtag User Liked") +
            filterData(filteredData, "Number of Negative Hashtag User Liked")
        );
      } else if (
        initialValue.includes("Positive") &&
        initialValue.includes("Neutral/Queries") &&
        initialValue.includes("Negative")
      ) {
        likedPosts.push(
          filterData(filteredData, "Number of Positive Hashtag Post Liked") +
            filterData(filteredData, "Number of Neutral Hashtag Post Liked") +
            filterData(filteredData, "Number of Negative Hashtag Post Liked")
        );
        likedUsers.push(
          filterData(filteredData, "Number of Positive Hashtag User Liked") +
            filterData(filteredData, "Number of Neutral Hashtag User Liked") +
            filterData(filteredData, "Number of Negative Hashtag User Liked")
        );
      } else {
        likedPosts.push(
          filterData(filteredData, "Number of Hashtag Post Liked")
        );
        likedUsers.push(
          filterData(filteredData, "Number of Hashtag User Liked")
        );
      }
    } else if (
      !initialValue.includes("Hashtag") &&
      initialValue.includes("Mentions")
    ) {
      if (
        initialValue.includes("Positive") &&
        !initialValue.includes("Negative") &&
        !initialValue.includes("Neutral/Queries")
      ) {
        likedPosts.push(
          filterData(filteredData, "Number of Positive Mentions Post Liked")
        );
        likedUsers.push(
          filterData(filteredData, "Number of Positive Mentions User Liked")
        );
      } else if (
        initialValue.includes("Negative") &&
        !initialValue.includes("Positive") &&
        !initialValue.includes("Neutral/Queries")
      ) {
        likedPosts.push(
          filterData(filteredData, "Number of Negative Mentions Post Liked")
        );
        likedUsers.push(
          filterData(filteredData, "Number of Negative Mentions User Liked")
        );
      } else if (
        initialValue.includes("Neutral/Queries") &&
        !initialValue.includes("Negative") &&
        !initialValue.includes("Positive")
      ) {
        likedPosts.push(
          filterData(filteredData, "Number of Neutral Mentions Post Liked")
        );
        likedUsers.push(
          filterData(filteredData, "Number of Neutral Mentions User Liked")
        );
      } else if (
        initialValue.includes("Positive") &&
        initialValue.includes("Neutral/Queries") &&
        !initialValue.includes("Negative")
      ) {
        likedPosts.push(
          filterData(filteredData, "Number of Positive Mentions Post Liked") +
            filterData(filteredData, "Number of Neutral Mentions Post Liked")
        );
        likedUsers.push(
          filterData(filteredData, "Number of Positive Mentions User Liked") +
            filterData(filteredData, "Number of Neutral Mentions User Liked")
        );
      } else if (
        !initialValue.includes("Positive") &&
        initialValue.includes("Neutral/Queries") &&
        initialValue.includes("Negative")
      ) {
        likedPosts.push(
          filterData(filteredData, "Number of Negative Mentions Post Liked") +
            filterData(filteredData, "Number of Neutral Mentions Post Liked")
        );
        likedUsers.push(
          filterData(filteredData, "Number of Negative Mentions User Liked") +
            filterData(filteredData, "Number of Neutral Mentions User Liked")
        );
      } else if (
        initialValue.includes("Positive") &&
        !initialValue.includes("Neutral/Queries") &&
        initialValue.includes("Negative")
      ) {
        likedPosts.push(
          filterData(filteredData, "Number of Positive Mentions Post Liked") +
            filterData(filteredData, "Number of Negative Mentions Post Liked")
        );
        likedUsers.push(
          filterData(filteredData, "Number of Positive Mentions User Liked") +
            filterData(filteredData, "Number of Negative Mentions User Liked")
        );
      } else if (
        initialValue.includes("Positive") &&
        initialValue.includes("Neutral/Queries") &&
        initialValue.includes("Negative")
      ) {
        likedPosts.push(
          filterData(filteredData, "Number of Positive Mentions Post Liked") +
            filterData(filteredData, "Number of Neutral Mentions Post Liked") +
            filterData(filteredData, "Number of Negative Mentions Post Liked")
        );
        likedUsers.push(
          filterData(filteredData, "Number of Positive Mentions User Liked") +
            filterData(filteredData, "Number of Neutral Mentions User Liked") +
            filterData(filteredData, "Number of Negative Mentions User Liked")
        );
      } else {
        likedPosts.push(
          filterData(filteredData, "Number of Mentions Post Liked")
        );
        likedUsers.push(
          filterData(filteredData, "Number of Mentions User Liked")
        );
      }
    } else if (
      initialValue.includes("Hashtag") &&
      initialValue.includes("Mentions")
    ) {
      if (
        initialValue.includes("Positive") &&
        !initialValue.includes("Negative") &&
        !initialValue.includes("Neutral/Queries")
      ) {
        likedPosts.push(
          filterData(filteredData, "Number of Positive Mentions Post Liked") +
            filterData(filteredData, "Number of Positive Hashtag Post Liked")
        );
        likedUsers.push(
          filterData(filteredData, "Number of Positive Mentions User Liked") +
            filterData(filteredData, "Number of Positive Hashtag User Liked")
        );
      } else if (
        initialValue.includes("Negative") &&
        !initialValue.includes("Positive") &&
        !initialValue.includes("Neutral/Queries")
      ) {
        likedPosts.push(
          filterData(filteredData, "Number of Negative Mentions Post Liked") +
            filterData(filteredData, "Number of Negative Hashtag Post Liked")
        );
        likedUsers.push(
          filterData(filteredData, "Number of Negative Mentions User Liked") +
            filterData(filteredData, "Number of Negative Hashtag User Liked")
        );
      } else if (
        initialValue.includes("Neutral/Queries") &&
        !initialValue.includes("Negative") &&
        !initialValue.includes("Positive")
      ) {
        likedPosts.push(
          filterData(filteredData, "Number of Neutral Mentions Post Liked") +
            filterData(filteredData, "Number of Neutral Hashtag Post Liked")
        );
        likedUsers.push(
          filterData(filteredData, "Number of Neutral Mentions User Liked") +
            filterData(filteredData, "Number of Neutral Hashtag User Liked")
        );
      } else if (
        initialValue.includes("Positive") &&
        initialValue.includes("Neutral/Queries") &&
        !initialValue.includes("Negative")
      ) {
        likedPosts.push(
          filterData(filteredData, "Number of Positive Mentions Post Liked") +
            filterData(filteredData, "Number of Neutral Mentions Post Liked") +
            filterData(filteredData, "Number of Positive Hashtag Post Liked") +
            filterData(filteredData, "Number of Neutral Hashtag Post Liked")
        );
        likedUsers.push(
          filterData(filteredData, "Number of Positive Mentions User Liked") +
            filterData(filteredData, "Number of Neutral Mentions User Liked") +
            filterData(filteredData, "Number of Positive Hashtag User Liked") +
            filterData(filteredData, "Number of Neutral Hashtag User Liked")
        );
      } else if (
        !initialValue.includes("Positive") &&
        initialValue.includes("Neutral/Queries") &&
        initialValue.includes("Negative")
      ) {
        likedPosts.push(
          filterData(filteredData, "Number of Negative Mentions Post Liked") +
            filterData(filteredData, "Number of Neutral Mentions Post Liked") +
            filterData(filteredData, "Number of Negative Hashtag Post Liked") +
            filterData(filteredData, "Number of Neutral Hashtag Post Liked")
        );
        likedUsers.push(
          filterData(filteredData, "Number of Negative Mentions User Liked") +
            filterData(filteredData, "Number of Neutral Mentions User Liked") +
            filterData(filteredData, "Number of Negative Hashtag User Liked") +
            filterData(filteredData, "Number of Neutral Hashtag User Liked")
        );
      } else if (
        initialValue.includes("Positive") &&
        !initialValue.includes("Neutral/Queries") &&
        initialValue.includes("Negative")
      ) {
        likedPosts.push(
          filterData(filteredData, "Number of Positive Mentions Post Liked") +
            filterData(filteredData, "Number of Negative Mentions Post Liked") +
            filterData(filteredData, "Number of Positive Hashtag Post Liked") +
            filterData(filteredData, "Number of Negative Hashtag Post Liked")
        );
        likedUsers.push(
          filterData(filteredData, "Number of Positive Mentions User Liked") +
            filterData(filteredData, "Number of Negative Mentions User Liked") +
            filterData(filteredData, "Number of Positive Hashtag User Liked") +
            filterData(filteredData, "Number of Negative Hashtag User Liked")
        );
      } else if (
        initialValue.includes("Positive") &&
        initialValue.includes("Neutral/Queries") &&
        initialValue.includes("Negative")
      ) {
        likedPosts.push(
          filterData(filteredData, "Number of Positive Mentions Post Liked") +
            filterData(filteredData, "Number of Neutral Mentions Post Liked") +
            filterData(filteredData, "Number of Negative Mentions Post Liked") +
            filterData(filteredData, "Number of Positive Hashtag Post Liked") +
            filterData(filteredData, "Number of Neutral Hashtag Post Liked") +
            filterData(filteredData, "Number of Negative Hashtag Post Liked")
        );
        likedUsers.push(
          filterData(filteredData, "Number of Positive Mentions User Liked") +
            filterData(filteredData, "Number of Neutral Mentions User Liked") +
            filterData(filteredData, "Number of Negative Mentions User Liked") +
            filterData(filteredData, "Number of Positive Hashtag User Liked") +
            filterData(filteredData, "Number of Neutral Hashtag User Liked") +
            filterData(filteredData, "Number of Negative Hashtag User Liked")
        );
      } else {
        const addedPost =
          filterData(filteredData, "Number of Mentions Post Liked") +
          filterData(filteredData, "Number of Hashtag Post Liked");
        const addedUser =
          filterData(filteredData, "Number of Mentions User Liked") +
          filterData(filteredData, "Number of Hashtag User Liked");

        likedPosts.push(addedPost);
        likedUsers.push(addedUser);
      }
    } else {
      if (
        initialValue.includes("Positive") &&
        !initialValue.includes("Negative") &&
        !initialValue.includes("Neutral/Queries")
      ) {
        likedPosts.push(
          filterData(filteredData, "Number of Positive Post Liked")
        );
        likedUsers.push(
          filterData(filteredData, "Number of Positive User Liked")
        );
      } else if (
        initialValue.includes("Negative") &&
        !initialValue.includes("Positive") &&
        !initialValue.includes("Neutral/Queries")
      ) {
        likedPosts.push(
          filterData(filteredData, "Number of Negative Post Liked")
        );
        likedUsers.push(
          filterData(filteredData, "Number of Negative User Liked")
        );
      } else if (
        initialValue.includes("Neutral/Queries") &&
        !initialValue.includes("Negative") &&
        !initialValue.includes("Positive")
      ) {
        likedPosts.push(
          filterData(filteredData, "Number of Neutral Post Liked")
        );
        likedUsers.push(
          filterData(filteredData, "Number of Neutral User Liked")
        );
      } else if (
        initialValue.includes("Positive") &&
        initialValue.includes("Neutral/Queries") &&
        !initialValue.includes("Negative")
      ) {
        likedPosts.push(
          filterData(filteredData, "Number of Positive Post Liked") +
            filterData(filteredData, "Number of Neutral Post Liked")
        );
        likedUsers.push(
          filterData(filteredData, "Number of Positive User Liked") +
            filterData(filteredData, "Number of Neutral User Liked")
        );
      } else if (
        !initialValue.includes("Positive") &&
        initialValue.includes("Neutral/Queries") &&
        initialValue.includes("Negative")
      ) {
        likedPosts.push(
          filterData(filteredData, "Number of Negative Post Liked") +
            filterData(filteredData, "Number of Neutral Post Liked")
        );
        likedUsers.push(
          filterData(filteredData, "Number of Negative User Liked") +
            filterData(filteredData, "Number of Neutral User Liked")
        );
      } else if (
        initialValue.includes("Positive") &&
        !initialValue.includes("Neutral/Queries") &&
        initialValue.includes("Negative")
      ) {
        likedPosts.push(
          filterData(filteredData, "Number of Positive Post Liked") +
            filterData(filteredData, "Number of Negative Post Liked")
        );
        likedUsers.push(
          filterData(filteredData, "Number of Positive User Liked") +
            filterData(filteredData, "Number of Negative User Liked")
        );
      } else if (
        initialValue.includes("Positive") &&
        initialValue.includes("Neutral/Queries") &&
        initialValue.includes("Negative")
      ) {
        likedPosts.push(
          filterData(filteredData, "Number of Positive Post Liked") +
            filterData(filteredData, "Number of Neutral Post Liked") +
            filterData(filteredData, "Number of Negative Post Liked")
        );
        likedUsers.push(
          filterData(filteredData, "Number of Positive User Liked") +
            filterData(filteredData, "Number of Neutral User Liked") +
            filterData(filteredData, "Number of Negative User Liked")
        );
      } else {
        likedPosts.push(filterData(filteredData, "Number of Post Liked"));
        likedUsers.push(filterData(filteredData, "Number of User Liked"));
      }
    }
  }

  series.push({
    name: "Liked Posts",
    data: likedPosts,
    color: "#ffffff",
  });

  series.push({
    name: "User Liked Posts",
    data: likedUsers,
    color: "#ffffff",
  });

  return series;
};

export const getReTweetsData = (accountNames, year, month, startDate, endDate) => {
  const initialValue = [...accountNames];
  accountNames = structureAccounts(accountNames);

  const series = [];

  const retweetedTweets = [];
  const retweetedUsers = [];
  let timePeriodIterator = []
  let timePeriodAttribute = ""

  const categories = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const dates = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30,
  ];

  const requiredData = month !== "month" ? monthlyData : data

  const accountData = requiredData.filter((record) => {
    if (accountNames.length == 0) {
      accountNames = ["Bank1", "bank2", "Bank3", "Fintech4", "Fintech5"];
    }
    for (let index = 0; index < accountNames.length; index++) {
     if (month !== "month" && startDate !== "startDate") {
        console.log('second if')
        if (
          record.Accounts === accountNames[index] &&
          record["Years (Date)"] === year &&
          record["Months (Date)"] === month &&
          (record["Date"] >= startDate && record["Date"] <= endDate)
        ) {
          return true;
        }
      } else {
        console.log('else')
        if (
          record.Accounts === accountNames[index] &&
          record["Years (Date)"] === year
        ) {
          return true;
        }
      }
    }

    return false;
  });

  if(month !== "month"){
    timePeriodIterator = dates
    timePeriodAttribute = "Date"
  }else{
    timePeriodIterator = categories
    timePeriodAttribute = "Months (Date)"
  }

  // const accountData = data.filter((record) => {
  //   if (accountNames.length == 0) {
  //     accountNames = ["Bank1", "bank2", "Bank3", "Fintech4", "Fintech5"];
  //   }
  //   for (let index = 0; index < accountNames.length; index++) {
  //     if (
  //       record.Accounts === accountNames[index] &&
  //       record["Years (Date)"] === year
  //     ) {
  //       return true;
  //     }
  //   }
  //   return false;
  // });

  for (let index = 0; index < timePeriodIterator.length; index++) {
    const filteredData = accountData.filter(
      (record) => record[timePeriodAttribute] === timePeriodIterator[index]
    );
    if (
      initialValue.includes("Hashtag") &&
      !initialValue.includes("Mentions")
    ) {
      if (
        initialValue.includes("Positive") &&
        !initialValue.includes("Negative") &&
        !initialValue.includes("Neutral/Queries")
      ) {
        retweetedTweets.push(
          filterData(filteredData, "Number of Positive Hashtag Retweeted")
        );
        retweetedUsers.push(
          filterData(filteredData, "Number of Positive Hashtag User Retweeted")
        );
      } else if (
        initialValue.includes("Negative") &&
        !initialValue.includes("Positive") &&
        !initialValue.includes("Neutral/Queries")
      ) {
        retweetedTweets.push(
          filterData(filteredData, "Number of Negative Hashtag Retweeted")
        );
        retweetedUsers.push(
          filterData(filteredData, "Number of Negative Hashtag User Retweeted")
        );
      } else if (
        initialValue.includes("Neutral/Queries") &&
        !initialValue.includes("Negative") &&
        !initialValue.includes("Positive")
      ) {
        retweetedTweets.push(
          filterData(filteredData, "Number of Neutral Hashtag Retweeted")
        );
        retweetedUsers.push(
          filterData(filteredData, "Number of Neutral Hashtag User Retweeted")
        );
      } else if (
        initialValue.includes("Positive") &&
        initialValue.includes("Neutral/Queries") &&
        !initialValue.includes("Negative")
      ) {
        retweetedTweets.push(
          filterData(filteredData, "Number of Positive Hashtag Retweeted") +
            filterData(filteredData, "Number of Neutral Hashtag Retweeted")
        );
        retweetedUsers.push(
          filterData(
            filteredData,
            "Number of Positive Hashtag User Retweeted"
          ) +
            filterData(filteredData, "Number of Neutral Hashtag User Retweeted")
        );
      } else if (
        !initialValue.includes("Positive") &&
        initialValue.includes("Neutral/Queries") &&
        initialValue.includes("Negative")
      ) {
        retweetedTweets.push(
          filterData(filteredData, "Number of Negative Hashtag Retweeted") +
            filterData(filteredData, "Number of Neutral Hashtag Retweeted")
        );
        retweetedUsers.push(
          filterData(
            filteredData,
            "Number of Negative Hashtag User Retweeted"
          ) +
            filterData(filteredData, "Number of Neutral Hashtag User Retweeted")
        );
      } else if (
        initialValue.includes("Positive") &&
        !initialValue.includes("Neutral/Queries") &&
        initialValue.includes("Negative")
      ) {
        retweetedTweets.push(
          filterData(filteredData, "Number of Positive Hashtag Retweeted") +
            filterData(filteredData, "Number of Negative Hashtag Retweeted")
        );
        retweetedUsers.push(
          filterData(
            filteredData,
            "Number of Positive Hashtag User Retweeted"
          ) +
            filterData(
              filteredData,
              "Number of Negative Hashtag User Retweeted"
            )
        );
      } else if (
        initialValue.includes("Positive") &&
        initialValue.includes("Neutral/Queries") &&
        initialValue.includes("Negative")
      ) {
        retweetedTweets.push(
          filterData(filteredData, "Number of Positive Hashtag Retweeted") +
            filterData(filteredData, "Number of Neutral Hashtag Retweeted") +
            filterData(filteredData, "Number of Negative Hashtag Retweeted")
        );
        retweetedUsers.push(
          filterData(
            filteredData,
            "Number of Positive Hashtag User Retweeted"
          ) +
            filterData(
              filteredData,
              "Number of Neutral Hashtag User Retweeted"
            ) +
            filterData(
              filteredData,
              "Number of Negative Hashtag User Retweeted"
            )
        );
      } else {
        retweetedTweets.push(
          filterData(filteredData, "Number of Hashtag Retweeted")
        );
        retweetedUsers.push(
          filterData(filteredData, "Number of Hashtag User Retweeted")
        );
      }
    } else if (
      !initialValue.includes("Hashtag") &&
      initialValue.includes("Mentions")
    ) {
      if (
        initialValue.includes("Positive") &&
        !initialValue.includes("Negative") &&
        !initialValue.includes("Neutral/Queries")
      ) {
        retweetedTweets.push(
          filterData(filteredData, "Number of Positive Mentions Retweeted")
        );
        retweetedUsers.push(
          filterData(filteredData, "Number of Positive Mentions User Retweeted")
        );
      } else if (
        initialValue.includes("Negative") &&
        !initialValue.includes("Positive") &&
        !initialValue.includes("Neutral/Queries")
      ) {
        retweetedTweets.push(
          filterData(filteredData, "Number of Negative Mentions Retweeted")
        );
        retweetedUsers.push(
          filterData(filteredData, "Number of Negative Mentions User Retweeted")
        );
      } else if (
        initialValue.includes("Neutral/Queries") &&
        !initialValue.includes("Negative") &&
        !initialValue.includes("Positive")
      ) {
        retweetedTweets.push(
          filterData(filteredData, "Number of Neutral Mentions Retweeted")
        );
        retweetedUsers.push(
          filterData(filteredData, "Number of Neutral Mentions User Retweeted")
        );
      } else if (
        initialValue.includes("Positive") &&
        initialValue.includes("Neutral/Queries") &&
        !initialValue.includes("Negative")
      ) {
        retweetedTweets.push(
          filterData(filteredData, "Number of Positive Mentions Retweeted") +
            filterData(filteredData, "Number of Neutral Mentions Retweeted")
        );
        retweetedUsers.push(
          filterData(
            filteredData,
            "Number of Positive Mentions User Retweeted"
          ) +
            filterData(
              filteredData,
              "Number of Neutral Mentions User Retweeted"
            )
        );
      } else if (
        !initialValue.includes("Positive") &&
        initialValue.includes("Neutral/Queries") &&
        initialValue.includes("Negative")
      ) {
        retweetedTweets.push(
          filterData(filteredData, "Number of Negative Mentions Retweeted") +
            filterData(filteredData, "Number of Neutral Mentions Retweeted")
        );
        retweetedUsers.push(
          filterData(
            filteredData,
            "Number of Negative Mentions User Retweeted"
          ) +
            filterData(
              filteredData,
              "Number of Neutral Mentions User Retweeted"
            )
        );
      } else if (
        initialValue.includes("Positive") &&
        !initialValue.includes("Neutral/Queries") &&
        initialValue.includes("Negative")
      ) {
        retweetedTweets.push(
          filterData(filteredData, "Number of Positive Mentions Retweeted") +
            filterData(filteredData, "Number of Negative Mentions Retweeted")
        );
        retweetedUsers.push(
          filterData(
            filteredData,
            "Number of Positive Mentions User Retweeted"
          ) +
            filterData(
              filteredData,
              "Number of Negative Mentions User Retweeted"
            )
        );
      } else if (
        initialValue.includes("Positive") &&
        initialValue.includes("Neutral/Queries") &&
        initialValue.includes("Negative")
      ) {
        retweetedTweets.push(
          filterData(filteredData, "Number of Positive Mentions Retweeted") +
            filterData(filteredData, "Number of Neutral Mentions Retweeted") +
            filterData(filteredData, "Number of Negative Mentions Retweeted")
        );
        retweetedUsers.push(
          filterData(
            filteredData,
            "Number of Positive Mentions User Retweeted"
          ) +
            filterData(
              filteredData,
              "Number of Neutral Mentions User Retweeted"
            ) +
            filterData(
              filteredData,
              "Number of Negative Mentions User Retweeted"
            )
        );
      } else {
        retweetedTweets.push(
          filterData(filteredData, "Number of Mentions Retweeted")
        );
        retweetedUsers.push(
          filterData(filteredData, "Number of Mentions User Retweeted")
        );
      }
    } else if (
      initialValue.includes("Hashtag") &&
      initialValue.includes("Mentions")
    ) {
      if (
        initialValue.includes("Positive") &&
        !initialValue.includes("Negative") &&
        !initialValue.includes("Neutral/Queries")
      ) {
        retweetedTweets.push(
          filterData(filteredData, "Number of Positive Mentions Retweeted") +
            filterData(filteredData, "Number of Positive Hashtag Retweeted")
        );
        retweetedUsers.push(
          filterData(
            filteredData,
            "Number of Positive Mentions User Retweeted"
          ) +
            filterData(
              filteredData,
              "Number of Positive Hashtag User Retweeted"
            )
        );
      } else if (
        initialValue.includes("Negative") &&
        !initialValue.includes("Positive") &&
        !initialValue.includes("Neutral/Queries")
      ) {
        retweetedTweets.push(
          filterData(filteredData, "Number of Negative Mentions Retweeted") +
            filterData(filteredData, "Number of Negative Hashtag Retweeted")
        );
        retweetedUsers.push(
          filterData(
            filteredData,
            "Number of Negative Mentions User Retweeted"
          ) +
            filterData(
              filteredData,
              "Number of Negative Hashtag User Retweeted"
            )
        );
      } else if (
        initialValue.includes("Neutral/Queries") &&
        !initialValue.includes("Negative") &&
        !initialValue.includes("Positive")
      ) {
        retweetedTweets.push(
          filterData(filteredData, "Number of Neutral Mentions Retweeted") +
            filterData(filteredData, "Number of Neutral Hashtag Retweeted")
        );
        retweetedUsers.push(
          filterData(
            filteredData,
            "Number of Neutral Mentions User Retweeted"
          ) +
            filterData(filteredData, "Number of Neutral Hashtag User Retweeted")
        );
      } else if (
        initialValue.includes("Positive") &&
        initialValue.includes("Neutral/Queries") &&
        !initialValue.includes("Negative")
      ) {
        retweetedTweets.push(
          filterData(filteredData, "Number of Positive Mentions Retweeted") +
            filterData(filteredData, "Number of Neutral Mentions Retweeted") +
            filterData(filteredData, "Number of Positive Hashtag Retweeted") +
            filterData(filteredData, "Number of Neutral Hashtag Retweeted")
        );
        retweetedUsers.push(
          filterData(
            filteredData,
            "Number of Positive Mentions User Retweeted"
          ) +
            filterData(
              filteredData,
              "Number of Neutral Mentions User Retweeted"
            ) +
            filterData(
              filteredData,
              "Number of Positive Hashtag User Retweeted"
            ) +
            filterData(filteredData, "Number of Neutral Hashtag User Retweeted")
        );
      } else if (
        !initialValue.includes("Positive") &&
        initialValue.includes("Neutral/Queries") &&
        initialValue.includes("Negative")
      ) {
        retweetedTweets.push(
          filterData(filteredData, "Number of Negative Mentions Retweeted") +
            filterData(filteredData, "Number of Neutral Mentions Retweeted") +
            filterData(filteredData, "Number of Negative Hashtag Retweeted") +
            filterData(filteredData, "Number of Neutral Hashtag Retweeted")
        );
        retweetedUsers.push(
          filterData(
            filteredData,
            "Number of Negative Mentions User Retweeted"
          ) +
            filterData(
              filteredData,
              "Number of Neutral Mentions User Retweeted"
            ) +
            filterData(
              filteredData,
              "Number of Negative Hashtag User Retweeted"
            ) +
            filterData(filteredData, "Number of Neutral Hashtag User Retweeted")
        );
      } else if (
        initialValue.includes("Positive") &&
        !initialValue.includes("Neutral/Queries") &&
        initialValue.includes("Negative")
      ) {
        retweetedTweets.push(
          filterData(filteredData, "Number of Positive Mentions Retweeted") +
            filterData(filteredData, "Number of Negative Mentions Retweeted") +
            filterData(filteredData, "Number of Positive Hashtag Retweeted") +
            filterData(filteredData, "Number of Negative Hashtag Retweeted")
        );
        retweetedUsers.push(
          filterData(
            filteredData,
            "Number of Positive Mentions User Retweeted"
          ) +
            filterData(
              filteredData,
              "Number of Negative Mentions User Retweeted"
            ) +
            filterData(
              filteredData,
              "Number of Positive Hashtag User Retweeted"
            ) +
            filterData(
              filteredData,
              "Number of Negative Hashtag User Retweeted"
            )
        );
      } else if (
        initialValue.includes("Positive") &&
        initialValue.includes("Neutral/Queries") &&
        initialValue.includes("Negative")
      ) {
        retweetedTweets.push(
          filterData(filteredData, "Number of Positive Mentions Retweeted") +
            filterData(filteredData, "Number of Neutral Mentions Retweeted") +
            filterData(filteredData, "Number of Negative Mentions Retweeted") +
            filterData(filteredData, "Number of Positive Hashtag Retweeted") +
            filterData(filteredData, "Number of Neutral Hashtag Retweeted") +
            filterData(filteredData, "Number of Negative Hashtag Retweeted")
        );
        retweetedUsers.push(
          filterData(
            filteredData,
            "Number of Positive Mentions User Retweeted"
          ) +
            filterData(
              filteredData,
              "Number of Neutral Mentions User Retweeted"
            ) +
            filterData(
              filteredData,
              "Number of Negative Mentions User Retweeted"
            ) +
            filterData(
              filteredData,
              "Number of Positive Hashtag User Retweeted"
            ) +
            filterData(
              filteredData,
              "Number of Neutral Hashtag User Retweeted"
            ) +
            filterData(
              filteredData,
              "Number of Negative Hashtag User Retweeted"
            )
        );
      } else {
        const addedPost =
          filterData(filteredData, "Number of Mentions Retweeted") +
          filterData(filteredData, "Number of Hashtag Retweeted");
        const addedUser =
          filterData(filteredData, "Number of Mentions User Retweeted") +
          filterData(filteredData, "Number of Hashtag User Retweeted");

        retweetedTweets.push(addedPost);
        retweetedUsers.push(addedUser);
      }
    } else {
      if (
        initialValue.includes("Positive") &&
        !initialValue.includes("Negative") &&
        !initialValue.includes("Neutral/Queries")
      ) {
        retweetedTweets.push(
          filterData(filteredData, "Number of Positive Retweeted")
        );
        retweetedUsers.push(
          filterData(filteredData, "Number of Positive User Retweeted")
        );
      } else if (
        initialValue.includes("Negative") &&
        !initialValue.includes("Positive") &&
        !initialValue.includes("Neutral/Queries")
      ) {
        retweetedTweets.push(
          filterData(filteredData, "Number of Negative Retweeted")
        );
        retweetedUsers.push(
          filterData(filteredData, "Number of Negative User Retweeted")
        );
      } else if (
        initialValue.includes("Neutral/Queries") &&
        !initialValue.includes("Negative") &&
        !initialValue.includes("Positive")
      ) {
        retweetedTweets.push(
          filterData(filteredData, "Number of Neutral Retweeted")
        );
        retweetedUsers.push(
          filterData(filteredData, "Number of Neutral User Retweeted")
        );
      } else if (
        initialValue.includes("Positive") &&
        initialValue.includes("Neutral/Queries") &&
        !initialValue.includes("Negative")
      ) {
        retweetedTweets.push(
          filterData(filteredData, "Number of Positive Retweeted") +
            filterData(filteredData, "Number of Neutral Retweeted")
        );
        retweetedUsers.push(
          filterData(filteredData, "Number of Positive User Retweeted") +
            filterData(filteredData, "Number of Neutral User Retweeted")
        );
      } else if (
        !initialValue.includes("Positive") &&
        initialValue.includes("Neutral/Queries") &&
        initialValue.includes("Negative")
      ) {
        retweetedTweets.push(
          filterData(filteredData, "Number of Negative Retweeted") +
            filterData(filteredData, "Number of Neutral Retweeted")
        );
        retweetedUsers.push(
          filterData(filteredData, "Number of Negative User Retweeted") +
            filterData(filteredData, "Number of Neutral User Retweeted")
        );
      } else if (
        initialValue.includes("Positive") &&
        !initialValue.includes("Neutral/Queries") &&
        initialValue.includes("Negative")
      ) {
        retweetedTweets.push(
          filterData(filteredData, "Number of Positive Retweeted") +
            filterData(filteredData, "Number of Negative Retweeted")
        );
        retweetedUsers.push(
          filterData(filteredData, "Number of Positive User Retweeted") +
            filterData(filteredData, "Number of Negative User Retweeted")
        );
      } else if (
        initialValue.includes("Positive") &&
        initialValue.includes("Neutral/Queries") &&
        initialValue.includes("Negative")
      ) {
        retweetedTweets.push(
          filterData(filteredData, "Number of Positive Retweeted") +
            filterData(filteredData, "Number of Neutral Retweeted") +
            filterData(filteredData, "Number of Negative Retweeted")
        );
        retweetedUsers.push(
          filterData(filteredData, "Number of Positive User Retweeted") +
            filterData(filteredData, "Number of Neutral User Retweeted") +
            filterData(filteredData, "Number of Negative User Retweeted")
        );
      } else {
        retweetedTweets.push(filterData(filteredData, "Number of Retweeted"));
        retweetedUsers.push(
          filterData(filteredData, "Number of User Retweeted")
        );
      }
    }
  }

  series.push({
    name: "Retweeted tweets",
    data: retweetedTweets,
    color: "#ffffff",
  });

  series.push({
    name: "User Retweeted",
    data: retweetedUsers,
    color: "#ffffff",
  });

  return series;
};

export const getTweetCategoryData = (accountNames, year, month, startDate, endDate) => {
  const initialValue = [...accountNames];
  accountNames = structureAccounts(accountNames);

  const series = [];

  const positiveTweets = [];
  const negativeTweets = [];
  const queryTweets = [];
  let timePeriodIterator = []
  let timePeriodAttribute = ""

  const categories = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const dates = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30,
  ];

  const requiredData = month !== "month" ? monthlyData : data

  const accountData = requiredData.filter((record) => {
    for (let index = 0; index < accountNames.length; index++) {
     if (month !== "month" && startDate !== "startDate") {
        console.log('second if')
        if (
          record.Accounts === accountNames[index] &&
          record["Years (Date)"] === year &&
          record["Months (Date)"] === month &&
          (record["Date"] >= startDate && record["Date"] <= endDate)
        ) {
          return true;
        }
      } else {
        console.log('else')
        if (
          record.Accounts === accountNames[index] &&
          record["Years (Date)"] === year
        ) {
          return true;
        }
      }
    }

    return false;
  });

  if(month !== "month"){
    timePeriodIterator = dates
    timePeriodAttribute = "Date"
  }else{
    timePeriodIterator = categories
    timePeriodAttribute = "Months (Date)"
  }

  // const accountData = data.filter((record) => {
  //   for (let index = 0; index < accountNames.length; index++) {
  //     if (
  //       record.Accounts === accountNames[index] &&
  //       record["Years (Date)"] === year
  //     ) {
  //       return true;
  //     }
  //   }
  //   return false;
  // });

  for (let index = 0; index < timePeriodIterator.length; index++) {
    const filteredData = accountData.filter(
      (record) => record[timePeriodAttribute] === timePeriodIterator[index]
    );
    if (
      initialValue.includes("Hashtag") &&
      !initialValue.includes("Mentions")
    ) {
      positiveTweets.push(filterData(filteredData, "Sum of Positive Hashtag"));
      negativeTweets.push(filterData(filteredData, "Sum of Negative Hashtag"));
      queryTweets.push(filterData(filteredData, "Sum of Query Hashtag"));
    } else if (
      !initialValue.includes("Hashtag") &&
      initialValue.includes("Mentions")
    ) {
      positiveTweets.push(filterData(filteredData, "Sum of Positive Mentions"));
      negativeTweets.push(filterData(filteredData, "Sum of Negative Mentions"));
      queryTweets.push(filterData(filteredData, "Sum of Query Mentions"));
    } else if (
      initialValue.includes("Hashtag") &&
      initialValue.includes("Mentions")
    ) {
      const addedPost =
        filterData(filteredData, "Sum of Positive Hashtag") +
        filterData(filteredData, "Sum of Positive Mentions");
      const addedUser =
        filterData(filteredData, "Sum of Negative Hashtag") +
        filterData(filteredData, "Sum of Negative Mentions");
      const addedQuery =
        filterData(filteredData, "Sum of Query Hashtag") +
        filterData(filteredData, "Sum of Query Mentions");

      positiveTweets.push(addedPost);
      negativeTweets.push(addedUser);
      queryTweets.push(addedQuery);
    } else {
      positiveTweets.push(filterData(filteredData, "Sum of Positive"));
      negativeTweets.push(filterData(filteredData, "Sum of Negative"));
      queryTweets.push(filterData(filteredData, "Sum of Queries"));
    }
  }

  series.push({
    name: "Positive tweets",
    data: positiveTweets,
    color: "green",
    borderColor: "green",
  });

  series.push({
    name: "Negative tweets",
    data: negativeTweets,
    color: "red",
    borderColor: "red",
  });

  series.push({
    name: "Neutral/Query tweets",
    data: queryTweets,
    color: "yellow",
    borderColor: "yellow",
  });

  return series;
};

export const getHashtagTweetCategoryData = (accountName, year) => {
  const accountData = data.filter(
    (record) =>
      record.Accounts === accountName && record["Years (Date)"] === year
  );
  const series = [];

  const positiveTweets = [];
  const negativeTweets = [];
  const queryTweets = [];

  accountData.forEach((rec) => {
    positiveTweets.push(rec["Sum of Positive Hashtag"]);
    negativeTweets.push(rec["Sum of Negative Hashtag"]);
    queryTweets.push(rec["Sum of Query Hashtag"]);
  });

  series.push({
    name: "Positive tweets",
    data: positiveTweets,
  });

  series.push({
    name: "Negative tweets",
    data: negativeTweets,
  });

  series.push({
    name: "Neutral/Query tweets",
    data: queryTweets,
  });

  return series;
};

export const getMentionTweetCategoryData = (accountName, year) => {
  const accountData = data.filter(
    (record) =>
      record.Accounts === accountName && record["Years (Date)"] === year
  );
  const series = [];

  const positiveTweets = [];
  const negativeTweets = [];
  const queryTweets = [];

  accountData.forEach((rec) => {
    positiveTweets.push(rec["Sum of Positive Mentions"]);
    negativeTweets.push(rec["Sum of Negative Mentions"]);
    queryTweets.push(rec["Sum of Query Mentions"]);
  });

  series.push({
    name: "Positive tweets",
    data: positiveTweets,
  });

  series.push({
    name: "Negative tweets",
    data: negativeTweets,
  });

  series.push({
    name: "Neutral/Query tweets",
    data: queryTweets,
  });

  return series;
};

export const getPositiveMentionUserData = (accountNames, year, month, startDate, endDate) => {
  const initialValue = [...accountNames];
  accountNames = structureAccounts(accountNames);

  const series = [];

  const positiveTweets = [];
  const negativeTweets = [];
  const queryTweets = [];
  let timePeriodIterator = []
  let timePeriodAttribute = ""

  const categories = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

const dates = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30,
  ];

  const requiredData = month !== "month" ? monthlyData : data

  const accountData = requiredData.filter((record) => {
    for (let index = 0; index < accountNames.length; index++) {
     if (month !== "month" && startDate !== "startDate") {
        console.log('second if')
        if (
          record.Accounts === accountNames[index] &&
          record["Years (Date)"] === year &&
          record["Months (Date)"] === month &&
          (record["Date"] >= startDate && record["Date"] <= endDate)
        ) {
          return true;
        }
      } else {
        console.log('else')
        if (
          record.Accounts === accountNames[index] &&
          record["Years (Date)"] === year
        ) {
          return true;
        }
      }
    }

    return false;
  });

  if(month !== "month"){
    timePeriodIterator = dates
    timePeriodAttribute = "Date"
  }else{
    timePeriodIterator = categories
    timePeriodAttribute = "Months (Date)"
  }

  for (let index = 0; index < timePeriodIterator.length; index++) {
    const filteredData = accountData.filter(
      (record) => record[timePeriodAttribute] === timePeriodIterator[index]
    );
    if (
      initialValue.includes("Hashtag") &&
      !initialValue.includes("Mentions")
    ) {
      positiveTweets.push(filterData(filteredData, "Positive Hashtag Users"));
      negativeTweets.push(filterData(filteredData, "Negative Hashtag Users"));
      queryTweets.push(
        filterData(filteredData, "Query Hashtag Users") +
          filterData(filteredData, "Neutral Hashtag Users")
      );
    } else if (
      !initialValue.includes("Hashtag") &&
      initialValue.includes("Mentions")
    ) {
      positiveTweets.push(filterData(filteredData, "Positive Mentions Users"));
      negativeTweets.push(filterData(filteredData, "Negative Mentions Users"));
      queryTweets.push(
        filterData(filteredData, "Query Mentions Users") +
          filterData(filteredData, "Neutral Mentions Users")
      );
    } else if (
      initialValue.includes("Hashtag") &&
      initialValue.includes("Mentions")
    ) {
      const addedPost =
        filterData(filteredData, "Positive Mentions Users") +
        filterData(filteredData, "Negative Mentions Users");
      const addedUser =
        filterData(filteredData, "Positive Hashtag Users") +
        filterData(filteredData, "Negative Hashtag Users");
      const addedQuery =
        filterData(filteredData, "Query Mentions Users") +
        filterData(filteredData, "Query Hashtag Users") +
        filterData(filteredData, "Neutral Mentions Users") +
        filterData(filteredData, "Neutral Hashtag Users");

      positiveTweets.push(addedPost);
      negativeTweets.push(addedUser);
      queryTweets.push(addedQuery);
    } else {
      positiveTweets.push(filterData(filteredData, "Positive Users"));
      negativeTweets.push(filterData(filteredData, "Negative Users"));
      queryTweets.push(filterData(filteredData, "Neutral Users"));
    }
  }

  series.push({
    name: "Neutral/Query users",
    data: queryTweets,
    color: "yellow",
    borderColor: "yellow",
  });

  series.push({
    name: "Negative users",
    data: negativeTweets,
    color: "red",
    borderColor: "red",
  });

  series.push({
    name: "Positive users",
    data: positiveTweets,
    color: "green",
    borderColor: "green",
  });

  return series;
};

export const getPositiveHashtagUserData = (accountName, year) => {
  const accountData = data.filter(
    (record) =>
      record.Accounts === accountName && record["Years (Date)"] === year
  );
  const series = [];

  const positiveTweets = [];
  const negativeTweets = [];
  const queryTweets = [];

  accountData.forEach((rec) => {
    positiveTweets.push(rec["Positive Hashtag Users"]);
    negativeTweets.push(rec["Negative Hashtag Users"]);
    queryTweets.push(rec["Query Hashtag Users"]);
  });

  series.push({
    name: "Positive users",
    data: positiveTweets,
  });

  series.push({
    name: "Negative users",
    data: negativeTweets,
  });

  series.push({
    name: "Neutral/Query users",
    data: queryTweets,
  });

  return series;
};

export const getOffersTweetsData = (accountNames, year) => {
  let retweeted = 0;
  let liked = 0;

  accountNames = structureAccounts(accountNames);

  const accountData = offerData.filter((record) => {
    for (let index = 0; index < accountNames.length; index++) {
      if (
        record.Accounts === accountNames[index] &&
        record["Years (Date)"] === year
      ) {
        return true;
      }
    }
    return false;
  });

  for (let index = 0; index < accountData.length; index++) {
    retweeted += accountData[index]["Number of People Retweeted"];
    liked += accountData[index]["Number of People Liked"];
  }

  const retweetPercent = (retweeted / (retweeted + liked)) * 100;
  const likedPercent = (liked / (retweeted + liked)) * 100;

  const series = [
    ["Retweeted", retweetPercent],
    ["Liked", likedPercent],
  ];

  return series;
};

export const getOffersSentimentsData = (accountNames, year) => {
  let positive = 0;
  let negative = 0;
  let neutral = 0;

  accountNames = structureAccounts(accountNames);

  const accountData = offerData.filter((record) => {
    for (let index = 0; index < accountNames.length; index++) {
      if (
        record.Accounts === accountNames[index] &&
        record["Years (Date)"] === year
      ) {
        return true;
      }
    }
    return false;
  });

  for (let index = 0; index < accountData.length; index++) {
    positive += accountData[index]["Number of Positive People"];
    negative += accountData[index]["Number of Negative People"];
    neutral += accountData[index]["Number of Neutral People"];
  }

  const positivePercent = (positive / (positive + negative + neutral)) * 100;
  const negativePercent = (negative / (positive + negative + neutral)) * 100;
  const neutralPercent = (neutral / (positive + negative + neutral)) * 100;

  const series = [
    {
      name: "Positive",
      y: positivePercent,
      sliced: true,
      selected: true,
      color: "green",
      borderColor: "green",
    },
    { name: "Negative", y: negativePercent, color: "red", borderColor: "red" },
    {
      name: "Neutral",
      y: neutralPercent,
      color: "yellow",
      borderColor: "yellow",
    },
  ];

  return series;
};

export const getComplaintAnalysisData = (accountNames, year) => {
  let complaintsData = [];

  accountNames = structureAccounts(accountNames);

  const categories = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const accountData = data.filter((record) => {
    for (let index = 0; index < accountNames.length; index++) {
      if (
        record.Accounts === accountNames[index] &&
        record["Years (Date)"] === year
      ) {
        return true;
      }
    }
    return false;
  });

  for (let index = 0; index < categories.length; index++) {
    const filteredData = accountData.filter(
      (record) => record["Months (Date)"] === categories[index]
    );
    complaintsData.push(
      filterData(filteredData, "Number of Complaints") /
        (filterData(filteredData, "Negative Users") +
          filterData(filteredData, "Positive Users") +
          filterData(filteredData, "Neutral Users"))
    );
  }

  return complaintsData;
};

export const getPredictionsData = (accountNames, year) => {
  let positive = [];
  let negative = [];
  let neutral = [];

  accountNames = structureAccounts(accountNames);

  const accountData = offerData.filter((record) => {
    for (let index = 0; index < accountNames.length; index++) {
      if (
        record.Accounts === accountNames[index] &&
        record["Years (Date)"] === year
      ) {
        return true;
      }
    }
    return false;
  });

  for (let index = 0; index < accountData.length; index++) {
    positive.push(accountData[index]["Number of Positive Predictions"]);
    negative.push(accountData[index]["Number of Negative Predictions"]);
    neutral.push(accountData[index]["Number of Neutral Predictions"]);
  }
  
  const series = [
    { name: "Positive", data: positive, color: "green", borderColor: "green" },
    { name: "Negative", data: negative, color: "red", borderColor: "red" },
    { name: "Neutral", data: neutral, color: "yellow", borderColor: "yellow" },
  ];

  return series;
};

export const getSoftwareUpdateData = (accountNames, year) => {
  const initialValue = [...accountNames];

  let positive = 0;
  let negative = 0;
  let neutral = 0;

  const releaseCheck = accountNames.filter((rec) => rec.includes("Release"));
  if (releaseCheck.length < 1) {
    accountNames = [
      "Release-1",
      "Release-2",
      "Release-3",
      "Release-4",
      "Release-5",
    ];
  }
  const accountData = softwareData.filter((record) => {
    for (let index = 0; index < accountNames.length; index++) {
      if (
        record.Release === accountNames[index] &&
        record["Years (Date)"] === year
      ) {
        return true;
      }
    }
    return false;
  });

  for (let index = 0; index < accountData.length; index++) {
    if (
      initialValue.includes("Hashtag") &&
      !initialValue.includes("Mentions")
    ) {
      positive += accountData[index]["Number of Positive Hashtag Tweets"];
      negative += accountData[index]["Number of Negative Hashtag Tweets"];
      neutral += accountData[index]["Number of Neutral Hashtag Tweets"];
    } else if (
      !initialValue.includes("Hashtag") &&
      initialValue.includes("Mentions")
    ) {
      positive += accountData[index]["Number of Positive Mention Tweets"];
      negative += accountData[index]["Number of Negative Mention Tweets"];
      neutral += accountData[index]["Number of Neutral Mention Tweets"];
    } else {
      positive += accountData[index]["Number of Positive Hashtag Tweets"];
      positive += accountData[index]["Number of Positive Mention Tweets"];
      negative += accountData[index]["Number of Negative Hashtag Tweets"];
      negative += accountData[index]["Number of Negative Mention Tweets"];
      neutral += accountData[index]["Number of Neutral Hashtag Tweets"];
      neutral += accountData[index]["Number of Neutral Mention Tweets"];
    }
  }

  return [
    { name: "Positive", y: positive },
    { name: "Negative", y: negative },
    { name: "Neutral", y: neutral },
  ];
};
