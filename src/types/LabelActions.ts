import { NavLink } from "./NavLink";

export type LabelActions = {
    handleUpdate?: (data: Partial<Omit<NavLink, 'id'>> & Pick<NavLink, 'id'>) => void;
    handleAdd?: (parentId?: string) => void;
    handleDelete: (id: string) => void;
    handleEdit?: (id: string) => void;
}