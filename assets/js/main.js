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


// Get the modal and icon elements
// const modal = document.getElementById("infoModal");
// const icon = document.getElementById("infoIcon");
// let hideTimeout; // Variable to store the timeout

// // Show the modal when hovering over the icon
// icon.addEventListener("mouseover", () => {
//     clearTimeout(hideTimeout); // Clear any pending hide timeout
//     modal.style.display = "block";
// });

// // Keep the modal open when hovering over it
// modal.addEventListener("mouseover", () => {
//     clearTimeout(hideTimeout); // Clear any pending hide timeout
//     modal.style.display = "block";
// });

// // Set a timeout to hide the modal when leaving the icon
// icon.addEventListener("mouseleave", (event) => {
    // if (!modal.contains(event.relatedTarget)) {
    //     hideTimeout = setTimeout(() => {
    //         modal.style.display = "none";
    //     }, 100); // Adjust the delay as needed
    // }
// });

// // Set a timeout to hide the modal when leaving the modal itself
// modal.addEventListener("mouseleave", (event) => {
//     if (!icon.contains(event.relatedTarget)) {
//         hideTimeout = setTimeout(() => {
//             modal.style.display = "none";
//         }, 200); // Adjust the delay as needed
//     }
// });

// // Close the modal when the close button is clicked
// document.querySelector('.modal-button').onclick = function() {
//     modal.style.display = "none";
// };

// Get all icons and modals
const icons = Array.from(document.getElementsByClassName("infoIcon")); // Convert HTMLCollection to array
const modals = Array.from(document.getElementsByClassName("infoModal")); // Convert HTMLCollection to array
let hideTimeout;

// Helper function to hide the modal with a delay
function hideModalWithDelay(modal) {
    hideTimeout = setTimeout(() => {
        modal.style.display = "none";
    }, 25);
}

icons.forEach((icon, index) => {
    const modal = modals[index]; // Match each icon with its corresponding modal

    // Show the modal when hovering over the icon
    icon.addEventListener("mouseover", () => {
        clearTimeout(hideTimeout);
        modal.style.display = "block";
    });

    // Keep the modal open when hovering over it
    modal.addEventListener("mouseover", () => {
        clearTimeout(hideTimeout);
        modal.style.display = "block";
    });

    modal.addEventListener("mouseleave", (event) => {
        if (!icon.contains(event.relatedTarget)) {
            hideModalWithDelay(modal);
        }
    });

    // Hide the modal with a slight delay on mouse leave
    icon.addEventListener("mouseleave", (event) => {
        if (!modal.contains(event.relatedTarget)) {
            hideModalWithDelay(modal);
        }
    });

    // Close the modal when the close button is clicked
    modal.querySelector('.modal-button').onclick = function() {
        modal.style.display = "none";
    };
});
