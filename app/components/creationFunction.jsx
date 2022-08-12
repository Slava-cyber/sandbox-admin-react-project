export const submitForm = (
        event,
        data,
        apiRequestLink,
        linkAfterCreation,
        basicErrorArray,
        basicTextErrorArray,
        setError,
        setErrorText
    ) => {
    event.preventDefault();
    const requestOptions = {
        method: 'POST',
        mode: 'cors',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };
    fetch(apiRequestLink, requestOptions)
        .then(response => response.json())
        .then((response) => {
            if (response.status == true) {
                window.location.href = linkAfterCreation;
            } else {
                let errorArray = basicErrorArray();
                let textErrorArray =basicTextErrorArray();
                let fields = response.error;
                for (let field in fields)
                {
                    errorArray[field] = 'is-invalid';
                    textErrorArray[field] = response.error[field];
                }
                setError(errorArray);
                setErrorText(textErrorArray);
            }
        });
}