document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('githubFeed');
  if (!container) return;

  const rssUrl = encodeURIComponent(
    'https://github.com/abhiverse01.atom'
  );

  fetch(`https://api.rss2json.com/v1/api.json?rss_url=${rssUrl}`)
    .then(res => res.json())
    .then(data => {
      if (!data.items) return;

      data.items.slice(0, 6).forEach(item => {
        const card = document.createElement('article');
        card.className = 'card research-card';

        card.innerHTML = `
          <h3>${cleanTitle(item.title)}</h3>
          <p>${stripHtml(item.description).slice(0, 140)}…</p>
          <div class="research-meta">GitHub Activity</div>
        `;

        card.addEventListener('click', () => {
          window.open(item.link, '_blank');
        });

        container.appendChild(card);
      });
    })
    .catch(err => {
      console.error('GitHub RSS error:', err);
    });
});

function stripHtml(html) {
  const div = document.createElement('div');
  div.innerHTML = html;
  return div.textContent || div.innerText || '';
}

function cleanTitle(title) {
  return title
    .replace('abhiverse01', '')
    .replace(/(pushed to|created|opened)/i, '')
    .trim();
}
