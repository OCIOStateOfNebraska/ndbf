/*
 * Link Bricks Block
 */

export default function decorate(block) {
    [...block.children].forEach((row) => {
        // decorate link brick item label
        const linkbrick = document.createElement('div');
        linkbrick.className = 'linkbrick-item';
        const linkChild = row.lastElementChild;
        
        const label = linkChild.firstElementChild ? linkChild.firstElementChild.innerText : '';
        const linkHref = linkChild.firstElementChild && linkChild.firstElementChild.lastElementChild ? linkChild.firstElementChild.lastElementChild.href : '#';
        const link = document.createElement('a');
        link.href = linkHref;
        const linkDiv = document.createElement('div');
        linkDiv.className = 'linkbrick-item-red';
        const linkSpan = document.createElement('span');
        linkSpan.textContent = label;
        linkDiv.append(linkSpan);
        link.append(linkDiv);
        linkbrick.append(link);

        row.replaceWith(linkbrick);
    });
}