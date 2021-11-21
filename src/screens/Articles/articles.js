import React, {useEffect, useState} from "react";
import {Card} from "react-bootstrap";
import {useLocation} from "react-router-dom";
import {TopStoriesHelper} from "../../api/helpers/TopStoriesHelper";
import Loading from "../../compnents/Loading";

export default function Articles() {
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading,setIsLoading]=useState(false);
    function useQuery() {
        const {search} = useLocation();

        return React.useMemo(() => new URLSearchParams(search), [search]);
    }

    let search = useQuery();
    let query = search.get("query");
    /**
     *
     * Call Api to search articles
     */
    useEffect(() => {
            setIsLoading(true);
            TopStoriesHelper.search(query).then(response => {
                setSearchResults(response.data.response.docs);
                setIsLoading(false);
            }).catch(err => {
                console.log(err);
                setIsLoading(false);

            })

    }, [query])
    return (
        <section>
            {isLoading ? (<Loading/>) : []}
            {searchResults.map((item, index) => (
                <Card className="mt-4" key={index}>
                    <Card.Body>
                        <Card.Title>{item.abstract}</Card.Title>
                        <Card.Text>
                            {item.headline.main}
                        </Card.Text>
                    </Card.Body>
                </Card>
            ))}

        </section>

    );
}