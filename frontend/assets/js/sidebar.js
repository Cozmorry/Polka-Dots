// Example: Toggle the sidebar (if you plan to have a collapsible sidebar)
const toggleSidebar = () => {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('collapsed');
};

// Example: Adding event listener for a sidebar toggle button
document.querySelector('#toggle-sidebar-btn').addEventListener('click', toggleSidebar);
