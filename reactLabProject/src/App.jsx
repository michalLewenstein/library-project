
import './App.css'
import Login from '../src/components/Login';
import HomePage from '../src/components/HomePage'
import Signup from './components/Signup';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Book from './components/Book'
import PresentBook from './components/PresentBook'
import Layout from './components/Layout '
import Search from '../src/components/Search'
import UpdateUser from '../src/components/UpdateUser'
import DailyBook from './components/DailyBook';
import Chapter from './components/Chapter';
import NoNavLayout from './components/NoNavLayout';
import AboutUs from './components/AboutUs '
import PrivacyPolicy from './components/PrivacyPolicy '

const router = createBrowserRouter([
  {
    path: "/",
    element: <NoNavLayout />, // Layout בלי Navbar ו-Footer
    children: [
      { index: true, element: <Login  replace /> }, // הפניה ל-Login כברירת מחדל
      { path: "/Login", element: <Login /> },
      { path: "/Signup", element: <Signup /> },
    ],
  },
  {
    path: "/",
    element: <Layout />, // Layout עם Navbar ו-Footer
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
