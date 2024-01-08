import './App.css';
import { MetamaskContextProvider } from './hooks/useMetaMask';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import { NetworkProvider } from './hooks/useEthereum';

function App() {
    return (
        <div className='app'>
            <MetamaskContextProvider>
                <NetworkProvider>
                    <RouterProvider router={router} />
                </NetworkProvider>
            </MetamaskContextProvider>
        </div>
    );
}

export default App;
