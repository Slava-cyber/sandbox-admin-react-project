import React from "react";

interface select {
    options: string[],
    selected: string,
    class?: string,
    id: string,
    errorText?: string,
    change: any
}

function Select(props: select) {
    let selectedArray: {
        [key: string]: boolean
    } = {};
    for (let option of props.options) {
        if (props.selected === option) {
            selectedArray[option] = true;
        } else {
            selectedArray[option] = false;
        }
    }

    return (
        <div className="form-group py-2">
            <select className={"form-select form-control " + props.class} name={props.id}
                    id={props.id} onChange={props.change}>
                {props.options.map(option => (
                    <option value={option} selected={selectedArray[option]}>
                         {option}
                    </option>
                ))}

            </select>
            <small className=" form-text form-muted">{props.errorText}</small>
        </div>
    )
}

export default Select;