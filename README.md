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

| Position | Emoji / Action Triggered | Keybow LED Color |
|----------|--------------------------|------------------|
| **Row 1 Left** | ❤️ Heart | Red |
| **Row 1 Mid**  | 👍 Thumbs Up | Yellow |
| **Row 1 Right**| 🎉 Party | Purple |
| **Row 2 Left** | 👏 Clap | Green |
| **Row 2 Mid**  | 😂 Laugh | Bright Blue |
| **Row 2 Right**| 😮 Surprise | Pink |
| **Row 3 Left** | 😢 Cry | Dark Blue |
| **Row 3 Mid**  | 🤔 Thinking | Orange |
| **Row 3 Right**| 👎 Thumbs Down | Yellow |
| **Row 4 Left** | 🎤 Toggle Mute | Red (Muted) / White |
| **Row 4 Mid**  | 📷 Toggle Video | Red (Off) / White |
| **Row 4 Right**| ✋ Raise Hand | Green (Raised) / White |

> **⚠️ Note on Media Controls:** Because the Keybow does not establish a bi-directional data flow from the browser tab back to the USB hardware, the LEDs for the hardware toggles (Mute, Video, Hand) are purely tracked *locally* by the macro pad. If you change these states using your mouse on the Google Meet screen, the hardware keys will become slightly desynchronized with your actual Meet status.

## Installation
1. Clone or download this repository.
2. In Google Chrome, navigate to `chrome://extensions/`.
3. Toggle on **Developer Mode** in the top right corner.
4. Click **Load unpacked** in the top left.
5. Select the downloaded folder containing the `manifest.json` file.

## Next Steps
If you haven't built the hardware macro pad yet, head over to the **[keybow_device](https://github.com/gshankar/keybow_device)** repository to flash the Lua script to your Pimoroni Keybow!
