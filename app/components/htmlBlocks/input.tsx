import React from "react";

interface input {
    type: string,
    class?: string,
    id: string,
    placeholder?: string,
    value?: string | number,
    change: any,
    errorText?: string
}

function Input(props : input) {
    return (
        <div className="form-group py-2">
            <input type={props.type} className={"form-control " + props.class} id={props.id}
                   placeholder={props.placeholder} name={props.id}
                   value={props.value} onChange={props.change}/>
            <small className="form-text form-muted">{props.errorText}</small>
        </div>
    )
}

export default Input;