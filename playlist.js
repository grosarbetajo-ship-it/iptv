function refreshStats(){
  document.getElementById('customCount').textContent=IPTV.getCustomChannels().length;
  document.getElementById('totalCount').textContent=IPTV.allChannels().length;
}
document.addEventListener('DOMContentLoaded',()=>{
  refreshStats();
  document.getElementById('importBtn').addEventListener('click',()=>{
    const text=document.getElementById('m3u').value.trim();
    const status=document.getElementById('status');
    if(!text){status.className='notice';status.textContent='Вставьте M3U-текст.';return}
    const list=IPTV.parseM3U(text);
    if(!list.length){status.className='notice';status.textContent='Не удалось найти каналы в M3U.';return}
    IPTV.setCustomChannels([...IPTV.getCustomChannels(),...list]);
    status.className='notice success';status.textContent=`Импортировано каналов: ${list.length}.`;
    refreshStats();
  });
  document.getElementById('clearBtn').addEventListener('click',()=>{
    IPTV.setCustomChannels([]);
    refreshStats();
    const status=document.getElementById('status');status.className='notice success';status.textContent='Импортированные каналы удалены.';
  });
  document.getElementById('demoBtn').addEventListener('click',async()=>{
    const r=await fetch('data/demo.m3u'); document.getElementById('m3u').value=await r.text();
  });
  document.getElementById('exportBtn').addEventListener('click',()=>{
    const text=IPTV.exportM3U(IPTV.allChannels());
    const blob=new Blob([text],{type:'audio/x-mpegurl'});
    const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='playlist.m3u';a.click();URL.revokeObjectURL(a.href);
  });
});
