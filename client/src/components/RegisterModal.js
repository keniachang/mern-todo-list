import { useState, useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

import { Alert, Button } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import { Form } from 'react-bootstrap';

const RegisterModal = () => {
    const { isDark, register, error, clearErrors } = useContext(GlobalContext);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cPass, setCPass] = useState('');

    const clearForm = () => {
        setName('');
        setEmail('');
        setPassword('');
        setCPass('');
    };

    const [showReg, setShowReg] = useState(false);

    const handleShow = () => setShowReg(true);
    const handleClose = () => {
        clearForm();
        clearErrors();
        setShowReg(false);
    };

    const onSubmit = (e) => {
        e.preventDefault();

        register(name, email, password, cPass);

        if (error) clearErrors();
        clearForm();
    };

    return (
        <>
            <Button variant={isDark ? 'light' : 'dark'} onClick={handleShow}>
                Register
            </Button>

            <Modal show={showReg} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Register</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {error ? <Alert variant='danger'>{error}</Alert> : null}
                    <Form onSubmit={onSubmit}>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Please enter your name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control
                                type='email'
                                placeholder='Please enter a valid email address'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type='password'
                                placeholder='Please enter a password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                                type='password'
                                placeholder='Please enter the password again'
                                value={cPass}
                                onChange={(e) => setCPass(e.target.value)}
                            />
                        </Form.Group>

                        <Button variant='dark' type='submit'>
                            Register
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default RegisterModal;
