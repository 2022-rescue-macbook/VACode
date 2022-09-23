import { UserData, Filter } from "./types";

const fetchData: UserData[] = [];

const selectedFilter: Filter = {
    type: "none",
    label: null,
    group: null,
    single: null,
};

export { fetchData, selectedFilter };
