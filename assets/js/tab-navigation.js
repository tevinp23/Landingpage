/**
 * Tab navigation functionality
 * Handles switching between different page sections
 */

/**
 * Initialize tab functionality when the page loads
 */
document.addEventListener('DOMContentLoaded', function() {
    initializeTabs();
    
    // Set the first tab as active by default
    const firstTab = document.querySelector('.tab-button');
    const firstContent = document.querySelector('.tab-content');
    
    if (firstTab && firstContent) {
        firstTab.classList.add('active');
        firstContent.classList.add('active');
    }
});

/**
 * Initialize all tab functionality
 */
function initializeTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const targetTab = this.getAttribute('data-tab');
            switchTab(targetTab);
        });
    });
    
    // Handle keyboard navigation for accessibility
    tabButtons.forEach(button => {
        button.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
}

/**
 * Switch to a specific tab
 * @param {string} targetTab - The ID of the tab to switch to
 */
function switchTab(targetTab) {
    // Remove active class from all tabs and content
    const allTabs = document.querySelectorAll('.tab-button');
    const allContent = document.querySelectorAll('.tab-content');
    
    allTabs.forEach(tab => tab.classList.remove('active'));
    allContent.forEach(content => content.classList.remove('active'));
    
    // Add active class to clicked tab and corresponding content
    const activeTab = document.querySelector(`[data-tab="${targetTab}"]`);
    const activeContent = document.getElementById(targetTab);
    
    if (activeTab && activeContent) {
        activeTab.classList.add('active');
        activeContent.classList.add('active');
        
        // Smooth scroll to top of content (useful on mobile)
        const mainContent = document.getElementById('main');
        if (mainContent) {
            mainContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
}

/**
 * Handle responsive behavior for mobile devices
 */
function handleMobileResize() {
    const navigation = document.querySelector('.tab-navigation');
    
    if (window.innerWidth <= 480) {
        // On very small screens, stack tabs vertically
        navigation.classList.add('mobile-vertical');
    } else {
        navigation.classList.remove('mobile-vertical');
    }
}

// Listen for window resize events
window.addEventListener('resize', handleMobileResize);

// Initialize mobile handling on load
window.addEventListener('load', handleMobileResize);
