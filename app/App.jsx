import {Route, Routes} from 'react-router-dom';
import React from 'react';
import PageDoesNotExist from "./Page/pageDoesNotExist.jsx";
import UserTable from "./components/userTable.jsx";
import EventTable from "./components/eventTable.jsx";
import RequestTable from "./components/requestTable.jsx";

function App() {
    return (
        <Routes>
            <Route path="/admin" element={<UserTable/>}/>
            <Route path="/admin/user" element={<UserTable/>}/>
            <Route path="/admin/event" element={<EventTable/>}/>
            <Route path="/admin/request" element={<RequestTable/>}/>
            <Route path="*" element={<PageDoesNotExist/>}/>
        </Routes>
    )
}

export default App;