/* eslint-disable @next/next/no-img-element -- açılış animasyonu saf CSS; next/image gerekmez */
/**
 * Ana sayfa açılış animasyonu (~2,2 sn), beyaz zemin, GTS logosu.
 * Koreografi: ağaç alttan yukarı "büyür" → zemin çizgisi ortadan iki yana
 * çizilir → GTS harfleri bulanıklıktan netleşerek yükselir → alt yazı harf
 * aralığı daralarak belirir → perde yukarı kayarak siteyi açar.
 * Saf CSS: sunucudan gelen HTML ile her yüklemede (F5 dahil) oynar.
 */
export default function SplashIntro() {
  return (
    <div className="splash" aria-hidden>
      <div className="splash-stage">
        <img src="/brand/splash-tree.webp" alt="" width={962} height={520} className="splash-tree" fetchPriority="high" />
        <span className="splash-ground" />
        <img src="/brand/splash-gts.webp" alt="" width={495} height={150} className="splash-gts" />
        <img src="/brand/splash-sub.webp" alt="" width={636} height={44} className="splash-sub" />
      </div>
    </div>
  );
}
