import React, {useEffect, useState} from 'react';

import {submitForm} from "./jsFunctions/creationFunction";
import FetchRequest from "./jsFunctions/fetchRequest";

import FormSubmitButton from "./htmlBlocks/formSubmitButton";

import {userEntityTextError, userEntityData, userEntityClassError} from "../ts-interfaces";
import GetSectionOfForm from "./htmlBlocks/wrappers/getSectionOfForm";

function UserCreate() {
    const [image, setImage] = useState("/images/system/avatar_null.jpg");
    const [userData, setUserData] = useState<userEntityData>(() => {
        return {
            name: "",
            surname: "",
            town: "",
            date_of_birth: null,
            login_sign_up: "",
            sex: "Мужской",
            password_sign_up: "",
            password_confirm: "",
            phone_number: "",
            email: "",
            interest: "",
            description: "",
            path_image: "",
        }
    });

    const options = ["Мужской", "Женский"];

    const [error, setError] = useState<userEntityClassError>(() => {
        return {
            name: "",
            surname: "",
            town: "",
            date_of_birth: "",
            login_sign_up: "",
            login: "",
            sex: "",
            password_sign_up: "",
            password_confirm: "",
            phone_number: "",
            email: "",
            interest: "",
            description: "",
        }
    })
    const [errorText, setErrorText] = useState<userEntityTextError>(() => {
        return {
            name: "",
            surname: "",
            town: "",
            date_of_birth: "Укажите дату рождения",
            login_sign_up: "",
            login: "",
            sex: "Укажите пол",
            password_sign_up: "",
            password_confirm: "",
            phone_number: "",
            email: "",
            interest: "",
            description: "",
            image: "",
        }
    })

    const changeImage = (event: React.SyntheticEvent) => {
        event.persist()
        var image = (event.target as HTMLInputElement).files[0];
        let data = {
            'form' : 'image',
        };
        var json_arr = JSON.stringify(data);
        var formData = new FormData();
        formData.append("all", json_arr);
        formData.append("userfile", image);
        fetch('/validation', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then((response) => {
                if (response.status == true) {
                    setImage(response.error.avatar);
                    setUserData(prev => {
                        return {
                            ...prev,
                            path_image: response.error.avatar,
                        }
                    })
                    setErrorText(prev => {
                        return {
                            ...prev,
                            image: "",
                        }
                    })
                } else {
                    setErrorText(prev => {
                        return {
                            ...prev,
                            image: response.error.avatar,
                        }
                    })
                }
            });
    }


    const changeInputField = (event: React.SyntheticEvent) => {
        event.persist()
        setUserData(prev => {
            return {
                ...prev,
                [(event.target as HTMLInputElement).name]: (event.target as HTMLInputElement).value,
            }
        })
    }

    const basicErrorArray = (): userEntityClassError => {
        return {
            name: "is-valid",
            surname: "is-valid",
            town: "is-valid",
            date_of_birth: "is-valid",
            login_sign_up: "is-valid",
            login: "is-valid",
            sex: "is-valid",
            password_sign_up: "is-valid",
            password_confirm: "is-valid",
            phone_number: "is-valid",
            email: "is-valid",
            interest: "is-valid",
            description: "is-valid",
        };
    }

    const basicTextErrorArray = (): userEntityTextError => {
        return {
            name: "",
            surname: "",
            town: "",
            date_of_birth: "",
            login_sign_up: "",
            login: "",
            sex: "",
            password_sign_up: "",
            password_confirm: "",
            phone_number: "",
            email: "",
            interest: "",
            description: "",
            image: "",
        };
    }

    let formFiller = {
        'method': 'POST',
        'action': '/login',
        'name': 'eventAdd',
        'onSubmit': (event: any) => {submitForm(
            event,
            data,
            apiRequestLink,
            linkAfterCreation,
            basicErrorArray,
            basicTextErrorArray,
            setError,
            setErrorText
        )},
        'title': 'Форма создания пользователя',
        'fieldChangingFunction': changeInputField,
        'fieldBlock': [
            {
                'type': 'separator',
                'title': 'Основная информация',
                'fields': [
                    {
                        'typeComponent': 'input',
                        'type': 'text',
                        'placeholder': 'Имя',
                        'class': error.name,
                        'id': 'name',
                        'value': userData.name,
                        'errorText': errorText.name,
                    },
                    {
                        'typeComponent': 'input',
                        'type': 'text',
                        'placeholder': 'Фамилия',
                        'class': error.surname,
                        'id': 'surname',
                        'value': userData.surname,
                        'errorText': errorText.surname,
                    },
                    {
                        'typeComponent': 'input',
                        'type': 'date',
                        'placeholder': 'Выберите дату рождения',
                        'class': error.date_of_birth,
                        'id': 'date_of_birth',
                        'value': userData.date_of_birth,
                        'errorText': errorText.date_of_birth,
                    },
                    {
                        'typeComponent': 'select',
                        'options': options,
                        'placeholder': 'Фамилия',
                        'class': error.sex,
                        'id': 'sex',
                        'value': userData.sex,
                        'selected': '',
                        'errorText': errorText.sex,
                    },
                    {
                        'typeComponent': 'input',
                        'type': 'text',
                        'placeholder': 'Логин',
                        'class': error.login_sign_up,
                        'id': 'login_sign_up',
                        'value': userData.login_sign_up,
                        'errorText': errorText.login_sign_up,
                    },
                    {
                        'typeComponent': 'input',
                        'type': 'text',
                        'placeholder': 'Город',
                        'class': error.town,
                        'id': 'town',
                        'value': userData.town,
                        'errorText': errorText.town,
                    },
                    {
                        'typeComponent': 'input',
                        'type': 'password',
                        'placeholder': 'Пароль',
                        'class': error.password_sign_up,
                        'id': 'password_sign_up',
                        'value': userData.password_sign_up,
                        'errorText': errorText.password_sign_up,
                    },
                    {
                        'typeComponent': 'input',
                        'type': 'password',
                        'placeholder': 'Подтвердите пароль',
                        'class': error.password_confirm,
                        'id': 'password_confirm',
                        'value': userData.password_confirm,
                        'errorText': errorText.password_confirm,
                    }
                ]
            },
            {
                'type': 'separator',
                'title': 'Контакты',
                'fields': [
                    {
                        'typeComponent': 'input',
                        'type': 'text',
                        'placeholder': 'Введите номер телефона',
                        'class': error.phone_number,
                        'id': 'phone_number',
                        'value': userData.phone_number,
                        'errorText': errorText.phone_number,
                    },
                    {
                        'typeComponent': 'input',
                        'type': 'email',
                        'placeholder': 'Введите email',
                        'class': error.email,
                        'id': 'email',
                        'value': userData.email,
                        'errorText': errorText.email,
                    }
               ]
            },
            {
                'type': 'separator',
                'title': 'Личная информация',
                'fields': [
                    {
                        'typeComponent': 'textarea',
                        'rows': 3,
                        'placeholder': 'Интересы',
                        'class': error.interest,
                        'id': 'interest',
                        'value': userData.interest,
                        'errorText': errorText.interest,
                    },
                    {
                        'typeComponent': 'textarea',
                        'rows': 5,
                        'type': 'email',
                        'placeholder': 'О себе',
                        'class': error.description,
                        'id': 'description',
                        'value': userData.description,
                        'errorText': errorText.description,
                    }
                ]
            }
        ]
    };




    let data = {
        'data' : userData,
    };

    let linkAfterCreation = '/admin/user'
    let apiRequestLink = '/UserCreateApi';

    return (
        <>
            <div className="row justify-content-center">
                <div className="col-sm-12 bg-white p-3 col-md-10">
                    <form method={formFiller.method} action={formFiller.action} name={formFiller.name} id={formFiller.name}
                          onSubmit={formFiller.onSubmit}>
                        <h3 className="text-center mb-1">{formFiller.title}</h3>
                        <div className="row justify-content-center">
                            <div className="col-md-5">
                                <div className="d-flex flex-column align-items-center text-center py-5">
                                    <div className="profile-img">
                                        <img className="rounded-circle image" id="image"
                                             src={image}
                                             width="200px" alt=""/>
                                        <div className="file_item form-group">
                                            <small id="nameHelp" className="form-text form-muted error">{errorText.image}</small>
                                            <input type="file" accept=".jpg, .png" id="avatar" name="file"
                                                   className="file_input" onChange={changeImage}/>
                                                <div className="file_button">Загрузить фотографию</div>
                                                <input type="hidden" name="path_image" id="path_image"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {formFiller.fieldBlock.map(fieldSet => (
                                <GetSectionOfForm options={fieldSet} fieldChangingFunction= {changeInputField}/>
                            ))}
                        <FormSubmitButton/>
                    </form>
                </div>
            </div>
        </>
    );
}

export default UserCreate;