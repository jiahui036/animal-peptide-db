document.getElementById('search').addEventListener('input', (e) => {
  const query = e.target.value.toLowerCase();
  const cards = document.querySelectorAll('.card');
  
  cards.forEach(card => {
    const text = card.textContent.toLowerCase();
    card.style.display = text.includes(query) ? 'block' : 'none';
  });
});
function exportFASTA() {
  fetch('data/peptides.json')
    .then(response => response.json())
    .then(data => {
      let fastaContent = "";
      data.forEach(drug => {
        drug.peptides.forEach(peptide => {
          fastaContent += `>${drug.name}|${peptide.length}\n${peptide.sequence}\n`;
        });
      });
      
      const blob = new Blob([fastaContent], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'peptides.fasta';
      a.click();
    });
}