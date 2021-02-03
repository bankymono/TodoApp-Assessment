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
        todoNode.innerHTML += `<li draggable=true class="list-item">
                        <div><i class="fas fa-asterisk"></i> ${todoList[i]}</div>
                        <div>
                            <button id="edit" onclick="editTodo(${i})">Edit</button>
                            <button id="delete" onclick="deleteTodo(${i})">Delete</button>
                        </div>
                     </li>`
    }

    var items = document.querySelectorAll('#todo-list li')
var dragged = null;


for( let i  of  items){
    i.addEventListener('dragstart', function(){
        dragged = this;
        for(it of items){
            if(it != dragged){
                it.classList.add('hint')   
            }
        }
    })

    i.addEventListener('dragenter', function(){
        if(this != dragged){this.classList.add('active')}
    });

    i.addEventListener('dragleave', function(){
        this.classList.remove('active')
    });

    i.addEventListener('dragend', function(){
        for(it of items){
            it.classList.remove('hint')
            it.classList.remove('active')
        }
    });

    // i.addEventListener('drag', function(e){
        
    // });

    i.addEventListener('dragover', function(e){
        e.preventDefault()
    });

    i.addEventListener('drop', function(e){
        e.preventDefault()
        if(this != dragged){
            let all = document.querySelectorAll('#todo-list li'), draggedpos = 0, droppedpos = 0;

            for(let it =0; it < all.length; ++it ){
                if(dragged == all[it]) draggedpos = it;
                if(this == all[it]) droppedpos = it;
            }

            if(draggedpos < droppedpos){
                this.parentNode.insertBefore(dragged,this.nextSibling);
            }else{
                this.parentNode.insertBefore(dragged,this);
            }
        }
    });
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