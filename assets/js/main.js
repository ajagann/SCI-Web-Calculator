import { region_to_acronym, carbon_intensity } from './carbonIntensity.js';

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
});

// Javascript for Popups
const popupButtons = document.querySelectorAll('.modal-button');
const popups = document.querySelectorAll('.popup');
const closeButtons = document.querySelectorAll('.close-button');
const overlay = document.getElementById('overlay');

// Show the popup and overlay when the button is clicked
popupButtons.forEach(button => {
    button.onclick = function() {
        const popupId = this.getAttribute('data-popup');
        document.getElementById(popupId).style.display = 'block';
        overlay.style.display = 'block';
    };
});

// Close the popup and overlay when the close button is clicked
closeButtons.forEach(button => {
    button.onclick = function() {
        this.parentElement.style.display = 'none';
        overlay.style.display = 'none';
    };
});

// Close the popup and overlay when clicking outside of it
window.onclick = function(event) {
    popups.forEach(popup => {
        if (event.target == popup) {
            popup.style.display = 'none';
            overlay.style.display = 'none';
        }
    });
};

// Javascript for US Map in Carbon Intensity Popup
const map = document.getElementById('map');
const regions = Array.from(map.getElementsByTagName('path'));
const acronym_labels = Array.from(map.getElementsByClassName('acronym'))

regions.forEach((region, index) => {
    // Find corresponding names
    const label = acronym_labels[index];

    label.onclick = function() {
        const label_acronym = this.textContent.trim();
        const value = carbon_intensity[label_acronym];
        const alertStr = label_acronym + ": " + value;
        alert(alertStr);
    }

    region.onclick = function() {
        const regClss = this.classList;
        const thisRegion = regClss[regClss.length - 1];
        const acronym = region_to_acronym[thisRegion]["acronym"];
        const full_name = region_to_acronym[thisRegion]["full_name"];
        const value = carbon_intensity[acronym];
        const alertStr = acronym + " (" + full_name + ")" + ": " + value;
        alert(alertStr);
    }
});
