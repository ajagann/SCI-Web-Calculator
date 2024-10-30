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
    const timeshare = timeReserved / hwLifespan;

    const resourcesReserved = parseFloat(document.getElementById('resourcesReserved').value) || 0;
    const totalResources = parseFloat(document.getElementById('resourcesAvailable').value) || 1;
    const resourceShare = resourcesReserved / totalResources;

    const embodiedEmissions = totalEmbodied * timeshare * resourceShare;

    document.getElementById('embodiedEmissions').innerText = embodiedEmissions.toFixed(2);
    calculateSCI();
}

function calculateSCI() {
    const operationalEmissions = parseFloat(document.getElementById('operationalEmissions').innerText) || 0;
    const embodiedEmissions = parseFloat(document.getElementById('embodiedEmissions').innerText) || 0;
    const sci = operationalEmissions + embodiedEmissions;
    document.getElementById('sciOutput').innerText = sci.toFixed(2);

    const workUnit = document.getElementById('unitWork').value;
    if (workUnit) {
        document.getElementById('unitOfWork').innerText = "per " + document.getElementById('unitWork').value;
    }
}

// Attach event listeners
document.getElementById('energy').addEventListener('input', calculateOperationalEmissions);
document.getElementById('carbonIntensity').addEventListener('input', calculateOperationalEmissions);
document.getElementById('totalEmbodied').addEventListener('input', calculateEmbodiedEmissions);
document.getElementById('timeReserved').addEventListener('input', calculateEmbodiedEmissions);
document.getElementById('hwLifespan').addEventListener('input', calculateEmbodiedEmissions);
document.getElementById('resourcesReserved').addEventListener('input', calculateEmbodiedEmissions);
document.getElementById('unitWork').addEventListener('input', calculateSCI);