const listItems = document.querySelectorAll('.list-item');
const highlight = document.querySelector('.highlight');
let activeItem = null;

function updateHighlight(item, isActive = false) {
    const rect = item.getBoundingClientRect();
    const containerRect = item.parentElement.getBoundingClientRect();

    highlight.style.width = `${rect.width}px`;
    highlight.style.left = `${rect.left - containerRect.left}px`;
    highlight.style.opacity = isActive ? '0' : '1';
}

function handleItemClick(e) {
    const clickedItem = e.target;
    
    if (activeItem === clickedItem) {
        // If clicking the active item, deactivate it
        activeItem.classList.remove('active');
        activeItem = null;
        highlight.style.opacity = '0';
    } else {
        // Deactivate the previous active item if exists
        if (activeItem) {
            activeItem.classList.remove('active');
        }
        
        // Activate the clicked item
        clickedItem.classList.add('active');
        activeItem = clickedItem;
        updateHighlight(clickedItem, true);
    }
}

function handleItemHover(e) {
    if (e.target !== activeItem) {
        updateHighlight(e.target, false);
    }
}

function handleItemLeave() {
    if (activeItem) {
        updateHighlight(activeItem, true);
    } else {
        highlight.style.opacity = '0';
    }
}

listItems.forEach(item => {
    item.addEventListener('click', handleItemClick);
    item.addEventListener('mouseenter', handleItemHover);
});

document.querySelector('.list-container').addEventListener('mouseleave', handleItemLeave);
