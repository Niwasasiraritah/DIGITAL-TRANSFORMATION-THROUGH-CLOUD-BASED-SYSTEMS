// Fetch records from the server for the dashboard page
async function fetchRecords() {
    const response = await fetch("/api/data");
    const data = await response.json();
    const recordsDiv = document.getElementById("records");
    recordsDiv.innerHTML = data.map(record => `<p>${record.name}: ${record.description}</p>`).join("");
}

fetchRecords();
