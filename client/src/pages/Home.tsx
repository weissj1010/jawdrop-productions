import { useEffect, useState, type FormEvent } from "react";
import { useToast } from "@/hooks/use-toast";
import "./home.css";

type Work = {
  slug: string;
  tag: string;
  title: string;
  desc?: string;
  alt: string;
  pos?: string;
  filter?: string;
  video?: string;
  youtube?: string;
};

const WORK: Record<string, Work> = {
  ueck: {
    slug: "for-ueck",
    tag: "TRIBUTE FILM",
    title: "For Ueck",
    desc: "900K views, 37K interactions and 9.3K shares. Milwaukee felt this one.",
    alt: "Bob Uecker smiling in a Brewers cap",
    pos: "28% center",
    video: "/work/for-ueck.mp4",
  },
  wealshire: {
    slug: "wealshire",
    tag: "DOCUMENTARY FILM",
    title: "The Wealshire story",
    alt: "Two women smiling in a memory care community",
    video: "/work/wealshire.mp4",
  },
  wedding: {
    slug: "stand-by-me",
    tag: "WEDDING FILM",
    title: "Stand By Me",
    alt: "Bride and groom kissing at the altar",
    youtube: "lUzh6cDNiVc",
  },
  legacy: {
    slug: "legacy",
    tag: "LEGACY FILM",
    title: "A TEDx talk, retold",
    desc: "A family keepsake built from one man's life story.",
    alt: "Speaker on a dark stage",
    video: "/work/legacy.mp4",
  },
  senior: {
    slug: "senior-living",
    tag: "BRAND VIDEO",
    title: "Senior living, up close",
    alt: "Caregiver hugging a resident",
    filter: "brightness(0.68) contrast(1.08) saturate(0.9)",
    video: "/work/senior-living.mp4",
  },
  legends: {
    slug: "legends",
    tag: "SOCIAL REEL",
    title: "Behind the bar at Legends",
    alt: "Bartender pouring a red frozen drink behind the bar at Wisconsin Legends",
    pos: "center 55%",
    video: "/work/legends.mp4",
  },
  moon: {
    slug: "to-the-moon",
    tag: "PITCH VIDEO",
    title: "To The Moon",
    alt: "Two rockets with the JAW DROP and Apex logos on the launch pad",
    video: "/work/to-the-moon.mp4",
  },
  lambeau: {
    slug: "lambeau",
    tag: "DRONE",
    title: "Lambeau from above",
    alt: "Aerial view of Lambeau Field",
    video: "/work/lambeau.mp4",
  },
  cards: {
    slug: "card-show",
    tag: "EVENT VIDEO",
    title: "Card show signings",
    alt: "Athlete signing autographs at a card show",
    pos: "center 35%",
    video: "/work/card-show.mp4",
  },
};

const PlayIcon = () => (
  <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="#fff">
    <path d="M8 5v14l11-7z" />
  </svg>
);
const Arrow = () => (
  <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14" />
    <path d="M13 6l6 6-6 6" />
  </svg>
);
const ArrowUp = () => (
  <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 17L17 7" />
    <path d="M8 7h9v9" />
  </svg>
);

function Tile({ w, size, onOpen }: { w: Work; size: "big" | "small" | "third"; onOpen: (w: Work) => void }) {
  return (
    <button type="button" className={`jd-tile ${size}`} onClick={() => onOpen(w)} aria-label={`Play ${w.title}`}>
      <img src={`/img/work/${w.slug}.jpg`} alt={w.alt} loading="lazy" style={{ objectPosition: w.pos || "center", filter: w.filter }} />
      <span className="fade" />
      <span className="play"><PlayIcon /></span>
      <span className="meta">
        <span className="tag">{w.tag}</span>
        <span className="title">{w.title}</span>
        {w.desc && <span className="desc">{w.desc}</span>}
      </span>
    </button>
  );
}

function Lightbox({ w, onClose }: { w: Work; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);
  return (
    <div className="jd-lb" role="dialog" aria-modal="true" aria-label={w.title} onClick={onClose}>
      <div className="box" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="close" onClick={onClose} aria-label="Close video">
          <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
        </button>
        {w.youtube ? (
          <iframe src={`https://www.youtube.com/embed/${w.youtube}?autoplay=1&rel=0`} title={w.title} allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen />
        ) : (
          <video src={w.video} poster={`/img/work/${w.slug}.jpg`} controls autoPlay playsInline />
        )}
        <div className="cap">{w.title}</div>
      </div>
    </div>
  );
}

function ContactForm() {
  const { toast } = useToast();
  const [sending, setSending] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formEl = e.currentTarget;
    const f = new FormData(formEl);
    const data = {
      name: String(f.get("name") || "").trim(),
      email: String(f.get("email") || "").trim(),
      phone: String(f.get("phone") || "").trim(),
      need: String(f.get("need") || ""),
      message: String(f.get("message") || "").trim(),
      honey: String(f.get("_honey") || ""),
    };
    const errs: Record<string, string> = {};
    if (data.name.length < 2) errs.name = "Please enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(data.email)) errs.email = "Please enter a valid email.";
    if (data.message.length < 10) errs.message = "Tell me a little more about the project.";
    setErrors(errs);
    if (Object.keys(errs).length) return;
    if (data.honey) {
      formEl.reset();
      return;
    }
    setSending(true);
    const payload = {
      name: data.name,
      email: data.email,
      phone: data.phone || "Not provided",
      businessType: data.need || "Not specified",
      message: data.message,
    };
    try {
      await fetch("/api/contacts", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    } catch {
      /* best effort */
    }
    try {
      const res = await fetch("https://formsubmit.co/ajax/weissj1010@gmail.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          ...payload,
          "What they need": payload.businessType,
          _subject: `New JAW Drop Productions inquiry from ${data.name}`,
          _captcha: "false",
          _template: "table",
          _honey: "",
        }),
      });
      const result = await res.json().catch(() => null);
      if (res.ok && result?.success !== "false") {
        toast({ title: "Message sent!", description: "I'll get back to you within 24 hours." });
        formEl.reset();
      } else {
        throw new Error("send failed");
      }
    } catch {
      toast({ title: "That didn't go through", description: "Try again, or email me at weissj1010@gmail.com.", variant: "destructive" });
    } finally {
      setSending(false);
    }
  };

  return (
    <form onSubmit={onSubmit} noValidate>
      <label>
        Name
        <input name="name" type="text" placeholder="Your full name" autoComplete="name" aria-invalid={!!errors.name} />
        {errors.name && <span className="err">{errors.name}</span>}
      </label>
      <label>
        Email
        <input name="email" type="email" placeholder="you@email.com" autoComplete="email" aria-invalid={!!errors.email} />
        {errors.email && <span className="err">{errors.email}</span>}
      </label>
      <label>
        Phone
        <input name="phone" type="tel" placeholder="(262) 555-0100" autoComplete="tel" />
      </label>
      <label>
        What do you need?
        <select name="need" defaultValue="">
          <option value="" disabled>Pick one</option>
          <option>Video</option>
          <option>Drone</option>
          <option>Social media</option>
          <option>Website</option>
          <option>Not sure yet</option>
        </select>
      </label>
      <label className="full">
        Project details
        <textarea name="message" rows={4} placeholder="Tell me about your business and what you want to make happen." aria-invalid={!!errors.message} />
        {errors.message && <span className="err">{errors.message}</span>}
      </label>
      <div className="hp" aria-hidden="true">
        <label>
          Leave this empty
          <input name="_honey" type="text" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <button type="submit" className="full" disabled={sending}>
        {sending ? "Sending..." : "Let's talk"}
      </button>
    </form>
  );
}

export default function Home() {
  const [open, setOpen] = useState<Work | null>(null);

  return (
    <div className="jd">
      <header className="jd-nav">
        <div className="wrap">
          <a href="#top" className="logo" aria-label="JAW DROP Productions home">
            <img src="/img/logo-white.png" alt="JAW DROP Productions" />
          </a>
          <nav aria-label="Main">
            <span className="links">
              <a href="#work">WORK</a>
              <a href="#services">SERVICES</a>
              <a href="#story">STORY</a>
              <a href="#reviews">REVIEWS</a>
            </span>
            <a href="#contact" className="cta">START A PROJECT</a>
          </nav>
        </div>
      </header>

      <main>
        <section id="top" className="wrap jd-hero">
          <div className="copy">
            <div className="kicker label">
              <span className="rec"><span className="rec-dot" />REC</span>
              <span>VIDEO / DRONE / SOCIAL / WEB</span>
            </div>
            <h1 className="display">
              <span className="muted">I'm not a content vendor.</span>
              <span>I'm a brand collaborator.</span>
            </h1>
            <p>This didn't start in a studio. It started behind a bar. I make content with purpose and design with strategy for businesses that want to stand out.</p>
            <div className="ctas">
              <a href="#work" className="pill pill-silver">See the work <Arrow /></a>
              <a href="#contact" className="pill pill-outline">Let's build something bold</a>
            </div>
          </div>
          <div className="jd-vf">
            <img src="/img/jawdrop.jpg" alt="Jonathan Weiss with his jaw dropped" />
            <span className="shade" />
            <span className="c tl" /><span className="c tr" /><span className="c bl" /><span className="c br" />
            <span className="hud h1"><span className="rec-dot" />REC</span>
            <span className="hud h2">4K · 30P</span>
            <span className="hud h3">ISO 800 · F2.8</span>
            <span className="hud h4">00:00:00:01</span>
          </div>
        </section>

        <section aria-label="My first year" className="jd-stats">
          <div className="wrap">
            <div className="label">MY FIRST YEAR</div>
            <div className="grid">
              <div><div className="n">17</div><div className="t">Businesses</div></div>
              <div><div className="n">18</div><div className="t">Athletes</div></div>
              <div><div className="n">3</div><div className="t">Websites</div></div>
              <div><div className="n">2</div><div className="t">Weddings</div></div>
            </div>
          </div>
        </section>

        <section id="work" className="wrap jd-sec">
          <div className="jd-sec-head">
            <div>
              <div className="label">01 / RECENT WORK</div>
              <h2 className="display">Work that stopped the scroll</h2>
            </div>
            <p>The latest from my camera. Films, promos, hype videos and motion graphics from the last few months.</p>
          </div>
          <div className="jd-work">
            <div className="jd-row">
              <Tile w={WORK.ueck} size="big" onOpen={setOpen} />
              <div className="jd-stack">
                <Tile w={WORK.wealshire} size="small" onOpen={setOpen} />
                <Tile w={WORK.wedding} size="small" onOpen={setOpen} />
              </div>
            </div>
            <div className="jd-row">
              <Tile w={WORK.legacy} size="third" onOpen={setOpen} />
              <Tile w={WORK.senior} size="third" onOpen={setOpen} />
              <Tile w={WORK.legends} size="third" onOpen={setOpen} />
            </div>
            <div className="jd-row">
              <Tile w={WORK.moon} size="third" onOpen={setOpen} />
              <Tile w={WORK.lambeau} size="third" onOpen={setOpen} />
              <Tile w={WORK.cards} size="third" onOpen={setOpen} />
            </div>
          </div>
          <div className="jd-more">
            <a href="https://instagram.com/jaw_drop_prod" target="_blank" rel="noreferrer">MORE ON INSTAGRAM @JAW_DROP_PROD <ArrowUp /></a>
          </div>
        </section>

        <section id="services" className="wrap jd-sec">
          <div className="label" style={{ marginBottom: 12 }}>02 / SERVICES</div>
          <h2 className="display" style={{ marginBottom: 48 }}>What I bring to the table</h2>
          <div className="jd-svc">
            {[
              { n: "01", t: "Short-form video", p: "Reels don't have to feel forced. I shoot and edit short-form content that sounds like your brand and stops people mid-scroll.", c: ["Filming + editing", "Captions + music", "Motion graphics"], img: "miz.jpg", style: { filter: "grayscale(1)" } },
              { n: "02", t: "Drone photo + video", p: "I capture your business from angles most people never see. Exteriors, rooftops, events and neighborhoods in a whole new light.", c: ["Flyovers", "Real estate", "Events + weddings"], img: "mountains.jpg" },
              { n: "03", t: "Social media management", p: "Done running your own page with nothing to show for it? I take the wheel. Content, captions, posting and a real plan that builds momentum.", c: ["Monthly content calendar", "Reels, carousels, stories", "Scheduling"], img: "think.jpg" },
              { n: "04", t: "Websites", p: "Sites built from scratch that look sharp on every phone and make it easy for customers to call, book or stop in.", c: ["Custom design", "Mobile first", "Launch graphics"], img: "laptop.jpg", style: { objectPosition: "center 30%" } },
            ].map((s) => (
              <div className="row" key={s.n}>
                <div className="num">{s.n}</div>
                <div className="body">
                  <h3>{s.t}</h3>
                  <p>{s.p}</p>
                  <div className="chips">{s.c.map((c) => <span key={c}>{c}</span>)}</div>
                </div>
                <img src={`/img/${s.img}`} alt="" loading="lazy" style={s.style} />
              </div>
            ))}
          </div>
          <div className="jd-also">
            <span className="label" style={{ marginRight: 8 }}>ALSO ON THE MENU</span>
            <span className="chip">Print design</span>
            <span className="chip">Brand refresh</span>
            <span className="chip">Social media audits</span>
          </div>
        </section>

        <section id="story" className="wrap jd-sec jd-story">
          <div className="photo">
            <img src="/img/mug.jpg" alt="Jonathan Weiss smiling with a coffee" loading="lazy" />
            <div className="badge">
              <b>Jonathan Weiss</b>
              <span>OWNER / BRAND COLLABORATOR</span>
            </div>
          </div>
          <div className="copy">
            <div className="label">03 / THE STORY</div>
            <h2 className="display">It started behind a bar</h2>
            <p>For almost 20 years I lived the service industry. Bartending, serving, managing, all of it. Then someone handed me the keys to a small business's social media, and something clicked.</p>
            <p>I wasn't interested in just posting specials. I wanted people to feel something when they scrolled past a burger photo or a promo flyer. Turns out I had a knack for it, and I couldn't stop.</p>
            <p>No recycled templates. No filler. No agency markup. Whether you need a menu, a promo video or drone footage of your next big event, you get my full attention every single time.</p>
          </div>
        </section>

        <section id="reviews" className="wrap jd-sec">
          <div className="label" style={{ marginBottom: 12 }}>04 / REVIEWS</div>
          <h2 className="display" style={{ marginBottom: 48 }}>What people say</h2>
          <div className="jd-reviews">
            <figure>
              <blockquote>"He's my social media guy and let me tell you he never disappoints! This guy will be texting a response from me at 3 AM when I have an idea, add ons, revises etc."</blockquote>
              <figcaption>COREY B. · WISCONSIN LEGENDS</figcaption>
            </figure>
            <figure>
              <blockquote>"I was blown away by his quick turnaround time with productions. He has mass potential to help us get next level status!"</blockquote>
              <figcaption>LORENA L. · LAKE COUNTRY CARDS</figcaption>
            </figure>
            <figure>
              <blockquote>"Jon was wonderful to work with. He's very attentive, communicates effectively, is punctual, and brings your vision to life! Definitely recommend."</blockquote>
              <figcaption>SHANNON S. · TRAVELING TOUCH MASSAGE</figcaption>
            </figure>
            <figure>
              <blockquote>"Certainly couldn't do it without Jonathan's help. I'm truly blessed."</blockquote>
              <figcaption>ERIN D. · SWEET E'S CONFECTIONS</figcaption>
            </figure>
          </div>
        </section>

        <section id="contact" className="wrap" style={{ paddingTop: 112, paddingBottom: 112 }}>
          <div className="jd-contact">
            <div className="info">
              <div className="label">05 / CONTACT</div>
              <h2 className="display">Ready to get started?</h2>
              <p>Tell me what you're working on. I'll figure out the best way to make it happen.</p>
              <div className="lines">
                <a href="mailto:weissj1010@gmail.com">weissj1010@gmail.com</a>
                <a href="tel:2624900589">262.490.0589</a>
                <a href="https://instagram.com/jaw_drop_prod" target="_blank" rel="noreferrer">@jaw_drop_prod</a>
                <span style={{ color: "var(--muted)" }}>Serving Milwaukee + Lake Country</span>
              </div>
            </div>
            <ContactForm />
          </div>
        </section>
      </main>

      <footer className="jd-foot">
        <div className="wrap top">
          <div className="brand">
            <img src="/img/logo-silver.png" alt="JAW DROP Productions" loading="lazy" />
            <p>Original content. Real strategy. Built for businesses that want to stand out.</p>
          </div>
          <div className="cols">
            <div className="col">
              <div className="h">SERVICES</div>
              <a href="#services">Video</a>
              <a href="#services">Drone</a>
              <a href="#services">Social</a>
              <a href="#services">Web</a>
            </div>
            <div className="col">
              <div className="h">FOLLOW</div>
              <a href="https://instagram.com/jaw_drop_prod" target="_blank" rel="noreferrer">Instagram</a>
              <a href="mailto:weissj1010@gmail.com">Email</a>
            </div>
          </div>
        </div>
        <div className="wrap legal">© {new Date().getFullYear()} JAW DROP PRODUCTIONS</div>
      </footer>

      {open && <Lightbox w={open} onClose={() => setOpen(null)} />}
    </div>
  );
}
