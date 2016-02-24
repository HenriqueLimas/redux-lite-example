import * as Todo from './Todo';

export function create({todos, onTodoClick, onTodoBtnClick}) {
    let ul = document.createElement('ul');
    let docFragment = document.createDocumentFragment();
    
    ul.classList.add('todo-list-js');

    for(let i = 0, length = todos.length; i < length; i++) {
        let todo = todos[i];
        
        docFragment.appendChild(Todo.create(
            getConfigTodo({todo, onTodoClick, onTodoBtnClick})    
        ));
    }
    
    ul.appendChild(docFragment);
    docFragment = null;

    return ul;
}

export function refreshTodos({todosElement, todos, onTodoClick, onTodoBtnClick}) {
    for(let i = 0, length = todos.length; i < length; i++) {
        let todo = todos[i];
        
        if (!Todo.inDom(todo.id)) {
            todosElement.appendChild(Todo.create(
                getConfigTodo({todo, onTodoClick, onTodoBtnClick})    
            ));
        } else {
            toggleTodo(todo);
        }
    }
}

export function removeTodo(id) {
    Todo.remove(id);
}

export function toggleTodo(todo) {
    Todo.toggle(todo);
}

function getConfigTodo({todo, onTodoClick, onTodoBtnClick}) {
    return {
        todo,
        onClick: ((id) => {
            return () => onTodoClick(id);
        })(todo.id),
        onBtnClick: ((id) => {
            return () => onTodoBtnClick(id);
        })(todo.id)
    };
}