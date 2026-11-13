"use client";
import { useEffect, useState } from "react";
import { reduce } from "@/components/Extras";

/** Types and erases a rotating list of focus areas. Server render shows the first one, so there is no layout jump. */
export default function Typer({ words }: { words: string[] }) {
  const [i, setI] = useState(0); const [n, setN] = useState(words[0].length); const [del, setDel] = useState(false);
  useEffect(() => {
    if (reduce()) return;
    const w = words[i]; let t: ReturnType<typeof setTimeout>;
    if (!del && n < w.length) t = setTimeout(() => setN(n + 1), 70);
    else if (!del) t = setTimeout(() => setDel(true), 1600);
    else if (n > 0) t = setTimeout(() => setN(n - 1), 35);
    else { setDel(false); setI((i + 1) % words.length); }
    return () => clearTimeout(t);
  }, [n, del, i, words]);
  return <p className="typer" aria-label={"Focus areas: " + words.join(", ")}><span className="pr">&gt;</span> <span aria-hidden="true">{words[i].slice(0, n)}</span><i className="caret" aria-hidden="true" /></p>;
}
