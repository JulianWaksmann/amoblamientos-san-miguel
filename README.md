# Amoblamientos San Miguel

Sitio web de [Amoblamientos San Miguel](https://www.instagram.com/amoblamientos.sanmiguel/) — muebles a medida en San Miguel, Buenos Aires.

HTML + CSS + JS estático, sin build. Se publica con GitHub Pages desde `main`.

## Estructura

```
index.html      contenido de todas las secciones
styles.css      estilos (paleta y tipografías en :root)
main.js         menú mobile, filtros de galería, lightbox, formulario → WhatsApp
assets/img/     fotos (.webp) y logo
```

## Tareas comunes

- **Agregar un trabajo a la galería**: subir la foto a `assets/img/` (ideal `.webp`, ~1000px de ancho)
  y copiar un bloque `<figure class="work" data-cat="...">` en `index.html`.
  Categorías: `cocinas`, `guardado`, `madera`.
- **Cambiar el WhatsApp**: buscar `5491134812728` en `index.html` y `main.js`.
- **Convertir fotos**: `cwebp -q 82 foto.jpg -o assets/img/foto.webp`

## Local

```bash
python3 -m http.server 5173
```
