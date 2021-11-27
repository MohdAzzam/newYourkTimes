import React, {useEffect, useState} from "react";
import {TopStoriesHelper} from "../../api/helpers/TopStoriesHelper";

/**
 * Show Comment Component
 * @param item
 * @returns {JSX.Element}
 * @constructor
 */
export default function ShowDetails({item}){
    const [comments,setComments]=useState(false);
    /**
     *
     * When I try to use the comment api from nyTimes the give me Cors error
     */
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