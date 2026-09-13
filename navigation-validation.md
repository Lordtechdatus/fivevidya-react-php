# Navigation and contact validation

Validated against the local production build served through `backend/router.php` on 12 September 2026.

| Check | Result |
| --- | --- |
| Production build | Pass; new service content is a separate lazy-loaded chunk |
| Route/content audit | 40 unique destinations, 27 new pages, 13 retained pages; zero missing |
| Actual desktop mega-menu links | All 42 clicked, covering all 38 service/category destinations, including repeated entries |
| Header Home and Contact | Both resolve with the shared layout |
| Footer service links | All 15 clicked successfully |
| Page structure | One global header, one footer and one H1 on every tested destination |
| Active menu and metadata | Correct parent, unique new-page title and description across all mega-menu destinations |
| Navigation scroll | All desktop menu destinations opened at the top |
| Mobile pages at 375px | All 40 rendered without horizontal page overflow |
| New-page mobile navigation | All 26 new service/category pages expose their category selector |
| Mobile interaction | Menu selection closes the drawer; category selection changes pages; FAQ opens inline |
| Desktop sidebar | Selected sibling navigates and receives the active highlight |
| Contact CTA | Editing CTA opens Contact with Editing selected |
| Quote dialog | Both distinct telephone destinations and official mailto link confirmed |
| Phone touch areas | Shared contact phone links at least 44px high on mobile |
| Direct URL server requests | All 40 canonical URLs and 12 convenience aliases return the application |
| Client aliases | All 12 redirect to the retained canonical service page |
| Browser refresh | Analysis and Formatting remain working after a direct reload |
| Static files and API isolation | Production bundles return 200; missing API/assets return 404 rather than HTML |
| Form endpoint | Empty JSON returns validation status 422; no test enquiry was stored |
| Placeholder scan | Old company email/phone absent from frontend source and current production assets |
| Map | Responsive address-based Google Maps iframe and direct address link added; no coordinates invented |

The Google map tiles could not be visually confirmed in the embedded preview. The full address and direct Google Maps link remain available independently of the iframe. The supplied address is used verbatim for the query; an exact geocoded pin has not been independently verified.

The existing PHP enquiry handler still stores requests locally. This change does not configure outbound email, CRM delivery or WhatsApp. Existing service-page content and layouts were retained; the new pages use the shared service template.

## Repeat the checks

From `frontend`:

```text
npm run audit:navigation
npm run build
node scripts/copy-production.mjs
```

From the project root:

```text
php -S 127.0.0.1:8765 -t backend/public backend/router.php
node frontend/scripts/check-server.mjs http://127.0.0.1:8765
```

For Apache, use `backend/public` as the document root and enable `mod_rewrite` with `.htaccess` overrides. The supplied `.htaccess` preserves real API/static files and falls back to `index.html` for application routes. The PHP launch scripts already use the explicit router.
