import React, { useEffect, useState } from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts/highstock";
import {
  getLikesData,
  getPositiveMentionUserData,
  getReTweetsData,
  getTweetCategoryData,
  getTweetsAnalysis,
  getTweetsData,
} from "../queries";
import {  Button, Col, Container, Row } from "react-bootstrap";
import "../assets/index.css";
import Checkbox from "./Checkbox";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Drawer from '@mui/material/Drawer';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TuneIcon from '@mui/icons-material/Tune';

require("highcharts/indicators/indicators")(Highcharts);
require("highcharts/indicators/pivot-points")(Highcharts);
require("highcharts/indicators/macd")(Highcharts);
require("highcharts/modules/exporting")(Highcharts);
require("highcharts/modules/drilldown")(Highcharts);
require("highcharts/modules/accessibility")(Highcharts);
require("highcharts/modules/export-data")(Highcharts);
require("highcharts/modules/map")(Highcharts);

const Chart = () => {
  const accounts = ["Bank", "Fintech"];
  const sentiments = ["Positive", "Negative", "Neutral/Queries"];
  const categories = ["Hashtag", "Mentions"];
  const banks = ["Bank1", "bank2", "Bank3"];
  const fintechs = ["Fintech4", "Fintech5"];
  const years = ["2019", "2020", "2021", "2022", "2023"];
  const dates = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30,
  ];
  const months = [
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

  const itemsPerPage = 12;

  const [filters, setFilters] = useState([]);
  const [tweetSeries, setTweetSeries] = useState([]);
  const [likeSeries, setLikeSeries] = useState([]);
  const [retweetSeries, setRetweetSeries] = useState([]);
  const [tweetCategirySeries, setTweetCategirySeries] = useState([]);
  const [tweetAnalysis, setTweetAnalysis] = useState([]);
  const [mentionPositiveUserSeries, setMentionPositiveUserSeries] = useState(
    []
  );
  const [age, setAge] = useState('Account');
  const [year, setYear] = useState('2019');
  const [month, setMonth] = useState('month');
  const [startDate, setStartDate] = useState(1);
  const [endDate, setEndDate] = useState(30);
  const [currentPage, setCurrentPage] = useState(0);

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };


  const totalPages = Math.ceil((endDate - startDate + 1) / itemsPerPage);

  const handlePrevious = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  const handleNext = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages - 1));
  };


  const modifyData = (data) => {
    for (let index = 0; index < data.length; index++) {
      if(data[index] == 0){
        data[index] = null;
      } 
    }

    return data
  }

  const sliceData = (data) => {
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const subsetData = []

    for (let index = 0; index < data.length; index++) {
      subsetData.push({
        name: data[index].name,
        data: modifyData(data[index].data.slice(startIndex, endIndex)),
        color: data[index].color
      });
    }

    return subsetData
  } 

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

  useEffect(() => {
    setTweetSeries(sliceData(getTweetsData(filters, year, month, startDate, endDate)));
    setLikeSeries(sliceData(getLikesData(filters, year, month, startDate, endDate)));
    setRetweetSeries(sliceData(getReTweetsData(filters, year, month, startDate, endDate)));
    setTweetCategirySeries(sliceData(getTweetCategoryData(filters, year, month, startDate, endDate)));
    setMentionPositiveUserSeries(sliceData(getPositiveMentionUserData(filters, year, month, startDate, endDate)));
    setTweetAnalysis(sliceData(getTweetsAnalysis(filters, year, month, startDate, endDate)));
  }, [filters, year, month, startDate, endDate, currentPage]);

  const tweetChartOptions = {
    chart: {
      backgroundColor: 'rgba(192, 192, 192, 0.2)',
      borderRadius: 10
    },
    title: {
      text: "Tweets",
      align: "left",
      style: {
        color: "#ffffff"
      }
    },

    yAxis: {
      title: {
        text: "",
      },
      gridLineWidth: 0,
      labels: {
        enabled: true,
        style: {
          color: "#ffffff"
        }
      },
      tickLength: 0,
    },

    xAxis: {
      lineColor: "white",
      labels: {
        enabled: true,
        style: {
          color: "#ffffff"
        }
      },
      tickLength: 0,
      categories: month !== "month" ? dates : months,
      accessibility: {
        description: "Months of the year",
      },
    },

    legend: {
      layout: "vertical",
      align: "right",
      verticalAlign: "middle",
      itemStyle: {
        color: '#ffffff',
      },
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

  const tweetAnalysisChartOptions = {
    chart: {
      backgroundColor: 'rgba(192, 192, 192, 0.2)',
      borderRadius: 10
    },
    title: {
      text: "Tweets",
      align: "left",
      style: {
        color: "#ffffff"
      }
    },

    yAxis: {
      title: {
        text: "",
      },
      gridLineWidth: 0,
      labels: {
        enabled: true,
        style: {
          color: "#ffffff"
        }
      },
      tickLength: 0,
    },

    xAxis: {
      lineColor: "white",
      labels: {
        enabled: true,
        style: {
          color: "#ffffff"
        }
      },
      tickLength: 0,
      categories: month !== "month" ? dates : months,
      accessibility: {
        description: "Months of the year",
      },
    },

    legend: {
      layout: "vertical",
      align: "right",
      verticalAlign: "middle",
      itemStyle: {
        color: '#ffffff',
      },
    },

    plotOptions: {
      series: {
        label: {
          connectorAllowed: false,
        },
      },
    },

    series: tweetAnalysis,

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
      backgroundColor: 'rgba(192, 192, 192, 0.2)',
      borderRadius: 10
    },
    title: {
      text: "Likes",
      align: "left",
      style: {
        color: "#ffffff"
      }
    },

    yAxis: {
      title: {
        text: "",
      },
      gridLineWidth: 0,
      labels: {
        enabled: true,
        style: {
          color: "#ffffff"
        }
      },
      tickLength: 0,
    },

    xAxis: {
      lineColor: "white",
      labels: {
        enabled: true,
        style: {
          color: "#ffffff"
        }
      },
      tickLength: 0,
      categories: month !== "month" ? dates : months,
      accessibility: {
        description: "Months of the year",
      },
    },

    legend: {
      layout: "vertical",
      align: "right",
      verticalAlign: "middle",
      itemStyle: {
        color: '#ffffff',
      },
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
    chart: {
      backgroundColor: 'rgba(192, 192, 192, 0.2)',
      borderRadius: 10
    },
    title: {
      text: "Retweets",
      align: "left",
      style: {
        color: "#ffffff"
      }
    },

    yAxis: {
      title: {
        text: "",
      },
      labels: {
        enabled: true,
        style: {
          color: "#ffffff"
        }
      },
      tickLength: 0,
      gridLineWidth: 0,
    },

    xAxis: {
      labels: {
        enabled: true,
        style: {
          color: "#ffffff"
        }
      },
      tickLength: 0,
      lineColor: "white",
      categories: month !== "month" ? dates : months,
      accessibility: {
        description: "Months of the year",
      },
    },

    legend: {
      layout: "vertical",
      align: "right",
      verticalAlign: "middle",
      itemStyle: {
        color: '#ffffff',
      },
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
      backgroundColor: "rgba(192, 192, 192, 0.2)",
      borderRadius: 10,
    },

    title: {
      text: "Tweet Category",
      align: "left",
      style: {
        color: "#ffffff"
      }
    },

    credits: {
      enabled: false,
    },
    xAxis: {
      labels: {
        enabled: true,
        style: {
          color: "#ffffff"
        }
      },
      tickLength: 0,
      lineColor: "white",
      categories: month !== "month" ? dates : months,
    },
    yAxis: {
      title: {
        text: "",
      },
      labels: {
        enabled: true,
        style: {
          color: "#ffffff"
        }
      },
      tickLength: 0,
      min: 0,
    },
    legend: {
      reversed: true,
      itemStyle: {
        color: '#ffffff',
      },
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
        colors: ["green", "red", "grey"], // Define custom colors
      },
      column: {
        dataLabels: {
          enabled: false, // Disable the data labels
        }
      }
    },
    series: tweetCategirySeries,
  };

  const mentionCategoryBar = {
    chart: {
      type: "bar",
      backgroundColor: "rgba(192, 192, 192, 0.2)",
      borderRadius: 10,
    },

    title: {
      text: "Users",
      align: "left",
      style: {
        color: "#ffffff"
      }
    },

    credits: {
      enabled: false,
    },

    xAxis: {
      labels: {
        enabled: true,
        style: {
          color: "#ffffff"
        }
      },
      tickLength: 0,
      lineColor: "white",
      categories: month !== "month" ? dates : months,
    },
    yAxis: {
      title: {
        text: "",
      },
      labels: {
        enabled: true,
        style: {
          color: "#ffffff"
        }
      },
      tickLength: 0,
      min: 0,
    },
    legend: {
      reversed: true,
      itemStyle: {
        color: '#ffffff',
      },
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
      bar: {
        dataLabels: {
          enabled: false, // Disable the data labels
        }
      }
    },
    series: mentionPositiveUserSeries,
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
                    <div className="categories-list-small extra-length-drawer">
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
                      <Accordion>
                        <AccordionSummary
                          className="accordian-header"
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1a-content"
                          id="panel1a-header"
                        >
                          <Typography className="accordian-title">
                            Categories
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails className="accordian-body">
                          <div className="checkbox-small">
                            <Checkbox
                              data={categories}
                              title={""}
                              filters={filters}
                              setFilters={setFilters}
                            />
                          </div>
                        </AccordionDetails>
                      </Accordion>
                      <Accordion>
                        <AccordionSummary
                          className="accordian-header"
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1a-content"
                          id="panel1a-header"
                        >
                          <Typography className="accordian-title">
                            Sentiments
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails className="accordian-body">
                          <div className="checkbox-small">
                            <Checkbox
                              data={sentiments}
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
                      <h1 className="type-title">Month</h1>
                      <Select
                        value={month}
                        onChange={(e) => setMonth(e.target.value)}
                        displayEmpty
                        inputProps={{ "aria-label": "Without label" }}
                        sx={{
                          m: 1,
                          minWidth: 150,
                          color: "#ffffff",
                          border: "1px solid #ffffff",
                        }}
                      >
                        {["month", ...months].map((account) => (
                          <MenuItem value={account}>{account}</MenuItem>
                        ))}
                      </Select>
                      <h1 className="type-title">Start Date</h1>
                      <Select
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        displayEmpty
                        inputProps={{ "aria-label": "Without label" }}
                        disabled={month === "month"}
                        sx={{
                          m: 1,
                          minWidth: 150,
                          color: "#ffffff",
                          border: "1px solid #ffffff",
                        }}
                      >
                        {["startDate", ...dates].map((account) => (
                          <MenuItem value={account}>{account}</MenuItem>
                        ))}
                      </Select>
                      <h1 className="type-title">End Date</h1>
                      <Select
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        displayEmpty
                        inputProps={{ "aria-label": "Without label" }}
                        disabled={month === "month"}
                        sx={{
                          m: 1,
                          minWidth: 150,
                          color: "#ffffff",
                          border: "1px solid #ffffff",
                          marginBottom: "50px",
                        }}
                      >
                        {["endDate", ...dates].map((account) => (
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
            <h1 className="type-title">Month</h1>
            <Select
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              sx={{
                m: 1,
                minWidth: 150,
                color: "#ffffff",
                border: "1px solid #ffffff",
              }}
            >
              {["month", ...months].map((account) => (
                <MenuItem value={account}>{account}</MenuItem>
              ))}
            </Select>
            <h1 className="type-title">Start Date</h1>
            <Select
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              disabled={month === "month"}
              sx={{
                m: 1,
                minWidth: 150,
                color: "#ffffff",
                border: "1px solid #ffffff",
              }}
            >
              {["startDate", ...dates].map((account) => (
                <MenuItem value={account}>{account}</MenuItem>
              ))}
            </Select>
            <h1 className="type-title">End Date</h1>
            <Select
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              disabled={month === "month"}
              sx={{
                m: 1,
                minWidth: 150,
                color: "#ffffff",
                border: "1px solid #ffffff",
              }}
            >
              {["endDate", ...dates].map((account) => (
                <MenuItem value={account}>{account}</MenuItem>
              ))}
            </Select>
          </Col>
          <Col md={10} className="chart-block">
            <div className="title-head sx-margin">
              <h1>Tweets</h1>
            </div>
            <Row>
              <Col md={4} className="chart-column">
                <HighchartsReact
                  highcharts={Highcharts}
                  constructorType={"chart"}
                  options={tweetAnalysisChartOptions}
                  updateArgs={[true, true, true]}
                />
              </Col>
              <Col md={4} className="chart-column">
                <HighchartsReact
                  highcharts={Highcharts}
                  constructorType={"chart"}
                  options={tweetChartOptions}
                  updateArgs={[true, true, true]}
                />
              </Col>
              <Col md={4} className="chart-column">
                <HighchartsReact
                  highcharts={Highcharts}
                  constructorType={"chart"}
                  options={likesChartOptions}
                  updateArgs={[true, true, true]}
                />
              </Col>
              <Col md={4} className="chart-column">
                <HighchartsReact
                  highcharts={Highcharts}
                  constructorType={"chart"}
                  options={retweetedChartOptions}
                  updateArgs={[true, true, true]}
                />
              </Col>
              <Col md={4} className="chart-column">
                <HighchartsReact
                  highcharts={Highcharts}
                  constructorType={"chart"}
                  options={mentionCategoryBar}
                  updateArgs={[true, true, true]}
                />
              </Col>
              <Col md={4} className="chart-column">
                <HighchartsReact
                  highcharts={Highcharts}
                  constructorType={"chart"}
                  options={stackbar}
                  updateArgs={[true, true, true]}
                />
              </Col>
            </Row>
            <Button
              onClick={handlePrevious}
              disabled={currentPage === 0 || month === "month"}
              className="pagination-btn"
            >
              Previous
            </Button>
            <Button
              onClick={handleNext}
              disabled={currentPage === totalPages - 1 || month === "month"}
              className="pagination-btn"
            >
              Next
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Chart;
