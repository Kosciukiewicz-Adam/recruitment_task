import { BordersConfig, navLink } from "@/app/page";
import { useForm, SubmitHandler } from "react-hook-form"
import CreateOrEditLabel from "./CreateOrEditLabel";
import DisplayLabel from "./DisplayLabel";
import { LabelState } from "@/app/page";

export type Inputs = {
    label: string;
    url: string;
}

export type LabelActions = {
    handleUpdate?: (data: Partial<navLink>) => void;
    handleAdd?: (parentId?: string) => void;
    handleDelete: (id: string) => void;
    handleEdit?: (id: string) => void;
}

type Props = navLink & LabelActions & {
    bordersConfig: BordersConfig;
    isOnlyLabel: boolean;
    index: number;
}

const NavLinkLabel: React.FC<Props> = ({
    chierarchyIndex,
    bordersConfig,
    handleDelete,
    handleUpdate,
    index,
    isOnlyLabel,
    handleEdit,
    handleAdd,
    state,
    label,
    url,
    id,
}): JSX.Element => {
    const {
        formState: { errors },
        handleSubmit,
        register,
    } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        handleUpdate?.({ url: data.url, label: data.label, id, state: LabelState.DISPLAY })
    }

    let additionalStyles = "";

    if (chierarchyIndex > 0 && state !== LabelState.CREATE_OR_EDIT) {
        additionalStyles += "border-l-[1px] border-[#D0D5DD] "
    }

    return (
        <div
            className={`w-[100%] flex flex-col relative ${additionalStyles}`}
            style={{ top: `-${index * 1}px` }}
        >
            {state == "createOrEdit" ? (
                <CreateOrEditLabel
                    handleSubmit={handleSubmit}
                    handleDelete={handleDelete}
                    isError={!!errors.label}
                    isOnlyLabel={isOnlyLabel}
                    onSubmit={onSubmit}
                    register={register}
                    label={label}
                    url={url}
                    id={id}
                />
            ) : (
                <DisplayLabel
                    bordersConfig={bordersConfig}
                    chierarchyIndex={chierarchyIndex}
                    handleDelete={handleDelete}
                    handleEdit={handleEdit}
                    handleAdd={handleAdd}
                    label={label}
                    url={url}
                    id={id}
                />
            )}
        </div>
    )
}

export default NavLinkLabel