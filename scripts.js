let todoArray = [];

/* Right now, each time a task is added to the list, todoArray is updated in parallel.
There should be a way to update the array and then update the display of tasks based on the array contents...
No idea how to do that right now, but it would make the code more dry, and give us access to taskItem information after the task is displayed.
*/

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
  newTodo.setAttribute('id', `${Date.now()}`);
  // Allows focus/blur CCS styling
  newTodo.setAttribute('tabindex', '0');

  if (todoInput === '') {
    alert('Please add a Task!');
  } else {
    let newTask = new taskItem(todoInput, false, isImportantTodo.checked);
    todoArray.push(newTask);
    newTodo.className = 'todoItem';
    newTodo.innerHTML = `<div>
	<p class="task-content">${newTask.getContent()}</p>
	</div>
	<div class="button-group">
	</div>`;

    if (isImportantTodo.checked) {
      newTodo.classList.add('important');
      newTodo.innerHTML = `<div>
		<p class="task-content">${newTask.getContent()}</p>
		<span class="badge bg-warning-subtle text-warning-emphasis rounded-pill">Important!</span>
		</div>
		<div class="button-group">
		</div>`;
      //   let badge = document.createElement('span');
      //   badge.className =
      //     'badge bg-warning-subtle text-warning-emphasis rounded-pill';
      //   newTodo.appendChild(badge);
    } else {
      newTodo.innerHTML = `<div>
		<p class="task-content">${newTask.getContent()}</p>
		</div>
		<div class="button-group">
		</div>`;
    }
    todoList.appendChild(newTodo);
    // Remove/complete/edit buttons are created, with a different event listener applied to each

    let removeTodo = document.createElement('button');
    removeTodo.className = 'btn btn-danger';
    removeTodo.innerText = 'Remove';
    removeTodo.addEventListener('click', removeItem);

    let completeTodo = document.createElement('button');
    completeTodo.className = 'btn btn-success';
    completeTodo.innerText = 'Complete';
    completeTodo.id = 'taskID' + todoArray[todoArray.length - 1].taskID;
    completeTodo.addEventListener('click', markComplete);

    let editTodo = document.createElement('button');
    editTodo.className = 'btn btn-dark';
    editTodo.innerText = 'Edit';
    editTodo.id = 'taskID' + todoArray[todoArray.length - 1].taskID;
    editTodo.addEventListener('click', editContent);

    newTodo.children[1].appendChild(removeTodo);
    newTodo.children[1].appendChild(completeTodo);
    newTodo.children[1].appendChild(editTodo);

    // Resets text box
    document.querySelector('#todoInput').value = '';
  }
}

function removeItem(click) {
  click.target.parentNode.parentNode.remove();
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
  // This should probably be a variable. It points to the task-content element.
  /**/
  let taskContent = click.target.parentNode.previousElementSibling.children[0];
  if (!document.querySelector('#editBox')) {
    let newContent = document.createElement('div');
    newContent.innerHTML = `<form id="editBox">
   <input type="text" value= ${taskContent.innerText}></form>
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
    console.log(taskEdit);
    let tempID = document
      .querySelector('#editBox')
      .className.replace('taskID', '');

    todoArray[parseInt(tempID, 10)].content = taskEdit;
    taskContent.style.display = 'block';
    taskContent.innerText = taskEdit;
    document.querySelector('#editBox').remove();
  }
  //taskContent.parentNode.replaceChild(newContent, taskContent);
  //document.querySelector('#editTask').addEventListener('submit', editTask);
  /**/
  /*Mine
  let taskContent = click.target.parentNode.previousElementSibling.children[0];
  if (!document.querySelector('#editBox')) {
    console.log(taskContent);

    let newContent = document.createElement('input');
    newContent.setAttribute('type', 'text');
    newContent.setAttribute('value', taskContent.innerText);
    newContent.id = 'editBox';
    newContent.className = click.target.id;
    click.target.parentNode.parentNode.appendChild(newContent);
  } else {
    let taskEdit = document.querySelector('#editBox').value;
    taskContent.innerText = taskEdit;
    let tempID = document
      .querySelector('#editBox')
      .className.replace('taskID', '');

    todoArray[parseInt(tempID, 10)].content = taskEdit;
    document.querySelector('#editBox').remove();
  }
*/
  /* Further progress for this function:
		- hiding the remove/complete/edit button group to disable multiple text elements
		- additional buttons, also with event listeners, to confirm or cancel the edit
		- inserting the text box between its siblings and then removing the task-content element
	*/
}

function editTask(e) {
  e.preventDefault();
  let modifiedTaskContent = e.target.children[0].value;
  let modifiedTask = document.createElement('div');
  modifiedTask.innerHTML = `<div>
  <p class="task-content">${modifiedTaskContent}</p>
</div>`;
  modifiedTask.replaceChild(modifiedTask, modifiedTaskContent);

  // let taskContent = e.target.parentNode.previousElementSibling.children[0];
}
