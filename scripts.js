let todoArray = [];

class taskItem {
	static globalID = 0;
	constructor(content, completed, important) {
		// String - text of the to-do item itself
		this.content = content;
		// Boolean - if item is completed (default: false)
		this.completed = completed;
		// Boolean - if item was marked as important (default: false)
		this.important = important;
		this.taskID = taskItem.globalID;
		taskItem.globalID++;
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

	getId() {
		return this.taskID;
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

	if (todoInput === '') {
		alert('Please add a Task!');
	} else {
		let newTask = new taskItem(todoInput, false, isImportantTodo.checked);
		todoArray.push(newTask);
		newTodo.className = 'todoItem border border-tertiary rounded p-2 mb-1';
		newTodo.setAttribute('id', newTask.getId());
		newTodo.innerHTML = `<div>
	<p class="task-content m-1">${newTask.getContent()}</p>
	</div>
	<div class="btn-group mt-2" role="group">
	</div>`;

		if (isImportantTodo.checked) {
			newTodo.classList.add('important');
			newTodo.innerHTML = `<div>
			
		<p class="task-content m-1">${newTask.getContent()}</p>
		<div>
		<span class="badge bg-warning-subtle text-warning-emphasis rounded-pill">Important!</span>
		</div>
		</div>
		<div class="btn-group mt-2" role="group">
		</div>`;
		} else {
			newTodo.innerHTML = `<div>
		<p class="task-content m-1">${newTask.getContent()}</p>
		</div>
		<div class="btn-group mt-2" role="group">
		</div>`;
		}
		todoList.appendChild(newTodo);

		let removeTodo = document.createElement('button');
		removeTodo.className = 'btn btn-danger btn-sm';
		removeTodo.innerHTML = `<ion-icon name="trash"></ion-icon> Remove`;
		removeTodo.addEventListener('click', removeItem);

		let completeTodo = document.createElement('button');
		completeTodo.className = 'btn btn-success btn-sm';
		completeTodo.innerHTML = `<ion-icon name="checkmark-done"></ion-icon> Complete`;
		completeTodo.id = 'taskID' + todoArray[todoArray.length - 1].taskID;
		completeTodo.addEventListener('click', markComplete);

		let editTodo = document.createElement('button');
		editTodo.className = 'btn btn-dark btn-sm';
		editTodo.innerHTML = `<ion-icon name="create"></ion-icon> Edit`;
		editTodo.id = 'taskID' + todoArray[todoArray.length - 1].taskID;
		editTodo.addEventListener('click', editContent);

		newTodo.children[1].appendChild(editTodo);
		newTodo.children[1].appendChild(completeTodo);
		newTodo.children[1].appendChild(removeTodo);

		// Resets text box
		document.querySelector('#todoInput').value = '';
	}
}

function removeItem(click) {
	if (
		confirm(
			"Are you sure you wish to remove this Task? (This action can't be undone.)"
		)
	) {
		// The following DOM traversal goes up two levels (to btn-group and then to the div enclosing the entire task).
		let parentElement = click.target.parentNode.parentNode;

		let taskToDelete = todoArray.find((todo) => {
			return todo.taskID == parentElement.id;
		});		
		todoArray.splice(todoArray.indexOf(taskToDelete), 1);
		parentElement.remove();
	}
}

function markComplete(click) {
	if (!todoArray[click.target.id.replace('taskID', '')].completed) {
		let badge = document.createElement('span');
		badge.className =
			'badge bg-success-subtle text-success-emphasis rounded-pill';
		badge.innerText = 'Completed';
		badge.id = click.target.id;
		todoArray[badge.id.replace('taskID', '')].completed = true;
		click.target.parentNode.previousElementSibling.appendChild(badge);
	}
}

function editContent(click) {
	// taskContent points to the task-content m-1 element.
	let taskContent = click.target.parentNode.previousElementSibling.children[0];
	if (!document.querySelector('#editBox')) {
		let newContent = document.createElement('div');
		newContent.innerHTML = `<form id="editBox">
   <input class="form-control w-50" type="text" value= ${taskContent.innerText}></form>
   `;
		newContent.setAttribute('type', 'text');
		newContent.setAttribute('value', taskContent.innerText);
		newContent.id = 'editBox';
		newContent.className = click.target.id;
		taskContent.style.display = 'none';
		taskContent.parentNode.appendChild(newContent);
	} else {
		let taskEdit =
			document.querySelector('#editBox').children[0].children[0].value;
		// console.log(taskEdit);
		let tempID = document
			.querySelector('#editBox')
			.className.replace('taskID', '');

		todoArray[parseInt(tempID, 10)].content = taskEdit;
		taskContent.style.display = 'block';
		taskContent.innerText = taskEdit;
		document.querySelector('#editBox').remove();
	}
}

function editTask(e) {
	e.preventDefault();
	let modifiedTaskContent = e.target.children[0].value;
	let modifiedTask = document.createElement('div');
	modifiedTask.innerHTML = `<div>
  <p class="task-content m-1">${modifiedTaskContent}</p>
</div>`;
	modifiedTask.replaceChild(modifiedTask, modifiedTaskContent);
}

//Prevent Enter keys from refreshing the page
document.addEventListener('keypress', function (e) {
	// Check if the key that was pressed is the Enter key
	if (e.code === 'Enter') {
		// Prevent the default action of the Enter key from happening
		e.preventDefault();
		// Return false to stop the event from bubbling up the DOM tree
		return false;
	}
});
