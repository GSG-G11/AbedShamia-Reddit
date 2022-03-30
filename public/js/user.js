const logoutBtn = document.querySelector('.logout-btn');
const postsContainer = document.querySelector('.reddit-posts');
const profileName = document.querySelector('.profile-name');
const rightNav = document.querySelector('.right-nav');

const userLoggedIn = document.querySelector('.username');
const userVisited = document.querySelectorAll('.uservisited');

const user = window.location.pathname.split('/')[2];

fetch('/api/auth/login/user').then(res => {
  if (res.status === 401) {
    logoutBtn.style.display = 'none';
    profileName.style.display = 'none';
    const signUpBtn = document.createElement('button');
    signUpBtn.innerText = 'Sign Up / Login';
    signUpBtn.classList.add('logout-btn');
    signUpBtn.addEventListener('click', e => {
      window.location.href = '/login';
    });
    rightNav.appendChild(signUpBtn);
  }

  if (res.status === 200) {
    res.json().then(user => {
      profileName.innerText = user.user.username;
      // Set href to user profile
      profileName.href = `/users/${user.user.username}`;
    });

    logoutBtn.addEventListener('click', e => {
      fetch('/api/auth/logout', {
        method: 'POST',
      })
        .then(res => res.json())
        .then(result => {
          if (result.status) {
            window.location.href = '/login';
          }
        });
    });
  }
});

userVisited.forEach(name => {
  name.innerText = user;
});

fetch(`/api/v1/users/${user}`)
  .then(res => res.json())
  .then(({posts}) => {
    if (posts.length === 0) {
      const noPosts = document.createElement('p');
      noPosts.innerText = 'The user has not posted anything yet.';
      noPosts.classList.add('no-posts');
      postsContainer.appendChild(noPosts);
    }
    posts.forEach(post => {
      postTemplate(post);
    });
  });

function postTemplate(post) {
  const redditCard = document.createElement('div');
  redditCard.classList.add('card', 'reddit-post');
  postsContainer.appendChild(redditCard);

  fetch('/api/auth/login/user')
    .then(res => res.json())
    .then(user => {
      if (user.user.id === post.user_id) {
        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-btn');
        deleteBtn.innerText = 'X';
        redditCard.appendChild(deleteBtn);

        deleteBtn.addEventListener('click', e => {
          e.preventDefault();
          fetch(`/api/v1/posts/${post.id}`, {
            method: 'DELETE',
          }).then(res => {
            if (res.status === 204) {
              redditCard.remove();
            }
          });
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

  fetch(`/api/auth/login/user`)
    .then(res => res.json())
    .then(data => styleVoteBtns(post.id, upVoteBtn, downVoteBtn));

  upVote(upVoteBtn, post.id, votes, upVoteBtn, downVoteBtn);

  downVote(downVoteBtn, post.id, votes, upVoteBtn, downVoteBtn);

  const downVoteIcon = document.createElement('i');
  downVoteIcon.classList.add('fa', 'fa-arrow-down');
  downVoteBtn.appendChild(downVoteIcon);

  votesContainer.appendChild(downVoteBtn);

  const redditPost = document.createElement('div');
  redditPost.classList.add('post');
  redditCard.appendChild(redditPost);
  redditPost.setAttribute('data-id', post.id);

  const postedBy = document.createElement('p');
  postedBy.classList.add('post-by');
  redditPost.appendChild(postedBy);

  const userImg = document.createElement('img');
  userImg.src = '/images/userdefault.png';

  const usernameLink = document.createElement('a');
  usernameLink.classList.add('username');

  const dateCreated = document.createElement('span');
  dateCreated.classList.add('date');
  dateCreated.innerText = post.created_at;

  const postTitle = document.createElement('p');
  postTitle.classList.add('post-title');
  postTitle.innerText = post.title;
  redditPost.appendChild(postTitle);

  const postBody = document.createElement('p');
  postBody.classList.add('post-desc');
  postBody.innerText = post.body;
  redditPost.appendChild(postBody);

  postCreatedBy(post.id, usernameLink, postedBy, userImg, dateCreated);

  if (post.image_url) {
    const postImg = document.createElement('img');
    postImg.src = post.image_url.replace('protected', '');
    postImg.style.width = '100%';
    postImg.style.padding = '10px';
    postImg.style.paddingRight = '25px';

    redditPost.appendChild(postImg);
  }

  const commentBar = document.createElement('div');
  commentBar.classList.add('comment-bar');
  redditPost.appendChild(commentBar);

  const commentBtn = document.createElement('button');
  commentBtn.classList.add('comment-btn');
  commentBtn.innerText = 'Add a Comment';

  const commentIcon = document.createElement('i');
  commentIcon.classList.add('fa', 'fa-comment');
  commentBtn.appendChild(commentIcon);
  commentBar.appendChild(commentBtn);
  const commentInput = document.createElement('div');
  commentInput.classList.add('comment-input', 'hidden');
  redditPost.appendChild(commentInput);

  const commentText = document.createElement('textarea');
  commentText.placeholder = 'Add a comment...';
  commentInput.appendChild(commentText);

  const commentSubmit = document.createElement('button');
  commentSubmit.classList.add('comment-submit');
  commentSubmit.innerText = 'Submit';
  commentInput.appendChild(commentSubmit);
  commentBtn.addEventListener('click', e => {
    e.preventDefault();
    fetch('/api/auth/login/user').then(res => {
      if (res.status === 401) {
        alert('You must be logged in to comment');
      } else {
        commentInput.classList.toggle('hidden');
        commentInput.style.animation = 'goUp 0.5s ease-in-out';
      }
    });
  });

  const comment = document.createElement('p');
  comment.classList.add('comment');
  commentBar.appendChild(comment);

  getCommentsCount(post.id, comment);

  commentSubmit.addEventListener('click', e => {
    e.preventDefault();
    if (commentText.value === '') {
      alert('You must enter a comment');
      return;
    }

    fetch(`/api/v1/comments/posts/${post.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        body: commentText.value,
      }),
    })
      .then(res => res.json())
      .then(result => {
        createComment(commentsSection, post, result.body);
        commentsSection.innerHTML = '';
        getPostComments(post.id, commentsSection);
        commentText.value = '';
        getCommentsCount(post.id, comment);
      });
  });
  const commentsSection = document.createElement('div');
  commentsSection.classList.add('comments-section');
  redditPost.appendChild(commentsSection);

  getPostComments(post.id, commentsSection, post, commentText);
}

getCommentsCount = (postId, comment) => {
  fetch(`/api/v1/comments/posts/${postId}`)
    .then(res => res.json())
    .then(data => {
      comment.innerText = `${data.length} comments`;
    });
};

/////////////// Post Upvote/Downvote  ////////////////////////////////

function upVote(btn, id, votes, upVoteBtn, downVoteBtn) {
  btn.addEventListener('click', e => {
    e.preventDefault();
    fetch(`/api/v1/votes/upvote/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => {
        if (res.status === 401) {
          alert('You must be logged in to vote');
        } else {
          return res.json();
        }
      })
      .then(() => {
        getPostVotes(id, votes);
        styleUpVoteBtn(id, upVoteBtn);
        styleDownVoteBtn(id, downVoteBtn);
      });
  });
}

function downVote(btn, id, votes, upVoteBtn, downVoteBtn) {
  btn.addEventListener('click', e => {
    e.preventDefault();
    fetch(`/api/v1/votes/downvote/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => {
        if (res.status === 401) {
          alert('You must be logged in to vote');
        } else {
          return res.json();
        }
      })
      .then(() => {
        getPostVotes(id, votes);
        styleDownVoteBtn(id, downVoteBtn);
        styleUpVoteBtn(id, upVoteBtn);
      });
  });
}

function getPostVotes(id, votes) {
  fetch(`/api/v1/votes/${id}`)
    .then(res => res.json())
    .then(vote => {
      votes.innerText = vote.total_votes;
    });
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
  fetch(`/api/v1/votes/posts/${id}`)
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

///////////////////// Post Comments ////////////////////////////////

function createComment(commentsSection, post, comment) {
  const commentContainer = document.createElement('div');
  commentContainer.classList.add('comment-container');
  commentsSection.appendChild(commentContainer);

  const commentProfilePic = document.createElement('img');
  commentProfilePic.src = '/images/userdefault.png';
  commentProfilePic.classList.add('comment-profile-pic');
  commentContainer.appendChild(commentProfilePic);

  const commentBy = document.createElement('p');
  commentBy.classList.add('comment-by');

  const usernameLink = document.createElement('a');
  usernameLink.classList.add('username');
  const date = document.createElement('span');
  date.textContent = comment.created_at;
  date.classList.add('date');

  usernameLink.textContent = comment.username;
  usernameLink.href = `/users/${comment.username}`;
  commentBy.innerHTML = `Post by <a href='/users/${comment.username}' class='username'>${
    usernameLink.innerText
  }</a> on ${date.textContent.slice(0, 10)}`;

  commentContainer.appendChild(commentBy);

  const commentBody = document.createElement('p');
  commentBody.classList.add('comment-body');
  commentBody.innerText = comment.body;
  commentContainer.appendChild(commentBody);
}

function getPostComments(id, commentsSection, post) {
  fetch(`/api/v1/comments/posts/${id}`)
    .then(res => res.json())
    .then(comments => {
      comments.forEach(comment => {
        createComment(commentsSection, post, comment);
      });
    });
}

///////////////// Post Created By //////////////////////////

function postCreatedBy(id, usernameLink, postedBy, userImg, dateCreated) {
  fetch(`/api/v1/posts/${id}`)
    .then(res => res.json())
    .then(result => {
      if (result.status === 'success') {
        usernameLink.textContent = result.post.username;
        usernameLink.href = `/users/${result.post.username}`;
        postedBy.innerHTML = `<img src=${userImg.src}> Post by <a href='/users/${
          result.post.username
        }' class='username'>${usernameLink.innerText}</a> on ${dateCreated.textContent.slice(
          0,
          10
        )}`;
      }
    });
}
