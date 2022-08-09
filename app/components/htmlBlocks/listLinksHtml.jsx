import React from "react";

function ListLinksHtml(props){
    return (
        <li className={props.classLi}>
            <a href={props.link} className={props.classA + " " + props.active}
               aria-current="main">{props.title}
            </a>
        </li>
    )
}

export default ListLinksHtml;