const logoutBtn = document.querySelector('.logout-btn');
const createPostInput = document.querySelector('.create-post');
const createPostBtn = document.querySelector('.create-post-btn');
const closeModalBtn = document.querySelector('.close-btn');
const postsContainer = document.querySelector('.reddit-posts');

const submitBtn = document.querySelector('.submit-btn');

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

createPostInput.addEventListener('click', openPostModal(createPostInput));
createPostBtn.addEventListener('click', openPostModal(createPostBtn));

closeModalBtn.addEventListener('click', e => {
  const modal = document.querySelector('.modal-container');
  document.querySelector('.container').classList.remove('blur');
  modal.classList.remove('show-modal');
});

fetch('/api/v1/posts')
  .then(res => res.json())
  .then(({posts}) => {
    posts.forEach(post => postTemplate(post));
  })
  .catch(err => console.log(err));

function postTemplate(post) {
  const redditCard = document.createElement('div');
  redditCard.classList.add('card', 'reddit-post');
  postsContainer.appendChild(redditCard);

  const votesContainer = document.createElement('div');
  votesContainer.classList.add('votes-container');
  redditCard.appendChild(votesContainer);

  const upVoteBtn = document.createElement('button');
  upVoteBtn.classList.add('vote-up');

  const upVoteIcon = document.createElement('i');
  upVoteIcon.classList.add('fa', 'fa-arrow-up');
  upVoteBtn.appendChild(upVoteIcon);
  votesContainer.appendChild(upVoteBtn);

  const votes = document.createElement('p');
  votes.classList.add('votes');
  votes.innerText = 120;
  votesContainer.appendChild(votes);

  const downVoteBtn = document.createElement('button');
  downVoteBtn.classList.add('vote-down');

  const downVoteIcon = document.createElement('i');
  downVoteIcon.classList.add('fa', 'fa-arrow-down');
  downVoteBtn.appendChild(downVoteIcon);

  votesContainer.appendChild(downVoteBtn);

  const redditPost = document.createElement('div');
  redditPost.classList.add('post');
  redditCard.appendChild(redditPost);

  const postedBy = document.createElement('p');
  postedBy.classList.add('post-by');
  redditPost.appendChild(postedBy);

  const userImg = document.createElement('img');
  userImg.src = 'images/userdefault.png';

  const usernameSpan = document.createElement('span');
  usernameSpan.classList.add('username');

  const dateCreated = document.createElement('span');
  dateCreated.classList.add('date');
  dateCreated.innerText = post.created_at;
  postedBy.innerHTML = `<img src=${
    userImg.src
  }> Post by ${usernameSpan} on ${dateCreated.textContent.slice(0, 10)}`;

  const postTitle = document.createElement('p');
  postTitle.classList.add('post-title');
  postTitle.innerText = post.title;
  redditPost.appendChild(postTitle);

  const postBody = document.createElement('p');
  postBody.classList.add('post-desc');
  postBody.innerText = post.body;
  redditPost.appendChild(postBody);
}

function openPostModal(element) {
  element.addEventListener('click', e => {
    const modal = document.querySelector('.modal-container');
    document.querySelector('.container').classList.add('blur');
    modal.classList.add('show-modal');
  });
}

submitBtn.addEventListener('click', e => {
  const title = document.querySelector('input[name="title"]');
  const body = document.querySelector('textarea[name="body"]');

  const titleValue = title.value;
  const bodyValue = body.value;

  if (!titleValue.trim() || !bodyValue.trim()) {
    alert('Please fill in all fields');
    return;
  }

  fetch('/api/v1/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: titleValue,
      body: bodyValue,
    }),
  })
    .then(res => res.json())
    .then(result => {
      if (result.status) {
        window.location.reload();
      }
    })
    .catch(err => console.log(err));
});
