import { useState } from 'react';
import { Button, Form, FormControl, InputGroup} from 'react-bootstrap';

const SendMessageForm = ({sendMessage}) => {
    const [message, setMessage] = useState('');

    return (
        <Form
            onSubmit={e => {
                e.preventDefault();
                sendMessage(message);
                setMessage('');
            }}
        >
            <InputGroup>
                <FormControl
                    placeholder='Say something...'
                    onChange={e => setMessage(e.target.value)}
                    value={message}
                />
                <Button variant='primary' type='submit' disabled={!message}>
                    Send
                </Button>
            </InputGroup>
        </Form>
    );
}

export default SendMessageForm;