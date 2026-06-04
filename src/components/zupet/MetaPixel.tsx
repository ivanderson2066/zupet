import { useEffect } from "react";

const PIXEL_ID = import.meta.env.VITE_META_PIXEL_ID as string | undefined;

export function MetaPixel() {
  useEffect(() => {
    if (!PIXEL_ID || typeof window === "undefined") return;
    if ((window as unknown as { fbq?: unknown }).fbq) return;

    /* eslint-disable */
    (function (f: any, b: any, e: any, v: any, n?: any, t?: any, s?: any) {
      if (f.fbq) return;
      n = f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = !0;
      n.version = "2.0";
      n.queue = [];
      t = b.createElement(e);
      t.async = !0;
      t.src = v;
      s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s);
    })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
    /* eslint-enable */

    const w = window as unknown as { fbq: (...args: unknown[]) => void };
    w.fbq("init", PIXEL_ID);
    w.fbq("track", "PageView");
  }, []);

  if (!PIXEL_ID) return null;
  return (
    <noscript>
      <img
        height="1"
        width="1"
        style={{ display: "none" }}
        alt=""
        src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
      />
    </noscript>
  );
}
