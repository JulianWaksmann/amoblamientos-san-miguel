// Amoblamientos San Miguel — interacciones
(() => {
  const WA_NUMBER = "5491134812728";
  document.documentElement.classList.add("js");
  document.getElementById("year").textContent = new Date().getFullYear();

  // Header con fondo al scrollear
  const header = document.querySelector(".header");
  const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 12);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // Menú mobile
  const burger = document.getElementById("burger");
  const nav = document.getElementById("nav");
  const setMenu = (open) => {
    nav.classList.toggle("is-open", open);
    burger.setAttribute("aria-expanded", String(open));
    burger.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
    document.body.style.overflow = open ? "hidden" : "";
  };
  burger.addEventListener("click", () => setMenu(!nav.classList.contains("is-open")));
  nav.addEventListener("click", (e) => { if (e.target.closest("a")) setMenu(false); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });

  // Aparición al hacer scroll
  const revealables = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-in");
        io.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    revealables.forEach((el, i) => {
      el.style.transitionDelay = `${(i % 4) * 70}ms`;
      io.observe(el);
    });
  } else {
    revealables.forEach((el) => el.classList.add("is-in"));
  }

  // Filtros de la galería
  const works = [...document.querySelectorAll(".work")];
  const filters = document.querySelectorAll(".filter");
  filters.forEach((btn) => btn.addEventListener("click", () => {
    const cat = btn.dataset.filter;
    filters.forEach((b) => {
      const active = b === btn;
      b.classList.toggle("is-active", active);
      b.setAttribute("aria-selected", String(active));
    });
    works.forEach((w) => {
      w.classList.toggle("is-hidden", cat !== "all" && w.dataset.cat !== cat);
      w.classList.add("is-in");
    });
  }));

  // Lightbox
  const lb = document.getElementById("lightbox");
  const lbImg = document.getElementById("lb-img");
  const lbCap = document.getElementById("lb-cap");
  let current = 0;
  const visibleWorks = () => works.filter((w) => !w.classList.contains("is-hidden"));
  const show = (idx) => {
    const list = visibleWorks();
    current = (idx + list.length) % list.length;
    const img = list[current].querySelector("img");
    lbImg.src = img.src;
    lbImg.alt = img.alt;
    const title = list[current].querySelector("figcaption").lastChild.textContent.trim();
    const isDesign = list[current].querySelector(".tag-diseno");
    lbCap.textContent = isDesign ? `${title} · Diseño ilustrativo` : title;
  };
  works.forEach((w) => w.querySelector(".work__btn").addEventListener("click", () => {
    show(visibleWorks().indexOf(w));
    lb.showModal();
  }));
  lb.querySelector(".lightbox__close").addEventListener("click", () => lb.close());
  lb.querySelector(".lightbox__nav--prev").addEventListener("click", () => show(current - 1));
  lb.querySelector(".lightbox__nav--next").addEventListener("click", () => show(current + 1));
  lb.addEventListener("click", (e) => { if (e.target === lb) lb.close(); });
  lb.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") show(current - 1);
    if (e.key === "ArrowRight") show(current + 1);
  });

  // Videos: se reproducen en silencio mientras están en pantalla
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const clips = document.querySelectorAll(".clip video");
  if ("IntersectionObserver" in window && !reduceMotion) {
    const vio = new IntersectionObserver((entries) => {
      entries.forEach(({ target, isIntersecting }) => {
        if (isIntersecting) target.play().catch(() => {});
        else target.pause();
      });
    }, { threshold: 0.5 });
    clips.forEach((v) => vio.observe(v));
  }
  document.querySelectorAll(".clip__sound").forEach((btn) => btn.addEventListener("click", () => {
    const video = btn.parentElement.querySelector("video");
    const on = video.muted;
    // Un solo video con sonido a la vez
    if (on) clips.forEach((v) => { if (v !== video) { v.muted = true; v.parentElement.querySelector(".clip__sound").setAttribute("aria-pressed", "false"); } });
    video.muted = !on;
    if (on) video.play().catch(() => {});
    btn.setAttribute("aria-pressed", String(on));
    btn.setAttribute("aria-label", on ? "Silenciar" : "Activar sonido");
  }));

  // Formulario → WhatsApp con el mensaje armado
  const form = document.getElementById("quote-form");
  const error = document.getElementById("form-error");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const nombre = (data.get("nombre") || "").trim();
    const nameInput = form.elements.nombre;
    if (!nombre) {
      error.hidden = false;
      nameInput.setAttribute("aria-invalid", "true");
      nameInput.focus();
      return;
    }
    error.hidden = true;
    nameInput.removeAttribute("aria-invalid");

    const zona = (data.get("zona") || "").trim();
    const tipos = data.getAll("tipo");
    const mensaje = (data.get("mensaje") || "").trim();
    const lines = [
      `Hola! Soy ${nombre}${zona ? ` de ${zona}` : ""}.`,
      tipos.length ? `Quiero pedir presupuesto para: ${tipos.join(", ")}.` : "Quiero pedir un presupuesto.",
      mensaje,
    ].filter(Boolean);
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`, "_blank", "noopener");
  });
})();
