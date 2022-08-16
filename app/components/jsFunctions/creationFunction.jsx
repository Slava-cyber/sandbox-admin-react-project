import FetchRequest from "./fetchRequest.jsx";

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
    FetchRequest(
        JSON.stringify(data),
        "POST",
        apiRequestLink)
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