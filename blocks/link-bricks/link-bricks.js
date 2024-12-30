/*
 * Link Bricks Block
 */

export default function decorate(block) {
    const columnRows = 0;
    [...block.children].forEach((row) => {
        // decorate link brick item label
        const linkbrick = document.createElement('div');
        linkbrick.className = 'linkbrick-item';
       
        const brickDesc = brickDesc.firstElementChild ? brickDesc.firstElementChild.innerText : '';
        if (brickDesc.toLowerCase().includes('small')) {
    
        }

        const linkChild = row.lastElementChild;
        const label = linkChild.firstElementChild ? linkChild.firstElementChild.innerText : '';
        const linkHref = linkChild.firstElementChild && linkChild.firstElementChild.lastElementChild ? linkChild.firstElementChild.lastElementChild.href : '#';

        const link = document.createElement('a');
        link.href = linkHref;
        const linkDiv = document.createElement('div');

        if(brickDesc.toLowerCase().includes('green')) {
            linkDiv.className = 'linkbrick-green';
        }
        else if(brickDesc.toLowerCase().includes('red')) {
            linkDiv.className = 'linkbrick-red';
        }
        else if(brickDesc.toLowerCase().includes('gray')) {
            linkDiv.className = 'linkbrick-gray';
        }
        else {
            linkDiv.className = 'linkbrick-default';
        }

        const linkSpan = document.createElement('span');
        linkSpan.textContent = label;
        linkDiv.append(linkSpan);
        link.append(linkDiv);
        linkbrick.append(link);

        row.replaceWith(linkbrick);
    });
}