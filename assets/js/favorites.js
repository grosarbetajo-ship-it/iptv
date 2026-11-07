document.addEventListener('DOMContentLoaded',()=>{
  const favs=IPTV.getFavorites();
  const list=IPTV.allChannels().filter(c=>favs.includes(c.id));
  const grid=document.getElementById('channelGrid');
  if(!list.length){
    grid.innerHTML='<div class="empty" style="grid-column:1/-1">Избранных каналов пока нет. Добавьте их на странице «Каналы».</div>';
    return;
  }
  grid.innerHTML=list.map(c=>`
    <article class="channel-card">
      <div class="channel-logo">${c.logo||'TV'}</div>
      <div class="channel-meta"><div class="channel-name">${c.name}</div><div class="channel-group">${c.group||'Без группы'}</div></div>
      <div class="channel-actions">
        <a class="icon-btn" href="player.html?id=${encodeURIComponent(c.id)}">▶ Смотреть</a>
        <button class="icon-btn fav active" data-id="${c.id}">★</button>
      </div>
    </article>`).join('');
  grid.querySelectorAll('.fav').forEach(btn=>btn.addEventListener('click',()=>{IPTV.toggleFavorite(btn.dataset.id);location.reload()}));
});
