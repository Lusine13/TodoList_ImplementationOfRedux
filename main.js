const ADD_TODO = 'ADD_TODO';
const REMOVE_TODO = 'REMOVE_TODO';

function addTodoAction(todo) {
    return {
        type: ADD_TODO,
        payload: todo
    };
}

function removeTodoAction(index) {
    return {
        type: REMOVE_TODO,
        payload: index
    };
}

function todoReducer(state, action) {
    switch (action.type) {
        case ADD_TODO:
            return {
                ...state,
                todos: [...state.todos, action.payload]
            };
        case REMOVE_TODO:
            return {
                ...state,
                todos: state.todos.filter((_, idx) => idx !== action.payload)
            };
        default:
            return state;
    }
}

function createStore(reducer) {
    let state = { todos: [] };

    function dispatch(action) {
        state = reducer(state, action);
        render();
    }

    function getState() {
        return state;
    }

    return { dispatch, getState };
}

const store = createStore(todoReducer);

function render() {
    const todoList = document.getElementById('todoList');
    todoList.innerHTML = '';
    store.getState().todos.forEach((todo, index) => {
        const li = document.createElement('li');
        li.textContent = todo;
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.onclick = () => {
            store.dispatch(removeTodoAction(index));
        };
        li.appendChild(removeButton);
        todoList.appendChild(li);
    });
}

document.getElementById('addButton').onclick = () => {
    const input = document.getElementById('todoInput');
    if (input.value) {
        store.dispatch(addTodoAction(input.value));
        input.value = '';
    }
};

render();
