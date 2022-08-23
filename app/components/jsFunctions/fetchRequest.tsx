import React from 'react';

export default function FetchRequest(body: any, type : string, link : string) {
    let requestOptions: {mode: RequestMode, headers: {Accept: string, "Content-Type": string}, method: string, body: any} = {
        method: type,
        mode: "cors",
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: body
    };
    return fetch(link, requestOptions);
}