import Image from "next/image";
import { Package, Ruler, Weight, Palette, CheckCircle } from "lucide-react";
import type { Product } from "@/types";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  lang?: "tr" | "en";
}

export default function ProductCard({ product, lang = "tr" }: ProductCardProps) {
  const isEn = lang === "en";
  const name = isEn ? product.name_en : product.name_tr;
  const description = isEn ? product.description_en : product.description_tr;
  const imageAlt = isEn ? product.image_alt_en : product.image_alt_tr;

  return (
    <article className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg hover:border-gray-300 transition-all duration-300 flex flex-col">
      {/* Görsel alanı */}
      <div className="relative aspect-[4/3] bg-gray-50 overflow-hidden">
        {product.image_url ? (
          <Image
            src={product.image_url}
            alt={imageAlt ?? name}
            fill
            className="object-cover transition-transform duration-500 hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-300">
            <Package size={48} strokeWidth={1} />
            <span className="text-xs mt-2 text-gray-400">
              {isEn ? "Image coming soon" : "Görsel yakında"}
            </span>
          </div>
        )}

        {/* Stok badge */}
        {product.is_stock_available && (
          <span className="absolute top-3 left-3 inline-flex items-center gap-1 px-2.5 py-1 bg-green-600 text-white text-xs font-semibold rounded-full">
            <CheckCircle size={11} />
            {isEn ? "In Stock" : "Stokta"}
          </span>
        )}

        {/* Özel üretim badge */}
        {product.is_custom_order && (
          <span className="absolute top-3 right-3 inline-flex items-center gap-1 px-2.5 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full">
            {isEn ? "Custom Order" : "Özel Sipariş"}
          </span>
        )}
      </div>

      {/* İçerik */}
      <div className="flex flex-col flex-1 p-5">
        {/* Kategori etiketi */}
        {product.category && (
          <span className="text-xs font-medium text-blue-600 uppercase tracking-wider mb-1">
            {isEn ? product.category.name_en : product.category.name_tr}
          </span>
        )}

        {/* Ürün adı */}
        <h3 className="text-base font-bold text-[#1a2744] mb-2 leading-snug">{name}</h3>

        {/* Açıklama */}
        {description && (
          <p className="text-sm text-gray-500 mb-4 leading-relaxed line-clamp-2">{description}</p>
        )}

        {/* Özellik satırları */}
        <div className="mt-auto space-y-2">
          {product.size && (
            <div className="flex items-center gap-2 text-sm">
              <Ruler size={15} className="text-gray-400 shrink-0" />
              <span className="text-gray-500">{isEn ? "Size:" : "Ebat:"}</span>
              <span className="font-semibold text-gray-800">{product.size}</span>
            </div>
          )}

          {product.weight_label && (
            <div className="flex items-center gap-2 text-sm">
              <Weight size={15} className="text-gray-400 shrink-0" />
              <span className="text-gray-500">{isEn ? "Weight:" : "Gramaj:"}</span>
              <span className="font-semibold text-gray-800">{product.weight_label}</span>
            </div>
          )}

          {product.sale_unit && (
            <div className="flex items-center gap-2 text-sm">
              <Package size={15} className="text-gray-400 shrink-0" />
              <span className="text-gray-500">{isEn ? "Unit:" : "Satış Birimi:"}</span>
              <span className="font-semibold text-gray-800">{product.sale_unit}</span>
            </div>
          )}

          {/* Renk seçenekleri */}
          {product.color_options && product.color_options.length > 0 && (
            <div className="flex items-start gap-2 text-sm pt-1">
              <Palette size={15} className="text-gray-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-gray-500 mr-1">
                  {isEn ? "Colors:" : "Renkler:"}
                </span>
                <span className="text-gray-700">
                  {product.color_options.slice(0, 4).join(", ")}
                  {product.color_options.length > 4 && (
                    <span className="text-gray-400 text-xs ml-1">
                      +{product.color_options.length - 4} {isEn ? "more" : "daha"}
                    </span>
                  )}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
