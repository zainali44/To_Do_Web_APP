const input = document.querySelector('input');
const btn = document.querySelector('.addTask > button');

const notCompletedDate = document.getElementById('DATE');

btn.addEventListener('click', addList);
input.addEventListener('keyup', (e) => {
    (e.keyCode === 13 ? addList(e) : null);
});

function addList(e) {
    const notCompleted = document.querySelector('.NoCompleted');
    const completed = document.querySelector('.Completed');

    const newLi = document.createElement('li');
    const checkBtn = document.createElement('button');
    const delBtn = document.createElement('button');

    checkBtn.innerHTML = '<div class="check"><i class="fa fa-check"></i></div>';
    delBtn.innerHTML = '<div class="trash"><i class="fa fa-trash"></i></div>';

    if (input.value !== '') {
        const currentDate = new Date().toLocaleDateString();
        newLi.textContent = input.value;
        input.value = '';
        notCompleted.appendChild(newLi);
        newLi.appendChild(checkBtn);
        newLi.appendChild(delBtn);
      
        const dateElement = document.createElement('span');
        dateElement.classList.add('task-date'); // Add a class for the date element
        dateElement.textContent = currentDate;
        newLi.appendChild(dateElement);
      }
    else{
        alert('Please enter a task');
    }

    checkBtn.addEventListener('click', function () {
        const parent = this.parentNode;
        parent.remove();
        completed.appendChild(parent);
        checkBtn.style.display = 'none';
    });

    delBtn.addEventListener('click', function () {
        const parent = this.parentNode;
        parent.remove();
    });
}
