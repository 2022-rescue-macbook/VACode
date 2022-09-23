import * as d3 from "d3";
import { Controller, UserData, Filter } from "../types";
import { renderCode } from "./CodeViewer";
import { toggleOpacity } from "./PlotViewer";

const GroupCardComponent = (groupData: UserData[]) => {
    if (groupData.length === 0) {
        return "";
    }
    const nameString = groupData
        .slice(0, 4)
        .map((d) => `<div class="col px-1">${d.name}</div>`)
        .join("");

    return /* html */ `
        <div class="card my-2 group-card">
            <div class="card-body row justify-content-evenly">
                <div class="col-3 px-1">
                    <h5 class="card-title">${groupData[0].group} 그룹</h5>
                </div>
                <div class="col-7 px-2">
                    <div class="row row-cols-4 justify-content-start card-text">
                        ${nameString}
                    </div>
                </div>
            </div>
        </div>
    `;
};

const renderGroupList = (groupByData: any, groupName: string | undefined) => {};



export const renderGroup = (controller: Controller) => {
    const searchText = document.getElementById("search-box") as HTMLInputElement;
    searchText.addEventListener("change", () => {
        renderGroup(controller)
    });
    const filteredData =
        searchText.value !== ""
            ? controller.data.filter((d) => d.name.includes(searchText.value))
            : controller.data;
    
    

    const groups = controller.getGroups();
    const groupyByData: { [groupName: string]: UserData[] } = {};
    groups.forEach((group) => {
        groupyByData[group] = [];
    });
    filteredData.forEach((data) => {
        groupyByData[data.group].push(data);
    });
    const groupList = document.getElementById("groupList") as HTMLElement;
    const groupCards = Object.values(groupyByData).map((groupData) =>
        GroupCardComponent(groupData)
    );
    groupList.innerHTML = groupCards.join("");

    d3.selectAll(".group-card")
        .data(groups)
        .on("click", (_, d) => {
            toggleOpacity(controller, { type: "group", group: d } as Filter);
            renderCode(groupyByData[d][0]);
        });
};
