document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('essays');
  if (!container) return;

  const rssUrl = encodeURIComponent(
    'https://medium.com/feed/@abhiverse01'
  );

  fetch(`https://api.rss2json.com/v1/api.json?rss_url=${rssUrl}`)
    .then(res => res.json())
    .then(data => {
      if (!data.items) return;

      data.items.forEach(item => {
        const card = document.createElement('article');
        card.className = 'card research-card';

        card.innerHTML = `
          <h3>${item.title}</h3>
          <p>${stripHtml(item.description).slice(0, 160)}…</p>
          <div class="research-meta">
            Published on Medium
          </div>
        `;

        card.addEventListener('click', () => {
          window.open(item.link, '_blank');
        });

        container.appendChild(card);
      });
    })
    .catch(err => {
      console.error('Medium RSS error:', err);
    });
});

/* Remove HTML tags from Medium descriptions */
function stripHtml(html) {
  const div = document.createElement('div');
  div.innerHTML = html;
  return div.textContent || div.innerText || '';
}
