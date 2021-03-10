import { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

import Header from './Header';
import Todos from './Todos';

const Main = () => {
    const { theme, isAuthenticated } = useContext(GlobalContext);

    /*
    const [auth, setAuth] = useState(false);

    const login = () => (setAuth(true));
    const logout = () => (setAuth(false));
    */

    return (
        <div className='App' style={{ backgroundColor: theme.bg }}>
            <Header />
            {isAuthenticated && <Todos />}
        </div>
    );
};

export default Main;
