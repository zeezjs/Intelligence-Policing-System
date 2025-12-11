// function searchReports() {
//     const searchTerm = document.getElementById('searchInput').value.toLowerCase();
//     const rows = document.querySelectorAll('#reportsTable tr');

//     rows.forEach(row => {
//         const text = row.textContent.toLowerCase();
//         if (text.includes(searchTerm)) {
//             row.style.display = '';
//         } else {
//             row.style.display = 'none';
//         }
//     });
// }

// function clearFilters() {
//     document.getElementById('searchInput').value = '';
//     document.getElementById('filterType').value = '';
//     document.getElementById('filterStatus').value = '';
//     document.getElementById('filterDate').value = '';

//     const rows = document.querySelectorAll('#reportsTable tr');
//     rows.forEach(row => {
//         row.style.display = '';
//     });
// }

// document.getElementById('searchInput').addEventListener('keyup', function (e) {
//     if (e.key === 'Enter') {
//         searchReports();
//     }
// });

// document.getElementById('filterType').addEventListener('change', searchReports);
// document.getElementById('filterStatus').addEventListener('change', searchReports);
// document.getElementById('filterDate').addEventListener('change', searchReports);

// function checkAuth() {
//     const user = localStorage.getItem('ipsUser');
//     if (!user) {
//         window.location.href = 'login.html';
//     }
// }

// checkAuth();


// ============================
// LOAD ALL REPORTS
// ============================
function loadReports() {
    const table = document.getElementById("reportsTable");
    table.innerHTML = "";

    const reports = JSON.parse(localStorage.getItem("reports")) || [];

    if (reports.length === 0) {
        table.innerHTML = `<tr><td colspan="5" style="text-align:center;">No reports submitted yet.</td></tr>`;
        return;
    }

    reports.forEach(report => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${report.id}</td>
            <td>${report.incidentType}</td>
            <td>${report.location}</td>
            <td>${report.datetime}</td>
            <td>${report.status}</td>
            <td><a href="report-details.html?id=${report.id}" class="btn btn-primary btn-sm">View</a></td>
        `;

        table.appendChild(row);
    });
}

document.addEventListener("DOMContentLoaded", loadReports);


// ============================
// SEARCH + FILTER (works same)
// ============================
function searchReports() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const rows = document.querySelectorAll('#reportsTable tr');

    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(searchTerm) ? '' : 'none';
    });
}

function clearFilters() {
    document.getElementById('searchInput').value = '';
    searchReports();
}

document.getElementById('searchInput').addEventListener('keyup', function (e) {
    if (e.key === 'Enter') searchReports();
});
