import React from "react";

interface separator {
    title: string
}

function Separator(props: separator) {
    return (
        <div className="mt-2">
            <strong>{props.title}</strong>
            <hr className="separator mt-0"/>
        </div>
    )
}

export default Separator;