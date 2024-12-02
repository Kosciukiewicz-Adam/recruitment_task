'use client'

import { BordersConfig, navLink } from "@/app/page";
import Image from "next/image";
import { LabelActions } from ".";
import Button from "../Button";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities"

type Props = Omit<navLink, 'state'> & LabelActions & {
    bordersConfig: BordersConfig;
}

const DisplayLabel: React.FC<Props> = ({
    label, url, id, handleDelete, handleEdit, handleAdd, chierarchyIndex, bordersConfig,
}): JSX.Element => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id })

    let additionalStyles = "";
    const style = {
        marginLeft: `${chierarchyIndex * 64}px`,
        transform: CSS.Transform.toString(transform) || "unset",
        transition: transition || "unset",
    }

    if (bordersConfig.topLeft) {
        additionalStyles += " rounded-tl-[--radius-md]"
    }

    if (bordersConfig.topRight) {
        additionalStyles += " rounded-tr-[--radius-md]"
    }

    if (bordersConfig.bottomLeft) {
        additionalStyles += " rounded-bl-[--radius-md]"
    }

    return (
        <div
            className={
                `flex flex-col bg-white border-[#D0D5DD] border-[1px] ${additionalStyles}`
            }
            style={style}
            ref={setNodeRef}
            suppressHydrationWarning
            {...attributes}
            {...listeners}
        >
            <div className="flex flex-row py-[16px] px-[24px] h-[78px] text-[14px] gap-[4px] justify-between overflow-hidden">
                <Image src="/move.svg" alt="move-icon" width={40} height={40} className="p-[10px]" />
                <div className="flex flex-col gap-[6px] grow">
                    <div className="text-[#101828] font-semibold">{label}</div>
                    <div className="text-[#475467]">{url}</div>
                </div>
                <div className="flex flex-row rounded-[--radius-md] border-[#D0D5DD] border-[1px] overflow-hidden h-[40px]">
                    <Button text="usuń" handleClick={() => handleDelete(id)} />
                    <Button text="edytuj" handleClick={() => handleEdit?.(id)} additionalStyles="border-x-[1px]" />
                    <Button text="dodaj pozycje menu" handleClick={() => handleAdd?.(id)} />
                </div>
            </div>
        </div>
    )
}

export default DisplayLabel;
