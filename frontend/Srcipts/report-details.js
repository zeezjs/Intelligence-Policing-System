// function checkAuth() {
//     const user = localStorage.getItem('ipsUser');
//     if (!user) {
//         window.location.href = 'login.html';
//     }
// }

// checkAuth();

const urlParams = new URLSearchParams(window.location.search);
const reportId = urlParams.get('id');

console.log('Viewing report:', reportId);
