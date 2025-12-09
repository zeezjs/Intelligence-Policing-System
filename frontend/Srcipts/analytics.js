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

// function checkAuth() {
//     const user = localStorage.getItem('ipsUser');
//     if (!user) {
//         window.location.href = 'login.html';
//     }
// }

// checkAuth();
