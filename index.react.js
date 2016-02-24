import {createStore, combineReducers} from 'redux-lite';
import todos from './reducers/todos';
import {addTodo, toggleTodo, removeTodo} from './actions/todos';

import React, {Component} from 'react';
import ReactDOM from 'react-dom';

let store = createStore(combineReducers({
    todos: todos
}));

store.dispatch({
    type: 'FIRST'
});

function Todo({text, onClick, completed, onRemoveClick}) {
    const style = {textDecoration: completed ? 'line-through': ''};
    
    return (<li onClick={onClick} style={style}>
        {text} <button onClick={onRemoveClick}>x</button>
    </li>);
}

function TodosList({todos, onClick, onRemoveClick}) {
    return (
      <ul>
        {todos.map((todo) => {
            return <Todo key={todo.id} text={todo.text} 
                         completed={todo.completed}
                         onClick={ () => onClick(todo.id)}
                         onRemoveClick={() => onRemoveClick(todo.id)}/>;
        })}
      </ul>
    );
}

let TodosContainer = React.createClass({
    onTodoRemoveClick(id) {
        store.dispatch((removeTodo(id)));
    },
    onTodoClick(id) {
        store.dispatch(toggleTodo(id));
    },
    getInitialState() {
        return this.props.store.getState();
    },
    componentDidMount() {
        this.props.store.subscribe(() => {
            this.setState(this.props.store.getState());
        });
    },
    render() {
        return <TodosList todos={this.state.todos} 
                          onClick={this.onTodoClick}
                          onRemoveClick={this.onTodoRemoveClick}/>;
    }
});

let AddTodo = () => {
    let input;
    
    return (
        <div>
            <input ref={node => {input = node} } />
            <button onClick={() => {
                store.dispatch(addTodo(input.value));
                input.value = '';
            }}>Add Todo</button>
        </div>
    );
};

let TodoApp = React.createClass({
    render: () => (
        <div>
            <AddTodo />
            <TodosContainer store={store}/>
        </div>    
    )
});

ReactDOM.render(<TodoApp />, document.querySelector('.main-js'));