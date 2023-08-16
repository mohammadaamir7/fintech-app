import React, { useEffect, useState } from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts/highstock";
import {
  getOffersSentimentsData,
  getOffersTweetsData
} from "../queries";
import { Col, Container, Row } from "react-bootstrap";
import "../assets/index.css";
import Checkbox from "./Checkbox";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

require("highcharts/indicators/indicators")(Highcharts);
require("highcharts/indicators/pivot-points")(Highcharts);
require("highcharts/indicators/macd")(Highcharts);
require("highcharts/modules/exporting")(Highcharts);
require("highcharts/modules/drilldown")(Highcharts);
require("highcharts/modules/accessibility")(Highcharts);
require("highcharts/modules/export-data")(Highcharts);
require("highcharts/modules/map")(Highcharts);


const Offers = () => {
  const [filters, setFilters] = useState([]);
  const [tweetSeries, setTweetSeries] = useState([]);
  const [likeSeries, setLikeSeries] = useState([]);
  const [age, setAge] = useState('Account');
  const [year, setYear] = useState('2019');

  const accounts = ["Bank", "Fintech"];
  const banks = ["Bank1", "bank2", "Bank3"];
  const fintechs = ["Fintech4", "Fintech5"];

  useEffect(() => {
    setTweetSeries(getOffersTweetsData(filters, year));
    setLikeSeries(getOffersSentimentsData(filters, year));
  }, [filters, year]);

  const years = ["2019", "2020", "2021", "2022", "2023"];

  const handleChange = (e) => {
    setAge(e.target.value);
    setFilters((prev) => {
      prev = prev.filter(
        (el) =>
          el.includes("Hashtag") ||
          el.includes("Mentions") ||
          el.includes("Positive") ||
          el.includes("Negative") ||
          el.includes("Neutral/Queries")
      );
      return [...prev, e.target.value]
    });
  };

  const tweetChartOptions = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: 0,
      plotShadow: false,
      backgroundColor: "rgba(192, 192, 192, 0.2)",
      borderRadius: 10,
    },
    title: {
      text: "Likes and Retweets",
      align: "left",
      verticalAlign: "top",
      y: 17,
      style: {
        color: "#ffffff"
      }
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
            color: "#ffffff",
          },
        },
        startAngle: -90,
        endAngle: 90,
        center: ["50%", "75%"],
        size: "110%",
      },
    },
    colors: ['#1DA1F2', '#657786'],
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
      type: 'pie',
      backgroundColor: "rgba(192, 192, 192, 0.2)",
      borderRadius: 10,
  },
  title: {
      text: 'Sentiments',
      align: 'left',
      style: {
        color: "#ffffff"
      }
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
              format: '<b>{point.name}</b>: {point.percentage:.1f} %',
              color: "#ffffff",
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
          <Col md={2} className="categories-list">
            <Checkbox
              data={accounts}
              title={"Classes"}
              filters={filters}
              setFilters={setFilters}
            />
            <h1 className="type-title">Accounts</h1>
            <Select
              value={age}
              onChange={handleChange}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              sx={{
                m: 1,
                minWidth: 200,
                color: "#ffffff",
                border: "1px solid #ffffff",
              }}
            >
              {["Account", ...banks, ...fintechs].map((account) => (
                <MenuItem value={account}>{account}</MenuItem>
              ))}
            </Select>
            <h1 className="type-title">Year</h1>
            <Select
              value={year}
              onChange={e => setYear(e.target.value)}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              sx={{ m: 1, minWidth: 200, color: "#ffffff", border: "1px solid #ffffff" }}
            >
              {[...years].map((account) => <MenuItem value={account}>{account}</MenuItem>)}
            </Select>
          </Col>
          <Col md={10} className="chart-block-offers">
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
