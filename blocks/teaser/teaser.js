import ffetch from '../../scripts/ffetch.js';
import { loadFragment } from '../fragment/fragment.js';

const allentries = await ffetch('/query-index.json').all();
function filterItems(arr, query) {
  // return arr.filter((el) => el.path.includes(query));
  const filtered = arr.filter((el) => el.path.includes(query));
  if (filtered.length < 2) {
    return null; // handle error as needed
  }
  filtered.sort((a, b) => b.lastModified - a.lastModified);
  return filtered[0];
}
function filterSecondItems(arr, query) {
  const filtered = arr.filter((el) => el.path.includes(query));
  if (filtered.length < 2) {
    return null; // handle error as needed
  }
  filtered.sort((a, b) => b.lastModified - a.lastModified);
  return filtered[1];
}
async function generateMainContent(template) {
  // copied from decorate start
  const match = filterItems(allentries, template);
  const fragment = await loadFragment(match.path);
  const header = fragment.firstElementChild;
  const headerH1 = header.getElementsByTagName('h1');
  const body = fragment.children[1];
  const picture = body.getElementsByTagName('picture');
  // main content column **************************************
  const mainContentColumn = document.createElement('div');
  mainContentColumn.className = 'main-content-column';
  // main content
  const mainContent = document.createElement('div');
  mainContent.className = 'main-content';
  // main  title
  const mainContentTitle = document.createElement('div');
  mainContentTitle.className = 'main-content-title';
  const mainContentTitleH1 = document.createElement('h3');
  mainContentTitleH1.innerText = headerH1[0].innerText;
  mainContentTitle.append(mainContentTitleH1);
  // main content release date
  const mainContentTitleH3 = document.createElement('h5');
  mainContentTitleH3.innerText = new Date(match.lastModified * 1000).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const mainContentNewsReleaseDate = document.createElement('div');
  mainContentNewsReleaseDate.className = 'main-content-news-release-date';
  mainContentNewsReleaseDate.append(mainContentTitleH3);
  // main content image
  const mainContentImage = document.createElement('div');
  mainContentImage.className = 'main-content-image-1';
  mainContentImage.append(picture[0]);
  // main content page node
  const mainContentPageNode = document.createElement('div');
  mainContentPageNode.className = 'main-content-page-node';
  const pageNodeAnchor = document.createElement('a');
  pageNodeAnchor.href = match.path;
  pageNodeAnchor.innerText = 'Read More';
  mainContentPageNode.append(pageNodeAnchor);
  // main content publication body
  const mainContentPublicationBody = document.createElement('div');
  mainContentPublicationBody.className = 'main-content-publication-body';
  const publicationBodyParagraph = document.createElement('p');
  publicationBodyParagraph.innerText = match.description;
  mainContentPublicationBody.append(publicationBodyParagraph);
  // main content appendatures
  mainContent.append(mainContentTitle);
  mainContent.append(mainContentNewsReleaseDate);
  mainContent.append(mainContentImage);
  mainContent.append(mainContentPageNode);
  mainContent.append(mainContentPublicationBody);
  // main content column appendature
  mainContentColumn.append(mainContent);
  // copied from decorate end
  return mainContentColumn;
}
async function generateSecondContent(template) {
  // copied from decorate start
  const match2 = filterSecondItems(allentries, template);
  const fragment2 = await loadFragment(match2.path);
  const body2 = fragment2.children[1];
  const picture2 = body2.getElementsByTagName('picture');
  const header2 = fragment2.firstElementChild;
  const header2H1 = header2.getElementsByTagName('h1');
  // second content column **************************************
  const secondContentColumn = document.createElement('div');
  secondContentColumn.className = 'second-content-column';
  // second content
  const secondContent = document.createElement('div');
  secondContent.className = 'second-content';
  // second title
  const secondTitle = document.createElement('div');
  secondTitle.className = 'second-content-title';
  const secondTitleH5 = document.createElement('h6');
  secondTitleH5.innerText = header2H1[0].innerText;
  secondTitle.append(secondTitleH5);
  // second image
  const secondImage = document.createElement('div');
  secondImage.className = 'second-content-image';
  secondImage.append(picture2[0]);
  const secondPicture = document.createElement('picture');
  const secondPictureSource = document.createElement('img');
  secondPictureSource.src = match2.image;
  secondPicture.append(secondPictureSource);
  secondImage.append(secondPicture);
  // second publication body
  const secondContentPublicationBody = document.createElement('div');
  secondContentPublicationBody.className = 'second-content-publication-body';
  const secondContentPublicationBodyParagraph = document.createElement('p');
  secondContentPublicationBodyParagraph.innerText = match2.description;
  secondContentPublicationBody.append(secondContentPublicationBodyParagraph);
  // second content page node
  const secondContentPageNode = document.createElement('div');
  secondContentPageNode.className = 'second-content-page-node';
  const secondPageNodeAnchor = document.createElement('a');
  secondPageNodeAnchor.href = match2.path;
  secondPageNodeAnchor.innerText = 'Read More';
  secondContentPageNode.append(secondPageNodeAnchor);

  // second content appendatures
  secondContent.append(secondTitle);
  secondContent.append(secondImage);
  secondContent.append(secondContentPublicationBody);
  secondContent.append(secondContentPageNode);
  // second content column appendature
  secondContentColumn.append(secondContent);
  // copied from decorate end
  return secondContentColumn;
}
// block.append(headerH1[0].innerText);
// block.append(match.lastModified);
// block.append(picture[0]);
// block.append(match.description);
// block.append(new Date(match.lastModified * 1000));
export default async function decorate(block) {
  const base = block.firstElementChild;
  const template = base.firstElementChild.innerText;
  const decorateBase = document.createElement('div');
  // main content testing
  const mainContentColumn = await generateMainContent(template);
  // second content testing
  const secondContentColumn = await generateSecondContent(template);
  // base appendatures
  decorateBase.append(mainContentColumn);
  decorateBase.append(secondContentColumn);
  block.innerHTML = decorateBase.innerHTML;
}
