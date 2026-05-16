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
  "name": "New Polo Shirt",
  "category": "mens",
  "subcategory": "Polo Shirts",
  "fabric": "100% Cotton Pique",
  "gsm": "220 GSM",
  "color": "Navy / White",
  "printEffect": "Embroidery",
  "image": "/uploads/my-new-photo.jpg",
  "description": "Short description of the product shown below the title on the card.",
  "tags": ["Pique", "Classic"],
  "fabrications": ["Knit"]
}
```

| Field | Required | Notes |
|-------|----------|-------|
| `id` | Yes | Must be unique |
| `name` | Yes | Product title |
| `category` | Yes | `"ladies"`, `"mens"`, or `"children"` (gender category) |
| `subcategory` | Yes | Shown as badge on card |
| `fabric` | Yes | Fabric composition |
| `gsm` | Yes | Fabric weight |
| `color` | Yes | Colorway |
| `printEffect` | Yes | Print/finish technique |
| `image` | Yes | Must start with `/uploads/` |
| `description` | No | Short text shown below the title (1-2 sentences) |
| `tags` | No | Array of keyword strings shown as small badges |
| `fabrications` | No | Array of product-type tags used by the filter: `"Knit"`, `"Woven"`, `"Leather"`, `"Sweater"`, `"Lingerie"`. Defaults to `["Knit"]` if omitted. |

**Rules**
- `id` must be unique.
- `image` must start with `/uploads/` and match a file you uploaded.
- Keep the JSON valid — every item separated by a comma, no trailing comma
  after the last item. Use a JSON validator (jsonlint.com) if unsure.

## Pagination

The homepage shows 12 products at a time and adds a **Load More** button
when there are more. You can safely add hundreds of items to `catalog.json`.

## Safety

- If `catalog.json` is missing, malformed, or empty, the site shows a
  friendly message instead of crashing.
- The catalog is fetched with `cache: no-store`, so admin edits show on
  the next page refresh without needing a hard reload.
