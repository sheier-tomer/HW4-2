// Tomer Sheier
// 	11/14/2023
// 	This assignment about creating a multiplication table using JavaScript. this file contains the JavaScript code for
// 	the multiplication table.



function createTable() {
    console.log('Creating table...');
    const minRow = parseInt(document.getElementById('minRow').value);
    const maxRow = parseInt(document.getElementById('maxRow').value);
    const minCol = parseInt(document.getElementById('minCol').value);
    const maxCol = parseInt(document.getElementById('maxCol').value);

    // Validate input values
    if (isNaN(minRow) || isNaN(maxRow) || isNaN(minCol) || isNaN(maxCol)) {
        return;
    }

    // Set maximum allowed range for input values
    const maxAllowedRange = 100;

    if (Math.abs(minRow) > maxAllowedRange || Math.abs(maxRow) > maxAllowedRange ||
        Math.abs(minCol) > maxAllowedRange || Math.abs(maxCol) > maxAllowedRange) {
        //alert('Please enter values within the allowed range (-100 to 100).');
        return;
    }

    if (minRow > maxRow || minCol > maxCol) {
        //alert('Invalid range. Minimum values should be less than or equal to maximum values.');
        return;
    }

    const tableContainer = document.getElementById('table-container');
    const table = document.createElement('table');
    table.style.borderCollapse = 'collapse';

    // Create the header row
    const headerRow = document.createElement('tr');

    // Leave the top-left cell empty
    headerRow.appendChild(document.createElement('th'));

    // Populate the header row with column values
    for (let j = minCol; j <= maxCol; j++) {
        const cell = document.createElement('th');
        cell.textContent = j;
        cell.style.border = '1px solid black';
        cell.style.padding = '8px';
        headerRow.appendChild(cell);
    }

    table.appendChild(headerRow);

    // Create the multiplication table
    for (let i = minRow; i <= maxRow; i++) {
        const row = document.createElement('tr');

        // First cell in each row is the row value
        const rowHeader = document.createElement('td');
        rowHeader.textContent = i;
        rowHeader.style.border = '1px solid black';
        rowHeader.style.padding = '8px';
        row.appendChild(rowHeader);

        for (let j = minCol; j <= maxCol; j++) {
            const cell = document.createElement('td');
            cell.textContent = i * j;
            cell.style.border = '1px solid black';
            cell.style.padding = '8px';
            row.appendChild(cell);
        }

        table.appendChild(row);
    }

    // Clear previous table if any
    tableContainer.innerHTML = '';
    tableContainer.appendChild(table);
}


