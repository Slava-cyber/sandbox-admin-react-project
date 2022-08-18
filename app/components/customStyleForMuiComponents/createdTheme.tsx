import React from "react";
import { createTheme } from "@material-ui/core/styles";

const createdTheme = createTheme({
    overrides: {
        MuiButton: {
            containedPrimary: {
                    color: 'red',
                    size: 23,
                    border: 'medium dashed green',

            },
            outlined: {
                border: '2px solid black',
                color: 'blue'
            }
        }
    }
});

export default createdTheme;