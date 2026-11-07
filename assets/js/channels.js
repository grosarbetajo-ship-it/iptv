function renderChannels(list){
  const grid = document.getElementById('channelGrid');
  const count = document.getElementById('channelCount');
  if (count) count.textContent = list.length;
  if (!list.length){
    grid.innerHTML = '<div class="empty" style="grid-column:1/-1">Каналы не найдены.</div>';
    return;
  }
  grid.innerHTML = list.map(c => `
    <article class="channel-card">
      <div class="channel-logo">${escapeHtml(c.logo || 'TV')}</div>
      <div class="channel-meta">
        <div class="channel-name">${escapeHtml(c.name)}</div>
        <div class="channel-group">${escapeHtml(c.group || 'Без группы')} · ${escapeHtml(c.country || '—')}</div>
      </div>
      <div class="channel-actions">
        <a class="icon-btn" href="player.html?id=${encodeURIComponent(c.id)}">▶ Смотреть</a>
        <button class="icon-btn fav ${IPTV.isFavorite(c.id)?'active':''}" onclick="toggleFav('${c.id}', this)">★</button>
      </div>
    </article>`).join('');
}
function escapeHtml(v){return String(v).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]))}
function toggleFav(id,btn){const active=IPTV.toggleFavorite(id);btn.classList.toggle('active',active)}
function applyFilter(){
  const q=(document.getElementById('search').value||'').toLowerCase();
  const g=document.getElementById('group').value;
  const list=IPTV.allChannels().filter(c => (!q || (c.name+' '+c.group+' '+c.country).toLowerCase().includes(q)) && (!g || c.group===g));
  renderChannels(list);
}
document.addEventListener('DOMContentLoaded',()=>{
  const groups=[...new Set(IPTV.allChannels().map(c=>c.group).filter(Boolean))].sort();
  document.getElementById('group').innerHTML='<option value="">Все группы</option>'+groups.map(g=>`<option>${escapeHtml(g)}</option>`).join('');
  document.getElementById('search').addEventListener('input',applyFilter);
  document.getElementById('group').addEventListener('change',applyFilter);
  renderChannels(IPTV.allChannels());
});
