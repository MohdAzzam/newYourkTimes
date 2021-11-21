import React, {useEffect, useState} from "react";
import {TopStoriesHelper} from "../../api/helpers/TopStoriesHelper";


export default function ShowDetails({item}){
    const [comments,setComments]=useState(false);
    console.log(item);
    useEffect(()=>{
        TopStoriesHelper.comments(item.url).then(response=>{
            console.log(response);
        }).catch(err=>{
            console.log("ddd");
        })
    },[item])
    return (
        <section>
            <h3>{item.url}</h3>
        </section>
    )
}