import {actionsTypes} from '../constants/todos';

export default function todos(state=[], action) {
    switch(action.type) {
        case actionsTypes.ADD_TODO:
            return [
                ...state,
                {
                    id: Date.now(),
                    completed: false,
                    text: action.text
                }
            ];
        case actionsTypes.REMOVE_TODO:
            return state.filter((t) => t.id !== action.id);
        
        case actionsTypes.TOGGLE_TODO:
            let index;
            let todo = state.filter((t, i) => {
                let found = t.id === action.id;
                
                if (found) {
                    index = i;
                }

                return found;
            })[0];
            
            if (todo) {
                return [
                    ...state.slice(0, index),
                    {
                        id: todo.id,
                        completed: !todo.completed,
                        text: todo.text
                    },
                    ...state.slice(index + 1, state.length)
                ];
            }
            
            return state;
        default:
            return state;
            
    }
}