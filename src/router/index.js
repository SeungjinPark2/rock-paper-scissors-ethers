import { Navigate, Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import CreateBox from '../pages/main/createBox';
import { Main } from '../pages';
import GameBoard from '../pages/main/gameBoard';


const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<Main />}>
            <Route index element={<Navigate to="create-game" replace />} />
            <Route path='create-game' element={<CreateBox />} />
            <Route path='in-game' element={<GameBoard />} />
        </Route>
    )
);

export default router;