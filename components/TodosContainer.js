import {actionsTypes} from '../constants/todos';
import {toggleTodo, removeTodo} from '../actions/todos';
import * as TodosList from './TodosList';

export function create({store}) {
    store.subscribe(() => {
        let todos = store.getState().todos;
        let lastAction = store.getState().lastAction;
    
        switch(lastAction.type) {
            case actionsTypes.REMOVE_TODO:
                return TodosList.removeTodo(lastAction.id);
            default:
                return TodosList.refreshTodos({
                    todosElement: document.querySelector('.todo-list-js'), 
                    todos, 
                    onTodoClick: (id) => {
                        store.dispatch(toggleTodo(id));
                    }, 
                    onTodoBtnClick: (id) => {
                        store.dispatch(removeTodo(id));
                    }
                });
        }
    });
    
    return TodosList.create({
        todos: store.getState().todos,
        onTodoClick: (id) => store.dispatch(id),
        onTodoBtnClick: (id) => store.dispatch(id)
    });
}