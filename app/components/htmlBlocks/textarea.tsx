import React from "react";

interface textarea {
    class?: string,
    id: string,
    rows: number,
    placeholder?: string,
    value?: string,
    errorText?: string,
    change: (event: React.SyntheticEvent) => void
}

function Textarea(props: textarea) {
    return (
        <div className=" form-group py-2">
            <textarea className={"form-control " + props.class} id={props.id} rows={props.rows}
                      name={props.id} placeholder={props.placeholder}
                      value={props.value} onChange={props.change}>
            </textarea>
            <small className="form-text form-muted">{props.errorText}</small>
        </div>
    )
}

export default Textarea;