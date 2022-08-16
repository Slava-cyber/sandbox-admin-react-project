import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import FormSubmitButton from "./htmlBlocks/formSubmitButton.jsx";
import Select from "./htmlBlocks/select.jsx";
import InputMui from "./htmlBlocks/inputMui.jsx";
import SelectMui from "./htmlBlocks/selectMui.jsx"

import {submitForm} from "./creationFunction.jsx";
import { ThemeProvider } from "@material-ui/core/styles";
import createdTheme from './customStyleForMuiComponents/createdTheme.jsx';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

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
        //event.persist()
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
            <Box m={5} p={5}>
                <Grid container justifyContent="center"
                      alignItems="center">
                    <Grid item md={10}>
                            <form onSubmit={(event) => {submitForm(
                                      event,
                                      data,
                                      apiRequestLink,
                                      linkAfterCreation,
                                      basicErrorArray,
                                      basicTextErrorArray,
                                      setError,
                                      setErrorText
                                  )}}>
                                <Box display={"flex"} justifyContent={"center"} mb={3}>
                                    <h3>Форма создания ивента</h3>
                                </Box>

                                <Grid container rowSpacing={2} columnSpacing={3}>
                                    <Grid item xs={12} md={12}>
                                        <input type={'hidden'} placeholder={''} className = {''}
                                               id={"id"} value = {id}/>
                                    </Grid>
                                    <Grid item xs={12} md={12}>
                                        <InputMui type={'text'} placeholder={'Заголовок'} class = {error.title}
                                               id={"title"} value = {eventData.title}
                                               errorText = {errorText.title} change={(event) => {changeInputField(event)}} />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <InputMui type={'text'} placeholder={'Город'} class = {error.town}
                                               id={"town"} value = {eventData.town}
                                               errorText = {errorText.town} change={(event) => {changeInputField(event)}} />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <InputMui type={'datetime-local'} class = {error.datetime}
                                                     id={"datetime"} value = {eventData.datetime}
                                                     errorText = {errorText.datetime} change={(event) => {changeInputField(event)}}/>

                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <SelectMui options = {options} class={error.category} id={"category"} value={eventData.category}
                                                errorText = {errorText.category}
                                                change = {(event) => {changeInputField(event)}}/>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <InputMui type={'text'} placeholder={'Автор поста'} class = {error.author}
                                               id={"author"} value = {eventData.author}
                                               errorText = {errorText.author} change={(event) => {changeInputField(event)}} />
                                    </Grid>
                                    <Grid item xs={12} md={12}>
                                        <InputMui type={'text'} class={error.description} id={"description"} placeholder={"Описание ивента"}
                                                  value={eventData.description} errorText={errorText.description} rows={5}
                                                  change = {(event) => {changeInputField(event)}}/>
                                    </Grid>
                                </Grid>
                                <Box m={3}>
                                    <ThemeProvider theme={createdTheme}>
                                        <FormSubmitButton/>
                                    </ThemeProvider>
                                </Box>
                            </form>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}

export default EventCreate;