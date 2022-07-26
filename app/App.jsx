import {Route, Routes} from 'react-router-dom';
import React from 'react';
import Header from "./components/header.jsx";
import Article from "./components/article.jsx";
import PageDoesNotExist from "./Page/pageDoesNotExist.jsx";
import UserTable from "./components/userTable.jsx";
import EventTable from "./components/eventTable.jsx";
import RequestTable from "./components/requestTable.jsx";

function App() {
    return (
        <Routes>
            <Route path="/admin" element={<Header/>}/>
            <Route path="/admin/user" element={<UserTable/>}/>
            <Route path="/admin/event" element={<EventTable/>}/>
            <Route path="/admin/request" element={<RequestTable/>}/>
            <Route path="/admin/test" element={<Article/>}/>
            <Route path="*" element={<PageDoesNotExist/>}/>
        </Routes>
    )
}

export default App;