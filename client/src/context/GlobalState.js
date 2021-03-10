import { createContext, useReducer } from 'react';
import ThemeReducer from './ThemeReducer';
// import TodosReducer from './TodosReducer';
import UserReducer from './UserReducer';

import axios from 'axios';

const setHeaders = (token = null) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    if (token) {
        config.headers['x-auth-token'] = token;
    }

    return config;
};

const themeInitState = {
    isDark: true,
    dark: {
        bg: '#282c34',
        syntax: '#fff'
    },
    light: {
        bg: '#eee',
        syntax: '#333'
    },
    theme: {}
};

/*
const initialState = {
    todos: [
        {
            id: 1,
            title: 'Buy a RTX 3070',
            description: 'Search on newegg',
            date: '2021-03-05',
            time: '9:00'
        },
        {
            id: 2,
            title: 'Grocery Shopping',
            description: 'Go to Publix',
            date: '2021-03-08',
            time: '14:10'
        },
        {
            id: 3,
            title: 'Prepare Present',
            description: "John's birthday",
            date: '2021-03-09',
            time: '16:50'
        },
        {
            id: 4,
            title: 'Checkout NEWEGG SHUFFLE',
            description: 'https://www.newegg.com/product-shuffle',
            date: '2021-03-20',
            time: '13:00'
        }
    ]
};
*/

const userInitState = {
    // token: localStorage.getItem('token'),
    token: null,
    isAuthenticated: null,
    user: null,
    error: null
};

export const GlobalContext = createContext({});

export const GlobalProvider = ({ children }) => {
    const [themeState, themeDispatch] = useReducer(
        ThemeReducer,
        themeInitState
    );
    // const [state, dispatch] = useReducer(TodosReducer, initialState);
    const [userState, userDispatch] = useReducer(UserReducer, userInitState);

    function changeTheme() {
        themeDispatch({ type: 'CHANGE_THEME' });
    }

    /*
    function addTodoItem(todo) {
        dispatch({
            type: 'ADD_TODO',
            payload: todo
        });
    }
    */

    async function register(name, email, password, confirmedPass) {
        if (password !== confirmedPass) {
            userDispatch({
                type: 'REGISTER_UNMATCHED_PASSWORD',
                payload:
                    'Make sure password and confirmed password are the same'
            });
        } else {
            const config = setHeaders();

            try {
                const res = await axios.post(
                    '/api/users/register',
                    { name, email, password },
                    config
                );

                userDispatch({
                    type: 'REGISTER_SUCCESS',
                    payload: res.data
                });
            } catch (err) {
                userDispatch({
                    type: 'REGISTER_FAIL',
                    payload: err.response.data.error
                });
            }
        }
    }

    async function login(email, password) {
        const config = setHeaders();

        try {
            const res = await axios.post(
                '/api/auth/login',
                { email, password },
                config
            );

            userDispatch({
                type: 'LOGIN_SUCCESS',
                payload: res.data
            });
        } catch (err) {
            userDispatch({
                type: 'LOGIN_FAIL',
                payload: err.response.data.error
            });
        }
    }

    function logout() {
        userDispatch({
            type: 'LOGOUT'
        });
    }

    async function addTodo(todo) {
        const token = userState.token;
        const config = setHeaders(token);

        try {
            const res = await axios.post('/api/auth/user/todos', todo, config);

            userDispatch({
                type: 'ADD_TODO',
                payload: res.data.data
            });
        } catch (err) {
            userDispatch({
                type: 'TODOS_ERROR',
                payload: err.response.data.error
            });
        }
    }

    async function updateTodo(id, updTodo) {
        const token = userState.token;
        const config = setHeaders(token);

        try {
            const res = await axios.post(
                `/api/auth/user/todos/${id}`,
                updTodo,
                config
            );

            userDispatch({
                type: 'UPDATE_TODO',
                payload: { id, updTodo: res.data.data }
            });
        } catch (err) {
            userDispatch({
                type: 'TODOS_ERROR',
                payload: err.response.data.error
            });
        }
    }

    async function deleteTodo(id) {
        const token = userState.token;
        const config = setHeaders(token);

        try {
            await axios.delete(`/api/auth/user/todos/${id}`, config);

            userDispatch({
                type: 'DELETE_TODO',
                payload: id
            });
        } catch (err) {
            userDispatch({
                type: 'TODOS_ERROR',
                payload: err.response.data.error
            });
        }
    }

    function clearErrors() {
        userDispatch({
            type: 'CLEAR_ERRORS'
        });
    }

    return (
        <GlobalContext.Provider
            value={{
                theme: themeState.theme,
                isDark: themeState.isDark,
                changeTheme,
                // todos: state.todos,
                // addTodoItem
                isAuthenticated: userState.isAuthenticated,
                user: userState.user,
                error: userState.error,
                register,
                login,
                logout,
                addTodo,
                updateTodo,
                deleteTodo,
                clearErrors
            }}>
            {children}
        </GlobalContext.Provider>
    );
};
