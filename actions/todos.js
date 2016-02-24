import {actionsTypes} from '../constants/todos';

export function addTodo(text) {
    return {
        type: actionsTypes.ADD_TODO,
        text: text
    };
}

export function removeTodo(id) {
    return {
        type: actionsTypes.REMOVE_TODO,
        id: id
    }
}

export function toggleTodo(id) {
    return {
        type: actionsTypes.TOGGLE_TODO,
        id: id
    };
}