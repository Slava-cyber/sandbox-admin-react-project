import React from "react";

function Separator(props) {
    return (
        <div className="mt-2">
            <strong>{props.title}</strong>
            <hr className="separator mt-0"/>
        </div>
    )
}

export default Separator;