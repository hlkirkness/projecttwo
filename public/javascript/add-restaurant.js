async function newFormHandler(event) {
    event.preventDefault();
  
    const title = document.querySelector('input[name="restaurant-title"]').value;
    const restaurant_url = document.querySelector('input[name="restaurant-url"]').value;
  
    const response = await fetch(`/api/restaurants`, {
      method: 'POST',
      body: JSON.stringify({
        title,
        restaurant_url
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
  
  document.querySelector('.new-restaurant-form').addEventListener('submit', newFormHandler);
  