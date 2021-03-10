import { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

import Todo from './Todo';

import Container from 'react-bootstrap/Container';

const Todos = () => {
    const { theme, user } = useContext(GlobalContext);

    return (
        <Container fluid>
            <div className='todos' style={{ color: theme.syntax }}>
                {user.todos.map((todo) => (
                    <Todo key={todo._id} todo={todo} />
                ))}
            </div>
        </Container>
    );
};

export default Todos;
