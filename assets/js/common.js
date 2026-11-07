const IPTV = (() => {
  const channels = [
    {id:'mux', name:'Mux Test Stream', group:'Demo', country:'US', logo:'MUX', url:'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8', description:'Public HLS test stream for browser playback.'},
    {id:'apple', name:'Apple BipBop', group:'Demo', country:'US', logo:'TV', url:'https://devstreaming-cdn.apple.com/videos/streaming/examples/img_bipbop_adv_example_ts/master.m3u8', description:'Apple HLS sample stream.'},
    {id:'bbb', name:'Big Buck Bunny', group:'Movies', country:'Demo', logo:'BBB', url:'https://test-streams.mux.dev/bbb-360p-playlist.m3u8', description:'Demo video stream used for testing.'},
    {id:'tears', name:'Tears of Steel', group:'Movies', country:'Demo', logo:'TOS', url:'https://test-streams.mux.dev/pts_shift/master.m3u8', description:'HLS demo stream.'},
    {id:'channel5', name:'Demo News', group:'News', country:'EE', logo:'N', url:'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8', description:'Demo entry using a public test stream.'},
    {id:'channel6', name:'Demo Sport', group:'Sport', country:'EE', logo:'S', url:'https://test-streams.mux.dev/bbb-360p-playlist.m3u8', description:'Demo entry using a public test stream.'},
    {id:'channel7', name:'Demo Music', group:'Music', country:'EU', logo:'M', url:'https://test-streams.mux.dev/pts_shift/master.m3u8', description:'Demo entry using a public test stream.'},
    {id:'channel8', name:'Demo Kids', group:'Kids', country:'EU', logo:'K', url:'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8', description:'Demo entry using a public test stream.'}
  ];

  const getFavorites = () => JSON.parse(localStorage.getItem('iptv_favorites') || '[]');
  const setFavorites = ids => localStorage.setItem('iptv_favorites', JSON.stringify(ids));
  const isFavorite = id => getFavorites().includes(id);
  const toggleFavorite = id => {
    const favs = getFavorites();
    const i = favs.indexOf(id);
    if (i >= 0) favs.splice(i,1); else favs.push(id);
    setFavorites(favs);
    return favs.includes(id);
  };

  const getCustomChannels = () => JSON.parse(localStorage.getItem('iptv_custom_channels') || '[]');
  const setCustomChannels = list => localStorage.setItem('iptv_custom_channels', JSON.stringify(list));
  const allChannels = () => [...channels, ...getCustomChannels()];

  const channelById = id => allChannels().find(c => c.id === id) || allChannels()[0];

  const parseM3U = text => {
    const lines = text.replace(/\r/g,'').split('\n');
    const result = [];
    let meta = null;
    lines.forEach(line => {
      const s = line.trim();
      if (!s) return;
      if (s.startsWith('#EXTINF:')) {
        const name = s.includes(',') ? s.slice(s.lastIndexOf(',')+1).trim() : 'Untitled';
        const group = (s.match(/group-title="([^"]*)"/i)||[])[1] || 'Imported';
        const tvgId = (s.match(/tvg-id="([^"]*)"/i)||[])[1] || '';
        meta = {name, group, tvgId};
      } else if (!s.startsWith('#') && meta) {
        const id = 'imported_' + Math.random().toString(36).slice(2,10);
        result.push({id, name:meta.name, group:meta.group, country:'', logo:'TV', url:s, description:'Imported from M3U', tvgId:meta.tvgId});
        meta = null;
      }
    });
    return result;
  };

  const exportM3U = list => {
    const rows = ['#EXTM3U'];
    list.forEach(c => {
      rows.push(`#EXTINF:-1 tvg-id="${c.tvgId||''}" group-title="${c.group||''}",${c.name}`);
      rows.push(c.url);
    });
    return rows.join('\n');
  };

  return {channels, allChannels, channelById, getFavorites, toggleFavorite, isFavorite, getCustomChannels, setCustomChannels, parseM3U, exportM3U};
})();

document.addEventListener('DOMContentLoaded', () => {
  const btn = document.querySelector('.mobile-menu');
  const nav = document.querySelector('.navlinks');
  if (btn && nav) btn.addEventListener('click', () => nav.classList.toggle('open'));
  const year = document.querySelector('[data-year]');
  if (year) year.textContent = new Date().getFullYear();
});
