const ctx = document.getElementById('reportChart');

const reportChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Suspicious Activity', 'Intelligence Tip', 'Surveillance', 'Crime Pattern', 'Public Tip', 'Other'],
        datasets: [{
            label: 'Number of Reports',
            data: [342, 189, 156, 98, 76, 45],
            backgroundColor: '#1A4E8A',
            borderColor: '#154073',
            borderWidth: 1
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
                beginAtZero: true,
                ticks: {
                    stepSize: 50
                }
            }
        }
    }
});

// function checkAuth() {
//     const user = localStorage.getItem('ipsUser');
//     if (!user) {
//         window.location.href = 'login.html';
//     }
// }

checkAuth();
