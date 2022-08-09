import {Route, Routes} from 'react-router-dom';
import React from 'react';
import PageDoesNotExist from "./Page/pageDoesNotExist.jsx";
import CreationPage from "./Page/CreationPage.jsx";
import PageWithDataTable from "./Page/PageWithDataTable.jsx";

function App() {
        return (
            <Routes>
                <Route path="/admin/event/create" element={<CreationPage entity={'event'}/>}/>
                <Route path={"/admin/event/:id"} element={<CreationPage entity={'event'}/>}/>
                <Route path="/admin/request/create" element={<CreationPage entity={'request'}/>}/>
                <Route path="/admin/user/create" element={<CreationPage entity={'user'}/>}/>
                <Route path="/admin" element={<PageWithDataTable entity={'user'}/>}/>
                <Route path="/admin/user" element={<PageWithDataTable entity={'user'}/>}/>
                <Route path="/admin/event" element={<PageWithDataTable entity={'event'}/>}/>
                <Route path="/admin/request" element={<PageWithDataTable entity={'request'}/>}/>
                <Route path="*" element={<PageDoesNotExist/>}/>
            </Routes>
        )
}

export default App;