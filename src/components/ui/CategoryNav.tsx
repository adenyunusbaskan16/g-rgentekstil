"use client";

interface Category {
  id: string;
  slug: string;
  name_tr: string;
}

export default function CategoryNav({ categories }: { categories: Category[] }) {
  function scrollToCategory(slug: string) {
    const el = document.getElementById(slug);
    if (!el) return;
    const offset = 80; // sticky header yüksekliği
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
  }

  return (
    <div className="cat-sticky-nav">
      <div className="cat-sticky-nav-inner">
        <div style={{ display: "flex", minWidth: "max-content" }}>
          {categories.map((c) => (
            <button
              key={c.slug}
              onClick={() => scrollToCategory(c.slug)}
              className="cat-sticky-nav-item"
              style={{ background: "none", border: "none", cursor: "pointer" }}
            >
              {c.name_tr}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
