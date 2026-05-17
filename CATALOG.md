# ThreadKnit — Catalog Management (cPanel Guide)

The website loads its catalog from a single static JSON file. No database,
no backend, no login. Edit the file, refresh the site, done.

## File layout on cPanel (public_html)

```
public_html/
├── index.html               ← built React app
├── assets/                  ← built JS/CSS
├── catalog.json             ← EDIT THIS to manage products
└── uploads/                 ← put product images here
    ├── ladies-tshirt.jpg
    ├── mens-polo.jpg
    └── ...
```

## How to deploy

1. Run `npm run build` locally. Upload everything inside `dist/` to
   `public_html/` via cPanel File Manager (or FTP).
2. The build already includes `catalog.json` and the `uploads/` folder, so
   the site works out of the box.

## How to add / edit / remove products

1. Open **cPanel → File Manager → public_html**.
2. (Optional) Upload new images into the `/uploads` folder.
3. Right-click `catalog.json` → **Edit**.
4. Add, edit, or remove items inside the `"products"` array.
5. Save. Refresh the website — changes appear immediately.

### Product schema

```json
{
  "id": "M008",
  "name": "Classic Polo Shirt",
  "category": "mens",
  "fabrications": ["Knit"],
  "fabric": "100% Cotton Pique",
  "gsm": "220 GSM",
  "color": "Navy / White",
  "printEffect": "Embroidery",
  "image": "/uploads/my-new-photo.jpg",
  "subcategory": "Polo Shirts",
  "description": "Optional short description.",
  "tags": ["Pique", "Classic"]
}
```

### Field reference (drives the catalog card)

| Field | Required | Drives | Notes |
|-------|----------|--------|-------|
| `id` | Yes | internal | Must be unique. |
| `name` | Yes | **Product Name** under image | Shown as the card title. |
| `category` | Yes | **Wear Category** under image | One of `"ladies"` (Women's Wear), `"mens"` (Men's Wear), `"children"` (Kid's Wear). |
| `fabrications` | Recommended | **Product Type** badge on image + filter | Array. First item is shown on the card. Allowed: `"Knit"`, `"Woven"`, `"Leather"`, `"Sweater"`, `"Lingerie"`. Defaults to `["Knit"]` if omitted. |
| `fabric` | Yes | Technical Specs → Fabrication | e.g. `"100% Cotton Pique"`. |
| `gsm` | Optional | Appended to Fabrication | e.g. `"220 GSM"`. |
| `color` | Optional | Technical Specs → Color | Set to `"none"` to hide the Color row. |
| `printEffect` | Optional | Technical Specs → Print | Set to `"none"` to hide the Print row. |
| `image` | Yes | card image | Must start with `/uploads/` and match a file you uploaded. |
| `subcategory` | Optional | search index only | No longer shown on the card. |
| `description` | Optional | search index only | No longer shown on the card. |
| `tags` | Optional | search index only | No longer shown on the card. |

### How the card behaves

- Image shows the product photo with a small product-type badge (Knit /
  Woven / Leather / Sweater / Lingerie).
- Clicking the image — or the eye icon — opens a **Technical Specs**
  overlay showing Fabrication, Color and Print. The eye icon toggles it
  closed.
- If `color` or `printEffect` is `"none"` (case-insensitive) or empty,
  that row is hidden automatically.
- Below the image only the **Product Name** and **Wear Category** are
  shown — kept intentionally minimal.

### Hiding the Color or Print row

```json
{
  "color": "none",
  "printEffect": "none"
}
```

## Rules

- `id` must be unique.
- `image` must start with `/uploads/` and match a file you uploaded.
- Keep the JSON valid — every item separated by a comma, no trailing comma
  after the last item. Use a JSON validator (jsonlint.com) if unsure.

## Pagination

The catalog page shows 12 products at a time and adds a **Load More**
button when there are more. You can safely add hundreds of items.

## Safety

- If `catalog.json` is missing, malformed, or empty, the site shows a
  friendly message instead of crashing.
- The catalog is fetched with `cache: no-store`, so admin edits show on
  the next page refresh without needing a hard reload.
