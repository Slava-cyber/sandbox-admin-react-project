import React, {useEffect, useState} from 'react';

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
                    <div className="form-group py-2">
                        <input type="text" name="title" className={"form-control " + error.title} placeholder="Заголовок" id="title"
                               value={eventData.title} onChange={changeInputField}/>
                            <small id="titleHelp" className="form-text form-muted">{errorText.title}</small>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group py-2">
                            <input type="text" name="town" className={"form-control " + error.town} id="town" placeholder="Город"
                                   value={eventData.town} onChange={changeInputField}/>
                                <small id="townHelp" className="form-text form-muted">{errorText.town}</small>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group py-2">
                            <input type="datetime-local" name="datetime" className={"form-control " + error.datetime} id="datetime"
                                   value={eventData.datetime} onChange={changeInputField}/>
                                <small id="datetimeHelp" className="form-text form-muted">{errorText.datetime}</small>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group py-2">
                            <select className={"form-select form-control " + error.category} name="category" id="category" onChange={changeInputField}>
                                <option value=" Активный отдых">
                                    Активный отдых
                                </option>
                                <option value=" Cпорт">
                                    Cпорт
                                </option>
                                <option value=" Квесты/настольные игры">
                                    Квесты/настольные игры
                                </option>
                                <option value=" Ночная жизнь">
                                    Ночная жизнь
                                </option>
                                <option value=" Охота/рыбалка">
                                    Охота/рыбалка
                                </option>
                                <option value=" Туризм">
                                    Туризм
                                </option>
                                <option value=" Другое">
                                    Другое
                                </option>
                            </select>
                            <small id=" categoryHelp" className=" form-text form-muted">{errorText.category}</small>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group py-2">
                            <input type="text" name="author" className={"form-control " + error.author} id="author"
                                   value={eventData.author} onChange={changeInputField} placeholder="Автор поста"/>
                            <small id="authorHelp" className="form-text form-muted">{errorText.author}</small>
                        </div>
                    </div>
                    <div className=" col-md-12">
                        <div className=" form-group py-2">
                        <textarea className={"form-control " + error.description} id=" description" rows="5" name="description" placeholder="Описание
                        ивента" value={eventData.description} onChange={changeInputField}>
                    </textarea>
                            <small id="interestHelp" className="form-text form-muted">{errorText.description}</small>
                        </div>
                    </div>
                </div>
                <div className="row">
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
    );
}

export default EventCreate;