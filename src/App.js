import './App.css';
import { Main } from './pages';
import { MetamaskContextProvider } from './hooks/useMetaMask';

function App() {
    return (
        <div className='app'>
            <MetamaskContextProvider>
                <Main />
            </MetamaskContextProvider>
        </div>
    );
}

export default App;
