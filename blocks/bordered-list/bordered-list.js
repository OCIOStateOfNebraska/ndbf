export default function decorate() {
  const aTags = document.querySelectorAll('a');
  const fragment = document.createDocumentFragment();
  aTags.forEach((aTag) => {
    const href = aTag.getAttribute('href');
    if (href.endsWith('.pdf') || href.endsWith('.jpg') || href.endsWith('.svg')) {
      const spanElement = document.createElement('span');
      spanElement.classList = 'icon icon-file-image';
      spanElement.style = 'mask-image: url("/icons/file-image.svg")';
      fragment.appendChild(spanElement);
      aTag.parentNode.insertBefore(spanElement, aTag);
    } else {
      const spanElement = document.createElement('span');
      spanElement.classList = 'icon icon-file-image';
      spanElement.style = 'mask-image: url("/icons/file.svg")';
      fragment.appendChild(spanElement);
      aTag.parentNode.insertBefore(spanElement, aTag);
    }
  });
  document.body.appendChild(fragment);
}
