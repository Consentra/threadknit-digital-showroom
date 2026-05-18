# ThreadKnit — Catalog Management (cPanel Guide)

The site loads its catalog from a single static JSON file. No database, no
backend, no login. Edit the file, refresh the site, done.

## File layout on cPanel (public_html)

```
public_html/
├── index.html
├── assets/
├── catalog.json    ← edit this
└── uploads/        ← put product images here
```

## How to add / edit a product

1. **cPanel → File Manager → public_html**.
2. Upload images into `/uploads`.
3. Edit `catalog.json`.
4. Add or change an entry in the `"products"` array.
5. Save → refresh the website.

## Product schema (clean & minimal)

```json
{
  "id": "M001",
  "name": "Classic Polo Shirt",
  "image": "/uploads/mens-polo.jpg",
  "type": "Knit",
  "category": "mens",
  "fabric": "100% Cotton Pique · 220 GSM",
  "color": "Navy / White",
  "print": "Embroidery",
  "tags": ["Classic"]
}
```

### Field reference

| Field | Required | Drives | Notes |
|-------|----------|--------|-------|
| `id` | Yes | internal | Must be unique. |
| `name` | Yes | **Product Name** under image | |
| `image` | Yes | card image | Must start with `/uploads/`. |
| `type` | Yes | **Product Type badge** + filter | One of `"Knit"`, `"Woven"`, `"Leather"`, `"Sweater"`, `"Lingerie"`. |
| `category` | Yes | **Wear Category** | `"ladies"` (Women's), `"mens"` (Men's), `"children"` (Kid's). |
| `fabric` | Yes | Technical Specs → Fabrication | Include GSM in the same string, e.g. `"100% Cotton · 220 GSM"`. |
| `color` | Optional | Technical Specs → Color | Set to `"none"` to hide. |
| `print` | Optional | Technical Specs → Print | Set to `"none"` to hide. |
| `tags` | Optional | search index only | Array of strings. |

### Hiding the Color or Print row

```json
{ "color": "none", "print": "none" }
```

### How the card behaves

- Top-left badge shows the **type** (Knit / Woven / Leather / Sweater / Lingerie).
- Clicking the image (or the eye icon) opens the **Technical Specs** overlay.
- Empty / `"none"` values for color or print are automatically hidden.
- Below the image only the **Product Name** and **Wear Category** are shown.

### Legacy fields (still accepted)

`fabrications`, `printEffect`, `gsm`, `subcategory`, `description` from older
catalogs continue to work — the loader normalizes them. New entries should use
the clean schema above.

## Rules

- `id` must be unique.
- `image` must start with `/uploads/` and match a real file.
- Keep the JSON valid (no trailing commas). Use jsonlint.com if unsure.

## Pagination

The catalog page shows 12 products at a time with a **Load More** button.

## Safety

- Missing or invalid `catalog.json` shows a friendly message instead of crashing.
- The file is fetched with `cache: no-store` so edits appear on the next refresh.
