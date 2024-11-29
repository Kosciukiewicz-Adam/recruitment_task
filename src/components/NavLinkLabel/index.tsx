import { navLink } from "@/app/page";
import { useForm, SubmitHandler } from "react-hook-form"
import CreateOrEditLabel from "./CreateOrEditLabel";
import DisplayLabel from "./DisplayLabel";
import { LabelState } from "@/app/page";

export type Inputs = {
    label: string
    url: string
}

export type LabelActions = {
    handleUpdate?: (data: navLink) => void;
    handleDelete: (id: string) => void;
    handleEdit?: (id: string) => void;
    handleAdd?: () => void;
}

type Props = navLink & LabelActions & {
    isFirstLink: boolean;
    isLastLink: boolean;
}

const NavLinkLabel: React.FC<Props> = ({
    state, url, label, id, handleDelete, handleUpdate, handleEdit, isFirstLink, isLastLink, handleAdd,
}): JSX.Element => {
    const {
        formState: { errors },
        handleSubmit,
        register,
    } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        handleUpdate?.({ url: data.url, label: data.label, id, state: LabelState.DISPLAY })
    }

    let borderStyles = "border-b-[0px]";

    if (isFirstLink) {
        borderStyles += " rounded-tl-[--radius-md] rounded-tr-[--radius-md]"
    }

    if (isFirstLink && isLastLink && state === LabelState.CREATE_OR_EDIT) {
        borderStyles = " rounded-[--radius-md] overflow-hidden"
    }

    return (
        <div className={`w-[100%] border-[#D0D5DD] border-[1px] bg-white ${borderStyles}`}>
            {state == "createOrEdit" ? (
                <CreateOrEditLabel
                    isOnlyLink={isFirstLink && isLastLink}
                    handleSubmit={handleSubmit}
                    handleDelete={handleDelete}
                    isError={!!errors.label}
                    onSubmit={onSubmit}
                    register={register}
                    label={label}
                    url={url}
                    id={id}
                />
            ) : (
                <DisplayLabel
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