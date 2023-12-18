export default class EventManager {
  listeners: any;

  constructor() {
    this.listeners = new Map();
  }

  on(event: string, listener: any) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }

    this.listeners.get(event).push(listener);
  }

  emitTo(event: string, payload: any) {
    if (!this.listeners.has(event)) {
      return;
    }

    this.listeners.get(event).forEach((listener: any) => {
      listener(payload);
    });
  }

  dispose(event: string, listenerToDispose: any) {
    const listeners = this.listeners.get(event);

    if (!listeners) {
      return;
    }

    this.listeners.set(
      event,
      listeners.filter((listener: any) => listener !== listenerToDispose),
    );
  }
}
