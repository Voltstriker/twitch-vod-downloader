# Twitch M3U8 Retrieval

A Node.js utility to download Twitch streams and VODs with multiple resolution options.

## Description

This tool allows you to retrieve m3u8 streams from Twitch and download them at your preferred resolution. It supports both live streams and video-on-demand (VODs). The script presents available resolutions and lets you select which quality to download.

## Prerequisites

Before setting up this project, ensure you have the following installed:

### Required

- **Node.js** (v14 or higher)
  - Download from: https://nodejs.org/
  - Verify installation: `node --version`
- **yt-dlp**
  - Windows:
    - Download from: https://github.com/yt-dlp/yt-dlp/releases
    - Or install via: `winget install yt-dlp.yt-dlp`
    - Or install via Chocolatey: `choco install yt-dlp`
  - macOS: `brew install yt-dlp`
  - Linux: `pip install yt-dlp` or use your package manager
  - Verify installation: `yt-dlp --version`

## Setup Instructions

1. **Clone or download this repository**

   ```bash
   cd "path/to/Twitch m3u8 Retrieval"
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

   This will install the required npm packages listed in `package.json`:
   - `twitch-m3u8` - For retrieving Twitch stream URLs and resolutions

3. **Verify setup**
   ```bash
   npm run get-url
   ```
   You should be prompted to enter a Twitch channel or VOD URL.

## Usage

Run the script:

```bash
npm run get-url
```

The script will prompt you for:

1. **Twitch Channel or VOD URL** - Enter either:
   - A live channel URL: `https://www.twitch.tv/channelname`
   - A VOD URL: `https://www.twitch.tv/videos/1234567890`

2. **Resolution Selection** - Choose from available quality options (e.g., 1080p60, 720p60, etc.)

The download will start automatically using yt-dlp and save to your current directory.

## Supported URL Formats

- **Live Stream**: `https://www.twitch.tv/channelname`
- **VOD**: `https://www.twitch.tv/videos/1234567890`

## Troubleshooting

### "yt-dlp: command not found"

- Ensure yt-dlp is installed and in your system PATH
- Restart your terminal after installation
- Verify with: `yt-dlp --version`

### "Cannot find module 'twitch-m3u8'"

- Run `npm install` to install dependencies
- Delete `node_modules` folder and `package-lock.json`, then run `npm install` again

### Download fails with an error

- Ensure the provided Twitch URL is valid and accessible
- Check that yt-dlp is up to date: `yt-dlp --update-to stable`
- Some streams may require additional authentication or may be unavailable in your region

## License

This project is licensed under the Apache License 2.0. See [LICENSE](LICENSE) file for details.

This project also uses the `twitch-m3u8` package for retrieving stream data.
