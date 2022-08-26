import {Route, Routes} from 'react-router-dom';
import React, {useEffect, useState} from 'react';
import PageDoesNotExist from "./page/pageDoesNotExist";
import CreationPage from "./page/creationPage";
import PageWithDataTable from "./page/pageWithDataTable";
import FetchRequest from "./components/jsFunctions/fetchRequest";
import LoadingPage from "./page/loadingPage";


function App() {
    const [adminStatus, setAdminStatus] = useState('loading');
    useEffect(() => {
        FetchRequest(
            JSON.stringify(
                []
            ),
            "POST",
            '/userApiCheckAdminRights'
        )
            .then(response => response.json())
            .then((data) => {
                    setAdminStatus(data.status);
                });
    }, []);

    if (adminStatus === 'loading') {
     return (
         <LoadingPage/>
     );
    } else if (adminStatus === 'success') {
        return (
            <Routes>
                <Route path="/admin/event/create"
                       element={<CreationPage entity={'event'} title={"Создать ивент"}/>}/>
                <Route path={"/admin/event/:id"}
                       element={<CreationPage entity={'event'} title={"Редактировать ивент"}/>}/>
                <Route path="/admin/request/create"
                       element={<CreationPage entity={'request'} title={"Создать запрос"}/>}/>
                <Route path="/admin/user/create"
                       element={<CreationPage entity={'user'} title={"Создать пользователя"}/>}/>
                <Route path="/admin" element={<PageWithDataTable entity={'user'} title={"Список пользователей"}/>}/>
                <Route path="/admin/user"
                       element={<PageWithDataTable entity={'user'} title={"Список пользователей"}/>}/>
                <Route path="/admin/event"
                       element={<PageWithDataTable entity={'event'} title={"Список ивентов"}/>}/>
                <Route path="/admin/request"
                       element={<PageWithDataTable entity={'request'} title={"Список запросов"}/>}/>
                <Route path="*" element={<PageDoesNotExist/>}/>
            </Routes>
        );
    } else {
        return (
            <Routes>
                <Route path="*" element={<PageDoesNotExist/>}/>
            </Routes>
        )
    }
}

export default App;