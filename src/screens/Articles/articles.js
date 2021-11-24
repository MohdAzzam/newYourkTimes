import React, {useEffect, useState} from "react";
import {Card, Pagination} from "react-bootstrap";
import {useLocation} from "react-router-dom";
import {TopStoriesHelper} from "../../api/helpers/TopStoriesHelper";
import Loading from "../../compnents/Loading";
import {useDispatch} from "react-redux";
import {searchQuery} from "../../store/userSlice";

export default function Articles() {
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);

    function useQuery() {
        const {search} = useLocation();

        return React.useMemo(() => new URLSearchParams(search), [search]);
    }

    const dispatch = useDispatch();
    let search = useQuery();
    let query = search.get("query");

    /**
     *
     * Call Api to search articles
     */

    useEffect(() => {
        dispatch(searchQuery({
            query
        }))
        setIsLoading(true);

        TopStoriesHelper.search(query, currentPage).then(response => {
            setSearchResults(response.data.response.docs);
            setIsLoading(false);
        }).catch(err => {
            console.log(err);
            setIsLoading(false);

        })

    }, [query, currentPage])
    const handlePrevChange = () => {
        if (currentPage !== 0) {
            setCurrentPage(currentPage - 1);
        }
    }
    const handleNextChange = () => {
        if (currentPage >= 0) {
            setCurrentPage(currentPage + 1);
        }
    }
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
            <div className="pagination-wrapper mt-4 d-flex justify-content-center">
                <p className="btn btn-primary" onClick={handlePrevChange}>Prev</p>
                <p className="mr-1 ml-1 mb-1">{currentPage + 1}</p>
                <p className="btn btn-primary" onClick={handleNextChange}>Next</p>
            </div>

        </section>

    );
}