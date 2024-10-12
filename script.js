document.addEventListener('DOMContentLoaded', loadTasks);

const addBtn = document.getElementById('addBtn');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

addBtn.addEventListener('click', addTask);

function addTask() {
    const taskValue = taskInput.value.trim();
    if (taskValue === '') return;

    const task = document.createElement('li');
    const taskText = document.createElement('span');
    taskText.textContent = taskValue;

    task.appendChild(taskText);

    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('button-container');

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.classList.add('edit-btn');
    editBtn.addEventListener('click', () => {
        editTask(taskText);
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', () => {
        task.remove();
        saveTasks();
    });

    buttonContainer.appendChild(editBtn);
    buttonContainer.appendChild(deleteBtn);

    task.appendChild(buttonContainer);

    taskText.addEventListener('click', () => {
        task.classList.toggle('completed');
        saveTasks();
    });

    taskList.appendChild(task);
    taskInput.value = '';  
    saveTasks();
}

function saveTasks() {
    const tasks = [];
    taskList.querySelectorAll('li').forEach(task => {
        tasks.push({
            text: task.firstChild.textContent,
            completed: task.classList.contains('completed')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    savedTasks.forEach(taskData => {
        const task = document.createElement('li');
        const taskText = document.createElement('span');
        taskText.textContent = taskData.text;

        if (taskData.completed) {
            task.classList.add('completed');
        }

        task.appendChild(taskText);

        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('button-container');

        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.classList.add('edit-btn');
        editBtn.addEventListener('click', () => {
            editTask(taskText);
        });

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.addEventListener('click', () => {
            task.remove();
            saveTasks();
        });

        buttonContainer.appendChild(editBtn);
        buttonContainer.appendChild(deleteBtn);

        task.appendChild(buttonContainer);

        taskText.addEventListener('click', () => {
            task.classList.toggle('completed');
            saveTasks();
        });

        taskList.appendChild(task);
    });
}


function editTask(taskText) {

    const currentText = taskText.textContent;
    const input = document.createElement('input');
    input.type = 'text';
    input.value = currentText;

    taskText.replaceWith(input);
    input.focus();

    input.addEventListener('blur', () => {
        saveEditedTask(input, taskText);
    });

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            saveEditedTask(input, taskText);
        }
    });
}

function saveEditedTask(input, originalTaskText) {
    const newText = input.value.trim();
    if (newText !== '') {
        originalTaskText.textContent = newText;
        input.replaceWith(originalTaskText);
        saveTasks();
    } else {
        input.replaceWith(originalTaskText);  
    }
}
