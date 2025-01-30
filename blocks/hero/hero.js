export default function decorate() {
  const titleElement = document.getElementById('about-ndbf');
  const newContainer = document.createElement('div');
  newContainer.className = 'h1-wrapper';
  titleElement.parentNode.insertBefore(newContainer, titleElement);
  newContainer.appendChild(titleElement);
}
