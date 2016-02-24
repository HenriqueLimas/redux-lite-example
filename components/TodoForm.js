import {addTodo} from '../actions/todos';

export function create({store}) {
    let form = document.createElement('form');
    let inputTextNewTodo = document.createElement('input');
    let btnAddTodo = document.createElement('input');
    
    inputTextNewTodo.classList.add('todo-text-new-js');
    btnAddTodo.classList.add('add-todo-js');
    
    btnAddTodo.value = 'Add';
    btnAddTodo.type = 'submit';
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        let input = document.querySelector('.todo-text-new-js');
        let text = input.value;
        
        if (text) {
            store.dispatch(addTodo(text));
            input.value = null;
        }
        
        input = null;
    });
    
    form.appendChild(inputTextNewTodo);
    form.appendChild(btnAddTodo);
    
    return form;
}