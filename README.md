# 🔍 DOM Web Inspector Extension

Extensión para navegadores basada en Chromium (Google Chrome, Microsoft Edge) que permite inspeccionar elementos de una página web al hacer clic, incluyendo formularios, `canvas`, e `iframes`.

Incluye un **menú contextual** para activarla y desactivarla fácilmente desde el ícono de la extensión.

---

## 📁 Archivos del proyecto

Coloca estos archivos en una carpeta llamada `dom-inspector-extension`:

- `manifest.json` → Configuración de la extensión
- `background.js` → Lógica de activación/desactivación vía menú contextual
- `inspector.js` → Script para inspección del DOM
- `icon.png` → Ícono de 128x128 píxeles (opcional pero recomendado)

---

## ⚙️ Instalación en Chrome o Edge

### 🖥 Google Chrome

1. Abre Chrome.
2. Ve a `chrome://extensions/`
3. Activa el botón **Modo desarrollador** (arriba a la derecha).
4. Haz clic en **"Cargar descomprimida"**.
5. Selecciona la carpeta `dom-inspector-extension`.

### 🌐 Microsoft Edge

1. Abre Edge.
2. Ve a `edge://extensions/`
3. Activa **Modo desarrollador**.
4. Haz clic en **"Cargar sin empaquetar"**.
5. Selecciona la carpeta con los archivos.

---

## ✅ Cómo usar

1. Haz **clic derecho sobre el ícono de la extensión** en la barra del navegador.
2. Selecciona `Activar DOM Inspector`.
3. Luego abre la consola del navegador (`F12`) y haz clic sobre cualquier elemento de la página.
4. Verás en consola:
   - Tag, ID, clases, atributos
   - Posición y ruta DOM
   - Si pertenece a un formulario
   - Coordenadas internas si es un `canvas`

Para detener la inspección:
- Vuelve a hacer clic derecho sobre el ícono.
- Selecciona `Desactivar DOM Inspector`.

---

## 🧼 Cómo desactivar o eliminar

- Desde `chrome://extensions/` o `edge://extensions/`:
  - Usa el switch para desactivarla temporalmente.
  - O haz clic en "Quitar" para desinstalarla.

---

## ✨ Créditos

Creado por Raúl Guillermo Lévano Cutiño. Basado en APIs de Chrome Extensions (Manifest V3).

---
