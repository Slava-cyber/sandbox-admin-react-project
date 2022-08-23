import React from "react";

interface links {
    classLi?: string,
    link: string,
    classA?: string,
    active?: string,
    title: string
}

function ListLinksHtml(props: links){
    return (
        <li className={props.classLi}>
            <a href={props.link} className={props.classA + " " + props.active}>{props.title}
            </a>
        </li>
    )
}

export default ListLinksHtml;