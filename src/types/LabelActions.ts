import { NavLink } from "./NavLink";

export type LabelActions = {
    handleUpdate?: (data: Partial<NavLink>) => void;
    handleAdd?: (parentId?: string) => void;
    handleDelete: (id: string) => void;
    handleEdit?: (id: string) => void;
}