// function checkAuth() {
//     const user = localStorage.getItem('ipsUser');
//     if (!user) {
//         window.location.href = 'login.html';
//     }
// }

// checkAuth();

// const urlParams = new URLSearchParams(window.location.search);
// const reportId = urlParams.get('id');

// console.log('Viewing report:', reportId);

// Get the report ID from query parameters
// const urlParams = new URLSearchParams(window.location.search);
// const reportId = urlParams.get('id');

// // Fetch reports from localStorage
// const reports = JSON.parse(localStorage.getItem('reports')) || [];

// // Find the report by ID
// const report = reports.find(r => r.id === reportId);

// if (!report) {
//     alert('Report not found!');
//     // Optionally redirect back
//     window.location.href = 'reports.html';
// } else {
//     // Populate Incident Information
//     document.getElementById('reportTitle').textContent = `Report ${report.id}`;
//     document.getElementById('reportDate').textContent = `Submitted on ${new Date(report.submittedAt).toLocaleString()}`;
//     document.getElementById('reportID').textContent = report.id;
//     document.getElementById('incidentType').textContent = report.incidentType;
//     document.getElementById('priority').innerHTML = `<span class="badge ${getPriorityClass(report.priority)}">${report.priority}</span>`;
//     document.getElementById('status').innerHTML = `<span class="badge ${getStatusClass(report.status)}">${report.status}</span>`;
//     document.getElementById('datetime').textContent = report.datetime;
//     document.getElementById('reportingOfficer').textContent = report.reportingOfficer || 'N/A';

//     // Populate Location Details
//     document.getElementById('location').textContent = report.location;
//     document.getElementById('coordinates').textContent = report.coordinates || 'N/A';
//     document.getElementById('areaType').textContent = report.areaType || 'N/A';

//     // Populate Suspect Information
//     document.getElementById('suspectName').textContent = report.suspectName || 'Unknown';
//     document.getElementById('suspectDescription').textContent = report.suspectDescription || 'No description';
//     // document.getElementById('associatedSuspects').innerHTML = report.associatedCases
//     //     ? report.associatedCases.map(id => `<a href="suspect-profile.html?id=${id}" style="color: var(--primary-blue);">View Suspect #${id}</a>`).join(', ')
//     //     : 'None';
//     document.getElementById('associatedSuspects').innerHTML = report.associatedCases
//     ? report.associatedCases.split(',').map(id => `<a href="suspect-profile.html?id=${id.trim()}" style="color: var(--primary-blue);">View Suspect #${id.trim()}</a>`).join(', ')
//     : 'None';


//     // Populate Detailed Report
//     document.getElementById('reportDetails').textContent = report.reportDetails;

//     // Populate Evidence & Attachments
//     const evidenceContainer = document.getElementById('evidenceAttachments');
//     if (report.attachments && report.attachments.length) {
//         evidenceContainer.innerHTML = report.attachments.map(file => `<div class="evidence-item">${file}</div>`).join('');
//     } else {
//         evidenceContainer.textContent = 'No attachments';
//     }

//     // Populate Case Notes
//     const notesContainer = document.getElementById('caseNotes');
//     if (report.caseNotes && report.caseNotes.length) {
//         notesContainer.innerHTML = report.caseNotes.map(note => `
//             <div style="padding: 16px; background-color: var(--light-blue); border-radius: 4px; margin-bottom: 12px;">
//                 <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
//                     <strong>${note.officer}</strong>
//                     <span style="font-size: 13px; color: var(--text-medium);">${new Date(note.date).toLocaleString()}</span>
//                 </div>
//                 <p style="margin: 0; color: var(--text-medium);">${note.text}</p>
//             </div>
//         `).join('');
//     } else {
//         notesContainer.textContent = 'No notes available';
//     }
// }

// // Utility functions to style badges
// function getPriorityClass(priority) {
//     switch (priority.toLowerCase()) {
//         case 'high': return 'badge-danger';
//         case 'medium': return 'badge-warning';
//         case 'low': return 'badge-success';
//         default: return 'badge-secondary';
//     }
// }

// function getStatusClass(status) {
//     switch (status.toLowerCase()) {
//         case 'under review': return 'badge-warning';
//         case 'resolved': return 'badge-success';
//         case 'pending': return 'badge-secondary';
//         default: return 'badge-secondary';
//     }
// }

// ============================
// FETCH REPORT BY ID
// ============================
const urlParams = new URLSearchParams(window.location.search);
const reportId = urlParams.get('id');

const reports = JSON.parse(localStorage.getItem('reports')) || [];
const report = reports.find(r => r.id === reportId);

if (!report) {
    alert('Report not found!');
    window.location.href = 'reports.html';
} else {
    // Populate Incident Information
    document.getElementById('reportTitle').textContent = `Report ${report.id}`;
    document.getElementById('reportDate').textContent = `Submitted on ${new Date(report.submittedAt).toLocaleString()}`;
    document.getElementById('reportID').textContent = report.id;
    document.getElementById('incidentType').textContent = report.incidentType;
    document.getElementById('priority').innerHTML = `<span class="badge ${getPriorityClass(report.priority)}">${report.priority}</span>`;
    document.getElementById('status').innerHTML = `<span class="badge ${getStatusClass(report.status)}">${report.status}</span>`;
    document.getElementById('datetime').textContent = report.datetime;
    document.getElementById('reportingOfficer').textContent = report.reportingOfficer || 'N/A';

    // Populate Location Details
    document.getElementById('location').textContent = report.location;
    document.getElementById('coordinates').textContent = report.coordinates || 'N/A';
    document.getElementById('areaType').textContent = report.areaType || 'N/A';

    // Populate Suspect Information
    document.getElementById('suspectName').textContent = report.suspectName || 'Unknown';
    document.getElementById('suspectDescription').textContent = report.suspectDescription || 'No description';
    document.getElementById('associatedSuspects').innerHTML = report.associatedCases
        ? report.associatedCases.split(',').map(id => `<a href="suspect-profile.html?id=${id.trim()}" style="color: var(--primary-blue);">View Suspect #${id.trim()}</a>`).join(', ')
        : 'None';

    // Populate Detailed Report
    document.getElementById('reportDetails').textContent = report.reportDetails;

    // Populate Evidence & Attachments
    const evidenceContainer = document.getElementById('evidenceAttachments');
    if (report.attachments && report.attachments.length) {
        evidenceContainer.innerHTML = report.attachments.map(file => `<div class="evidence-item">${file}</div>`).join('');
    } else {
        evidenceContainer.textContent = 'No attachments';
    }

    // Populate Case Notes
    renderCaseNotes(report.caseNotes);
}

// CASE NOTES RENDER FUNCTION
function renderCaseNotes(notes) {
    const notesContainer = document.getElementById('caseNotes');
    if (!notes || !notes.length) {
        notesContainer.textContent = 'No notes available';
        return;
    }
    notesContainer.innerHTML = notes.map(note => `
        <div style="padding: 16px; background-color: var(--light-blue); border-radius: 4px; margin-bottom: 12px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                <strong>${note.officer}</strong>
                <span style="font-size: 13px; color: var(--text-medium);">${new Date(note.date).toLocaleString()}</span>
            </div>
            <p style="margin: 0; color: var(--text-medium);">${note.text}</p>
        </div>
    `).join('');
}

// UPDATE STATUS BUTTON
document.querySelector('.btn-primary').addEventListener('click', function() {
    const newStatus = prompt('Enter new status (Under Review / Resolved / Pending):', report.status);
    if (!newStatus) return;

    report.status = newStatus;

    // Save back to localStorage
    const allReports = JSON.parse(localStorage.getItem('reports')) || [];
    const reportIndex = allReports.findIndex(r => r.id === report.id);
    allReports[reportIndex] = report;
    localStorage.setItem('reports', JSON.stringify(allReports));

    // Update badge
    document.getElementById('status').innerHTML = `<span class="badge ${getStatusClass(report.status)}">${report.status}</span>`;
});

// ADD NOTE BUTTON
document.querySelector('.btn-secondary:nth-child(2)').addEventListener('click', function() {
    const noteText = prompt('Enter your note:');
    if (!noteText) return;

    const officer = 'Officer John Smith'; // Update dynamically if needed
    const note = { officer, text: noteText, date: new Date().toISOString() };

    report.caseNotes = report.caseNotes || [];
    report.caseNotes.push(note);

    // Save back to localStorage
    const allReports = JSON.parse(localStorage.getItem('reports')) || [];
    const reportIndex = allReports.findIndex(r => r.id === report.id);
    allReports[reportIndex] = report;
    localStorage.setItem('reports', JSON.stringify(allReports));

    renderCaseNotes(report.caseNotes);
});

// ============================
// EXPORT REPORT BUTTON
// ============================
// document.querySelector('.btn-secondary:nth-child(3)').addEventListener('click', function() {
//     const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(report, null, 2));
//     const dlAnchor = document.createElement('a');
//     dlAnchor.setAttribute("href", dataStr);
//     dlAnchor.setAttribute("download", report.id + ".json");
//     dlAnchor.click();
// });

document.querySelector('.btn-secondary:nth-child(3)').addEventListener('click', function() {
    // Build HTML content for Word
    const content = `
<html>
<head>
<meta charset="UTF-8">
<title>${report.id}</title>
</head>
<body>
<h2>Report ID: ${report.id}</h2>
<p><strong>Submitted on:</strong> ${new Date(report.submittedAt).toLocaleString()}</p>

<h3>Incident Information</h3>
<p><strong>Incident Type:</strong> ${report.incidentType}</p>
<p><strong>Priority:</strong> ${report.priority}</p>
<p><strong>Status:</strong> ${report.status}</p>
<p><strong>Date & Time:</strong> ${report.datetime}</p>
<p><strong>Reporting Officer:</strong> ${report.reportingOfficer || 'N/A'}</p>

<h3>Location Details</h3>
<p><strong>Location:</strong> ${report.location}</p>
<p><strong>Coordinates:</strong> ${report.coordinates || 'N/A'}</p>
<p><strong>Area Type:</strong> ${report.areaType || 'N/A'}</p>

<h3>Suspect Information</h3>
<p><strong>Name:</strong> ${report.suspectName || 'Unknown'}</p>
<p><strong>Description:</strong> ${report.suspectDescription || 'No description'}</p>
<p><strong>Associated Cases:</strong> ${report.associatedCases || 'None'}</p>

<h3>Detailed Report</h3>
<p>${report.reportDetails || 'No details provided'}</p>

<h3>Attachments</h3>
<p>${report.attachments && report.attachments.length ? report.attachments.join(', ') : 'No attachments'}</p>

<h3>Case Notes & Updates</h3>
<p>${report.caseNotes && report.caseNotes.length 
    ? report.caseNotes.map(n => `[${new Date(n.date).toLocaleString()}] ${n.officer}: ${n.text}`).join('<br>') 
    : 'No notes available'}</p>
</body>
</html>
`;

    // Create a Blob and download
    const blob = new Blob([content], { type: "application/msword" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = report.id + ".doc";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
});


// ============================
// UTILITY FUNCTIONS FOR BADGES
// ============================
function getPriorityClass(priority) {
    switch (priority.toLowerCase()) {
        case 'high': return 'badge-danger';
        case 'medium': return 'badge-warning';
        case 'low': return 'badge-success';
        case 'critical': return 'badge-critical';
        default: return 'badge-secondary';
    }
}

function getStatusClass(status) {
    switch (status.toLowerCase()) {
        case 'under review': return 'badge-warning';
        case 'resolved': return 'badge-success';
        case 'pending': return 'badge-secondary';
        default: return 'badge-secondary';
    }
}
