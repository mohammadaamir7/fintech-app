import React, { useEffect, useState } from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts, { color } from "highcharts/highstock";
import { getSoftwareUpdateData } from "../queries";
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

const SoftwareUpdate = () => {
  const [filters, setFilters] = useState([]);
  const [softwareUpdateSeries, setSoftwareUpdateSeries] = useState([]);
  const [year, setYear] = useState("2019");

  const accounts = [
    "Release-1",
    "Release-2",
    "Release-3",
    "Release-4",
    "Release-5",
  ];
  const categories = ["Hashtag", "Mentions"];
  const years = ["2019", "2020", "2021", "2022", "2023"];

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
    setSoftwareUpdateSeries(getSoftwareUpdateData(filters, year));
  }, [filters, year]);

  const tweetChartOptions = {
    chart: {
      backgroundColor: "rgba(192, 192, 192, 0.2)",
      borderRadius: 10,
    },
    title: {
      text: "Tweets trends about Software Update",
      align: "left",
      style: {
        color: "#ffffff",
      },
    },

    legend: {
      enabled: true,
    },

    tooltip: {
      valueDecimals: 0,
      valueSuffix: "",
    },

    plotOptions: {
      series: {
        borderWidth: 0,
        colorByPoint: true,
        type: "pie",
        size: "100%",
        innerSize: "80%",
        dataLabels: {
          enabled: true,
          crop: false,
          distance: "-10%",
          style: {
            fontWeight: "bold",
            fontSize: "16px",
            color: "#ffffff",
          },
          connectorWidth: 0,
        },
      },
    },
    colors: ["green", "red", "yellow"],
    series: [
      {
        type: "pie",
        // name: startYear,
        data: softwareUpdateSeries,
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
                            Releases
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
                      <Accordion className="accordian-size">
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
                      <h1 className="type-title">Accounts</h1>
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
              title={"Releases"}
              filters={filters}
              setFilters={setFilters}
            />
            <Checkbox
              data={categories}
              title={"Categories"}
              filters={filters}
              setFilters={setFilters}
            />
            <h1 className="type-title">Year</h1>
            <Select
              value={year}
              onChange={(e) => setYear(e.target.value)}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              sx={{
                m: 1,
                minWidth: 200,
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
              <h1>Software Update</h1>
            </div>
            <Row>
              <Col md={12} className="chart-column">
                <HighchartsReact
                  highcharts={Highcharts}
                  constructorType={"chart"}
                  options={tweetChartOptions}
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

export default SoftwareUpdate;
