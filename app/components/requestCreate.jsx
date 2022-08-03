import React, {useEffect, useState} from 'react';

function RequestCreate(props) {

    const [requestData, setRequestData] = useState(() => {
        return {
            event: "",
            request_author: "",
            user: "",
            status: "Ожидает подтверждения",
        }
    });

    const [error, setError] = useState(() => {
        return {
            event: '',
            request_author: '',
            user: '',
            status: '',
        }
    })
    const [errorText, setErrorText] = useState(() => {
        return {
            event: 'id ивента',
            request_author: 'логин автора поста',
            user: 'логин пользователя, который отправляет запрос',
            status: 'статус запроса',
        }
    })

    const changeIdEvent = event => {
        event.persist();
        console.log(requestData.event);
        console.log(event.target.value);
        setRequestData(prev => {
            return {
                ...prev,
                [event.target.name]: event.target.value,
            }
        })
        console.log(requestData.event);
        const requestOptions = {
            method: 'POST',
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
            body: JSON.stringify(
                {
                    'eventId': event.target.value,
                }
            )
        };
        fetch('/eventAuthorIdentification', requestOptions)
            .then(response => response.json())
            .then((data) => {
                console.log(data);
                setRequestData(prev => {
                    return {
                        ...prev,
                        request_author: data['author'],
                    }
                });
            });
    }


    const changeInputField = event => {
        event.persist()
        setRequestData(prev => {
            return {
                ...prev,
                [event.target.name]: event.target.value,
            }
        })
    }

    const basicErrorArray = () => {
        return {
            event: 'is-valid',
            request_author: 'is-valid',
            user: 'is-valid',
            status: 'is-valid',
        };
    }

    const basicTextErrorArray = () => {
        return {
            event: '',
            request_author: '',
            user: '',
            status: '',
        };
    }

    const submitForm = event => {
        event.preventDefault();
        const requestOptions = {
            method: 'POST',
            mode: 'cors',
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
            body: JSON.stringify(
                {
                    'data': requestData
                }
            )
        };
        fetch('/RequestCreateApi', requestOptions)
            .then(response => response.json())
            .then((response) => {
                if (response.status == true) {
                    window.location.href = '/admin/request';
                } else {
                    var errorArray = basicErrorArray();
                    var textErrorArray = basicTextErrorArray();
                    var fields = response.error;
                    for (var field in fields) {
                        errorArray[field] = 'is-invalid';
                        textErrorArray[field] = response.error[field];
                    }
                    setError(errorArray);
                    setErrorText(textErrorArray);
                }
            });
    }

    return (
        <>
            <div className="row justify-content-center">
                <div className="col-sm-12 bg-white p-3 col-md-10">
                    <form name="requestCreate" id="requestCreate" onSubmit={submitForm}>
                        <h3 className="text-center mb-5">Форма создания запроса</h3>
                        <div className="row justify-content-center">
                            <div className="col-md-2">
                                <div className="form-group py-2">
                                    <input type="number" name="event" className={"form-control " + error.event}
                                           placeholder="id ивента" id="event"
                                           min="0" value={requestData.event} onChange={changeIdEvent}/>
                                    <small id="idHelp" className="form-text form-muted">{errorText.event}</small>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="form-group py-2">
                                    <input type="text" name="request_author" className={"form-control " + error.request_author}
                                           id="request_author" placeholder="Автор поста"
                                           value={requestData.request_author} onChange={changeInputField}/>
                                    <small id="request_authorHelp" className="form-text form-muted">{errorText.request_author}</small>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="form-group py-2">
                                    <input type="text" name="user" className={"form-control " + error.user} id="user"
                                           placeholder="Пользователь"
                                           value={requestData.user} onChange={changeInputField}/>
                                    <small id="userHelp" className="form-text form-muted">{errorText.user}</small>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="form-group py-2">
                                    <select className={"form-select form-control " + error.status} name="status"
                                            id="status" onChange={changeInputField}>
                                        <option value="Ожидает подтверждения">
                                            Ожидает подтверждения
                                        </option>
                                        <option value="Запрос принят">
                                            Запрос принят
                                        </option>
                                        <option value="Запрос отклонен">
                                            Запрос отклонен
                                        </option>
                                    </select>
                                    <small id=" statusHelp" className=" form-text form-muted">{errorText.status}</small>
                                </div>
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-md-12 text-center">
                                <button type="submit" className="btn btn-secondary my-2 w-25">
                                    Создать
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default RequestCreate;