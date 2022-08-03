import {Route, Routes, Navigate} from 'react-router-dom';
import React, {useEffect, useState} from 'react';
import PageDoesNotExist from "./Page/pageDoesNotExist.jsx";
import UserTable from "./components/userTable.jsx";
import EventCreate from "./components/eventCreate.jsx";
import RequestCreate from "./components/requestCreate.jsx";


function App() {
        return (
            <Routes>
                <Route path="/admin/event/create" element={<EventCreate entity={'request'}/>}/>
                <Route path="/admin/request/create" element={<RequestCreate entity={'request'}/>}/>
                <Route path="/admin" element={<UserTable entity={'user'}/>}/>
                <Route path="/admin/user" element={<UserTable entity={'user'}/>}/>
                <Route path="/admin/event" element={<UserTable entity={'event'}/>}/>
                <Route path="/admin/request" element={<UserTable entity={'request'}/>}/>
                <Route path="*" element={<PageDoesNotExist/>}/>
            </Routes>
        )
}

export default App;