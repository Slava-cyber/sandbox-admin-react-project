import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import FormSubmitButton from "./htmlBlocks/formSubmitButton.jsx";
import Select from "./htmlBlocks/select.jsx";
import Textarea from "./htmlBlocks/textarea.jsx";
import Input from "./htmlBlocks/input.jsx";

import {submitForm} from "./creationFunction.jsx";

function EventCreate(props) {

    const params = useParams();

    const [id, setId] = useState(0);

    const [eventData, setEventData] = useState(() => {
        return {
            title: "",
            description: "",
            town: "Москва",
            datetime: "",
            category: "Активный отдых",
            author: "",
        }
    });

    useEffect(() => {
        if (params.id != null) {
            setId(params.id);
        } else {
            params.id = 0;
        }
        const requestOptions = {
            method: 'POST',
            mode: 'cors',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify (
                {
                    'id': params.id
                }
            )
        };
        fetch('/EventGetDataById', requestOptions)
            .then(response => response.json())
            .then((response) => {
                if (response.status == true) {
                    setEventData(prev => {
                        return {
                            ...prev,
                            'title': response.event.title,
                            'town': response.event.town,
                            'datetime': response.event.datetime,
                            'category': response.event.category,
                            'author': response.event.author,
                            'description': response.event.description,
                        }
                    })
                }
            });
    }, []);

    const options = ["Активный отдых", "Спорт", "Квесты/настольные игры", "Ночная жизнь", "Охота/рыбалка", "Туризм", "Другое"];

    const [error, setError] = useState(() => {
        return {
            title: '',
            author: '',
            description: '',
            datetime: '',
            town: '',
            category: '',
        }
    })
    const [errorText, setErrorText] = useState(() => {
        return {
            title: '',
            author: 'Логин автора поста',
            description: '',
            datetime: 'Дата и время начала ивента',
            town: '',
            category: 'Категория'
        }
    })

    const changeInputField = event => {
        event.persist()
        setEventData(prev => {
            return {
                ...prev,
                [event.target.name]: event.target.value,
            }
        })
    }

    const basicErrorArray = () => {
        return {
            title: 'is-valid',
            author: 'is-valid',
            datetime : 'is-valid',
            town: 'is-valid',
            description: 'is-valid',
            category: 'is-valid',
        };
    }

    const basicTextErrorArray = () => {
        return {
            title: '',
            author: '',
            description: '',
            datetime: '',
            town: '',
            category: '',
        };
    }

    let data = {
        'data' : eventData,
        'id' : id,
    };

    let linkAfterCreation = '/admin/event';
    let apiRequestLink = '/EventCreateApi';

    return (
        <>
            <div className="row justify-content-center">
                <div className="col-sm-12 bg-white p-3 col-md-10">
                    <form method="POST" action="/login" name="eventAdd" id="eventAdd"
                          onSubmit={(event) => {submitForm(
                              event,
                              data,
                              apiRequestLink,
                              linkAfterCreation,
                              basicErrorArray,
                              basicTextErrorArray,
                              setError,
                              setErrorText
                            )}}>
                        <h3 className="text-center mb-5">Форма создания ивента</h3>
                        <div className="row">
                            <Input type={'hidden'} placeholder={''} class = {''}
                                   id={"id"} value = {id}
                                   errorText = {''} change={(event) => {changeInputField(event)}} />
                        </div>
                        <div className="row">
                            <Input type={'text'} placeholder={'Заголовок'} class = {error.title}
                                   id={"title"} value = {eventData.title}
                                   errorText = {errorText.title} change={(event) => {changeInputField(event)}} />
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <Input type={'text'} placeholder={'Город'} class = {error.town}
                                       id={"town"} value = {eventData.town}
                                       errorText = {errorText.town} change={(event) => {changeInputField(event)}} />
                            </div>
                            <div className="col-md-6">
                                <Input type={'datetime-local'} class = {error.datetime}
                                       id={"datetime"} value = {eventData.datetime}
                                       errorText = {errorText.datetime} change={(event) => {changeInputField(event)}} />
                            </div>
                            <div className="col-md-6">
                                <Select options = {options} class={error.category} id={"category"} selected={eventData.category}
                                        errorText = {errorText.category}
                                        change = {(event) => {changeInputField(event)}}/>
                            </div>
                            <div className="col-md-6">
                                <Input type={'text'} placeholder={'Автор поста'} class = {error.author}
                                       id={"author"} value = {eventData.author}
                                       errorText = {errorText.author} change={(event) => {changeInputField(event)}} />

                            </div>
                            <div className=" col-md-12">
                                <Textarea class={error.description} id={"description"} placeholder={"Описание ивента"}
                                          value={eventData.description} errorText={errorText.description} rows={5}
                                          change = {(event) => {changeInputField(event)}}/>
                            </div>
                        </div>
                        <FormSubmitButton/>
                    </form>
                </div>
            </div>
        </>
    );
}

export default EventCreate;