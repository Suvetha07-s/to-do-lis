document.addEventListener('DOMContentLoaded', function() {
    const addTaskBtn = document.getElementById('add-task');
    const taskInput = document.getElementById('new-task');
    const taskList = document.getElementById('task-list');
    const celebrationMessage = document.getElementById('celebration-message');

    // Function to create a new task
    function createTask(taskText) {
        const li = document.createElement('li');

        const taskTextNode = document.createElement('span');
        taskTextNode.textContent = taskText;
        li.appendChild(taskTextNode);

        // Add complete button
        const completeBtn = document.createElement('button');
        completeBtn.innerHTML = '&#10003;';
        completeBtn.addEventListener('click', function() {
            li.classList.toggle('completed');
            checkAllTasksCompleted(); // Check if all tasks are completed
        });
        li.appendChild(completeBtn);

        // Add delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = '&#10005;';
        deleteBtn.addEventListener('click', function() {
            taskList.removeChild(li);
            checkAllTasksCompleted(); // Check if all tasks are completed
        });
        li.appendChild(deleteBtn);

        taskList.appendChild(li);
    }

    // Add task on button click
    addTaskBtn.addEventListener('click', function() {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            createTask(taskText);
            taskInput.value = '';
        }
    });

    // Add task on Enter key press
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTaskBtn.click();
        }
    });

    // Function to check if all tasks are completed
    function checkAllTasksCompleted() {
        const tasks = document.querySelectorAll('#task-list li');
        const allCompleted = Array.from(tasks).every(task => task.classList.contains('completed'));

        if (allCompleted && tasks.length > 0) {
            celebrate();
        }
    }

    // Celebration function
    function celebrate() {
        celebrationMessage.classList.remove('hidden');
        // Optional: Show confetti animation
        showConfetti();
        setTimeout(() => {
            celebrationMessage.classList.add('hidden');
        }, 5000); // Hide the message after 5 seconds
    }

    // Optional: Function to show confetti animation
    function showConfetti() {
        for (let i = 0; i < 100; i++) {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            confetti.style.background = getRandomColor();
            confetti.style.left = `${Math.random() * 100}vw`;
            confetti.style.animationDuration = `${Math.random() * 2 + 2}s`;
            document.body.appendChild(confetti);
        }
        // Remove confetti after animation
        setTimeout(() => {
            document.querySelectorAll('.confetti').forEach(el => el.remove());
        }, 5000); // Matches the duration of the confetti animation
    }

    // Utility function to get a random color
    function getRandomColor() {
        const colors = ['#FF5733', '#33FF57', '#3357FF', '#F0F33F', '#FF33F0'];
        return colors[Math.floor(Math.random() * colors.length)];
    }
});
