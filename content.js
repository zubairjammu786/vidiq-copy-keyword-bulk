// Function to copy text to the clipboard
function copyToClipboard(text) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
}

function exportToCSV() {
  if (window.copiedData && window.copiedData.length > 0) {
    // Adding header line
    const header = 'Keyword,"Search Volume","Competition"';

    // Combining header and data, enclosing values in double quotes
    const csvContent = `${header}\n${window.copiedData.map(data => `"${data.replace(/"/g, '""')}"`).join('\n')}`;

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "copied_data.txt");

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } else {
    alert("No data to export. Please copy some data first.");
  }
}

// Function to export only keywords
function exportKeywords() {
  if (window.copiedData && window.copiedData.length > 0) {
    const keywordsOnly = window.copiedData.map(data => {
      const match = data.match(/^(.*?),/);
      return match ? match[1] : "";
    });

    const csvContent = keywordsOnly.join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "keywords_only.txt");

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } else {
    alert("No data to export. Please copy some data first.");
  }
}

// Function to extract and copy keyword data
function copyKeywordData() {
  const searchVolume = document.querySelector('[data-testid="gauge-search-volume"]');
  const competition = document.querySelector('[data-testid="gauge-competition"]');
  const keywordElement = document.querySelector('var');

  if (searchVolume && competition && keywordElement) {
    const searchVolumeText = searchVolume.innerText.trim();
    const competitionText = competition.innerText.trim();
    const keywordText = keywordElement.innerText.trim();

    const combinedText = `${keywordText},${searchVolumeText},${competitionText}`;

    // Save the copied data in a variable
    if (!window.copiedData) {
      window.copiedData = [];
    }
    window.copiedData.push(combinedText);

    // Notify the user that the data has been added to the clipboard
   
  } else {
    alert("Unable to extract keyword data. Please check the page structure.");
  }
}

// Function to create buttons with styling
function createButtons() {
  // Copy Keyword button
  const copyButton = document.createElement("button");
  copyButton.innerText = "Copy Keyword";
  copyButton.addEventListener("click", copyKeywordData);
  copyButton.style.position = "fixed";
  copyButton.style.top = "10%";
  copyButton.style.left = "35%";
  copyButton.style.backgroundColor = "skyblue";
  copyButton.style.color = "white";
  copyButton.style.borderRadius = "50px";
  copyButton.style.width = "150px";
  copyButton.style.height = "40px";
  copyButton.style.transform = "translateY(-50%)";
  copyButton.style.zIndex = "9999";

  // Export All to CSV button
  const exportButton = document.createElement("button");
  exportButton.innerText = "Export All to CSV";
  exportButton.addEventListener("click", exportToCSV);
  exportButton.style.position = "fixed";
  exportButton.style.top = "10%";
  exportButton.style.left = "50%";
  exportButton.style.color = "white";
  exportButton.style.backgroundColor = "orange";
  exportButton.style.borderRadius = "50px";
  exportButton.style.width = "150px";
  exportButton.style.height = "40px";
  exportButton.style.transform = "translateY(-50%)";
  exportButton.style.zIndex = "9999";

  // Export Keywords Only button
  const exportKeywordsButton = document.createElement("button");
  exportKeywordsButton.innerText = "Export Keywords Only";
  exportKeywordsButton.addEventListener("click", exportKeywords);
  exportKeywordsButton.style.position = "fixed";
  exportKeywordsButton.style.top = "10%";
  exportKeywordsButton.style.left = "65%";
  exportKeywordsButton.style.color = "white";
  exportKeywordsButton.style.backgroundColor = "green";
  exportKeywordsButton.style.borderRadius = "50px";
  exportKeywordsButton.style.width = "200px";
  exportKeywordsButton.style.height = "40px";
  exportKeywordsButton.style.transform = "translateY(-50%)";
  exportKeywordsButton.style.zIndex = "9999";

  document.body.appendChild(copyButton);
  document.body.appendChild(exportButton);
  document.body.appendChild(exportKeywordsButton);
}

// Run the functions when the content script is injected
createButtons();
