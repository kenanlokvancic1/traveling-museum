import { WebSocketServer } from 'ws';
import { parse } from 'url';

class WebSocketManager {
  constructor() {
    this.connections = new Map();
  }

  initialize(server) {
    const wss = new WebSocketServer({
      server,
      clientTracking: true,
      perMessageDeflate: {
        zlibDeflateOptions: {
          chunkSize: 1024,
          memLevel: 7,
          level: 3
        },
        zlibInflateOptions: {
          chunkSize: 10 * 1024
        },
      }
    });

    wss.on('connection', (ws, req) => {
      const parsedUrl = parse(req.url);
      if (!parsedUrl.pathname.startsWith('/ws/')) {
        console.log('WebSocket connection attempt to an invalid path, closing connection:', parsedUrl.pathname);
        ws.close(1008, 'Invalid WebSocket path');
        return;
      }

      const userId = this.getUserIdFromUrl(req.url);
      console.log('New WebSocket connection attempt:', {
        url: req.url,
        userId: userId,
        clientsCount: wss.clients.size
      });

      if (!userId || userId === 'ws') {
        console.log('No valid userId found in URL, closing connection');
        ws.close(1008, 'Invalid userId');
        return;
      }

      const existingConnection = this.connections.get(userId.toString());
      if (existingConnection) {
        console.log(`Closing existing connection for user ${userId}`);
        existingConnection.terminate();
        this.removeConnection(userId);
      }

      this.addConnection(userId, ws);
      ws.isAlive = true;

      ws.on('message', (message) => {
        console.log(`Received message from user ${userId}:`, message.toString());
        try {
            const parsedMessage = JSON.parse(message.toString());
            if (parsedMessage.type === 'ping') {
                ws.send(JSON.stringify({ type: 'pong' }));
                ws.isAlive = true;
            }
        } catch (e) {
            console.error('Error parsing message or not a JSON:', message.toString());
        }
      });

      ws.on('error', (error) => {
        console.error(`WebSocket error for user ${userId}:`, error);
        this.removeConnection(userId);
      });

      ws.on('close', (code, reason) => {
        console.log(`Connection closed for user ${userId}. Code: ${code}, Reason: ${reason || 'No reason provided'}`);
        this.removeConnection(userId);
      });

      ws.on('pong', () => {
        ws.isAlive = true;
      });
    });

    const pingInterval = setInterval(() => {
      wss.clients.forEach((ws) => {
        if (ws.isAlive === false) {
          console.log('Terminating inactive connection');
          return ws.terminate();
        }
        ws.isAlive = false;
        ws.ping();
      });
    }, 30000);

    wss.on('close', () => {
      clearInterval(pingInterval);
    });

    return wss;
  }

  getUserIdFromUrl(reqUrl) {
    try {
      const pathname = parse(reqUrl).pathname;
      const parts = pathname.split('/');
      const userId = parts.filter(Boolean).pop();
      console.log('Parsed userId from URL:', userId);
      return userId;
    } catch (error) {
      console.error('Error parsing WebSocket URL:', error);
      return null;
    }
  }

  addConnection(userId, ws) {
    this.connections.set(userId.toString(), ws);
    console.log(`WebSocket connection established for user ${userId}`);
  }

  removeConnection(userId) {
    this.connections.delete(userId.toString());
    console.log(`WebSocket connection removed for user ${userId}`);
  }

  sendNotification(userId, notification) {
    const ws = this.connections.get(userId.toString());
    if (ws && ws.readyState === ws.OPEN) {
      try {
        ws.send(JSON.stringify(notification));
      } catch (error) {
        console.error(`Error sending notification to user ${userId}:`, error);
      }
    } else {
      console.log(`WebSocket connection not open for user ${userId}. Cannot send notification.`);
    }
  }
}

export default new WebSocketManager();
