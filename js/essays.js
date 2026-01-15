document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('essays');
  if (!container) return;

  // Skeleton loading (perceived performance)
  container.innerHTML = `<p style="opacity:0.6">Loading essays…</p>`;

  const rssUrl = encodeURIComponent(
    'https://medium.com/feed/@abhiverse01'
  );

  fetch(`https://api.rss2json.com/v1/api.json?rss_url=${rssUrl}`)
    .then(res => res.json())
    .then(data => {
      if (!data.items || data.items.length === 0) {
        container.innerHTML = '<p>No essays found.</p>';
        return;
      }

      container.innerHTML = ''; // clear skeleton

      data.items.slice(0, 6).forEach(item => {
        const card = document.createElement('article');
        card.className = 'essay-card';

        const description = truncate(stripHtml(item.description), 180);
        const date = item.pubDate
          ? new Date(item.pubDate).toLocaleDateString(undefined, {
              year: 'numeric',
              month: 'short'
            })
          : '';

        card.innerHTML = `
          <span class="essay-meta">Medium · ${date}</span>
          <h3>${item.title}</h3>
          <p>${description}</p>
          <a href="${item.link}" target="_blank" rel="noopener">
            Read on Medium →
          </a>
        `;

        // Click anywhere on card
        card.addEventListener('click', e => {
          if (e.target.tagName !== 'A') {
            window.open(item.link, '_blank', 'noopener');
          }
        });

        container.appendChild(card);
      });
    })
    .catch(err => {
      console.error('Medium RSS error:', err);
      container.innerHTML =
        '<p style="opacity:0.7">Unable to load essays right now.</p>';
    });
});

/* Utils */

function stripHtml(html) {
  const div = document.createElement('div');
  div.innerHTML = html;
  return div.textContent || div.innerText || '';
}

function truncate(text, maxLength) {
  if (!text) return '';
  return text.length > maxLength
    ? text.slice(0, maxLength).trim() + '…'
    : text;
}
