function toggleSubMenu() {
  document.getElementById("sub-menu").classList.toggle("visible");
}

function filterPkgs() {
  const q = document.getElementById("search").value.toLowerCase().trim();
  const cards = document.querySelectorAll(".pkg-card");
  let visible = 0;
  cards.forEach(card => {
    const match = !q || (card.dataset.name || "").includes(q);
    card.style.display = match ? "" : "none";
    if (match) visible++;
  });
  document.getElementById("visible-count").textContent = visible;
  const empty = document.getElementById("empty-state");
  if (visible === 0) {
    empty.style.display = "block";
    document.getElementById("empty-query").textContent = q;
  } else {
    empty.style.display = "none";
  }
}

function copyCmd(btn, text) {
  navigator.clipboard.writeText(text).then(() => {
    btn.classList.add("copied");
    btn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>';
    setTimeout(() => {
      btn.classList.remove("copied");
      btn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>';
    }, 1800);
  });
}

function switchTab(e, id) {
  const wrapper = e.target.closest('.tab-wrapper');
  wrapper.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  wrapper.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
  e.target.classList.add('active');
  wrapper.querySelector('#tab-' + id).classList.add('active');
}

document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('.doc-section');
  if (!sections.length) return;
  const sideLinks = document.querySelectorAll('.sidebar nav a');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        sideLinks.forEach(a => a.classList.remove('active'));
        const link = document.querySelector('.sidebar nav a[href="#' + entry.target.id + '"]');
        if (link) link.classList.add('active');
      }
    });
  }, { rootMargin: '-30% 0px -60% 0px' });
  sections.forEach(s => observer.observe(s));
});
