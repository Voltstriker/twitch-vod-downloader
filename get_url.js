import twitch from "twitch-m3u8";
import readline from "readline";
import { spawn } from "child_process";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Enter the Twitch channel or VOD URL: ", (input) => {
  rl.close();

  // Detect if it's a VOD based on URL format, otherwise assume stream
  const vodMatch = input.match(/twitch\.tv\/videos\/(\d+)/);

  let promise;
  if (vodMatch) {
    // VOD detected - extract numeric ID
    const vodId = vodMatch[1];
    promise = twitch.getVod(vodId);
  } else {
    // Assume it's a stream
    promise = twitch.getStream(input);
  }

  // Handle the promise to get the stream/VOD URLs and resolutions
  const results = {};
  promise
    .then((data) => {
      for (const item of data) {
        // Filter out items without valid resolution - these are often audio-only or invalid entries
        if (item.resolution !== "null" && item.resolution !== null) {
          results[item.resolution] = item.url;
        }
      }

      // Ask user which item to download
      const resolutions = Object.keys(results);
      console.log("\nAvailable resolutions:");
      resolutions.forEach((res, index) => {
        console.log(`${index}: ${res}`);
      });

      const rl2 = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });

      rl2.question("\nSelect a resolution (enter the number): ", (choice) => {
        rl2.close();
        const selectedIndex = parseInt(choice);
        if (selectedIndex >= 0 && selectedIndex < resolutions.length) {
          // Build the yt-dlp command with the selected URL
          const selectedResolution = resolutions[selectedIndex];
          const selectedUrl = results[selectedResolution];

          // Start the download using yt-dlp
          console.log(`\nDownload started for ${selectedResolution} VOD:`);
          const ytdlp = spawn("yt-dlp", [selectedUrl]);

          ytdlp.stdout.on("data", (data) => {
            process.stdout.write(data);
          });

          ytdlp.stderr.on("data", (data) => {
            process.stderr.write(data);
          });

          ytdlp.on("close", (code) => {
            if (code === 0) {
              console.log(`\nDownload complete!`);
            } else {
              console.error(`\nDownload failed with exit code ${code}`);
            }
          });

          ytdlp.on("error", (error) => {
            console.error(`Error spawning yt-dlp: ${error.message}`);
          });
        } else {
          console.error("Invalid selection.");
        }
      });
    })
    .catch((err) => console.error(err));
});
