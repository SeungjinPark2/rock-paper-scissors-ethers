import { Navigate, Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import CreateBox from '../pages/main/createBox';
import Game from '../pages/main/game';
import MetaMaskConnector from '../pages/metamask';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<MetaMaskConnector />}>
            <Route index element={<Navigate to="create-game" replace />} />
            <Route path='create-game' element={<CreateBox />} />
            <Route path='in-game/:address' element={<Game />}/>
        </Route>
    )
);

export default router;