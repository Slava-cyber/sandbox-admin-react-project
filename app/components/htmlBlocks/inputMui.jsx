import React from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

function InputMui(props) {
    let focusedStatus = (props.class !== '') && true;
    let multiline =  (props.rows != null) && true;
    return (
        <Box>
            <TextField variant={"outlined"} type={props.type} id={props.id}
                       color={(props.class === 'is-invalid') ? 'error' : 'success'}
                       placeholder={props.placeholder} name={props.id}
                       value={props.value} onChange={props.change} size={"small"} fullWidth={true}
                       multiline = {multiline} rows={props.rows}
                       helperText={props.errorText} focused={focusedStatus} />
        </Box>
    )
}

export default InputMui;