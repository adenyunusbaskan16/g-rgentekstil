/**
 * Ana sayfa açılış animasyonu (yaklaşık 2 sn).
 * Saf CSS — JavaScript'e bağlı değil; sayfa her yüklendiğinde (F5 dahil)
 * sunucudan gelen HTML ile birlikte oynar ve kendiliğinden kaybolur.
 * İçerik HTML'de olduğu için arama motorları etkilenmez.
 */
export default function SplashIntro() {
  return (
    <div className="splash" aria-hidden>
      <div className="splash-inner">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/brand/logo-text-splash.webp"
          alt=""
          width={782}
          height={640}
          className="splash-logo"
          fetchPriority="high"
        />
        <span className="splash-line" />
      </div>
    </div>
  );
}
