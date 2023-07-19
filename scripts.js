let todoArray = [];

let addTodo = document
	.querySelector('.btn-primary')
	.addEventListener('click', addItem);

// let todoList = document.querySelector('#todoList');
// let todoInput = document.querySelector('#todoInput').textContent;
// let newTodo = document.createElement('li');
let removeTodo = document
	.querySelector('.btn-danger')
	.addEventListener('click', removeItem);
let completeTodo = document.querySelector('.btn-success');
let isImportantTodo = document.querySelector('#isImportantTodo');
console.log(isImportantTodo);

function addItem(click) {
	click.preventDefault();
	let todoList = document.querySelector('#todoList');
	let todoInput = document.querySelector('#todoInput').value;
	let newTodo = document.createElement('li');
	if (todoInput != '') {
		newTodo.textContent = todoInput;
		if (isImportantTodo.checked) {
			newTodo.className = 'list-group-item todoItem important';
		} else {
			newTodo.className = 'list-group-item todoItem';
		}
		todoArray.push(todoList.appendChild(newTodo));
		console.log(todoArray);
		document.querySelector('#todoInput').value = '';
	} else {
		alert('Please add a Task!');
	}
}

function removeItem(click) {
	todoList.removeChild(click);
}
