# Mazer Dashboard

![Mazer Screenshot](https://user-images.githubusercontent.com/45036724/167523601-9d20fb17-1989-488f-b619-cb53c0db8898.png)

<p align="center">Mazer is an Admin Dashboard Template that can help you develop faster. Made with Bootstrap 5. No jQuery dependency.</p>
<div align="center">

[![All Contributors](https://img.shields.io/github/contributors/zuramai/mazer)](https://github.com/zuramai/mazer/graphs/contributors)
![GitHub last commit](https://img.shields.io/github/last-commit/zuramai/mazer.svg)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/zuramai/mazer)
[![License](https://img.shields.io/github/license/zuramai/mazer.svg)](LICENSE)

</div>

<p align="center">
    <a href="http://zuramai.github.io/mazer/demo">Demo Page</a>&nbsp;&nbsp;&nbsp;
    <a href="http://zuramai.github.io/mazer/docs">Documentation Page</a>&nbsp;&nbsp;&nbsp;
    <a href="https://github.com/zuramai/mazer/blob/main/README_INDONESIAN.md">Indonesian README</a>&nbsp;&nbsp;&nbsp;
</p>

---

### Project-Specific Changes

This section details the custom modifications made to the `component-card.html` file to demonstrate dynamic data loading from a JSON file.

#### File Structure
The project structure has been augmented with a new data file:
- `data/data.json`: A custom JSON file containing key-value pairs.
- `component-card.html`: The main HTML file which has been modified to display the data.

#### Data Integration Logic
The `component-card.html` page now dynamically loads data into four cards in the dashboard header. This is achieved through a JavaScript `<script>` block at the end of the file.

1.  **Data Source:** The script fetches data from the `data/data.json` file. This file contains nested data for "breakpointBooking" and "dogteurAssur", extracted from provided image mockups.
    ```json
    {
      "breakpointBooking": {
        "artists": 126,
        "events": 56
      },
      "dogteurAssur": {
        "startingPlanPrice": 35,
        "numberOfReasons": 5
      }
    }
    ```
2.  **HTML Modification:** The original cards in the `page-heading` section were replaced. New cards with unique `id` attributes (`breakpoint-artists`, `breakpoint-events`, `dogteur-price`, `dogteur-reasons`) were added to serve as placeholders for the data.
3.  **JavaScript Implementation:** The JavaScript code makes an asynchronous call to the `data.json` file. Upon a successful response, it parses the JSON and updates the `innerText` of the corresponding HTML elements using `document.getElementById()`. The code correctly handles the nested structure of the JSON object.

This setup allows for easy updates to the data by simply changing the values in the `data.json` file without needing to modify the HTML or JavaScript code.

---

## Installation

### Using a ready-made built (recommended)

Download the latest release from the [releases page](https://github.com/zuramai/mazer/releases "releases page").
Open the index HTML file and explore the source code.

### Building yourself

1. Clone the repository 
```sh
git clone [https://github.com/zuramai/mazer](https://github.com/zuramai/mazer)