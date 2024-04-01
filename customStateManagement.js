// Custom Redux from Scratch (as example, I used to-do app logic)

const ActionTypes = {
    ADD_TODO: 'ADD_TODO',
    REMOVE_TODO: 'REMOVE_TODO',
    TOGGLE_TODO: 'TOGGLE_TODO'
};

class Action {
    static addTodo(text) {
        return { type: ActionTypes.ADD_TODO, payload: { text } };
    }

    static removeTodo(id) {
        return { type: ActionTypes.REMOVE_TODO, payload: { id } };
    }

    static toggleTodo(id) {
        return { type: ActionTypes.TOGGLE_TODO, payload: { id } };
    }
}

class TodoReducer {
    static reduce(state = [], action) {
        switch (action.type) {
            case ActionTypes.ADD_TODO:
                return [
                    ...state,
                    { id: state.length + 1, text: action.payload.text, completed: false }
                ];
            case ActionTypes.REMOVE_TODO:
                return state.filter(todo => todo.id !== action.payload.id);
            case ActionTypes.TOGGLE_TODO:
                return state.map(todo =>
                    todo.id === action.payload.id ? { ...todo, completed: !todo.completed } : todo
                );
            default:
                return state;
        }
    }
}

class Store {
    constructor(reducer) {
        this.state = reducer.reduce(undefined, {});
        this.subscribers = [];
        this.reducer = reducer;
    }

    getState() {
        return this.state;
    }

    dispatch(action) {
        this.state = this.reducer.reduce(this.state, action);
        this.subscribers.forEach(subscriber => subscriber());
    }

    subscribe(subscriber) {
        this.subscribers.push(subscriber);
        return () => {
            const index = this.subscribers.indexOf(subscriber);
            if (index !== -1) {
                this.subscribers.splice(index, 1);
            }
        };
    }
}

// Example Usage:

const store = new Store(TodoReducer);

const unsubscribe = store.subscribe(() => {
    console.log('Store state:', store.getState());
});

store.dispatch(Action.addTodo('Learn Javascript'));
store.dispatch(Action.addTodo('Learn Typescript'));
store.dispatch(Action.toggleTodo(1));
store.dispatch(Action.toggleTodo(2));

unsubscribe();

// Console logs from subscribe (on each call):

/*
    1) Store state: [{ id: 1, text: 'Learn Javascript', completed: false }]
    2) Store state: [{ id: 1, text: 'Learn Javascript', completed: false }, { id: 2, text: 'Learn Typescript', completed: false }]
    3) Store state: [{ id: 1, text: 'Learn Javascript', completed: true }, { id: 2, text: 'Learn Typescript', completed: false }]
    4) Store state: [{ id: 1, text: 'Learn Javascript', completed: true }, { id: 2, text: 'Learn Typescript', completed: true }]
*/
