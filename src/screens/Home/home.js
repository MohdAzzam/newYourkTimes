import React, {useEffect, useState} from "react";
import {Container} from "react-bootstrap";
import Loading from "../../compnents/Loading";
import {TopStoriesHelper} from "../../api/helpers/TopStoriesHelper";
import TopStroy from "./TopStroy";
import {useNavigate} from "react-router-dom";
import {authHelper} from "../../api/helpers/AuthHelper";
import {login} from "../../store/userSlice";
import {useDispatch} from "react-redux";
import store from "../../store/store"
import jwt_decode from "jwt-decode";

export default function Home() {
    const [topStories, setTopStories] = useState([]);
    const [category, setCategory] = useState('world');
    const [isLoading, setIsLoading] = useState(false);
    const [articlesSearch,setArticlesSearch]=useState(false);
    const categories = ['world', 'science'];
    let navigate = useNavigate();
    const state = store.getState();
    // const [user,setUSer]=useState(state.user?.user.token);
    /**
     *
     * Call Api to set categories search
     */
    useEffect(() => {
        setIsLoading(true);
        TopStoriesHelper.list(category).then(response => {
            setTopStories(response.data.results)
            setIsLoading(false);
        }).catch(err => {
            console.log(err);
            setIsLoading(false);

        })
    }, [category])



    const handleChange = (e) => {
        setCategory(e.target.value);
    }


    const handleSearch = () =>{
     if(articlesSearch) {
            navigate(`/articles?query=${articlesSearch}`)

        }
}
const dispatch=useDispatch();

    /**
     * update Token every 15 minutes
     */
    useEffect(()=>{
    const updateToken = 1000*60*1;
    const authToken=1000;
    let interval =setInterval(()=>{
     console.log('inside interval ')
        authHelper.login(jwt_decode(state.user.user.token)).then(res=>{
            console.log(res.data);
            localStorage.setItem("authUser",JSON.stringify(res.data));
            dispatch(login({
                token:res.data.access_token,
            }))

        }).catch(err=>{
            console.log(err);
        })
    },updateToken)
    return ()=>clearInterval(interval);
},[])
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
                        <input type="text" className="form-control " onChange={(e) => setArticlesSearch(e.target.value)}/>
                    </form>

                </div>
            </section>
            <section className={isLoading ? "hold-body articles-sections" : 'articles-sections'}>
                {topStories.map((item, index) => (
                    <TopStroy item={item} key={index}/>
                ))}
            </section>

        </Container>
    )
}