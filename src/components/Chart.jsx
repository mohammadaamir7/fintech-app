import React, { useEffect, useState } from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts/highstock";
import {
  getLikesData,
  getPositiveMentionUserData,
  getReTweetsData,
  getTweetCategoryData,
  getTweetsData,
} from "../queries";
import { Col, Container, Row } from "react-bootstrap";
import "../assets/style.css";
import Checkbox from "./Checkbox";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useNavigate } from "react-router";

require("highcharts/indicators/indicators")(Highcharts);
require("highcharts/indicators/pivot-points")(Highcharts);
require("highcharts/indicators/macd")(Highcharts);
require("highcharts/modules/exporting")(Highcharts);
require("highcharts/modules/drilldown")(Highcharts);
require("highcharts/modules/accessibility")(Highcharts);
require("highcharts/modules/export-data")(Highcharts);
require("highcharts/modules/map")(Highcharts);

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const Chart = () => {
  const [filters, setFilters] = useState([]);
  const [tweetSeries, setTweetSeries] = useState([]);
  const [likeSeries, setLikeSeries] = useState([]);
  const [retweetSeries, setRetweetSeries] = useState([]);
  const [tweetCategirySeries, setTweetCategirySeries] = useState([]);
  const [mentionPositiveUserSeries, setMentionPositiveUserSeries] = useState(
    []
  );
  const navigate = useNavigate();
  const accounts = ["Bank", "Fintech"];
  const sentiments = ["Positive", "Negative", "Neutral/Queries"];
  const categories = ["Hashtag", "Mentions"];
  const banks = ["Bank1", "bank2", "Bank3"];
  const fintechs = ["Fintech4", "Fintech5"];

  useEffect(() => {
    setTweetSeries(getTweetsData(filters, "2019"));
    setLikeSeries(getLikesData(filters, "2019"));
    setRetweetSeries(getReTweetsData(filters, "2019"));
    setTweetCategirySeries(getTweetCategoryData(filters, "2019"));
    setMentionPositiveUserSeries(getPositiveMentionUserData(filters, "2019"));
  }, [filters]);

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    console.log("newValue : ", newValue);
    setValue(newValue);
    if (newValue == 1) {
      navigate("/offers");
    } else if(newValue == 0){
      navigate("/");
    }
  };

  const tweetChartOptions = {
    title: {
      text: "Tweets",
      align: "left",
    },

    yAxis: {
      title: {
        text: "",
      },
      gridLineWidth: 0,
      labels: {
        enabled: false,
      },
      tickLength: 0,
    },

    xAxis: {
      lineColor: "white",
      labels: {
        enabled: false,
      },
      tickLength: 0,
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
      title: {
        text: "",
      },
      gridLineWidth: 0,
      labels: {
        enabled: false,
      },
      tickLength: 0,
    },

    xAxis: {
      lineColor: "white",
      labels: {
        enabled: false,
      },
      tickLength: 0,
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
      title: {
        text: "",
      },
      labels: {
        enabled: false,
      },
      tickLength: 0,
      gridLineWidth: 0,
    },

    xAxis: {
      labels: {
        enabled: false,
      },
      tickLength: 0,
      lineColor: "white",
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
      labels: {
        enabled: false,
      },
      tickLength: 0,
      lineColor: "white",
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
      title: {
        text: "",
      },
      labels: {
        enabled: false,
      },
      tickLength: 0,
      min: 0,
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
      bar: {
        colorByPoint: true, // Enable color per point
        colors: ['green', 'red', 'grey'] // Define custom colors
      }
    },
    series: tweetCategirySeries,
  };

  const mentionCategoryBar = {
    chart: {
      type: "bar",
    },

    title: {
      text: "Users",
      align: "left",
    },

    credits: {
      enabled: false,
    },

    xAxis: {
      labels: {
        enabled: false,
      },
      tickLength: 0,
      lineColor: "white",
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
      title: {
        text: "",
      },
      labels: {
        enabled: false,
      },
      tickLength: 0,
      min: 0,
    },
    legend: {
      reversed: true,
    },
    plotOptions: {
      series: {
        stacking: "percent",
        borderRadius: "75%",
        dataLabels: {
          enabled: true,
        },
        pointWidth: 15,
        pointPadding: 0.2,
      },
    },
    series: mentionPositiveUserSeries,
  };

  return (
    <>
      <Container fluid>
        <Row>
          <Col md={2}>
            <Box sx={{ width: "100%" }}>
              <Box
                sx={{ borderBottom: 1, borderColor: "divider" }}
                justifyContent="center"
                alignItems="center"
                display="flex"
              >
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                >
                  <Tab label="Tweets" {...a11yProps(0)} />
                  <Tab label="Offers" {...a11yProps(1)} />
                </Tabs>
              </Box>
            </Box>
            <Checkbox
              data={accounts}
              title={"Classes"}
              filters={filters}
              setFilters={setFilters}
            />
            <Checkbox
              data={[...banks, ...fintechs]}
              title={"Accounts"}
              filters={filters}
              setFilters={setFilters}
            />
            <Checkbox
              data={categories}
              title={"Categories"}
              filters={filters}
              setFilters={setFilters}
            />
            <Checkbox
              data={sentiments}
              title={"Sentiments"}
              filters={filters}
              setFilters={setFilters}
            />
          </Col>
          <Col md={10} className="chart-block">
            <div className="title-head">
              <h1>Tweets</h1>
            </div>
            <Row>
              <Col md={3} className="chart-column">
                <HighchartsReact
                  highcharts={Highcharts}
                  constructorType={"chart"}
                  options={tweetChartOptions}
                  updateArgs={[true, true, true]}
                />
              </Col>
              <Col md={3} className="chart-column">
                <HighchartsReact
                  highcharts={Highcharts}
                  constructorType={"chart"}
                  options={likesChartOptions}
                  updateArgs={[true, true, true]}
                />
              </Col>
              <Col md={3} className="chart-column">
                <HighchartsReact
                  highcharts={Highcharts}
                  constructorType={"chart"}
                  options={retweetedChartOptions}
                  updateArgs={[true, true, true]}
                />
              </Col>
              <Col md={3} className="chart-column">
                <HighchartsReact
                  highcharts={Highcharts}
                  constructorType={"chart"}
                  options={mentionCategoryBar}
                  updateArgs={[true, true, true]}
                />
              </Col>
              <Col md={12} className="chart-column">
                <HighchartsReact
                  highcharts={Highcharts}
                  constructorType={"chart"}
                  options={stackbar}
                  updateArgs={[true, true, true]}
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Chart;
