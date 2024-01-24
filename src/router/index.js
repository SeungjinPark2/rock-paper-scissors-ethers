import { Navigate, Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Game from '../pages/main/game';
import MetaMaskConnector from '../pages/metamask';
import MainPage from '../pages/main/mainPage';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<MetaMaskConnector />}>
            <Route index element={<Navigate to="main" replace />} />
            <Route path='main' element={<MainPage />} />
            <Route path='in-game/:address' element={<Game />}/>
        </Route>
    )
);

export default router;