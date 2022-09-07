import React from "react";
import Separator from "../separator";
import CustomRowWithFormFields from "./customRowWithFormFields";

interface input {
    options: any
    fieldChangingFunction: (event: React.SyntheticEvent) => void
}

function GetCertainSectionOfForm(props : input) {
    let sectionDividerWithTitle: JSX.Element = <></>;
    if (props.options.type == 'separator') {
        sectionDividerWithTitle = <Separator title={props.options.title}/>
    }

    let arrayWithFieldsGroupedByRows: any = [];
    let arrayWithFieldsForOneRow: any = []
    props.options.fields.forEach(function(field: any, i:number) {
        arrayWithFieldsForOneRow.push(field);
        if (((i + 1) % 2 === 0) || (field.typeComponent === 'textarea')) {
            arrayWithFieldsGroupedByRows.push(arrayWithFieldsForOneRow);
            arrayWithFieldsForOneRow = [];
        }
    });

    return (
        <>
            {sectionDividerWithTitle}
            {arrayWithFieldsGroupedByRows.map((field: any) => (
                <CustomRowWithFormFields options={field} fieldChangingFunction={props.fieldChangingFunction} />
            ))}
        </>
    )
}

export default GetCertainSectionOfForm;