import React from "react";
import {Select, MenuItem, FormControl, FormHelperText, InputLabel } from "@mui/material";
import Box from "@mui/material/Box";

interface selectMui {
    options: string[],
    class?: string,
    id: string,
    errorText?: string,
    value: string,
    change: any
}

function SelectMui(props: selectMui) {
    let errorStatus = (props.class === 'is-invalid') && true;
    let focusedStatus = (props.class !== '') && true;

    return (
        <Box>
            <FormControl color={(props.class === 'is-invalid') ? 'error' : 'success'}
                         error={errorStatus} fullWidth={true}
                         focused={focusedStatus}>
                <InputLabel id="label">Категория</InputLabel>
                <Select variant={"outlined"} label={"Категория"} value={props.value}
                            name={props.id} onChange={props.change} size={"small"}>
                    {props.options.map(option => (
                    <MenuItem value={option}>
                        {option}
                    </MenuItem>
                ))}
                </Select>
                <FormHelperText>{props.errorText}</FormHelperText>
            </FormControl>
        </Box>
    )
}

export default SelectMui;