// Motivational quotes array
const quotes = [
  "You are capable of amazing things!",
  "Every day is a fresh start.",
  "Stay positive, work hard, make it happen!",
  "Believe in yourself and all that you are.",
  "Small steps every day!",
  "Progress, not perfection.",
  "You've got this!",
  "Dream big, work hard!",
  "Be the energy you want to attract.",
  "Start where you are. Use what you have. Do what you can.",
  "The only way to do great work is to love what you do.",
  "Success is not final, failure is not fatal: It is the courage to continue that counts.",
  "The future belongs to those who believe in the beauty of their dreams.",
  "Don't watch the clock; do what it does. Keep going.",
  "The harder you work for something, the greater you'll feel when you achieve it."
];

const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const quoteToast = document.getElementById('quoteToast');
const completedTaskList = document.getElementById('completedTaskList');

// Load tasks from localStorage
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  return tasks;
}

// Save tasks to localStorage
function saveTasks(tasks) {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load completed tasks from localStorage
function loadCompletedTasks() {
  const tasks = JSON.parse(localStorage.getItem('completedTasks')) || [];
  return tasks;
}

// Save completed tasks to localStorage
function saveCompletedTasks(tasks) {
  localStorage.setItem('completedTasks', JSON.stringify(tasks));
}

// Render tasks to the DOM
function renderTasks() {
  const tasks = loadTasks();
  taskList.innerHTML = '';
  tasks.forEach((task, idx) => {
    const li = document.createElement('li');
    li.textContent = task;
    const completeBtn = document.createElement('button');
    completeBtn.textContent = '✅';
    completeBtn.className = 'complete-btn';
    completeBtn.onclick = () => completeTask(idx);
    const delBtn = document.createElement('button');
    delBtn.textContent = '❌';
    delBtn.className = 'delete-btn';
    delBtn.onclick = () => deleteTask(idx);
    li.appendChild(completeBtn);
    li.appendChild(delBtn);
    taskList.appendChild(li);
  });
}

// Render completed tasks to the DOM
function renderCompletedTasks() {
  const tasks = loadCompletedTasks();
  completedTaskList.innerHTML = '';
  tasks.forEach(task => {
    const li = document.createElement('li');
    li.textContent = task;
    completedTaskList.appendChild(li);
  });
}

// Add a new task
function addTask() {
  const task = taskInput.value.trim();
  if (!task) return;
  const tasks = loadTasks();
  tasks.push(task);
  saveTasks(tasks);
  renderTasks();
  taskInput.value = '';
  showRandomQuote();
}

// Delete a task
function deleteTask(idx) {
  const tasks = loadTasks();
  tasks.splice(idx, 1);
  saveTasks(tasks);
  renderTasks();
}

// Mark a task as completed
function completeTask(idx) {
  const tasks = loadTasks();
  const completedTask = tasks.splice(idx, 1)[0];
  saveTasks(tasks);
  const completedTasks = loadCompletedTasks();
  completedTasks.push(completedTask);
  saveCompletedTasks(completedTasks);
  renderTasks();
  renderCompletedTasks();
}

// Show a random motivational quote as a toast
function showRandomQuote() {
  const quote = quotes[Math.floor(Math.random() * quotes.length)];
  quoteToast.textContent = quote;
  quoteToast.style.display = 'block';
  quoteToast.classList.remove('show');
  // Restart animation
  void quoteToast.offsetWidth;
  quoteToast.classList.add('show');
  setTimeout(() => {
    quoteToast.style.display = 'none';
  }, 2500);
}

// Event listeners
addTaskBtn.addEventListener('click', addTask);
taskInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') addTask();
});

document.addEventListener('DOMContentLoaded', () => {
  renderTasks();
  renderCompletedTasks();
}); 