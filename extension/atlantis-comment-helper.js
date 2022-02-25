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

  decorateAtlantisOutputSnippets();
};

const pullRequestCommentsParentDiv = $('.js-discussion');
const parseCommentsFromPage = () => Array.from(
  new Set(
    [...document.querySelectorAll('.js-timeline-item')]
      .flatMap(it => it.innerText.match(/atlantis (plan|apply)( .*)?/g))
      .filter(Boolean)
  )
)
  .sort()
  .filter(Boolean)
// avoid accidentally applying everything
  .filter((it) => it !== 'atlantis apply')

  .filter((it) => !(it.match(/re-plan/)));

const asButton = (text, innerText) => {
  const button = document.createElement('button');
  button.innerText = innerText || text?.replace(/atlantis /, '');
  button.setAttribute('class', 'btn-primary btn');
  button.setAttribute('data-atlantis-command', text);
  button.addEventListener('click', () => {
    const commentField = $('#new_comment_field');
    // do it twice cuz sometimes the page thinks we didn't type anything
    commentField.value = text;
    commentField.value = text;

    $('#issue-comment-box button.btn-primary[type=submit]').removeAttribute('disabled');
    $('#issue-comment-box button.btn-primary[type=submit]').click();
  });

  return button;
};

const collectedComments = { plan: asButton('plan') };
const addCommentToCollection = (text) => {
  if (!collectedComments[text]) {
    collectedComments[text] = asButton(text);
    updateRecentComments(asButton(text));
  }
};

const updateRecentComments = (newButton) => [...Array.from(recentCommentsDiv.getElementsByTagName('button')), newButton]
  .sort((a, b) => a.textContent.localeCompare(b.textContent))
  .forEach(button => recentCommentsDiv.appendChild(button));

const decorateAtlantisOutputSnippets = () =>
[...document.querySelectorAll('.edit-comment-hide ul[dir=auto] code:last-child')]
  .filter(it => it.offsetParent && /atlantis /.test(it.outerText))
  .forEach(it => it.replaceWith(asButton(it.innerText, it.innerText)));

setInterval(doTheThing, 500);
