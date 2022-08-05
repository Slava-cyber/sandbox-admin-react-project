import React from "react";

function Select(props) {
    return (
        <div className="form-group py-2">
            <select className={"form-select form-control " + props.class} name={props.id}
                    id={props.id} onChange={props.change}>
                {props.options.map(option => (
                    <option value={option}>
                        {option}
                    </option>
                ))}
            </select>
            <small className=" form-text form-muted">{props.errorText}</small>
        </div>
    )
}

export default Select;