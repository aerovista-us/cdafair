"use client";

import { useEffect, useMemo, useState } from "react";

type Category = "family" | "rides" | "animals" | "shows" | "music" | "motorsports" | "livestock";
type EventItem = { time: string; title: string; category: Category; featured?: boolean; ticketed?: boolean };
type Tab = "today" | "my-day" | "deals" | "info";

const OFFICIAL = "https://www.nisfair.fun";
const EVENTS = `${OFFICIAL}/events`;
const ADMISSION = `${OFFICIAL}/p/getinvolved/admission--daily-specials`;
const HOURS = `${OFFICIAL}/p/getinvolved/hours--directions`;
const PARKING = `${OFFICIAL}/p/getinvolved/parking`;
const MAPS = "https://www.google.com/maps/search/?api=1&query=4056+N+Government+Way+Coeur+d%27Alene+ID+83815";

const tabs: { id: Tab; label: string; icon: string }[] = [
  { id: "today", label: "Today", icon: "◉" },
  { id: "my-day", label: "My Day", icon: "✦" },
  { id: "deals", label: "Deals", icon: "$" },
  { id: "info", label: "Fair Info", icon: "i" }
];

const events: EventItem[] = [
  { time: "9:00 AM", title: "ADGA Goat Show", category: "livestock" },
  { time: "2:00 PM", title: "Fair gates open + afternoon activities", category: "family", featured: true },
  { time: "2:15 PM", title: "The Farmer's Daughter Show + The Junebugs", category: "shows" },
  { time: "2:30 PM", title: "Vuelta La Luna Circus + One Man Band", category: "shows" },
  { time: "3:00 PM", title: "Carnival opens", category: "rides", featured: true },
  { time: "3:30 PM", title: "Sea Lion Splash + Juggling with Jeremiah", category: "animals", featured: true },
  { time: "4:00 PM", title: "Grand Opening Ceremony", category: "family", featured: true },
  { time: "4:30 PM", title: "America's 250 Celebration", category: "family" },
  { time: "5:00 PM", title: "Improv Comedy by Levity Theatre", category: "shows" },
  { time: "6:00 PM", title: "Sea Lion Splash", category: "animals" },
  { time: "6:30 PM", title: "Motocross", category: "motorsports", featured: true, ticketed: true },
  { time: "8:00 PM", title: "Music on the Midway + Fair Family Movie Night", category: "music", featured: true },
  { time: "9:00 PM", title: "Tyzen — Master Hypnotist", category: "shows" }
];

const tomorrow = [
  "9:00 AM · GSSS Sheep Show",
  "11:00 AM · GSSS Swine Show",
  "12:00 PM · Best Mullet Contest",
  "1:00 PM · Sea Lion Splash",
  "2:30 PM · KCSO K-9 Demo",
  "6:30 PM · Motocross",
  "8:00 PM · Music on the Midway + Fair Family Movie Night"
];

const promoDays = [
  ["Fri 21", "FREE admission until 4 PM"],
  ["Sat 22", "First 5,000 guests get a free return admission ticket"],
  ["Sun 23", "FREE until 3 PM with 5 canned food items"],
  ["Tue 25", "Ages 60+ FREE 11 AM–3 PM"],
  ["Wed 26", "FREE admission until 3 PM"],
  ["Thu 27", "FREE until 3 PM with coat donation"],
  ["Fri 28", "$2 off wearing pink until 3 PM"],
  ["Sat 29", "$2 off with military ID until 3 PM"],
  ["Sun 30", "12 & under FREE until 3 PM"]
];

function minutes(time: string) {
  const [clock, suffix] = time.split(" ");
  let [h, m] = clock.split(":").map(Number);
  if (suffix === "PM" && h !== 12) h += 12;
  if (suffix === "AM" && h === 12) h = 0;
  return h * 60 + m;
}

function cdaMinutesNow() {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Los_Angeles",
    hour: "numeric",
    minute: "2-digit",
    hour12: false
  }).formatToParts(new Date());
  const h = Number(parts.find(p => p.type === "hour")?.value ?? 0);
  const m = Number(parts.find(p => p.type === "minute")?.value ?? 0);
  return h * 60 + m;
}

export default function Home() {
  const now = cdaMinutesNow();
  const foundNext = events.findIndex(e => minutes(e.time) >= now);
  const nextIndex = foundNext === -1 ? events.length - 1 : foundNext;
  const nextEvent = events[nextIndex];

  const [activeTab, setActiveTab] = useState<Tab>("today");
  const [audience, setAudience] = useState("Family");
  const [duration, setDuration] = useState("4 Hours");
  const [interest, setInterest] = useState("Rides");
  const [built, setBuilt] = useState(false);

  useEffect(() => {
    const applyHash = () => {
      const hash = window.location.hash.replace("#", "") as Tab;
      if (tabs.some(tab => tab.id === hash)) setActiveTab(hash);
    };
    applyHash();
    window.addEventListener("hashchange", applyHash);
    return () => window.removeEventListener("hashchange", applyHash);
  }, []);

  function selectTab(tab: Tab) {
    setActiveTab(tab);
    window.history.replaceState(null, "", `#${tab}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const plan = useMemo(() => {
    const interestCategory: Record<string, Category> = {
      Rides: "rides",
      Animals: "animals",
      Shows: "shows",
      Music: "music",
      Motorsports: "motorsports"
    };
    const max = duration === "2 Hours" ? 4 : duration === "4 Hours" ? 6 : 9;
    return events
      .map((e, index) => {
        let score = e.category === interestCategory[interest] ? 8 : 0;
        if (e.featured) score += 4;
        if (!e.ticketed) score += 2;
        if (audience === "Kids" && ["family", "rides", "animals"].includes(e.category)) score += 4;
        if (audience === "Date" && ["rides", "shows", "music"].includes(e.category)) score += 3;
        if (audience === "Family" && ["family", "rides", "animals", "shows"].includes(e.category)) score += 3;
        return { ...e, index, score };
      })
      .filter(e => minutes(e.time) >= Math.max(now, 14 * 60))
      .sort((a, b) => b.score - a.score)
      .slice(0, max)
      .sort((a, b) => a.index - b.index);
  }, [audience, duration, interest, now]);

  async function sharePlan() {
    const text = `Our CDA Fair Day: ${plan.map(e => `${e.time} ${e.title}`).join(" · ")}`;
    const url = `${window.location.origin}${window.location.pathname}#my-day`;
    if (navigator.share) await navigator.share({ title: "CDA Fair Day", text, url });
    else {
      await navigator.clipboard.writeText(`${text}\n${url}`);
      alert("Fair plan copied to clipboard.");
    }
  }

  return (
    <main className="app">
      <header className="compactHero">
        <nav className="topbar">
          <button className="brandButton" onClick={() => selectTab("today")}><span>🎡</span> CDA FAIR DAY</button>
          <a href={OFFICIAL} target="_blank" rel="noreferrer">Official Fair ↗</a>
        </nav>

        <div className="heroContent">
          <div className="heroCopy">
            <p className="eyebrow">OPENING DAY · FRIDAY, AUGUST 21</p>
            <h1>Your fair day.<br/><span>Without the digging.</span></h1>
          </div>

          <div className="heroStatus">
            <div className="dealMini">
              <small>TODAY'S DEAL</small>
              <strong>FREE UNTIL 4 PM</strong>
              <span>Gates 2–10 PM · Carnival 3 PM</span>
            </div>
            <button className="nextMini" onClick={() => selectTab("today")}>
              <small>NEXT UP</small>
              <strong>{nextEvent.time}</strong>
              <span>{nextEvent.title}</span>
            </button>
          </div>
        </div>
      </header>

      <nav className="desktopTabs" aria-label="Fair guide sections">
        <div className="tabInner">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={activeTab === tab.id ? "tab active" : "tab"}
              onClick={() => selectTab(tab.id)}
              aria-selected={activeTab === tab.id}
              role="tab"
            >
              <span>{tab.icon}</span>{tab.label}
            </button>
          ))}
        </div>
      </nav>

      <div className="shell tabShell">
        {activeTab === "today" && (
          <section className="tabPage" id="today" aria-label="Today">
            <div className="quickGrid compactQuick">
              <Quick icon="🕑" label="Gates" value="2–10 PM"/>
              <Quick icon="🎡" label="Carnival" value="3 PM–Close"/>
              <Quick icon="🚗" label="Parking" value="$7" onClick={() => selectTab("info")}/>
              <Quick icon="📍" label="Directions" value="Government Way" href={MAPS}/>
            </div>

            <section className="panel primaryPanel">
              <Heading eyebrow="TODAY" title="What's happening" link={EVENTS}/>
              <div className="timeline">
                {events.map((event, i) => (
                  <div className={`event ${i === nextIndex ? "next" : ""}`} key={`${event.time}-${event.title}`}>
                    <div className="time">{event.time}</div>
                    <div>
                      <div className="eventTitle">{event.title}{event.ticketed && <span className="pill">ticketed</span>}</div>
                      <div className="meta">{event.featured ? "★ Highlight" : event.category}{i === nextIndex ? " · NEXT UP" : ""}</div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </section>
        )}

        {activeTab === "my-day" && (
          <section className="tabPage" id="my-day" aria-label="My Day">
            <section className="panel planner primaryPanel">
              <Heading eyebrow="MAKE IT YOURS" title="Build My Fair Day"/>
              <p className="sectionIntro">Tell us what kind of day you want. We'll prioritize the strongest matches from today's remaining schedule.</p>
              <Choice label="Who's going?" values={["Family", "Adults", "Date", "Kids"]} current={audience} set={setAudience}/>
              <Choice label="How long?" values={["2 Hours", "4 Hours", "All Day"]} current={duration} set={setDuration}/>
              <Choice label="Main vibe?" values={["Rides", "Animals", "Shows", "Music", "Motorsports"]} current={interest} set={setInterest}/>
              <button className="primary make" onClick={() => setBuilt(true)}>MAKE MY PLAN</button>

              {built && (
                <div className="result">
                  <div className="resultTop">
                    <div><p className="eyebrow">YOUR PLAN</p><h3>{audience} · {duration} · {interest}</h3></div>
                    <button onClick={sharePlan}>Share</button>
                  </div>
                  {plan.length ? plan.map(e => (
                    <div className="mini" key={`${e.time}-${e.title}`}><strong>{e.time}</strong><span>{e.title}</span></div>
                  )) : <p>No remaining events matched. Check the full official schedule.</p>}
                  <p className="fine">Suggested itinerary only. Verify event times with the official Fair schedule.</p>
                </div>
              )}
            </section>

            <button className="crossLink" onClick={() => selectTab("today")}>
              <span><small>NEED THE FULL LIST?</small><strong>Browse today's schedule</strong></span><b>→</b>
            </button>
          </section>
        )}

        {activeTab === "deals" && (
          <section className="tabPage" id="deals" aria-label="Deals">
            <section className="dealBanner">
              <div><p className="eyebrow">TODAY'S BEST MOVE</p><h2>Get through the gate before 4 PM.</h2><p>Opening-day general admission is free until 4 PM.</p></div>
              <span>🎟️</span>
            </section>

            <section className="panel primaryPanel">
              <Heading eyebrow="PRICES" title="Admission + parking" link={ADMISSION}/>
              <div className="priceGrid">
                <Price label="Adult gate" value="$14" sub="Advance / online $11"/>
                <Price label="Youth 6–12" value="$10" sub="Advance / online $9"/>
                <Price label="Senior 60+" value="$10" sub="Advance / online $9"/>
                <Price label="Military" value="$10" sub="Advance / online $9"/>
                <Price label="Age 5 & under" value="FREE"/>
                <Price label="Parking" value="$7" sub="per vehicle"/>
              </div>
            </section>

            <section className="panel promos">
              <Heading eyebrow="SAVE THIS" title="Daily fair deals" link={ADMISSION}/>
              <div className="promoList">{promoDays.map(([day, deal]) => (
                <div className="promo" key={day}><strong>{day}</strong><span>{deal}</span></div>
              ))}</div>
            </section>
          </section>
        )}

        {activeTab === "info" && (
          <section className="tabPage" id="info" aria-label="Fair Info">
            <div className="infoGrid">
              <InfoAction icon="📍" title="Directions" detail="4056 N. Government Way" href={MAPS}/>
              <InfoAction icon="🚗" title="Parking" detail="$7 per vehicle" href={PARKING}/>
              <InfoAction icon="🕑" title="Hours" detail="Today · 2–10 PM" href={HOURS}/>
              <InfoAction icon="🎟️" title="Official Fair" detail="Tickets, updates + notices" href={OFFICIAL}/>
            </div>

            <section className="panel primaryPanel">
              <Heading eyebrow="SATURDAY" title="Tomorrow's highlights" link={EVENTS}/>
              <div className="tomorrow">{tomorrow.map(item => <div key={item}>{item}</div>)}</div>
            </section>

            <section className="source">
              <strong>Unofficial community guide.</strong>
              <p>Information is summarized from the North Idaho State Fair's public website and can change. Verify time-sensitive details with the official Fair before making plans.</p>
              <div className="links">
                <a href={EVENTS} target="_blank" rel="noreferrer">Events ↗</a>
                <a href={ADMISSION} target="_blank" rel="noreferrer">Admission ↗</a>
                <a href={HOURS} target="_blank" rel="noreferrer">Hours ↗</a>
                <a href={PARKING} target="_blank" rel="noreferrer">Parking ↗</a>
                <a href={MAPS} target="_blank" rel="noreferrer">Directions ↗</a>
              </div>
            </section>
          </section>
        )}

        <footer>Made in Coeur d'Alene · AeroVista</footer>
      </div>

      <nav className="bottomTabs" aria-label="Fair guide sections">
        {tabs.map(tab => (
          <button key={tab.id} className={activeTab === tab.id ? "active" : ""} onClick={() => selectTab(tab.id)}>
            <span>{tab.icon}</span><small>{tab.label}</small>
          </button>
        ))}
      </nav>
    </main>
  );
}

function Heading({ eyebrow, title, link }: { eyebrow: string; title: string; link?: string }) {
  return <div className="heading"><div><p className="eyebrow">{eyebrow}</p><h2>{title}</h2></div>{link && <a href={link} target="_blank" rel="noreferrer">Official source ↗</a>}</div>;
}

function Quick({ icon, label, value, href, onClick }: { icon: string; label: string; value: string; href?: string; onClick?: () => void }) {
  const body = <><span className="qicon">{icon}</span><small>{label}</small><strong>{value}</strong></>;
  if (href) return <a className="quick" href={href} target="_blank" rel="noreferrer">{body}</a>;
  if (onClick) return <button className="quick quickButton" onClick={onClick}>{body}</button>;
  return <div className="quick">{body}</div>;
}

function Price({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return <div className="price"><span>{label}</span><strong>{value}</strong>{sub && <small>{sub}</small>}</div>;
}

function Choice({ label, values, current, set }: { label: string; values: string[]; current: string; set: (v: string) => void }) {
  return <div className="choice"><label>{label}</label><div>{values.map(v => <button key={v} className={v === current ? "active" : ""} onClick={() => set(v)}>{v}</button>)}</div></div>;
}

function InfoAction({ icon, title, detail, href }: { icon: string; title: string; detail: string; href: string }) {
  return <a className="infoAction" href={href} target="_blank" rel="noreferrer"><span>{icon}</span><div><strong>{title}</strong><small>{detail}</small></div><b>↗</b></a>;
}
