/**
 * EGT IP HUB Project 1.2 - Main Application Logic
 */

let state = {
  projects: [],
  selectedProjectId: null,
  activeFilterType: 'all',
  activeTerritory: 'all',
  searchQuery: '',
  theme: 'dark'
};

// Initialize App (Fail-safe initialization regardless of document loading state)
function initApp() {
  checkAuth();
  loadState();
  initTheme();
  initAutoSave();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}

// Helper function to format status badge (4 explicit statuses supported)
function getStatusBadge(statusKey) {
  const status = (statusKey || 'registered').toLowerCase().trim();
  if (status === 'applied' || status === 'подадена') {
    return `<span class="status-badge applied">🟡 Подадена</span>`;
  }
  if (status === 'expired' || status === 'изтекла') {
    return `<span class="status-badge expired">🔴 Изтекла</span>`;
  }
  if (status === 'terminated' || status === 'прекратена') {
    return `<span class="status-badge terminated">🔴 Прекратена</span>`;
  }
  if (status === 'none' || status === 'n / a' || status === 'n/a' || !statusKey) {
    return `<span style="color:var(--text-muted); font-size:0.8rem; font-weight:600;">N / A</span>`;
  }
  return `<span class="status-badge registered">🟢 Регистрирана</span>`;
}

// Load state from localStorage or initialize with seed data
function loadState() {
  const savedData = localStorage.getItem('egt_project12_data');
  if (savedData) {
    try {
      const parsed = JSON.parse(savedData);
      
      // Auto-merge missing initial projects & update item fields if present in seed
      INITIAL_PROJECTS.forEach(initProj => {
        const existing = parsed.find(p => p.id === initProj.id);
        if (!existing) {
          parsed.push(initProj);
        } else {
          // Update item properties from seed data if missing or updated
          initProj.items.forEach(initItem => {
            const existingItem = (existing.items || []).find(i => i.id === initItem.id);
            if (!existingItem) {
              if (!existing.items) existing.items = [];
              existing.items.push(initItem);
            } else {
              if (initItem.image) existingItem.image = initItem.image;
              if (initItem.gallery && initItem.gallery.length > 0) existingItem.gallery = initItem.gallery;
              if (initItem.nationalLink) existingItem.nationalLink = initItem.nationalLink;
              if (initItem.intLink) existingItem.intLink = initItem.intLink;
              if (initItem.intLinks && initItem.intLinks.length > 0) existingItem.intLinks = initItem.intLinks;
              if (initItem.link) existingItem.link = initItem.link;
              if (initItem.status) existingItem.status = initItem.status;
              if (initItem.intStatus) existingItem.intStatus = initItem.intStatus;
              if (initItem.intTerritory) existingItem.intTerritory = initItem.intTerritory;
              if (initItem.notes) existingItem.notes = initItem.notes;
            }
          });
        }
      });
      state.projects = parsed;
    } catch (e) {
      console.error('Error parsing localStorage data, resetting to seed data.', e);
      state.projects = INITIAL_PROJECTS;
    }
  } else {
    state.projects = INITIAL_PROJECTS;
    saveState();
  }
}

function saveState() {
  localStorage.setItem('egt_project12_data', JSON.stringify(state.projects));
  updateAutoSavePill();
}

function updateAutoSavePill() {
  const pill = document.getElementById('autosave-status-pill');
  if (pill) {
    const timeStr = new Date().toLocaleTimeString('bg-BG');
    pill.innerHTML = `<span>🟢</span> Автоматично запазено (${timeStr})`;
  }
}

// Auto-Save background timer automation (runs every 10 seconds)
function initAutoSave() {
  setInterval(() => {
    saveState();
  }, 10000);
}

// Reset data to default seed
function resetToSeedData() {
  if (confirm('Сигурни ли сте, че искате да възстановите началните данни на проектите?')) {
    state.projects = JSON.parse(JSON.stringify(INITIAL_PROJECTS));
    saveState();
    renderApp();
  }
}

// Theme handling
function initTheme() {
  const savedTheme = localStorage.getItem('egt_theme') || 'dark';
  state.theme = savedTheme;
  document.documentElement.setAttribute('data-theme', savedTheme);
  const themeBtn = document.getElementById('theme-toggle-btn');
  if (themeBtn) {
    themeBtn.textContent = savedTheme === 'dark' ? '🌙' : '☀️';
  }
}

function toggleTheme() {
  state.theme = state.theme === 'dark' ? 'light' : 'dark';
  localStorage.setItem('egt_theme', state.theme);
  document.documentElement.setAttribute('data-theme', state.theme);
  const themeBtn = document.getElementById('theme-toggle-btn');
  if (themeBtn) {
    themeBtn.textContent = state.theme === 'dark' ? '🌙' : '☀️';
  }
}

// Render Header Stats & Main Views
function renderApp() {
  updateStats();
  renderProjectsList();
  if (state.selectedProjectId) {
    renderProjectHubModal(state.selectedProjectId);
  }
}

function updateStats() {
  let totalProjects = state.projects.length;
  let totalTM = 0;
  let totalDS = 0;

  state.projects.forEach(p => {
    (p.items || []).forEach(item => {
      if (item.type === 'trademark') totalTM++;
      if (item.type === 'design') totalDS++;
    });
  });

  document.getElementById('stat-projects-count').textContent = totalProjects;
  document.getElementById('stat-tm-count').textContent = totalTM;
  document.getElementById('stat-ds-count').textContent = totalDS;
  document.getElementById('stat-total-count').textContent = totalTM + totalDS;
}

// Projects View
function renderProjectsList() {
  const container = document.getElementById('projects-grid');
  if (!container) return;

  const query = state.searchQuery.toLowerCase().trim();

  const filteredProjects = state.projects.filter(proj => {
    const matchesName = proj.name.toLowerCase().includes(query) || 
                        proj.code.toLowerCase().includes(query) ||
                        (proj.description && proj.description.toLowerCase().includes(query));

    const matchesItem = (proj.items || []).some(item => {
      const matchText = (item.name + " " + item.territory + " " + item.intTerritory + " " + (item.notes || "") + " " + (item.nationalLink || "") + " " + (item.intLink || "")).toLowerCase();
      const typeMatch = state.activeFilterType === 'all' || item.type === state.activeFilterType;
      const territoryMatch = state.activeTerritory === 'all' || 
                             item.territory === state.activeTerritory || 
                             item.intTerritory === state.activeTerritory;
      return matchText.includes(query) && typeMatch && territoryMatch;
    });

    if (query === '' && state.activeFilterType === 'all' && state.activeTerritory === 'all') return true;
    return matchesName || matchesItem;
  });

  if (filteredProjects.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: var(--text-muted);">
        <div style="font-size: 3rem; margin-bottom: 1rem;">🔍</div>
        <h3>Няма намерени проекти</h3>
        <p>Опитайте промяна на критериите за търсене или добавете нов проект.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filteredProjects.map(proj => {
    const tmCount = (proj.items || []).filter(i => i.type === 'trademark').length;
    const dsCount = (proj.items || []).filter(i => i.type === 'design').length;
    const isSelected = state.selectedProjectId === proj.id;

    // Fast image preview for project card if available
    const firstImgItem = (proj.items || []).find(i => i.image);
    const cardImgHtml = firstImgItem ? 
      `<div style="height: 140px; margin:-1.5rem -1.5rem 1rem -1.5rem; overflow:hidden; background:#000; border-bottom:1px solid var(--border-color); display:flex; align-items:center; justify-content:center;">
        <img src="${firstImgItem.image}" alt="${escapeHtml(proj.name)}" style="max-width:100%; max-height:100%; object-fit:contain;">
       </div>` : '';

    return `
      <div class="project-card ${isSelected ? 'selected' : ''}" onclick="selectProject('${proj.id}')" title="Кликнете за преглед на марките и дизайните на проект ${escapeHtml(proj.name)}">
        ${cardImgHtml}
        <div class="project-card-header">
          <div>
            <div class="project-code">${escapeHtml(proj.code)}</div>
            <div class="project-name">${escapeHtml(proj.name)}</div>
          </div>
          <div style="display: flex; gap: 4px;">
            <button class="btn-icon" onclick="event.stopPropagation(); openProjectModal('${proj.id}')" title="Редактирай проект">✏️</button>
            <button class="btn-danger btn-icon" onclick="event.stopPropagation(); deleteProject('${proj.id}')" title="Изтрий проект">🗑️</button>
          </div>
        </div>

        <div class="project-desc">${escapeHtml(proj.description || 'Няма допълнително описание.')}</div>

        <div class="project-badges" style="margin-bottom: 0;">
          <div class="badge-item tm">
            <span>🏷️ Марки:</span>
            <strong>${tmCount}</strong>
          </div>
          <div class="badge-item ds">
            <span>🎨 Дизайни:</span>
            <strong>${dsCount}</strong>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function selectProject(projId) {
  state.selectedProjectId = projId;
  renderProjectHubModal(projId);
}

function closeProjectHubModal() {
  state.selectedProjectId = null;
  const modal = document.getElementById('project-hub-modal');
  if (modal) modal.classList.remove('active');
}

// Render Project Hub (Items list for selected project in Popup Overlay)
function renderProjectHubModal(projId) {
  const modal = document.getElementById('project-hub-modal');
  if (!modal) return;

  const proj = state.projects.find(p => p.id === projId);
  if (!proj) {
    modal.classList.remove('active');
    return;
  }

  // Populate Modal Header Title & Buttons
  const titleEl = document.getElementById('hub-modal-title');
  if (titleEl) {
    titleEl.innerHTML = `${escapeHtml(proj.name)} <span style="font-size:0.85rem; color:var(--egt-red); opacity:0.9; margin-left:6px;">(${escapeHtml(proj.code)})</span>`;
  }

  const addBtn = document.getElementById('hub-modal-add-btn');
  if (addBtn) addBtn.onclick = () => openItemModal(proj.id);

  const editBtn = document.getElementById('hub-modal-edit-btn');
  if (editBtn) editBtn.onclick = () => openProjectModal(proj.id);

  const bodyEl = document.getElementById('hub-modal-body');
  if (!bodyEl) return;

  let items = proj.items || [];
  if (state.activeFilterType !== 'all') {
    items = items.filter(i => i.type === state.activeFilterType);
  }
  if (state.activeTerritory !== 'all') {
    items = items.filter(i => i.territory === state.activeTerritory || i.intTerritory === state.activeTerritory);
  }

  let tableRows = items.map((item, idx) => {
    const isTM = item.type === 'trademark';
    const typeLabel = isTM ? 'Търговска Марка' : 'Промишлен Дизайн';

    const imgDisplay = item.image ? `<img src="${item.image}" alt="${escapeHtml(item.name)}">` : (isTM ? '🏷️' : '🎨');
    
    const natStatusHtml = getStatusBadge(item.status);
    const intStatusHtml = getStatusBadge(item.intStatus || (item.intAppDate && item.intAppDate !== 'N / A' ? item.status : 'none'));

    const primaryLink = item.nationalLink || item.link;
    const externalLinkBtn = primaryLink ? 
      `<a href="${escapeHtml(primaryLink)}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary" style="font-size:0.75rem; padding:3px 8px; border-color:var(--egt-red); color:var(--egt-red); text-decoration:none; margin-top:4px; display:inline-flex; align-items:center; gap:4px;">
        🔗 Препратка ↗
       </a>` : '';

    return `
      <tr>
        <td>${idx + 1}</td>
        <td>
          <div class="item-img-thumb" onclick="openDetailModal('${proj.id}', '${item.id}')">
            ${imgDisplay}
          </div>
          ${item.gallery && item.gallery.length > 1 ? `<div style="font-size:0.7rem; color:var(--text-muted); text-align:center; margin-top:2px;">🖼️ ${item.gallery.length} снимки</div>` : ''}
        </td>
        <td>
          <strong style="font-size: 1rem; color: var(--text-primary); cursor: pointer;" onclick="openDetailModal('${proj.id}', '${item.id}')">
            ${escapeHtml(item.name)}
          </strong>
          <div style="margin-top:4px;">
            <span class="item-type-badge ${item.type}">${typeLabel}</span>
          </div>
          ${externalLinkBtn}
        </td>
        <td>
          <div style="margin-bottom: 4px;">${natStatusHtml}</div>
          <div><small style="color:var(--text-muted)">Подадена:</small> <strong>${escapeHtml(item.appDate || 'N / A')}</strong></div>
          <div><small style="color:var(--text-muted)">Регистрирана:</small> <strong>${escapeHtml(item.regDate || 'N / A')}</strong></div>
          <div><span class="territory-pill">${escapeHtml(item.territory || 'BG')}</span></div>
          ${item.nationalLink ? `<div style="margin-top:3px;"><a href="${escapeHtml(item.nationalLink)}" target="_blank" rel="noopener noreferrer" style="font-size:0.75rem; color:var(--egt-red); text-decoration:underline;">🔗 BPO Линк ↗</a></div>` : ''}
        </td>
        <td>
          <div style="margin-bottom: 4px;">${intStatusHtml}</div>
          <div><small style="color:var(--text-muted)">Int. Подаване:</small> ${escapeHtml(item.intAppDate || 'N / A')}</div>
          <div><small style="color:var(--text-muted)">Int. Регистрация:</small> ${escapeHtml(item.intRegDate || 'N / A')}</div>
          <div><span class="territory-pill" style="background: rgba(228, 35, 20, 0.15); color: var(--egt-red);">${escapeHtml(item.intTerritory || 'N / A')}</span></div>
          ${(item.intLinks && item.intLinks.length > 0) ? item.intLinks.map(l => `<div style="margin-top:3px;"><a href="${escapeHtml(l)}" target="_blank" rel="noopener noreferrer" style="font-size:0.75rem; color:#60a5fa; text-decoration:underline;">${l.includes('euipo') ? '🇪🇺 EUIPO' : '🌐 TMview'} Линк ↗</a></div>`).join('') : (item.intLink ? `<div style="margin-top:3px;"><a href="${escapeHtml(item.intLink)}" target="_blank" rel="noopener noreferrer" style="font-size:0.75rem; color:#60a5fa; text-decoration:underline;">🌐 TMview Линк ↗</a></div>` : '')}
        </td>
        <td style="max-width: 200px;">
          <div style="font-size:0.85rem; color:var(--text-secondary); line-height:1.3; max-height:60px; overflow:hidden; text-overflow:ellipsis;">
            ${escapeHtml(item.notes || item.moreInfo || 'Няма въведени бележки.')}
          </div>
        </td>
        <td>
          <div style="display: flex; gap: 0.4rem; flex-wrap: wrap;">
            <button class="btn btn-secondary" onclick="openDetailModal('${proj.id}', '${item.id}')">Детайли</button>
            <button class="btn-icon" onclick="openItemModal('${proj.id}', '${item.id}')" title="Редактирай">✏️</button>
            <button class="btn-danger btn-icon" onclick="deleteItem('${proj.id}', '${item.id}')" title="Изтрий">🗑️</button>
          </div>
        </td>
      </tr>
    `;
  }).join('');

  if (items.length === 0) {
    tableRows = `
      <tr>
        <td colspan="7" style="text-align: center; padding: 3rem 1rem; color: var(--text-muted);">
          <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">📂</div>
          <div style="font-size: 1.1rem; font-weight: 600; color: var(--text-primary);">Няма намерени търговски марки или дизайни</div>
          <div style="font-size: 0.875rem; margin-top: 4px;">Използвайте бутона "+ Добави Марка / Дизайн" за да свържете нови записи към този проект.</div>
        </td>
      </tr>
    `;
  }

  bodyEl.innerHTML = `
    <div style="margin-bottom: 1.25rem; font-size: 0.9rem; color: var(--text-secondary); background: rgba(255, 255, 255, 0.03); padding: 0.85rem 1.25rem; border-radius: var(--radius-md); border: 1px solid var(--border-color);">
      ${escapeHtml(proj.description || 'Самостоятелен проект за търговски марки и промишлени дизайни.')}
    </div>

    <div class="items-table-wrapper">
      <table class="items-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Изображение</th>
            <th>Име & Тип</th>
            <th>Национална Регистрация (BG/EM)</th>
            <th>Международна Регистрация (Int / WO)</th>
            <th>Бележки</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          ${tableRows}
        </tbody>
      </table>
    </div>
  `;

  modal.classList.add('active');
}

// Search and Filtering Event Handlers
function handleSearch(val) {
  state.searchQuery = val;
  renderProjectsList();
}

function handleFilterType(val) {
  state.activeFilterType = val;
  renderApp();
}

function handleFilterTerritory(val) {
  state.activeTerritory = val;
  renderApp();
}

// Modal Operations: Project
function openProjectModal(projId = null) {
  const modal = document.getElementById('project-modal');
  const title = document.getElementById('project-modal-title');
  const form = document.getElementById('project-form');

  form.reset();
  document.getElementById('project-id-input').value = projId || '';

  if (projId) {
    const proj = state.projects.find(p => p.id === projId);
    if (proj) {
      title.textContent = 'Редактирай Проект';
      document.getElementById('proj-name-input').value = proj.name || '';
      document.getElementById('proj-code-input').value = proj.code || '';
      document.getElementById('proj-desc-input').value = proj.description || '';
    }
  } else {
    title.textContent = 'Нов Проект';
    document.getElementById('proj-code-input').value = `PRJ-${Math.floor(1000 + Math.random() * 9000)}`;
  }

  modal.classList.add('active');
}

function closeProjectModal() {
  document.getElementById('project-modal').classList.remove('active');
}

function saveProjectForm(e) {
  e.preventDefault();
  const id = document.getElementById('project-id-input').value;
  const name = document.getElementById('proj-name-input').value.trim();
  const code = document.getElementById('proj-code-input').value.trim();
  const description = document.getElementById('proj-desc-input').value.trim();

  if (!name) return alert('Моля въведете име на проекта.');

  if (id) {
    const proj = state.projects.find(p => p.id === id);
    if (proj) {
      proj.name = name;
      proj.code = code;
      proj.description = description;
    }
  } else {
    const newProj = {
      id: 'proj-' + Date.now(),
      name,
      code: code || `PRJ-${Date.now().toString().slice(-4)}`,
      description,
      createdDate: new Date().toISOString().split('T')[0],
      items: []
    };
    state.projects.unshift(newProj);
    state.selectedProjectId = newProj.id;
  }

  saveState();
  closeProjectModal();
  renderApp();
}

let onConfirmCallback = null;

function showConfirmModal(titleText, messageHtml, onConfirm) {
  const modal = document.getElementById('confirm-modal');
  const titleEl = document.getElementById('confirm-modal-title');
  const msgEl = document.getElementById('confirm-modal-message');
  const actionBtn = document.getElementById('confirm-modal-action-btn');

  if (titleEl) titleEl.textContent = titleText || 'Потвърждение за изтриване';
  if (msgEl) msgEl.innerHTML = messageHtml;
  
  onConfirmCallback = onConfirm;
  
  if (actionBtn) {
    actionBtn.onclick = () => {
      if (onConfirmCallback) onConfirmCallback();
      closeConfirmModal();
    };
  }

  if (modal) modal.classList.add('active');
}

function closeConfirmModal() {
  const modal = document.getElementById('confirm-modal');
  if (modal) modal.classList.remove('active');
  onConfirmCallback = null;
}

function deleteProject(projId) {
  const proj = state.projects.find(p => p.id === projId);
  const projName = proj ? proj.name : '';
  const projCode = proj ? proj.code : '';
  const itemsCount = proj && proj.items ? proj.items.length : 0;

  showConfirmModal(
    '⚠️ Изтриване на проект',
    `Сигурни ли сте, че искате перманентно да изтриете проект <strong style="color:var(--text-primary);">${escapeHtml(projCode)} — ${escapeHtml(projName)}</strong> и всички негови <strong>${itemsCount} марки/дизайни</strong>?<br><br><small style="color:#f87171; font-weight:600;">Това действие не може да бъде отменено!</small>`,
    () => {
      state.projects = state.projects.filter(p => p.id !== projId);
      if (state.selectedProjectId === projId) state.selectedProjectId = null;
      saveState();
      renderApp();
    }
  );
}

// Modal Operations: Item (Mark / Design)
let currentImageBase64 = null;
let currentGallery = [];

function openItemModal(projId, itemId = null) {
  const modal = document.getElementById('item-modal');
  const title = document.getElementById('item-modal-title');
  const form = document.getElementById('item-form');

  form.reset();
  currentImageBase64 = null;
  currentGallery = [];
  document.getElementById('item-preview-img').src = '';
  document.getElementById('item-preview-container').style.display = 'none';

  document.getElementById('item-proj-id-input').value = projId;
  document.getElementById('item-id-input').value = itemId || '';

  if (itemId) {
    const proj = state.projects.find(p => p.id === projId);
    const item = (proj.items || []).find(i => i.id === itemId);
    if (item) {
      title.textContent = 'Редактирай Марка / Дизайн';
      document.getElementById('item-name-input').value = item.name || '';
      document.getElementById('item-type-select').value = item.type || 'trademark';
      document.getElementById('item-status-select').value = item.status || 'registered';
      document.getElementById('item-int-status-select').value = item.intStatus || 'none';
      
      document.getElementById('item-app-date').value = item.appDate || '';
      document.getElementById('item-reg-date').value = item.regDate || '';
      document.getElementById('item-territory').value = item.territory || 'BG';
      document.getElementById('item-national-link-input').value = item.nationalLink || '';

      document.getElementById('item-int-app-date').value = item.intAppDate || '';
      document.getElementById('item-int-reg-date').value = item.intRegDate || '';
      document.getElementById('item-int-territory').value = item.intTerritory || '';
      document.getElementById('item-int-link-input').value = (item.intLinks && item.intLinks.length > 0) ? item.intLinks.join(', ') : (item.intLink || '');

      document.getElementById('item-notes-input').value = item.notes || item.moreInfo || '';

      if (item.image) {
        currentImageBase64 = item.image;
        document.getElementById('item-preview-img').src = item.image;
        document.getElementById('item-preview-container').style.display = 'block';
      }
      currentGallery = item.gallery || [];
    }
  } else {
    title.textContent = 'Добави Търговска Марка / Дизайн';
  }

  modal.classList.add('active');
}

function closeItemModal() {
  document.getElementById('item-modal').classList.remove('active');
}

function handleImageUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    currentImageBase64 = e.target.result;
    if (!currentGallery.includes(currentImageBase64)) {
      currentGallery.push(currentImageBase64);
    }
    document.getElementById('item-preview-img').src = currentImageBase64;
    document.getElementById('item-preview-container').style.display = 'block';
  };
  reader.readAsDataURL(file);
}

function saveItemForm(e) {
  e.preventDefault();
  const projId = document.getElementById('item-proj-id-input').value;
  const itemId = document.getElementById('item-id-input').value;

  const proj = state.projects.find(p => p.id === projId);
  if (!proj) return;

  const nationalLinkVal = document.getElementById('item-national-link-input').value.trim();
  const intLinkVal = document.getElementById('item-int-link-input').value.trim();
  const intLinksArray = intLinkVal.split(',').map(s => s.trim()).filter(s => s.length > 0);

  const newItemData = {
    id: itemId || 'item-' + Date.now(),
    name: document.getElementById('item-name-input').value.trim(),
    type: document.getElementById('item-type-select').value,
    status: document.getElementById('item-status-select').value,
    intStatus: document.getElementById('item-int-status-select').value,
    image: currentImageBase64,
    gallery: currentGallery.length > 0 ? currentGallery : (currentImageBase64 ? [currentImageBase64] : []),
    
    appDate: document.getElementById('item-app-date').value.trim() || 'N / A',
    regDate: document.getElementById('item-reg-date').value.trim() || 'N / A',
    territory: document.getElementById('item-territory').value.trim() || 'BG',
    nationalLink: nationalLinkVal,

    intAppDate: document.getElementById('item-int-app-date').value.trim() || 'N / A',
    intRegDate: document.getElementById('item-int-reg-date').value.trim() || 'N / A',
    intTerritory: document.getElementById('item-int-territory').value.trim() || 'N / A',
    intLink: intLinksArray.length > 0 ? intLinksArray[0] : '',
    intLinks: intLinksArray,

    notes: document.getElementById('item-notes-input').value.trim() || 'Няма въведени бележки.',
    link: nationalLinkVal || (intLinksArray.length > 0 ? intLinksArray[0] : ''),
    files: []
  };

  if (!newItemData.name) return alert('Моля въведете име на марката/дизайна.');

  if (!proj.items) proj.items = [];

  if (itemId) {
    const idx = proj.items.findIndex(i => i.id === itemId);
    if (idx !== -1) proj.items[idx] = newItemData;
  } else {
    proj.items.push(newItemData);
  }

  saveState();
  closeItemModal();
  renderApp();
}

function deleteItem(projId, itemId) {
  const proj = state.projects.find(p => p.id === projId);
  const item = proj && proj.items ? proj.items.find(i => i.id === itemId) : null;
  const itemName = item ? item.name : 'този елемент';

  showConfirmModal(
    '⚠️ Изтриване на марка/дизайн',
    `Сигурни ли сте, че искате перманентно да изтриете <strong style="color:var(--text-primary);">${escapeHtml(itemName)}</strong> от проект <strong>${proj ? escapeHtml(proj.name) : ''}</strong>?`,
    () => {
      if (proj) {
        proj.items = (proj.items || []).filter(i => i.id !== itemId);
        saveState();
        renderApp();
      }
    }
  );
}

// Modal Detail Lightbox View (Sectional Statuses inside Cards; Top Status Badge REMOVED)
function openDetailModal(projId, itemId) {
  const proj = state.projects.find(p => p.id === projId);
  if (!proj) return;
  const item = (proj.items || []).find(i => i.id === itemId);
  if (!item) return;

  const modal = document.getElementById('detail-modal');
  const body = document.getElementById('detail-modal-body');

  const galleryList = (item.gallery && item.gallery.length > 0) ? item.gallery : (item.image ? [item.image] : []);

  let galleryThumbnailsHtml = '';
  if (galleryList.length > 1) {
    galleryThumbnailsHtml = `
      <div style="display: flex; gap: 0.5rem; margin-top: 0.75rem; overflow-x: auto; padding-bottom: 4px;">
        ${galleryList.map((gImg, idx) => `
          <img src="${gImg}" onclick="switchDetailMainImg('${gImg}')" style="width: 60px; height: 60px; object-fit: cover; border-radius: var(--radius-sm); border: 2px solid ${idx === 0 ? 'var(--egt-red)' : 'var(--border-color)'}; cursor: pointer;" class="detail-gallery-thumb">
        `).join('')}
      </div>
    `;
  }

  const mainImgSrc = galleryList.length > 0 ? galleryList[0] : null;

  const imgHtml = mainImgSrc ? 
    `<img id="detail-main-display-img" src="${mainImgSrc}" alt="${escapeHtml(item.name)}" onclick="openFullResLightbox('${mainImgSrc}')" style="cursor: zoom-in;" title="Кликнете за преглед в пълен размер">` : 
    `<div style="font-size: 4rem; color: var(--text-muted);">${item.type === 'trademark' ? '🏷️' : '🎨'}</div>`;

  const natLinkHtml = (item.nationalLink || item.link) ? `
    <div style="margin-top: 0.6rem; padding-top: 0.5rem; border-top: 1px dashed var(--border-color);">
      <a href="${escapeHtml(item.nationalLink || item.link)}" target="_blank" rel="noopener noreferrer" style="color: var(--egt-red); word-break: break-all; font-size: 0.825rem; font-weight: 600; text-decoration: underline; display: inline-flex; align-items: center; gap: 4px;">
        🔗 BPO / Регистър препратка ↗
      </a>
    </div>
  ` : '';

  // Render ALL International Links (TMview, EUIPO, etc.)
  let intLinksArray = [];
  if (item.intLinks && item.intLinks.length > 0) {
    intLinksArray = item.intLinks;
  } else if (item.intLink) {
    intLinksArray.push(item.intLink);
  }

  let intLinkHtml = '';
  if (intLinksArray.length > 0) {
    intLinkHtml = `
      <div style="margin-top: 0.6rem; padding-top: 0.5rem; border-top: 1px dashed var(--border-color); display: flex; flex-direction: column; gap: 6px;">
        ${intLinksArray.map(l => {
          const isEU = l.includes('euipo');
          const label = isEU ? '🇪🇺 EUIPO препратка' : '🌐 TMview / Int препратка';
          return `<a href="${escapeHtml(l)}" target="_blank" rel="noopener noreferrer" style="color: #60a5fa; word-break: break-all; font-size: 0.825rem; font-weight: 600; text-decoration: underline; display: inline-flex; align-items: center; gap: 4px;">
            ${label} ↗
          </a>`;
        }).join('')}
      </div>
    `;
  }

  // Badges for individual sections
  const natStatusBadgeHtml = getStatusBadge(item.status);
  const intStatusBadgeHtml = getStatusBadge(item.intStatus || (item.intAppDate && item.intAppDate !== 'N / A' ? item.status : 'none'));

  body.innerHTML = `
    <div class="detail-grid">
      <div>
        <div class="detail-img-box">
          ${imgHtml}
        </div>
        ${galleryThumbnailsHtml}
        ${mainImgSrc ? `<div style="font-size:0.75rem; color:var(--text-muted); text-align:center; margin-top:6px;">🔍 Кликнете върху снимката за пълен размер</div>` : ''}
      </div>
      <div>
        <div style="display: flex; gap: 0.5rem; align-items: center; margin-bottom: 0.5rem; flex-wrap: wrap;">
          <span class="item-type-badge ${item.type}">${item.type === 'trademark' ? 'Търговска Марка' : 'Промишлен Дизайн'}</span>
          <span class="project-code">${escapeHtml(proj.name)}</span>
        </div>
        <h2 style="font-size: 1.8rem; margin-bottom: 1rem; color: var(--text-primary);">${escapeHtml(item.name)}</h2>

        <div class="info-cards-grid">
          <div class="info-card-box">
            <h4>НАЦИОНАЛНА РЕГИСТРАЦИЯ (BG/EM)</h4>
            <div class="info-card-line"><span>Статус:</span> <strong>${natStatusBadgeHtml}</strong></div>
            <div class="info-card-line"><span>Дата на подаване:</span> <strong>${escapeHtml(item.appDate)}</strong></div>
            <div class="info-card-line"><span>Дата на регистрация:</span> <strong>${escapeHtml(item.regDate)}</strong></div>
            <div class="info-card-line"><span>Територия:</span> <strong>${escapeHtml(item.territory)}</strong></div>
            ${natLinkHtml}
          </div>

          <div class="info-card-box">
            <h4>МЕЖДУНАРОДНА РЕГИСТРАЦИЯ (INT / WO)</h4>
            <div class="info-card-line"><span>Int. Статус:</span> <strong>${intStatusBadgeHtml}</strong></div>
            <div class="info-card-line"><span>Int. Подаване:</span> <strong>${escapeHtml(item.intAppDate)}</strong></div>
            <div class="info-card-line"><span>Int. Регистрация:</span> <strong>${escapeHtml(item.intRegDate)}</strong></div>
            <div class="info-card-line"><span>Int. Територия:</span> <strong>${escapeHtml(item.intTerritory)}</strong></div>
            ${intLinkHtml}
          </div>

          <!-- Notes Card Section -->
          <div class="info-card-box" style="grid-column: span 2; margin-top: 0.5rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.6rem;">
              <h4 style="margin: 0;">📝 БЕЛЕЖКИ КЪМ ПРОЕКТА</h4>
              <button class="btn btn-primary" onclick="saveDetailNotes('${proj.id}', '${item.id}')" style="font-size:0.75rem; padding:4px 10px;">
                <span>💾 Запази бележки</span>
              </button>
            </div>
            <textarea id="detail-notes-field" class="form-control" style="min-height: 100px; font-size: 0.9rem; border-color: var(--border-highlight);" placeholder="Въведете вашите бележки, коментари или статус бележки тук...">${escapeHtml(item.notes || item.moreInfo || '')}</textarea>
            <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 4px;">* Всички потребители могат да четат и актуализират бележките тук.</div>
          </div>
        </div>
      </div>
    </div>
  `;

  modal.classList.add('active');
}

function saveDetailNotes(projId, itemId) {
  const proj = state.projects.find(p => p.id === projId);
  if (!proj) return;
  const item = (proj.items || []).find(i => i.id === itemId);
  if (!item) return;

  const textVal = document.getElementById('detail-notes-field').value;
  item.notes = textVal;
  item.moreInfo = textVal;
  saveState();
  alert('Бележките бяха успешно запазени!');
  renderApp();
}

function switchDetailMainImg(src) {
  const mainImg = document.getElementById('detail-main-display-img');
  if (mainImg) {
    mainImg.src = src;
    mainImg.onclick = () => openFullResLightbox(src);
  }
}

function openFullResLightbox(src) {
  const w = window.open(src, '_blank');
  if (w) w.focus();
}

function closeDetailModal() {
  document.getElementById('detail-modal').classList.remove('active');
}

// Export & Import
function exportToJSON() {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(state.projects, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", `egt_projects_backup_${new Date().toISOString().split('T')[0]}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}

function triggerImport() {
  document.getElementById('import-file-input').click();
}

function handleImportFile(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const imported = JSON.parse(e.target.result);
      if (Array.isArray(imported)) {
        state.projects = imported;
        saveState();
        renderApp();
        alert('Данните бяха успешно импортирани!');
      } else {
        alert('Невалиден формат на файла.');
      }
    } catch (err) {
      alert('Грешка при четене на файла: ' + err.message);
    }
  };
  reader.readAsText(file);
}

function exportToCSV() {
  let csv = 'Project Code,Project Name,Item Name,Item Type,National Status,Int Status,App Date,Reg Date,Territory,National Link,Int App Date,Int Reg Date,Int Territory,Int Link,Notes\n';
  
  state.projects.forEach(p => {
    (p.items || []).forEach(i => {
      const allIntLinks = (i.intLinks && i.intLinks.length > 0) ? i.intLinks.join(' | ') : (i.intLink || '');
      csv += `"${p.code}","${p.name}","${i.name}","${i.type}","${i.status || 'registered'}","${i.intStatus || 'none'}","${i.appDate}","${i.regDate}","${i.territory}","${i.nationalLink || ''}","${i.intAppDate}","${i.intRegDate}","${i.intTerritory}","${allIntLinks}","${(i.notes || '').replace(/"/g, '""')}"\n`;
    });
  });

  const blob = new Blob(["\ufeff" + csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `egt_ip_data_${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Utility
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/* ==========================================
   Password Authentication System
   ========================================== */
const APP_REQUIRED_PASSWORD = 'Jackpot123#@!';

function checkAuth() {
  const isAuth = sessionStorage.getItem('egt_authenticated') === 'true';
  const overlay = document.getElementById('auth-overlay');
  const appContent = document.getElementById('app-content');

  if (isAuth) {
    // Authenticated: Hide Screen 1 (Password Overlay), Show Screen 2 (Main App Content)
    if (overlay) overlay.style.display = 'none';
    if (appContent) appContent.style.display = 'block';
    renderApp();
  } else {
    // Unauthenticated: Show Screen 1 (Password Overlay), Hide Screen 2 (Main App Content)
    if (overlay) overlay.style.display = 'flex';
    if (appContent) appContent.style.display = 'none';
    setTimeout(() => {
      const pwInput = document.getElementById('auth-password-input');
      if (pwInput) pwInput.focus();
    }, 150);
  }
}

function handleAuthSubmit(e) {
  if (e) e.preventDefault();
  const input = document.getElementById('auth-password-input');
  const errorMsg = document.getElementById('auth-error-msg');
  const card = document.querySelector('.auth-card');
  
  if (!input) return;
  
  if (input.value === APP_REQUIRED_PASSWORD) {
    sessionStorage.setItem('egt_authenticated', 'true');
    if (errorMsg) errorMsg.style.display = 'none';
    input.value = '';
    checkAuth();
  } else {
    if (errorMsg) {
      errorMsg.style.display = 'block';
      errorMsg.innerText = '❌ Неправилна парола! Моля, опитайте отново.';
    }
    if (card) {
      card.classList.remove('shake');
      void card.offsetWidth; // Force DOM reflow to re-trigger CSS shake animation
      card.classList.add('shake');
    }
    input.focus();
    input.select();
  }
}

function togglePasswordVisibility() {
  const input = document.getElementById('auth-password-input');
  const btn = document.querySelector('.btn-toggle-pw');
  if (input) {
    if (input.type === 'password') {
      input.type = 'text';
      if (btn) btn.textContent = '🙈';
    } else {
      input.type = 'password';
      if (btn) btn.textContent = '👁️';
    }
  }
}

function logoutApp() {
  sessionStorage.removeItem('egt_authenticated');
  checkAuth();
}

function handleBackdropClick(e, modalId) {
  if (e.target.id === modalId) {
    if (modalId === 'project-hub-modal') {
      closeProjectHubModal();
    } else {
      const modal = document.getElementById(modalId);
      if (modal) modal.classList.remove('active');
    }
  }
}

// Global Keyboard Shortcuts (Close Modals on Escape)
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeConfirmModal();
    closeProjectHubModal();
    closeProjectModal();
    closeItemModal();
    closeDetailModal();
  }
});
