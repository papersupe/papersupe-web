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

      data.items.slice(0, 6).forEach(item => {
        const card = document.createElement('article');
        card.className = 'essay-card';

        card.innerHTML = `
          <span class="essay-meta">Medium Essay</span>
          <h3>${item.title}</h3>
          <p>${stripHtml(item.description)}</p>
          <a href="${item.link}" target="_blank" rel="noopener">
            Read on Medium →
          </a>
        `;

        container.appendChild(card);
      });
    })
    .catch(err => {
      console.error('Medium RSS error:', err);
      container.innerHTML = '<p>Unable to load essays.</p>';
    });
});

/* Remove HTML tags safely */
function stripHtml(html) {
  const div = document.createElement('div');
  div.innerHTML = html;
  return div.textContent || div.innerText || '';
}
