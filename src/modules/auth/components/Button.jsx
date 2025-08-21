export default function Button({img, content, className, textClassName, onClick}) {
    return(
        <div className="relative">
            <div className="absolute top-3 left-6">{img ? img : ""}</div>
            <button onClick={onClick} className={className}>
                <span className={textClassName} >{content}</span>
            </button>
        </div>
    );
}