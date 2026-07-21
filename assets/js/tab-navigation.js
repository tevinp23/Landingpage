/**
 * Tab navigation functionality
 * Handles switching between different page sections
 */

/**
 * Initialize tab functionality when the page loads
 */
document.addEventListener('DOMContentLoaded', function () {
  initializeTabs();

  const requestedTab = window.location.hash.slice(1);
  const initialTab = document.getElementById(requestedTab) ? requestedTab : 'about';
  switchTab(initialTab, false);
});

/**
 * Initialize all tab functionality
 */
function initializeTabs() {
  const tabButtons = document.querySelectorAll('.tab-button');

  tabButtons.forEach((button) => {
    button.addEventListener('click', function (e) {
      e.preventDefault();
      const targetTab = this.getAttribute('data-tab');
      switchTab(targetTab);
    });
  });

  // Handle keyboard navigation for accessibility
  tabButtons.forEach((button) => {
    button.addEventListener('keydown', function (e) {
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
function switchTab(targetTab, shouldScroll = true) {
  // Remove active class from all tabs and content
  const allTabs = document.querySelectorAll('.tab-button');
  const allContent = document.querySelectorAll('.tab-content');

  allTabs.forEach((tab) => {
    tab.classList.remove('active');
    tab.setAttribute('aria-selected', 'false');
  });
  allContent.forEach((content) => {
    content.classList.remove('active');
    content.hidden = true;
  });

  // Add active class to clicked tab and corresponding content
  const activeTab = document.querySelector(`[data-tab="${targetTab}"]`);
  const activeContent = document.getElementById(targetTab);

  if (activeTab && activeContent) {
    activeTab.classList.add('active');
    activeTab.setAttribute('aria-selected', 'true');
    activeContent.classList.add('active');
    activeContent.hidden = false;
    window.history.replaceState(null, '', `#${targetTab}`);

    // Keep the selected tab visible without changing the page's vertical position.
    const tabList = activeTab.parentElement;
    if (tabList && window.innerWidth <= 980) {
      tabList.scrollTo({
        left: activeTab.offsetLeft - tabList.clientWidth / 2 + activeTab.clientWidth / 2,
        behavior: 'smooth',
      });
    }

    // Return to the start of the content after a user selects a tab on mobile.
    const mainContent = document.getElementById('main');
    if (mainContent && shouldScroll && window.innerWidth <= 980) {
      mainContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
