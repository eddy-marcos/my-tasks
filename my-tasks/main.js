// run when document is done loading
document.body.onload = printTasks;

var form = document.querySelector('#form');
    form.addEventListener('submit', saveTask); // adding submit event

function saveTask(e) {

  var taskText = document.getElementById('text-area').value;
      //if user doesn't type anything, do not submit
      if (taskText == '') {
          alert('Please add some text');
          return false;
      }

  var taskUrgency = document.getElementById('urgency').value;

    //  get an random ID based on current milliseconds
    var init = new Date();
    var taskId = init.getMilliseconds();

    var taskStatus = 'new';

  var task = {
    id: taskId,
    content: taskText,
    urgency: taskUrgency,
    status: taskStatus
  } //task object

  // config local localStorage
  if (localStorage.getItem('tasks') == null) { //check whether localStorage has content
    var tasks = []; // declare tasks array
        tasks.push(task); //push object
    localStorage.setItem('tasks', JSON.stringify(tasks));  //convert to a JSON string

  } else {
    var tasks = JSON.parse(localStorage.getItem('tasks')); //converts to JS object
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
  } //

  e.preventDefault(); // prevent default behavior
  form.reset(); // clear form values
  printTasks(); // call printTasks function
} //saveTask

function printTasks() {

  var tasks = JSON.parse(localStorage.getItem('tasks')); // getting object values
  var output = document.querySelector('#output');

  output.textContent = '';

  for (var value of tasks) {
        var id = value.id;
        var text = value.content;
        var status = value.status;
        var urgency = value.urgency;

    //insert into the DOM
  output.innerHTML +=
  //template strings
`<div class='printedTask'>
    <div class="task-txt">
      <p>${text}</p>
      <p id='info'>
        Task Id: ${id} <span id="margin"> Status: <span class="txt-status">${status}</span></span>
        <span id="margin">Urgency: ${urgency}</span>
        <a href='#' class='taskBtn' onClick='changeStatus(${id})'>Mark Complete</a>
        <a href='#' class='taskBtn' onClick='deleteTask(${id})'>Remove</a>
      </p>
    </div>
  </div>`

} // for of

} //printTasks

function changeStatus(id) {

  var tasks = JSON.parse(localStorage.getItem('tasks'));

  for (let value of tasks) {

    if(value.id == id && value.status == 'new') {
      value.status = 'Completed';
    }
      else { //alert the user, if the task was already completed
            alert('Already Completed');
      }
  }

  localStorage.setItem('tasks', JSON.stringify(tasks));

  printTasks();
} //changeStatus


function deleteTask(id) {
  var tasks = JSON.parse(localStorage.getItem('tasks'));

  for (var i = 0; i < tasks.length; i++) {
    if (tasks[i].id == id) {
      tasks.splice(i, 1);
    }
  }

  localStorage.setItem('tasks', JSON.stringify(tasks));

  printTasks();
} //deleteTask
