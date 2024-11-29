import Button from "./Button";

interface Props {
    handleAdd: () => void;
}

const AddLinkBar: React.FC<Props> = ({ handleAdd }): JSX.Element => {
    return (
        <div className="w-[100%] rounded-bl-[--radius-md] rounded-br-[--radius-md] border-[#D0D5DD] border-[1px] flex justify-start px-[24px] py-[20px]">
            <Button text="Dodaj pozycje menu" handleClick={() => handleAdd()} additionalStyles="bg-white" roundBorder={true} />
        </div>
    )
}

export default AddLinkBar;