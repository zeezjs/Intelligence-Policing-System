// function checkAuth() {
//     const user = localStorage.getItem('ipsUser');
//     if (!user) {
//         window.location.href = 'login.html';
//     }
// }

// checkAuth();

// const urlParams = new URLSearchParams(window.location.search);
// const suspectId = urlParams.get('id');

// console.log('Viewing suspect profile:', suspectId);


// Get suspect ID from URL

// Get suspect ID from URL
const urlParams = new URLSearchParams(window.location.search);
const suspectId = urlParams.get('id');

const suspects = JSON.parse(localStorage.getItem('suspectsMap')) || {};
const suspect = suspects[suspectId];

if (!suspect) {
    alert('Suspect not found!');
    window.location.href = 'suspects.html';
} else {
    populateProfile();

    // EXPORT PROFILE
    document.querySelector('.btn-secondary:nth-of-type(2)').addEventListener('click', () => {
        // Export as JSON
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(suspect, null, 2));
        const dlAnchor = document.createElement('a');
        dlAnchor.setAttribute("href", dataStr);
        dlAnchor.setAttribute("download", `suspect_${suspectId}.json`);
        dlAnchor.click();
    });

    // ADD NOTE
    document.querySelector('.btn-secondary:nth-of-type(1)').addEventListener('click', () => {
        const officer = prompt("Enter your name:");
        if (!officer) return alert("Officer name is required");

        const text = prompt("Enter note text:");
        if (!text) return alert("Note text cannot be empty");

        const note = { officer, text, datetime: new Date().toISOString() };
        suspect.notes = suspect.notes || [];
        suspect.notes.push(note);

        // Save updated suspect
        localStorage.setItem('suspectsMap', JSON.stringify(suspects));

        // Refresh notes section
        const notesContainer = document.querySelector('[data-field="notes"]');
        const noteDiv = document.createElement('div');
        noteDiv.style.cssText = "padding:16px;background-color:var(--light-blue);border-radius:4px;margin-bottom:12px;";
        noteDiv.innerHTML = `
            <div style="display:flex;justify-content:space-between;margin-bottom:8px;">
                <strong>${note.officer}</strong>
                <span style="font-size:13px;color:var(--text-medium);">${new Date(note.datetime).toLocaleString()}</span>
            </div>
            <p style="margin:0;color:var(--text-medium);">${note.text}</p>
        `;
        notesContainer.prepend(noteDiv);
    });

    // UPDATE PROFILE
    document.querySelector('.btn-primary').addEventListener('click', () => {
        const field = prompt("Which field do you want to update? (status, riskLevel, description)");
        if (!field || !['status', 'riskLevel', 'description'].includes(field)) return alert("Invalid field");

        const value = prompt(`Enter new value for ${field}:`);
        if (!value) return alert("Value cannot be empty");

        suspect[field] = value;
        localStorage.setItem('suspectsMap', JSON.stringify(suspects));

        // Refresh page values
        populateProfile();
        alert(`${field} updated successfully!`);
    });
}

// Function to populate profile
function populateProfile() {
    // Populate header
    document.querySelector('[data-field="page-title"]').textContent = `Suspect #${suspectId}`;
    document.querySelector('[data-field="page-subtitle"]').textContent = `Last updated: ${new Date(suspect.lastActivity).toLocaleDateString()}`;

    // Populate basic info
    document.querySelector('[data-field="id"]').textContent = `#${suspectId}`;
    document.querySelector('[data-field="status"] span').textContent = suspect.status;
    document.querySelector('[data-field="riskLevel"] span').textContent = suspect.riskLevel;
    document.querySelector('[data-field="firstRecorded"]').textContent = new Date(suspect.firstRecorded).toLocaleDateString();
    document.querySelector('[data-field="lastActivity"]').textContent = new Date(suspect.lastActivity).toLocaleDateString();

    // Physical description
    document.querySelector('[data-field="gender"]').textContent = suspect.gender;
    document.querySelector('[data-field="ageRange"]').textContent = suspect.ageRange;
    document.querySelector('[data-field="height"]').textContent = suspect.height;
    document.querySelector('[data-field="build"]').textContent = suspect.build;
    document.querySelector('[data-field="hair"]').textContent = suspect.hair;
    document.querySelector('[data-field="marks"]').textContent = suspect.marks;

    // Detailed description
    document.querySelector('[data-field="description"]').textContent = suspect.description;

    // Known associates
    const associatesTbody = document.querySelector('[data-field="associates"]');
    associatesTbody.innerHTML = '';
    (suspect.associates || []).forEach(a => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>#${a.id}</td>
            <td>${a.name}</td>
            <td>${a.relationship}</td>
            <td>${new Date(a.lastContact).toLocaleDateString()}</td>
            <td><a href="suspect-profile.html?id=${a.id}" class="btn btn-primary btn-sm">View</a></td>
        `;
        associatesTbody.appendChild(tr);
    });

    // Related reports
    const reports = JSON.parse(localStorage.getItem('reports')) || [];
    const reportsTbody = document.querySelector('[data-field="reports"]');
    reportsTbody.innerHTML = '';
    reports.filter(r => suspect.reportIds.includes(r.id)).forEach(r => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${r.id}</td>
            <td>${r.incidentType}</td>
            <td>${r.location}</td>
            <td>${new Date(r.datetime).toLocaleDateString()}</td>
            <td><span class="badge ${r.status.toLowerCase() === 'under review' ? 'badge-warning' : 'badge-success'}">${r.status}</span></td>
            <td><a href="report-details.html?id=${r.id}" class="btn btn-primary btn-sm">View</a></td>
        `;
        reportsTbody.appendChild(tr);
    });

    // Investigation notes
    const notesContainer = document.querySelector('[data-field="notes"]');
    notesContainer.innerHTML = '';
    (suspect.notes || []).forEach(n => {
        const noteDiv = document.createElement('div');
        noteDiv.style.cssText = "padding:16px;background-color:var(--light-blue);border-radius:4px;margin-bottom:12px;";
        noteDiv.innerHTML = `
            <div style="display:flex;justify-content:space-between;margin-bottom:8px;">
                <strong>${n.officer}</strong>
                <span style="font-size:13px;color:var(--text-medium);">${new Date(n.datetime).toLocaleString()}</span>
            </div>
            <p style="margin:0;color:var(--text-medium);">${n.text}</p>
        `;
        notesContainer.appendChild(noteDiv);
    });
}
