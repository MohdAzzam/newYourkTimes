import React, {useEffect, useState} from "react";
import {Container} from "react-bootstrap";
import Loading from "../../compnents/Loading";
import TopStroy from "./TopStroy";
import {useHistory} from "react-router-dom";
import useAxios from "../../util/useAxios";
import storage from "../../util/storage";

/**
 *
 * Home Screen
 * @returns {JSX.Element}
 * @constructor
 */
export default function Home() {

    const [topStories, setTopStories] = useState([]);
    const [category, setCategory] = useState('world');
    const [isLoading, setIsLoading] = useState(false);
    const [articlesSearch, setArticlesSearch] = useState(false);
    const categories = ['world', 'science'];
    const [lastFiveSearch,setLastFiveSearch]=useState(false);
    let history = useHistory();
    /**
     *
     * Call Api to set categories search
     */
    const api = useAxios();
    useEffect(() => {
        setIsLoading(true);
        api.get(`topstories/v2/${category}.json`).then(res => {
            // console.log("here")
            setTopStories(res.data.results)
            setIsLoading(false);
        }).catch(err => {
            console.log(err);
            setIsLoading(false);

        })
    }, [category])

    /**
     *
     * Get the last Five search from local storage
     */
    useEffect(()=>{
        setLastFiveSearch(storage.get("lastFive"));

    },[storage])

    /**
     *
     * Update the category from the select
     * @param e
     */
    const handleChange = (e) => {
        setCategory(e.target.value);
    }

    /**
     * redirect to show details
     */
    const handleSearch = () => {
        if (articlesSearch) {
            history.push(`/articles?query=${articlesSearch}`)

        }
    }

    return (
        <Container className="mt-5">
            <section className="d-flex justify-content-center mb-3">
                <h1 className="font-weight-bold">Top Stories</h1>
            </section>
            {isLoading ? (<Loading/>) : []}
            <section className="row justify-content-between">
                <div className="form-group col-5 d-flex">
                    <label className="col-5 p-0 mt-1 font-weight-bold">Select Categories</label>
                    <select onChange={handleChange} className="form-control">
                        {categories.map((category, index) =>
                            <option key={index} value={category}>{category}</option>
                        )}
                    </select>
                </div>
                <div className="form-group col-5 ">
                    <form className="d-flex search-form">
                        <label htmlFor="search" className="col-5 p-0 mt-1 font-weight-bold">Search for articles</label>
                        <img src="https://img.icons8.com/material-outlined/20/000000/search--v1.png" alt="search"
                             className="search" onClick={handleSearch}/>
                        <input type="text" className="form-control "
                               onChange={(e) => setArticlesSearch(e.target.value)}/>
                    </form>

                </div>
            </section>
            {lastFiveSearch?(
                <div className="mt-4 mb-4 col-4">
                    <h4>Last 5 Search</h4>
                    <ul className="list-group">
                    {lastFiveSearch && lastFiveSearch.map((item, index) => (
                            <li className={index===0?"list-group-item d-flex justify-content-between align-items-center active":"list-group-item d-flex justify-content-between align-items-center"} key={index}>
                                {item.query}
                                <span className="badge badge-primary badge-pill">{index+1}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            ):[]}

            <section className={isLoading ? "hold-body articles-sections" : 'articles-sections'}>
                {topStories.map((item, index) => (
                    <TopStroy item={item} key={index}/>
                ))}
            </section>

        </Container>
    )
}