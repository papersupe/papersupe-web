document.addEventListener('DOMContentLoaded', () => {
  fetch(
    'https://newsdata.io/api/1/news?apikey=pub_82b819f31ca44018b23049f49aed81d1&q=artificial intelligence&language=en'
  )
    .then(res => res.json())
    .then(data => {
      const list = document.getElementById('news');
      if (!list || !data.results) return;

      data.results.forEach(article => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${article.title}</strong>`;
        list.appendChild(li);
      });
    })
    .catch(err => console.error(err));
});
