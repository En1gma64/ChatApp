import { Button } from "react-bootstrap";
import MessageContainer from "./MessageContainer";
import SendMessageForm from "./SendMessageForm";
import ConnectedUsers from "./ConnectedUsers";

const Chat = ({messages, sendMessage, closeConnection, users}) => <div>
    <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
    <div className="container bg-light p-5 rounded-lg position-relative">
        <Button variant="danger" className="position-absolute top-0 end-0 ms-3" onClick={() => closeConnection()}>
            Leave Room
        </Button>
        <div className="div" style={{ height: "100%" }}>
        <ConnectedUsers users={users}/>
            <MessageContainer messages={messages} />
            <SendMessageForm sendMessage={sendMessage} />
        </div>
    </div>
</div>
</div>

export default Chat;