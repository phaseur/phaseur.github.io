const app = {
    activeTodoLists: 1,
    levelOfCompletion: 0,
    activeTasks: 0,
    totalTasks: 0,
    init: () => {
       app.loadEvents();
    },
    loadEvents: () => {
         // loadevent listeners on checkbox
         const checkboxes = document.querySelectorAll('.checkbox');
         checkboxes.forEach((checkbox) => {
             checkbox.addEventListener('click', app.handleClickOnCheckbox);
         })
         // loadeventlisteners on button reset (unchecked all tasks)
         const resetButton = document.querySelector('.reset-button');
         resetButton.addEventListener('click', app.handleClickOnResetButton);
 
         // button add
         const addButton = document.querySelector('.add-button');
         addButton.addEventListener('click', app.handleAddTask);

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

        //  const newTodolistButton = document.querySelector('.new-todolist-button');
        //  newTodolistButton.addEventListener('click', app.handleClickOnNewTodolist);

         app.countTask();
         app.countActiveTasks();
    },
    handleClickOnCheckbox: (e) => {
        e.currentTarget.classList.toggle('checked');
        app.countActiveTasks();
    },
    handleClickOnResetButton: () => {
        const checkboxes = document.querySelectorAll('.checkbox');
        checkboxes.forEach((checkbox) => {
            checkbox.classList.remove('checked');
        })
        app.countTask();
        app.countActiveTasks();
    },
    handleModal: () => {
        const modal = document.querySelector('.modal');

        if(app.levelOfCompletion === 100){
         modal.classList.add('visible');
        } else {
            modal.classList.remove('visible');
        }
        if(modal.classList.contains('visible')){
            const closeModal = document.querySelector('.close-modal');
            closeModal.addEventListener('click', () => {
                modal.classList.remove('visible');
            });
        }
    },
    countTask: () => {
        app.totalTasks = 0;
        const checkboxes = document.querySelectorAll('.checkbox');
        checkboxes.forEach((checkbox) => {
            app.totalTasks += 1;
        })
    },
    countActiveTasks: () => {
        app.activeTasks = 0;
        const checkboxes = document.querySelectorAll('.checkbox');
        checkboxes.forEach((checkbox) => {
            if(checkbox.classList.contains('checked')) {
                app.activeTasks += 1;
            }
        })

        const progressBarText = document.querySelector('.progress-bar-percentage');

        const progressBar = document.querySelector('.progressbar');

        if(app.totalTasks === 0) {
            app.levelOfCompletion = 0;

            progressBarText.textContent = app.levelOfCompletion;

            progressBar.style.width = app.levelOfCompletion + '%';
            
            return;
        } else {
            app.levelOfCompletion = Math.round((100 * app.activeTasks) / app.totalTasks);

            progressBarText.textContent = app.levelOfCompletion;

            progressBar.style.width = app.levelOfCompletion + '%';
        }

        if(app.levelOfCompletion === 100) {
            app.handleModal();
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
    handleAddTask: () => {
        const template = document.querySelector('#task');
        const clone = document.importNode(template.content, true);
        const taskName = clone.querySelector('.task__content__name > p');
        taskName.style.display = 'none';

        const inputTask = clone.querySelector('.input-task');
        inputTask.style.display = 'block';
        inputTask.value = taskName.textContent;
        const tasks = document.querySelector('.todolist');
        tasks.appendChild(clone);

        app.loadEvents();
        inputTask.focus();
    },
    handleInputTask: (e) => {
        const input = e.currentTarget;
        const taskName = input.nextElementSibling;
        taskName.textContent = input.value;
    },
    handleDeleteTasks: (e) => {
        const task = e.currentTarget.closest('.task');
        task.remove();
        app.countTask();
        app.countActiveTasks();
    },
    // handleClickOnNewTodolist: (e) => {
    //     const newTodolist = document.querySelector('#todolist');
    //     const todolist = document.importNode(newTodolist.content, true);

    //     const todolistsContainer = document.querySelector('.todolists-container');
    //     todolistsContainer.appendChild(todolist);
    // }
}

document.addEventListener('DOMContentLoaded', app.init);
