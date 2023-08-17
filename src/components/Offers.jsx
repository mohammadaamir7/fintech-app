import React, { useEffect, useState } from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts/highstock";
import { getOffersSentimentsData, getOffersTweetsData } from "../queries";
import { Col, Container, Row, Button } from "react-bootstrap";
import "../assets/index.css";
import Checkbox from "./Checkbox";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Drawer from "@mui/material/Drawer";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TuneIcon from "@mui/icons-material/Tune";

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
  const [age, setAge] = useState("Account");
  const [year, setYear] = useState("2019");

  const accounts = ["Bank", "Fintech"];
  const banks = ["Bank1", "bank2", "Bank3"];
  const fintechs = ["Fintech4", "Fintech5"];

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

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
      return [...prev, e.target.value];
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
        color: "#ffffff",
      },
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
    colors: ["#1DA1F2", "#657786"],
    series: [
      {
        type: "pie",
        name: "Likes and Retweets",
        innerSize: "70%",
        data: tweetSeries,
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
      type: "pie",
      backgroundColor: "rgba(192, 192, 192, 0.2)",
      borderRadius: 10,
    },
    title: {
      text: "Sentiments",
      align: "left",
      style: {
        color: "#ffffff",
      },
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
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: true,
          format: "<b>{point.name}</b>: {point.percentage:.1f} %",
          color: "#ffffff",
        },
      },
    },
    series: [
      {
        name: "Brands",
        colorByPoint: true,
        data: likeSeries,
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

  return (
    <>
      <Container fluid>
        <Row className="menu-back">
          <Col>
            <div className="drawer-div">
              {["left"].map((anchor) => (
                <React.Fragment key={anchor}>
                  <Button
                    className="filter-btn"
                    onClick={toggleDrawer(anchor, true)}
                  >
                    <TuneIcon />
                  </Button>
                  <span className="filter-span">Filters</span>
                  <Drawer
                    anchor={anchor}
                    open={state[anchor]}
                    onClose={toggleDrawer(anchor, false)}
                    sx={{
                      width: "350px",
                    }}
                  >
                    <div className="categories-list-small drawer">
                      <Accordion className="accordian-size">
                        <AccordionSummary
                          className="accordian-header"
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1a-content"
                          id="panel1a-header"
                        >
                          <Typography className="accordian-title">
                            Classes
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails className="accordian-body">
                          <div className="checkbox-small">
                            <Checkbox
                              data={accounts}
                              title={""}
                              filters={filters}
                              setFilters={setFilters}
                            />
                          </div>
                        </AccordionDetails>
                      </Accordion>
                      <h1 className="type-title">Accounts</h1>
                      <Select
                        value={age}
                        onChange={handleChange}
                        displayEmpty
                        inputProps={{ "aria-label": "Without label" }}
                        sx={{
                          m: 1,
                          minWidth: 150,
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
                        onChange={(e) => setYear(e.target.value)}
                        displayEmpty
                        inputProps={{ "aria-label": "Without label" }}
                        sx={{
                          m: 1,
                          minWidth: 150,
                          color: "#ffffff",
                          border: "1px solid #ffffff",
                        }}
                      >
                        {[...years].map((account) => (
                          <MenuItem value={account}>{account}</MenuItem>
                        ))}
                      </Select>
                    </div>
                  </Drawer>
                </React.Fragment>
              ))}
            </div>
          </Col>
        </Row>
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
                minWidth: 150,
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
              onChange={(e) => setYear(e.target.value)}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              sx={{
                m: 1,
                minWidth: 150,
                color: "#ffffff",
                border: "1px solid #ffffff",
              }}
            >
              {[...years].map((account) => (
                <MenuItem value={account}>{account}</MenuItem>
              ))}
            </Select>
          </Col>
          <Col md={10} className="chart-block-offers">
            <div className="title-head sx-margin">
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
