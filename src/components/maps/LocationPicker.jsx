import { useState } from "react";
import { Crosshair, MapPin } from "lucide-react";
import MapView from "./MapView";
import Button from "../common/Button";
import { Input } from "../common/Field";

const DEFAULT = { lat: 21.1458, lng: 79.0882 };

/**
 * Reusable location selector: map click, current location, and lat/lng display.
 * value: { lat, lng, address }
 */
export default function LocationPicker({ value, onChange, error }) {
  const [locating, setLocating] = useState(false);
  const [geoError, setGeoError] = useState("");
  const point = { lat: value?.lat ?? DEFAULT.lat, lng: value?.lng ?? DEFAULT.lng };

  const select = (next) => onChange?.({ ...value, ...next });

  const useCurrentLocation = () => {
    if (!navigator.geolocation) {
      setGeoError("Location is not supported by this browser.");
      return;
    }
    setLocating(true);
    setGeoError("");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        select({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setLocating(false);
      },
      () => {
        setGeoError("Could not get your location. Select it on the map instead.");
        setLocating(false);
      },
      { enableHighAccuracy: true, timeout: 10000 },
    );
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" aria-hidden="true" />
          Tap the map to place the marker
        </p>
        <Button type="button" variant="outline" size="sm" loading={locating} onClick={useCurrentLocation}>
          <Crosshair className="h-4 w-4" aria-hidden="true" />
          Use current location
        </Button>
      </div>

      <MapView lat={point.lat} lng={point.lng} onSelect={select} height={300} />

      <div className="grid gap-3 sm:grid-cols-2">
        <Input id="lat" label="Latitude" value={point.lat.toFixed(6)} readOnly />
        <Input id="lng" label="Longitude" value={point.lng.toFixed(6)} readOnly />
      </div>
      <Input
        id="address"
        label="Address / landmark"
        placeholder="e.g. Near Shivaji Chowk, Ward 12"
        value={value?.address || ""}
        onChange={(e) => select({ address: e.target.value })}
        error={error}
      />
      {geoError && (
        <p role="alert" className="text-xs text-destructive">
          {geoError}
        </p>
      )}
    </div>
  );
}
