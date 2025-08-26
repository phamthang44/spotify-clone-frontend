export default function LinkButton({ href, children, ...props }) {
    return (
        <a href={href}
           {...props}>
            {children}
        </a>
    );
}