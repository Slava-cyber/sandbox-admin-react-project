import React, {useEffect, useState} from 'react';
import FormSubmitButton from "./htmlBlocks/formSubmitButton.jsx";
import Input from "./htmlBlocks/input.jsx";
import Select from "./htmlBlocks/select.jsx";
import {submitForm} from "./creationFunction.jsx";
import { ThemeProvider } from "@material-ui/core/styles";
import createdTheme from "./customStyleForMuiComponents/createdTheme.jsx";

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
        setRequestData(prev => {
            return {
                ...prev,
                [event.target.name]: event.target.value,
            }
        })
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

    let data = {
        'data' : requestData,
    };

    let linkAfterCreation = '/admin/request'
    let apiRequestLink = '/RequestCreateApi';

    return (
        <>
            <div className="row justify-content-center">
                <div className="col-sm-12 bg-white p-3 col-md-10">
                    <form name="requestCreate" id="requestCreate" onSubmit={(event) => {submitForm(
                        event,
                        data,
                        apiRequestLink,
                        linkAfterCreation,
                        basicErrorArray,
                        basicTextErrorArray,
                        setError,
                        setErrorText
                        )}}>
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
                                <Select id={'status'} class={error.status} errorText = {errorText.status} selected={""}
                                        options = {options} change={(event) => {changeInputField(event)}} />
                            </div>
                        </div>
                        <div>
                            <ThemeProvider theme={createdTheme}>
                                <FormSubmitButton/>
                            </ThemeProvider>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default RequestCreate;