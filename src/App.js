import React from 'react';
import './App.css';


// import Main from "./views/main/Main";
import {Provider} from "react-redux";
import store from "./redux/store";
import Views from "./components/views/Views";

function App() {
    return (
        <Provider store={store}>
                <Views />
        </Provider>
    );
}

export default App;
