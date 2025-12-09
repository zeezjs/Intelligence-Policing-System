document.getElementById('fileInput').addEventListener('change', function (e) {
    const fileList = document.getElementById('fileList');
    const files = e.target.files;

    if (files.length > 0) {
        let fileNames = [];
        for (let i = 0; i < files.length; i++) {
            fileNames.push(files[i].name);
        }
        fileList.innerHTML = `<strong>Selected files:</strong> ${fileNames.join(', ')}`;
    } else {
        fileList.innerHTML = '';
    }
});

document.getElementById('reportForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const reportData = {
        incidentType: document.getElementById('incidentType').value,
        priority: document.getElementById('priority').value,
        location: document.getElementById('location').value,
        datetime: document.getElementById('datetime').value,
        suspectName: document.getElementById('suspectName').value,
        suspectDescription: document.getElementById('suspectDescription').value,
        reportDetails: document.getElementById('reportDetails').value,
        associatedCases: document.getElementById('associatedCases').value,
        submittedAt: new Date().toISOString()
    };

    console.log('Report submitted:', reportData);

    alert('Report submitted successfully!');
    window.location.href = 'reports.html';
});

// function checkAuth() {
//     const user = localStorage.getItem('ipsUser');
//     if (!user) {
//         window.location.href = 'login.html';
//     }
// }

// checkAuth();
