import './styles/App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import HomePage from './components/HomePage';
import Book from './components/Book';
import PresentBook from './components/PresentBook';
import Search from '../src/components/Search';
import UpdateUser from '../src/components/UpdateUser';
import DailyBook from './components/DailyBook';
import Chapter from './components/Chapter';
import AboutUs from './components/AboutUs ';
import PrivacyPolicy from './components/PrivacyPolicy';
import Layout from './components/Layout'
import NoNavLayout from './components/NoNavLayout';

const router = createBrowserRouter([
  {
    path: "/",
    element: <NoNavLayout />, 
    children: [
      { index: true, element: <Login  replace /> }, //default to login
      { path: "/Login", element: <Login /> },
      { path: "/Signup", element: <Signup /> },
    ],
  },
  {
    path: "/",
    //All children live in a permanent structure.
    element: <Layout />, 
    children: [
      { path: "/HomePage", element: <HomePage /> },
      { path: "/Book", element: <Book /> },
      { path: "/PresentBook", element: <PresentBook /> },
      { path: "/Search", element: <Search /> },
      { path: "/UpdateUser", element: <UpdateUser /> },
      { path: "/DailyBook", element: <DailyBook /> },
      { path: "/Chapter", element: <Chapter /> },
      { path: "/AboutUs", element: <AboutUs />} ,
      { path: "/PrivacyPolicy", element: <PrivacyPolicy/>}
    ],
  },
]);

function App() {
  return(
   <RouterProvider router={router} />
  );
}

export default App
