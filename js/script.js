const onPageLoaded = function() {

    const divServicesItems = document.querySelectorAll('.servicesItems');

    for (let i = 0; i < 3; i++){
        const servicesItem = divServicesItems[i];
        servicesItem.onclick = function() {
            const cloneEl = cloneElement(this);
            blockBackground(cloneEl);
        }
    }

    const blockBackground = function (el) {
        document.getElementById('modalOverlay').classList.add('show');
        el.classList.remove('servicesItemsHover');
    };

    const cloneElement = function (el) {
        const divModalItem = document.getElementById('modalItem');
        const cloneItem = el.cloneNode(true);
        divModalItem.innerHTML = cloneItem.innerHTML;
        return cloneItem;
    };

    const deleteModalWindow = function () {
        document.getElementById('modalOverlay').classList.remove("show");
    };

    document.getElementsByClassName('giveFeedback')[0].onclick = function () {
        event.preventDefault();
    };

    document.getElementsByClassName('confirm')[0].onclick = function () {
        event.preventDefault();
    };

    document.getElementById('modalWindow').onclick = function () {
        event.stopPropagation();
    };

    document.getElementById('modalOverlay').onclick = function (event) {
        deleteModalWindow(event);
    };

    document.getElementsByClassName('closeModal')[0].onclick = function (event) {
        deleteModalWindow(event);
    };

};

document.addEventListener('DOMContentLoaded', onPageLoaded);
