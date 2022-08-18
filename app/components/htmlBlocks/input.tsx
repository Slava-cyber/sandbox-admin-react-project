import React from "react";

function Input(props) {
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