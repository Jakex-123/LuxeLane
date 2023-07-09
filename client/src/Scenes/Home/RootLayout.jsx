import { Outlet } from "react-router-dom";
import { Provider } from "react-redux";
import Store from "../../state/store";
import Navbar from "../Global/Navbar";
import CartMenu from "../Global/CartMenu";

const ScrollToTop = () => {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0)

    }, [pathname])
}

function RootLayout() {
    return (
        <>
            <Provider store={Store}>
                <Navbar />
                <CartMenu />
                <main>
                    <Outlet />
                </main>
            </Provider>
        </>
    )
}

export default RootLayout