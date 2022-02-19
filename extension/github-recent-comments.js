/* global chrome */

const $ = (selector) => document.querySelectorAll(selector)[0];

const recentCommentsDiv = document.createElement('div');
recentCommentsDiv.setAttribute('class', 'extension-github-recent-comments');
$('.js-new-comment-form').appendChild(recentCommentsDiv);

const doTheThing = () =>  parseCommentsFromPage()
  .forEach(addCommentToCollection);;

const pullRequestCommentsParentDiv = $('.js-discussion');
const parseCommentsFromPage = () => Array.from(
  new Set(
    pullRequestCommentsParentDiv
      .innerText
      .split("\n")
      .filter((it) => it.match(/^atlantis (?:plan|apply)/))
  )
)
  .sort()
  .filter(it => it)
  .filter((it) => it !== 'atlantis apply');

const collectedComments = {};
const addCommentToCollection = (text) => {
  if (!collectedComments[text]) {
    collectedComments[text] = asButton(text);
    updateRecentComments(asButton(text));
  }
};

const updateRecentComments = (button) => {
  const awoo = [...Array.from(recentCommentsDiv.getElementsByTagName('button')), button];
  console.log(awoo);
  awoo
    .sort((a, b) => a.textContent.localeCompare(b.textContent))
    .forEach(button => recentCommentsDiv.appendChild(button));
};

const asButton = (text) => {
  const button = document.createElement('button');
  button.innerText = text;
  button.setAttribute('class', 'btn-primary btn');
  button.setAttribute('data-atlantis-command', text);
  button.addEventListener('click', () => {
    const commentField = $('#new_comment_field');
    commentField.value = text;
  });

  return button;
};

setInterval(doTheThing, 500);
