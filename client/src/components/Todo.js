import { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

import EditTodo from './EditTodo';

import moment from 'moment';

import Button from 'react-bootstrap/Button';

const Todo = ({ todo }) => {
    const { theme, deleteTodo } = useContext(GlobalContext);

    const deleteBtn = () => {
        deleteTodo(todo._id);
    };

    const date = todo.date ? moment.utc(todo.date).format('YYYY-MM-DD') : null;

    return (
        <div className='todo' style={{ borderColor: theme.syntax }}>
            <Button
                className='todo-x-btn'
                variant='danger'
                size='sm'
                onClick={deleteBtn}>
                X
            </Button>

            <div className='todo-content'>
                <h4>{todo.title}</h4>
                <p>{todo.description}</p>
                {date && todo.time ? (
                    <span>
                        {date} at {todo.time}
                    </span>
                ) : null}
                {date && !todo.time ? <span>{date}</span> : null}
                {!date && todo.time ? <span>{todo.time}</span> : null}
            </div>

            <EditTodo todo={todo} />
        </div>
    );
};

export default Todo;
