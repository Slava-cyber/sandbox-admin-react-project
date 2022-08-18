import React, {useEffect, useState} from "react";

function DeleteModalWindow(props) {
    return (
        <>
            <div className="row py-2">
                <div className="col-md-12 text-center">
                    <button type="button" className="btn btn-outline-secondary" data-bs-toggle="modal"
                            data-bs-target={"#staticBackdrop" + props.value}>
                        {props.sourceTitle}
                    </button>
                </div>
            </div>
            <div className="modal fade" id={"staticBackdrop" + props.value} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1}
                 aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">Удаление</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {props.body}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary"
                                    data-bs-dismiss="modal">Отмена
                            </button>
                            <button type="button" className="btn btn-primary" id="action"
                                    onClick={props.delete} data-bs-dismiss="modal">Подтвердить</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DeleteModalWindow;

