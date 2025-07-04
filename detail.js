// 获取URL中的动物药ID（例如 detail.html?id=1）
const urlParams = new URLSearchParams(window.location.search);
const drugId = parseInt(urlParams.get('id'));

// 检查是否有效ID
if (isNaN(drugId)) {
  document.getElementById('drug-detail').innerHTML = `
    <h1>数据错误</h1>
    <p>未找到指定的动物药，请返回<a href="index.html">首页</a></p>
  `;
} else {
  // 加载JSON数据
  fetch('data/peptides.json')
    .then(response => {
      if (!response.ok) throw new Error("数据加载失败");
      return response.json();
    })
    .then(data => {
      // 查找匹配的动物药
      const drug = data.find(item => item.id === drugId);
      
      if (!drug) {
        throw new Error("未找到该动物药");
      }

      // 渲染动物药基本信息
      document.getElementById('drug-name').textContent = `${drug.name} (${drug.latin})`;
      document.getElementById('drug-part').textContent = `药用部位: ${drug.part}`;

      // 渲染多肽表格
      const tableBody = document.querySelector('#peptides-table tbody');
      tableBody.innerHTML = ''; // 清空现有内容

      drug.peptides.forEach(peptide => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${peptide.sequence}</td>
          <td>${peptide.length}</td>
          <td>
            ${peptide.reference 
              ? `<a href="https://doi.org/${peptide.reference.replace('doi:', '')}" target="_blank">查看文献</a>` 
              : '无文献记录'}
          </td>
        `;
        tableBody.appendChild(row);
      });
    })
    .catch(error => {
      console.error(error);
      document.getElementById('drug-detail').innerHTML = `
        <h1>加载失败</h1>
        <p>${error.message}，请返回<a href="index.html">首页</a></p>
      `;
    });
}