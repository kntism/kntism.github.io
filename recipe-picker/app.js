// 菜谱抽取器应用
const STORAGE_KEY = 'recipe_picker_data';

// DOM 元素
const recipeInput = document.getElementById('recipe-input');
const addBtn = document.getElementById('add-btn');
const recipeList = document.getElementById('recipe-list');
const modalRecipeCount = document.getElementById('modal-recipe-count');
const breakfastCount = document.getElementById('breakfast-count');
const nonBreakfastCount = document.getElementById('non-breakfast-count');
const drawBtn = document.getElementById('draw-btn');
const resultDisplay = document.getElementById('result-display');
const clearAllBtn = document.getElementById('clear-all-btn');
const modal = document.getElementById('modal');
const openModalBtn = document.getElementById('open-modal-btn');
const closeModalBtn = document.getElementById('close-modal-btn');
const modalBackdrop = document.getElementById('modal-backdrop');
const categoryTabs = document.querySelectorAll('.tab');
const modalTabs = document.querySelectorAll('.modal-tab');

// 状态
let recipes = {
  breakfast: [],
  'non-breakfast': []
};
let currentCategory = 'breakfast';
let currentTab = 'breakfast';

const categoryLabels = {
  breakfast: '早餐',
  'non-breakfast': '正餐'
};

// 初始化
function init() {
  loadRecipes();
  renderRecipeList();
  updateCounts();
  bindEvents();
}

// 从 localStorage 加载
function loadRecipes() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    const data = JSON.parse(stored);
    recipes = {
      breakfast: data.breakfast || [],
      'non-breakfast': data['non-breakfast'] || []
    };
  }
}

// 保存
function saveRecipes() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes));
}

// 切换抽取分类
function switchCategory(category) {
  currentCategory = category;
  categoryTabs.forEach(tab => {
    tab.classList.toggle('active', tab.dataset.category === category);
  });
  resultDisplay.innerHTML = `<span class="placeholder">${categoryLabels[category]}，点击抽取</span>`;
}

// 切换模态框标签
function switchTab(tab) {
  currentTab = tab;
  modalTabs.forEach(t => {
    t.classList.toggle('active', t.dataset.tab === tab);
  });
  renderRecipeList();
}

// 添加菜谱
function addRecipe() {
  const name = recipeInput.value.trim();
  if (!name) {
    showToast('请输入菜谱名称');
    return;
  }
  const currentList = recipes[currentTab];
  if (currentList.includes(name)) {
    showToast('已存在');
    return;
  }
  currentList.push(name);
  saveRecipes();
  renderRecipeList();
  updateCounts();
  recipeInput.value = '';
  recipeInput.focus();
  showToast('已添加');
}

// 删除菜谱
function deleteRecipe(index) {
  recipes[currentTab].splice(index, 1);
  saveRecipes();
  renderRecipeList();
  updateCounts();
  showToast('已删除');
}

// 清空分类
function clearCategory() {
  if (recipes[currentTab].length === 0) return;
  if (!confirm('清空该分类？')) return;
  recipes[currentTab] = [];
  saveRecipes();
  renderRecipeList();
  updateCounts();
  showToast('已清空');
}

// 渲染列表
function renderRecipeList() {
  const currentList = recipes[currentTab];
  modalRecipeCount.textContent = currentList.length;

  if (currentList.length === 0) {
    recipeList.innerHTML = '<span class="empty">暂无菜谱</span>';
    return;
  }

  recipeList.innerHTML = currentList
    .map((recipe, index) => `
      <div class="recipe-item">
        <span>${escapeHtml(recipe)}</span>
        <button class="delete-btn" data-index="${index}">删除</button>
      </div>
    `).join('');
}

// 更新计数
function updateCounts() {
  breakfastCount.textContent = recipes.breakfast.length;
  nonBreakfastCount.textContent = recipes['non-breakfast'].length;
}

// 抽取
function drawRecipe() {
  const currentList = recipes[currentCategory];
  if (currentList.length === 0) {
    showToast('请先添加菜谱');
    openModal();
    switchTab(currentCategory);
    return;
  }

  drawBtn.disabled = true;
  let count = 0;
  const maxCount = 12;

  const interval = setInterval(() => {
    const randomIndex = Math.floor(Math.random() * currentList.length);
    resultDisplay.innerHTML = `<span class="result-animate">${escapeHtml(currentList[randomIndex])}</span>`;
    count++;

    if (count >= maxCount) {
      clearInterval(interval);
      const finalIndex = Math.floor(Math.random() * currentList.length);
      resultDisplay.innerHTML = `
        <div class="result-final">${categoryLabels[currentCategory]}</div>
        <div class="result-name">${escapeHtml(currentList[finalIndex])}</div>
      `;
      drawBtn.disabled = false;
    }
  }, 70);
}

// 打开模态框
function openModal() {
  modal.classList.add('visible');
  setTimeout(() => recipeInput.focus(), 100);
}

// 关闭模态框
function closeModal() {
  modal.classList.remove('visible');
}

// Toast
function showToast(message) {
  const oldToast = document.querySelector('.toast');
  if (oldToast) oldToast.remove();

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => toast.classList.add('show'), 10);
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 200);
  }, 1500);
}

// HTML 转义
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// 绑定事件
function bindEvents() {
  addBtn.addEventListener('click', addRecipe);
  drawBtn.addEventListener('click', drawRecipe);
  clearAllBtn.addEventListener('click', clearCategory);
  openModalBtn.addEventListener('click', openModal);
  closeModalBtn.addEventListener('click', closeModal);
  modalBackdrop.addEventListener('click', closeModal);

  categoryTabs.forEach(btn => {
    btn.addEventListener('click', () => switchCategory(btn.dataset.category));
  });

  modalTabs.forEach(btn => {
    btn.addEventListener('click', () => switchTab(btn.dataset.tab));
  });

  recipeInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addRecipe();
  });

  recipeList.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')) {
      deleteRecipe(parseInt(e.target.dataset.index));
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('visible')) {
      closeModal();
    }
  });
}

init();
