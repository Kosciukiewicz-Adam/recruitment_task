import { LabelState } from "@/consts";

export interface NavLink {
    chierarchyIndex: number;
    parentId?: string;
    state: LabelState;
    label: string;
    url: string;
    id: string;
}