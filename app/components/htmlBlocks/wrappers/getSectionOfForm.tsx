import React from "react";
import Separator from "../separator";
import GetCustomRowWithFormFields from "./getCustomRowWithFormFields";

interface input {
    options: any
    fieldChangingFunction: (event: React.SyntheticEvent) => void
}

function GetSectionOfForm(props : input) {
    let sectionDividerWithTitle: JSX.Element = <></>;
    if (props.options.type == 'separator') {
        sectionDividerWithTitle = <Separator title={props.options.title}/>
    }

    let fieldsGroupedByRows: any = [];
    let fieldsForOneRow: any = []
    props.options.fields.forEach(function(field: any, i:number) {
        fieldsForOneRow.push(field);
        if (((i + 1) % 2 === 0) || (field.typeComponent === 'textarea')) {
            fieldsGroupedByRows.push(fieldsForOneRow);
            fieldsForOneRow = [];
        }
    });

    return (
        <>
            {sectionDividerWithTitle}
            {fieldsGroupedByRows.map((field: any) => (
                <GetCustomRowWithFormFields options={field} fieldChangingFunction={props.fieldChangingFunction} />
            ))}
        </>
    )
}

export default GetSectionOfForm;