export default function Button({divClass, icon, content, className, textClassName, onClick, classIcon, type, children}) {
    return(
        <div className={divClass}>
            <button onClick={onClick} className={className} type={type ? type : 'button'}>
                <span className={classIcon}>{icon ? icon : ""}</span>
                <span className={textClassName} >{content}</span>
                {children ? children : null}
            </button>
        </div>
    );
}