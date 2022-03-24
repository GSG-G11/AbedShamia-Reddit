const logoutBtn = document.querySelector('.logout-btn');
const createPostInput = document.querySelector('.create-post');
const closeModalBtn = document.querySelector('.close-btn');

logoutBtn.addEventListener('click', e => {
  fetch('/api/auth/logout', {
    method: 'POST',
  })
    .then(res => res.json())
    .then(result => {
      console.log(result);
      if (result.status) {
        window.location.href = '/reddit/login';
      }
    })
    .catch(err => console.log(err));
});

createPostInput.addEventListener('click', e => {
  const modal = document.querySelector('.modal-container');
  document.querySelector('.container').classList.add('blur');
  modal.style.display = 'block';
  console.log('clicked');
});

closeModalBtn.addEventListener('click', e => {
  const modal = document.querySelector('.modal-container');
  document.querySelector('.container').classList.remove('blur');
  modal.style.display = 'none';
});
