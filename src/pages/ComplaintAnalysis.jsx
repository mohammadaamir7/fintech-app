import React, { useEffect, useState } from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts/highstock";
import {
  getComplaintAnalysisData,
} from "../queries";
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

const ComplaintAnalysis = () => {
  const [filters, setFilters] = useState([]);
  const [complaintAnalysisSeries, setComplaintAnalysisSeries] = useState([]);
  const [age, setAge] = useState('Account');

  const accounts = ["Bank", "Fintech"];
  const banks = ["Bank1", "bank2", "Bank3"];
  const fintechs = ["Fintech4", "Fintech5"];

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
              {["Account", ...banks, ...fintechs].map((account, index) => (
                <MenuItem value={account}>{account}</MenuItem>
              ))}
            </Select>
          </Col>
          <Col md={10} className="chart-block-offers">
            <div className="title-head">
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
