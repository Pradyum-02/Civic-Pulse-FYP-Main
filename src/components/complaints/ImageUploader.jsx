import { useRef } from "react";
import { ImagePlus, Trash2 } from "lucide-react";
import Button from "../common/Button";

export default function ImageUploader({ preview, onSelect, onRemove, error }) {
  const inputRef = useRef(null);

  const handleChange = (e) => {
    const file = e.target.files?.[0];
    if (file) onSelect?.(file, URL.createObjectURL(file));
  };

  return (
    <div>
      <input
        ref={inputRef}
        id="issue-image"
        type="file"
        accept="image/*"
        className="sr-only"
        onChange={handleChange}
      />
      {preview ? (
        <div className="overflow-hidden rounded-xl border border-border">
          <img src={preview} alt="Selected issue preview" className="h-56 w-full object-cover" />
          <div className="flex justify-end gap-2 border-t border-border bg-card p-3">
            <Button type="button" variant="outline" size="sm" onClick={() => inputRef.current?.click()}>
              Replace
            </Button>
            <Button type="button" variant="ghost" size="sm" onClick={onRemove}>
              <Trash2 className="h-4 w-4" aria-hidden="true" />
              Remove
            </Button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="flex w-full flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border bg-secondary/40 px-4 py-10 text-sm text-muted-foreground transition-colors hover:border-primary/60 hover:text-foreground"
        >
          <ImagePlus className="h-6 w-6" aria-hidden="true" />
          Upload a photo of the issue
          <span className="text-xs">JPG or PNG, up to 5 MB</span>
        </button>
      )}
      {error && (
        <p role="alert" className="mt-1.5 text-xs text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
