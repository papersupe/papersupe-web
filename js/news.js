fetch('https://gnews.io/api/v4/search?q=artificial intelligence&token=YOUR_API_KEY')
.then(res => res.json())
.then(data => {
const list = document.getElementById('news');
data.articles.forEach(a => {
const li = document.createElement('li');
li.innerHTML = `<strong>${a.title}</strong>`;
list.appendChild(li);
});
});
