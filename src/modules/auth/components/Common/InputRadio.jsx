export default function InputRadio({ id, label, value, register, watchValue, onChange }) {
    return (
        <label className="flex items-center gap-2 cursor-pointer">
            <input
                id={id}
                type="radio"
                value={value}
                checked={watchValue === value}
                {...register("gender")}
                onChange={(e) => {
                    register("gender").onChange(e); // báo cho RHF
                    onChange?.(e.target.value);     // cập nhật state ngoài
                }}
                className="hidden peer"
            />
            <span
                className="w-5 h-5 rounded-full border border-gray-400 flex items-center justify-center
               peer-checked:border-green-500 peer-checked:bg-green-500 transition-colors"
            >
            <span
                className="w-3 h-3 rounded-full bg-white
                         peer-checked:bg-white" // giữ cái chấm bên trong trắng để nổi bật
            ></span>
          </span>
            <span className="text-white">{label}</span>
        </label>

    );
}
