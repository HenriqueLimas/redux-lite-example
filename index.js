import {createStore, combineReducers} from 'redux-lite';
import * as router from 'router-redux-lite';

import todos from './reducers/todos';
import lastAction from './reducers/lastAction';

import * as TodosContainer from './components/TodosContainer';
import * as TodoForm from './components/TodoForm';

let main = document.querySelector('.main-js');

let store = createStore(combineReducers({
    todos,
    router: router.reducer,
    lastAction
}));

store.dispatch({
    type: 'FIRST'
});

main.appendChild(TodoForm.create({store}));
main.appendChild(TodosContainer.create({store}));

let routes = [{
    route: '/',
    handler(current) {
        let routerView = document.querySelector('.route-view-js');
        window.requestAnimationFrame(function() {
            routerView.innerHTML = '';    
            routerView = null;
        });
    }
},
{
    route: '/path',
    handler(current) {
        let routerView = document.querySelector('.route-view-js');
        
        window.requestAnimationFrame(function() {
            routerView.innerHTML = 'Path route';    
            routerView = null;
        });
        
    }
}];

router.config({store, routes, history: window.history});

document.querySelector('.go-to-js').addEventListener('click', function() {
    store.dispatch(router.actions.navigate('/path'));
});