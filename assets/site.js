/* SHOWCASE — Rachel Li's portfolio.
   Player navigation, page transitions, icon desktops, project viewers, draggable windows and the About trash.
   Pages are routed by #hash so the whole site is one index.html (works on GitHub Pages as-is). */
(function () {
  "use strict";

  // ---------- content: pages, their desktop icons, and each window's body ----------
  // All copy is placeholder in [brackets], written as notes to myself. Replace each one with real text.

  // Vector desktop icons (temporary: vectors until real photos are ready)
  const ICON = {
    exe: '<rect class="f-cream" x="5" y="9" width="38" height="30" rx="2"/><path class="f-berry" d="M5 11a2 2 0 0 1 2-2h34a2 2 0 0 1 2 2v6H5z"/><rect class="f-pond" x="10" y="22" width="12" height="11"/><path class="f-none" d="M26 24h12M26 29h9"/>',
    txt: '<path class="f-cream" d="M11 5h18l9 9v29H11z"/><path class="f-milk" d="M29 5v9h9"/><path class="f-none" d="M16 21h16M16 27h16M16 33h11"/>',
    pdf: '<path class="f-cream" d="M11 5h18l9 9v29H11z"/><path class="f-milk" d="M29 5v9h9"/><rect class="f-berry" x="7" y="24" width="25" height="10" rx="1"/><path class="f-none s-cream" d="M11 29h17"/><path class="f-none" d="M16 39h16"/>',
    htm: '<rect class="f-cream" x="4" y="8" width="40" height="32" rx="2"/><path class="f-pond" d="M4 10a2 2 0 0 1 2-2h36a2 2 0 0 1 2 2v6H4z"/><circle class="f-berry" cx="9.5" cy="12" r="1.6"/><circle class="f-matcha" cx="15" cy="12" r="1.6"/><path class="f-none" d="M10 23h28M10 29h20M10 35h24"/>',
    ppt: '<rect class="f-milk" x="12" y="6" width="30" height="22" rx="1"/><rect class="f-cream" x="6" y="13" width="30" height="22" rx="1"/><rect class="f-lily" x="11" y="18" width="11" height="9"/><path class="f-none" d="M26 20h6M26 24h6M11 31h20M21 35v6M15 42h12"/>',
    jpg: '<rect class="f-cream" x="5" y="9" width="38" height="30" rx="2"/><rect class="f-pond" x="9" y="13" width="30" height="22"/><circle class="f-cream" cx="31" cy="19" r="3"/><path class="f-lily" d="M9 35l9-11 7 8 4-4 10 7z"/>',
    mp3: '<circle class="f-pond" cx="24" cy="24" r="18"/><circle class="f-none s-cream" cx="24" cy="24" r="12"/><circle class="f-milk" cx="24" cy="24" r="6"/><circle class="f-cream" cx="24" cy="24" r="2"/>',
    cam: '<path class="f-cream" d="M5 15a2 2 0 0 1 2-2h7l3-4h14l3 4h7a2 2 0 0 1 2 2v22a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2z"/><circle class="f-pond" cx="24" cy="26" r="8"/><circle class="f-cream" cx="24" cy="26" r="3"/><rect class="f-berry" x="35" y="17" width="4" height="3"/>',
    game: '<path class="f-berry" d="M12 14h24a9 9 0 0 1 9 9v6a7 7 0 0 1-12 5l-3-3H18l-3 3a7 7 0 0 1-12-5v-6a9 9 0 0 1 9-9z"/><path class="f-none s-cream" d="M13 20v8M9 24h8"/><circle class="f-cream" cx="32" cy="21" r="2"/><circle class="f-matcha" cx="36" cy="25" r="2"/>',
    food: '<path class="f-none" d="M14 6l10 14M22 4l6 15"/><path class="f-cream" d="M6 22h36a18 16 0 0 1-36 0z"/><path class="f-matcha" d="M9 22c4-4 10-5 15-2 5-3 11-2 15 2z"/><path class="f-none" d="M17 40h14"/>',
    art: '<path class="f-cream" d="M24 6C12 6 4 14 4 23s7 17 17 17c4 0 5-3 3-6-2-3 0-6 4-6h6c6 0 10-4 10-9C44 12 35 6 24 6z"/><circle class="f-berry" cx="14" cy="20" r="3"/><circle class="f-pond" cx="22" cy="13" r="3"/><circle class="f-matcha" cx="32" cy="14" r="3"/><circle class="f-lily" cx="13" cy="30" r="3"/>',
    dir: '<path class="f-matcha" d="M5 13a2 2 0 0 1 2-2h11l4 4h19a2 2 0 0 1 2 2v20a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2z"/><path class="f-none" d="M5 19h38"/>'
  };
  const iconSVG = type => `<svg class="ic" viewBox="0 0 48 48" aria-hidden="true" focusable="false">${ICON[type] || ICON.exe}</svg>`;

  // Links used in more than one window
  const LINKEDIN = "https://www.linkedin.com/in/rachel-y-li/";
  const RESUME_PDF = "assets/Rachel_Li_Resume.pdf";
  const job = (when, title, org, place, bullets) =>
    `<li><span class="when">${when}</span><span><b>${title}</b>, ${org}${place ? ` <span class="place">· ${place}</span>` : ""}<ul class="bul">${bullets.map(b => `<li>${b}</li>`).join("")}</ul></span></li>`;
  const linkedinBody = `<h3>LinkedIn</h3>
    <div class="li-badge"><div class="badge-base LI-profile-badge" data-locale="en_US" data-size="medium" data-theme="light" data-type="VERTICAL" data-vanity="rachel-y-li" data-version="v1"></div></div>
    <div class="actions"><a class="btn primary" href="${LINKEDIN}" target="_blank" rel="noopener">View my profile &#8599;</a></div>`;
  const resumeBody = `<h3>Resume</h3><p>My resume, summarizing my work experience, projects, and skills.</p>
    <div class="actions"><a class="btn primary" href="${RESUME_PDF}" target="_blank" rel="noopener">Open resume &#8599;</a><a class="btn" href="${RESUME_PDF}" download>Download</a></div>`;

  // AI in Marketing (33:630:488) slide decks, all built on Alani Nu, in the order they were made.
  // Each deck plays its slide images (assets/decks/<key>/01.jpg ...) inside its window.
  // Decks are view-only on purpose: no PDF, open or download buttons.
  const AIM_COURSE = "AI in Marketing (33:630:488)";
  const AIM_DECKS = [
    { key: "untapped", file: "untapped_potential.ppt", title: "Alani: Untapped Potential in the Health-Conscious Market", n: 7 },
    { key: "positioning", file: "brand_positioning.ppt", title: "Alani Nu Brand Positioning", n: 7 },
    { key: "retain", file: "retaining_customers.ppt", title: "Alani Nu: Retaining Our Health-Conscious Customers", n: 11 },
    { key: "visual", file: "visual_identity.ppt", title: "Alani Nu Visual Identity Deck", n: 12 },
    { key: "lifecycle", file: "lifecycle_plan.ppt", title: "Alani Nu Lifecycle Plan", n: 10 },
    { key: "paid", file: "q4_paid_media.ppt", title: "Alani Nu Q4 Paid Media Plan", n: 18 },
    { key: "email", file: "email_readout.ppt", title: "Alani Nu Email Readout", n: 11 },
    { key: "support", file: "support_design.ppt", title: "Alani Nu Support Design", n: 12 },
    { key: "quiz", file: "flavor_quiz.ppt", title: "Which Alani Are You? Flavor Personality Quiz", n: 11 },
    { key: "voc", file: "voc_cmo_readout.ppt", title: "Alani Nu Voice of Customer Agent: CMO Readout", n: 15 }
  ].map(d => ({ ...d, id: `an-${d.key}`, type: "ppt", view: "deck", wide: true, kicker: "AI IN MARKETING",
                slides: d.n ? Array.from({ length: d.n }, (_, i) => `assets/decks/${d.key}/${String(i + 1).padStart(2, "0")}.jpg`) : [],
                liner: { COURSE: AIM_COURSE, SEMESTER: "Fall 2026", BRAND: "Alani Nu" } }));

  // Photos from the Jukebox Blog (hosted on Wix, shown on the live site)
  const WIX = "https://static.wixstatic.com/media/";
  const JUKEBOX_PHOTOS = [
    { src: WIX + "97b82d_4ccb1da48c5a47d2b03373c013285efe~mv2.png/v1/crop/x_0,y_0,w_964,h_1280/fill/w_747,h_992,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/jukebox-4601812_1280.png", caption: "The blog's jukebox header", href: "https://rachelyjli.wixsite.com/jukeboxblog" },
    { src: WIX + "97b82d_344e535229c04b9590d9636d30383a68~mv2.jpg/v1/fill/w_440,h_341,fp_0.50_0.50,q_90,enc_avif,quality_auto/97b82d_344e535229c04b9590d9636d30383a68~mv2.webp", caption: "track.1 - about me", href: "https://rachelyjli.wixsite.com/jukeboxblog/post/track-1-about-me" },
    { src: WIX + "97b82d_02d2ae56a10547238285d5bc1f28279a~mv2.png/v1/fill/w_292,h_219,fp_0.50_0.50,q_95,enc_avif,quality_auto/97b82d_02d2ae56a10547238285d5bc1f28279a~mv2.webp", caption: "track.13 - how to drive the nj way", href: "https://rachelyjli.wixsite.com/jukeboxblog/post/track-13-how-to-drive-the-nj-way" },
    { src: WIX + "97b82d_882ec736e2ca4776a3302d9dba762c77~mv2.jpg/v1/fill/w_292,h_219,fp_0.50_0.50,q_90,enc_avif,quality_auto/97b82d_882ec736e2ca4776a3302d9dba762c77~mv2.webp", caption: "track.9 - jukebox stories (twitch streaming) · photo by Ella Don on Unsplash", href: "https://rachelyjli.wixsite.com/jukeboxblog/post/track-9-jukebox-stories-twitch-streaming" }
  ];

  const PAGES = [
    { id: "home", name: "home" },
    { id: "about", name: "about" },
    { id: "experience", name: "experience", title: "Experience", note: "EVERYTHING ON MY RESUME", icons: [
      { id: "education", file: "education.exe", type: "exe", body: `<h3>Education</h3><ul class="lines">
        <li><span class="when">MAY 2027</span><span><b>Rutgers Business School</b>, Rutgers, The State University of New Jersey <span class="place">· New Brunswick, NJ</span>
          <ul class="bul"><li>Bachelor of Science, Marketing. Concentration: Global Business</li><li>Minor: Digital Communication, Information, and Media</li><li>GPA: 3.96</li></ul></span></li></ul>` },
      { id: "work", file: "work_history.exe", type: "exe", body: `<h3>Work history</h3><ul class="lines">
        ${job("SUMMER 2026", "Summer Sales Intern", "BASF Agricultural Solutions", "Calgary, AB, Canada", [
          "Conducted market research, territory mapping in QGIS, and data collection to support field sales strategies",
          "Supported product positioning, lead generation, and relationship building with retailers and growers",
          "Surveyed fellow interns to identify gaps in the sales internship listing; proposed actionable changes and produced an introduction video to boost application and return rates"])}
        ${job("JUN 2023 – NOW", "Marketing Team Staff", "Knotty Pine Cottages", "Ingonish, NS, Canada", [
          "Develop website and leverage SEO and Google Ads to increase site visits and bookings",
          "Respond to customer reviews and queries on behalf of the business to elevate customer satisfaction"])}
        ${job("JUL 2024 – NOW", "Web Developer", "Skyline Cabins", "Ingonish, NS, Canada", [
          "Designed and launched website using WordPress, enabling customers to book stays online",
          "Maintain and improve website by updating room descriptions and images to reflect current offerings"])}
        </ul>` },
      { id: "consulting", file: "consulting.exe", type: "exe", body: `<h3>Consulting</h3><ul class="lines">
        ${job("SEP 2026 – NOW", "Consultant", "CM3A Student Consulting Team", "Sketch to Growth (S2G)", [
          "Advise a founder-led growth firm through a three-phase engagement: Discovery, Due Diligence, and Deployment",
          "Conduct competitive analysis and secondary research across 10+ sources, synthesizing findings into client strategy recommendations"])}
        </ul>` },
      { id: "research", file: "research.exe", type: "exe", body: `<h3>Research</h3><ul class="lines">
        ${job("JAN 2024 – JAN 2025", "Study Assistant", "Human Subjects Research", "", [
          "Credited in published study: Van Zant et al. (2025), <i>The power of pausing in collaborative conversations</i>",
          "Facilitated human behavior studies by leading research experiments and preparing data for quantitative analysis in Excel through data categorization, pattern recognition, and structured coding"])}
        </ul>` },
      { id: "leadership", file: "leadership.exe", type: "exe", body: `<h3>Activities &amp; leadership</h3><ul class="lines">
        ${job("APR 2024 – NOW", "Social Media Manager", "Asian Visual Culture Association", "", [
          "Design social media graphics to advertise events and solidify branding, with a peak view count of 15.3k",
          "Outline club objectives, coordinate weekly events, and manage a digital communication platform for over 300 members"])}
        ${job("MAY 2024 – NOW", "Graphics Chair", "Rutgers Korean Language Club", "", [
          "Design event, fundraiser, branding, and advertisement graphics for club social media",
          "Organize bi-weekly cultural events with up to 150 members in attendance"])}
        </ul>` },
      { id: "skills", file: "skills.txt", type: "txt", body: `<h3>Skills</h3><dl class="skillset">
        <dt>MARKETING &amp; ANALYTICS</dt><dd class="tags"><span class="tag">Google Ads</span><span class="tag">SEO</span><span class="tag">QGIS</span><span class="tag">Tableau*</span><span class="tag">R*</span><span class="tag">MySQL*</span></dd>
        <dt>CREATIVE</dt><dd class="tags"><span class="tag">Adobe Photoshop</span><span class="tag">Adobe Illustrator</span><span class="tag">Adobe Acrobat Pro</span><span class="tag">Canva</span></dd>
        <dt>TECHNICAL</dt><dd class="tags"><span class="tag">Excel</span><span class="tag">PowerPoint</span><span class="tag">Word</span><span class="tag">Google Sheets</span><span class="tag">Google Docs</span><span class="tag">Google Slides</span><span class="tag">WordPress</span><span class="tag">Wix</span></dd>
        <dt>LANGUAGES</dt><dd class="tags"><span class="tag">French (conversational)</span><span class="tag">Korean (conversational)</span></dd>
        </dl><p class="note">* coursework</p>` },
      { id: "certificates", file: "certificates.txt", type: "txt", body: `<h3>Certificates</h3><ul class="lines">
        <li><span class="when">CITI</span><span><b>Human Behavior Research Certificate</b></span></li>
        </ul>` },
      { id: "goals", file: "goals.txt", type: "txt", body: `<h3>Goals</h3><ul class="bul">
        <li>Lead a sustainability-driven marketing campaign</li>
        <li>Have an impact in my immediate community</li>
        <li>Make a difference in the world</li>
        </ul>` },
      { id: "resume", file: "resume.pdf", type: "pdf", body: resumeBody },
      { id: "linkedin", file: "linkedin.exe", type: "exe", body: linkedinBody, linkedin: true }
    ]},
    { id: "interests", name: "interests", title: "Interests", note: "WHO I AM OFF THE CLOCK", icons: [
      { id: "music", file: "music.mp3", type: "mp3", body: `<h3>Music</h3><p>Music is my heart &amp; soul. Here's what I currently have on repeat:</p>
        <ol class="tracklist hobbies"><li><span class="no">01</span><span><b>Anemia</b><span class="sub">ATEEZ</span></span><a class="len" href="https://open.spotify.com/track/2zJTkshMLjHy8YstGeb9H1" target="_blank" rel="noopener" aria-label="Play Anemia by ATEEZ on Spotify">PLAY &#8599;</a></li><li><span class="no">02</span><span><b>GOT IT ALL</b><span class="sub">RC AVENUE</span></span><a class="len" href="https://open.spotify.com/track/04NxyzEcsCQ8VATYup0kqG" target="_blank" rel="noopener" aria-label="Play GOT IT ALL by RC AVENUE on Spotify">PLAY &#8599;</a></li><li><span class="no">03</span><span><b>THE THRILL!</b><span class="sub">Never Ending Fall</span></span><a class="len" href="https://open.spotify.com/track/38uL88y9Wh4wZ0S6Jpz0tH" target="_blank" rel="noopener" aria-label="Play THE THRILL! by Never Ending Fall on Spotify">PLAY &#8599;</a></li></ol>
        <div class="actions"><a class="btn primary" href="https://open.spotify.com/user/22dq7sloxaxykm2g5i73cwxmy?si=dcfb0f687a4f4d40" target="_blank" rel="noopener">My Spotify &#8599;</a></div>` },
      { id: "culinary", file: "culinary.exe", type: "food", view: "photos", wide: true, title: "Culinary exploration", kicker: "FOOD ROLL", empty: "[my food photos here.]",
        desc: "I love tasting around the world. Check out my Beli for my favorite eats!",
        after: `<div class="actions"><a class="btn primary" href="https://beliapp.co/profile/racheug" target="_blank" rel="noopener">My Beli list &#8599;</a></div>`,
        photos: [
          { src: "assets/food/01-img_4844.jpg", name: "IMG_4844.JPG", alt: "Mushroom pizza with an orange-garnished drink at a sunny restaurant" },
          { src: "assets/food/02-img_4797.jpg", name: "IMG_4797.JPG", alt: "Biryani topped with red onion, with butter chicken, rice and naan" },
          { src: "assets/food/03-img_4770.jpg", name: "IMG_4770.JPG", alt: "Two sushi rolls and yellowtail sashimi on a slate plate" },
          { src: "assets/food/04-img_8839.jpg", name: "IMG_8839.JPG", alt: "Bubbling red tofu stew surrounded by side dishes and a raw egg" },
          { src: "assets/food/05-img_4639.jpg", name: "IMG_4639.JPG", alt: "Soup dumplings in a bamboo steamer beside a roast duck platter" },
          { src: "assets/food/06-img_8521.jpg", name: "IMG_8521.JPG", alt: "Taco platter with cilantro and lime, plus fried plantains with salsa verde" },
          { src: "assets/food/07-img_4133.jpg", name: "IMG_4133.JPG", alt: "Kimchi fried rice topped with a fried egg and drizzled sauces" },
          { src: "assets/food/08-img_3824.jpg", name: "IMG_3824.JPG", alt: "Takoyaki with mayo and bonito flakes in a black bowl" },
          { src: "assets/food/09-img_3533.jpg", name: "IMG_3533.JPG", alt: "Sizzling plate of pork sisig with lemon and chilies, beside white rice" },
          { src: "assets/food/10-img_3475.jpg", name: "IMG_3475.JPG", alt: "Golden seafood noodle soup in a brass pot" },
          { src: "assets/food/11-img_3435.jpg", name: "IMG_3435.JPG", alt: "Garlic naan, biryani, curry and chai on a wooden table" },
          { src: "assets/food/12-img_3229.jpg", name: "IMG_3229.JPG", alt: "Sandwich, fried chicken burger with fries, and grilled street corn" },
          { src: "assets/food/13-img_3228.jpg", name: "IMG_3228.JPG", alt: "Giant soft pretzel with mustard and beer cheese" },
          { src: "assets/food/14-img_2751.jpg", name: "IMG_2751.JPG", alt: "Chili oil noodles with two golden fried pastries" },
          { src: "assets/food/15-img_2588.jpg", name: "IMG_2588.JPG", alt: "Three stacked egg sandwiches in paper sleeves on a wooden tray" },
          { src: "assets/food/16-img_2041.jpg", name: "IMG_2041.JPG", alt: "Rice bowls, spicy cold noodles and fried dumplings on green trays" },
          { src: "assets/food/17-img_1901.jpg", name: "IMG_1901.JPG", alt: "Thai curry, wide noodles, soup and colorful drinks on a marble table" },
        ] },
      { id: "crafts", file: "arts_and_crafts.exe", type: "art", body: `<h3>Arts &amp; crafts</h3>
        <ol class="tracklist hobbies"><li><span class="no">01</span><span><b>Scrapbooking</b></span></li><li><span class="no">02</span><span><b>Toploader decorating</b></span></li><li><span class="no">03</span><span><b>Chinese knot tying</b></span></li><li><span class="no">04</span><span><b>Origami</b></span></li><li><span class="no">05</span><span><b>Jewelry making</b></span></li></ol>` },
      { id: "games", file: "video_games.exe", type: "game", body: `<h3>Video games</h3><p>Games are one of my favorite ways to connect with others. Here's what I've been playing lately:</p>
        <ol class="tracklist hobbies"><li><span class="no">01</span><span><b>Marvel Rivals</b><span class="sub">Peak Grandmaster</span></span><span class="len">Steam</span></li><li><span class="no">02</span><span><b>League of Legends</b><span class="sub">Peak Gold</span></span><span class="len">Riot Client</span></li><li><span class="no">03</span><span><b>Friendslop</b></span><span class="len">Any platform</span></li></ol>` },
      { id: "photography", file: "photography_and_travel.jpg", type: "cam", view: "photos", wide: true, title: "Photography &amp; Travel", kicker: "PHOTO ROLL",
        desc: "I want to travel the world, and take photos of everything as I go. Follow along with some of my recent adventures!", empty: "[my photos here.]",
        photos: [
          { src: "assets/photos/01-dsc00136.jpg", name: "DSC00136.JPG", alt: "Stone church bell tower at dusk behind red traffic lights" },
          { src: "assets/photos/02-dsc00098.jpg", name: "DSC00098.JPG", alt: "Striped stone building framed by autumn trees" },
          { src: "assets/photos/03-dsc00089.jpg", name: "DSC00089.JPG", alt: "Self-portrait with a silver digicam in a car's side mirror" },
          { src: "assets/photos/04-img_4707.jpg", name: "IMG_4707.JPG", alt: "Busy city street with brick buildings under a blue sky" },
          { src: "assets/photos/05-img_4711.jpg", name: "IMG_4711.JPG", alt: "Glowing hanging panels of Chinese calligraphy in a dark room" },
          { src: "assets/photos/06-img_4608.jpg", name: "IMG_4608.JPG", alt: "School of fish swimming through a deep blue tank" },
          { src: "assets/photos/07-img_4593.jpg", name: "IMG_4593.JPG", alt: "Moon jellyfish glowing in a blue tank" },
          { src: "assets/photos/08-img_4587.jpg", name: "IMG_4587.JPG", alt: "Red brick factory building with a clock tower under grey clouds" },
          { src: "assets/photos/09-img_9913.jpg", name: "IMG_9913.JPG", alt: '"dear unknown, bring it on!" stamped into a wet sidewalk' },
          { src: "assets/photos/10-img_9880.jpg", name: "IMG_9880.JPG", alt: "Hand holding a High Level Street Car ticket inside a wooden streetcar" },
          { src: "assets/photos/11-img_0677.jpg", name: "IMG_0677.JPG", alt: "Turquoise mountain lake beneath storm clouds and a glacier" },
          { src: "assets/photos/12-img_0612.jpg", name: "IMG_0612.JPG", alt: "Snowy peaks above a teal lake, framed by pines" },
          { src: "assets/photos/13-img_0285.jpg", name: "IMG_0285.JPG", alt: "Waterfall rushing through a pine forest canyon" },
          { src: "assets/photos/14-img_0057.jpg", name: "IMG_0057.JPG", alt: "Pond with a wooden footbridge, stone pagoda and purple irises" },
        ] },
      { id: "clubs", file: "organizations.exe", type: "exe", body: `<h3>Organizations</h3><ul class="lines">
        <li><span class="when">AVCA</span><span><b>Asian Visual Culture Association</b><br>Social Media Manager</span></li>
        <li><span class="when">KLC</span><span><b>Korean Language Club</b><br>Graphics Chair</span></li>
        </ul>` }
    ]},
    { id: "projects", name: "projects", title: "Projects", note: "CAPSTONE FIRST", wideArea: true, icons: [
      { id: "capstone", file: "capstone.htm", type: "htm", view: "site", featured: true, wide: true,
        url: "https://rachel-yj.github.io/capstone/", title: "The Authenticity Gap", kicker: "DCIM CAPSTONE",
        desc: "A look into how consumers really feel about generative AI in marketing.",
        liner: { COURSE: "DCIM Capstone", SEMESTER: "Fall 2026", FORMAT: "Multimedia article", TOOLS: "GitHub" } },
      { id: "aipsychosis", file: "ai_psychosis.htm", type: "htm", view: "site", wide: true,
        url: "https://aipsychosis.my.canva.site/", title: "AI Psychosis and Sycophancy", kicker: "SELF & SOCIETY IN VIRTUAL CONTEXTS",
        desc: "A look into the consequences of human-AI interaction and its effects on society going forward.",
        liner: { COURSE: "Self &amp; Society in Virtual Contexts", SEMESTER: "Summer 2025", TOOLS: "Canva" } },
      { id: "blamegame", file: "the_blame_game.jpg", type: "jpg", view: "image", wide: true,
        src: "assets/projects/the-blame-game.jpg", alt: "The Blame Game: an infographic on how the media frames pandemics and shapes public perception",
        title: "The Blame Game", kicker: "STRUCTURE OF INFORMATION",
        desc: "An infographic examining how media frames pandemics and shapes public perception.",
        liner: { COURSE: "Structure of Information, Section 96", SEMESTER: "Spring 2025", TOOLS: "Canva" } },
      { id: "jukebox", file: "jukebox_blog.htm", type: "htm", view: "site", wide: true,
        url: "https://rachelyjli.wixsite.com/jukeboxblog", title: "Jukebox Blog", kicker: "BLOG",
        desc: "A personal blog and exploration of music and passion.",
        photos: JUKEBOX_PHOTOS,
        liner: { COURSE: "Strategic Presentation Methods in Digital Media", SEMESTER: "Fall 2025", TOOLS: "Wix" } },
      { id: "aimkt", file: "ai_in_marketing", type: "dir", view: "folder", children: AIM_DECKS,
        title: "AI in Marketing", desc: `My Alani Nu slide decks from ${AIM_COURSE}, Fall 2026. Open one to page through it.` }
    ]},
    { id: "contact", name: "contact", title: "Contact", note: "SAY HI", icons: [
      { id: "contactme", file: "contact.txt", type: "txt", body: `<h3>Contact</h3><p>Want to reach out? Feel free to connect with me:</p><ul class="lines"><li><span class="when">EMAIL</span><span class="email-row"><a href="mailto:rachel.yj.li@gmail.com">rachel.yj.li@gmail.com</a><button type="button" class="tb-btn txt" data-copy="rachel.yj.li@gmail.com">Copy</button></span></li><li><span class="when">LINKEDIN</span><span><a href="${LINKEDIN}" target="_blank" rel="noopener">linkedin.com/in/rachel-y-li</a></span></li></ul>` },
      { id: "li2", file: "linkedin.exe", type: "exe", body: linkedinBody, linkedin: true },
      { id: "resume2", file: "resume.pdf", type: "pdf", body: resumeBody }
    ]}
  ];

  // ---------- helpers ----------
  const SITE = "SHOWCASE";
  const $ = s => document.querySelector(s);
  const pad2 = n => String(n).padStart(2, "0");
  const reduce = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const small = () => window.matchMedia("(max-width: 860px)").matches;

  const homeSec = $("[data-home]"), pageSec = $("[data-page]");
  const slotHome = $("[data-slot-home]"), slotSide = $("[data-slot-side]");
  const homeTitle = $("[data-hometitle]"), pageTitle = $("[data-pagetitle]");
  const eyebrow = $("[data-eyebrow]"), pageNote = $("[data-pagenote]"), deskHost = $("[data-deskhost]");
  const homeTrack = $("[data-hometrack]");
  const aboutSec = $("[data-about]"), aboutTrack = $("[data-abouttrack]");
  const winbar = $("[data-winbar]"), barTrack = $("[data-bartrack]");

  let current = null;   // id of the page on screen
  let sel = 0;          // highlighted row on the player screen
  let z = 100;

  // ---------- the player (vector for now; a real MP3-player photo can replace the SVG body later) ----------
  const player = document.createElement("nav");
  player.className = "device-nav";
  player.setAttribute("aria-label", "Site navigation");
  player.innerHTML = `
    <svg class="dev-body" viewBox="0 0 260 440" aria-hidden="true" focusable="false">
      <rect class="dv-body" x="2" y="2" width="256" height="436" rx="36"/>
      <rect class="dv-line" x="10" y="10" width="240" height="420" rx="30"/>
      <text class="dv-brand" x="130" y="23" text-anchor="middle">${SITE}</text>
      <rect class="dv-bezel" x="24" y="30" width="212" height="174" rx="12"/>
      <rect class="dv-display" x="32" y="38" width="196" height="158" rx="6"/>
      <circle class="dv-wheel" cx="130" cy="318" r="92"/>
      <circle class="dv-center" cx="130" cy="318" r="34"/>
    </svg>
    <div class="dev-screen">
      <div class="dev-bar"><span>${SITE}</span><span class="dev-batt" aria-hidden="true"></span></div>
      <ol class="dev-menu">${PAGES.map(p => `<li><button type="button" class="dev-item" data-nav="${p.id}"><span>${p.name}</span><span class="dev-arrow" aria-hidden="true">&gt;</span></button></li>`).join("")}</ol>
    </div>
    <button type="button" class="whl w-menu" data-menu aria-label="Menu: go to home">MENU</button>
    <button type="button" class="whl w-prev" data-move="-1" aria-label="Highlight previous page"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h3v14H4zM20 5L9 12l11 7z"/></svg></button>
    <button type="button" class="whl w-next" data-move="1" aria-label="Highlight next page"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17 5h3v14h-3zM4 5l11 7-11 7z"/></svg></button>
    <button type="button" class="whl w-play" data-ok aria-label="Play highlighted page"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M1 5l9 7-9 7zM13 5h3v14h-3zM19 5h3v14h-3z"/></svg></button>
    <button type="button" class="whl w-ok" data-ok aria-label="Open highlighted page"></button>`;
  const items = [...player.querySelectorAll(".dev-item")];

  function paintPlayer() {
    items.forEach((b, i) => {
      b.classList.toggle("sel", i === sel);
      if (PAGES[i].id === current) b.setAttribute("aria-current", "page"); else b.removeAttribute("aria-current");
      b.setAttribute("aria-label", PAGES[i].name + (PAGES[i].id === current ? ", current page" : ""));
    });
    const i = Math.max(0, PAGES.findIndex(p => p.id === current));
    if (barTrack) barTrack.textContent = `TRACK ${pad2(i + 1)} / ${pad2(PAGES.length)}`;
  }
  player.addEventListener("click", e => {
    const nav = e.target.closest("[data-nav]");
    const mv = e.target.closest("[data-move]");
    if (nav) go(nav.dataset.nav);
    else if (mv) { sel = (sel + (+mv.dataset.move) + PAGES.length) % PAGES.length; paintPlayer(); }
    else if (e.target.closest("[data-ok]")) go(PAGES[sel].id);
    else if (e.target.closest("[data-menu]")) go("home");
  });
  player.addEventListener("keydown", e => {
    if (!e.target.classList.contains("dev-item")) return;
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      sel = (sel + (e.key === "ArrowDown" ? 1 : -1) + PAGES.length) % PAGES.length;
      paintPlayer(); items[sel].focus();
    }
  });

  // ---------- windows: raise, minimize, maximize, close, drag anywhere on the page ----------
  function raise(w) { w.style.zIndex = ++z; }

  function setTranslate(w, x, y) { w.dataset.tx = x; w.dataset.ty = y; w.style.translate = `${x}px ${y}px`; }

  function wireWin(w, opts = {}) {
    w.addEventListener("pointerdown", () => raise(w));
    w.querySelectorAll(".win-btn[data-act]").forEach(b => b.addEventListener("click", e => {
      e.stopPropagation();
      const a = b.dataset.act;
      if (a === "min") w.classList.toggle("is-min");
      if (a === "max") w.classList.toggle("is-max");
      if (a === "close") {
        w.classList.remove("is-max");
        if (opts.close) opts.close(w);
        else { w.hidden = true; if (opts.onClose) opts.onClose(); }
      }
    }));
    if (w.hasAttribute("data-nodrag")) return;
    const bar = w.querySelector(".titlebar");
    if (!bar) return;
    let sx, sy, bx, by, r, dragging = false;
    bar.addEventListener("pointerdown", e => {
      if (e.button !== 0 || e.target.closest("button") || small() || w.classList.contains("is-max")) return;
      dragging = true; w.classList.add("dragging");
      sx = e.clientX; sy = e.clientY;
      bx = +w.dataset.tx || 0; by = +w.dataset.ty || 0;
      r = w.getBoundingClientRect();
      bar.setPointerCapture(e.pointerId);
      e.preventDefault();
    });
    bar.addEventListener("pointermove", e => {
      if (!dragging) return;
      // keep the whole window on the page: inside the viewport width, below the top bar, above the page bottom
      const W = document.documentElement.clientWidth;
      const topLimit = -window.scrollY + (winbar ? winbar.offsetHeight : 0);
      const bottomLimit = document.documentElement.scrollHeight - window.scrollY;
      const dx = Math.max(-r.left, Math.min(W - r.right, e.clientX - sx));
      const dy = Math.max(topLimit - r.top, Math.min(bottomLimit - r.bottom, e.clientY - sy));
      setTranslate(w, bx + dx, by + dy);
    });
    const end = () => { dragging = false; w.classList.remove("dragging"); };
    bar.addEventListener("pointerup", end);
    bar.addEventListener("pointercancel", end);
  }

  // ---------- trash: closed home/About windows go here and can be restored ----------
  const trashBtn = $("[data-trash]"), trashCount = $("[data-trashcount]");
  const bin = $("#w-bin"), binList = $("[data-binlist]"), binAll = $("[data-binall]");
  const trashed = [];

  function towardTrash(w, reverse) {
    if (reduce() || !trashBtn) return null;
    const r = w.getBoundingClientRect(), t = trashBtn.getBoundingClientRect();
    const dx = (t.left + t.width / 2) - (r.left + r.width / 2), dy = (t.top + t.height / 2) - (r.top + r.height / 2);
    const frames = [{ transform: "none", opacity: 1 }, { transform: `translate(${dx}px, ${dy}px) scale(.08)`, opacity: .2 }];
    return w.animate(reverse ? frames.reverse() : frames, { duration: 420, easing: reverse ? "cubic-bezier(.2,.8,.2,1)" : "cubic-bezier(.55,0,.8,.2)" });
  }
  function trashWin(w) {
    const anim = towardTrash(w);
    const done = () => {
      w.hidden = true;
      if (!trashed.includes(w)) trashed.push(w);
      renderBin();
      if (!reduce()) trashBtn.animate([{ transform: "rotate(0)" }, { transform: "rotate(-10deg)" }, { transform: "rotate(8deg)" }, { transform: "rotate(0)" }], { duration: 360 });
    };
    if (anim) anim.onfinish = done; else done();
  }
  function restoreWin(w) {
    const i = trashed.indexOf(w); if (i > -1) trashed.splice(i, 1);
    w.hidden = false; w.classList.remove("is-min"); raise(w);
    if (!bin.hidden) raise(bin);   // keep the trash window on top while restoring
    towardTrash(w, true);
    renderBin();
  }
  function renderBin() {
    const n = trashed.length;
    trashBtn.classList.toggle("has-items", n > 0);
    trashCount.textContent = n ? `(${n})` : "";
    trashBtn.setAttribute("aria-label", n ? `Trash, ${n} closed window${n > 1 ? "s" : ""}. Open to restore` : "Trash, empty");
    binList.innerHTML = "";
    if (!n) { binList.innerHTML = `<li class="bin-empty">The trash is empty.</li>`; binAll.hidden = true; return; }
    binAll.hidden = false;
    trashed.forEach(w => {
      const name = w.querySelector(".titlebar .title").textContent;
      const li = document.createElement("li");
      li.innerHTML = `${iconSVG(name.endsWith(".mp3") ? "mp3" : name.endsWith(".txt") ? "txt" : "exe")}<span class="bin-name"></span><button type="button" class="btn">Restore</button>`;
      li.querySelector(".bin-name").textContent = name;
      li.querySelector("button").setAttribute("aria-label", `Restore ${name}`);
      li.querySelector("button").addEventListener("click", () => restoreWin(w));
      binList.appendChild(li);
    });
  }
  if (trashBtn) {
    trashBtn.addEventListener("click", () => {
      bin.hidden = !bin.hidden;
      if (!bin.hidden && !bin.dataset.tx) {   // open just below the trash icon
        const ar = aboutSec.getBoundingClientRect(), tr = trashBtn.getBoundingClientRect();
        bin.style.top = Math.round(tr.bottom - ar.top + 12) + "px";
      }
      trashBtn.setAttribute("aria-expanded", String(!bin.hidden));
      if (!bin.hidden) { raise(bin); if (!reduce()) bin.animate([{ opacity: 0, transform: "scale(.96)" }, { opacity: 1, transform: "scale(1)" }], { duration: 160, easing: "ease-out" }); }
    });
    binAll.addEventListener("click", () => [...trashed].forEach(restoreWin));
    renderBin();
  }

  // ---------- routing + transitions ----------
  function go(id) {
    if (location.hash.slice(1) === id) show(id);
    else location.hash = id;
  }
  window.addEventListener("hashchange", () => show(location.hash.slice(1)));

  function flip(el, from, to, opts) {
    if (!from || !to.width || !to.height || reduce()) return;
    const s = opts.byHeight ? from.height / to.height : Math.min(from.width / to.width, from.height / to.height);
    el.animate([
      { transformOrigin: "0 0", transform: `translate(${from.left - to.left}px, ${from.top - to.top}px) scale(${s})`, opacity: opts.fade ? 0.25 : 1 },
      { transformOrigin: "0 0", transform: "none", opacity: 1 }
    ], { duration: opts.ms || 700, easing: "cubic-bezier(.2,.75,.15,1)" });
  }

  const homeView = id => id === "home" || id === "about";
  function scrollToAbout(instant) {
    aboutSec.scrollIntoView({ behavior: instant || reduce() ? "auto" : "smooth", block: "start" });
  }

  function show(id, initial) {
    const idx = Math.max(0, PAGES.findIndex(p => p.id === id));
    const page = PAGES[idx];
    if (!initial && page.id === current) { if (page.id === "about") scrollToAbout(); return; }
    const wasHome = current !== null && homeView(current);
    const toHome = homeView(page.id);

    // moving between home and about is just a scroll
    if (!initial && wasHome && toHome) {
      current = page.id; sel = idx; paintPlayer();
      if (page.id === "about") scrollToAbout();
      else window.scrollTo({ top: 0, behavior: reduce() ? "auto" : "smooth" });
      return;
    }

    const fromDev = initial ? null : player.getBoundingClientRect();
    const fromTitle = initial ? null : (wasHome ? homeTitle : pageTitle).getBoundingClientRect();

    current = page.id; sel = idx;
    homeSec.hidden = !toHome;
    pageSec.hidden = toHome;
    (toHome ? slotHome : slotSide).appendChild(player);
    if (!toHome) {
      pageTitle.textContent = page.title;
      eyebrow.textContent = `TRACK ${pad2(idx + 1)} / ${pad2(PAGES.length)}`;
      pageNote.textContent = page.note || "";
      showDesk(page);
    }
    paintPlayer();
    document.title = toHome ? SITE : `${page.title} · ${SITE}`;
    window.scrollTo({ top: 0, behavior: "instant" });
    if (initial || reduce()) { if (page.id === "about") scrollToAbout(true); return; }

    flip(player, fromDev, player.getBoundingClientRect(), {});
    const titleEl = toHome ? homeTitle : pageTitle;
    if (wasHome !== toHome) {
      flip(titleEl, fromTitle, titleEl.getBoundingClientRect(), { byHeight: true, fade: true });
    } else {
      titleEl.animate([{ opacity: 0, transform: "translateY(-14px)" }, { opacity: 1, transform: "none" }], { duration: 300, easing: "ease-out" });
    }
    if (!toHome) {
      const desk = deskHost.querySelector(`[data-for="${page.id}"]`);
      desk.querySelectorAll(".icon").forEach((ic, i) =>
        ic.animate([{ opacity: 0, transform: "translateY(10px)" }, { opacity: 1, transform: "none" }],
          { duration: 280, delay: (wasHome ? 380 : 120) + i * 55, easing: "ease-out", fill: "backwards" }));
    }
    if (page.id === "about") setTimeout(() => scrollToAbout(), 720);
  }

  // on the home view, the player highlight follows the scroll between home and about
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (!homeView(current)) return;
        const next = en.isIntersecting ? "about" : "home";
        if (next === current) return;
        current = next; sel = PAGES.findIndex(p => p.id === next); paintPlayer();
        history.replaceState(null, "", "#" + next);
      });
    }, { threshold: 0.3 }).observe(aboutSec);
  }

  // ---------- icon desktops ----------
  function syncEmpty(area) {
    const anyOpen = [...area.querySelectorAll(".win")].some(w => !w.hidden);
    area.querySelector(".empty").hidden = anyOpen;
  }

  function showDesk(page) {
    let desk = deskHost.querySelector(`[data-for="${page.id}"]`);
    if (!desk) desk = buildDesk(page);
    deskHost.querySelectorAll(".desk-page").forEach(d => { d.hidden = d !== desk; });
  }

  // ---------- project viewers ----------
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const ARROW_L = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M16 4L6 12l10 8z"/></svg>';
  const ARROW_R = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 4l10 8-10 8z"/></svg>';
  const RELOAD = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4a8 8 0 1 0 8 8h-3a5 5 0 1 1-5-5v3l5-4.5L12 1z"/></svg>';
  const linerHTML = l => l ? `<dl class="liner">${Object.entries(l).map(([k, v]) => `<dt>${k}</dt><dd>${v}</dd>`).join("")}</dl>` : "";
  const headHTML = ic => `<div class="v-head">${ic.kicker ? `<span class="eyebrow">${ic.kicker}</span>` : ""}<h3>${ic.title}</h3>${ic.desc ? `<p>${ic.desc}</p>` : ""}</div>`;
  const pad4 = n => String(n).padStart(4, "0");

  function galleryHTML(photos, empty) {
    const has = photos && photos.length;
    return `<div class="gallery" data-gallery>
      ${empty ? "" : `<span class="eyebrow">PHOTOS</span>`}
      <div class="screen gal-screen${has ? "" : " is-empty"}">${has ? `<img data-gimg alt="">` : `<p class="screen-note">${empty || "[photos from my blog here.]"}</p>`}</div>
      <div class="slidebar">
        <button type="button" class="tb-btn" data-gstep="-1" aria-label="Previous photo" ${has ? "" : "disabled"}>${ARROW_L}</button>
        <span class="count" data-gcount>${has ? `IMG_0001.JPG · 01 / ${pad2(photos.length)}` : "NO PHOTOS YET"}</span>
        <button type="button" class="tb-btn" data-gstep="1" aria-label="Next photo" ${has ? "" : "disabled"}>${ARROW_R}</button>
      </div>
      <p class="caption"><span data-gcap></span> <a data-glink target="_blank" rel="noopener" hidden>View post &#8599;</a></p>
    </div>`;
  }

  function viewerHTML(ic) {
    if (ic.view === "site") return {
      chrome: `<div class="toolbar">
          <button type="button" class="tb-btn" disabled aria-label="Back">${ARROW_L}</button>
          <button type="button" class="tb-btn" disabled aria-label="Forward">${ARROW_R}</button>
          <button type="button" class="tb-btn" data-reload aria-label="Reload preview">${RELOAD}</button>
          <div class="addr"><span class="k">Address</span><output>${esc(ic.url)}</output></div>
          <a class="tb-btn go" href="${esc(ic.url)}" target="_blank" rel="noopener">Go &#8599;</a>
        </div>`,
      body: `${headHTML(ic)}
        <div class="screen site-screen" data-sitescreen>
          <div class="screen-idle"><button type="button" class="btn primary" data-load>&#9654; Load live preview</button><span>runs the real site inside this window</span></div>
        </div>
        <div class="actions"><a class="btn primary" href="${esc(ic.url)}" target="_blank" rel="noopener">Open site in new tab &#8599;</a></div>
        ${ic.photos ? galleryHTML(ic.photos) : ""}
        ${linerHTML(ic.liner)}`,
      status: "Done"
    };
    if (ic.view === "photos") return { chrome: "", body: `${headHTML(ic)}${galleryHTML(ic.photos, ic.empty)}${ic.after || ""}`, status: `${ic.photos.length} photos` };
    if (ic.view === "image") return {
      chrome: `<div class="toolbar">
          <button type="button" class="tb-btn txt" data-zoom="fit" aria-pressed="true">Fit</button>
          <button type="button" class="tb-btn txt" data-zoom="full" aria-pressed="false">100%</button>
          <span class="tb-spacer"></span>
          <a class="tb-btn go" href="${esc(ic.src)}" target="_blank" rel="noopener">Full size &#8599;</a>
        </div>`,
      body: `${headHTML(ic)}
        <div class="screen img-screen" data-imgscreen><img src="${esc(ic.src)}" alt="${esc(ic.alt || ic.title)}" loading="lazy" data-zoomimg></div>
        <p class="note">Click the image to zoom; scroll inside the frame to read it.</p>
        ${linerHTML(ic.liner)}`,
      status: "Done"
    };
    if (ic.view === "deck") {
      const n = ic.slides.length;
      const stage = n ? `<img data-slide alt="">`
        : `<div class="deck-cover"><span class="eyebrow">SLIDE DECK</span><span class="deck-title">${ic.title}</span><span class="screen-note">[my deck here.]</span></div>`;
      return {
        chrome: "",
        body: `${headHTML(ic)}
          <div class="screen deck-screen">${stage}</div>
          ${n ? `<div class="slidebar"><button type="button" class="tb-btn" data-sstep="-1" aria-label="Previous slide">${ARROW_L}</button><span class="count" data-scount>01 / ${pad2(n)}</span><button type="button" class="tb-btn" data-sstep="1" aria-label="Next slide">${ARROW_R}</button></div>` : ""}
          ${!n && ic.url ? `<div class="actions"><a class="btn primary" href="${esc(ic.url)}" target="_blank" rel="noopener">Open deck &#8599;</a></div>` : ""}
          ${linerHTML(ic.liner)}`,
        status: n ? `${n} slides` : "Done"
      };
    }
    if (ic.view === "folder") return {
      chrome: `<div class="toolbar"><div class="addr"><span class="k">Address</span><output>C:\\Projects\\${esc(ic.file)}</output></div></div>`,
      body: `<p>${ic.desc}</p><nav class="folder-grid" data-folder aria-label="${esc(ic.title)}"></nav>`,
      status: `${ic.children.length} items`
    };
    return { chrome: "", body: ic.body, status: "Done" };
  }

  function wireViewer(w, ic, openChild) {
    const load = () => {
      const scr = w.querySelector("[data-sitescreen]");
      scr.innerHTML = `<iframe src="${esc(ic.url)}" title="${esc(ic.title)} (live preview)" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`;
    };
    w.querySelector("[data-load]")?.addEventListener("click", load);
    w.querySelector("[data-reload]")?.addEventListener("click", load);

    // image zoom
    const img = w.querySelector("[data-zoomimg]");
    if (img) {
      const screen = w.querySelector("[data-imgscreen]");
      const set = mode => {
        screen.classList.toggle("is-full", mode === "full");
        w.querySelectorAll("[data-zoom]").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.zoom === mode)));
      };
      w.querySelectorAll("[data-zoom]").forEach(b => b.addEventListener("click", () => set(b.dataset.zoom)));
      img.addEventListener("click", () => set(screen.classList.contains("is-full") ? "fit" : "full"));
    }

    // photo gallery
    const gal = w.querySelector("[data-gallery]");
    if (gal && ic.photos && ic.photos.length) {
      let i = 0;
      const gimg = gal.querySelector("[data-gimg]");
      const paint = () => {
        const p = ic.photos[i];
        gimg.src = p.src; gimg.alt = p.alt || p.caption || `${ic.title} photo ${i + 1}`;
        gal.querySelector("[data-gcount]").textContent = `${p.name || `IMG_${pad4(i + 1)}.JPG`} · ${pad2(i + 1)} / ${pad2(ic.photos.length)}`;
        [1, -1].forEach(d => { const n = ic.photos[(i + d + ic.photos.length) % ic.photos.length]; if (n.src) new Image().src = n.src; });
        gal.querySelector("[data-gcap]").textContent = p.caption || "";
        const link = gal.querySelector("[data-glink]");
        if (p.href) { link.href = p.href; link.hidden = false; } else link.hidden = true;
        gimg.hidden = false; gal.querySelector("[data-gfail]")?.remove();
      };
      gimg.addEventListener("error", () => {
        gimg.hidden = true;
        if (!gal.querySelector("[data-gfail]")) gimg.insertAdjacentHTML("afterend", `<p class="screen-note" data-gfail>photo couldn't load here; open the post to see it</p>`);
      });
      const gstep = d => { i = (i + d + ic.photos.length) % ic.photos.length; paint(); };
      gal.querySelectorAll("[data-gstep]").forEach(b => b.addEventListener("click", () => gstep(+b.dataset.gstep)));
      if (!ic.photos.some(p => p.href)) { gimg.style.cursor = "pointer"; gimg.addEventListener("click", () => gstep(1)); }
      w.addEventListener("keydown", e => { if (e.key === "ArrowRight") gstep(1); else if (e.key === "ArrowLeft") gstep(-1); });
      paint();
    }

    // slide images
    if (ic.view === "deck" && ic.slides.length) {
      let i = 0;
      const simg = w.querySelector("[data-slide]");
      const L = ic.slides.length;
      const paint = () => {
        simg.src = ic.slides[i]; simg.alt = `${ic.title}, slide ${i + 1} of ${L}`;
        w.querySelector("[data-scount]").textContent = `${pad2(i + 1)} / ${pad2(L)}`;
        [i + 1, i - 1].forEach(j => { const im = new Image(); im.src = ic.slides[(j + L) % L]; });
      };
      const step = d => { i = (i + d + L) % L; paint(); };
      w.querySelectorAll("[data-sstep]").forEach(b => b.addEventListener("click", () => step(+b.dataset.sstep)));
      simg.addEventListener("click", () => step(1));
      w.tabIndex = -1;
      w.addEventListener("keydown", e => { if (e.key === "ArrowRight") step(1); if (e.key === "ArrowLeft") step(-1); });
      paint();
    }

    // folder contents
    const grid = w.querySelector("[data-folder]");
    if (grid) ic.children.forEach(ch => grid.appendChild(iconButton(ch, () => openChild(ch))));

    if (ic.linkedin) loadLinkedIn();
  }

  // LinkedIn's official profile badge: load its script once, then ask it to render any new badges
  let liState = 0;
  function loadLinkedIn() {
    if (liState === 2) { if (window.LIRenderAll) window.LIRenderAll(); return; }
    if (liState === 1) return;
    liState = 1;
    const s = document.createElement("script");
    s.src = "https://platform.linkedin.com/badges/js/profile.js";
    s.async = true; s.defer = true;
    s.onload = () => { liState = 2; if (window.LIRenderAll) window.LIRenderAll(); };
    s.onerror = () => { liState = 0; };
    document.body.appendChild(s);
  }

  function iconButton(ic, onOpen) {
    const b = document.createElement("button");
    b.type = "button"; b.className = "icon";
    b.setAttribute("aria-expanded", "false");
    b.setAttribute("aria-controls", `w-${ic.id}`);
    b.innerHTML = `${iconSVG(ic.type)}<span></span>`;
    // long file names may wrap after an underscore, the way old desktops wrapped icon labels
    const label = (ic.featured ? "* " : "") + ic.file + (ic.view === "folder" ? "/" : "");
    b.querySelector("span").innerHTML = label.length > 20 ? esc(label).replace(/_/g, "_<wbr>") : esc(label);
    b.addEventListener("click", onOpen);
    ic._btn = b;
    return b;
  }

  function buildDesk(page) {
    const desk = document.createElement("div");
    desk.className = "desk-page" + (page.wideArea ? " wide-area" : "");
    desk.dataset.for = page.id;
    desk.innerHTML = `<nav class="desk-icons" aria-label="${page.title} contents"></nav>
      <div class="area"><p class="empty">click an icon to open it</p></div>`;
    const nav = desk.querySelector(".desk-icons");
    const area = desk.querySelector(".area");
    let opened = 0;

    page.icons.forEach(ic => nav.appendChild(iconButton(ic, () => openWin(ic))));

    function openWin(ic) {
      let w = document.getElementById(`w-${ic.id}`);
      const fresh = !w;
      if (!w) {
        const v = viewerHTML(ic);
        w = document.createElement("section");
        w.className = "win" + (ic.wide ? " wide" : "") + (ic.view ? ` v-${ic.view}` : "");
        w.id = `w-${ic.id}`;
        w.setAttribute("aria-labelledby", `t-${ic.id}`);
        const off = Math.min(opened++ * 32, 224);
        w.style.left = off + "px"; w.style.top = off + "px";
        w.innerHTML = `<div class="titlebar"><span class="title" id="t-${ic.id}"></span>
            <div class="win-btns">
              <button class="win-btn" type="button" data-act="min" aria-label="Minimize ${ic.file}"></button>
              <button class="win-btn" type="button" data-act="max" aria-label="Maximize ${ic.file}">□</button>
              <button class="win-btn" type="button" data-act="close" aria-label="Close ${ic.file}">×</button>
            </div></div>
          ${v.chrome}
          <div class="pane w-body${ic.view ? " viewer" : ""}">${v.body}</div>
          <div class="statusbar"><span>${v.status}</span><span>${ic.view === "folder" ? "FOLDER" : ic.type.toUpperCase()}</span></div>`;
        w.querySelector(".title").textContent = ic.file + (ic.view === "folder" ? "/" : "");
        area.appendChild(w);
        wireWin(w, { onClose: () => { ic._btn.setAttribute("aria-expanded", "false"); if (ic._btn.isConnected && !ic._btn.closest("[hidden]")) ic._btn.focus(); syncEmpty(area); } });
        wireViewer(w, ic, openWin);
      }
      w.hidden = false; w.classList.remove("is-min");
      raise(w);
      ic._btn.setAttribute("aria-expanded", "true");
      syncEmpty(area);
      if (!reduce()) w.animate([{ opacity: 0, transform: "scale(.96)" }, { opacity: 1, transform: "none" }], { duration: fresh ? 200 : 140, easing: "ease-out" });
      if (small()) w.scrollIntoView({ block: "start", behavior: reduce() ? "auto" : "smooth" });
      if (ic.linkedin && !fresh) loadLinkedIn();
    }

    deskHost.appendChild(desk);
    openWin(page.icons[0]);   // the first window starts open so no page looks empty
    return desk;
  }

  // copy buttons (e.g. the email address on Contact)
  document.addEventListener("click", e => {
    const b = e.target.closest("[data-copy]");
    if (!b) return;
    const done = ok => { b.textContent = ok ? "Copied" : "Select it"; setTimeout(() => { b.textContent = "Copy"; }, 1600); };
    try { navigator.clipboard.writeText(b.dataset.copy).then(() => done(true), () => done(false)); } catch (_) { done(false); }
  });

  // ---------- home + about windows ----------
  homeSec.querySelectorAll(".win").forEach(w => {
    if (w.id === "w-bin") wireWin(w, { onClose: () => trashBtn.setAttribute("aria-expanded", "false") });
    else if (w.hasAttribute("data-closable")) wireWin(w, { close: trashWin });
    else wireWin(w);
  });
  document.querySelectorAll("[data-go]").forEach(b => b.addEventListener("click", () => go(b.dataset.go)));
  if (homeTrack) homeTrack.textContent = `TRACK 01 / ${pad2(PAGES.length)} · HOME`;
  if (aboutTrack) aboutTrack.textContent = `TRACK 02 / ${pad2(PAGES.length)} · ABOUT`;

  // reset dragged positions when the layout switches to the stacked phone view
  window.matchMedia("(max-width: 860px)").addEventListener("change", e => {
    if (e.matches) document.querySelectorAll(".win").forEach(w => { delete w.dataset.tx; delete w.dataset.ty; w.style.translate = ""; });
  });

  show(location.hash.slice(1) || "home", true);
})();
