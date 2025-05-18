(function () {
  if (window.__DOM_INSPECTOR_ACTIVE__) {
    document.removeEventListener('click', window.__DOM_INSPECTOR_HANDLER__, true);
    console.log("🛑 DOM Inspector DESACTIVADO");
    window.__DOM_INSPECTOR_ACTIVE__ = false;
    return;
  }

  function handleClick(event) {
    event.preventDefault();
    event.stopPropagation();

    const element = event.target;
    const rect = element.getBoundingClientRect();
    const path = [];

    let parent = element;
    while (parent) {
      path.push(`${parent.tagName}${parent.id ? `#${parent.id}` : ''}${parent.className ? `.${parent.className.split(' ').join('.')}` : ''}`);
      parent = parent.parentElement;
    }

    console.clear();
    console.log("🔘 Elemento clickeado:");
    console.log("📍 Tag:", element.tagName);
    console.log("🆔 ID:", element.id || "(sin ID)");
    console.log("🏷️ Clases:", element.className || "(sin clases)");
    console.log("✏️ Texto:", (element.innerText || "").trim().slice(0, 200));
    console.log("📐 Posición en pantalla:", rect);
    console.log("🧬 Ruta DOM:", path.join(" > "));
    console.log("⚙️ Atributos:");
    [...element.attributes].forEach(attr => {
      console.log(` - ${attr.name} = "${attr.value}"`);
    });
    console.log("🧾 Outer HTML:");
    console.log(element.outerHTML);

    // Para detectar canvas
    if (element.tagName === "CANVAS") {
      const x = event.offsetX;
      const y = event.offsetY;
      console.log(`🎯 Click dentro de CANVAS en coordenadas internas: X=${x}, Y=${y}`);
    }

    // Si pertenece a un formulario
    const form = element.closest("form");
    if (form) {
      console.log("📝 Formulario contenedor:");
      console.log(" - Action:", form.action);
      console.log(" - Method:", form.method);
      console.log(" - Inputs:");
      form.querySelectorAll("input, label, button, select, textarea").forEach(e => {
        console.log(`  · ${e.tagName} - name="${e.name}" id="${e.id}" type="${e.type}"`);
      });
    } else {
      console.log("ℹ️ No pertenece a un formulario.");
    }
  }

  // Guardar el handler para permitir desactivación
  window.__DOM_INSPECTOR_HANDLER__ = handleClick;
  window.__DOM_INSPECTOR_ACTIVE__ = true;

  document.addEventListener('click', handleClick, true);
  console.log("✅ DOM Inspector ACTIVADO");

  // Escaneo inicial de iframes
  const iframes = document.querySelectorAll("iframe");
  if (iframes.length > 0) {
    console.log(`🖼️ Se encontraron ${iframes.length} iframe(s):`);
    iframes.forEach((frame, i) => {
      console.log(`\n🖼️ Iframe #${i + 1}: src=${frame.src}`);
      try {
        const frameDoc = frame.contentDocument || frame.contentWindow.document;
        const forms = frameDoc.querySelectorAll("form");
        console.log(` - Formularios dentro: ${forms.length}`);
        forms.forEach((f, j) => {
          console.log(`   · Formulario ${j + 1}: action="${f.action}", method="${f.method}"`);
        });
      } catch (e) {
        console.warn("⚠️ No se puede acceder al iframe por política de mismo origen (CORS).");
      }
    });
  } else {
    console.log("🔎 No se encontraron iframes en la página.");
  }
})();
