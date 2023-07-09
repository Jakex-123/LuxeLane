import './App.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import ItemDetails from './Scenes/ItemDetails/ItemDetails.jsx'
import Checkout from './Scenes/Checkout/Checkout.jsx'
import Confirmation from './Scenes/Checkout/Confirmation.jsx'
import Navbar from './Scenes/Global/Navbar.jsx';
import RootLayout from './Scenes/Home/RootLayout';
import Home from './Scenes/Home/Home'

const router = createBrowserRouter(createRoutesFromElements(
  // {
  //   path: '/',
  //   element: <RootLayout />
  // },
  // {
  //   path: 'item/:itemId',
  //   element: <ItemDetails />
  // },
  // {
  //   path: 'checkout',
  //   element: <Checkout />
  // },
  // {
  //   path: 'checkout/success',
  //   element: <Confirmation />
  // }
  <Route path='/' element={<RootLayout />}>
    <Route index element={<Home />} />
    <Route path='checkout' element={<Checkout />} />
    <Route path='item/:itemId' element={<ItemDetails />} />
    <Route path='checkout/success' element={<Confirmation />} />
  </Route>

))


function App() {


  return (
    <div className='app'>
      <RouterProvider router={router}>
        <Navbar />
      </RouterProvider>
    </div>
  )
}

export default App
