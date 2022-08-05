import React, {useEffect, useState} from 'react';
import FormSubmitButton from "./htmlBlocks/formSubmitButton.jsx";
import Input from "./htmlBlocks/input.jsx";
import Select from "./htmlBlocks/select.jsx";

function RequestCreate(props) {

    const [requestData, setRequestData] = useState(() => {
        return {
            event: "",
            request_author: "",
            user: "",
            status: "Ожидает подтверждения",
        }
    });

    const options = ["Ожидает подтверждения", "Запрос принят", "Запрос отклонен"];

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
        console.log(12);
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
                                    <Input type={'number'} placeholder={'id ивента'} class = {error.event}
                                           id={"event"} value = {requestData.event}
                                           errorText = {errorText.event} change={(event) => {changeIdEvent(event)}} />
                            </div>
                            <div className="col-md-3">
                                <Input type={'text'} placeholder={'Автор поста'} class = {error.request_author}
                                       id={"request_author"} value = {requestData.request_author}
                                       errorText = {errorText.request_author} change={(event) => {changeInputField(event)}} />
                            </div>
                            <div className="col-md-3">
                                <Input type={'text'} placeholder={'Пользователь'} class = {error.user}
                                       id={"user"} value = {requestData.user} errorText = {errorText.user} change={(event) => {changeInputField(event)}} />
                            </div>
                            <div className="col-md-3">
                                <Select id={'status'} class={error.status} errorText = {errorText.status}
                                        options = {options} change={(event) => {changeInputField(event)}} />
                            </div>
                        </div>
                        <FormSubmitButton/>
                    </form>
                </div>
            </div>
        </>
    )
}

export default RequestCreate;