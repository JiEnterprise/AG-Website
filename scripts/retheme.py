"""
Apple-aligned retheme for AurumGlobal public pages.
Run from project root: python3 scripts/retheme.py
"""
import os, re, pathlib

ROOT = pathlib.Path(__file__).parent.parent / "src"

# Files to process: all TSX under app/ (except advisor/api) and components/
def get_files():
    files = []
    for d in ["app", "components"]:
        for f in (ROOT / d).rglob("*.tsx"):
            rel = str(f.relative_to(ROOT / d))
            if "advisor" in rel.split("/") or "api" in rel.split("/"):
                continue
            files.append(f)
    return files

# --- Ordered replacements (most specific first to avoid double-replacing) ---
REPLACEMENTS = [
    # Hero radial gradient overlays: gold glow → subtle Apple indigo glow
    (
        "radial-gradient(circle at 20% 50%, #C9A84C 0%, transparent 50%), radial-gradient(circle at 80% 20%, #C9A84C 0%, transparent 40%)",
        "radial-gradient(circle at 30% 40%, rgba(120,119,198,0.07) 0%, transparent 60%), radial-gradient(circle at 80% 20%, rgba(120,119,198,0.05) 0%, transparent 50%)"
    ),
    # Bento radial bg
    (
        "rgba(201,168,76,0.08),transparent_42%),radial-gradient(circle_at_80%_80%,rgba(201,168,76,0.05),transparent_36%)]",
        "rgba(120,119,198,0.05),transparent_42%),radial-gradient(circle_at_80%_80%,rgba(120,119,198,0.03),transparent_36%)]"
    ),

    # ── Dark warm card/section backgrounds → Apple glass ──────────────────
    ("rgba(17,17,20,0.7)",  "rgba(255,255,255,0.05)"),
    ("rgba(17,17,20,0.6)",  "rgba(255,255,255,0.04)"),
    ("rgba(17,17,20,0.5)",  "rgba(255,255,255,0.04)"),
    ("rgba(26,26,30,0.7)",  "rgba(255,255,255,0.05)"),
    ("rgba(26,26,30,0.55)", "rgba(255,255,255,0.04)"),

    # ── Nav glass backgrounds ──────────────────────────────────────────────
    ("rgba(8,8,10,0.97)",   "rgba(0,0,0,0.88)"),
    ("rgba(8,8,10,0.92)",   "rgba(0,0,0,0.84)"),
    ("rgba(8,8,10,0.92),rgba(8,8,10,0.72)", "rgba(0,0,0,0.84),rgba(0,0,0,0.65)"),
    ("rgba(8,8,10,0.75)",   "rgba(0,0,0,0.75)"),
    ("rgba(7,7,10,0.88)",   "rgba(0,0,0,0.84)"),
    ("rgba(7,7,10,0.55)",   "rgba(0,0,0,0.55)"),
    ("rgba(7,7,10,0.45)",   "rgba(0,0,0,0.45)"),

    # ── Gold borders → white glass borders (most opaque first) ────────────
    ("rgba(201,168,76,0.4)",  "rgba(255,255,255,0.25)"),
    ("rgba(201,168,76,0.35)", "rgba(255,255,255,0.22)"),
    ("rgba(201,168,76,0.32)", "rgba(255,255,255,0.20)"),
    ("rgba(201,168,76,0.3)",  "rgba(255,255,255,0.18)"),
    ("rgba(201,168,76,0.28)", "rgba(255,255,255,0.18)"),
    ("rgba(201,168,76,0.25)", "rgba(255,255,255,0.16)"),
    ("rgba(201,168,76,0.24)", "rgba(255,255,255,0.15)"),
    ("rgba(201,168,76,0.2)",  "rgba(255,255,255,0.13)"),
    ("rgba(201,168,76,0.18)", "rgba(255,255,255,0.12)"),
    ("rgba(201,168,76,0.16)", "rgba(255,255,255,0.11)"),
    ("rgba(201,168,76,0.14)", "rgba(255,255,255,0.09)"),
    ("rgba(201,168,76,0.12)", "rgba(255,255,255,0.09)"),
    ("rgba(201,168,76,0.1)",  "rgba(255,255,255,0.09)"),
    ("rgba(201,168,76,0.08)", "rgba(255,255,255,0.07)"),
    ("rgba(201,168,76,0.07)", "rgba(255,255,255,0.06)"),
    ("rgba(201,168,76,0.06)", "rgba(255,255,255,0.05)"),

    # ── Text: warm tones → Apple gray hierarchy ───────────────────────────
    ("#C8BEA8", "#F5F5F7"),   # near-white body text
    ("#C8BFA8", "#F5F5F7"),
    ("#C8B8A8", "#F5F5F7"),
    ("#E8DDD0", "#F5F5F7"),
    ("#E2DDD4", "#F5F5F7"),
    ("#B8AE99", "#86868B"),   # Apple secondary text
    ("#8A8070", "#86868B"),
    ("#8A7050", "#86868B"),
    ("#7A7060", "#86868B"),
    ("#6A5E50", "#6E6E73"),   # Apple tertiary text
    ("#5A5040", "#6E6E73"),
    ("#4A4438", "#6E6E73"),
    ("#4A4030", "#6E6E73"),
    ("#3A3328", "#6E6E73"),

    # ── Warm dark backgrounds → pure Apple black ──────────────────────────
    ("#0A0900", "#000000"),
    ("#0D0C08", "#000000"),
    ("#08080A", "#000000"),
    ("#07070A", "#000000"),
    ("#111110", "#111111"),
    ("#111115", "#111111"),
    ("#1A1600", "#1C1C1E"),   # Apple elevated dark surface
    ("#5C4620", "#1C1C1E"),

    # ── CTA button text on gold background ────────────────────────────────
    ("#0A0800", "#000000"),

    # ── Image placeholder gradients (warm → Apple neutral dark) ──────────
    ("from-[#1A1810]", "from-[#1C1C1E]"),
]

def apply(content: str) -> str:
    for old, new in REPLACEMENTS:
        content = content.replace(old, new)
    return content

def main():
    files = get_files()
    changed = 0
    for f in files:
        original = f.read_text(encoding="utf-8")
        updated  = apply(original)
        if updated != original:
            f.write_text(updated, encoding="utf-8")
            changed += 1
            print(f"  updated: {f.relative_to(ROOT.parent)}")
    print(f"\nDone — {changed}/{len(files)} files updated.")

if __name__ == "__main__":
    main()
