export default function Button({children, classCustom = "", onClick, type = "button", ...props}) {
    return (
        <button onClick={onClick} type={type} className={classCustom} {...props}>{children}</button>
    );
}