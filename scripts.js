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

let isImportantTodo = document.querySelector('#isImportantTodo');

function addItem(click) {
	click.preventDefault();
	let todoList = document.querySelector('#todoList');
	let todoInput = document.querySelector('#todoInput').value;
	let newTodo = document.createElement('div');
	newTodo.setAttribute("id", "`{Date.now()}`");
	// Allows focus/blur CCS styling
	newTodo.setAttribute("tabindex", "0");


	if (todoInput === "") {
			alert('Please add a Task!');
	} else {
		let newTask = new taskItem(todoInput, false, isImportantTodo.checked);
		todoArray.push(newTask);
		newTodo.className = 'todoItem';
		if (isImportantTodo.checked) {
			newTodo.classList.add("important")
		}
		newTodo.innerHTML = 
		`<div class="task-content">
			<h4>${newTask.getContent()}</h4>
		</div>
		<div class="button-group">
		</div>`
		todoList.appendChild(newTodo);

		// A different event listener is applied to each button

		let removeTodo = document.createElement("button");
		removeTodo.className = "btn btn-danger";
		removeTodo.innerText = "Remove";
		removeTodo.addEventListener("click", removeItem);



		let completeTodo = document.createElement("button");
		completeTodo.className = "btn btn-success";
		completeTodo.innerText = "Complete";
		completeTodo.addEventListener("click", markComplete);
		


		let editTodo = document.createElement("button");
		editTodo.className = "btn btn-dark";
		editTodo.innerText = "Edit";
		editTodo.addEventListener("click", editContent);

		newTodo.children[1].appendChild(removeTodo);
		newTodo.children[1].appendChild(completeTodo);
		newTodo.children[1].appendChild(editTodo);
		
	 		document.querySelector('#todoInput').value = '';
		}
	 }


function removeItem(click) {
	todoList.removeChild(click);
}

function markComplete(click) {

}

function editContent(click) {

}