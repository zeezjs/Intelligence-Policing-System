// function checkAuth() {
//     const user = localStorage.getItem('ipsUser');
//     if (!user) {
//         window.location.href = 'login.html';
//     }
// }

// checkAuth();

const urlParams = new URLSearchParams(window.location.search);
const suspectId = urlParams.get('id');

console.log('Viewing suspect profile:', suspectId);
