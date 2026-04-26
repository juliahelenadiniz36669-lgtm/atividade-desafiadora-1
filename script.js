let tasks = [];
let hourValue = 50;

const tabTasks = document.getElementById('tabTasks');
const tabBudget = document.getElementById('tabBudget');
const tasksSection = document.getElementById('tasksSection');
const budgetSection = document.getElementById('budgetSection');

// Troca de abas
tabTasks.onclick = () => {
  tabTasks.classList.add('active');
  tabBudget.classList.remove('active');
  tasksSection.classList.remove('hidden');
  budgetSection.classList.add('hidden');
};

tabBudget.onclick = () => {
  tabBudget.classList.add('active');
  tabTasks.classList.remove('active');
  tasksSection.classList.add('hidden');
  budgetSection.classList.remove('hidden');
  updateBudget();
};

// Atualiza valor da hora
function updateHour() {
  hourValue = parseFloat(document.getElementById('hourValue').value) || 0;
  document.getElementById('currentValue').innerText =
    `Valor atual: R$${hourValue.toFixed(2)}`;
}

// Adiciona tarefa
function addTask() {
  const name = document.getElementById('taskName').value;
  const hours = parseFloat(document.getElementById('taskHours').value);

  if (!name || !hours) return;

  tasks.push({ name, hours });

  document.getElementById('taskName').value = '';
  document.getElementById('taskHours').value = '';

  renderTasks();
}

// Lista de tarefas 
function renderTasks() {
  const list = document.getElementById('taskList');

  if (tasks.length === 0) {
    list.innerHTML = 'Nenhuma tarefa adicionada ainda.';
    return;
  }

  list.innerHTML = tasks.map((t, index) => {
  const subtotal = t.hours * hourValue;

  return `<div class="tarefa-item">
            <span>${t.name} (${t.hours}h)</span>
            <span>
              R$ ${subtotal.toFixed(2)}
              <button onclick="deleteTask(${index})">🗑️</button>
            </span>
          </div>`;
}).join('');
}

// Orçamento 
function updateBudget() {
  const list = document.getElementById('budgetList');

  if (tasks.length === 0) {
    list.innerHTML = 'Nenhuma tarefa para calcular';
    return;
  }

  let totalHours = 0;
  let totalCost = 0;

  // valor da urgência
  const urgencia = parseFloat(document.getElementById('urgencia').value);

  list.innerHTML = tasks.map(t => {
    const subtotal = t.hours * hourValue * urgencia;

    totalHours += t.hours;
    totalCost += subtotal;

    return `<div class="tarefa-item">
              <span>${t.name} (${t.hours}h)</span>
              <span>R$ ${subtotal.toFixed(2)}</span>
            </div>`;
  }).join('');


  document.getElementById('totalTasks').innerText = tasks.length;
  document.getElementById('totalHours').innerText = totalHours;
  document.getElementById('valueHour').innerText = hourValue.toFixed(2);
  document.getElementById('totalCost').innerText = `R$${totalCost.toFixed(2)}`;
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}