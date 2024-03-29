import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Lobby from './components/Lobby';
import {HubConnectionBuilder, LogLevel} from '@microsoft/signalr'
import { useState } from 'react';
import Chat from './components/Chat';

const App = () => {

  const [connection, setConnection] = useState();
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);

  const joinRoom = async (user, room) => {
    try {
      const connection = new HubConnectionBuilder()
      .withUrl("https://localhost:7284/chat")
      .configureLogging(LogLevel.Information)
      .build();

      connection.on("UsersInRoom", (users) => {
        setUsers(users);
      });

      connection.on("ReceiveMessage", (user, message) => {
        setMessages(messages => [...messages, {user, message}])
      });

      connection.onclose(e => {
        setConnection();
        setMessages([]);
        setUsers([]);
      })

      await connection.start();
      
      await connection.invoke("JoinRoom", {user, room});
      setConnection(connection);
    }
    catch (ex) {
      console.log(ex);
    }
  }

  const closeConnection = async() => {
    try {
      await connection.stop();
    }
    catch (ex) {
      console.log(ex);
    }
  }

  const sendMessage = async (message) => {
    try {
      await connection.invoke("SendMessage", message)
    }
    catch (ex) {
      console.log(ex);
    }
  }

  return (
    <>
    <div className="d-flex flex-column align-items-center justify-content-center">
    <h2 className="display-3">Chat App</h2>
    <hr className="line w-75" />
    </div>
    <div>
      {!connection ? (
        <Lobby joinRoom={joinRoom} />
      ) : (
          <Chat messages={messages} 
                sendMessage={sendMessage}
                closeConnection={closeConnection}
                users={users} />
      )}
    </div>
    </>
  )
}

export default App;
