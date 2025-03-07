export default function decorate(block) {
  const cols = [...block.firstElementChild.children];

  block.classList.add(`columns-${cols.length}-cols`);

  // setup image columns
  [...block.children].forEach((row) => {
    [...row.children].forEach((col) => {
      const pic = col.querySelector('picture');
      if (pic) {
        const picWrapper = pic.closest('div');
        if (picWrapper && picWrapper.children.length === 1) {
          // picture is only content in column
          picWrapper.classList.add('columns-img-col');
        }
      }
    });
  });
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
