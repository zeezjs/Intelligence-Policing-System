function searchReports() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const rows = document.querySelectorAll('#reportsTable tr');

    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        if (text.includes(searchTerm)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

function clearFilters() {
    document.getElementById('searchInput').value = '';
    document.getElementById('filterType').value = '';
    document.getElementById('filterStatus').value = '';
    document.getElementById('filterDate').value = '';

    const rows = document.querySelectorAll('#reportsTable tr');
    rows.forEach(row => {
        row.style.display = '';
    });
}

document.getElementById('searchInput').addEventListener('keyup', function (e) {
    if (e.key === 'Enter') {
        searchReports();
    }
});

document.getElementById('filterType').addEventListener('change', searchReports);
document.getElementById('filterStatus').addEventListener('change', searchReports);
document.getElementById('filterDate').addEventListener('change', searchReports);

// function checkAuth() {
//     const user = localStorage.getItem('ipsUser');
//     if (!user) {
//         window.location.href = 'login.html';
//     }
// }

// checkAuth();
