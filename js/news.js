document.addEventListener('DOMContentLoaded', () => {
  fetch(
    'https://newsdata.io/api/1/news?apikey=pub_82b819f31ca44018b23049f49aed81d1&q=artificial intelligence&language=en'
  )
    .then(res => res.json())
    .then(data => {
      const list = document.getElementById('news');
      if (!list || !data.results) return;

      data.results.forEach(article => {
        const card = document.createElement('article');
        card.className = 'news-card';

        card.innerHTML = `
          <span class="news-source">${article.source_id || 'AI News'}</span>
          <h3>${article.title}</h3>
          <p>${article.description || 'Click to read full article.'}</p>

          <button class="news-expand"
            data-title="${article.title}"
            data-source="${article.source_id || 'AI News'}"
            data-description="${article.description || ''}"
            data-link="${article.link}">
            Read more
          </button>

        `;

        list.appendChild(card);
      });
    })
    .catch(err => {
      console.error('News fetch failed:', err);
    });
  document.addEventListener('click', e => {
  if (!e.target.classList.contains('news-expand')) return;

  const modal = document.getElementById('newsModal');

  document.getElementById('modalTitle').textContent =
    e.target.dataset.title;

  document.getElementById('modalSource').textContent =
    e.target.dataset.source;

  document.getElementById('modalDescription').textContent =
    e.target.dataset.description;

  document.getElementById('modalLink').href =
    e.target.dataset.link;

  modal.classList.add('open');
});

document.getElementById('closeModal')?.addEventListener('click', () => {
  document.getElementById('newsModal').classList.remove('open');
});

});
