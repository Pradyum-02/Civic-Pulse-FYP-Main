import { Suspense, lazy, useEffect, useState } from "react";

const LeafletMap = lazy(() => import("./LeafletMap"));

function MapSkeleton({ height }) {
  return (
    <div
      className="flex items-center justify-center rounded-xl border border-border bg-muted text-sm text-muted-foreground"
      style={{ height }}
    >
      Loading map…
    </div>
  );
}

/** Renders Leaflet only in the browser. */
export default function MapView({ lat, lng, onSelect, interactive = true, height = 320, zoom = 15 }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return <MapSkeleton height={height} />;

  return (
    <div className="overflow-hidden rounded-xl border border-border" style={{ height }}>
      <Suspense fallback={<MapSkeleton height={height} />}>
        <LeafletMap lat={lat} lng={lng} onSelect={onSelect} interactive={interactive} zoom={zoom} />
      </Suspense>
    </div>
  );
}
