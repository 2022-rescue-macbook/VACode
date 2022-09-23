export interface UserData {
    id: number;
    name: string;
    x: number;
    y: number;
    label: string;
    group: string;
    code: string;
}

export interface Filter {
    type: "none" | "label" | "group" | "single";
    label: string | null;
    group: string | null;
    id: number | null;
}

export class Controller {
    data: UserData[];

    constructor(fetchData: UserData[]) {
        this.data = fetchData;
    }

    getLabels() {
        return [...new Set(this.data.map((d) => d.label))].sort();
    }

    getGroups() {
        return [...new Set(this.data.map((d) => d.group))].sort();
    }

    getFilteredData(filter: Filter) {
        switch (filter.type) {
            case "none":
                return this.data;
            case "label":
                return this.data.filter((d) => d.label === filter.label);
            case "group":
                return this.data.filter((d) => d.group === filter.group);
            case "single":
                return this.data.filter((d) => d.id === filter.id);
        }
    }
}
