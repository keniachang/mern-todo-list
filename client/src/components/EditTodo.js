import { useState, useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

const AddTodo = ({ todo }) => {
    const { isDark, updateTodo } = useContext(GlobalContext);

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

    const [showEdit, setShowEdit] = useState(false);

    const handleShow = () => setShowEdit(true);
    const handleClose = () => {
        clearForm();
        setShowEdit(false);
    };

    const onSubmit = (e) => {
        e.preventDefault();

        const updTodo = {};
        if (title) updTodo.title = title;
        if (description) updTodo.description = description;
        if (date) updTodo.date = date;
        if (time) updTodo.time = time;

        updateTodo(todo._id, updTodo);

        handleClose();
    };

    return (
        <>
            <Button
                className='todo-edit-btn'
                variant={isDark ? 'light' : 'dark'}
                onClick={handleShow}>
                Edit
            </Button>

            <Modal show={showEdit} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Change the todo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={onSubmit}>
                        <Form.Group>
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder={todo.title}
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

                        <Button variant='dark' type='submit'>
                            Save Changes
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default AddTodo;
