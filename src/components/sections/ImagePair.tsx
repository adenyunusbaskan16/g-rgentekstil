import Image from "next/image";

/** Sade iki görsellik bölüm: biri geniş, biri dar; yuvarlatılmış köşeler. */
export default function ImagePair({
  a,
  b,
  background = "#fff",
}: {
  a: { src: string; alt: string };
  b: { src: string; alt: string };
  background?: string;
}) {
  return (
    <section className="sec-sm" style={{ background }}>
      <div className="wrap">
        <div className="img-pair">
          <div className="img-pair-item img-pair-wide">
            <Image src={a.src} alt={a.alt} fill style={{ objectFit: "cover" }} sizes="(max-width:1024px)100vw,60vw" quality={80} />
          </div>
          <div className="img-pair-item">
            <Image src={b.src} alt={b.alt} fill style={{ objectFit: "cover" }} sizes="(max-width:1024px)100vw,40vw" quality={80} />
          </div>
        </div>
      </div>
    </section>
  );
}
