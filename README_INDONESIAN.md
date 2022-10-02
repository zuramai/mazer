<h1 align="center">Mazer Dashboard</h1>

![Mazer Screenshot](https://user-images.githubusercontent.com/45036724/167523601-9d20fb17-1989-488f-b619-cb53c0db8898.png)

<p align="center">Mazer adalah Template Dasbor Admin yang dapat membantu Anda berkembang lebih cepat. Dibuat dengan Bootstrap 5. Tidak ada ketergantungan jQuery.
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

## Penggunaan
#### Menggunakan built-in siap pakai (disarankan)

Unduh rilis terbaru dari [halaman rilis](https://github.com/zuramai/mazer/releases "halaman rilis").
Buka file HTML indeks dan jelajahi kode sumbernya.
#### Membangun sendiri
- Kloning repositori `git clone https://github.com/zuramai/mazer`
- Instal dependensi menggunakan manajer paket node pilihan Anda. Misalnya jalankan `npm install`
- File dibundel oleh Laravel Mix ke folder dist.
    - Jalankan `npm run hot` dan buka `http://localhost:8080` untuk melihat salinan hot-reload dari file yang dihasilkan.
    - Atau jalankan `npm run watch` (rebuild pada perubahan file) atau `npm run production` dan buka `index.html` dari folder dist.

### Membangun dengan Docker
- Kloning repositori `git clone https://github.com/zuramai/mazer`
- Pastikan Anda telah menginstal dan menjalankan Docker:
    - `docker build -t mazer-frontend .`
    - `docker run -it -d -p 8080:80 --nama mazer mazer-frontend`
    - Buka `http://localhost:8080`

## Sumber terbuka berbasis komunitas Mazer

- [CodeIgniter 4](https://github.com/irsyadulibad/mazer-codeigniter) oleh [@irsyadulibad](https://github.com/irsyadulibad)
- [Laravel + Livewire (Unmaintained)](https://github.com/zuramai/laravel-mazer) (tidak terawat, mencari pemelihara)
- [NuxtJS (Unmaintained)](https://github.com/fzn0x/mazer-nuxt) oleh [@fzn0x](https://github.com/fzn0x) (tidak terawat)
- [React JS Component Library](https://github.com/fachryansyah/react-mazer-ui) oleh [@fachryansyah](https://github.com/fachryansyah/)
- [Adonisjs 5](https://github.com/afman42/mazer-adonisjs) oleh [@afman42](https://github.com/afman42/)
- [Django](https://github.com/bimbims125/mazer-django) oleh [@bimbims125](https://github.com/bimbims125/)
- [Flask](https://github.com/antheiz/mazer-flask) oleh [@antheiz](https://github.com/antheiz/)
- Apakah Anda membuat kerangka kerja atau alat lain? Buka `pull request` dan letakkan milik Anda di sini! 😃

## Kontribusi

Harap ikuti [Panduan Berkontribusi](./CONTRIBUTING.md) sebelum berkontribusi.

## License

Mazer berada di bawah [Lisensi MIT](./LICENSE).

## Author

Dibuat oleh <a href="https://saugi.me">Saugi</a>.

## Donation

Anda dapat mendukung Ahmad Saugi di [Ko-fi](https://ko-fi.com/saugi) atau [Trakteer](https://trakteer.id/saugi)

<a href="https://buymeacoffee.com/saugi" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png" alt="Buy Me A Coffee" style="height: 41px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>
