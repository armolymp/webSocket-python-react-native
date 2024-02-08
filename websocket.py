import asyncio
import websockets

async def send_message(websocket, path):
    # Log when a new connection is established
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
        # Log when the client disconnects
        print(f"Connection with {websocket.remote_address} closed")

start_server = websockets.serve(send_message, "0.0.0.0", 8080)

print("WebSocket server started on ws://0.0.0.0:8080")

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
