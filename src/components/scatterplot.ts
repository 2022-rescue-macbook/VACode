import * as d3 from "d3";
import { selectedFilter, fetchData } from "../states";

const svg = d3.select("#plot");

const margin = { top: 20, left: 20, right: 20, bottom: 20 };
const width = 600 - margin.left - margin.right;
const height = 600 - margin.top - margin.bottom;

svg.attr("width", width + margin.left + margin.right).attr(
    "height",
    height + margin.top + margin.bottom
);

const xScale = d3
    .scaleLinear()
    .range([0, width])
    .domain([0, d3.max(fetchData, (d) => d.x) as number]);
const yScale = d3
    .scaleLinear()
    .range([height, 0])
    .domain([0, d3.max(fetchData, (d) => d.y) as number]);
const colorScheme = d3
    .scaleOrdinal(d3.schemeCategory10)
    .domain(fetchData.map((d) => d.label));

const xAxis = d3.axisBottom(xScale);
const yAxis = d3.axisLeft(yScale);

svg.append("g").attr("transform", `translate(0, ${height})`).call(xAxis);

svg.append("g").call(yAxis);

svg.append("g")
    .selectAll("dot")
    .data(fetchData)
    .join("circle")
    .attr("cx", (d) => xScale(d.x))
    .attr("cy", (d) => yScale(d.y))
    .attr("r", 1)
    .style("fill", (d) => colorScheme(d.label));
