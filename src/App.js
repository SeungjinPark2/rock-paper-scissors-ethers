import './App.css';
import { MetamaskContextProvider } from './hooks/useMetaMask';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import { Web3ContextProvider } from './hooks/useWeb3';

function App() {
    return (
        <div className='app'>
            <MetamaskContextProvider>
                <Web3ContextProvider>
                    <RouterProvider router={router} />
                </Web3ContextProvider>
            </MetamaskContextProvider>
        </div>
    );
}

export default App;
