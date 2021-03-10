import { useState, useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

const AddTodo = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');

    const clearForm = () => {
        setTitle('');
        setDescription('');
        setDate('');
        setTime('');
    };

    /*
    const { addTodoItem } = useContext(GlobalContext);

    const addTodo = (e) => {
        e.preventDefault();

        if (!title) {
            alert('Please give the todo a title');
            return;
        }

        const newTodo = {
            id: Math.floor(Math.random() * 100000000),
            title,
            description,
            date,
            time
        };

        addTodoItem(newTodo);

        // clear form
        setTitle('');
        setDescription('');
        setDate('');
        setTime('');
    };
    */

    const { isDark, isAuthenticated, addTodo, error } = useContext(
        GlobalContext
    );

    const onSubmit = (e) => {
        e.preventDefault();

        // if (!title) {
        //     alert('Please give the todo a title');
        //     return;
        // }

        const newTodo = {
            title,
            description,
            date,
            time
        };

        addTodo(newTodo);

        clearForm();
    };

    return (
        <>
            {isAuthenticated ? (
                <>
                    {error ? <Alert variant='danger'>{error}</Alert> : null}
                    {/* <Form className='add-todo' onSubmit={addTodo}> */}
                    <Form className='add-todo' onSubmit={onSubmit}>
                        <Form.Group>
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Give this todo a title'
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as='textarea'
                                rows={3}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Date</Form.Label>
                            <Form.Control
                                type='date'
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Time</Form.Label>
                            <Form.Control
                                type='time'
                                value={time}
                                onChange={(e) => setTime(e.target.value)}
                            />
                        </Form.Group>

                        <Button
                            variant={isDark ? 'outline-light' : 'outline-dark'}
                            type='submit'>
                            Add todo
                        </Button>
                    </Form>
                </>
            ) : null}
        </>
    );
};

export default AddTodo;
