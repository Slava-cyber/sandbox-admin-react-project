import React from "react";

function FormSubmitButton(props){
    return (
        <div className="row">
            <div className="col-md-12 text-center">
                <button type="submit" className="btn btn-secondary my-2 w-25">
                    Создать
                </button>
            </div>
        </div>
    )
}

export default FormSubmitButton;