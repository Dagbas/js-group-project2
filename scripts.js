let todoArray = [];

class taskItem {
	constructor(content, completed, important) {
		// String - text of the to-do item itself
		this.content = content;
		// Boolean - if item is completed (default: false)
		this.completed = completed;
		// Boolean - if item was marked as important (default: false)
		this.important = important; 
	}

	getContent() {
		return this.content;
	}

	isCompleted() {
		return this.completed;
	}

	isImportant() {
		return this.important;
	}
}

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

	// The following code does the same as the below code,
	// but it creates a new taskItem and pushes it into the todoArray.
	// I've tested it and it's functional.
	// - Mozen

	// if (todoInput === "") {
	//		alert('Please add a Task!');
	// } else {
	// 		let newTask = new taskItem(todoInput, false, isImportantTodo.checked);
	// 		todoArray.push(newTask);
	// 		newTodo.className = 'list-group-item todoItem';
	// 		if (isImportantTodo.checked) {
	//			newTodo.classList.add("important")
	//		}
	//		newTodo.textContent = newTask.getContent();
	// 		document.querySelector('#todoInput').value = '';
	// 		todoList.appendChild(newTodo);
	//	}
	// }
	// ^ (end of function)




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
