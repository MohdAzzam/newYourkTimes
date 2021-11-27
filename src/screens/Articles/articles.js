import React, {useEffect, useState} from "react";
import {Card} from "react-bootstrap";
import Pagination from "react-js-pagination";

import {useLocation} from "react-router-dom";
import Loading from "../../compnents/Loading";
import {useDispatch} from "react-redux";
import {errorMessage, searchQuery} from "../../store/userSlice";
import useAxios from "../../util/useAxios";

/**
 *
 * The articles screen
 * @returns {JSX.Element}
 * @constructor
 */
export default function Articles() {
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    // use our api from util
    const api = useAxios();

    // Get the queryParams from the url
    function useQuery() {
        const {search} = useLocation();

        return React.useMemo(() => new URLSearchParams(search), [search]);
    }

    const dispatch = useDispatch();
    let search = useQuery();
    // store the specific key into var
    let query = search.get("query");

    /**
     *
     * Call Api to search articles
     */
    useEffect(() => {
        // add the query to redux state to use it into last 5 search
        dispatch(searchQuery({
            query
        }))

        setIsLoading(true);
        // call the api
        api.get(`search/v2/articlesearch.json?q=${query}&page=${currentPage}`).then(response => {
            setSearchResults(response.data.response.docs);
            setIsLoading(false);

        }).catch(error => {
            dispatch(errorMessage({
                error: error
            }))
            setIsLoading(false);
        })
    }, [query, currentPage])
    // handle change in pagination
    const handleChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    }
    return (
        <section>
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
            {isLoading ? (<Loading/>) : (
                <div className="pagination-wrapper mt-4 d-flex justify-content-center">

                    <Pagination
                        activePage={currentPage}
                        itemsCountPerPage={10}
                        totalItemsCount={1000}
                        pageRangeDisplayed={5}
                        linkClass={"page-link"}
                        activeClass="active-link"
                        disabledClass="disabled-link"
                        onChange={handleChange}
                    />
                </div>
            )}
        </section>

    );
}