import { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

import { Button } from 'react-bootstrap';

const Logout = () => {
    const { logout } = useContext(GlobalContext);

    return (
        <Button variant='light' onClick={logout}>
            Logout
        </Button>
    );
};

export default Logout;
