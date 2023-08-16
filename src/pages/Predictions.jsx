import React, { useEffect, useState } from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts/highstock";
import { getPredictionsData } from "../queries";
import { Col, Container, Row } from "react-bootstrap";
import "../assets/index.css";
import Checkbox from "../components/Checkbox";
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

const Predictions = () => {
  const [filters, setFilters] = useState([]);
  const [predictionsSeries, setPredictionsSeries] = useState([]);
  const [age, setAge] = useState('Account');
  const [year, setYear] = useState('2019');

  const accounts = ["Bank", "Fintech"];
  const banks = ["Bank1", "bank2", "Bank3"];
  const fintechs = ["Fintech4", "Fintech5"];
  const years = ["2019", "2020", "2021", "2022", "2023"];

  useEffect(() => {
    setPredictionsSeries(getPredictionsData(filters, year));
  }, [filters, year]);

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

  const predictionsChartOptions = {
    chart: {
      type: "area",
      backgroundColor: "rgba(192, 192, 192, 0.2)",
      borderRadius: 10,
    },
    title: {
      text: "Predictions",
      align: "left",
      style: {
        color: "#ffffff"
      }
    },
    yAxis: {
      title: {
        useHTML: true,
        text: "",
      },
      labels: {
        enabled: true,
        style: {
          color: "#ffffff"
        }
      },
    },
    xAxis: {
      title: {
        useHTML: true,
        text: "",
      },
      labels: {
        enabled: true,
        style: {
          color: "#ffffff"
        }
      },
    },
    tooltip: {
      shared: true,
      headerFormat:
        '<span style="font-size:12px"><b>{point.key}</b></span><br>',
    },
    plotOptions: {
      series: {
        pointStart: 2012,
      },
      area: {
        stacking: "normal",
        lineColor: "#666666",
        lineWidth: 1,
        marker: {
          lineWidth: 1,
          lineColor: "#666666",
        },
      },
    },
      series: predictionsSeries
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
            {/* <h1 className="type-title">Accounts</h1>
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
              {["Account", ...banks, ...fintechs].map((account, index) => (
                <MenuItem value={account}>{account}</MenuItem>
              ))}
            </Select> */}
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
            <div className="title-head">
              <h1>Predictions</h1>
            </div>
            <Row>
              <Col md={12} className="chart-column">
                <HighchartsReact
                  highcharts={Highcharts}
                  constructorType={"chart"}
                  options={predictionsChartOptions}
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

export default Predictions;
