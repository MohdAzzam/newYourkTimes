import React, {useState} from "react";
import {Card, Collapse} from "react-bootstrap";
import ShowDetails from "./showDetails";

/**
 *
 * Top Story Component
 * @param item
 * @returns {JSX.Element}
 * @constructor
 */
export default function TopStroy({item}) {
    const [showDetails,setShowDetails]=useState(false);
    const [open, setOpen] = useState(false);
    const toggelDetails = () => {
      setShowDetails(!showDetails);
    }
    return (
        <div className="mt-4"
             onClick={() => setOpen(!open)}
             aria-controls="example-collapse-text"
             aria-expanded={open}
        >
            <Card className="mt-4">
                <Card.Header>
                    {item.title}
                    <Card.Subtitle className="mb-2 text-muted mt-1">{item.published_date}</Card.Subtitle>
                </Card.Header>
                <Card.Body>


                    <Collapse in={open}>
                        <div id="example-collapse-text">
                            <Card.Text>
                                {item.abstract}
                            </Card.Text>
                        </div>
                    </Collapse>
                </Card.Body>
                <Card.Footer>
                    <p>{item.byline}</p>
                    <div className="mr-4 ml-4 btn btn-success" onClick={toggelDetails}>Show Comments</div>

                    {showDetails?(
                        <ShowDetails item={item}/>
                    ):[]}
                </Card.Footer>
            </Card>
        </div>
    )
}