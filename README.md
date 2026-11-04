# Tastes of Africa

A multi-page website celebrating Africa's culinary traditions, built with **HTML5, CSS3 and vanilla JavaScript**. It was created for the ALU Formative "Taste of Africa Website Project".

**Live site:** 

## Pages

| Page | File | What it has |
| --- | --- | --- |
| Home | `index.html` | Hero with background photo and intro video, featured dishes, explore by region, latest food trends |
| Recipes | `recipes.html` | Region filter buttons and all recipe cards with a Favorite button |
| Recipe pages (5) | `recipe-jollof-rice.html`, `recipe-tagine.html`, `recipe-injera.html`, `recipe-bunny-chow.html`, `recipe-isombe.html` | Description, ingredients with servings scaler, expandable instructions, nutrition table, YouTube tutorial, Google Map of the country of origin |
| Regions | `regions.html` | Overview of the four culinary regions |
| Region pages (4) | `region-west-africa.html`, `region-north-africa.html`, `region-east-africa.html`, `region-southern-africa.html` | Food culture, staples, cooking techniques, spices, a YouTube video and example dishes |
| About | `about.html` | Mission statement, history timeline, Google Map of Jemaa el-Fnaa, Marrakech |
| Contact | `contact.html` | Accessible form with JavaScript validation and a confirmation message |

## Features

**HTML**
- Semantic HTML5: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<figure>` with `<figcaption>`, `<details>` with `<summary>`, `<time>` and `<mark>`
- Lists, tables, embedded YouTube videos and Google Maps iframes
- A `<label>` on every form field, alt text on every image, and a `<datalist>` for country suggestions

**CSS**
- Colour palette inspired by African spices and landscapes: warm gold, terracotta and earthy brown
- Google Fonts: Fraunces for headings and Manrope for body text
- Cards with shadows and rounded corners, hover effects and focus states
- Responsive layout using relative units, CSS Grid, Flexbox and media queries
- Dark and light themes

**JavaScript**
- **Recipe filter:** buttons for All, West, North, East and Southern Africa, plus Favorites. Cards carry `data-region` attributes and are shown or hidden with a `.hidden` class.
- **Favorites:** the Favorite button toggles the heart and saves recipe IDs in `localStorage`. They are restored when the page loads, and the header counter updates.
- **Contact form validation:** `event.preventDefault()` stops the default submit. The message must be longer than 20 characters. On success the form is hidden and "Thank you, [Name]!" is shown.
- **Ingredient scaler:** the + and - buttons on each recipe page rescale the ingredient amounts.
- **Dark and light mode toggle:** the choice is saved in `localStorage`.
- **Newsletter signup** in the footer, plus a mobile navigation menu.

## Project structure

```
taste_of_africa_website_project/
├── index.html
├── recipes.html
├── regions.html
├── about.html
├── contact.html
├── recipe-jollof-rice.html
├── recipe-tagine.html
├── recipe-injera.html
├── recipe-bunny-chow.html
├── recipe-isombe.html
├── region-west-africa.html
├── region-north-africa.html
├── region-east-africa.html
├── region-southern-africa.html
├── css/
│   └── styles.css
├── js/
│   └── script.js
├── images/
│   ├── hero.jpg
│   ├── jollof.jpg
│   ├── tagine.jpg
│   ├── injera.jpg
│   ├── bunny.jpg
│   └── isombe.jpg
└── README.md
```

## Run it locally

No build step or dependencies are needed.

1. Clone the repository:
   ```bash
   git clone https://github.com/YOUR-USERNAME/taste_of_africa_website_project.git
   cd taste_of_africa_website_project
   ```
2. Open `index.html` in a browser, or serve the folder with the VS Code Live Server extension.

An internet connection is needed to load Google Fonts, the YouTube videos and the Google Maps embeds.

## Deployment

The site is hosted with GitHub Pages: **Settings → Pages → Deploy from a branch → `main` → `/ (root)`**.

## Technologies

- HTML5
- CSS3 (custom properties, Grid, Flexbox, media queries)
- JavaScript (ES6, DOM manipulation, `localStorage`)
- Google Fonts, YouTube embeds and Google Maps embeds

## Author

Prince Ndahiro