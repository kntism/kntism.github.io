// 读取并渲染网站数据
async function loadSites() {
  try {
    const response = await fetch('/content/sites.json');
    const data = await response.json();
    const sitesContainer = document.getElementById('sites-container');

    if (!sitesContainer) return;

    sitesContainer.innerHTML = '';

    data.sites.forEach(site => {
      const siteCard = document.createElement('a');
      siteCard.href = site.toolUrl;
      siteCard.target = '_blank';
      siteCard.className = 'site-card';

      const emoji = document.createElement('span');
      emoji.className = 'site-emoji';
      emoji.textContent = site.emoji;

      const content = document.createElement('div');
      content.className = 'site-content';

      const title = document.createElement('div');
      title.className = 'site-name';
      title.textContent = site.toolName;

      const description = document.createElement('div');
      description.className = 'site-description';
      description.textContent = site.description;

      content.appendChild(title);
      content.appendChild(description);

      siteCard.appendChild(emoji);
      siteCard.appendChild(content);

      sitesContainer.appendChild(siteCard);
    });
  } catch (error) {
    console.error('Error loading sites:', error);
    const sitesContainer = document.getElementById('sites-container');
    if (sitesContainer) {
      sitesContainer.innerHTML = '<div class="error-message">Failed to load sites</div>';
    }
  }
}

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', loadSites);