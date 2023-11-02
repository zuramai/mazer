<h1 align="center">Dasbor Mazer</h1>

![Mazer Screenshot](https://user-images.githubusercontent.com/45036724/167523601-9d20fb17-1989-488f-b619-cb53c0db8898.png)

<p align="center">Mazer adalah Templat Dasbor Admin yang dapat membantu Anda mengembangkan aplikasi dengan dasbor dengan cepat. Berbasis Bootstrap 5 dan tanpa JQuery.
</p>
<div align="center">

[![All Contributors](https://img.shields.io/github/contributors/zuramai/mazer)](https://github.com/zuramai/mazer/graphs/contributors)
![GitHub last commit](https://img.shields.io/github/last-commit/zuramai/mazer.svg)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/zuramai/mazer)
[![License](https://img.shields.io/github/license/zuramai/mazer.svg)](LICENSE)

</div>

<p align="center">
	<a href="http://zuramai.github.io/mazer/demo">Halaman Demo</a>&nbsp;&nbsp;&nbsp;
	<a href="http://zuramai.github.io/mazer/docs">Halaman Dokumentasi</a>&nbsp;&nbsp;&nbsp;
</p>

## Pemasangan

### Paket Instalasi siap-pakai (disarankan)

Unduh rilis terbaru dari [halaman rilis](https://github.com/zuramai/mazer/releases "halaman rilis") lalu ekstrak pada *folder* yang diinginkan.

### Kembangkan sendiri


1. Kloning repositori
```sh
git clone https://github.com/zuramai/mazer
```

2. Instal dependensi
```sh
yarn install
# ATAU
npm install
```

3. Jalankan secara *local*
```sh
npm run dev
```

4. Buka `http://localhost:5173` di browser Anda

### Kembangkan dengan Docker

- Kloning repositori `git clone https://github.com/zuramai/mazer`
- Pastikan Anda telah menginstal dan menjalankan Docker:
    - `docker build -t mazer-frontend .`
    - `docker run -it -d -p 8080:80 --name mazer mazer-frontend`
    - Buka `http://localhost:8080`

### Menggunakan CDN
Contoh sederhana menggunakan CDN dari [jsdelivr.net](https://www.jsdelivr.com/).

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

#### *Prefix* CDN

Anda dapat menggunakan *url* dengan sebuah *prefix* seperti ini:
```
https://cdn.jsdelivr.net/gh/zuramai/mazer@docs/demo
```

Contoh penggunaan sederhananya:
```
https://cdn.jsdelivr.net/gh/zuramai/mazer@docs/demo/assets/compiled/css/app.css
```

## Proyek sumber-terbuka yang menggunakan **Mazer**

- [CodeIgniter 4](https://github.com/irsyadulibad/mazer-codeigniter) oleh [@irsyadulibad](https://github.com/irsyadulibad)
- [Laravel Mazer Starter](https://github.com/billalxcode/laravel-mazer-starter) by [@billalxcode](https://github.com/billalxcode)
- [Nuxt](https://github.com/fzn0x/mazer-nuxt) oleh [@fzn0x](https://github.com/fzn0x)
- [React JS Component Library](https://github.com/fachryansyah/react-mazer-ui) oleh [@fachryansyah](https://github.com/fachryansyah/)
- [Adonisjs 5](https://github.com/afman42/mazer-adonisjs) oleh [@afman42](https://github.com/afman42/)
- [Django](https://github.com/bimbims125/mazer-django) oleh [@bimbims125](https://github.com/bimbims125/)
- [Flask](https://github.com/antheiz/mazer-flask) oleh [@antheiz](https://github.com/antheiz/)
- [Symfony 6.3 (Mazer 2.1.0)](https://github.com/TheoD02/mazer-symfony-6.3/tree/mazer-2.1.0) oleh [@theod02](ttps://github.com/TheoD02)
- [Spring-Thymeleaf](https://github.com/deyhay-enterprise/spring-project-mazer-template) oleh [@hi-rullah](https://github.com/hi-rullah)
- [Ruby on Rails](https://github.com/noesya/mazer-rails) oleh [@noesya](https://github.com/noesya)
- [Yii2](https://github.com/anovsiradj/yii2-theme-mazer) oleh [@anovsiradj](https://github.com/anovsiradj)
- [Next JS](https://github.com/dipras/next-mazer) oleh [@dipras](https://github.com/dipras)
- Apakah Anda membuat proyek menggunakan *Dashboard* kami? Anda dapat menaruh proyeknya di sini dengan melakukan `Pull Request`.

## Kontribusi

Harap ikuti [Panduan Berkontribusi](./CONTRIBUTING_ID.md) sebelum Anda memulai kontribusi pada proyek kami.

## License

Mazer berada di bawah [Lisensi MIT](./LICENSE).

## Author

Dibuat oleh <a href="https://saugi.me">Saugi</a>.

## Sponsor

![zuramai's sponsors](https://raw.githubusercontent.com/zuramai/static/main/sponsors.svg)
