// Example of dynamically triggering the modal
const openModal = () => {
    const modal = new bootstrap.Modal(document.getElementById('exampleModal'));
    modal.show();
};

// Call openModal() where necessary, such as when a user clicks a button or an action occurs
document.querySelector('#open-modal-btn').addEventListener('click', openModal);
