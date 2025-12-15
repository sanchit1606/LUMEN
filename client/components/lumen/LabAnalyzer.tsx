import React, { useState } from "react";

export interface ResultItem {
  key: string;
  value: string;
  status: "low" | "high" | "normal" | "unknown";
}

export interface AnalyzeResponse {
  fields?: Record<string, string>;
  items?: ResultItem[];
  severity?: "green" | "yellow" | "red";
  summary?: string;
  error?: string;
  details?: string;
  note?: string;
}

export default function LabAnalyzer({
  onResult,
}: {
  onResult?: (data: AnalyzeResponse) => void;
} = {}) {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<AnalyzeResponse | null>(null);
  const [err, setErr] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;
    const allowed = [
      "image/png",
      "image/jpeg",
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (!allowed.includes(file.type)) {
      setErr("Please upload PNG/JPEG, PDF, or DOC/DOCX.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setErr("File too large. Keep it under 5MB.");
      return;
    }
    setLoading(true);
    setErr(null);
    setData(null);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/lab/analyze", {
        method: "POST",
        body: fd,
        headers: { Accept: "application/json" },
        cache: "no-store",
      });
      let json: AnalyzeResponse | null = null;
      try {
        json = (await res.json()) as AnalyzeResponse;
      } catch {
        json = null;
      }
      if (!res.ok) {
        setErr(
          `${json?.error || `Upload failed (HTTP ${res.status})`} ${json?.details ? `— ${json.details}` : ""}`,
        );
      } else {
        const payload = json || { error: "Empty response" };
        setData(payload);
        if (payload && !payload.error) {
          onResult?.(payload);
        }
      }
    } catch (e: any) {
      setErr(e?.message || String(e));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <style>{`
        /* CTA button styling aligned with PEARL reconstruction button */
        .cta-btn {
          height: 46px;
          width: 220px;
          position: relative;
          background-color: transparent;
          cursor: pointer;
          border: 2px solid #252525;
          overflow: hidden;
          border-radius: 30px;
          color: #333;
          transition: all 0.5s ease-in-out;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
        }
        .cta-btn .btn-txt {
          z-index: 1;
          font-weight: 800;
          letter-spacing: 2px;
          font-size: 0.85rem;
          text-transform: uppercase;
        }
        .cta-btn.type1::after {
          content: "";
          position: absolute;
          left: 0;
          top: 0;
          transition: all 0.5s ease-in-out;
          background-color: #333;
          border-radius: 30px;
          visibility: hidden;
          height: 10px;
          width: 10px;
          z-index: -1;
        }
        .cta-btn:hover {
          box-shadow: 1px 1px 200px #252525;
          color: #fff;
          border: none;
        }
        .cta-btn.type1:hover::after {
          visibility: visible;
          transform: scale(100) translateX(2px);
        }
      `}</style>
      <form onSubmit={onSubmit} className="space-y-4">
        <label className="mt-1 grid place-items-center h-64 w-[26rem] sm:h-72 sm:w-[30rem] mx-auto rounded-xl border-2 border-dashed border-brand-blue/40 bg-secondary cursor-pointer text-center px-4">
          <input
            type="file"
            accept="image/png,image/jpeg,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            className="hidden"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
          <span className="text-sm">
            {file
              ? file.name
              : "Click to choose PNG / JPEG / PDF / DOC / DOCX"}
          </span>
        </label>
        <p className="text-xs text-muted-foreground text-center">
          Using Donut (DocVQA) on Hugging Face — free to use. Keep files ≤5MB. If a 502 occurs, wait and retry.
        </p>
        <div className="flex gap-2 justify-center">
          <button disabled={!file || loading} className="cta-btn type1 disabled:opacity-50">
            <span className="btn-txt">{loading ? "Analyzing…" : "Analyze"}</span>
          </button>
          {file && (
            <button
              type="button"
              onClick={() => setFile(null)}
              className="px-4 py-2 rounded-lg border bg-background font-semibold hover:bg-accent"
            >
              Clear
            </button>
          )}
        </div>
      </form>

      {err && <p className="mt-3 text-sm text-red-600">{err}</p>}

      {data && (
        <div className="mt-4 space-y-3">
          {data.summary && (
            <div
              className={`rounded-lg p-3 text-sm ${data.severity === "red" ? "bg-red-50 text-red-700" : data.severity === "yellow" ? "bg-amber-50 text-amber-700" : "bg-emerald-50 text-emerald-700"}`}
            >
              {data.summary}
            </div>
          )}
          {data.items && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
              {data.items.map((i) => (
                <div
                  key={i.key}
                  className="rounded-lg bg-white p-3 shadow-sm border"
                >
                  <div className="flex items-center justify-between">
                    <div className="font-medium">{i.key}</div>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${i.status === "normal" ? "bg-emerald-100 text-emerald-700" : i.status === "low" ? "bg-amber-100 text-amber-700" : i.status === "high" ? "bg-red-100 text-red-700" : "bg-gray-100 text-gray-700"}`}
                    >
                      {i.status}
                    </span>
                  </div>
                  <div className="text-muted-foreground">{i.value}</div>
                </div>
              ))}
            </div>
          )}
          {data.note && (
            <p className="text-xs text-muted-foreground">{data.note}</p>
          )}
        </div>
      )}
    </div>
  );
}
