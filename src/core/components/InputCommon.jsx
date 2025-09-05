export default function InputCommon({className, ...props}) {
    return (
        <>
            <input className={className} {...props} />
        </>
    );
}