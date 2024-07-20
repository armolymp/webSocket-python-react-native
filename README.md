# WebSocket Example Project

This project demonstrates a basic WebSocket implementation using React Native for the frontend and Python for the backend. The frontend allows you to open and close a WebSocket connection, while the backend continuously sends messages to the connected client.

## Table of Contents

- [Introduction](#introduction)
- [Getting Started](#getting-started)
- [Frontend (React Native)](#frontend-react-native)
- [Backend (Python)](#backend-python)
- [Usage](#usage)
- [License](#license)

## Introduction

This repository contains example code for setting up a WebSocket connection between a React Native frontend and a Python backend. You can take this code and integrate it into your own React Native and Python projects.

## Getting Started

To use the provided code, follow the instructions below for setting up the frontend and backend.

## Frontend (React Native)

1. **Set Up a React Native Project:**

    If you don't have an existing React Native project, you can create one using the following command:

    ```sh
    npx react-native init MyWebSocketApp
    cd MyWebSocketApp
    ```

2. **Add the WebSocket Component:**

    Create a new file called `MyWebSocketComponent.js` in your project's `components` directory (or directly in the `App.js` for simplicity).

    ```javascript
    import React, { useState } from 'react';
    import { View, Text, Button } from 'react-native';

    const MyWebSocketComponent = () => {
      const [ws, setWs] = useState(null);

      const handleOpenConnection = () => {
        const newWs = new WebSocket('wss://your-websocket-url');
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
        </View>
      );
    };

    export default MyWebSocketComponent;
    ```

3. **Integrate the Component:**

    Import and use the `MyWebSocketComponent` in your main `App.js` file or another appropriate place in your project.

    ```javascript
    import React from 'react';
    import MyWebSocketComponent from './components/MyWebSocketComponent';

    const App = () => {
      return (
        <MyWebSocketComponent />
      );
    };

    export default App;
    ```

## Backend (Python)

1. **Set Up a Python Environment:**

    If you don't have an existing Python project, create one and set up a virtual environment:

    ```sh
    mkdir my_websocket_backend
    cd my_websocket_backend
    python -m venv venv
    source venv/bin/activate  # On Windows use `venv\Scripts\activate`
    ```

2. **Install Dependencies:**

    Install the `websockets` library:

    ```sh
    pip install websockets
    ```

3. **Create the WebSocket Server:**

    Create a file called `server.py` with the following content:

    ```python
    import asyncio
    import websockets

    async def send_message(websocket, path):
        print(f"New connection from {websocket.remote_address}")

        count = 0
        try:
            while True:
                message = f"Message {count}"
                await websocket.send(message)
                print(f"Sent: {message}")
                await asyncio.sleep(5)
                count += 1
        except websockets.exceptions.ConnectionClosed:
            print(f"Connection with {websocket.remote_address} closed")

    start_server = websockets.serve(send_message, "0.0.0.0", 8080)

    print("WebSocket server started on ws://0.0.0.0:8080")

    asyncio.get_event_loop().run_until_complete(start_server)
    asyncio.get_event_loop().run_forever()
    ```

4. **Run the WebSocket Server:**

    ```sh
    python server.py
    ```

## Usage

1. **Frontend:**

    - Open the React Native application on your device or emulator.
    - Press the "Open Connection" button to establish a WebSocket connection with the backend.
    - Press the "Close Connection" button to close the WebSocket connection.

2. **Backend:**

    - The WebSocket server will start and listen for connections on `ws://0.0.0.0:8080`.
    - Once a client connects, the server will send a message every 5 seconds.

