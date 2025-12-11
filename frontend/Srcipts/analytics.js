const trendCtx = document.getElementById('trendChart');
const trendChart = new Chart(trendCtx, {
    type: 'line',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'],
        datasets: [{
            label: 'Reports per Month',
            data: [65, 78, 90, 81, 96, 103, 89, 112, 108, 125, 134],
            borderColor: '#1A4E8A',
            backgroundColor: 'rgba(26, 78, 138, 0.1)',
            tension: 0.3,
            fill: true
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
            legend: {
                display: false
            }
        },
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

const typeCtx = document.getElementById('typeChart');
const typeChart = new Chart(typeCtx, {
    type: 'doughnut',
    data: {
        labels: ['Suspicious Activity', 'Intelligence Tip', 'Surveillance', 'Crime Pattern', 'Public Tip'],
        datasets: [{
            data: [342, 189, 156, 98, 76],
            backgroundColor: ['#1A4E8A', '#28A745', '#FFC107', '#DC3545', '#17A2B8']
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
            legend: {
                position: 'bottom'
            }
        }
    }
});

const statusCtx = document.getElementById('statusChart');
const statusChart = new Chart(statusCtx, {
    type: 'pie',
    data: {
        labels: ['Pending', 'Under Review', 'Verified', 'In Progress', 'Closed'],
        datasets: [{
            data: [45, 89, 156, 98, 203],
            backgroundColor: ['#7F8C9A', '#FFC107', '#28A745', '#17A2B8', '#5A6C7D']
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
            legend: {
                position: 'bottom'
            }
        }
    }
});

const locationCtx = document.getElementById('locationChart');
const locationChart = new Chart(locationCtx, {
    type: 'bar',
    data: {
        labels: ['Downtown', 'Industrial Zone', 'Port Area', 'North Side', 'City Center', 'West End', 'Harbor'],
        datasets: [{
            label: 'Incidents by Location',
            data: [127, 89, 76, 54, 43, 38, 29],
            backgroundColor: '#1A4E8A'
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: true,
        indexAxis: 'y',
        plugins: {
            legend: {
                display: false
            }
        },
        scales: {
            x: {
                beginAtZero: true
            }
        }
    }
});

const heatMapGrid = document.getElementById('heatMapGrid');
const heatMapData = [
    [2, 1, 3, 4, 5, 8, 6],
    [1, 2, 2, 3, 6, 9, 7],
    [3, 4, 5, 6, 8, 10, 8],
    [5, 6, 7, 8, 9, 11, 9]
];

const timeLabels = ['Morning (6-12)', 'Afternoon (12-18)', 'Evening (18-24)', 'Night (0-6)'];

heatMapData.forEach((row, rowIndex) => {
    const timeLabel = document.createElement('div');
    timeLabel.style.gridColumn = '1 / -1';
    timeLabel.style.fontSize = '12px';
    timeLabel.style.fontWeight = '600';
    timeLabel.style.padding = '8px';
    timeLabel.style.textAlign = 'left';
    timeLabel.textContent = timeLabels[rowIndex];
    heatMapGrid.appendChild(timeLabel);

    row.forEach(value => {
        const cell = document.createElement('div');
        const intensity = value / 11;
        cell.style.backgroundColor = `rgba(26, 78, 138, ${intensity})`;
        cell.style.padding = '20px';
        cell.style.borderRadius = '4px';
        cell.style.textAlign = 'center';
        cell.style.color = intensity > 0.5 ? '#fff' : '#2C3E50';
        cell.style.fontWeight = '600';
        cell.textContent = value;
        heatMapGrid.appendChild(cell);
    });
});

function applyFilters() {
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    const reportType = document.getElementById('reportType').value;

    console.log('Applying filters:', { startDate, endDate, reportType });
}

// // function checkAuth() {
// //     const user = localStorage.getItem('ipsUser');
// //     if (!user) {
// //         window.location.href = 'login.html';
// //     }
// // }

// // checkAuth();

// // ======== SAMPLE DATA ========
// const reports = [
//     { location: "Downtown District", type: "Suspicious Activity", date: "2025-11-01" },
//     { location: "Industrial Zone", type: "Surveillance", date: "2025-11-03" },
//     { location: "Port Area", type: "Intelligence Tip", date: "2025-11-05" },
//     { location: "North Side", type: "Crime Pattern", date: "2025-11-06" },
//     { location: "City Center", type: "Public Tip", date: "2025-11-07" },
//     { location: "Downtown District", type: "Suspicious Activity", date: "2025-11-08" },
//     { location: "Port Area", type: "Crime Pattern", date: "2025-11-09" },
//     { location: "Downtown District", type: "Intelligence Tip", date: "2025-11-10" },
//     { location: "Industrial Zone", type: "Surveillance", date: "2025-11-11" },
//     { location: "City Center", type: "Public Tip", date: "2025-11-12" },
// ];

// // ======== RISK & STATS CALCULATION ========
// function getLocationStats(data) {
//     const stats = {};

//     data.forEach(report => {
//         const loc = report.location;
//         if (!stats[loc]) stats[loc] = { count: 0, types: {} };
//         stats[loc].count++;
//         stats[loc].types[report.type] = (stats[loc].types[report.type] || 0) + 1;
//     });

//     for (let loc in stats) {
//         const c = stats[loc].count;
//         if (c >= 100) stats[loc].risk = "High";
//         else if (c >= 50) stats[loc].risk = "Medium";
//         else stats[loc].risk = "Low";

//         stats[loc].mostCommonType = Object.keys(stats[loc].types).reduce((a,b) =>
//             stats[loc].types[a] > stats[loc].types[b] ? a : b
//         );
//     }

//     return stats;
// }

// // ======== POPULATE TABLE ========
// function populateTable(stats) {
//     const tableBody = document.querySelector('table tbody');
//     tableBody.innerHTML = '';

//     for (let loc in stats) {
//         const stat = stats[loc];

//         const row = document.createElement('tr');
//         row.innerHTML = `
//             <td>${loc}</td>
//             <td>${stat.count}</td>
//             <td>${stat.mostCommonType}</td>
//             <td><span class="badge badge-${stat.risk === 'High' ? 'danger' : stat.risk === 'Medium' ? 'warning' : 'success'}">${stat.risk}</span></td>
//             <td style="color: ${stat.risk === 'High' ? 'var(--danger)' : stat.risk === 'Medium' ? 'var(--text-medium)' : 'var(--success)'}">↑ ${Math.floor(Math.random()*20)}%</td>
//         `;
//         tableBody.appendChild(row);
//     }
// }

// // ======== UPDATE CHARTS ========
// function updateCharts(stats, data) {
//     // Location Chart
//     const locations = Object.keys(stats);
//     const counts = locations.map(loc => stats[loc].count);
//     locationChart.data.labels = locations;
//     locationChart.data.datasets[0].data = counts;
//     locationChart.update();

//     // Type Chart
//     const typeCounts = {};
//     data.forEach(r => {
//         typeCounts[r.type] = (typeCounts[r.type] || 0) + 1;
//     });
//     typeChart.data.labels = Object.keys(typeCounts);
//     typeChart.data.datasets[0].data = Object.values(typeCounts);
//     typeChart.update();

//     // Status Chart (random example)
//     const statusTypes = ["Pending", "Under Review", "Verified", "In Progress", "Closed"];
//     const statusData = statusTypes.map(() => Math.floor(Math.random()*50 + 10));
//     statusChart.data.datasets[0].data = statusData;
//     statusChart.update();

//     // Trend Chart
//     const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
//     const trendCounts = months.map((m, idx) => {
//         return Math.floor(Math.random() * 100 + 50);
//     });
//     trendChart.data.datasets[0].data = trendCounts;
//     trendChart.update();
// }

// // ======== PREDICTION ========
// function predictNextMonth(data) {
//     const monthlyCounts = {};
//     data.forEach(r => {
//         const month = new Date(r.date).getMonth();
//         monthlyCounts[month] = (monthlyCounts[month] || 0) + 1;
//     });
//     const months = Object.values(monthlyCounts);
//     const last = months[months.length-1] || 0;
//     const prev = months[months.length-2] || last;
//     const predicted = last + (last - prev);
//     console.log("Predicted next month incidents:", predicted > 0 ? predicted : last);
// }

// // ======== FILTERS ========
// function applyFilters() {
//     const startDate = document.getElementById('startDate').value;
//     const endDate = document.getElementById('endDate').value;
//     const reportType = document.getElementById('reportType').value;

//     const filtered = reports.filter(r => {
//         const dateOK = (!startDate || new Date(r.date) >= new Date(startDate)) &&
//                        (!endDate || new Date(r.date) <= new Date(endDate));
//         const typeOK = !reportType || r.type === reportType;
//         return dateOK && typeOK;
//     });

//     const stats = getLocationStats(filtered);
//     populateTable(stats);
//     updateCharts(stats, filtered);
//     predictNextMonth(filtered);
// }

// // ======== HEATMAP ========
// const heatMapGrid = document.getElementById('heatMapGrid');
// const heatMapData = [
//     [2, 1, 3, 4, 5, 8, 6],
//     [1, 2, 2, 3, 6, 9, 7],
//     [3, 4, 5, 6, 8, 10, 8],
//     [5, 6, 7, 8, 9, 11, 9]
// ];

// const timeLabels = ['Morning (6-12)', 'Afternoon (12-18)', 'Evening (18-24)', 'Night (0-6)'];

// function renderHeatMap() {
//     heatMapGrid.innerHTML = '';
//     heatMapData.forEach((row, rowIndex) => {
//         const timeLabel = document.createElement('div');
//         timeLabel.style.gridColumn = '1 / -1';
//         timeLabel.style.fontSize = '12px';
//         timeLabel.style.fontWeight = '600';
//         timeLabel.style.padding = '8px';
//         timeLabel.style.textAlign = 'left';
//         timeLabel.textContent = timeLabels[rowIndex];
//         heatMapGrid.appendChild(timeLabel);

//         row.forEach(value => {
//             const cell = document.createElement('div');
//             const intensity = value / 11;
//             cell.style.backgroundColor = `rgba(26, 78, 138, ${intensity})`;
//             cell.style.padding = '20px';
//             cell.style.borderRadius = '4px';
//             cell.style.textAlign = 'center';
//             cell.style.color = intensity > 0.5 ? '#fff' : '#2C3E50';
//             cell.style.fontWeight = '600';
//             cell.textContent = value;
//             heatMapGrid.appendChild(cell);
//         });
//     });
// }

// // ======== INIT ========
// function initAnalytics() {
//     const stats = getLocationStats(reports);
//     populateTable(stats);
//     updateCharts(stats, reports);
//     predictNextMonth(reports);
//     renderHeatMap();
// }

// window.onload = initAnalytics;
