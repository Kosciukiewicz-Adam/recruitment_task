interface Props {
    handleClick: () => void;
    additionalStyles?: string;
    roundBorder?: boolean;
    text: string;
}

const Button: React.FC<Props> = ({ handleClick, text, roundBorder, additionalStyles }): JSX.Element => {

    let styles = "h-[40px] border-[#D0D5DD] text-[14px] grid place-content-center px-[16px] cursor-pointer hover:text-[#6941C6] whitespace-nowrap leading-[20px] font-semibold ";
    styles += additionalStyles || "";

    if (roundBorder) {
        styles += " border-[1px] rounded-[--radius-md]"
    }

    return (
        <div onClick={() => handleClick()} className={styles}>
            {text}
        </div>
    )
}

export default Button;