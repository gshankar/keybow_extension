# Google Meet Emoji Keybow (Chrome Extension)

A lightweight, purely vanilla JavaScript Chrome Extension that instantly fires Google Meet reactions via hardware keystrokes.

> 🔗 **Part 2 of 2:** This extension is designed to be triggered by the custom hardware macro pad configured in the **[keybow_device](https://github.com/gshankar/keybow_device)** repository. 

## How It Works
This extension injects a lightweight content script exclusively onto `https://meet.google.com/*` pages. It passively listens for `keydown` events matching the **Numpad Keys** (`Numpad 1` through `Numpad =`) emitted by the programmed Keybow device. 

When a Numpad key is received, it programmatically queries the Google Meet DOM for the corresponding emoji button (using Fallback selectors and Aria-labels to ensure robust compatibility even when Google pushes UI updates) and simulates a click. 

**Privacy First:** This extension has exactly zero external network requests, zero background tracking, and an empty permissions array. It only runs locally within your Google Meet tabs.

## Features
- **Debug Toast Mode:** The `content.js` script includes a `DEBUG_MODE` constant (enabled by default) that pops up a small, temporary green toast notification on your screen whenever a Keybow stroke is recognized. This visual guarantee helps diagnose hardware connectivity!
- **Zero Configuration:** Absolutely no Chrome shortcut mapping is required. Just load the extension and go.

## Installation
1. Clone or download this repository.
2. In Google Chrome, navigate to `chrome://extensions/`.
3. Toggle on **Developer Mode** in the top right corner.
4. Click **Load unpacked** in the top left.
5. Select the downloaded folder containing the `manifest.json` file.

## Next Steps
If you haven't built the hardware macro pad yet, head over to the **[keybow_device](https://github.com/gshankar/keybow_device)** repository to flash the Lua script to your Pimoroni Keybow!
