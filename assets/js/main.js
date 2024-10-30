function calculateOperationalEmissions() {
    const energy = parseFloat(document.getElementById('energy').value) || 0;
    const carbonIntensity = parseFloat(document.getElementById('carbonIntensity').value) || 0;
    const operationalEmissions = energy * carbonIntensity;
    document.getElementById('operationalEmissions').innerText = operationalEmissions.toFixed(2);
    calculateSCI();
}

function calculateEmbodiedEmissions() {
    const totalEmbodied = parseFloat(document.getElementById('totalEmbodied').value) || 0;
    const timeReserved = parseFloat(document.getElementById('timeReserved').value) || 0;
    const hwLifespan = parseFloat(document.getElementById('hwLifespan').value) || 1;
    const resourcesReserved = parseFloat(document.getElementById('resourcesReserved').value) || 0;
    const timeshare = timeReserved / hwLifespan;
    const resourceShare = resourcesReserved / totalEmbodied;
    const embodiedEmissions = totalEmbodied * timeshare * resourceShare;
    document.getElementById('embodiedEmissions').innerText = embodiedEmissions.toFixed(2);
    calculateSCI();
}

function calculateSCI() {
    const operationalEmissions = parseFloat(document.getElementById('operationalEmissions').value) || 0;
    const embodiedEmissions = parseFloat(document.getElementById('embodiedEmissions').value) || 0;
    const sci = operationalEmissions + embodiedEmissions;
    document.getElementById('sciOutput').innerText = sci.toFixed(2);
}

// Attach event listeners
document.getElementById('energy').addEventListener('change', calculateOperationalEmissions);
document.getElementById('carbonIntensity').addEventListener('change', calculateOperationalEmissions);
document.getElementById('totalEmbodied').addEventListener('change', calculateEmbodiedEmissions);
document.getElementById('timeReserved').addEventListener('change', calculateEmbodiedEmissions);
document.getElementById('hwLifespan').addEventListener('change', calculateEmbodiedEmissions);
document.getElementById('resourcesReserved').addEventListener('change', calculateEmbodiedEmissions);