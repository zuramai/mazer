fetch('assets/data/socialdata.json')
    .then(res => res.json())
    .then(data => {
        const table = document.querySelector('#socialMediaTable tbody');
        data.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.platform}</td>
                <td>${item.visits}</td>
            `;
            table.appendChild(row);
        });
    })
    .catch(error => console.error('Error loading social data:', error));
