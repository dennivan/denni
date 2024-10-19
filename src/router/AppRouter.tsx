import LazyComponent from '@components/LazyComponent';
import Loader from '@components/Loader';
import NotFound from '@components/NotFound';
import Layout from '@layout/Layout';
import { lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const routes = [
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: (
                    <LazyComponent
                        component={lazy(() => import('@pages/Home/Home'))}
                    />
                ),
            },
        ],
    },
    {
        path: '/test-loading',
        element: <Loader />,
    },
    {
        path: '*',
        element: <NotFound />,
    },
];

const router = createBrowserRouter(routes);
const AppRouter: React.FC = () => {
    return <RouterProvider router={router} />;
};
export default AppRouter;
