import React from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts/highstock";
import {
  getAccountData,
  getHashtagTweetCategoryData,
  getLikesData,
  getMentionTweetCategoryData,
  getPositiveHashtagUserData,
  getPositiveMentionUserData,
  getReTweetsData,
  getTweetCategoryData,
  getTweetsData,
} from "../queries";

require("highcharts/indicators/indicators")(Highcharts);
require("highcharts/indicators/pivot-points")(Highcharts);
require("highcharts/indicators/macd")(Highcharts);
require("highcharts/modules/exporting")(Highcharts);
require("highcharts/modules/drilldown")(Highcharts);
require("highcharts/modules/accessibility")(Highcharts);
require("highcharts/modules/export-data")(Highcharts);
require("highcharts/modules/map")(Highcharts);

const Chart = () => {
  const tweetSeries = getTweetsData("Bank1", "2019");
  const likeSeries = getLikesData("Bank1", "2019");
  const retweetSeries = getReTweetsData("Bank1", "2019");
  const tweetCategirySeries = getTweetCategoryData("Bank1", "2019");
  const hashtagTweetCategirySeries = getHashtagTweetCategoryData(
    "Bank1",
    "2019"
  );
  const mentionTweetCategirySeries = getMentionTweetCategoryData(
    "Bank1",
    "2019"
  );
  const mentionPositiveUserSeries = getPositiveMentionUserData(
    "Bank1",
    "2019"
  );
  const hashtagPositiveUserSeries = getPositiveHashtagUserData(
    "Bank1",
    "2019"
  );


  const tweetChartOptions = {
    title: {
      text: "Tweets",
      align: "left",
    },

    yAxis: {
      gridLineWidth: 0,
      title: {
        text: "Number of Employees",
      },
    },

    xAxis: {
      gridLineWidth: 0,
      categories: [
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
      ],
      accessibility: {
        description: "Months of the year",
      },
    },

    legend: {
      layout: "vertical",
      align: "right",
      verticalAlign: "middle",
    },

    plotOptions: {
      series: {
        label: {
          connectorAllowed: false,
        },
      },
    },

    series: tweetSeries,

    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500,
          },
          chartOptions: {
            legend: {
              layout: "horizontal",
              align: "center",
              verticalAlign: "bottom",
            },
          },
        },
      ],
    },
  };

  const likesChartOptions = {
    title: {
      text: "Likes",
      align: "left",
    },

    yAxis: {
      gridLineWidth: 0,
      title: {
        text: "Number of Employees",
      },
    },

    xAxis: {
      gridLineWidth: 0,
      categories: [
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
      ],
      accessibility: {
        description: "Months of the year",
      },
    },

    legend: {
      layout: "vertical",
      align: "right",
      verticalAlign: "middle",
    },

    plotOptions: {
      series: {
        label: {
          connectorAllowed: false,
        },
      },
    },

    series: likeSeries,

    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500,
          },
          chartOptions: {
            legend: {
              layout: "horizontal",
              align: "center",
              verticalAlign: "bottom",
            },
          },
        },
      ],
    },
  };

  const retweetedChartOptions = {
    title: {
      text: "Retweets",
      align: "left",
    },

    yAxis: {
      gridLineWidth: 0,
      title: {
        text: "Number of Employees",
      },
    },

    xAxis: {
      gridLineWidth: 0,
      categories: [
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
      ],
      accessibility: {
        description: "Months of the year",
      },
    },

    legend: {
      layout: "vertical",
      align: "right",
      verticalAlign: "middle",
    },

    plotOptions: {
      series: {
        label: {
          connectorAllowed: false,
        },
      },
    },

    series: retweetSeries,

    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500,
          },
          chartOptions: {
            legend: {
              layout: "horizontal",
              align: "center",
              verticalAlign: "bottom",
            },
          },
        },
      ],
    },
  };

  const stackbar = {
    chart: {
      type: "column",
    },

    title: {
      text: "Tweet Category",
      align: "left",
    },

    credits: {
      enabled: false,
    },

    xAxis: {
      categories: [
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
      ],
    },
    yAxis: {
      min: 0,
      title: {
        text: "Goals",
      },
    },
    legend: {
      reversed: true,
    },
    plotOptions: {
      series: {
        // stacking: "normal",
        borderRadius: "25%",
        dataLabels: {
          enabled: true,
        },
        pointWidth: 15,
        pointPadding: 0.2,
      },
    },
    series: tweetCategirySeries,
  };

  const hashtagBar = {
    chart: {
      type: "column",
    },

    title: {
      text: "Hashtags",
      align: "left",
    },

    credits: {
      enabled: false,
    },

    xAxis: {
      categories: [
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
      ],
    },
    yAxis: {
      min: 0,
      title: {
        text: "Goals",
      },
    },
    legend: {
      reversed: true,
    },
    plotOptions: {
      series: {
        // stacking: "normal",
        borderRadius: "25%",
        dataLabels: {
          enabled: true,
        },
        pointWidth: 15,
        pointPadding: 0.2,
      },
    },
    series: hashtagTweetCategirySeries,
  };

  const mentionBar = {
    chart: {
      type: "column",
    },

    title: {
      text: "Mentions",
      align: "left",
    },

    credits: {
      enabled: false,
    },

    xAxis: {
      categories: [
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
      ],
    },
    yAxis: {
      min: 0,
      title: {
        text: "Goals",
      },
    },
    legend: {
      reversed: true,
    },
    plotOptions: {
      series: {
        // stacking: "normal",
        borderRadius: "25%",
        dataLabels: {
          enabled: true,
        },
        pointWidth: 15,
        pointPadding: 0.2,
      },
    },
    series: mentionTweetCategirySeries,
  };

  const mentionCategoryBar = {
    chart: {
      type: "bar",
    },

    title: {
      text: "Mentions Users",
      align: "left",
    },

    credits: {
      enabled: false,
    },

    xAxis: {
      categories: [
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
      ],
    },
    yAxis: {
      min: 0,
      title: {
        text: "Goals",
      },
    },
    legend: {
      reversed: true,
    },
    plotOptions: {
      series: {
        stacking: "percent",
        borderRadius: "25%",
        dataLabels: {
          enabled: true,
        },
        pointWidth: 15,
        pointPadding: 0.2,
      },
    },
    series: mentionPositiveUserSeries,
  };

  const hashtagCategoryBar = {
    chart: {
      type: "bar",
    },

    title: {
      text: "Hashtag Users",
      align: "left",
    },

    credits: {
      enabled: false,
    },

    xAxis: {
      categories: [
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
      ],
    },
    yAxis: {
      min: 0,
      title: {
        text: "Goals",
      },
    },
    legend: {
      reversed: true,
    },
    plotOptions: {
      series: {
        stacking: "percent",
        borderRadius: "25%",
        dataLabels: {
          enabled: true,
        },
        pointWidth: 15,
        pointPadding: 0.2,
      },
    },
    series: hashtagPositiveUserSeries,
  };

  return (
    <>
      <HighchartsReact
        highcharts={Highcharts}
        constructorType={"chart"}
        options={tweetChartOptions}
        updateArgs={[true, true, true]}
      />

      <HighchartsReact
        highcharts={Highcharts}
        constructorType={"chart"}
        options={likesChartOptions}
        updateArgs={[true, true, true]}
      />

      <HighchartsReact
        highcharts={Highcharts}
        constructorType={"chart"}
        options={retweetedChartOptions}
        updateArgs={[true, true, true]}
      />

      <HighchartsReact
        highcharts={Highcharts}
        constructorType={"chart"}
        options={stackbar}
        updateArgs={[true, true, true]}
      />

      <HighchartsReact
        highcharts={Highcharts}
        constructorType={"chart"}
        options={hashtagBar}
        updateArgs={[true, true, true]}
      />

      <HighchartsReact
        highcharts={Highcharts}
        constructorType={"chart"}
        options={mentionBar}
        updateArgs={[true, true, true]}
      />

      <HighchartsReact
        highcharts={Highcharts}
        constructorType={"chart"}
        options={mentionCategoryBar}
        updateArgs={[true, true, true]}
      />

      <HighchartsReact
        highcharts={Highcharts}
        constructorType={"chart"}
        options={hashtagCategoryBar}
        updateArgs={[true, true, true]}
      />
    </>
  );
};

export default Chart;
