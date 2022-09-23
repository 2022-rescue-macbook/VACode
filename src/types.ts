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
    single: number | null;
}




