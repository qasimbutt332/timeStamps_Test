document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('timestamp-form');
  const resultDiv = document.getElementById('result');
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const unixTimestamp = document.getElementById('unix-timestamp').value;
    fetch(`/api/timestamp/${unixTimestamp}`)
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          resultDiv.innerHTML = `<p class="error">${data.error}</p>`;
        } else {
          resultDiv.innerHTML = `
            <p>Unix: ${data.unix}</p>
            <p>UTC: ${data.utc}</p>
          `;
        }
      })
      .catch(error => console.error(error));
  });
});
