import './App.css';
import { MetamaskContextProvider } from './hooks/useMetaMask';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import { WsContextProvider } from './hooks/useWsProvider';

function App() {
    return (
        <div className='app'>
            <MetamaskContextProvider>
                <WsContextProvider>
                    <RouterProvider router={router} />
                </WsContextProvider>
            </MetamaskContextProvider>
        </div>
    );
}

export default App;
