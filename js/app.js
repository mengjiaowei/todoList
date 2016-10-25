//problem: User Interaction doesn't provide desired results
//Solution: Add interactivity so the user can manage daily tasks.

var taskInput = document.getElementById("new-task"); //new-task
var addButton=document.getElementsByTagName("button")[0]; //first button
var inCompleteTasksHolder = document.getElementById("incomplete-tasks"); //incomplete-tasks
var completedTasksHolder = document.getElementById("completed-tasks");//completed-tasks


//New Task List Item 
var createNewTaskElement = function(taskString){
  //Create List Item
  var listItem = document.createElement("li");
  //input (checkbox)
  var checkBox = document.createElement("input");//checkbox
    //label 
  var label = document.createElement("label");
    //input(text)
  var editInput = document.createElement("input");
    //button.edit
  var editButton = document.createElement("button");
    //button delete
  var deleteButton = document.createElement("button");
  //Each elements, needs modified
  checkBox.type="checkbox";
  editInput.type= "text";
  label.innerText = taskString;
  editButton.innerText = "Edit";
  editButton.className = "edit";
  deleteButton.innerText = "Delete";
  deleteButton.className = "delete";
  
  //Each elements, needs appended
 
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  
  return listItem;

}

//Add a new task
var addTask = function(){
  console.log("Add task...");
  //when the button is pressed
  //Create a new list item with text from #new-task:
 var listItem = createNewTaskElement(taskInput.value);  
 
  //Append listItem to inCompleteTaskHolder
 inCompleteTasksHolder.appendChild(listItem);
 bindTaskEvents(listItem, taskCompleted);
 taskInput.value = "";
}
//Edit an existing task
var editTask = function() {
  console.log("Edit task...");  
  var listItem = this.parentNode;
  var editInput = listItem.querySelector("input[type=text]");
  var label =listItem.querySelector("label");
  var containsClass = listItem.classList.contains("editMode");
    //if the class of the parenet is .editMode
  if(containsClass){
      //Switch from .editMode
      //label text become the input's value
      label.innerText = editInput.value;
  }else{
    //Switch to editMode
    //input value becomes the label's text
    editInput.value = label.innerText;
    
  }
     //Toggle .editMode on the listeItem
  listItem.classList.toggle("editMode");
}
//Delete an existing task
var deleteTask = function() {
  console.log("Delete task...");  
  var listItem = this.parentNode;
  var ul = listItem.parentNode;
    //Remove the parent list item from the ul
  ul.removeChild(listItem);
}
//Mark a Task as complete
var taskCompleted = function () {
    console.log("Task completed");
    //Append the task list item to the #completed-tasks
    var listItem = this.parentNode;
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);

}




//Mark a task as incomplete
var taskIncomplete = function () {
    console.log("Task incomplete...");
  //When the task list item to the #incomplete-task
      var listItem = this.parentNode;
    inCompleteTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
}  
var bindTaskEvents = function(taskListItem, checkBoxEventHandler){
  console.log("Bind list item event");
 //select taskListItem's children
  var checkBox = taskListItem.querySelector("input[type=checkBox]");
  var editButton = taskListItem.querySelector("button.edit");
  var deleteButton = taskListItem.querySelector("button.delete");
    //bind editTask to edit button
   editButton.onclick = editTask;
    //bind deleteTask to delete button
   deleteButton.onclick = deleteTask;
    //bind checkBoxEventHandler to checkBox
  checkBox.onchange = checkBoxEventHandler;


}
var ajaxRequest = function() {
  console.log("AJAX request");
}

//set the click handler to the addTask function
addButton.addEventListener("click",addTask);  
addButton.addEventListener("click",ajaxRequest);  
//cycle over completeTasksHolder ul list items
for(var i = 0; i < inCompleteTasksHolder.children.length;i++){
    
    //bind events to list item's children (taskCompleted)
    bindTaskEvents(inCompleteTasksHolder.children[i],taskCompleted);

}

//cycle over incompleteTasksHolder ul list items
for(var i = 0; i < completedTasksHolder.children.length;i++){
    
    //bind events to list item's children (taskCompleted)
    bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);

}













