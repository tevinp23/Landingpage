/**
 * Form validation and interaction scripts
 */

/**
 * Validates the contact form before submission
 * Ensures user has confirmed they are human
 * @returns {boolean} - Returns true if validation passes, false otherwise
 */
function validateForm() {
    const checkBox = document.getElementById('demo-human');
    if (!checkBox.checked) {
        alert('Please confirm that you are a human.');
        return false; // Prevent form submission
    }
    return true; // Allow form submission
}
