const themeReducer = (state, action) => {
    switch (action.type) {
        case 'CHANGE_THEME':
            return {
                ...state,
                theme: !state.isDark ? state.dark : state.light,
                isDark: !state.isDark
            };
        default:
            return state;
    }
};

export default themeReducer;
