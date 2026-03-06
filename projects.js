// ============================================================================
// projects.js — ALL PROJECT DATA LIVES HERE
// ============================================================================
//
// HOW TO ADD A NEW PROJECT:
//   1. Copy any project block below
//   2. Paste it at the TOP of the array (so it shows first)
//   3. Fill in your details
//   4. Save this file — the site updates automatically
//
// FIELD GUIDE:
//   id            → URL-safe slug (lowercase, hyphens, no spaces). Used in the URL.
//   title         → Project name displayed on the site
//   tagline       → Short brand line shown on the case study page
//   category      → Shows on card hover (e.g. "Brand & Packaging")
//   year          → Year of the project
//   client        → Client name
//   agency        → Agency or "Freelance"
//   services      → Comma-separated list of what you did
//   credits       → Array of { name, role } — include yourself and collaborators
//   awards        → Array of strings — leave empty [] if none
//   thumbnail     → Path to the grid image (e.g. "/images/my-project/thumb.jpg")
//   heroImage     → Path to the full-width hero at top of case study
//   summary       → One sentence — what was the project
//   body          → Full narrative paragraph(s). Tells the story.
//   sections      → Accordion sections (Problem / Solution / Results). Can be empty [].
//   images        → Array of image paths for the case study gallery
//   featured      → true = shows on main Work page. false = Archive only.
//
// IMAGE TIPS:
//   - Drop image files in /images/[project-id]/ folder
//   - File names must match the paths you write here
//   - Until you add real images, colorful gradient placeholders will show
//
// ============================================================================

export const projects = [

  // ── LIQUID I.V. ──────────────────────────────────────────────────────
  {
    id: "liquid-iv",                             // URL slug
    title: "Liquid I.V.",                        // Display name
    tagline: "Hydration Multiplier.",            // Short brand line on case study
    category: "Brand & Packaging",              // Shows on card hover
    year: "2022",                                // Project year
    client: "Liquid I.V.",                       // Client name
    agency: "Hatch SF",                          // Agency or "Freelance"
    services: "Packaging Design, Art Direction", // What Sean did
    credits: [                                   // Team credits
      { name: "Sean Morse", role: "Design Director" }
    ],
    awards: [],                                  // Awards — leave [] if none
    thumbnail: "/images/liquid-iv/thumb.jpg",    // Grid image
    heroImage: "/images/liquid-iv/hero.jpg",     // Case study hero
    summary: "Evolving the world's leading hydration brand across a full packaging system redesign.",
    body: `Liquid I.V. built its reputation as the go-to hydration multiplier. The challenge was scaling a cult favorite into a mature, shelf-dominant brand without losing the energy that made it. Sean led the packaging direction at Hatch SF, developing a system that brought clarity and bold visual ownership across the full product range.`,
    sections: [
      { title: "Problem", body: "A fast-growing product line needed a cohesive packaging system that could scale across SKUs without losing brand recognition at shelf." },
      { title: "Solution", body: "A bold, ownable visual framework built around clear flavor coding, consistent hierarchy, and photography direction that emphasized the hydration story." },
      { title: "Results", body: "Liquid I.V. has grown into a household name and one of the most recognized hydration brands in retail." }
    ],
    images: [                                    // Case study gallery images
      "/images/liquid-iv/01.jpg",
      "/images/liquid-iv/02.jpg",
      "/images/liquid-iv/03.jpg",
    ],
    featured: true,                              // true = Work page, false = Archive
  },

  // ── LEISURE PROJECT ──────────────────────────────────────────────────
  {
    id: "leisure-project",
    title: "Leisure Project",
    tagline: "Creating an Oasis of Holistic Refreshment.",
    category: "Brand Development & Packaging",
    year: "2023",
    client: "Leisure Project",
    agency: "Freelance",
    services: "Brand Strategy, Visual Identity, Packaging System, Illustration Direction",
    credits: [
      { name: "Sean Morse", role: "Creative Director" }
    ],
    awards: [],
    thumbnail: "/images/leisure-project/thumb.jpg",
    heroImage: "/images/leisure-project/hero.jpg",
    summary: "Full brand development for a breakthrough hydration beverage — from naming to final packaging.",
    body: `The hydration category is overwhelmingly filled with brands that lean on athletic aesthetics. Leisure's focus was different: a product that transports and inspires everyday creators. Sean built the brand from the ground up — strategy, identity, illustration direction, and packaging — creating a lush, character-driven world that fuses flavor, function, and fantasy.`,
    sections: [
      { title: "Problem", body: "A new hydration brand entering a saturated market dominated by athletic and clinical aesthetics needed a completely distinct point of view." },
      { title: "Solution", body: "A rich brand world built around the concept of holistic refreshment — illustrated characters, a portal visual device, and a palette that felt like an oasis rather than a gym." },
      { title: "Results", body: "Leisure Project has experienced remarkable growth since launch in a highly competitive sector." }
    ],
    images: [
      "/images/leisure-project/01.jpg",
      "/images/leisure-project/02.jpg",
      "/images/leisure-project/03.jpg",
      "/images/leisure-project/04.jpg",
    ],
    featured: true,
  },

  // ── ALEC'S ICE CREAM ─────────────────────────────────────────────────
  {
    id: "alecs-ice-cream",
    title: "Alec's Ice Cream",
    tagline: "Happy Gut. Happy Planet.",
    category: "Brand Identity & Packaging",
    year: "2023",
    client: "Alec's Ice Cream",
    agency: "Hatch SF",
    services: "Strategy, Brand Identity, Photography",
    credits: [
      { name: "Nicole Flores", role: "Creative Director" },
      { name: "Sean Morse", role: "Design Director" },
      { name: "Ryann Woods", role: "Designer / Illustrator" }
    ],
    awards: ["Dieline Awards 2023"],
    thumbnail: "/images/alecs/thumb.jpg",
    heroImage: "/images/alecs/hero.jpg",
    summary: "Brand identity and packaging for an organic, pasture-raised, regeneratively farmed ice cream.",
    body: `What would happen if ice cream loved the planet as much as we do? Enter Alec's — organic, pasture-raised, slow-whipped and ultra creamy using regeneratively farmed A2 dairy. Better for your stomach and the planet. Regenerative farming removes CO2 from the atmosphere for brighter, tastier tomorrows. The brand identity needed to carry that mission with as much joy as the product itself.`,
    sections: [
      { title: "Problem", body: "Sustainable ice cream brands often look earnest but joyless. Alec's needed to lead with pleasure and let the planet-positive story follow." },
      { title: "Solution", body: "A playful illustrated system with flavor-coded colorways, hand-drawn characters, and photography that puts the product center stage against bold color backgrounds." },
      { title: "Results", body: "Winner, Dieline Awards 2023. Alec's has become a standout in the premium organic ice cream space." }
    ],
    images: [
      "/images/alecs/01.jpg",
      "/images/alecs/02.jpg",
      "/images/alecs/03.jpg",
      "/images/alecs/04.jpg",
    ],
    featured: true,
  },

  // ── V8 ────────────────────────────────────────────────────────────────
  {
    id: "v8-campbells",
    title: "V8",
    tagline: "America's Favorite Vegetable Juice, Reimagined.",
    category: "Brand Evolution & Packaging",
    year: "2021",
    client: "V8 / Campbell's",
    agency: "Hatch SF",
    services: "Brand Strategy, Packaging System, Art Direction",
    credits: [
      { name: "Sean Morse", role: "Design Director" }
    ],
    awards: [],
    thumbnail: "/images/v8/thumb.jpg",
    heroImage: "/images/v8/hero.jpg",
    summary: "Evolving an iconic American brand for a new generation of health-conscious consumers.",
    body: `V8 is one of the most recognized names in the grocery aisle. The challenge was honoring that legacy while making the brand feel relevant to modern consumers who have more beverage choices than ever. Sean led the packaging evolution at Hatch SF, bringing clarity and contemporary energy to a brand with decades of equity.`,
    sections: [
      { title: "Problem", body: "An iconic CPG brand needed modernization without alienating its loyal customer base." },
      { title: "Solution", body: "A refined visual system that retained brand recognition cues while updating typography, color, and information hierarchy for modern retail." },
      { title: "Results", body: "Updated packaging rolled out across the V8 product line within Campbell's portfolio." }
    ],
    images: [
      "/images/v8/01.jpg",
      "/images/v8/02.jpg",
    ],
    featured: true,
  },

  // ── ELENITA MEZCAL ────────────────────────────────────────────────────
  {
    id: "elenita-mezcal",
    title: "Elenita Mezcal",
    tagline: "Faces of Mezcal Muze.",
    category: "Brand Identity & Packaging",
    year: "2022",
    client: "Elenita Mezcal",
    agency: "Hatch SF",
    services: "Brand Identity, Packaging Design, Art Direction",
    credits: [
      { name: "Sean Morse", role: "Design Director" }
    ],
    awards: [],
    thumbnail: "/images/elenita/thumb.jpg",
    heroImage: "/images/elenita/hero.jpg",
    summary: "Brand identity and packaging for a craft mezcal brand rooted in Mexican heritage and artistry.",
    body: `Elenita Mezcal is built on tradition, craft, and the faces behind the production. The brand identity needed to honor those roots while creating a premium shelf presence that could stand alongside the best in the spirits category.`,
    sections: [
      { title: "Problem", body: "A craft spirits brand needed to communicate artisanal heritage while achieving premium shelf presence in a competitive category." },
      { title: "Solution", body: "An identity system centered on human portraiture and rich illustration, grounding the brand in the faces and stories of the makers." },
      { title: "Results", body: "A distinctive brand world that earned recognition in the premium mezcal category." }
    ],
    images: [
      "/images/elenita/01.jpg",
      "/images/elenita/02.jpg",
    ],
    featured: true,
  },

  // ── OVER EASY ─────────────────────────────────────────────────────────
  {
    id: "over-easy",
    title: "Over Easy",
    tagline: "",
    category: "Brand & Packaging",
    year: "2022",
    client: "Over Easy",
    agency: "Hatch SF",
    services: "Brand Identity, Packaging Design",
    credits: [
      { name: "Sean Morse", role: "Design Director" }
    ],
    awards: [],
    thumbnail: "/images/over-easy/thumb.jpg",
    heroImage: "/images/over-easy/hero.jpg",
    summary: "Brand and packaging for a breakfast-forward CPG brand.",
    body: `Over Easy brought a fresh perspective to the breakfast category. Sean developed the brand identity and packaging system to capture the ease, optimism, and everyday ritual the brand was built around.`,
    sections: [],
    images: [
      "/images/over-easy/01.jpg",
      "/images/over-easy/02.jpg",
    ],
    featured: true,
  },

  // ── MIMIO ─────────────────────────────────────────────────────────────
  {
    id: "mimio",
    title: "Mimio",
    tagline: "",
    category: "Brand Strategy & Packaging",
    year: "2022",
    client: "Mimio",
    agency: "Hatch SF",
    services: "Brand Strategy, Visual Identity, Packaging",
    credits: [
      { name: "Sean Morse", role: "Design Director" }
    ],
    awards: [],
    thumbnail: "/images/mimio/thumb.jpg",
    heroImage: "/images/mimio/hero.jpg",
    summary: "Premium wellness supplement brand with bold product packaging.",
    body: `Mimio is a cellular health supplement built on the science of caloric restriction. The brand needed to signal scientific credibility while achieving the premium aesthetic of the modern wellness category. The result: a refined, bold identity anchored by a distinctive packaging form.`,
    sections: [],
    images: [
      "/images/mimio/01.jpg",
    ],
    featured: true,
  },

  // ── PICTURE DAY ───────────────────────────────────────────────────────
  {
    id: "picture-day",
    title: "Picture Day",
    tagline: "Make Every Day A Picture Day.",
    category: "Brand Strategy & Identity",
    year: "2023",
    client: "Picture Day Tea",
    agency: "Freelance",
    services: "Strategy, Naming, Visual Identity, Copywriting",
    credits: [
      { name: "Nick Adam", role: "Tea Specialist & Co-Founder" },
      { name: "Sean Morse", role: "Creative Director & Co-Founder" }
    ],
    awards: [],
    thumbnail: "/images/picture-day/thumb.jpg",
    heroImage: "/images/picture-day/hero.jpg",
    summary: "Co-founded a tea brand built on mental wellness, optimism, and the joy of everyday moments.",
    body: `The world is a complicated place — it's easy to forget to slow down and take a hot second. All of us need that: a moment to kick back and get some clarity, or a moment to step it up and power through. Picture Day Tea was founded on this idea. Sean co-founded the brand with tea specialist Nick Adam, leading all creative strategy, naming, identity, and copywriting. A brand centered on longevity with a wink.`,
    sections: [
      { title: "Problem", body: "The functional tea category needed a brand with genuine personality — one that made wellness feel joyful rather than medicinal." },
      { title: "Solution", body: "A bold, playful visual identity anchored by the daisy mark, a mixed-font logotype, and copy that talks to you like a friend." },
      { title: "Results", body: "Picture Day Tea launched with a full product line across immunity, energy, and calm SKUs." }
    ],
    images: [
      "/images/picture-day/01.jpg",
      "/images/picture-day/02.jpg",
      "/images/picture-day/03.jpg",
    ],
    featured: false,
  },

  // ── DREAM POPS ────────────────────────────────────────────────────────
  {
    id: "dream-pops",
    title: "Dream Pops",
    tagline: "100% Plant-Based.",
    category: "Brand & Packaging",
    year: "2020",
    client: "Dream Pops",
    agency: "Hatch SF",
    services: "Packaging Design",
    credits: [
      { name: "Sean Morse", role: "Designer" }
    ],
    awards: [],
    thumbnail: "/images/dream-pops/thumb.jpg",
    heroImage: "/images/dream-pops/hero.jpg",
    summary: "Packaging design for a plant-based frozen treat brand.",
    body: `Dream Pops makes plant-based frozen treats with bold flavors and a geometric visual world. The packaging system needed to communicate the brand's playful energy and make its better-for-you credentials impossible to miss at shelf.`,
    sections: [],
    images: [
      "/images/dream-pops/01.jpg",
    ],
    featured: false,
  },

  // ── GIMME ─────────────────────────────────────────────────────────────
  {
    id: "gimme",
    title: "Gimme",
    tagline: "",
    category: "Packaging",
    year: "2021",
    client: "Gimme",
    agency: "Hatch SF",
    services: "Packaging Design",
    credits: [
      { name: "Sean Morse", role: "Designer" }
    ],
    awards: [],
    thumbnail: "/images/gimme/thumb.jpg",
    heroImage: "/images/gimme/hero.jpg",
    summary: "Packaging for a beloved seaweed snack brand.",
    body: `Gimme is the leading seaweed snack brand. Sean worked on packaging design at Hatch SF, maintaining the brand's energy while evolving its shelf presence.`,
    sections: [],
    images: [
      "/images/gimme/01.jpg",
    ],
    featured: false,
  },

  // ── GIG CAR SHARE ─────────────────────────────────────────────────────
  {
    id: "gig-car-share",
    title: "Gig Car Share",
    tagline: "",
    category: "Brand Identity",
    year: "2020",
    client: "Gig Car Share",
    agency: "Hatch SF",
    services: "Brand Identity, Design System",
    credits: [
      { name: "Sean Morse", role: "Designer" }
    ],
    awards: [],
    thumbnail: "/images/gig/thumb.jpg",
    heroImage: "/images/gig/hero.jpg",
    summary: "Brand identity for a Bay Area car-sharing service.",
    body: `Gig Car Share brought a new model to urban mobility. The brand identity needed to feel accessible, tech-forward, and distinctly West Coast.`,
    sections: [],
    images: [
      "/images/gig/01.jpg",
    ],
    featured: false,
  },

  // ── LICENSING ARTWORK ─────────────────────────────────────────────────
  {
    id: "licensing-artwork",
    title: "Licensing Artwork",
    tagline: "",
    category: "Art Direction",
    year: "2020",
    client: "Various",
    agency: "Hatch SF",
    services: "Art Direction, Illustration",
    credits: [
      { name: "Sean Morse", role: "Design Director" }
    ],
    awards: [],
    thumbnail: "/images/licensing/thumb.jpg",
    heroImage: "/images/licensing/hero.jpg",
    summary: "Licensed artwork and illustration direction across branded properties.",
    body: `A selection of licensing artwork and illustration direction for branded properties. Note the Star Wars Rogue One work developed at Hatch SF.`,
    sections: [],
    images: [
      "/images/licensing/01.jpg",
    ],
    featured: false,
  },

  // ── CHILD AID ─────────────────────────────────────────────────────────
  {
    id: "child-aid",
    title: "Child Aid",
    tagline: "",
    category: "Brand & Packaging",
    year: "2019",
    client: "Child Aid",
    agency: "Hatch SF",
    services: "Brand Identity, Packaging",
    credits: [
      { name: "Sean Morse", role: "Designer" }
    ],
    awards: [],
    thumbnail: "/images/child-aid/thumb.jpg",
    heroImage: "/images/child-aid/hero.jpg",
    summary: "Brand and packaging for a children's wellness product.",
    body: `Child Aid needed a brand identity that communicated safety, wellness, and approachability for parents navigating children's health products.`,
    sections: [],
    images: [
      "/images/child-aid/01.jpg",
    ],
    featured: false,
  },

  // ── POWER OF SPORT ────────────────────────────────────────────────────
  {
    id: "power-of-sport",
    title: "Power of Sport",
    tagline: "",
    category: "Brand Campaign",
    year: "2019",
    client: "Power of Sport",
    agency: "Hatch SF",
    services: "Brand Campaign, Art Direction",
    credits: [
      { name: "Sean Morse", role: "Designer" }
    ],
    awards: [],
    thumbnail: "/images/power-of-sport/thumb.jpg",
    heroImage: "/images/power-of-sport/hero.jpg",
    summary: "Brand campaign work celebrating sport's role in community and identity.",
    body: `A brand campaign that explored the transformative power of sport across community, culture, and identity.`,
    sections: [],
    images: [
      "/images/power-of-sport/01.jpg",
    ],
    featured: false,
  },

];
