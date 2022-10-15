<h1 align="center">Mazer Dashboard</h1>

![Mazer Screenshot](https://user-images.githubusercontent.com/45036724/167523601-9d20fb17-1989-488f-b619-cb53c0db8898.png)

<p align="center">Mazer jest szablonem panelu administracyjnego, który pomoże Ci szybciej stworzyć stronę. Stworzony używając Bootstrapa 5. Bez zależności jQuery.</p>
<div align="center">

[![All Contributors](https://img.shields.io/github/contributors/zuramai/mazer)](https://github.com/zuramai/mazer/graphs/contributors)
![GitHub last commit](https://img.shields.io/github/last-commit/zuramai/mazer.svg)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/zuramai/mazer)
[![License](https://img.shields.io/github/license/zuramai/mazer.svg)](LICENSE)

</div>

<p align="center">
	<a href="http://zuramai.github.io/mazer/demo">Strona demonstracyjna</a>&nbsp;&nbsp;&nbsp;
	<a href="http://zuramai.github.io/mazer/docs">Dokumentacja</a>&nbsp;&nbsp;&nbsp;
</p>

## Zastosowanie
#### Korzystanie z gotowej wersji (rekomendowane)
Pobierz najnowszą wersję z [tej strony](https://github.com/zuramai/mazer/releases "releases page").
Otwórz plik index.html i poznawaj kod źródłowy.
#### Własne kompilowanie
- Sklonuj repozytorium `git clone https://github.com/zuramai/mazer`
- Zainstaluj zależności używając wybranego menedżera pakietów node. Na przykład polecenie `npm install` 
- Pliki są dołączane przez Laravel Mix do folderu dist.
    - Uruchom `npm run hot` i otwórz `http://localhost:8080` aby zobaczyć w czasie rzeczywistym kopie wygenerowanych plików.
    - Lub uruchom `npm run watch` (kompiluje przy zmianach w plikach) lub `npm run production` i otwórz `index.html` znajdujący się w folderze dist.

### Kompilowanie używając narzędzia Docker
- Skolnuj repozytorium `git clone https://github.com/zuramai/mazer`
- Upewnij się, że masz zainstalowanego Dockera i uruchom polecenia:
    - `docker build -t mazer-frontend .`
    - `docker run -it -d -p 8080:80 --name mazer mazer-frontend`
    - Otwórz `http://localhost:8080`

## Projekty open source społeczności Mazer

- [CodeIgniter 4](https://github.com/irsyadulibad/mazer-codeigniter) przez [@irsyadulibad](https://github.com/irsyadulibad)
- [Laravel + Livewire (Unmaintained)](https://github.com/zuramai/laravel-mazer) (nie wspierany, poszukuje opiekuna)
- [NuxtJS (Unmaintained)](https://github.com/fzn0x/mazer-nuxt) przez [@fzn0x](https://github.com/fzn0x) (nie wspierany)
- [React JS Component Library](https://github.com/fachryansyah/react-mazer-ui) przez [@fachryansyah](https://github.com/fachryansyah/)
- [Adonisjs 5](https://github.com/afman42/mazer-adonisjs) przez [@afman42](https://github.com/afman42/)
- [Django](https://github.com/bimbims125/mazer-django) przez [@bimbims125](https://github.com/bimbims125/)
- [Flask](https://github.com/antheiz/mazer-flask) przez [@antheiz](https://github.com/antheiz/)
- Zrobiłeś coś w innym frameworku lub narzędziach? Otwórz Pull Request i umieść link do projektu tutaj! 😃

## Contributing

Postępuj zgodnie z [Zasadami wkładu własnego do projektu](./CONTRIBUTING.md) przed wkładem własnym do projektu.

## License

Mazer bazuje na licencji [MIT License](./LICENSE).

## Author

Mazer jest stworzony przez <a href="https://saugi.me">Saugi</a>.

## Donation

Możesz wesprzeć Ahmada Saugi na [Ko-fi](https://ko-fi.com/saugi) lub [Trakteer](https://trakteer.id/saugi).

<a href="https://buymeacoffee.com/saugi" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png" alt="Buy Me A Coffee" style="height: 41px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>