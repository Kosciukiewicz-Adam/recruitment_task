import React from "react"
import Image from "next/image";

interface Props {
    buttonText: string;
    subtitle: string;
    title: string;
}

const EmptyListLabel: React.FC<Props> = ({
    buttonText,
    subtitle,
    title,
}) => {
    return (
        <div className="flex flex-col w-[100%] h-[160px] bg-[#F9FAFB] rounded-[--radius-md] items-center justify-center gap-[4px] border-[#EAECF0] border-[1px]">
            <div className="font-semibold text-[16px]">{title}</div>
            <div className="text-[14px]">{subtitle}</div>
            <div className="flex flex-row bg-[#7F56D9] w-[193px] h-[40px] text-white rounded-[--radius-md] items-center justify-center gap-[4px] mt-[20px] cursor-pointer hover:opacity-70">
                <Image src="/plus-circle.svg" alt="plus-icon" width={20} height={20} />
                <div>{buttonText}</div>
            </div>
        </div>
    )
}

export default EmptyListLabel