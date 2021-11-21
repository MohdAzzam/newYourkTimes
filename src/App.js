import Header from "./header";
import Main from "./main";

import Footer from "./footer";

import {BrowserRouter as Router} from "react-router-dom";

export default function App() {
    return (
        <Router>
            <Header/>
            <Main/>
            <Footer/>
        </Router>
    );
}
