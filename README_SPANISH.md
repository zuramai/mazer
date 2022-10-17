<h1 align="center">Mazer Dashboard</h1>

![Mazer Screenshot](https://user-images.githubusercontent.com/45036724/167523601-9d20fb17-1989-488f-b619-cb53c0db8898.png)

<p align="center">Mazer es una plantilla de administración que ayuda a desarrollar de manera más rapida. Hecho con Bootstrap 5. No tiene dependencia de jQuery.</p>
<div align="center">

[![All Contributors](https://img.shields.io/github/contributors/zuramai/mazer)](https://github.com/zuramai/mazer/graphs/contributors)
![GitHub last commit](https://img.shields.io/github/last-commit/zuramai/mazer.svg)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/zuramai/mazer)
[![License](https://img.shields.io/github/license/zuramai/mazer.svg)](LICENSE)

</div>

<p align="center">
	<a href="http://zuramai.github.io/mazer/demo">Página de demostración</a>&nbsp;&nbsp;&nbsp;
	<a href="http://zuramai.github.io/mazer/docs">Página de documentación</a>&nbsp;&nbsp;&nbsp;
</p>

## Uso
#### Usa una versión previamente realizada (Recomendado)
Descarga la ultima version realizada  [releases page](https://github.com/zuramai/mazer/releases "releases page").
Abre el archivo index HTML y explora el código fuente.
#### Construyelo tú mismo
- Clona el repositorio `git clone https://github.com/zuramai/mazer`
- Instala las dependencias usando el gestor de paquetes node de tu elección. Por ejemplo ejecuta `npm install` 
- Los archivos son empaquetados haciendo uso de Laravel en la carpeta "dist"
    - O ejecuta `npm run hot` Y abre `http://localhost:8080` para ver en tiempo real la copia de los archivos generados.
    - O ejecuta `npm run watch`  (reconstrucción en los archivos editados) o `npm run production` y abre el archivo `index.html` dentro del directorio src.

### Construyendo la app con Docker
- Clona el repositorio `git clone https://github.com/zuramai/mazer`
- Asegurate que tienes docker correctamente instalado y funcionando:
    - `docker build -t mazer-frontend .`
    - `docker run -it -d -p 8080:80 --name mazer mazer-frontend`
    - Abre `http://localhost:8080`

## Comunidad de codigo abierto basado en Mazer

- [CodeIgniter 4](https://github.com/irsyadulibad/mazer-codeigniter) by [@irsyadulibad](https://github.com/irsyadulibad)
- [Laravel + Livewire (Unmaintained)](https://github.com/zuramai/laravel-mazer) (Sin Mantenimiento, Buscando personal de mantenimiento)
- [NuxtJS (Unmaintained)](https://github.com/fzn0x/mazer-nuxt) by [@fzn0x](https://github.com/fzn0x) (Sin Mantenimiento)
- [React JS Component Library](https://github.com/fachryansyah/react-mazer-ui) by [@fachryansyah](https://github.com/fachryansyah/)
- [Adonisjs 5](https://github.com/afman42/mazer-adonisjs) by [@afman42](https://github.com/afman42/)
- [Django](https://github.com/bimbims125/mazer-django) by [@bimbims125](https://github.com/bimbims125/)
- [Flask](https://github.com/antheiz/mazer-flask) by [@antheiz](https://github.com/antheiz/)
- Tienes experiencia con otros frameworks o herramientas? Abre una  Pull Requests y coloca tu aporte! 😃

## Contribuciones

Por favor lee [Contributing Guide](./CONTRIBUTING.md) antes de contribuir.

## Licencia

Mazer esta bajo la licencia de [MIT License](./LICENSE).

## Autores

Mazer es creador por <a href="https://saugi.me">Saugi</a>.

## Donaciones

Puedes apoyar a Ahmad Saugi en [Ko-fi](https://ko-fi.com/saugi) o [Trakteer](https://trakteer.id/saugi).

<a href="https://buymeacoffee.com/saugi" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png" alt="Buy Me A Coffee" style="height: 41px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>
