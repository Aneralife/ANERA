# Shopify Metaobjects — Globe Partners Setup

This guide explains how to let the client manage the distribution globe partners dynamically through Shopify Admin, without touching any code.

---

## How it works

- The distribution page fetches partner data from Shopify Metaobjects at build/request time.
- If no Metaobjects exist yet, the site automatically falls back to the hardcoded static list.
- Once you add even one Metaobject entry, Shopify data takes over completely.

---

## One-time Setup (do this once)

### Step 1 — Create the Metaobject Definition

1. Go to **Shopify Admin → Settings → Custom data → Metaobjects**
2. Click **Add definition**
3. Set:
   - **Name:** `Globe Partner`
   - **Type (API key):** `globe_partner` ← must be exactly this

### Step 2 — Add these fields to the definition

| Display Name | Field Key   | Type             | Required | Notes                              |
|--------------|-------------|------------------|----------|------------------------------------|
| Name         | `name`      | Single line text | ✅ Yes   | e.g. "Anera USA"                   |
| Country      | `country`   | Single line text | ✅ Yes   | e.g. "United States"               |
| Longitude    | `longitude` | Decimal number   | ✅ Yes   | e.g. -98 for USA                   |
| Latitude     | `latitude`  | Decimal number   | ✅ Yes   | e.g. 39 for USA                    |
| Website      | `website`   | URL              | No       | Full URL including https://        |
| Primary      | `primary`   | True / False     | No       | true = green dot, false = gold dot |
| Region       | `region`    | Single line text | No       | For future region filter feature   |

### Step 3 — Save the definition

Click **Save** at the top right.

---

## Adding / Editing Partners

1. Go to **Shopify Admin → Content → Metaobjects**
2. Select **Globe Partner**
3. Click **Add entry** for each partner
4. Fill in all fields and click **Save**

The globe on the distribution page will update automatically on the next page load.

---

## Current Static Fallback Data

If Shopify returns no entries, the site uses this hardcoded list. Website is blank for all — add real URLs via Shopify once set up.

| ID | Name             | Country              | Website  |
|----|------------------|----------------------|----------|
| 1  | Anera USA        | United States        | —        |
| 2  | Anera Canada     | Canada               | —        |
| 3  | Anera México     | Mexico               | —        |
| 4  | Anera Brasil     | Brazil               | —        |
| 5  | Anera UK         | United Kingdom       | —        |
| 6  | Anera GmbH       | Germany              | —        |
| 7  | Anera UAE        | United Arab Emirates | —        |
| 8  | Anera KSA        | Saudi Arabia         | —        |
| 9  | Anera India      | India                | —        |
| 10 | Anera Singapore  | Singapore            | —        |
| 11 | Anera Australia  | Australia            | —        |

---

## Partner Panel — What gets shown

When a visitor clicks a dot on the globe, a side panel appears showing:

- Partner name
- Country
- Website link (only shown if `website` is filled in)

If `website` is left blank the panel still shows with just the name and country.

---

## Relevant Code Files

| File | Purpose |
|------|---------|
| `src/lib/shopify/queries.ts` | GraphQL query `GET_GLOBE_PARTNERS_QUERY` |
| `src/lib/shopify/client.ts` | `getGlobePartners()` fetch function |
| `src/lib/shopify/types.ts` | `GlobePartner` TypeScript type |
| `src/lib/shopify/index.ts` | Re-exports `getGlobePartners` and `GlobePartner` |
| `src/app/(marketing)/distribution/page.tsx` | Server component — fetches from Shopify, falls back to static |
| `src/components/distribution/dist-client.tsx` | Client component — globe rendering + partner panel UI |
| `src/app/(marketing)/marketing.css` | `.dist-partner-panel` styles |
