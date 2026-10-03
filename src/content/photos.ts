/**
 * Photography used across the site.
 *
 * All images are from Unsplash, free under the Unsplash License
 * (https://unsplash.com/license), downloaded and self-hosted as WebP in
 * public/images/photos. Each was checked to not be an Unsplash+ image.
 * People shown are illustrative — never present them as clients, coaches or
 * the founder. Credits are listed on /credits.
 */
export interface Photo {
  slug: string;
  alt: string;
  /** Natural aspect ratio (width / height) of the downloaded files. */
  ratio: number;
  widths: number[];
  photographer: string;
  sourceUrl: string;
}

const photo = (p: Photo) => p;

export const photos = {
  glassFacade: photo({
    slug: "glass-facade",
    alt: "Glass facade of a modern office building at dusk",
    ratio: 640 / 960,
    widths: [640, 1280],
    photographer: "Fabian Kleiser",
    sourceUrl: "https://unsplash.com/photos/V5vF94h52r0",
  }),
  auditorium: photo({
    // Cropped to the stage and audience (the original's screens carry event text).
    slug: "auditorium-wide",
    alt: "A speaker on stage addressing a large audience in a dark auditorium",
    ratio: 2400 / 590,
    widths: [1200, 2400],
    photographer: "Alexandre Pellaes",
    sourceUrl: "https://unsplash.com/photos/6vAjp0pscX0",
  }),
  meetingTable: photo({
    slug: "meeting-table",
    alt: "A presenter leading a meeting with colleagues around a table",
    ratio: 640 / 427,
    widths: [640, 1280],
    photographer: "Marcel Petzold",
    sourceUrl: "https://unsplash.com/photos/FBnElwHyMkM",
  }),
  bostonDusk: photo({
    slug: "boston-dusk",
    alt: "City skyline illuminated at dusk over the water",
    ratio: 960 / 503,
    widths: [960, 1920],
    photographer: "Alex S.",
    sourceUrl: "https://unsplash.com/photos/e5ZRWZizFF4",
  }),
  presentingLeadership: photo({
    slug: "presenting-leadership",
    alt: "An executive presenting insights on a digital display to her team",
    ratio: 640 / 360,
    widths: [640, 1280],
    photographer: "Vitaly Gariev",
    sourceUrl: "https://unsplash.com/photos/Y7TJOcAtnpw",
  }),
  whiteboardTeam: photo({
    slug: "whiteboard-team",
    alt: "A team discussing strategy around a whiteboard in a modern office",
    ratio: 640 / 360,
    widths: [640, 1280],
    photographer: "Vitaly Gariev",
    sourceUrl: "https://unsplash.com/photos/rgKX4o2xSqI",
  }),
  penNotebook: photo({
    slug: "pen-notebook",
    alt: "A pen resting on an open notebook on a desk",
    ratio: 640 / 962,
    widths: [640, 1280],
    photographer: "Ryunosuke Kikuno",
    sourceUrl: "https://unsplash.com/photos/viEzuL1ouDs",
  }),
  handshake: photo({
    slug: "handshake",
    alt: "Two professionals in dark suits shaking hands",
    ratio: 640 / 427,
    widths: [640, 1280],
    photographer: "Ambre Estève",
    sourceUrl: "https://unsplash.com/photos/6-iunIrJtbQ",
  }),
  studioMicrophone: photo({
    slug: "studio-microphone",
    alt: "A studio microphone in low, warm light",
    ratio: 640 / 427,
    widths: [640, 1280],
    photographer: "John Matychuk",
    sourceUrl: "https://unsplash.com/photos/yeQ60WfL5Nk",
  }),
  glassClouds: photo({
    slug: "glass-clouds",
    alt: "Black-and-white facade of a glass building reflecting clouds",
    ratio: 640 / 853,
    widths: [640, 1280],
    photographer: "Sebastian Schuster",
    sourceUrl: "https://unsplash.com/photos/wyF7ZzJSMAM",
  }),
  dubaiDusk: photo({
    slug: "dubai-dusk",
    alt: "A city skyline at dusk under a warm orange sky",
    ratio: 640 / 427,
    widths: [640, 1280],
    photographer: "Nejc Soklič",
    sourceUrl: "https://unsplash.com/photos/2sTdng2g7mM",
  }),
  notebookPens: photo({
    slug: "notebook-pens",
    alt: "An open notebook and pens on a dark desk",
    ratio: 640 / 427,
    widths: [640, 1280],
    photographer: "Kelly Sikkema",
    sourceUrl: "https://unsplash.com/photos/hBdaqrr5Z3k",
  }),
  tokyoGlass: photo({
    slug: "tokyo-glass",
    alt: "Modern glass office buildings against a cloudy sky",
    ratio: 640 / 427,
    widths: [640, 1280],
    photographer: "Tsuyoshi Kozu",
    sourceUrl: "https://unsplash.com/photos/PP6RfwcCXnA",
  }),
} satisfies Record<string, Photo>;
