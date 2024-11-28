import { navLink } from "@/app/page";
import Image from "next/image";
import { LabelActions } from ".";

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
                <div className="flex flex-row rounded-[--radius-md] border-[#D0D5DD] border-[1px]">
                    <div
                        onClick={() => handleDelete(id)}
                        className="grid place-content-center py-[10px] px-[16px] cursor-pointer hover:text-[#6941C6]"
                    >usuń</div>
                    <div
                        onClick={() => handleEdit?.(id)}
                        className="grid place-content-center py-[10px] px-[16px] border-[#D0D5DD]
                        border-l-[1px] border-r-[1px] cursor-pointer hover:text-[#6941C6]"
                    >edytuj</div>
                    <div
                        className="grid place-content-center py-[10px] px-[16px] whitespace-nowrap
                        cursor-pointer hover:text-[#6941C6]"
                    >dodaj pozycje menu</div>
                </div>
            </div>
        </div>
    )
}

export default DisplayLabel;
