import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';

const MyWebSocketComponent = () => {
  const [ws, setWs] = useState(null);

  const handleOpenConnection = () => {
    const newWs = new WebSocket('wss://84a6-2402-d000-a500-2774-4d77-e420-d813-9eb4.ngrok-free.app');
    newWs.onopen = () => {
      console.log('WebSocket connection opened');
      newWs.send('Hello, server!');
    };
    newWs.onmessage = (event) => {
      console.log(`Received: ${event.data}`);
      // Handle the received data as needed
    };
    newWs.onclose = () => {
      console.log('WebSocket connection closed');
    };
    setWs(newWs);
  };

  const handleCloseConnection = () => {
    if (ws) {
      ws.close();
      setWs(null);
    }
  };

  return (
    <View>
      <Text>WebSocket Example in React Native</Text>
      <Button title="Open Connection" onPress={handleOpenConnection} />
      <Button title="Close Connection" onPress={handleCloseConnection} />
      {/* Add your UI components here */}
    </View>
  );
};

export default MyWebSocketComponent;
