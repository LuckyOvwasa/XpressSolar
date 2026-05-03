# Xpress Solar — Web Store

A complete, deployable e-commerce web app for Xpress Solar, with QR scanner flow → product details → cart → checkout → confirmation.

## What's inside

```
xpress-solar/
├── index.html          ← Main HTML shell with all screens
├── css/
│   └── styles.css      ← Complete design system + all components
├── js/
│   ├── data.js         ← Products, FAQs, content data
│   └── app.js          ← Routing, rendering, cart, checkout logic
└── README.md
```

## Routes

The site uses simple hash routing (works without a server):

| Route | What it shows |
|---|---|
| `xpresssolar.com/` | Homepage |
| `xpresssolar.com/#/shop` | Shop / product grid |
| `xpresssolar.com/#/product/lf280k-3v2-280ah` | Product detail (Docan battery) |
| `xpresssolar.com/#/product/deye-5kva-hybrid` | Product detail (Deye inverter) |
| `xpresssolar.com/#/about` | About page |
| `xpresssolar.com/#/faq` | FAQ page |
| `xpresssolar.com/#/scan` | **QR scanner simulation → auto-opens Docan product after 2.5s** |

## How QR codes work in production

For each product you stock, generate a QR code that points to:

```
https://xpresssolar.com/#/product/<product-slug>
```

For example:
- Docan battery → `https://xpresssolar.com/#/product/lf280k-3v2-280ah`
- Deye inverter → `https://xpresssolar.com/#/product/deye-5kva-hybrid`

Print and stick on the physical products. When customers scan, their phone goes straight to that product's page.

## How to test the in-store QR scan demo

1. Open the deployed site
2. Visit `xpresssolar.com/#/scan`
3. Watch the camera scanning animation
4. After ~2.5 seconds, it will auto-redirect to the Docan battery product page

This demonstrates the in-store experience to customers and stakeholders.

## Deployment options (all free)

### Option 1 — Netlify (easiest, recommended)
1. Go to https://app.netlify.com/drop
2. Drag and drop the entire `xpress-solar` folder
3. Done — you'll get a URL like `https://random-name.netlify.app`
4. To use your own domain, go to Site Settings → Domain management

### Option 2 — Vercel
1. Push the folder to a GitHub repo
2. Go to https://vercel.com/new
3. Import the repo
4. Click Deploy

### Option 3 — Cloudflare Pages
1. Push to GitHub
2. Go to https://dash.cloudflare.com → Pages → Create
3. Connect to your repo and deploy

### Option 4 — GitHub Pages (free, but slower)
1. Push to GitHub
2. Settings → Pages → Source: Main branch
3. Site will be at `username.github.io/repo-name`

### Option 5 — Run locally to test first
```bash
cd xpress-solar
python3 -m http.server 8000
# Then open http://localhost:8000
```

## Connecting your custom domain

Once deployed, point `xpresssolar.com` to the host:

- **Netlify:** Add CNAME record → `your-site.netlify.app`
- **Vercel:** Add CNAME record → `cname.vercel-dns.com`
- **Cloudflare Pages:** Add CNAME → `your-site.pages.dev`

You can buy `xpresssolar.com` from Namecheap, Cloudflare, or Whogohost (Naira-friendly for Nigerian users).

## What works in this version

✅ Full home page with hero, categories, best sellers, why-us, testimonial, CTA, footer
✅ Shop page with search, category filters, product grid
✅ Product detail pages for all 8 products
✅ About page with story, mission/vision, values, team
✅ FAQ page with category tabs and accordion
✅ Mobile navigation dropdown menu
✅ Cart drawer (slides in from right on desktop, full screen on mobile)
✅ Checkout flow: Shipping → Payment → Confirmation
✅ Multiple payment methods (Card, Bank Transfer, Pay on Delivery, WhatsApp)
✅ Cart persists in browser localStorage
✅ Toast notifications
✅ QR scanner simulation that auto-opens the product page
✅ Fully responsive (mobile + tablet + desktop)
✅ WhatsApp deep links throughout

## What needs backend integration (next phase)

The current version is frontend-only. To go truly live with payments and orders, you'll need to add:

- **Real payment processing** — integrate Paystack, Flutterwave, or Stripe for card payments
- **Order persistence** — save orders to a database (Firebase, Supabase, MongoDB)
- **Email confirmations** — send via SendGrid, Mailgun, or Resend
- **WhatsApp Business API** — auto-send order updates to customers
- **Inventory management** — track stock, decrement on purchase
- **Admin dashboard** — view/fulfill orders, manage products

For now, the cart and checkout work end-to-end as a *demo* — order IDs are generated client-side and orders aren't actually saved anywhere. This is fine for showing customers and stakeholders the experience.

## Customizing

- **Add new products:** edit `js/data.js`, add to the `PRODUCTS` array
- **Update colors:** edit CSS variables at the top of `css/styles.css`
- **Change WhatsApp number:** update `WHATSAPP_NUMBER` in `js/data.js`
- **Edit FAQ:** update the `FAQS` array in `js/data.js`
- **Update copy:** most text is in `js/app.js` (search for the text you want to change)

## Questions

For technical questions or customizations, reach out to the development team.

—
© 2026 Xpress Solar
