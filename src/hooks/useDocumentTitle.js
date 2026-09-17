import { useEffect } from "react";

/** Sets the browser tab title for a page. */
export default function useDocumentTitle(title) {
  useEffect(() => {
    if (title) document.title = title;
  }, [title]);
}
