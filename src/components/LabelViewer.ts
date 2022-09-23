import * as d3 from "d3";
import { Controller, Filter } from "../types";
import { renderCode } from "./CodeViewer";
import { toggleOpacity } from "./PlotViewer";

const legend = d3.select("#label").append("g");
const margin = { top: 20, left: 30, right: 30, bottom: 20 };

export const unselectLabel = () => {
    d3.selectAll(".legendIcon").transition().duration(100).attr("opacity", 1);
};

export const renderLabel = (controller: Controller) => {
    const colorScheme = d3
        .scaleOrdinal(d3.schemeCategory10)
        .domain(controller.getLabels());
        
    legend
        .attr("transform", `translate(${margin.left}, ${margin.top})`)
        .selectAll("g")
        .data(controller.getLabels())
        .join("g")
        .attr("id", (d) => `legend${d}`)
        .attr("class", "legendIcon")
        .attr("transform", (_, i) => `translate(${i * 90}, ${margin.top})`)
        .call((g) =>
            g
                .append("circle")
                .attr("r", 30)
                .attr("fill", (d) => colorScheme(d))
        )
        .on("click", (_, d) => {
            const centroid = controller.getCentroid(d);
            renderCode(centroid);
            toggleOpacity(controller, { type: "label", label: d } as Filter);
            d3.selectAll(".legendIcon")
                .transition()
                .duration(100)
                .attr("opacity", 0.5);
            d3.select(`#legend${d}`)
                .transition()
                .duration(100)
                .attr("opacity", 1);
        });
};
