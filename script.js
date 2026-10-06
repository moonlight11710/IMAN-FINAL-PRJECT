let todos = JSON.parse(localStorage.getItem('focus_todos') || '[]');

const todoForm = document.getElementById('todoForm');
const todoInput = document.getElementById('todoInput');
const todoList = document.getElementById('todoList');
const itemsLeft = document.getElementById('itemsLeft');
const clearCompletedBtn = document.getElementById('clearCompleted');
const themeToggle = document.getElementById('themeToggle');

// Theme management
const savedTheme = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', savedTheme);
themeToggle.textContent = savedTheme === 'dark' ? '☀️' : '🌙';

themeToggle.addEventListener('click', () => {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  themeToggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';
});

// Render tasks
function render() {
  todoList.innerHTML = '';
  todos.forEach((todo, index) => {
    const li = document.createElement('li');
    li.className = 'todo-item';

    const left = document.createElement('div');
    left.className = 'todo-left';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = todo.completed;
    checkbox.addEventListener('change', () => toggleTodo(index));

    const span = document.createElement('span');
    span.className = `todo-text ${todo.completed ? 'done' : ''}`;
    span.textContent = todo.text;

    left.appendChild(checkbox);
    left.appendChild(span);

    const delBtn = document.createElement('button');
    delBtn.className = 'delete-btn';
    delBtn.innerHTML = '&times;';
    delBtn.title = 'Delete';
    delBtn.addEventListener('click', () => deleteTodo(index));

    li.appendChild(left);
    li.appendChild(delBtn);
    todoList.appendChild(li);
  });

  const remaining = todos.filter((t) => !t.completed).length;
  itemsLeft.textContent = `${remaining} task${remaining === 1 ? '' : 's'} left`;
  localStorage.setItem('focus_todos', JSON.stringify(todos));
}

function addTodo(e) {
  e.preventDefault();
  const text = todoInput.value.trim();
  if (!text) return;
  todos.push({ text, completed: false });
  todoInput.value = '';
  render();
}

function toggleTodo(index) {
  todos[index].completed = !todos[index].completed;
  render();
}

function deleteTodo(index) {
  todos.splice(index, 1);
  render();
}

clearCompletedBtn.addEventListener('click', () => {
  todos = todos.filter((t) => !t.completed);
  render();
});

todoForm.addEventListener('submit', addTodo);

render();
