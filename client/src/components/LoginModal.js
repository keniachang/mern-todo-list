import { useState, useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

import { Alert, Button } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import { Form } from 'react-bootstrap';

const LoginModal = () => {
    const { isDark, login, error, clearErrors } = useContext(GlobalContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const clearForm = () => {
        setEmail('');
        setPassword('');
    };

    const [showLog, setShowLog] = useState(false);

    const handleShow = () => setShowLog(true);
    const handleClose = () => {
        clearForm();
        clearErrors();
        setShowLog(false);
    };

    const onSubmit = (e) => {
        e.preventDefault();

        login(email, password);

        if (error) clearErrors();
        clearForm();
    };

    return (
        <>
            <Button variant={isDark ? 'light' : 'dark'} onClick={handleShow}>
                Login
            </Button>

            <Modal show={showLog} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {error ? <Alert variant='danger'>{error}</Alert> : null}
                    <Form onSubmit={onSubmit}>
                        <Form.Group>
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control
                                type='email'
                                placeholder='Enter your registered email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type='password'
                                placeholder='Enter the password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>

                        <Button variant='dark' type='submit'>
                            Login
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default LoginModal;
