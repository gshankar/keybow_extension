// --- CONFIGURATION ---
let DEBUG_MODE = false; // Disabled by default

// Load initial state from extension popup
chrome.storage.local.get(['debugMode'], (result) => {
    DEBUG_MODE = result.debugMode || false;
});

// Keep state updated instantly if user clicks the popup while on the page
chrome.storage.onChanged.addListener((changes) => {
    if (changes.debugMode) {
        DEBUG_MODE = changes.debugMode.newValue;
    }
});

// Maps our Numpad keys to the emojis and potential Google Meet button selectors
const KEY_MAPPING = {
    'Numpad1': { name: 'Heart', char: '💖', fallbackSelectors: ['[aria-label*="heart" i]', '[aria-label*="Heart"]', '[aria-label*="💖"]', '[aria-label*="❤️"]'] },
    'Numpad2': { name: 'Thumbs Up', char: '👍', fallbackSelectors: ['[aria-label*="Thumbs up" i]', '[aria-label*="👍"]'] },
    'Numpad3': { name: 'Party Popper', char: '🎉', fallbackSelectors: ['[aria-label*="Party" i]', '[aria-label*="🎉"]'] },
    'Numpad4': { name: 'Clapping', char: '👏', fallbackSelectors: ['[aria-label*="Clapping" i]', '[aria-label*="👏"]'] },
    'Numpad5': { name: 'Laugh', char: '😂', fallbackSelectors: ['[aria-label*="tears of joy" i]', '[aria-label*="Laugh" i]', '[aria-label*="😂"]'] },
    'Numpad6': { name: 'Surprised', char: '😮', fallbackSelectors: ['[aria-label*="Surprise" i]', '[aria-label*="😮"]'] },
    'Numpad7': { name: 'Cry', char: '😢', fallbackSelectors: ['[aria-label*="Cry" i]', '[aria-label*="😢"]'] },
    'Numpad8': { name: 'Thinking', char: '🤔', fallbackSelectors: ['[aria-label*="Thinking" i]', '[aria-label*="🤔"]'] },
    'Numpad9': { name: 'Thumbs Down', char: '👎', fallbackSelectors: ['[aria-label*="Thumbs down" i]', '[aria-label*="👎"]'] },
    'Numpad0': { name: 'Toggle Microphone', char: '🎤', fallbackSelectors: ['[aria-label*="microphone" i]', '[data-tooltip*="microphone" i]'] },
    'NumpadDecimal': { name: 'Toggle Camera', char: '📷', fallbackSelectors: ['[aria-label*="camera" i]', '[data-tooltip*="camera" i]'] },
    'NumpadEqual': { name: 'Raise/Lower Hand', char: '✋', fallbackSelectors: ['[aria-label*="hand" i]', '[data-tooltip*="hand" i]'] }
};

// --- DEBUG UI ---
// Creates a small green toast notification on the screen so you can see keys arrive!
function showDebugToast(message) {
    if (!DEBUG_MODE) return;
    
    let toast = document.getElementById('keybow-debug-toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'keybow-debug-toast';
        toast.style.cssText = `
            position: fixed;
            bottom: 80px;
            left: 20px;
            background: rgba(0, 0, 0, 0.85);
            color: #00FF00;
            padding: 10px 15px;
            border-radius: 5px;
            font-family: monospace;
            font-size: 14px;
            z-index: 999999;
            pointer-events: none;
            transition: opacity 0.3s;
            box-shadow: 0 4px 6px rgba(0,0,0,0.3);
        `;
        document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.style.opacity = '1';
    
    // Auto-hide after 2 seconds
    if (toast.hideTimeout) clearTimeout(toast.hideTimeout);
    toast.hideTimeout = setTimeout(() => {
        toast.style.opacity = '0';
    }, 2000);
}

// --- DOM AUTOMATION ---
function findAndClickReaction(reactionDef) {
    // 1. Try to find the button by its aria-label (the most common Google Meet way)
    for (let selector of reactionDef.fallbackSelectors) {
        const btn = document.querySelector(selector);
        if (btn) {
            btn.click();
            return true;
        }
    }
    
    // 2. Fallback: Search the entire DOM for the actual emoji character
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
    let node;
    while (node = walker.nextNode()) {
        if (node.nodeValue.includes(reactionDef.char)) {
            // Found the text, climb up to the closest button
            let parentBtn = node.parentElement.closest('button, [role="button"]');
            if (parentBtn) {
                parentBtn.click();
                return true;
            }
        }
    }
    
    return false;
}

// --- MAIN LISTENER ---
window.addEventListener('keydown', (e) => {
    // Show every single keystroke Google Meet receives to help debug
    if (DEBUG_MODE) {
        showDebugToast(`Key received: ${e.code}`);
        console.log(`[Keybow Debug] Received Keydown: ${e.code}`);
    }

    const mapping = KEY_MAPPING[e.code];
    if (mapping) {
        if (DEBUG_MODE) showDebugToast(`Triggering: ${mapping.name} ${mapping.char}`);
        
        let success = findAndClickReaction(mapping);
        
        if (!success) {
            // Google Meet sometimes hides the emojis until the "Reactions" menu is open
            // Find the master reactions button and click it to open the flyout
            const reactionToggle = document.querySelector('[aria-label*="Reaction"], [aria-label*="reaction"]');
            
            if (reactionToggle) {
                reactionToggle.click();
                if (DEBUG_MODE) console.log("Opened reaction panel via toggle. Waiting 100ms...");
                
                // Wait 100ms for the DOM to render the flyout, then try clicking the emoji again!
                setTimeout(() => {
                    findAndClickReaction(mapping);
                }, 100);
            } else {
                if (DEBUG_MODE) console.error("Could not find the master reaction toggle button.");
            }
        }
    }
});
