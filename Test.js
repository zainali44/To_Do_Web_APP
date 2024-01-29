const input = document.querySelector('input');
const btn = document.querySelector('.addTask > button');
const notCompleted = document.querySelector('.NoCompleted');
const completed = document.querySelector('.Completed');

btn.addEventListener('click', addList);
input.addEventListener('keyup', (e) => {
    e.keyCode === 13 ? addList(e) : null;
});

let taskList = [];

function addList(e) {
    if (input.value !== '') {
        const currentDate = new Date().toLocaleDateString();
        const task = {
            name: input.value,
            completed: false,
            date: currentDate,
        };
        taskList.push(task);
        input.value = '';
        renderTask(task);
        saveData();
    } else {
        alert('Please enter a task');
    }
}

function renderTask(task) {
    const newLi = document.createElement('li');
    const checkBtn = document.createElement('button');
    const delBtn = document.createElement('button');

    checkBtn.innerHTML = '<div class="check"><i class="fa fa-check"></i></div>';
    delBtn.innerHTML = '<div class="trash"><i class="fa fa-trash"></i></div>';


    const dateElement = document.createElement('span');
    dateElement.classList.add('task-date'); // Add a class for the date element
    dateElement.textContent = task.date;
    // newLi.appendChild(dateElement);



    newLi.textContent = task.name;
    newLi.appendChild(checkBtn);
    newLi.appendChild(delBtn);
    newLi.setAttribute('task-date', task.date);
    newLi.appendChild(dateElement);
    

    if (task.completed) {
        completed.appendChild(newLi);
        checkBtn.style.display = 'none';
    } else {
        notCompleted.appendChild(newLi);
    }

    checkBtn.addEventListener('click', () => {
        task.completed = true;
        newLi.removeChild(checkBtn);
        completed.appendChild(newLi);
        saveData();
    });

    delBtn.addEventListener('click', () => {
        const index = taskList.indexOf(task);
        if (index > -1) {
            taskList.splice(index, 1);
            newLi.remove();
            saveData();
        }
    });
}

function saveData() {
    localStorage.setItem('TASK_LIST', JSON.stringify(taskList));
}

function loadData() {
    const data = localStorage.getItem('TASK_LIST');
    if (data) {
        taskList = JSON.parse(data);
        taskList.forEach((task) => renderTask(task));
    }
}

loadData();
