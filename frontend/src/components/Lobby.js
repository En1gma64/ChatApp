import { useState } from "react"
import { Form, Button, Container, Row, Col } from 'react-bootstrap';


const Lobby = ({joinRoom}) => {

    const [user, setUser] = useState();
    const [room, setRoom] = useState();

    return (
        <Container className="vh-100 d-flex align-items-center justify-content-center">
        <Row className="w-100">
          <Col xs={12} md={8} lg={6} xl={4} className="mx-auto">
            <h2>Join a ChatRoom!</h2>
            <Form
              onSubmit={e => {
                e.preventDefault();
                joinRoom(user, room);
              }}
            >
              <Form.Group>
                <Form.Control size="lg" className="mb-3" placeholder="Name" onChange={e => setUser(e.target.value)} />
                <Form.Control size="lg" className="mb-3" placeholder="Room" onChange={e => setRoom(e.target.value)} />
              </Form.Group>
              <Button variant="success" type="submit" size="lg" block disabled={!user || !room}>
                Join
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
}

export default Lobby;