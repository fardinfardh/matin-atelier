/* ============================================================
   Artwork catalogue.  img -> assets/images/artworks/<NN>S.webp
   (base) and <NN>M.webp (zoom / lightbox).
   To add or edit a piece, just update this array.
   Pieces 06, 09, 10, 11, 12 await final details from the artist.
   ============================================================ */
const ARTWORKS = [
  { code:"MT-003", img:"03", title:"Reverie", year:"2023",
    size:"13.5 × 18.5 cm", mat:"35 × 50 cm", time:"3 months",
    desc:"Executed on a lacquered cover using Schmincke watercolours and a cat-hair brush." },

  { code:"MT-013", img:"13", title:"Awakened Dream", year:"2023",
    size:"9 × 13.5 cm", mat:"35 × 50 cm", time:"2 months",
    desc:"Qajar-style miniature. Dry ink on handmade burnished paper, executed with a cat-hair brush." },

  { code:"MT-007", img:"07", title:"Embrace of Love", year:"2023",
    size:"9 × 15 cm", mat:"35 × 50 cm", time:"2.5 months",
    desc:"Qajar-style miniature. Executed on a lacquered cover using Schmincke watercolours and a cat-hair brush." },

  { code:"MT-008", img:"08", title:"Voice of Spring", year:"2022",
    size:"10 × 17 cm", mat:"50 × 35 cm", time:"3 months",
    desc:"Qajar-style miniature. Executed on a lacquered cover using Schmincke watercolours and a cat-hair brush." },

  { code:"MT-002", img:"02", title:"Delyar", year:"2022",
    size:"11 × 14.5 cm", mat:"35 × 50 cm", time:"2 months",
    desc:"Qajar-style miniature. Executed on a lacquered cover using Schmincke watercolours and a cat-hair brush." },

  { code:"MT-004", img:"04", title:"Awakened Narcissus", year:"2022",
    size:"7.5 × 13.5 cm", mat:"35 × 50 cm", time:"3 months",
    desc:"Qajar-style miniature. Executed on a lacquered cover using Schmincke watercolours and a cat-hair brush." },

  { code:"MT-001", img:"01", title:"Dance in the Shadows", year:"2021",
    size:"9 × 12 cm", mat:"35 × 50 cm", time:"2.5 months",
    desc:"Qajar-style miniature. Executed on a lacquered cover using Schmincke watercolours and a cat-hair brush." },

  { code:"MT-005", img:"05", title:"Heart's Caress", year:"2021",
    size:"10.5 × 15 cm", mat:"35 × 50 cm", time:"1.5 months",
    desc:"Qajar-style miniature. Executed on a lacquered cover using Schmincke watercolours and a cat-hair brush." },

  /* ---- awaiting final details (edit title/year/size/desc) ---- */
  { code:"MT-006", img:"06", title:"Untitled", year:"", size:"", mat:"", time:"",
    desc:"Details available on request.", pending:true },
  { code:"MT-009", img:"09", title:"Untitled", year:"", size:"", mat:"", time:"",
    desc:"Details available on request.", pending:true },
  { code:"MT-010", img:"10", title:"Untitled", year:"", size:"", mat:"", time:"",
    desc:"Details available on request.", pending:true },
  { code:"MT-011", img:"11", title:"Untitled", year:"", size:"", mat:"", time:"",
    desc:"Details available on request.", pending:true },
  { code:"MT-012", img:"12", title:"Untitled", year:"", size:"", mat:"", time:"",
    desc:"Details available on request.", pending:true },
];

/* expose to other scripts (a top-level `const` is NOT a window property) */
window.ARTWORKS = ARTWORKS;
