import FetchRequest from "./fetchRequest";
import React from "react";
import {
    userEntityData,
    eventEntityData,
    requestEntityData,
    eventEntityClassError,
    userEntityClassError,
    requestEntityClassError,
    userEntityTextError,
    eventEntityTextError,
    requestEntityTextError,
} from "../../ts-interfaces";

    function writeToArray <T, Key extends keyof T>(arr: T, field: Key, value: any): T {
        arr[field] = value;
        return arr;
    }

    function getValueFromArrayByKey <T, Key extends keyof T>(arr: T, field: Key): any {
        return arr[field];
    }


export function submitForm <
                    T extends eventEntityClassError | requestEntityClassError | userEntityClassError,
                    U extends eventEntityTextError | requestEntityTextError | userEntityTextError,
        > (
        event: React.SyntheticEvent,
        data: {
            'data': userEntityData | eventEntityData | requestEntityData,
            'id'?: number
        },
        apiRequestLink: string,
        linkAfterCreation: string,
        basicErrorArray: () => T,
        basicTextErrorArray: () => U,
        setError:
            (value: (((prevState: T) => T) | T)) => void,
        setErrorText:
            (value: (((prevState: U) => U) | U)) => void
    )  {
    event.preventDefault();
    FetchRequest(
        JSON.stringify(data),
        "POST",
        apiRequestLink)
        .then(response => response.json())
        .then((response: {
            'status': boolean,
            'error'?:
                eventEntityClassError | requestEntityClassError | userEntityClassError
        }) => {
            if (response.status == true) {
                window.location.href = linkAfterCreation;
            } else {
                let errorArray = basicErrorArray();
                let textErrorArray = basicTextErrorArray();
                let fields = response.error as T;
                for (let field in fields) {

                    errorArray = writeToArray(errorArray, field as keyof T, 'is-invalid');
                    textErrorArray = writeToArray(
                        textErrorArray,
                        (field as string) as keyof U,
                        getValueFromArrayByKey(fields, field as keyof T)
                    );
                }
                setError(errorArray);
                setErrorText(textErrorArray)
            }
        });
}