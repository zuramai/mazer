let jquery_datatable = $("#table1").DataTable()

const setTableColor = () => {
    document.querySelectorAll('.dataTables_paginate .pagination').forEach(dt => {
        dt.classList.add('pagination-primary')
    })
}
setTableColor()
jquery_datatable.on('draw', setTableColor)