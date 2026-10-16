import Link from "next/link";
import Image from "next/image";

export interface Tile {
  key: string;
  href: string;
  name: string;
  meta?: string;
  image: string;
  alt: string;
  code?: string;
  codeLabel?: string;
}

/**
 * Ana sayfa için sade, küçük kart ızgarası. Kartın tamamı tıklanabilir ve
 * ilgili ürün/sayfaya gider; detaylar (renk, birim, teklif) detay sayfasında.
 */
export default function CompactTiles({ tiles }: { tiles: Tile[] }) {
  return (
    <div className="tiles">
      {tiles.map((t) => (
        <Link key={t.key} href={t.href} className="tile">
          <div className="tile-img">
            <Image src={t.image} alt={t.alt} fill style={{ objectFit: "cover" }} sizes="(max-width:640px)50vw,(max-width:1024px)33vw,200px" quality={70} />
            {t.code && <span className="code-badge">{t.codeLabel ?? "Kod"} {t.code}</span>}
          </div>
          <div className="tile-body">
            <p className="tile-name">{t.name}</p>
            {t.meta && <p className="tile-meta">{t.meta}</p>}
          </div>
        </Link>
      ))}
    </div>
  );
}
