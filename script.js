let tasks = [];
let hourValue = 50;

const tabTasks = document.getElementById('tabTasks');
const tabBudget = document.getElementById('tabBudget');
const tasksSection = document.getElementById('tasksSection');
const budgetSection = document.getElementById('budgetSection');

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

function updateHour() {
  hourValue = parseFloat(document.getElementById('hourValue').value);
  document.getElementById('currentValue').innerText = `Valor atual: R$${hourValue.toFixed(2)}`;
}

function addTask() {
  const name = document.getElementById('taskName').value;
  const hours = parseFloat(document.getElementById('taskHours').value);

  if (!name || !hours) return;

  tasks.push({ name, hours });

  document.getElementById('taskName').value = '';
  document.getElementById('taskHours').value = '';

  renderTasks();
}

function renderTasks() {
  const list = document.getElementById('taskList');

  if (tasks.length === 0) {
    list.innerHTML = 'Nenhuma tarefa adicionada ainda.';
    return;
  }

  list.innerHTML = tasks.map(t => `<p>${t.name} - ${t.hours}h</p>`).join('');
}

function updateBudget() {
  const list = document.getElementById('budgetList');

  if (tasks.length === 0) {
    list.innerHTML = 'Nenhuma tarefa para calcular';
    return;
  }

  let totalHours = 0;
  let totalCost = 0;

  list.innerHTML = tasks.map(t => {
    const subtotal = t.hours * hourValue;
    totalHours += t.hours;
    totalCost += subtotal;
    return `<p>${t.name} - ${t.hours}h - R$${subtotal.toFixed(2)}</p>`;
  }).join('');

  document.getElementById('totalTasks').innerText = tasks.length;
  document.getElementById('totalHours').innerText = totalHours;
  document.getElementById('valueHour').innerText = hourValue;
  document.getElementById('totalCost').innerText = `R$${totalCost.toFixed(2)}`;
}