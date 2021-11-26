import Header from "./header";
import Main from "./main";

import Footer from "./footer";

import {BrowserRouter} from "react-router-dom";
import store from "./store/store";
import {Provider} from "react-redux";

export default function App() {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <Header/>
                <Main/>
                <Footer/>
            </Provider>
        </BrowserRouter>
    );
}
