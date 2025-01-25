document.getElementById('contentForm').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const ranking = document.getElementById('ranking').value;
  
    try {
      const response = await fetch('/.netlify/functions/createContent', {
        method: 'POST',
        body: JSON.stringify({ title, description, ranking }),
      });
  
      const result = await response.json();
      if (response.ok) {
        alert('Content created successfully');
        document.getElementById('contentForm').reset();
      } else {
        alert(result.message || 'Failed to create content');
        console.log(result.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  });
  