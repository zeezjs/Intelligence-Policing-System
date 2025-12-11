// function checkAuth() {
//     const user = localStorage.getItem('ipsUser');
//     if (!user) {
//         window.location.href = 'login.html';
//     }
// }

// checkAuth();

// Load reports from localStorage
const reports = JSON.parse(localStorage.getItem('reports')) || [];

// Build suspects map
const suspectsMap = {};
reports.forEach(report => {
    if (report.suspectName) {
        const key = report.suspectName.trim().toLowerCase();
        if (!suspectsMap[key]) {
            suspectsMap[key] = {
                name: report.suspectName,
                description: report.suspectDescription || 'No description',
                riskLevel: report.priority || 'Low',
                status: report.status || 'Under Review',
                lastActivity: report.datetime || report.submittedAt,
                reportIds: [report.id]
            };
        } else {
            suspectsMap[key].reportIds.push(report.id);
        }
    }
});

// Populate table
const tbody = document.querySelector('table tbody');
tbody.innerHTML = ''; // Clear dummy rows

Object.values(suspectsMap).forEach((suspect, index) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
        <td>#${index + 1}</td>
        <td>${suspect.description}</td>
        <td><span class="badge ${getRiskClass(suspect.riskLevel)}">${suspect.riskLevel}</span></td>
        <td><span class="badge ${getStatusClass(suspect.status)}">${suspect.status}</span></td>
        <td>${suspect.reportIds.length}</td>
        <td>${new Date(suspect.lastActivity).toLocaleDateString()}</td>
        <td><a href="suspect-profile.html?id=${index}" class="btn btn-primary btn-sm">View</a></td>
    `;
    tbody.appendChild(tr);
});

// Save suspects map for profile page
localStorage.setItem('suspectsMap', JSON.stringify(Object.values(suspectsMap)));

// Utility functions
function getRiskClass(level) {
    switch (level.toLowerCase()) {
        case 'high': return 'badge-danger';
        case 'medium': return 'badge-warning';
        case 'low': return 'badge-success';
        case 'critical': return 'badge-danger';
        default: return 'badge-secondary';
    }
}

function getStatusClass(status) {
    switch (status.toLowerCase()) {
        case 'under review': return 'badge-warning';
        case 'active': return 'badge-primary';
        case 'investigation': return 'badge-warning';
        case 'monitoring': return 'badge-info';
        case 'closed': return 'badge-success';
        default: return 'badge-secondary';
    }
}
