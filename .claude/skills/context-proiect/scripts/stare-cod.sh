#!/usr/bin/env bash
# Colecteaza starea reala a codului, ca verificarea sa se bazeze pe fapte, nu pe presupuneri.
# Utilizare: bash .claude/skills/context-proiect/scripts/stare-cod.sh [radacina-repo]
# Nu modifica nimic; doar citeste.

ROOT="${1:-$(git rev-parse --show-toplevel 2>/dev/null || pwd)}"
cd "$ROOT" || exit 1

section() { printf '\n===== %s =====\n' "$1"; }

section "GIT"
echo "branch: $(git branch --show-current 2>/dev/null)"
git log --oneline -15 2>/dev/null
echo "modificari necomise:"; git status --short 2>/dev/null | head -30

section "MODULE (src/modules)"
if [ -d src/modules ]; then
  for m in src/modules/*/; do
    echo "- $(basename "$m"): $(ls "$m" | tr '\n' ' ')"
  done
else
  echo "(lipseste src/modules)"
fi

section "RUTE MONTATE (src/app.ts)"
grep -nE "app\.use\(['\"]/api" src/app.ts 2>/dev/null || echo "(niciuna)"

section "ENDPOINT-URI DEFINITE"
grep -rnE "\.(get|post|put|patch|delete)\(['\"]" src/modules 2>/dev/null | sed 's/^/  /' || echo "(niciunul)"

section "MODELE PRISMA"
grep -nE "^(model|enum) " prisma/schema.prisma 2>/dev/null || echo "(niciun model)"
echo "migratii:"; ls prisma/migrations 2>/dev/null | grep -v lock || echo "  (nicio migratie)"

section "TESTE"
for f in $(find tests src -name '*.test.ts' 2>/dev/null); do
  echo "- $f: $(grep -cE "^\s*(it|test)\(" "$f") teste"
done

section "DEPENDENTE (package.json)"
node -e "const p=require('./package.json');console.log('deps:',Object.keys(p.dependencies||{}).join(', '));console.log('dev:',Object.keys(p.devDependencies||{}).join(', '))" 2>/dev/null

section "PLANUL DIN README (bife)"
grep -nE "^\s*- \[( |x)\]" README.md 2>/dev/null || echo "(fara lista de etape)"

section "DOCUMENTATIE"
for f in $(find docs -type f 2>/dev/null | sort); do
  d=$(git log -1 --format=%cs -- "$f" 2>/dev/null); echo "- $f  (ultimul commit: ${d:-necomis})"
done

section "DECIZII INREGISTRATE (docs/decizii.md)"
grep -nE "^### D[0-9]+" docs/decizii.md 2>/dev/null || echo "(niciuna)"

section "FRONTEND"
if [ -d ../licenta-frontend ]; then
  echo "repo licenta-frontend prezent in ../licenta-frontend"
  (cd ../licenta-frontend && git log --oneline -5 2>/dev/null; ls src 2>/dev/null | head -30)
else
  echo "(repo-ul licenta-frontend nu este clonat langa acest repo)"
fi
