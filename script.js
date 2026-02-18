const names = ["Lucy", "Lucky", "Rex"];
    const randomName = names[Math.floor(Math.random() * names.length)];
    document.getElementById("random-name").textContent = randomName;
   const addDogBtn = document.getElementById('add-dog-btn');
  const addDogForm = document.getElementById('add-dog-form');

 
  addDogBtn.addEventListener('click', () => {
    
    if (addDogForm.style.display === 'none') {
      addDogForm.style.display = 'block';
    } else {
      addDogForm.style.display = 'none';
    }
  });

   function getRandomColor() {

    return '#' + Math.floor(Math.random()*16777215).toString(16);
  }

  document.getElementById('input').addEventListener('click', function() {
    document.body.style.backgroundColor = getRandomColor();
  });