import React, {useEffect, useState} from 'react';
import { ThemeProvider } from "@material-ui/core/styles";
import createdTheme from "./customStyleForMuiComponents/createdTheme";

import FetchRequest from "./jsFunctions/fetchRequest";
import {submitForm} from "./jsFunctions/creationFunction";

import FormSubmitButton from "./htmlBlocks/formSubmitButton";
import Input from "./htmlBlocks/input";
import Select from "./htmlBlocks/select";

import {requestEntityData, requestEntityClassError, requestEntityTextError} from "../ts-interfaces";

function RequestCreate() {
    const [requestData, setRequestData] = useState<requestEntityData>(() => {
        return {
            event: null,
            request_author: "",
            user: "",
            status: "Ожидает подтверждения",
        }
    });

    const options = ["Ожидает подтверждения", "Запрос принят", "Запрос отклонен"];

    const [error, setError] = useState<requestEntityClassError>(() => {
        return {
            event: '',
            request_author: '',
            user: '',
            status: '',
        }
    })
    const [errorText, setErrorText] = useState<requestEntityTextError>(() => {
        return {
            event: 'id ивента',
            request_author: 'логин автора поста',
            user: 'логин пользователя, который отправляет запрос',
            status: 'статус запроса',
        }
    })

    const changeIdEvent = (event: React.SyntheticEvent) => {
        event.persist();
        setRequestData(prev => {
            return {
                ...prev,
                [(event.target as HTMLInputElement).name]: (event.target as HTMLInputElement).value,
            }
        })
        FetchRequest(JSON.stringify({
                'eventId': (event.target as HTMLInputElement).value,
            }),
            "POST",
            '/eventAuthorIdentification')
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

    const changeInputField = (event: React.SyntheticEvent) => {
        event.persist()
        setRequestData(prev => {
            return {
                ...prev,
                [(event.target as HTMLInputElement).name]: (event.target as HTMLInputElement).value,
            }
        })
    }

    const basicErrorArray = (): requestEntityClassError => {
        return {
            event: 'is-valid',
            request_author: 'is-valid',
            user: 'is-valid',
            status: 'is-valid',
        };
    }

    const basicTextErrorArray = (): requestEntityTextError => {
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
                                       errorText = {errorText.event} change={(event: React.SyntheticEvent) => {changeIdEvent(event)}} />
                            </div>
                            <div className="col-md-3">
                                <Input type={'text'} placeholder={'Автор поста'} class = {error.request_author}
                                       id={"request_author"} value = {requestData.request_author}
                                       errorText = {errorText.request_author} change={(event: React.SyntheticEvent) => {changeInputField(event)}} />
                            </div>
                            <div className="col-md-3">
                                <Input type={'text'} placeholder={'Пользователь'} class = {error.user}
                                       id={"user"} value = {requestData.user} errorText = {errorText.user} change={(event: React.SyntheticEvent) => {changeInputField(event)}} />
                            </div>
                            <div className="col-md-3">
                                <Select id={'status'} class={error.status} errorText = {errorText.status} selected={""}
                                        options = {options} change={(event: React.SyntheticEvent) => {changeInputField(event)}} />
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