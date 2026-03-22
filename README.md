# Google Meet Emoji Keybow (Chrome Extension)

A lightweight, purely vanilla JavaScript Chrome Extension that instantly fires Google Meet reactions via hardware keystrokes.

> 🔗 **Part 2 of 2:** This extension is designed to be triggered by the custom hardware macro pad configured in the **[keybow_device](https://github.com/gshankar/keybow_device)** repository. 

## How It Works
This extension injects a lightweight content script exclusively onto `https://meet.google.com/*` pages. It passively listens for `keydown` events matching the **Numpad Keys** (`Numpad 1` through `Numpad =`) emitted by the programmed Keybow device. 

When a Numpad key is received, it programmatically queries the Google Meet DOM for the corresponding emoji button (using Fallback selectors and Aria-labels to ensure robust compatibility even when Google pushes UI updates) and simulates a click. 

**Privacy First:** This extension has exactly zero external network requests, zero background tracking, and an empty permissions array. It only runs locally within your Google Meet tabs.

## Features
- **Debug Toast Mode:** If you ever need to troubleshoot your hardware integration, simply click the Keybow extension icon in your Chrome toolbar. This opens a settings popup where you can toggle an "On-Screen Debug Toast" (disabled by default). When enabled, a small green notification will pop up in Google Meet whenever a Keybow stroke is recognized.
- **Zero Configuration:** Absolutely no Chrome shortcut mapping is required. Just load the extension and go.

### Key Layout & Emoji Mapping
The extension listens flawlessly to the Numpad outputs from the Keybow. When holding the physical Keybow with the USB cable at the top, the hardware layout triggers the following Google Meet reactions:

| Position | Emoji Triggered | Keybow LED Color |
|----------|-------|-----------|
| **Top Left** | ❤️ Heart | Red |
| **Top Mid** | 👍 Thumbs Up | Yellow |
| **Top Right** | 🎉 Party | Purple |
| **Mid Left** | 👏 Clap | Green |
| **Center** | 😂 Laugh | Bright Blue |
| **Mid Right** | 😮 Surprise | Pink |
| **Bot Left** | 😢 Cry | Dark Blue |
| **Bot Mid** | 🤔 Thinking | Orange |
| **Bot Right** | 👎 Thumbs Down | Yellow |

## Installation
1. Clone or download this repository.
2. In Google Chrome, navigate to `chrome://extensions/`.
3. Toggle on **Developer Mode** in the top right corner.
4. Click **Load unpacked** in the top left.
5. Select the downloaded folder containing the `manifest.json` file.

## Next Steps
If you haven't built the hardware macro pad yet, head over to the **[keybow_device](https://github.com/gshankar/keybow_device)** repository to flash the Lua script to your Pimoroni Keybow!
