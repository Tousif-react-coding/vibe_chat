import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import {
    Box,
    Button,
    TextField,
    Typography,
    List,
    ListItem,
    ListItemText,
    Paper
} from '@mui/material';
import axios from 'axios';

const socket = io("https://vibe-chat-pr80.onrender.com", {
    transports: ['websocket', 'polling'],
});

const Chat2 = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    // const [username, setUsername] = useState('');

    const [userName, setUserName] = useState('');

     // Create audio elements for sending and receiving sounds
     const sendSound = new Audio('/sendSound.wav');
     const receiveSound = new Audio('/rec.wav');

    useEffect(() => {
        const name = localStorage.getItem('userName');
        if (name) {
            setUserName(name);
        }
    }, []);
    useEffect(() => {
        // Retrieve username from local storage
       

        // Fetch existing messages from the API
       

        // Listening for incoming messages
        socket.on('receiveMessage', (message) => {
            console.log('Received message:', message);
            setMessages((prevMessages) => [...prevMessages, message]);
            receiveSound.play();
        });

        // Clean up the listener on component unmount
        return () => {
            socket.off('receiveMessage');
        };
    }, []);

    const sendMessage = async () => {
        if (input) {
            const messageObject = { text: input, user: userName };
            console.log('Sending message:', messageObject);
            
            try {
                const apiUrl = "https://vibe-chat-pr80.onrender.com" || 'http://localhost:3000';  // Fallback to localhost for dev
                // Post the new message to the API
                await axios.post(`${apiUrl}/api/chat`, messageObject);
                sendSound.play();
            } catch (error) {
                console.error('Error sending message:', error);
            }
            
            
            socket.emit('sendMessage', messageObject);
            setInput('');
        }
    };

    return (
        <Box
            sx={{
                width: '100%',
                maxWidth: 800,
                margin: 'auto',
                padding: 2,
                border: '1px solid #ccc',
                borderRadius: '8px',
                boxShadow: 3,
                backgroundColor: '#f9f9f9',
            }}
        >
            
            <Typography variant="h6" align="center">
               
                <div>
            {userName ? (
                <h1>Welcome ! {userName}. Let's Talk Someone</h1>
            ) : (
                <h1>Welcome to the chat!</h1>
            )}
        </div>
            </Typography>
            <Paper sx={{ height: 400, overflowY: 'auto', marginBottom: 2, padding: 1 }}>
                <List>
                    {messages.map((msg, index) => (
                        <ListItem key={index} sx={{ justifyContent: msg.user === userName ? 'flex-end' : 'flex-start' }}>
                            <ListItemText
                                primary={`${msg.user === userName ? 'You' : msg.user}: ${msg.text}`} 
                                sx={{
                                    backgroundColor: msg.user === userName ? '#d1c4e9' : '#e1bee7',
                                    borderRadius: '8px',
                                    padding: '8px',
                                    margin: '4px',
                                    maxWidth: '70%',
                                }}
                            />
                        </ListItem>
                    ))}
                </List>
            </Paper>
            <Box display="flex" alignItems="center">
                <input
                className='chat-input'
                   
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            sendMessage(); // Call sendMessage on Enter key press
                            e.preventDefault(); // Prevent default form submission
                        }
                    }}  
                    placeholder="Type your message..."
                    sx={{ marginRight: 1 }}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={sendMessage}
                    sx={{marginLeft:'1rem'}}
                >
                    Send
                </Button>
            </Box>
        </Box>
    );
};

export default Chat2;
