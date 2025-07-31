class WebSocketService {
    constructor() {
      this.ws = null;
      this.subscribers = new Set();
      this.reconnectAttempts = 0;
      this.maxReconnectAttempts = 5;
      this.isIntentionalClose = false;
      this.currentUserId = null;
      this.connectionTimeout = null;
      this.reconnectTimeout = null;
    }

    connect(userId) {
      if (!userId) {
        console.error('Cannot connect: No user ID provided');
        return;
      }

      if (this.ws?.readyState === WebSocket.OPEN) {
        console.log('WebSocket already open.');
        return;
      }

      if (this.connectionTimeout) {
        clearTimeout(this.connectionTimeout);
      }
      if (this.reconnectTimeout) {
        clearTimeout(this.reconnectTimeout);
      }

      this.currentUserId = userId;
      const BACKEND_PORT = import.meta.env.VITE_BACKEND_PORT || 5001;
      const wsUrl = `ws://localhost:${BACKEND_PORT}/ws/${userId}`;
      console.log(`Attempting WebSocket connection to: ${wsUrl}`);

      try {
        this.ws = new WebSocket(wsUrl);
        this.isIntentionalClose = false; 

        this.connectionTimeout = setTimeout(() => {
          if (this.ws.readyState !== WebSocket.OPEN) {
            console.error('WebSocket connection timeout');
            this.ws.close(1000, 'Connection Timeout'); 
          }
        }, 5000);

        this.ws.onopen = () => {
          console.log('WebSocket connection established');
          this.reconnectAttempts = 0;
          clearTimeout(this.connectionTimeout);
          this.ping(); // Send initial ping
        };

        this.ws.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            if (data.type === 'pong') {
              console.log('Received pong from server');
              return;
            }
            this.notifySubscribers(data);
          } catch (error) {
            console.error('Error parsing WebSocket message:', error);
          }
        };

        this.ws.onclose = (event) => {
          console.log(`WebSocket closed with code: ${event.code}, reason: ${event.reason}`);
          clearTimeout(this.connectionTimeout); 
          this.ws = null; 

          if (!this.isIntentionalClose && this.reconnectAttempts < this.maxReconnectAttempts) {
            this.reconnectAttempts++;
            const delay = Math.min(30000, 1000 * Math.pow(2, this.reconnectAttempts)); 
            console.log(`Reconnection attempt ${this.reconnectAttempts}/${this.maxReconnectAttempts} in ${delay}ms`);
            this.reconnectTimeout = setTimeout(() => this.connect(this.currentUserId), delay);
          } else if (!this.isIntentionalClose) {
             console.log('Max reconnection attempts reached.');
          }
        };

        this.ws.onerror = (error) => {
          console.error('WebSocket error:', error);
          clearTimeout(this.connectionTimeout); 

        };


      } catch (error) {
        console.error('Failed to create WebSocket connection:', error);
        clearTimeout(this.connectionTimeout);
        if (!this.isIntentionalClose && this.reconnectAttempts < this.maxReconnectAttempts) {
             this.reconnectAttempts++;
             const delay = Math.min(30000, 1000 * Math.pow(2, this.reconnectAttempts));
             console.log(`Reconnection attempt ${this.reconnectAttempts}/${this.maxReconnectAttempts} in ${delay}ms after creation failure`);
             this.reconnectTimeout = setTimeout(() => this.connect(this.currentUserId), delay);
        } else if (!this.isIntentionalClose) {
            console.log('Max reconnection attempts reached after creation failure.');
        }
      }
    }

    ping() {
      if (this.ws?.readyState === WebSocket.OPEN) {
        try {
          this.ws.send(JSON.stringify({ type: 'ping' }));
          console.log('Sent ping to server');
        } catch (error) {
          console.error('Error sending ping:', error);
        }
      } else {
        console.log('Cannot send ping, WebSocket not open.');
      }
    }

    subscribe(callback) {
      this.subscribers.add(callback);
      console.log('Subscriber added. Total subscribers:', this.subscribers.size);
      return () => {
        this.subscribers.delete(callback);
        console.log('Subscriber removed. Total subscribers:', this.subscribers.size);
      };
    }

    notifySubscribers(notification) {
      console.log('Notifying subscribers with new notification:', notification);
      this.subscribers.forEach(callback => {
        try {
            callback(notification);
        } catch (error) {
            console.error('Error in subscriber callback:', error);
        }
      });
    }

    disconnect() {
      console.log('Attempting to disconnect WebSocket intentionally.');
      this.isIntentionalClose = true;
      if (this.ws) {
        this.ws.close(1000, 'Client Disconnect'); 
        this.ws = null;
      }
      clearTimeout(this.connectionTimeout);
      clearTimeout(this.reconnectTimeout);
    }
  }

  export default new WebSocketService();
