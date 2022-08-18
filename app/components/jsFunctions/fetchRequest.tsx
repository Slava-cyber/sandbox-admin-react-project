import React from 'react';

export default function FetchRequest(body, type, link) {
    let requestOptions = {
        method: type,
        mode: 'cors',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: body
    };
    return fetch(link, requestOptions);
}