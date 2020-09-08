const toDoForm = document.querySelector(".js-toDoForm"),
toDoInput = toDoForm.querySelector("input"),
toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = 'toDOs';

function filterFn(ToDo){
    
}

let toDos=[];

function deleteToDo(event){
    const button = event.target;
    const li = button.parentNode;
    toDoList.removeChild(li);
    const cleanToDOs = toDos.filter(function(toDo){
        return toDo.id !== parseInt(li.id);

    });
   toDos = cleanToDOs;
   saveToDos(); 
    

    
}

function saveToDos(){
    localStorage.setItem(TODOS_LS,JSON.stringify(toDos));
  

}

function paintToDO(text){
    const delButton = document.createElement("button");
    const li = document.createElement("li");
    const span = document.createElement("span");
    const newId = toDos.length+1;
    delButton.innerText="✔";
    delButton.addEventListener("click",deleteToDo);
    span.innerText = text;
    li.appendChild(delButton);
    li.appendChild(span);
    li.id = newId;

    toDoList.appendChild(li);
    const ToDoObject = {
        text:text,
        id : newId
    };
    toDos.push(ToDoObject);
    saveToDos();
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDO(currentValue);
    toDoInput.value="";
}

function loadToDOs(){
    const loadedTodos = localStorage.getItem(TODOS_LS);
    if(loadedTodos !== null){
        const parsedToDos = JSON.parse(loadedTodos);
        parsedToDos.forEach(function(toDo){
            paintToDO(toDo.text);
        });
        }

    }

function init(){
    loadToDOs();
    toDoForm.addEventListener("submit", handleSubmit);

}
init();