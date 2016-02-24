export function create({todo, onClick, onBtnClick}) {
    let li = document.createElement('li');
    let btn = document.createElement('button');

    li.classList.add(`todo-id-${todo.id}`);
    
    li.textContent = todo.text;
    li.style.textDecoration = todo.completed ? 'line-through' : null;
    btn.textContent = 'x';

    li.addEventListener('click', onClick);
    btn.addEventListener('click', onBtnClick);
    
    li.appendChild(btn);
    
    return li;
}

export function remove(id) {
    let todoElement =  document.querySelector(`.todo-id-${id}`);

    todoElement.remove();
    todoElement = null; 
}

export function toggle(todo) {
    let todoElement =  document.querySelector(`.todo-id-${todo.id}`);

    window.requestAnimationFrame(function() {
        todoElement.style.textDecoration = todo.completed ? 'line-through' : null;
        todoElement = null;
    });
}

export function inDom(id) {
    return document.querySelector(`.todo-id-${id}`);
}