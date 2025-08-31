// core/hooks/useOnClickOutside.js
import { useEffect } from "react";

export default function useOnClickOutside(refs, handler) {
    useEffect(() => {
        function listener(e) {
            // nếu click vào bất kỳ vùng nào trong các refs => bỏ qua
            const clickedInsideSome = refs.some(r => r?.current && r.current.contains(e.target));
            if (!clickedInsideSome) handler(e);
        }

        // dùng pointerdown để bắt chắc hơn mousedown/touchstart
        document.addEventListener("pointerdown", listener);
        return () => {
            document.removeEventListener("pointerdown", listener);
        };
    }, [refs, handler]);
}
