import './App.css';
import { MetamaskContextProvider } from './hooks/useMetaMask';
import { RouterProvider } from 'react-router-dom';
import router from './router';

function App() {
    return (
        <div className='app'>
            <MetamaskContextProvider>
                <RouterProvider router={router} />
            </MetamaskContextProvider>
        </div>
    );
}

export default App;
