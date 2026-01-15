document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('essays');
  if (!container) return;

  container.innerHTML = `<p style="opacity:0.6">Loading essays…</p>`;

  const rssUrl = encodeURIComponent(
    'https://medium.com/feed/@abhiverse01'
  );

  const CACHE_KEY = 'medium_essays_cache';
  const CACHE_TIME = 1000 * 60 * 10; // 10 minutes

  const cached = sessionStorage.getItem(CACHE_KEY);
  if (cached) {
    const { timestamp, items } = JSON.parse(cached);
    if (Date.now() - timestamp < CACHE_TIME) {
      renderEssays(items, container);
      return;
    }
  }

  fetch(`https://api.rss2json.com/v1/api.json?rss_url=${rssUrl}`)
    .then(res => res.json())
    .then(data => {
      if (!data.items || data.items.length === 0) {
        container.innerHTML = '<p>No essays found.</p>';
        return;
      }

      sessionStorage.setItem(
        CACHE_KEY,
        JSON.stringify({
          timestamp: Date.now(),
          items: data.items.slice(0, 6)
        })
      );

      renderEssays(data.items.slice(0, 6), container);
    })
    .catch(err => {
      console.error('Medium RSS error:', err);
      container.innerHTML =
        '<p style="opacity:0.7">Unable to load essays right now.</p>';
    });
});

/* ---------- Rendering ---------- */

function renderEssays(items, container) {
  container.innerHTML = '';

  items.forEach(item => {
    const card = document.createElement('article');
    card.className = 'essay-card';
    card.setAttribute('role', 'link');
    card.setAttribute('tabindex', '0');

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

    const openLink = () =>
      window.open(item.link, '_blank', 'noopener');

    card.addEventListener('click', e => {
      if (!e.target.closest('a')) openLink();
    });

    card.addEventListener('keydown', e => {
      if (e.key === 'Enter') openLink();
    });

    container.appendChild(card);
  });
}

/* ---------- Utils ---------- */

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
