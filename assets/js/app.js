const app = {
    tasksLists: [
        {
            id: 1,
            activeTasks: 0,
            totalTasks: 7,
            levelOfCompletion: 0,
        },
    ],
    init: () => {
       app.loadEvents();
    },
    countTasksList: () => {
        // new Property the number of lists
        app.activeTasksLists = app.tasksLists.length;
    },
    loadEvents: () => {
         // loadevent listeners on checkbox
         const checkboxes = document.querySelectorAll('.checkbox');
         checkboxes.forEach((checkbox) => {
             checkbox.addEventListener('click', app.handleClickOnCheckbox);
         })
         // loadeventlisteners on button reset (unchecked all tasks)
         const resetsButtons = document.querySelectorAll('.reset-button');
         resetsButtons.forEach((resetButton) => {
            resetButton.addEventListener('click', app.handleClickOnResetButton);
         })
 
         // buttons add
         const addsButtons = document.querySelectorAll('.add-button');
         addsButtons.forEach((addButton) => {
            addButton.addEventListener('click', app.handleAddTask);

         })

         const inputs = document.querySelectorAll('.input-task');
         inputs.forEach((input) => {
             input.addEventListener('change', app.handleInputTask);
             input.addEventListener('blur', app.leaveInputTask);
             input.addEventListener('keydown', app.handleInputKeyboard);

         })
 
         const taskNames = document.querySelectorAll('.task-name');
         taskNames.forEach((task) => {
             task.addEventListener('click', app.handleModifyTask);
         })

         const taskDelete = document.querySelectorAll('.delete-task');
         taskDelete.forEach((task) => {
             task.addEventListener('click', app.handleDeleteTasks);
         })

         const newTodolistButton = document.querySelector('.new-todolist');
         newTodolistButton.addEventListener('click', app.handleClickOnNewTodolist);

    },
    handleClickOnCheckbox: (e) => {
        e.currentTarget.classList.toggle('checked');
        const currentTaskList = e.currentTarget.closest('.todolist');

        app.listGrooming(currentTaskList);
    },
    handleDeleteTasks: (e) => {
        const currentTaskList = e.currentTarget.closest('.todolist');
        const task = e.currentTarget.closest('.task');

        task.remove();

        app.listGrooming(currentTaskList);
    },
    listGrooming: (currentTaskList) => {
        const id = currentTaskList.dataset.id;
        const listObject = app.tasksLists.find(list => list.id == id);

        let numberOfActiveTasks = 0;
        let numberOfTasks = 0;
        const checkboxes = currentTaskList.querySelectorAll('.checkbox');
        checkboxes.forEach((checkbox) => {
            numberOfTasks += 1;
            if(checkbox.classList.contains('checked')) {
                numberOfActiveTasks += 1;
            }
        })

        listObject.activeTasks = numberOfActiveTasks;
        listObject.totalTasks = numberOfTasks;

        const progressBarText = currentTaskList.querySelector('.progress-bar-percentage');

        const progressBar = currentTaskList.querySelector('.progressbar');

        if(listObject.activeTasks == 0) {

            progressBarText.textContent = 0;

            progressBar.style.width = 0 + '%';

            listObject.levelOfCompletion = 0;

            return;
        } else {
            listObject.levelOfCompletion = Math.round((100 * listObject.activeTasks) / listObject.totalTasks);


            progressBarText.textContent = listObject.levelOfCompletion;


            progressBar.style.width = listObject.levelOfCompletion + '%';

        }

        if(listObject.levelOfCompletion == 100) {
            app.handleModal(currentTaskList, listObject);
        }

        // Maj state
        app.updateAListOnState(listObject, id);

    },
    updateAListOnState: (listObject, id) => {

        const tasksLists = app.tasksLists.map((list) => {
            if(list.id == id) {
                list = listObject;
            }
            return list;
        })
        app.tasksLists = tasksLists;

        console.log(app.tasksLists);

    },
    handleClickOnResetButton: (e) => {
        const currentTaskList = e.currentTarget.closest('.todolist');
        const checkboxes = currentTaskList.querySelectorAll('.checkbox');
        checkboxes.forEach((checkbox) => {
            checkbox.classList.remove('checked');
        })
        app.listGrooming(currentTaskList);
    },
    handleModal: (currentTaskList, listObject) => {
        const modal = currentTaskList.querySelector('.modal');

        if(listObject.levelOfCompletion === 100){
         modal.classList.add('visible');
         setTimeout(() => {
            modal.classList.remove('visible');
            }, 4000);
        } else {
            modal.classList.remove('visible');
        }
        if(modal.classList.contains('visible')){
            const closeModal = currentTaskList.querySelector('.close-modal');
            closeModal.addEventListener('click', () => {
                modal.classList.remove('visible');
            });
        }
    },
    handleModifyTask: (e) => {
        const currentTask = e.currentTarget;
        const input = currentTask.previousElementSibling;
        currentTask.style.display = 'none';
        input.style.display = 'block';
        input.value = currentTask.textContent;

        input.focus();
    },
    handleInputKeyboard: (e) => {
        if (e.defaultPrevented) {
            return;
          }
        
          switch (e.key) {
            case "Enter":
                const input = e.currentTarget;
                const taskName = input.nextElementSibling;
                if(input.value === ''){
                    taskName.textContent = 'Nouvelle tâche';
                    input.style.display = 'none';
                    taskName.style.display = 'block';
                } else {
                    input.style.display = 'none';
                    taskName.style.display = 'block';
                }
              break;
            default:
              return; // Quitter lorsque cela ne gère pas l'événement touche.
          }
    },
    leaveInputTask: (e) => {
        const input = e.currentTarget;
        const taskName = input.nextElementSibling;
        if(input.value === ''){
            taskName.textContent = 'Nouvelle tâche';
            input.style.display = 'none';
            taskName.style.display = 'block';
        } else {
            input.style.display = 'none';
            taskName.style.display = 'block';
        }
    },
    handleAddTask: (e) => {
        const currentTaskList = e.currentTarget.closest('.todolist');
        const id = currentTaskList.dataset.id;
        
        const tasksLists = app.tasksLists.map((list) => {
            if(list.id == id) {
                list.totalTasks += 1;
            }
            return list;
        })

        app.tasksLists = tasksLists;

        console.log(app.tasksLists);

        const template = document.querySelector('#task');
        const clone = document.importNode(template.content, true);
        const taskName = clone.querySelector('.task__content__name > p');
        taskName.style.display = 'none';
        const inputTask = clone.querySelector('.input-task');
        inputTask.style.display = 'block';
        inputTask.value = taskName.textContent;
        


        currentTaskList.appendChild(clone);

        app.loadEvents();
        inputTask.focus();
    },
    handleInputTask: (e) => {
        const input = e.currentTarget;
        const taskName = input.nextElementSibling;
        taskName.textContent = input.value;
    },
    handleClickOnNewTodolist: (e) => {
        let id = 1;
        app.tasksLists.forEach((list) => {
            if(list.id >= id) {
                id = list.id + 1;
            }
        })
        const newTaskList = {
            id,
            activeTasks: 0,
            totalTasks: 0,
            levelOfCompletion: 0,
        }

        app.tasksLists.push(newTaskList);

        const newTodolist = document.querySelector('#todolist');
        const todolist = document.importNode(newTodolist.content, true);
        const div = todolist.querySelector('.todolist')
        div.dataset.id = id;

        const todolistsContainer = document.querySelector('.todolists-container');
        todolistsContainer.appendChild(todolist);


        app.loadEvents();
        app.countTasksList();
    }
}


document.addEventListener('DOMContentLoaded', app.init);