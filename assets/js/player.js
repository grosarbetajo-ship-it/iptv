let hls;
function playChannel(id){
  const c=IPTV.channelById(id);
  if(!c)return;
  document.getElementById('playerTitle').textContent=c.name;
  document.getElementById('playerDesc').textContent=(c.group||'')+(c.description?' · '+c.description:'');
  const video=document.getElementById('video');
  if(hls){hls.destroy();hls=null}
  if(video.canPlayType('application/vnd.apple.mpegurl')){
    video.src=c.url; video.play().catch(()=>{});
  }else if(window.Hls && Hls.isSupported()){
    hls=new Hls({enableWorker:true,lowLatencyMode:true});
    hls.loadSource(c.url); hls.attachMedia(video);
    hls.on(Hls.Events.MANIFEST_PARSED,()=>video.play().catch(()=>{}));
  }else{
    video.src=c.url;
  }
  const url=new URL(location.href);url.searchParams.set('id',c.id);history.replaceState({},'',url);
  renderSide(c.id);
}
function renderSide(activeId){
  document.getElementById('sideList').innerHTML=IPTV.allChannels().map(c=>`
    <div class="side-channel ${c.id===activeId?'active':''}" onclick="playChannel('${c.id}')">
      <div class="side-logo">${c.logo||'TV'}</div>
      <div><strong>${c.name}</strong><br><small>${c.group||'Без группы'}</small></div>
    </div>`).join('');
}
document.addEventListener('DOMContentLoaded',()=>{
  const id=new URLSearchParams(location.search).get('id')||IPTV.allChannels()[0].id;
  playChannel(id);
});
