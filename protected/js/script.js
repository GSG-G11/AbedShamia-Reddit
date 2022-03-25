const logoutBtn = document.querySelector('.logout-btn');
const createPostInput = document.querySelector('.create-post');
const createReddit = document.querySelector('.create-reddit');
const createPostBtn = document.querySelector('.create-post-btn');
const closeModalBtn = document.querySelector('.close-btn');
const postsContainer = document.querySelector('.reddit-posts');
const profileName = document.querySelector('.profile-name');
const rightNav = document.querySelector('.right-nav');

const submitBtn = document.querySelector('.submit-btn');

fetch('/api/auth/login/user').then(res => {
  if (res.status === 401) {
    logoutBtn.style.display = 'none';
    createPostBtn.style.display = 'none';
    createReddit.style.display = 'none';
    profileName.style.display = 'none';
    const signUpBtn = document.createElement('button');
    signUpBtn.innerText = 'Sign Up / Login';
    signUpBtn.classList.add('logout-btn');
    signUpBtn.addEventListener('click', e => {
      window.location.href = '/reddit/login';
    });
    rightNav.appendChild(signUpBtn);
  }
});

logoutBtn.addEventListener('click', e => {
  fetch('/api/auth/logout', {
    method: 'POST',
  })
    .then(res => res.json())
    .then(result => {
      console.log(result);
      if (result.status) {
        window.location.href = '/';
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

// If clicked away from modal, close modal
document.addEventListener('click', e => {
  const modal = document.querySelector('.modal-container');
  if (e.target == modal) {
    document.querySelector('.container').classList.remove('blur');
    modal.classList.remove('show-modal');
  }
});

fetch('/api/v1/posts')
  .then(res => res.json())
  .then(({posts}) => posts.map(post => postTemplate(post)))
  .catch(err => console.log(err));

function postTemplate(post) {
  const redditCard = document.createElement('div');
  redditCard.classList.add('card', 'reddit-post');
  postsContainer.appendChild(redditCard);

  fetch('/api/auth/login/user')
    .then(res => res.json())
    .then(user => {
      profileName.textContent = user.user.username;
      if (user.user.id === post.user_id) {
        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-btn');
        deleteBtn.innerText = 'X';
        redditCard.appendChild(deleteBtn);

        deleteBtn.addEventListener('click', e => {
          e.preventDefault();
          fetch(`/api/v1/posts/${post.id}`, {
            method: 'DELETE',
          })
            .then(res => {
              if (res.status === 204) {
                redditCard.remove();
              }
            })
            .catch(err => console.log(err));
        });
      }
    });

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

  getPostVotes(post.id, votes);

  votesContainer.appendChild(votes);

  const downVoteBtn = document.createElement('button');
  downVoteBtn.classList.add('vote-down');

  fetch(`api/auth/login/user`)
    .then(res => res.json())
    .then(data => styleVoteBtns(post.id, upVoteBtn, downVoteBtn));

  upVoteBtn.addEventListener('click', e => {
    e.preventDefault();
    fetch(`/api/v1/votes/upvote/${post.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(vote => {
        getPostVotes(post.id, votes);
        styleUpVoteBtn(post.id, upVoteBtn);
        styleDownVoteBtn(post.id, downVoteBtn);
      });
  });

  downVoteBtn.addEventListener('click', e => {
    e.preventDefault();
    fetch(`/api/v1/votes/downvote/${post.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(vote => {
        getPostVotes(post.id, votes);
        styleDownVoteBtn(post.id, downVoteBtn);
        styleUpVoteBtn(post.id, upVoteBtn);
      });
  });

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

  fetch(`/api/v1/posts/${post.id}`)
    .then(res => res.json())
    .then(result => {
      if (result.status === 'success') {
        usernameSpan.textContent = result.post.username;
        postedBy.innerHTML = `<img src=${userImg.src}> Post by ${
          usernameSpan.textContent
        } on ${dateCreated.textContent.slice(0, 10)}`;
      }
    })
    .catch(err => console.log(err));
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

function getPostVotes(id, votes) {
  fetch(`/api/v1/votes/${id}`)
    .then(res => res.json())
    .then(vote => {
      votes.innerText = vote.total_votes;
    })
    .catch(err => console.log(err));
}

function styleUpVoteBtn(id, upVoteBtn) {
  fetch(`/api/v1/votes/posts/${id}`)
    .then(res => res.json())
    .then(data => {
      if (data.vote === 'up') {
        upVoteBtn.classList.add('active');
      } else {
        upVoteBtn.classList.remove('active');
      }
    });
}

function styleDownVoteBtn(id, downVoteBtn) {
  fetch(`/api/v1/votes/posts/${id}`)
    .then(res => res.json())
    .then(data => {
      if (data.vote === 'down') {
        downVoteBtn.classList.add('active');
      } else {
        downVoteBtn.classList.remove('active');
      }
    });
}

function styleVoteBtns(id, upBtn, downBtn) {
  fetch(`api/v1/votes/posts/${id}`)
    .then(res => res.json())
    .then(data => {
      if (data.vote === 'up') {
        upBtn.classList.add('active');
      } else if (data.vote === 'down') {
        downBtn.classList.add('active');
      } else {
        upBtn.classList.remove('active');
        downBtn.classList.remove('active');
      }
    });
}
