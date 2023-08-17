import React, { useEffect, useState } from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts/highstock";
import { getComplaintAnalysisData } from "../queries";
import { Col, Container, Row, Button } from "react-bootstrap";
import "../assets/index.css";
import Checkbox from "../components/Checkbox";
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

const ComplaintAnalysis = () => {
  const [filters, setFilters] = useState([]);
  const [complaintAnalysisSeries, setComplaintAnalysisSeries] = useState([]);
  const [age, setAge] = useState("Account");

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

  useEffect(() => {
    setComplaintAnalysisSeries(getComplaintAnalysisData(filters, "2019"));
  }, [filters]);

  const complaintsChartOptions = {
    chart: {
      zoomType: "x",
      backgroundColor: "rgba(192, 192, 192, 0.2)",
      borderRadius: 10,
    },
    title: {
      text: "Complaint Analysis",
      align: "left",
      style: {
        color: "#ffffff",
      },
    },
    xAxis: {
      type: "datetime",
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
      labels: {
        enabled: true,
        style: {
          color: "#ffffff",
        },
      },
    },
    yAxis: {
      title: {
        text: "",
      },
      labels: {
        enabled: true,
        style: {
          color: "#ffffff",
        },
      },
    },
    legend: {
      enabled: false,
    },
    plotOptions: {
      area: {
        fillColor: {
          linearGradient: {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
          },
          stops: [
            [0, Highcharts.getOptions().colors[7]],
            [
              1,
              Highcharts.color(Highcharts.getOptions().colors[7])
                .setOpacity(0)
                .get("rgba"),
            ],
          ],
        },
        marker: {
          radius: 2,
        },
        lineWidth: 1,
        states: {
          hover: {
            lineWidth: 1,
          },
        },
        threshold: null,
      },
    },

    series: [
      {
        type: "area",
        name: "Complaint Rate",
        data: complaintAnalysisSeries,
      },
    ],
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
              {["Account", ...banks, ...fintechs].map((account, index) => (
                <MenuItem value={account}>{account}</MenuItem>
              ))}
            </Select>
          </Col>
          <Col md={10} className="chart-block-offers">
            <div className="title-head sx-margin">
              <h1>Complaint Analysis</h1>
            </div>
            <Row>
              <Col md={12} className="chart-column">
                <HighchartsReact
                  highcharts={Highcharts}
                  constructorType={"chart"}
                  options={complaintsChartOptions}
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

export default ComplaintAnalysis;
