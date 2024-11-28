import { navLink } from "@/app/page";
import Image from "next/image";
import { LabelActions } from ".";
import Button from "../Button";

type Props = Omit<navLink, 'state'> & LabelActions

const DisplayLabel: React.FC<Props> = ({ label, url, id, handleDelete, handleEdit }): JSX.Element => {
    return (
        <div className="flex flex-col">
            <div className="flex flex-row py-[16px] px-[24px] h-[78px] text-[14px] gap-[4px] justify-between overflow-hidden">
                <Image src="/move.svg" alt="move-icon" width={40} height={40} className="p-[10px]" />
                <div className="flex flex-col gap-[6px] grow">
                    <div className="text-[#101828] font-semibold">{label}</div>
                    <div className="text-[#475467]">{url}</div>
                </div>
                <div className="flex flex-row rounded-[--radius-md] border-[#D0D5DD] border-[1px] overflow-hidden">
                    <Button text="usuń" handleClick={() => handleDelete(id)} />
                    <Button text="edytuj" handleClick={() => handleEdit?.(id)} additionalStyles="border-x-[1px]" />
                    <Button text="dodaj pozycje menu" handleClick={() => { }} />
                </div>
            </div>
        </div>
    )
}

export default DisplayLabel;
