import { navLink } from "@/app/page"
import { LabelActions, type Inputs } from "./index"
import { UseFormRegister, SubmitHandler, UseFormHandleSubmit } from "react-hook-form"
import Button from "../Button";

type Props = Omit<navLink, 'state'> & {
    handleSubmit: UseFormHandleSubmit<Inputs, undefined>;
    register: UseFormRegister<Inputs>;
    onSubmit: SubmitHandler<Inputs>;
    isError: boolean;
} & LabelActions

const CreateOrEditLabel: React.FC<Props> = ({
    handleDelete,
    handleSubmit,
    onSubmit,
    register,
    isError,
    label,
    url,
    id,
}): JSX.Element => {
    return (
        <form
            className="w-[100%] flex flex-col gap-[8px] text-[#344054] px-[24px] py-[20px] "
            onSubmit={handleSubmit(onSubmit)}
        >
            <div className="w-[100%] flex flex-col gap-[6px]">
                <div className=" text-[14px]">Nazwa</div>
                <input
                    className="rounded-[--radius-md] w-[100%] h-[40x] px-[12px] py-[8px] border-[#D0D5DD] border-[1px]"
                    {...register("label", { required: true })}
                    defaultValue={label}
                    placeholder="np. Promocje"
                />
                {isError && <span>To pole jest wymagane</span>}
            </div>
            <div className="w-[100%] flex flex-col gap-[6px]">
                <div className="text-[14px]">Link</div>
                <input
                    className="rounded-[--radius-md] w-[100%] h-[40x] px-[12px] py-[8px] border-[#D0D5DD] border-[1px]"
                    placeholder="Wklej lub wyszukaj"
                    {...register("url")}
                    defaultValue={url}
                />
            </div>

            <div className="w-[100%] flex flex-row mt-[12px] gap-[8px] text-[14px]">
                <Button text="" handleClick={() => handleDelete(id)} roundBorder={true} />
                <input
                    className="rounded-[--radius-md] border-[1px] text-[#6941C6] w-[75px] h-[40px] grid place-content-center"
                    type="submit"
                    value="Dodaj"
                />
            </div>
        </form>
    )
}

export default CreateOrEditLabel