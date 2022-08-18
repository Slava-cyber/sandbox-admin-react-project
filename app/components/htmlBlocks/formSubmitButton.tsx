import React from "react";
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';

function FormSubmitButton(props){
    return (
        <div className="row">
            <div className="col-md-12 text-center">
                <Button variant={"contained"} endIcon={<SendIcon />} type="submit">
                    Создать
                </Button>
            </div>
        </div>
    )
}

export default FormSubmitButton;