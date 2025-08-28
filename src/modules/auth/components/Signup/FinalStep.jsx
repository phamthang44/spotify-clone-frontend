import {date} from "yup";

export default function FinalStep({prev, data}) {

    console.log(data);

    const timeFormat = data?.dob.toString().split("T")[0]

    console.log(timeFormat);

    const payload = {...data,
        dob: timeFormat,
    }

    console.log(payload);

    return (
        <>
            <button onClick={prev}>Back To Profile Step</button>
        </>
    );
}