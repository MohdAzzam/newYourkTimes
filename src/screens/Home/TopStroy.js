import React, {useState} from "react";
import {Card} from "react-bootstrap";
import ShowDetails from "./showDetails";

export default function TopStroy({item}) {
    const [showDetails,setShowDetails]=useState(false);
    const toggelDetails = () => {
      setShowDetails(!showDetails);
    }
    return (
        <div className="mt-4">
            <Card className="mt-4">
                <Card.Body>
                    <Card.Title>{item.section}</Card.Title>
                    <Card.Text>
                        {item.title}
                    </Card.Text>
                    <div className="btn btn-light" onClick={toggelDetails}>Show</div>
                    {showDetails?(
                        <ShowDetails item={item}/>
                    ):[]}

                </Card.Body>
            </Card>
        </div>
    )
}