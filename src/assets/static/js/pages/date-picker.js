
flatpickr('.flatpickr-no-config', {
    enableTime: true,
    dateFormat: "Y-m-d H:i", 
})
flatpickr('.flatpickr-always-open', {
    inline: true
})
flatpickr('.flatpickr-range', {
    dateFormat: "F j, Y", 
    mode: 'range'
})
flatpickr('.flatpickr-range-preloaded', {
    dateFormat: "F j, Y", 
    mode: 'range',
    defaultDate: ["2016-10-10T00:00:00Z", "2016-10-20T00:00:00Z"]
})
flatpickr('.flatpickr-time-picker-24h', {
    enableTime: true,
    noCalendar: true,
    dateFormat: "H:i",
    inline: true
})