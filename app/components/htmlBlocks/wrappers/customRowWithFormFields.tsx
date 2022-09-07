import React from "react";
import GetFormFieldWithCertainType from "./getFormFieldWithCertainType";

interface input {
    options: any,
    fieldChangingFunction: (event: React.SyntheticEvent) => void
}

function CustomRowWithFormFields(props : input) {

let colSize = "col-md-" + Math.floor(12 / props.options.length);
return (
    <>
        <div className="row justify-content between">
            {props.options.map((field: any) => (
                <div className={colSize}>
                    <GetFormFieldWithCertainType options={field} fieldChangingFunction={props.fieldChangingFunction}/>
                </div>
            ))}
        </div>
    </>
)
}

export default CustomRowWithFormFields;