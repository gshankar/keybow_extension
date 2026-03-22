document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('debug-toggle');

    // Load the current state (disabled by default)
    chrome.storage.local.get(['debugMode'], (result) => {
        toggle.checked = result.debugMode || false;
    });

    // Save the new state when the user toggles the checkbox
    toggle.addEventListener('change', () => {
        chrome.storage.local.set({ debugMode: toggle.checked });
    });
});
