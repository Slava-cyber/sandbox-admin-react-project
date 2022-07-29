import {Route, Routes} from 'react-router-dom';
import React from 'react';
import PageDoesNotExist from "./Page/pageDoesNotExist.jsx";
import UserTable from "./components/userTable.jsx";
import EventTable from "./components/eventTable.jsx";
import RequestTable from "./components/requestTable.jsx";

function App() {
    return (
        <Routes>
            <Route path="/admin" element={<UserTable entity={'user'}/>}/>
            <Route path="/admin/user" element={<UserTable entity={'user'}/>}/>
            <Route path="/admin/event" element={<UserTable entity={'event'}/>}/>
            <Route path="/admin/request" element={<UserTable entity={'request'}/>}/>
            <Route path="*" element={<PageDoesNotExist/>}/>
        </Routes>
    )
}

export default App;