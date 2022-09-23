export interface Response {
    data: UserData[];
    centroid: number[];
    labels: number[];
    group: number[];
}

export interface UserData {
    id: number;
    name: string;
    x: number;
    y: number;
    label: number;
    group: number;
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
    centroid: number[];
    labels: string[];
    groups: string[];

    constructor(
        fetchData: UserData[],
        centroid: number[],
        labels: number[],
        groups: number[]
    ) {
        this.data = fetchData;
        this.centroid = centroid;
        this.labels = labels.map((d) => `l${d}`);
        this.groups = groups.map((d) => `g${String(d)}`);
    }
    getCentroid(label: string): UserData {
        return this.data.filter(
            (d) => d.id === Number(this.centroid[Number(label.slice(1))])
        )[0];
    }

    getLabels() {
        return this.labels;
    }

    getGroups() {
        return this.groups;
    }

    getFilteredData(filter: Filter) {
        switch (filter.type) {
            case "none":
                return this.data;
            case "label":
                return this.data.filter((d) => `l${d.label}` === filter.label);
            case "group":
                return this.data.filter((d) => `g${d.group}` === filter.group);
            case "single":
                return this.data.filter((d) => d.id === filter.id);
        }
    }
}
