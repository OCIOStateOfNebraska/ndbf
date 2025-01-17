/*
 * Link Bricks Block
 */

export default function decorate(block) {
  let columnRows = 0;
  let column = document.createElement('div');
  column.className = 'col-6';
  const mainDiv = document.createElement('div');
  mainDiv.className = 'row';

  [...block.children].forEach((row) => {
    // decorate link brick item label
    let colAdd = 0;
    const brickDesc = row.firstElementChild ? row.firstElementChild.innerText : '';
    const linkbrick = document.createElement('div');
    if (brickDesc.toLowerCase().includes('small')) {
      colAdd = 1;
      linkbrick.className = 'linkbrick-item small';
    }
    else if (brickDesc.toLowerCase().includes('large')) {
      colAdd = 2;
      linkbrick.className = 'linkbrick-item large';
    }

    if (columnRows + colAdd > 2) {
      column = document.createElement('div');
      column.className = 'col-6';
      columnRows = 0; 
    }
    else {
      columnRows += colAdd; 
    }
 
    const linkChild = row.lastElementChild;
    const label = linkChild.firstElementChild ? linkChild.firstElementChild.innerText : '';
    const linkHref = linkChild.firstElementChild && linkChild.firstElementChild.lastElementChild ? linkChild.firstElementChild.lastElementChild.href : '#';

    const link = document.createElement('a');
    link.href = linkHref;
    const linkDiv = document.createElement('div');

    if (brickDesc.toLowerCase().includes('green')) {
      linkDiv.className = 'linkbrick-green';
    }
    else if (brickDesc.toLowerCase().includes('red')) {
      linkDiv.className = 'linkbrick-red';
    }
    else if (brickDesc.toLowerCase().includes('gray')) {
      linkDiv.className = 'linkbrick-gray';
    }
    else {
      linkDiv.className = 'linkbrick-default';
    }

    const linkSpan = document.createElement('span');
    linkSpan.className = 'h2';
    linkSpan.textContent = label;
    linkDiv.append(linkSpan);
    link.append(linkDiv);
    linkbrick.append(link);
    column.append(linkbrick);
    mainDiv.append(column);
    row.replaceWith(mainDiv);
  });
}
