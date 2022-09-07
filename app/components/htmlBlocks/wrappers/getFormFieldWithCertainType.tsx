import React from "react";
import Input from "../input";
import Select from "../select";
import Textarea from "../textarea";


interface input {
    options: any
    fieldChangingFunction: (event: React.SyntheticEvent) => void
}

function GetFormFieldWithCertainType(props : input) {
    switch (props.options.typeComponent) {
        case 'input':
            return (
                <Input type={props.options.type} placeholder={props.options.placeholder}
                       class={props.options.class}
                       id={props.options.id} value={props.options.value}
                       errorText={props.options.errorText}
                       change={(event: React.SyntheticEvent) => {
                           props.fieldChangingFunction(event)
                       }}/>
            );
        case 'select':
            return (
                <Select options={props.options.options}
                        class={props.options.class} id={props.options.id}
                        errorText={props.options.errorText}
                        selected={props.options.selected}
                        change={(event: React.SyntheticEvent) => {
                            props.fieldChangingFunction(event)
                        }}/>
            );
        case 'textarea':
            return (
                <Textarea class={props.options.class} id={props.options.id}
                          placeholder={props.options.placeholder}
                          value={props.options.value} errorText={props.options.errorText}
                          rows={props.options.rows}
                          change={(event: React.SyntheticEvent) => {
                              props.fieldChangingFunction(event)
                          }}/>
            )
        default:
            return (<></>);
    }
}

export default GetFormFieldWithCertainType;