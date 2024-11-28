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
    updateLinkData?: (data: navLink) => void;
    handleDelete: (id: string) => void;
    handleEdit?: (id: string) => void;
}

const NavLinkLabel: React.FC<navLink & LabelActions> = ({
    state, url, label, id, handleDelete, updateLinkData, handleEdit,
}): JSX.Element => {
    const {
        formState: { errors },
        handleSubmit,
        register,
    } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        updateLinkData?.({ url: data.url, label: data.label, id, state: LabelState.DISPLAY })
    }

    return (
        <div className="w-[100%] border-[#D0D5DD] border-[1px] bg-white rounded-[--radius-md]">
            {state == "createOrEdit" ? (
                <CreateOrEditLabel
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
                <DisplayLabel url={url} label={label} id={id} handleDelete={handleDelete} handleEdit={handleEdit} />
            )}
        </div>
    )
}

export default NavLinkLabel