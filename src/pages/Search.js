import React from 'react';
import Appbar from "../components/Appbar";
import SearchList from "../components/SearchList.js"
import 'bootstrap/dist/css/bootstrap.min.css';
import "../components/Appbar.js";
import "../components/SearchList.css";

function Search() {
    return (<div>
        <header>
            <Appbar />
        </header>
        <div>
            <SearchList />
        </div>
    </div>
    );
}

export default Search;