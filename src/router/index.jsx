import { createHashRouter } from "react-router-dom"
import Home from "../pages/Home"
import Products from "../pages/Products"
import FrontLayout from "../layout/FrontLayout"
import ProductDetail from "../pages/ProductDetail"
import Cart from "../pages/Cart"
import NotFound from "../pages/NotFound"
import AboutPage from "../pages/AboutPage"
import SotriesPage from "../pages/StoriesPage"
import FAQ from "../pages/FAQ"
import LoginPage from "../pages/LoginPage"
import AdminPage from "../pages/admin/AdminPage"
import AdminProducePage from "../pages/admin/AdminProductPage"

const router = createHashRouter([
    {
        path: '/',
        element: <FrontLayout />,
        children: [
            {
                path: '',
                element: <Home />
            },
            {
                path: 'products',
                element: <Products />,
            },
            {
                path: 'products/:id',
                element: <ProductDetail />
            },
            {
                path: 'cart',
                element: <Cart />
            },
            {
                path: 'about',
                element: <AboutPage />
            },
            {
                path: 'stories',
                element: <SotriesPage />
            },
            {
                path: 'faq',
                element: <FAQ />
            }
        ]
    },
    {
        path: '*',
        element: <NotFound />
    },
    {
        path: 'login',
        element: <LoginPage />
    },
    {
        path: 'admin',
        element: <AdminPage />,
        children : [
            {
                index :true,
                element: <AdminProducePage />
            }
        ]
    }
])

export default router