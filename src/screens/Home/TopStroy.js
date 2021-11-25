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
                <Card.Header>
                    {item.title}
                    <Card.Subtitle className="mb-2 text-muted mt-1">{item.published_date}</Card.Subtitle>
                </Card.Header>
                <Card.Body>
                    <Card.Text>
                        {item.abstract}
                    </Card.Text>
                    <div className="btn btn-light" onClick={toggelDetails}>Show</div>
                    {showDetails?(
                        <ShowDetails item={item}/>
                    ):[]}

                </Card.Body>
                <Card.Footer>
                    {item.byline}
                </Card.Footer>
            </Card>
        </div>
    )
}