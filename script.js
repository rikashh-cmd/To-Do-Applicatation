let todos = JSON.parse(localStorage.getItem('todos') || '[]');
let filter = 'all';
const list = document.getElementById('todoList');
const input = document.getElementById('todoInput');

function save(){ localStorage.setItem('todos', JSON.stringify(todos)); }

function render(){
  list.innerHTML = '';
  const shown = todos.filter(t => filter === 'all' || (filter === 'done' ? t.done : !t.done));
  shown.forEach(t => {
    const li = document.createElement('li');
    if (t.done) li.className = 'done';
    const cb = document.createElement('input');
    cb.type = 'checkbox'; cb.checked = t.done;
    cb.onchange = () => { t.done = cb.checked; save(); render(); };
    const span = document.createElement('span');
    span.textContent = t.text;
    const del = document.createElement('button');
    del.className = 'del'; del.textContent = 'Delete';
    del.onclick = () => { todos = todos.filter(x => x.id !== t.id); save(); render(); };
    li.append(cb, span, del);
    list.appendChild(li);
  });
  const left = todos.filter(t => !t.done).length;
  document.getElementById('count').textContent = left + ' task' + (left === 1 ? '' : 's') + ' left';
}

document.getElementById('todoForm').addEventListener('submit', e => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;
  todos.push({ id: Date.now(), text, done: false });
  input.value = '';
  save(); render();
});

document.querySelectorAll('.filters button').forEach(b => b.onclick = () => {
  filter = b.dataset.filter;
  document.querySelectorAll('.filters button').forEach(x => x.classList.toggle('active', x === b));
  render();
});

document.getElementById('clearDone').onclick = () => { todos = todos.filter(t => !t.done); save(); render(); };
render();