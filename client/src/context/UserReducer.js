const UserReducer = (state, action) => {
    switch (action.type) {
        case 'REGISTER_SUCCESS':
        case 'LOGIN_SUCCESS':
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                token: localStorage.getItem('token'),
                isAuthenticated: true,
                user: { ...action.payload.data }
            };
        case 'REGISTER_UNMATCHED_PASSWORD':
        case 'REGISTER_FAIL':
        case 'LOGIN_FAIL':
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                user: null,
                error: action.payload
            };
        case 'LOGOUT':
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                user: null,
                error: null
            };
        case 'ADD_TODO':
            return {
                ...state,
                user: {
                    ...state.user,
                    todos: [...state.user.todos, action.payload]
                }
            };
        case 'UPDATE_TODO':
            return {
                ...state,
                user: {
                    ...state.user,
                    todos: state.user.todos.map((todo) => {
                        if (todo._id === action.payload.id) {
                            return action.payload.updTodo;
                        } else {
                            return todo;
                        }
                    })
                }
            };
        case 'DELETE_TODO':
            return {
                ...state,
                user: {
                    ...state.user,
                    todos: state.user.todos.filter(
                        (todo) => todo._id !== action.payload
                    )
                }
            };
        case 'TODOS_ERROR':
            return {
                ...state,
                error: action.payload
            };
        case 'CLEAR_ERRORS':
            return {
                ...state,
                error: null
            };
        default:
            return state;
    }
};

export default UserReducer;
