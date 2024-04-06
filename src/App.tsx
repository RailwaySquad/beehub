import React from 'react';
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import {Home} from "./pages/Home";
import {Admin} from "./pages/Admin";
import {Login} from "./pages/Login";

import "./App.scss"
import Layout from './layouts/Layout/Layout';
import Homepage from './components/Hompage/Homepage';
import Profile from './components/Profile/Profile';
import PeoplePage from './components/People/PeoplePage';
import Searching from './components/Search/Searching';

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home/>,
    },
    {
        path: "/admin",
        element: <Admin/>,
    },
    {
        path: "/login",
        element: <Login/>,
    },
]);
const router2 = createBrowserRouter(createRoutesFromElements(
    <Route element={<Layout />}>
      <Route path='/' element={<Homepage/>} />
      <Route path='/member/profile' element={<Profile/>}/>
      <Route path='/people' element={<PeoplePage/>}/>
      <Route path='/search' element={<Searching />}/>
    </Route>
));
const App: React.FC = () => {

    return (
        <RouterProvider router={router2}/>
    );
};

export default App;