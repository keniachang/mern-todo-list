import { GlobalProvider } from './context/GlobalState';

import Main from './components/Main';

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';

function App() {
    return (
        <GlobalProvider>
            {/* <div className='App'>
                <Header auth={auth} login={login} logout={logout} />
                {auth && <Todos />}
            </div> */}

            <Main />
        </GlobalProvider>
    );
}

export default App;
