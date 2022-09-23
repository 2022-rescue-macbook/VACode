import * as d3 from "d3";
import { Controller, Filter } from "../types";
import { renderCode } from "./CodeViewer";
import { unselectLabel } from "./LabelViewer";

const svg = d3.select("#plot");

const margin = { top: 20, left: 30, right: 30, bottom: 20 };
const width = 1000 - margin.left - margin.right;
const height = 1000 - margin.top - margin.bottom;

export const toggleOpacity = (controller: Controller, filter: Filter) => {
    const filteredData = controller.getFilteredData(filter);
    d3.selectAll("#dot")
        .data(controller.data)
        .transition()
        .duration(100)
        .attr("opacity", (d) => {
            if (filteredData.includes(d) || filter.type === "none") {
                return 1;
            }
            return 0.2;
        })
        .attr("r", (d) => {
            if (filteredData.includes(d) && filter.type !== "none") {
                return 10;
            }
            return 6;
        });
};

export const renderPlot = (controller: Controller) => {
    const xScale = d3
        .scaleLinear()
        .range([0, width])
        .domain([
            d3.min(controller.data, (d) => d.x) as number,
            d3.max(controller.data, (d) => d.x) as number,
        ]);
    const yScale = d3
        .scaleLinear()
        .range([height, 0])
        .domain([
            d3.min(controller.data, (d) => d.y) as number,
            d3.max(controller.data, (d) => d.y) as number,
        ]);
    const colorScheme = d3
        .scaleOrdinal(d3.schemeCategory10)
        .domain(controller.getLabels());

    svg.append("rect")
        .attr("width", "100%")
        .attr("height", "100%")
        .attr("fill", "white")
        .on("click", () => {
            unselectLabel();
            renderCode(undefined);
            toggleOpacity(controller, { type: "none" } as Filter);
        });

    svg.append("g")
        .selectAll("#dot")
        .data(controller.data)
        .join("circle")
        .attr("id", "dot")
        .attr("cx", (d) => xScale(d.x) + margin.left)
        .attr("cy", (d) => yScale(d.y) + margin.top)
        .attr("r", 6)
        .style("fill", (d) => colorScheme(`l${d.label}`))
        .on("click", (_, d) => {
            toggleOpacity(controller, { type: "single", id: d.id } as Filter);
            renderCode(d);
        });
};
