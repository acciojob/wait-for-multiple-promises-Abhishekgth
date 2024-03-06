//your JS code here. If required.
function createPromise(min, max) {
    const randomTime = Math.random() * (max - min) + min;
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(randomTime.toFixed(3)); 
        }, randomTime * 1000); 
    });
}
function createPromises() {
    return [
        createPromise(1, 3),
        createPromise(1, 3),
        createPromise(1, 3)
    ];
}

function updateTable(results) {
    const table = document.getElementById('your-table-id'); 

    for (let i = 0; i < results.length; i++) {
        const row = table.rows[i + 1]; 

        row.cells[0].textContent = 'Promise ' + (i + 1);

        
        row.cells[1].textContent = results[i];
    }

    const totalTime = results.reduce((acc, time) => acc + parseFloat(time), 0);
    table.rows[4].cells[1].textContent = totalTime.toFixed(3);
}

const table = document.getElementById('your-table-id'); 
const loadingRow = table.insertRow();
const loadingCell = loadingRow.insertCell();
loadingCell.colSpan = 2;
loadingCell.textContent = 'Loading...';

const promises = createPromises();
Promise.all(promises)
    .then(results => {
     
        table.deleteRow(1);

        updateTable(results);
    })
    .catch(error => {
        console.error('An error occurred:', error);
    });
