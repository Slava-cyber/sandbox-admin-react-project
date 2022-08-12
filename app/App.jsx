import {Route, Routes} from 'react-router-dom';
import React from 'react';
import PageDoesNotExist from "./Page/pageDoesNotExist.jsx";
import CreationPage from "./Page/CreationPage.jsx";
import PageWithDataTable from "./Page/PageWithDataTable.jsx";

function App() {
        return (
            <Routes>
                <Route path="/admin/event/create" element={<CreationPage entity={'event'} title={"Создать ивент"}/>}/>
                <Route path={"/admin/event/:id"} element={<CreationPage entity={'event'} title={"Редактировать ивент"}/>}/>
                <Route path="/admin/request/create" element={<CreationPage entity={'request'} title={"Создать запрос"}/>}/>
                <Route path="/admin/user/create" element={<CreationPage entity={'user'} title={"Создать пользователя"}/>}/>
                <Route path="/admin" element={<PageWithDataTable entity={'user'} title={"Список пользователей"}/>}/>
                <Route path="/admin/user" element={<PageWithDataTable entity={'user'} title={"Список пользователей"}/>}/>
                <Route path="/admin/event" element={<PageWithDataTable entity={'event'} title={"Список ивентов"}/>}/>
                <Route path="/admin/request" element={<PageWithDataTable entity={'request'} title={"Список запросов"}/>}/>
                <Route path="*" element={<PageDoesNotExist/>}/>
            </Routes>
        )
}

export default App;