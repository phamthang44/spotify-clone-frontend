import StepHeader from "./StepHeader.jsx";
import Input from "../Common/Input.jsx";
import {DatePicker} from "@heroui/react";
import Button from "../Common/Button.jsx";
import ShowErrorPart from "../Common/ShowErrorPart.jsx";
import InputGroup from "../Common/InputGroup.jsx";
import { Controller, useFormContext } from "react-hook-form";
import GenderRadioGroup from "../Common/GenderRadioGroup.jsx";
import {useEffect, useState} from "react";

export default function ProfileStep({step, prev, data, setData, next}) {
    const [touched, setTouched] = useState(false);

    const {
        register,
        control,
        formState: { errors },
        clearErrors,
        trigger,
        watch,
    } = useFormContext();

    const genderValue = watch("gender");
    const dob = watch("dob");
    const displayName = watch("name");

    const handleNextClick = async () => {
        const isValid = await trigger(["gender", "dob", "name"]);
        if (!isValid) return;
        next();
    };

    useEffect(() => {
        if (!touched && (genderValue || displayName || dob)) {
            setTouched(true);
        }
    }, [genderValue, displayName, dob, touched]);


    return (
        <>
            <StepHeader step={step} prev={prev} headerContent="Tell us about yourself" />
            <div className="flex flex-col mr-auto w-full">
                <InputGroup>
                    <label htmlFor="name" className="relative font-poppins font-semibold text-white text-sd mb-8">
                        Name
                        <span className="absolute block text-sm font-medium text-[#B3B3B3]">This name will appear on your profile</span>
                    </label>
                    <Input
                        id="name"
                        type="text"
                        placeholder="Enter your name"
                        watchValue={data.name}
                        {...register("name")}
                        onChange={(e) => {
                            setData((prev) => ({ ...prev, name: e.target.value }))
                            clearErrors("name");
                        }
                        }
                    />
                    <ShowErrorPart error={errors.name} divClass={"relative my-2"} />
                </InputGroup>
                <InputGroup className="mb-10">
                    <label
                        htmlFor="dob"
                        className="relative font-poppins font-semibold text-white text-sd mb-8"
                    >
                        Date of birth
                        <span className="absolute block text-sm font-medium text-[#B3B3B3]">
                            Why do we need your date of birth?{" "}
                            <span className="underline cursor-pointer">Learn more</span>
                        </span>
                    </label>
                    <div className="relative flex w-full flex-wrap md:flex-nowrap gap-4">
                        <Controller
                            name="dob"
                            control={control}
                            rules={{ required: "Please enter your date of birth" }}
                            render={({ field }) => (
                                <DatePicker
                                    {...field}
                                    showMonthAndYearPickers={true}
                                    onChange={(date) => {
                                        field.onChange(date);
                                        setData((prev) => ({ ...prev, dob: date }));
                                        clearErrors("dob");
                                    }}
                                    value={field.value || null}
                                    isRequired
                                    aria-label="date of birth"
                                    variant="bordered"
                                    radius="sm"
                                    size="lg"
                                    color={errors.dob ? "danger" : "success"}
                                    className="text-white !important"
                                    classNames={{
                                        inputWrapper: "border-1 text-white",
                                        selectorButton: "text-white hover:bg-gray-100 hover:text-black",
                                        popoverContent: "bg-white shadow-xl rounded-lg border z-[9999]",
                                        calendar: "p-4 text-white",
                                        innerWrapper: "[&_div[role='spinbutton']]:!text-white"
                                    }}
                                />
                            )}
                        />
                    </div>
                    <ShowErrorPart error={errors.dob} divClass="relative my-2" />
                </InputGroup>
                <InputGroup>
                    <label htmlFor="gender" className="relative font-poppins font-semibold text-white text-sd mb-8">
                        Gender
                        <span className="absolute block text-sm font-medium text-[#B3B3B3]">
                            We use your gender to help personalize our <br/>
                            content recommendations and ads for you.
                        </span>
                    </label>
                    <GenderRadioGroup
                        register={register}
                        watchValue={data.gender}
                        onChange={(value) => {
                            setData((prev) => ({ ...prev, gender: value }));
                            clearErrors("gender");
                        }}
                    />
                    <ShowErrorPart error={errors.gender} divClass="relative my-2" />
                </InputGroup>
            </div>
            <Button
                onClick={handleNextClick}
                divClass="w-full"
                className="w-full h-13 rounded-full bg-[#1ED760] hover:bg-[#3be477] cursor-pointer"
            >
            <span className="font-poppins font-semibold text-black">
              Next
            </span>
            </Button>
        </>
    );
}