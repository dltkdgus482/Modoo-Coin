export class UpbitWebSocket {
    constructor(markets = ["KRW-BTC", "KRW-ETH", "KRW-XRP", "KRW-DOT", "KRW-ADA"]) {
      this.markets = markets;
      this.ws = null;
      this.subscribers = new Set();
      this.reconnectInterval = 3000;
      this.initWebSocket();
    }
  
    initWebSocket() {
      this.ws = new WebSocket("wss://api.upbit.com/websocket/v1");
  
      this.ws.onopen = () => {
        console.log("✅ WebSocket 연결됨:", this.markets);
        this.subscribe();
      };
  
      this.ws.onmessage = (event) => {
        this.parseMessage(event.data)
          .then((data) => {
            if (data) {
              this.notifySubscribers(data);
            }
          })
          .catch((err) => console.error("❌ WebSocket 데이터 처리 오류:", err));
      };
  
      this.ws.onclose = () => {
        console.log("❌ WebSocket 연결 종료됨. 재연결 시도...");
        setTimeout(() => this.initWebSocket(), this.reconnectInterval);
      };
  
      this.ws.onerror = (err) => {
        console.error("⚠️ WebSocket 오류:", err);
      };
    }
  
    subscribe() {
      const message = JSON.stringify([
        { ticket: "unique_ticket" },
        { type: "ticker", codes: this.markets },
      ]);
      this.ws.send(message);
      console.log("📡 구독 요청 전송됨:", message);
    }
  
    async parseMessage(blobData) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          try {
            resolve(JSON.parse(reader.result));
          } catch (err) {
            reject(new Error("❌ 메시지 파싱 오류: " + err.message));
          }
        };
        reader.onerror = () => reject(new Error("❌ FileReader 오류"));
        reader.readAsText(blobData);
      });
    }
  
    notifySubscribers(data) {
      this.subscribers.forEach((callback) => callback(data));
    }
  
    subscribeToData(callback) {
      this.subscribers.add(callback);
    }
  
    unsubscribeFromData(callback) {
      this.subscribers.delete(callback);
    }
  
    close() {
      if (this.ws) {
        this.ws.close();
      }
    }
  }
  