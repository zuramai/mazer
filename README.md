<h1 align="center">Mazer Dashboard</h1>

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


<table>
	<tr>
		<th>Sponsored by</th>
	</tr>
	<tr>
		<td>
		<p align="center">
			<a href="https://lokal.so/?ref=zuramai">
				<img src="https://github.com/zuramai/zuramai/blob/master/sponsors/lokalso.png?raw=true"  width="50%">
			</a>
		</p>	
		</td>
	</tr>
</table>

## Installation

### Using a ready-made built (recommended)

Download the latest release from the [releases page](https://github.com/zuramai/mazer/releases "releases page").
Open the index HTML file and explore the source code.

### Building yourself

1. Clone the repository 
```sh
git clone https://github.com/zuramai/mazer
```

2. Install dependencies
```sh
yarn install
# OR
npm install
```

3. Run it locally
```sh
npm run dev
```

4. Open `http://localhost:5173` in your browser

### Building with Docker

- Clone the repository `git clone https://github.com/zuramai/mazer`
- Make sure you have Docker installed and run:
    - `docker build -t mazer-frontend .`
    - `docker run -it -d -p 5173:80 --name mazer mazer-frontend`
    - Open `http://localhost:5173`
### Using CDN 
Simple example using CDN from [jsdelivr.net](https://www.jsdelivr.com/).

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard - Mazer Admin Dashboard</title>

    <link rel="shortcut icon" href="https://cdn.jsdelivr.net/gh/zuramai/mazer@docs/demo/assets/compiled/svg/favicon.svg" type="image/x-icon">

    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/zuramai/mazer@docs/demo/assets/compiled/css/app.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/zuramai/mazer@docs/demo/assets/compiled/css/app-dark.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/zuramai/mazer@docs/demo/assets/compiled/css/iconly.css">
</head>

<body>
    <script src="https://cdn.jsdelivr.net/gh/zuramai/mazer@docs/demo/assets/static/js/initTheme.js"></script>
    <!-- Start content here -->

    <!-- End content -->
    <script src="https://cdn.jsdelivr.net/gh/zuramai/mazer@docs/demo/assets/static/js/components/dark.js"></script>
    <script src="https://cdn.jsdelivr.net/gh/zuramai/mazer@docs/demo/assets/extensions/perfect-scrollbar/perfect-scrollbar.min.js"></script>

    <script src="https://cdn.jsdelivr.net/gh/zuramai/mazer@docs/demo/assets/compiled/js/app.js"></script>

    <!-- Need: Apexcharts -->
    <script src="https://cdn.jsdelivr.net/gh/zuramai/mazer@docs/demo/assets/extensions/apexcharts/apexcharts.min.js"></script>
    <script src="https://cdn.jsdelivr.net/gh/zuramai/mazer@docs/demo/assets/static/js/pages/dashboard.js"></script>
</body>

</html>
```

#### CDN Prefix

You can use the url with a prefix like this:
```
https://cdn.jsdelivr.net/gh/zuramai/mazer@docs/demo
```

A simple example:
```
https://cdn.jsdelivr.net/gh/zuramai/mazer@docs/demo/assets/compiled/css/app.css
```

## Community Mazer-based open sources

- [CodeIgniter 4](https://github.com/irsyadulibad/mazer-codeigniter) by [@irsyadulibad](https://github.com/irsyadulibad)
- [Laravel Mazer Starter](https://github.com/billalxcode/laravel-mazer-starter) by [@billalxcode](https://github.com/billalxcode)
- [Nuxt](https://github.com/fzn0x/mazer-nuxt) by [@fzn0x](https://github.com/fzn0x)
- [React JS Component Library](https://github.com/fachryansyah/react-mazer-ui) by [@fachryansyah](https://github.com/fachryansyah/)
- [Adonisjs 5](https://github.com/afman42/mazer-adonisjs) by [@afman42](https://github.com/afman42/)
- [Django](https://github.com/bimbims125/mazer-django) by [@bimbims125](https://github.com/bimbims125/)
- [Flask](https://github.com/antheiz/mazer-flask) by [@antheiz](https://github.com/antheiz/)
- [Symfony 6.3 (Mazer 2.1.0)](https://github.com/TheoD02/mazer-symfony-6.3/tree/mazer-2.1.0) by [@theod02](ttps://github.com/TheoD02)
- [Spring-Thymeleaf](https://github.com/deyhay-enterprise/spring-project-mazer-template) by [@hi-rullah](https://github.com/hi-rullah)
- [Ruby on Rails](https://github.com/noesya/mazer-rails) by [@noesya](https://github.com/noesya)
- [Yii2](https://github.com/anovsiradj/yii2-theme-mazer) by [@anovsiradj](https://github.com/anovsiradj)
- [Next JS](https://github.com/dipras/next-mazer) by [@dipras](https://github.com/dipras)
- Did you make in another framework or tools? Open up Pull Requests and put yours here! 😃

## Contributing

Please follow [Contributing Guide](./CONTRIBUTING.md) before contributing.

## License

Mazer is under [MIT License](./LICENSE).

## Author

Mazer is created by <a href="https://saugi.me">Saugi</a>.

## Sponsors

![zuramai's sponsors](https://raw.githubusercontent.com/zuramai/static/main/sponsors.svg)
