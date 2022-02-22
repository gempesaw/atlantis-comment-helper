/* global chrome */

const $ = (selector) => document.querySelectorAll(selector)[0];

const recentCommentsDiv = document.createElement('div');
recentCommentsDiv.setAttribute('class', 'extension-github-recent-comments');

const doTheThing = () => {
  const commentsPlaced = $('.extension-github-recent-comments');
  if (!commentsPlaced) {
    const endOfCommentsDiv = $('.discussion-timeline-actions');
    endOfCommentsDiv.parentElement.insertBefore(recentCommentsDiv, endOfCommentsDiv);
  }

  parseCommentsFromPage()
    .forEach(addCommentToCollection);
};

const pullRequestCommentsParentDiv = $('.js-discussion');
const parseCommentsFromPage = () => Array.from(
  Array.from(
    new Set(
      Array.from(
        document.querySelectorAll('.js-timeline-item'))
          .flatMap(it => it.innerText.match(/atlantis (plan|apply)(.*)?/g))
          .filter(Boolean)
    )
  )
)
  .sort()
  .filter(Boolean)
  .filter((it) => it !== 'atlantis apply');

const collectedComments = { plan: asButton('plan') };
const addCommentToCollection = (text) => {
  if (!collectedComments[text]) {
    collectedComments[text] = asButton(text);
    updateRecentComments(asButton(text));
  }
};

const updateRecentComments = (button) => [...Array.from(recentCommentsDiv.getElementsByTagName('button')), button]
  .sort((a, b) => a.textContent.localeCompare(b.textContent))
  .forEach(button => recentCommentsDiv.appendChild(button));

const asButton = (text) => {
  const button = document.createElement('button');
  button.innerText = text?.replace(/atlantis /, '');
  button.setAttribute('class', 'btn-primary btn');
  button.setAttribute('data-atlantis-command', text);
  button.addEventListener('click', () => {
    const commentField = $('#new_comment_field');
    commentField.value = text;
    commentField.value = text;

    $('#issue-comment-box button.btn-primary[type=submit]').removeAttribute('disabled');
    $('#issue-comment-box button.btn-primary[type=submit]').click();
  });

  return button;
};

setInterval(doTheThing, 500);
