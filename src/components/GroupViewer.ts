import { Controller, Filter, UserData } from "../types";
import { renderCode } from "./CodeViewer";
import { toggleOpacity } from "./PlotViewer";

const GroupCardComponent = (groupData: UserData[]) => {
    if (groupData.length === 0) {
        return "";
    }
    const nameString = groupData
        .map(
            (d) =>
                `<div id="u${d.id}" class="username col px-1">${d.name}</div>`
        )
        .join("");

    return /* html */ `
        <div class="card my-2 group-card">
            <div class="card-body row justify-content-evenly px-0">
                <div class="col-3 px-0 teamname" id="g${groupData[0].group}">
                    <h5 class="card-title">${groupData[0].group} 그룹</h5>
                </div>
                <div class="col-7 px-0">
                    <div id="name" class="row row-cols-4 justify-content-start card-text">
                        ${nameString}
                    </div>
                </div>
            </div>
        </div>
    `;
};

export const renderGroup = (controller: Controller) => {
    const searchText = document.getElementById(
        "search-box"
    ) as HTMLInputElement;
    searchText.addEventListener("change", () => {
        renderGroup(controller);
    });

    const filteredUsers =
        searchText.value !== ""
            ? controller.data.filter((d) => d.name.includes(searchText.value))
            : controller.data;
    const filteredGroup = new Set(filteredUsers.map((d) => d.group));
    
    const filteredData = controller.data.filter((d) =>
        filteredGroup.has(d.group)
    );

    const groups = controller.getGroups();
    const groupyByData: { [groupName: string]: UserData[] } = {};

    groups.forEach((group) => {
        groupyByData[group] = [];
    });
    filteredData.forEach((data) => {
        groupyByData[`g${data.group}`].push(data);
    });
    const groupList = document.getElementById("groupList") as HTMLElement;
    const groupCards = Object.values(groupyByData).map((groupData) =>
        GroupCardComponent(groupData)
    );
    groupList.innerHTML = groupCards.join("");

    document.querySelectorAll(".username").forEach((element) => {
        const userid = parseInt(element.id.slice(1));
        element.addEventListener("click", (_) => {
            renderCode(controller.data.filter((x) => x.id === userid)[0]);
            toggleOpacity(controller, { type: "single", id: userid } as Filter);
        });
    });

    document.querySelectorAll(".teamname").forEach((element) => {
        const groupName = element.id;
        element.addEventListener("click", (_) => {
            toggleOpacity(controller, {
                type: "group",
                group: groupName,
            } as Filter);
        });
    });
};
