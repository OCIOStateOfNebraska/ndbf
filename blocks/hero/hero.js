export default function decorate() {
  const specificElements = document.getElementsByTagName('h1');
  const specificElement = specificElements[0];
  const newContainer = document.createElement('div');
  newContainer.className = 'h1-wrapper';
  specificElement.parentNode.insertBefore(newContainer, specificElement);
  newContainer.appendChild(specificElement);
}
