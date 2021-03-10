import { useState, useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

import Register from './RegisterModal';
import Login from './LoginModal';
import AddTodo from './AddTodo';
import Logout from './Logout';

import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';

const Header = () => {
    const {
        theme,
        isDark,
        changeTheme,
        isAuthenticated,
        clearErrors
    } = useContext(GlobalContext);

    const [toggle, setToggle] = useState(false);

    const toggleAdd = () => {
        setToggle(!toggle);

        if (!toggle) clearErrors();
    };

    return (
        <>
            <Navbar
                bg={isDark ? 'light' : 'dark'}
                variant={isDark ? 'light' : 'dark'}
                expand='md'>
                <Navbar.Brand href='/'>Todo App</Navbar.Brand>
                <Navbar.Toggle aria-controls='basic-navbar-nav' />
                <Navbar.Collapse id='basic-navbar-nav'>
                    <Button
                        variant={isDark ? 'light' : 'dark'}
                        onClick={changeTheme}>
                        Change Theme
                    </Button>
                    {!isAuthenticated && <Register />}
                    {!isAuthenticated && <Login />}
                    {isAuthenticated && <Logout />}
                </Navbar.Collapse>
            </Navbar>
            <div className='app-header' style={{ color: theme.syntax }}>
                <h1>Todo List</h1>
                {isAuthenticated ? (
                    <Button
                        variant={isDark ? 'outline-light' : 'outline-dark'}
                        onClick={toggleAdd}>
                        Add A Todo
                    </Button>
                ) : (
                    ''
                )}
            </div>
            {toggle && <AddTodo />}
        </>
    );
};

export default Header;
