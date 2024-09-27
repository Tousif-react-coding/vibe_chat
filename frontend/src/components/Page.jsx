// page.jsx
import React, { useEffect } from 'react';
import { io } from 'socket.io-client';

const ENDPOINT = "http://localhost:3000"; // Use your server URL

const Page = () => {
  useEffect(() => {
    const socket = io(ENDPOINT);

    socket.on('connect', () => {
      console.log('Connected to the server');
    });

    // You can listen to other events
    socket.on('someEvent', (data) => {
      console.log(data);
    });

    // Cleanup on component unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <h1>Hello World!</h1>
    </div>
  );
};

export default Page;
