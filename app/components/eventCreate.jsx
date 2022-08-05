import React, {useEffect, useState} from 'react';
import FormSubmitButton from "./htmlBlocks/formSubmitButton.jsx";
import Select from "./htmlBlocks/select.jsx";
import Textarea from "./htmlBlocks/textarea.jsx";
import Input from "./htmlBlocks/input.jsx";

function EventCreate(props) {

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

    const options = ["Активный отдых", " Cпорт", " Квесты/настольные игры", " Ночная жизнь", " Охота/рыбалка", " Туризм", " Другое"];

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

    const submitForm = event => {
        event.preventDefault();
        const requestOptions = {
            method: 'POST',
            mode: 'cors',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify (
                {
                    'data' : eventData
                }
            )
        };
        fetch('/EventCreateApi', requestOptions)
            .then(response => response.json())
            .then((response) => {
                if (response.status == true) {
                    window.location.href = '/admin/event';
                } else {
                    var errorArray = basicErrorArray();
                    var textErrorArray =basicTextErrorArray();
                    var fields = response.error;
                    for (var field in fields)
                    {
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
                    <form method="POST" action="/login" name="eventAdd" id="eventAdd" onSubmit={submitForm}>
                        <h3 className="text-center mb-5">Форма создания ивента</h3>
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
                                <Select options = {options} class={error.category} id={"category"}
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