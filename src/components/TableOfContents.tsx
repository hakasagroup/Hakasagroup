"use client";

import { useEffect, useState } from "react";

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

export default function TableOfContents({ content }: { content: string }) {
  const [headings, setHeadings] = useState<TOCItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const articleContent = document.getElementById("article-content");
      if (!articleContent) return;

      const elements = Array.from(articleContent.querySelectorAll("h2, h3"));
      const tocItems: TOCItem[] = elements.map((element, index) => {
        if (!element.id) {
          element.id = `heading-${index}`;
        }

        return {
          id: element.id,
          text: element.textContent || "",
          level: element.tagName.toLowerCase() === "h2" ? 2 : 3,
        };
      });

      setHeadings(tocItems);
    }, 100);

    return () => clearTimeout(timer);
  }, [content]);

  if (headings.length === 0) return null;

  return (
    <div className="mb-8 overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between bg-slate-100 px-6 py-4 text-left transition-colors hover:bg-slate-200"
        type="button"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-slate-800">📋 Daftar Isi</span>
        </div>
        <span
          className={`transform text-slate-500 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          aria-hidden="true"
        >
          ▼
        </span>
      </button>

      {isOpen && (
        <div className="border-t border-slate-200 px-6 py-4">
          <ul className="space-y-3 text-sm">
            {headings.map((heading) => (
              <li
                key={heading.id}
                className={`${heading.level === 3 ? "ml-6" : ""} font-medium text-slate-700`}
              >
                <a
                  href={`#${heading.id}`}
                  className="block py-1 transition-colors hover:text-blue-600"
                >
                  {heading.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}