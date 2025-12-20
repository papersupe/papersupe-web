fetch(
  'https://newsdata.io/api/1/news?apikey=pub_82b819f31ca44018b23049f49aed81d1&q=artificial intelligence&language=en'
)
  .then(res => res.json())
  .then(data => {
    const list = document.getElementById('news');

    if (!data.results) return;

    data.results.forEach(article => {
      const li = document.createElement('li');
      li.innerHTML = `
        <strong>${article.title}</strong><br>
        <span style="opacity:0.7;font-size:0.85rem;">
          ${article.source_id || 'Unknown source'}
        </span>
      `;
      list.appendChild(li);
    });
  })
  .catch(err => {
    console.error('News fetch failed:', err);
  });
