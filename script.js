let todoInput= document.getElementById('todo-input')
let todoNode = document.getElementById('todo-list')

document.addEventListener('DOMContentLoaded',displayTodo)
let todoList = JSON.parse(localStorage.getItem('todoList'))

if(todoList == null){
    todoList = []
}





console.log(todoList)

function addTodo(){
    if( todoInput.value !==""){
        todoList.push(todoInput.value)
        localStorage.setItem('todoList', JSON.stringify(todoList))
        displayTodo()
        todoInput.value =""
    }

}

function displayTodo(){
    
    todoList = JSON.parse(localStorage.getItem('todoList'))
    if(todoList == null){
        todoList = []
    }
    todoNode.innerHTML =``;

    for (i = 0; i < todoList.length; ++i){
        todoNode.innerHTML += `<li>
                        <div><i class="fas fa-asterisk"></i> ${todoList[i]}</div>
                        <div>
                            <button id="edit" onclick="editTodo(${i})">Edit</button>
                            <button onclick="deleteTodo(${i})">Delete</button>
                        </div>
                     </li>`
    }
}

function deleteTodo(index){
    todoList.splice(index,1)
    localStorage.setItem('todoList',JSON.stringify(todoList))
    displayTodo()
}

function editTodo(index){
    // todoList[index] = prompt('Edit Todo', todoList[index])
    document.getElementById('index').value = index
    document.getElementById('todo-input').value = todoList[index]
    document.getElementById('update').classList.remove('invisible')
    document.getElementById('add-todo').classList.add('invisible')
    localStorage.setItem('todoList', JSON.stringify(todoList))

    
    displayTodo()
}

function updateTodo(){
    if( todoInput.value !==""){
     document.getElementById('update').classList.add('invisible')
    document.getElementById('add-todo').classList.remove('invisible')
    let updatedTodo = document.getElementById('todo-input').value

    

    todoList = JSON.parse(localStorage.getItem('todoList'))
    todoList[document.getElementById('index').value] = updatedTodo
    localStorage.setItem('todoList', JSON.stringify(todoList))
    document.getElementById('index').value=""
    document.getElementById('todo-input').value =""
    displayTodo()
    }
}