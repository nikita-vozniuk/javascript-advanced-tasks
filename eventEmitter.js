// Event Emitter

class EventEmitter {
    constructor() {
        this.events = new Map();
    }

    on(event, listener) {
        if (!this.events.has(event)) {
            this.events.set(event, new Set());
        }
        this.events.get(event).add(listener);
    }

    off(event, listener) {
        if (this.events.has(event)) {
            const listeners = this.events.get(event);
            listeners.delete(listener);
            if (listeners.size === 0) {
                this.events.delete(event);
            }
        }
    }

    once(event, listener) {
        const onceWrapper = (...args) => {
            this.off(event, onceWrapper);
            listener.apply(this, args);
        };
        this.on(event, onceWrapper);
    }

    emit(event, ...args) {
        if (this.events.has(event)) {
            const listeners = this.events.get(event).values();
            for (const listener of listeners) {
                listener.apply(this, args);
            }
        }
    }

    listeners(event) {
        return this.events.has(event) ? Array.from(this.events.get(event)) : [];
    }

    removeAllListeners(event) {
        this.events.delete(event);
    }
}

// Example Usage:

const emitter = new EventEmitter();

const emitterHandler = (value) => console.log(`Emitter Handler: ${value}`);

emitter.on('event', emitterHandler);
emitter.emit('event', 'Emitting Event');

emitter.off('event', emitterHandler);
