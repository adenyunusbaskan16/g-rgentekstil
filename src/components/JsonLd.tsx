/**
 * JSON-LD Structured Data Component
 * Güvenli şekilde schema.org verilerini sayfaya enjekte eder.
 * Server Component — client JS gerektirmez.
 */
export function JsonLd({
  data,
}: {
  data: Record<string, unknown> | Record<string, unknown>[];
}) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
