// SAMPLE DUMMY CRIME DATA FOR WEIGHTED PREDICTION
const crimeWeights = {
    theft: 0.7,
    assault: 0.5,
    fraud: 0.3,
    vandalism: 0.4
};

const timeWeights = {
    morning: 0.2,
    afternoon: 0.4,
    evening: 0.6,
    night: 0.9
};

document.getElementById("predictionForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const location = document.getElementById("location").value.trim();
    const time = document.getElementById("time").value;
    const crimeType = document.getElementById("crimeType").value;

    // SIMPLE FRONTEND VALIDATION
    if (!location || !time || !crimeType) {
        alert("Please fill in all fields before predicting.");
        return;
    }

    // FAKE ML: combine weights 
    const score = (crimeWeights[crimeType] + timeWeights[time]) / 2;

    let riskLevel = "";
    if (score >= 0.75) riskLevel = "🚨 Very High Risk";
    else if (score >= 0.5) riskLevel = "⚠️ Moderate Risk";
    else riskLevel = "🟢 Low Risk";

    const resultText = `
        <strong>Location:</strong> ${location}<br>
        <strong>Crime Type:</strong> ${crimeType}<br>
        <strong>Risk Level:</strong> ${riskLevel}<br><br>
        Based on historical patterns, time of day, and similar past incidents.
    `;

    document.getElementById("predictionOutput").innerHTML = resultText;
    document.getElementById("predictionResult").style.display = "block";
});
