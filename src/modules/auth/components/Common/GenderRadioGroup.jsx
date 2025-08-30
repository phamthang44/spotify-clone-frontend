    import InputRadio from "./InputRadio.jsx";

    export default function GenderRadioGroup({ register, watchValue }) {
        const options = [
            { label: "Male", value: "male" },
            { label: "Female", value: "female" },
            { label: "Other", value: "other" },
        ];

        return (
            <div className="flex gap-6 mt-4">
                {options.map((opt) => (
                    <InputRadio
                        key={opt.value}
                        id={opt.value}
                        label={opt.label}
                        value={opt.value}
                        watchValue={watchValue}
                        register={register}
                    />
                ))}
            </div>
        );
    }
