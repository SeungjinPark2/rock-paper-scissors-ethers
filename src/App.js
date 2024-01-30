import './App.css';
import { MetamaskContextProvider } from './hooks/useMetaMask';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import { NetworkProvider } from './hooks/useEthereum';

function App() {
    return (
        <div className='app'>
            <NetworkProvider>
                <MetamaskContextProvider>
                    <RouterProvider router={router} />
                </MetamaskContextProvider>
            </NetworkProvider>
        </div>
    );
}

export default App;
