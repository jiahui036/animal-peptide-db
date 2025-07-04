let allPeptides = []; // 全局存储数据

// 加载数据并初始渲染
fetch('data/peptides.json')
  .then(response => response.json())
  .then(data => {
    allPeptides = data;
    renderPeptides(data);
  })
  .catch(error => console.error("加载失败:", error));

// 渲染动物药卡片
function renderPeptides(data) {
  const container = document.getElementById('animal-drugs');
  container.innerHTML = ''; // 清空容器

  data.forEach(drug => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <h2>${drug.name}</h2>
      <p><i>${drug.latin}</i></p>
      <a href="detail.html?id=${drug.id}">查看详情</a>
    `;
    container.appendChild(card);
  });
}

// 搜索功能
document.getElementById('search').addEventListener('input', (e) => {
  const query = e.target.value.trim().toLowerCase();
  if (!query) {
    renderPeptides(allPeptides); // 空搜索重置显示
    return;
  }

  const filtered = allPeptides.filter(drug => 
    drug.name.toLowerCase().includes(query) || 
    drug.peptides.some(p => p.sequence.toLowerCase().includes(query))
  );
  renderPeptides(filtered);
});