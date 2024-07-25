
var inputTask = document.getElementById("task");
var btn = document.getElementById("btn");

btn.addEventListener("click", function () {
  addTodo();
});

async function addTodo() {
  console.log(inputTask.value);
  var data = {
    title: inputTask.value,
    apiKey: "6665d6bc60a208ee1fdb9a15",
  };
  var response = await fetch("https://todos.routemisr.com/api/v1/todos", {
    method: "post",
    body: JSON.stringify(data),
    headers: { "content-type": "application/json" },
    cache:'default'
  });
  var data = await response.json();
  console.log(data);
  if (data.message == "success") {
    getAllTodo();
  }
}

async function getAllTodo() {
  var response = await fetch(
    "https://todos.routemisr.com/api/v1/todos/6665d6bc60a208ee1fdb9a15"
  );
  var data = await response.json();
  console.log(data);
  display(data.todos);
}

function display(alltasks) {
  var content = ``;
  for (var i = 0; i < alltasks.length; i++) {
    content += `
 <div class="${alltasks[i].completed?'bg-danger' : ''} tasks my-3 rounded text-light d-flex justify-content-between w-75 m-auto px-3 py-2 align-items-center">
 <div class="task">
     <p class="${alltasks[i].completed?'text-decoration-line-through': ''} task-text m-0 p-0">${alltasks[i].title}</p>
 </div>
 <div>
    <i onclick="taskCompleted('${alltasks[i]._id}')" class="fa-regular fa-circle-check"></i>
     <i onclick="deleteTodo('${alltasks[i]._id}')" class="fa-solid fa-trash mx-2"></i>
 </div> 
 </div>

`;
  }
  document.getElementById("tasks").innerHTML = content;
}

getAllTodo()


async function taskCompleted(todo_id){
console.log(todo_id)
var obj={
todoId:todo_id
}

var response=await fetch('https://todos.routemisr.com/api/v1/todos',{
method:'put',
body:JSON.stringify(obj),
headers:{'content-type':'application/json'}
})

var result =await response.json()
if(result.message == 'success'){
getAllTodo()
}
}


async function deleteTodo(todo_id){
    var obj={
        todoId:todo_id
        }
        
        var response=await fetch('https://todos.routemisr.com/api/v1/todos',{
        method:'delete',
        body:JSON.stringify(obj),
        headers:{'content-type':'application/json'}
        })
        
        var result =await response.json()
        if(result.message == 'success'){
        getAllTodo()
        }
}

// if(){

// }else{

// }

// ternary operator
// condition?'':''


