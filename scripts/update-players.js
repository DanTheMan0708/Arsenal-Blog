const fs = require('fs');
const path = require('path');

// Path to the live stats JSON file
const liveStatsPath = path.join(__dirname, '../data/live-stats.json');

// Directory containing player files
const playersDir = path.join(__dirname, '../players');

// Read the live stats JSON file
const liveStats = JSON.parse(fs.readFileSync(liveStatsPath, 'utf-8'));

// Function to update a player file with live stats
function updatePlayerFile(playerName, stats) {
    const fileName = `${playerName.split(' ')[0]}.html`; // Extract first name for file name
    const filePath = path.join(playersDir, fileName);

    if (!fs.existsSync(filePath)) {
        console.error(`File not found for player: ${playerName}`);
        return;
    }

    // Read the existing player file
    let fileContent = fs.readFileSync(filePath, 'utf-8');

    // Replace stats in the file content
    fileContent = fileContent.replace(
        /<p>Goals: \d+<\/p>/,
        `<p>Goals: ${stats.goals}</p>`
    );
    fileContent = fileContent.replace(
        /<p>Assists: \d+<\/p>/,
        `<p>Assists: ${stats.assists}</p>`
    );
    fileContent = fileContent.replace(
        /<p>Appearances: \d+<\/p>/,
        `<p>Appearances: ${stats.appearances}</p>`
    );

    // Write the updated content back to the file
    fs.writeFileSync(filePath, fileContent);
}

// Update all player files with live stats
liveStats.forEach(player => {
    updatePlayerFile(player.name, player.stats);
});

console.log('All player files have been updated successfully!');
