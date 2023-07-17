import { createBrowserRouter } from "react-router-dom";
import Root from "app/Root";
import { Home } from "pages/Home";


export const routeConfig = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        children: [
            {
                path: '/',
                element: <Home />,
            },
        ]
    }
])