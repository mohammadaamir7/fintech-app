import React, { useEffect, useState } from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts/highstock";
import {
  getOffersSentimentsData,
  getOffersTweetsData
} from "../queries";
import { Col, Container, Row } from "react-bootstrap";
import "../assets/style.css";
import Checkbox from "./Checkbox";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
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
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Offers = () => {
  const [filters, setFilters] = useState([]);
  const [tweetSeries, setTweetSeries] = useState([]);
  const [likeSeries, setLikeSeries] = useState([]);

  const navigate = useNavigate();
  const accounts = ["Bank", "Fintech"];
  const banks = ["Bank1", "bank2", "Bank3"];
  const fintechs = ["Fintech4", "Fintech5"];

  useEffect(() => {
    setTweetSeries(getOffersTweetsData(filters));
    setLikeSeries(getOffersSentimentsData(filters));
  }, [filters]);

  const [value, setValue] = useState(1);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (newValue == 1) {
      navigate("/offers");
    } else if (newValue == 0) {
      navigate("/");
    }
  };

  const tweetChartOptions = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: 0,
      plotShadow: false,
    },
    title: {
      text: "Likes and Retweets",
      align: "left",
      verticalAlign: "top",
      y: 17,
    },
    tooltip: {
      pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
    },
    accessibility: {
      point: {
        valueSuffix: "%",
      },
    },
    plotOptions: {
      pie: {
        dataLabels: {
          enabled: true,
          distance: -50,
          style: {
            fontWeight: "bold",
            color: "white",
          },
        },
        startAngle: -90,
        endAngle: 90,
        center: ["50%", "75%"],
        size: "110%",
      },
    },
    series: [
      {
        type: "pie",
        name: "Likes and Retweets",
        innerSize: "70%",
        data: tweetSeries
      },
    ],

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
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie'
  },
  title: {
      text: 'Sentiments',
      align: 'left'
  },
  tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
  },
  accessibility: {
      point: {
          valueSuffix: '%'
      }
  },
  plotOptions: {
      pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
              enabled: true,
              format: '<b>{point.name}</b>: {point.percentage:.1f} %'
          }
      }
  },
  series: [{
      name: 'Brands',
      colorByPoint: true,
      data: likeSeries
  }],

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
          </Col>
          <Col md={10} className="chart-block">
            <div className="title-head">
              <h1>Offers</h1>
            </div>
            <Row>
              <Col md={6} className="chart-column">
                <HighchartsReact
                  highcharts={Highcharts}
                  constructorType={"chart"}
                  options={tweetChartOptions}
                  updateArgs={[true, true, true]}
                />
              </Col>
              <Col md={6} className="chart-column">
                <HighchartsReact
                  highcharts={Highcharts}
                  constructorType={"chart"}
                  options={likesChartOptions}
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

export default Offers;
