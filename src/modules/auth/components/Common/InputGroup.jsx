export default function InputGroup({children, className,...props}) {
    return (
        <div  className="flex flex-col mt-4 my-6" {...props}>
            {children}
        </div>
    )
}