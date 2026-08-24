"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import { trackEvent } from "../lib/analytics";

type Category = "family" | "rides" | "animals" | "shows" | "music" | "motorsports" | "livestock";
type EventItem = { time: string; title: string; category: Category; featured?: boolean; ticketed?: boolean };
type Tab = "today" | "my-day" | "deals" | "info";
type FairDay = {
  key: string;
  label: string;
  shortLabel: string;
  gatesOpen: number;
  gatesClose: number;
  gates: string;
  carnival: string;
  promoTitle: string;
  promoDetail: string;
  promoEnd?: number;
  events: EventItem[];
};

const OFFICIAL = "https://www.nisfair.fun";
const EVENTS = `${OFFICIAL}/events`;
const ADMISSION = `${OFFICIAL}/p/getinvolved/admission--daily-specials`;
const HOURS = `${OFFICIAL}/p/getinvolved/hours--directions`;
const PARKING = `${OFFICIAL}/p/getinvolved/parking`;
const MAPS = "https://www.google.com/maps/search/?api=1&query=4056+N+Government+Way+Coeur+d%27Alene+ID+83815";
const FAIR_TIME_ZONE = "America/Los_Angeles";

const tabs: { id: Tab; label: string; icon: string }[] = [
  { id: "today", label: "Today", icon: "◉" },
  { id: "my-day", label: "My Day", icon: "✦" },
  { id: "deals", label: "Deals", icon: "$" },
  { id: "info", label: "Fair Info", icon: "i" }
];

const fairDays: FairDay[] = [
  {
    key: "2026-08-21", label: "Friday, August 21", shortLabel: "FRIDAY, AUGUST 21",
    gatesOpen: 14 * 60, gatesClose: 22 * 60, gates: "2–10 PM", carnival: "3 PM–Close",
    promoTitle: "FREE UNTIL 4 PM", promoDetail: "Opening-day general admission is free until 4 PM.", promoEnd: 16 * 60,
    events: [
      { time: "9:00 AM", title: "ADGA Goat Show", category: "livestock" },
      { time: "2:00 PM", title: "Fair gates open · train rides, Kid Zone, pony rides, Butterfly Haven + more", category: "family", featured: true },
      { time: "2:15 PM", title: "The Farmer's Daughter Show + The Junebugs", category: "shows" },
      { time: "2:30 PM", title: "Vuelta La Luna Circus + One Man Band", category: "shows" },
      { time: "3:00 PM", title: "Carnival opens + Kootenai Fire CPR Demo", category: "rides", featured: true },
      { time: "3:30 PM", title: "Sea Lion Splash + Juggling with Jeremiah", category: "animals", featured: true },
      { time: "4:00 PM", title: "Grand Opening Ceremony + Kootenai Fire CPR Demo", category: "family", featured: true },
      { time: "4:45 PM", title: "Anthony Ray + The Farmer's Daughter Show", category: "music" },
      { time: "6:30 PM", title: "Motocross + The Junebugs + Vuelta La Luna Circus", category: "motorsports", featured: true, ticketed: true },
      { time: "8:00 PM", title: "Music on the Midway + Fair Family Movie Night", category: "music", featured: true },
      { time: "9:00 PM", title: "Tyzen — Master Hypnotist", category: "shows" }
    ]
  },
  {
    key: "2026-08-22", label: "Saturday, August 22", shortLabel: "SATURDAY, AUGUST 22",
    gatesOpen: 11 * 60, gatesClose: 22 * 60, gates: "11 AM–10 PM", carnival: "12 PM–Close",
    promoTitle: "FREE RETURN TICKET", promoDetail: "The first 5,000 fair guests receive a free return-admission ticket.",
    events: [
      { time: "9:00 AM", title: "GSSS Sheep Show", category: "livestock" },
      { time: "11:00 AM", title: "GSSS Swine Show + Kid Zone + Pony Rides", category: "family", featured: true },
      { time: "12:00 PM", title: "Best Mullet Contest + ARBA Judging + Carnival", category: "family" },
      { time: "1:00 PM", title: "Sea Lion Splash + Train Rides + Meat Goat Show", category: "animals", featured: true },
      { time: "2:30 PM", title: "KCSO K-9 Demo", category: "animals" },
      { time: "3:00 PM", title: "K-Tigers Taekwondo Performance", category: "shows" },
      { time: "4:00 PM", title: "GSSS Beef Show", category: "livestock" },
      { time: "4:30 PM", title: "Natalie Hughes", category: "music" },
      { time: "6:30 PM", title: "Motocross", category: "motorsports", featured: true, ticketed: true },
      { time: "7:30 PM", title: "Mystic Mountain Music", category: "music" },
      { time: "8:00 PM", title: "Music on the Midway", category: "music", featured: true }
    ]
  },
  {
    key: "2026-08-23", label: "Sunday, August 23", shortLabel: "SUNDAY, AUGUST 23",
    gatesOpen: 11 * 60, gatesClose: 21 * 60, gates: "11 AM–9 PM", carnival: "12 PM–Close",
    promoTitle: "5 CANS = FREE ADMISSION", promoDetail: "Donate 5 canned food items for free fair admission until 3 PM.", promoEnd: 15 * 60,
    events: [
      { time: "10:00 AM", title: "GSSS Round Robin", category: "livestock" },
      { time: "11:00 AM", title: "Fair gates open · Kid Zone + Pony Rides", category: "family", featured: true },
      { time: "11:15 AM", title: "Funshine Funshine + Mirror Man", category: "shows" },
      { time: "11:30 AM", title: "The Farmer's Daughter Show", category: "shows" },
      { time: "12:00 PM", title: "Carnival opens + Library activities + One Man Band", category: "rides", featured: true },
      { time: "12:30 PM", title: "Fairest of Them All Food Contest + The Junebugs + Vuelta La Luna Circus", category: "shows" },
      { time: "1:00 PM", title: "Sea Lion Splash + Train Rides + Rabbit Jumping Contest + CPR Demo", category: "animals", featured: true },
      { time: "1:30 PM", title: "Juggling with Jeremiah", category: "shows" },
      { time: "1:45 PM", title: "Mel Dalton Band", category: "music" },
      { time: "3:15 PM", title: "Valerie Jeanne", category: "music" },
      { time: "4:00 PM", title: "Demo Derby + One Man Band", category: "motorsports", featured: true, ticketed: true },
      { time: "4:30 PM", title: "Rusty Jackson", category: "music" },
      { time: "4:45 PM", title: "Trevor Chambers and the Southpaw Band", category: "music" },
      { time: "6:00 PM", title: "Riley Anderson", category: "music" },
      { time: "7:30 PM", title: "AP Collective", category: "music" },
      { time: "8:00 PM", title: "Music on the Midway", category: "music", featured: true }
    ]
  },
  {
    key: "2026-08-24", label: "Monday, August 24", shortLabel: "MONDAY, AUGUST 24",
    gatesOpen: 14 * 60, gatesClose: 22 * 60, gates: "2–10 PM", carnival: "2 PM–Close",
    promoTitle: "MENTAL HEALTH MONDAY", promoDetail: "$1 from each admission purchased until 3 PM supports local mental-health awareness.", promoEnd: 15 * 60,
    events: [
      { time: "6:00 AM", title: "Youth Stock Show market animal final weigh-in — cattle + hogs", category: "livestock" },
      { time: "8:00 AM", title: "Youth Stock Show final weigh-in — lambs, goats, poultry + rabbit", category: "livestock" },
      { time: "2:00 PM", title: "Fair gates + carnival + train rides open", category: "rides", featured: true },
      { time: "2:15 PM", title: "Ethereal in E", category: "music" },
      { time: "3:00 PM", title: "Youth Livestock Judging Contest", category: "livestock" },
      { time: "5:00 PM", title: "Post Falls Varsity Dance Team + Rusty Jackson + Sullivan Supply Workshop", category: "shows" },
      { time: "6:00 PM", title: "Courtney & Company + Jon DeJong + livestock workshops", category: "music" },
      { time: "7:00 PM", title: "One Man Band", category: "music" },
      { time: "7:30 PM", title: "Lee Brice — Party in the Dirt Concert", category: "music", featured: true, ticketed: true },
      { time: "8:00 PM", title: "Music on the Midway", category: "music" }
    ]
  },
  {
    key: "2026-08-25", label: "Tuesday, August 25", shortLabel: "TUESDAY, AUGUST 25",
    gatesOpen: 11 * 60, gatesClose: 22 * 60, gates: "11 AM–10 PM", carnival: "2 PM–Close",
    promoTitle: "60+ FREE 11 AM–3 PM", promoDetail: "Guests age 60 and better receive free admission from 11 AM to 3 PM.", promoEnd: 15 * 60,
    events: [
      { time: "11:00 AM", title: "Fair gates open + YSSS Poultry Fitting & Showing", category: "livestock", featured: true },
      { time: "11:15 AM", title: "Dante D'Angelo", category: "music" },
      { time: "12:00 PM", title: "YSSS Rabbit Quality Judging", category: "livestock" },
      { time: "1:45 PM", title: "Stephanie Renee", category: "music" },
      { time: "2:00 PM", title: "Carnival opens + YSSS Market & Breeding Goat Judging + CYT North Idaho", category: "family", featured: true },
      { time: "4:45 PM", title: "Acoustic Blue", category: "music" },
      { time: "5:00 PM", title: "YSSS Market Goat and Swine Quality Finals", category: "livestock" },
      { time: "5:30 PM", title: "Dancing with Sandy", category: "shows" },
      { time: "6:00 PM", title: "Jon DeJong", category: "music" },
      { time: "7:30 PM", title: "Walker Hayes — Party in the Dirt Concert", category: "music", featured: true, ticketed: true },
      { time: "8:00 PM", title: "Music on the Midway", category: "music" }
    ]
  },
  {
    key: "2026-08-26", label: "Wednesday, August 26", shortLabel: "WEDNESDAY, AUGUST 26",
    gatesOpen: 11 * 60, gatesClose: 22 * 60, gates: "11 AM–10 PM", carnival: "2 PM–Close",
    promoTitle: "FREE UNTIL 3 PM", promoDetail: "Agricultural Awareness Day offers free fair admission until 3 PM.", promoEnd: 15 * 60,
    events: [
      { time: "10:00 AM", title: "YSSS Rabbit Fitting & Showing", category: "livestock" },
      { time: "11:00 AM", title: "Fair gates + train rides open", category: "family", featured: true },
      { time: "11:15 AM", title: "Adriano Ferraro", category: "music" },
      { time: "1:00 PM", title: "YSSS Beef Team Fitting Competition", category: "livestock" },
      { time: "1:45 PM", title: "Courtney & Co.", category: "music" },
      { time: "2:00 PM", title: "Carnival opens + YSSS Goat Fitting & Showing", category: "rides", featured: true },
      { time: "4:00 PM", title: "Pocket Pet Showmanship", category: "animals" },
      { time: "4:30 PM", title: "Beyond Limits Swine Show", category: "livestock" },
      { time: "5:30 PM", title: "Post Falls Varsity Dance Team", category: "shows" },
      { time: "6:00 PM", title: "Kylie Hill", category: "music" },
      { time: "6:30 PM", title: "Gem State Stampede PRCA Rodeo", category: "motorsports", featured: true, ticketed: true },
      { time: "8:00 PM", title: "Music on the Midway", category: "music" }
    ]
  },
  {
    key: "2026-08-27", label: "Thursday, August 27", shortLabel: "THURSDAY, AUGUST 27",
    gatesOpen: 11 * 60, gatesClose: 22 * 60, gates: "11 AM–10 PM", carnival: "2 PM–Close",
    promoTitle: "COAT DONATION = FREE", promoDetail: "Donate a coat for free fair admission until 3 PM on STEM Day.", promoEnd: 15 * 60,
    events: [
      { time: "10:00 AM", title: "YSSS Dairy Goat Quality Judging", category: "livestock" },
      { time: "11:00 AM", title: "Fair gates open + Draft Horse Demonstrations", category: "livestock", featured: true },
      { time: "11:15 AM", title: "Rock School NW", category: "music" },
      { time: "1:00 PM", title: "YSSS Market & Breeding Beef Quality Judging + train rides", category: "livestock" },
      { time: "1:45 PM", title: "PeachFuzz & The PowerChill", category: "music" },
      { time: "2:00 PM", title: "Carnival opens", category: "rides", featured: true },
      { time: "3:00 PM", title: "YSSS Goat Team Fitting + Make-A-Wish Cowboy for a Day Crowning", category: "family" },
      { time: "4:45 PM", title: "Kylie Hill Band", category: "music" },
      { time: "5:00 PM", title: "Pack Goat Obstacle Course", category: "animals" },
      { time: "6:00 PM", title: "Pamela Jean", category: "music" },
      { time: "6:30 PM", title: "Gem State Stampede PRCA Rodeo Xtreme Bulls", category: "motorsports", featured: true, ticketed: true },
      { time: "8:00 PM", title: "Music on the Midway", category: "music" }
    ]
  },
  {
    key: "2026-08-28", label: "Friday, August 28", shortLabel: "FRIDAY, AUGUST 28",
    gatesOpen: 11 * 60, gatesClose: 22 * 60, gates: "11 AM–10 PM", carnival: "2 PM–Close",
    promoTitle: "$2 OFF WEARING PINK", promoDetail: "Wear pink for $2 off fair admission until 3 PM.", promoEnd: 15 * 60,
    events: [
      { time: "10:00 AM", title: "YSSS Dairy Goat Fitting & Showing", category: "livestock" },
      { time: "11:00 AM", title: "Fair gates open + Draft Horse Performance Class", category: "livestock", featured: true },
      { time: "12:30 PM", title: "Adriano Ferraro", category: "music" },
      { time: "1:00 PM", title: "Train rides", category: "family" },
      { time: "2:00 PM", title: "Carnival opens", category: "rides", featured: true },
      { time: "3:00 PM", title: "Gruvé Smoothies", category: "music" },
      { time: "3:15 PM", title: "Mystic Mountain Music", category: "music" },
      { time: "4:00 PM", title: "Princess for a Day Crowning Ceremony", category: "family" },
      { time: "5:00 PM", title: "Dancing with Sandy + YSSS Round Robin", category: "shows" },
      { time: "6:00 PM", title: "Isaac Hirtle + Tanya Low", category: "music" },
      { time: "6:30 PM", title: "Gem State Stampede PRCA Rodeo", category: "motorsports", featured: true, ticketed: true },
      { time: "8:00 PM", title: "Music on the Midway", category: "music" }
    ]
  },
  {
    key: "2026-08-29", label: "Saturday, August 29", shortLabel: "SATURDAY, AUGUST 29",
    gatesOpen: 11 * 60, gatesClose: 22 * 60, gates: "11 AM–10 PM", carnival: "12 PM–Close",
    promoTitle: "$2 OFF WITH MILITARY ID", promoDetail: "Patriot Day: $2 off fair admission with military ID until 3 PM.", promoEnd: 15 * 60,
    events: [
      { time: "8:00 AM", title: "Youth Livestock Buyers Breakfast", category: "livestock" },
      { time: "9:00 AM", title: "Youth Stock Sale", category: "livestock", featured: true },
      { time: "11:00 AM", title: "Fair gates open + Draft Horse Junior Showmanship", category: "livestock" },
      { time: "11:15 AM", title: "The Midnight Juliets", category: "music" },
      { time: "12:00 PM", title: "Carnival opens + Draft Horse Log Skidding Jackpot", category: "rides", featured: true },
      { time: "1:00 PM", title: "Draft Horse Pull + train rides", category: "family" },
      { time: "3:00 PM", title: "K-Tigers Taekwondo Performance", category: "shows" },
      { time: "4:00 PM", title: "Friends of the Fair Awards + Princess for a Day Crowning", category: "family" },
      { time: "5:45 PM", title: "Prairie Fire", category: "music" },
      { time: "6:30 PM", title: "Gem State Stampede PRCA Rodeo", category: "motorsports", featured: true, ticketed: true },
      { time: "7:30 PM", title: "Tamarack Ridge Trio", category: "music" },
      { time: "8:00 PM", title: "Music on the Midway", category: "music" }
    ]
  },
  {
    key: "2026-08-30", label: "Sunday, August 30", shortLabel: "SUNDAY, AUGUST 30",
    gatesOpen: 11 * 60, gatesClose: 19 * 60, gates: "11 AM–7 PM", carnival: "12 PM–Close",
    promoTitle: "12 & UNDER FREE", promoDetail: "Family Day: kids age 12 and under receive free admission until 3 PM.", promoEnd: 15 * 60,
    events: [
      { time: "11:00 AM", title: "Fair gates open", category: "family", featured: true },
      { time: "11:30 AM", title: "Golden SoleZ", category: "shows" },
      { time: "12:00 PM", title: "Carnival opens + Library activities", category: "rides", featured: true },
      { time: "12:30 PM", title: "The Midnight Juliets", category: "music" },
      { time: "1:00 PM", title: "Train rides", category: "family" },
      { time: "2:00 PM", title: "Lake City Harmonizers", category: "music" },
      { time: "3:00 PM", title: "Gem State Stampede PRCA Rodeo + Mel Dalton Band", category: "motorsports", featured: true, ticketed: true },
      { time: "3:45 PM", title: "Parade of Champions Announcement", category: "family" },
      { time: "4:00 PM", title: "Dancing with Sandy + Dante D'Angelo + Jason Perry", category: "shows" },
      { time: "4:15 PM", title: "Music on the Midway", category: "music", featured: true }
    ]
  }
];

const fairDayByKey = Object.fromEntries(fairDays.map(day => [day.key, day])) as Record<string, FairDay>;
const promoDays = fairDays.map(day => [day.label.replace(/day, August /, " ").replace("Friday ", "Fri ").replace("Saturday ", "Sat ").replace("Sunday ", "Sun ").replace("Monday ", "Mon ").replace("Tuesday ", "Tue ").replace("Wednesday ", "Wed ").replace("Thursday ", "Thu "), day.promoDetail] as const);

function minutes(time: string) {
  const [clock, suffix] = time.split(" ");
  let [h, m] = clock.split(":").map(Number);
  if (suffix === "PM" && h !== 12) h += 12;
  if (suffix === "AM" && h === 12) h = 0;
  return h * 60 + m;
}

function cdaClock() {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: FAIR_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  }).formatToParts(new Date());
  const part = (type: Intl.DateTimeFormatPartTypes) => parts.find(p => p.type === type)?.value ?? "00";
  const hour = Number(part("hour")) % 24;
  const minute = Number(part("minute"));
  return { now: hour * 60 + minute, dateKey: `${part("year")}-${part("month")}-${part("day")}` };
}

function formatOpening(totalMinutes: number) {
  const h24 = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;
  const suffix = h24 >= 12 ? "PM" : "AM";
  const h = h24 % 12 || 12;
  return `${h}${m ? `:${String(m).padStart(2, "0")}` : ""} ${suffix}`;
}

function validTab(value: string): value is Tab {
  return tabs.some(tab => tab.id === value);
}

export default function Home() {
  const initialClock = cdaClock();
  const [now, setNow] = useState(initialClock.now);
  const [dateKey, setDateKey] = useState(initialClock.dateKey);
  const day = fairDayByKey[dateKey] ?? fairDays[0];
  const dayIndex = fairDays.findIndex(item => item.key === day.key);
  const nextDay = dayIndex >= 0 && dayIndex < fairDays.length - 1 ? fairDays[dayIndex + 1] : null;
  const events = day.events;
  const foundNext = events.findIndex(e => minutes(e.time) >= now);
  const nextEvent = foundNext === -1 ? null : events[foundNext];
  const isOpen = now >= day.gatesOpen && now < day.gatesClose;
  const beforeOpen = now < day.gatesOpen;
  const promoActive = day.promoEnd ? now < day.promoEnd : true;

  const [activeTab, setActiveTab] = useState<Tab>("today");
  const [audience, setAudience] = useState("Family");
  const [duration, setDuration] = useState("4 Hours");
  const [interest, setInterest] = useState("Rides");
  const [built, setBuilt] = useState(false);

  useEffect(() => {
    const refreshClock = () => {
      const clock = cdaClock();
      setNow(clock.now);
      setDateKey(clock.dateKey);
    };
    refreshClock();
    const timer = window.setInterval(refreshClock, 60_000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    setBuilt(false);
  }, [dateKey]);

  useEffect(() => {
    const readEntry = (source: string) => {
      const hash = window.location.hash.replace("#", "");
      const tab: Tab = validTab(hash) ? hash : "today";
      setActiveTab(tab);

      const params = new URLSearchParams(window.location.search);
      let referrerHost = "direct";
      if (document.referrer) {
        try { referrerHost = new URL(document.referrer).hostname || "direct"; } catch { referrerHost = "unknown"; }
      }

      trackEvent(source === "landing" ? "journey_start" : "tab_view", {
        tab,
        source: params.get("utm_source") || source,
        campaign: params.get("utm_campaign") || "none",
        content: params.get("utm_content") || "none",
        referrer_host: referrerHost,
        fair_date: dateKey
      });
    };

    readEntry("landing");
    const onHashChange = () => readEntry("browser_hash");
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, [dateKey]);

  function selectTab(tab: Tab, source: string) {
    trackEvent("tab_view", { from: activeTab, tab, source, fair_date: dateKey });
    setActiveTab(tab);
    window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}#${tab}`);
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
      .filter(e => minutes(e.time) >= Math.max(now, day.gatesOpen))
      .sort((a, b) => b.score - a.score)
      .slice(0, max)
      .sort((a, b) => a.index - b.index);
  }, [audience, duration, interest, now, events, day.gatesOpen]);

  function buildPlan() {
    setBuilt(true);
    trackEvent("planner_generate", { audience, duration, interest, result_count: plan.length, fair_date: dateKey });
  }

  async function sharePlan() {
    const text = `Our CDA Fair Day (${day.label}): ${plan.map(e => `${e.time} ${e.title}`).join(" · ")}`;
    const url = `${window.location.origin}${window.location.pathname}?utm_source=share&utm_medium=referral&utm_campaign=cdafair_plan#my-day`;

    if (navigator.share) {
      try {
        await navigator.share({ title: "CDA Fair Day", text, url });
        trackEvent("planner_share", { method: "native", result_count: plan.length, fair_date: dateKey });
      } catch {
        trackEvent("planner_share_cancel", { method: "native", fair_date: dateKey });
      }
      return;
    }

    await navigator.clipboard.writeText(`${text}\n${url}`);
    trackEvent("planner_share", { method: "clipboard", result_count: plan.length, fair_date: dateKey });
    alert("Fair plan copied to clipboard.");
  }

  const status = isOpen ? "OPEN NOW" : beforeOpen ? `OPENS AT ${formatOpening(day.gatesOpen)}` : "CLOSED FOR TONIGHT";
  const nextDayHighlights = nextDay ? nextDay.events.filter(e => minutes(e.time) >= nextDay.gatesOpen).slice(0, 7) : [];

  return (
    <main className="app">
      <header className="compactHero">
        <nav className="topbar">
          <button className="brandButton" onClick={() => selectTab("today", "brand")} aria-label="CDA Fair Day home"><span>🎡</span> CDA FAIR DAY</button>
          <TrackedLink href={OFFICIAL} destination="official_home">Official Fair ↗</TrackedLink>
        </nav>

        <div className="heroContent">
          <div className="heroCopy">
            <div className="liveLine">
              <span className={isOpen ? "statusDot open" : "statusDot"}/>
              <p className="eyebrow">{status} · {day.shortLabel}</p>
            </div>
            <h1>Your fair day.<br/><span>Without the digging.</span></h1>
          </div>

          <div className="heroStatus">
            <button className="dealMini" onClick={() => selectTab("deals", "hero_deal")}>
              <small>{promoActive ? "TODAY'S DEAL" : "TODAY'S DEAL ENDED"}</small>
              <strong>{promoActive ? day.promoTitle : "SEE ALL FAIR DEALS"}</strong>
              <span>{promoActive ? day.promoDetail : `${day.promoTitle} · check the full daily deal list`}</span>
            </button>
            <button className="nextMini" onClick={() => selectTab(nextEvent ? "today" : "info", "hero_next")}>
              <small>{nextEvent ? "NEXT UP" : "TODAY'S PROGRAM WRAPPED"}</small>
              <strong>{nextEvent ? nextEvent.time : nextDay ? "Tomorrow" : "Fair complete"}</strong>
              <span>{nextEvent ? nextEvent.title : nextDay ? `See ${nextDay.label}'s highlights` : "Thanks for a great Fair"}</span>
            </button>
          </div>
        </div>
      </header>

      <nav className="desktopTabs" aria-label="Fair guide sections" role="tablist">
        <div className="tabInner">
          {tabs.map(tab => (
            <button key={tab.id} className={activeTab === tab.id ? "tab active" : "tab"} onClick={() => selectTab(tab.id, "desktop_nav")} aria-selected={activeTab === tab.id} aria-controls={`panel-${tab.id}`} role="tab">
              <span>{tab.icon}</span>{tab.label}
            </button>
          ))}
        </div>
      </nav>

      <div className="shell tabShell">
        {activeTab === "today" && (
          <section className="tabPage" id="panel-today" aria-label="Today" role="tabpanel">
            <div className="quickGrid compactQuick">
              <Quick icon="🕑" label="Gates" value={day.gates}/>
              <Quick icon="🎡" label="Carnival" value={day.carnival}/>
              <Quick icon="🚗" label="Parking" value="$7" onClick={() => selectTab("info", "today_parking")}/>
              <Quick icon="📍" label="Directions" value="Government Way" href={MAPS} destination="directions"/>
            </div>

            <section className="panel primaryPanel">
              <Heading eyebrow="TODAY" title={`What's happening · ${day.label}`} link={EVENTS}/>
              <p className="scheduleNote">A fast summary of today's program. The official schedule remains the source of truth for late changes.</p>
              <div className="timeline">
                {events.map((event, i) => (
                  <div className={`event ${i === foundNext ? "next" : ""}`} key={`${event.time}-${event.title}`}>
                    <div className="time">{event.time}</div>
                    <div>
                      <div className="eventTitle">{event.title}{event.ticketed && <span className="pill">ticketed</span>}</div>
                      <div className="meta">{event.featured ? "★ Highlight" : event.category}{i === foundNext ? " · NEXT UP" : ""}</div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </section>
        )}

        {activeTab === "my-day" && (
          <section className="tabPage" id="panel-my-day" aria-label="My Day" role="tabpanel">
            <section className="panel planner primaryPanel">
              <Heading eyebrow="MAKE IT YOURS" title="Build My Fair Day"/>
              <p className="sectionIntro">Tell us what kind of day you want. We'll prioritize the strongest matches from today's remaining schedule.</p>
              <Choice label="Who's going?" values={["Family", "Adults", "Date", "Kids"]} current={audience} set={setAudience}/>
              <Choice label="How long?" values={["2 Hours", "4 Hours", "All Day"]} current={duration} set={setDuration}/>
              <Choice label="Main vibe?" values={["Rides", "Animals", "Shows", "Music", "Motorsports"]} current={interest} set={setInterest}/>
              <button className="primary make" onClick={buildPlan}>MAKE MY PLAN</button>

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

            <button className="crossLink" onClick={() => selectTab("today", "planner_schedule_link")}>
              <span><small>NEED THE FULL LIST?</small><strong>Browse today's schedule</strong></span><b>→</b>
            </button>
          </section>
        )}

        {activeTab === "deals" && (
          <section className="tabPage" id="panel-deals" aria-label="Deals" role="tabpanel">
            <section className="dealBanner">
              <div>
                <p className="eyebrow">{promoActive ? "TODAY'S BEST MOVE" : "TODAY'S PROMOTION"}</p>
                <h2>{promoActive ? day.promoTitle : `${day.promoTitle} has ended for today.`}</h2>
                <p>{promoActive ? day.promoDetail : "Standard admission is still available. Compare gate and online pricing below."}</p>
              </div>
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
              <div className="promoList">{promoDays.map(([promoDay, deal]) => (
                <div className="promo" key={promoDay}><strong>{promoDay}</strong><span>{deal}</span></div>
              ))}</div>
            </section>
          </section>
        )}

        {activeTab === "info" && (
          <section className="tabPage" id="panel-info" aria-label="Fair Info" role="tabpanel">
            <div className="infoGrid">
              <InfoAction icon="📍" title="Directions" detail="4056 N. Government Way" href={MAPS} destination="directions"/>
              <InfoAction icon="🚗" title="Parking" detail="$7 per vehicle" href={PARKING} destination="parking"/>
              <InfoAction icon="🕑" title="Hours" detail={`Today · ${day.gates}`} href={HOURS} destination="hours"/>
              <InfoAction icon="🎟️" title="Official Fair" detail="Tickets, updates + notices" href={OFFICIAL} destination="official_home"/>
            </div>

            {nextDay ? (
              <section className="panel primaryPanel">
                <Heading eyebrow={nextDay.label.toUpperCase()} title="Tomorrow's highlights" link={EVENTS}/>
                <div className="tomorrow">{nextDayHighlights.map(event => <div key={`${event.time}-${event.title}`}>{event.time} · {event.title}</div>)}</div>
              </section>
            ) : (
              <section className="panel primaryPanel">
                <Heading eyebrow="FINAL DAY" title="That's a wrap" link={EVENTS}/>
                <p className="sectionIntro">Today is the final scheduled day of the 2026 North Idaho State Fair.</p>
              </section>
            )}

            <section className="source">
              <strong>Unofficial community guide.</strong>
              <p>Information is summarized from the North Idaho State Fair's public website and can change. Verify time-sensitive details with the official Fair before making plans.</p>
              <div className="links">
                <TrackedLink href={EVENTS} destination="events">Events ↗</TrackedLink>
                <TrackedLink href={ADMISSION} destination="admission">Admission ↗</TrackedLink>
                <TrackedLink href={HOURS} destination="hours">Hours ↗</TrackedLink>
                <TrackedLink href={PARKING} destination="parking">Parking ↗</TrackedLink>
                <TrackedLink href={MAPS} destination="directions">Directions ↗</TrackedLink>
              </div>
            </section>
          </section>
        )}

        <footer>Made in Coeur d'Alene · AeroVista</footer>
      </div>

      <nav className="bottomTabs" aria-label="Fair guide sections" role="tablist">
        {tabs.map(tab => (
          <button key={tab.id} className={activeTab === tab.id ? "active" : ""} onClick={() => selectTab(tab.id, "mobile_nav")} aria-selected={activeTab === tab.id} aria-controls={`panel-${tab.id}`} role="tab">
            <span>{tab.icon}</span><small>{tab.label}</small>
          </button>
        ))}
      </nav>
    </main>
  );
}

function linkDestination(href: string) {
  if (href === EVENTS) return "events";
  if (href === ADMISSION) return "admission";
  if (href === HOURS) return "hours";
  if (href === PARKING) return "parking";
  if (href === MAPS) return "directions";
  return "official_home";
}

function TrackedLink({ href, destination, className, children }: { href: string; destination: string; className?: string; children: ReactNode }) {
  return <a className={className} href={href} target="_blank" rel="noreferrer" onClick={() => trackEvent("outbound_click", { destination })}>{children}</a>;
}

function Heading({ eyebrow, title, link }: { eyebrow: string; title: string; link?: string }) {
  return <div className="heading"><div><p className="eyebrow">{eyebrow}</p><h2>{title}</h2></div>{link && <TrackedLink href={link} destination={linkDestination(link)}>Official source ↗</TrackedLink>}</div>;
}

function Quick({ icon, label, value, href, destination, onClick }: { icon: string; label: string; value: string; href?: string; destination?: string; onClick?: () => void }) {
  const body = <><span className="qicon">{icon}</span><small>{label}</small><strong>{value}</strong></>;
  if (href) return <TrackedLink className="quick" href={href} destination={destination || linkDestination(href)}>{body}</TrackedLink>;
  if (onClick) return <button className="quick quickButton" onClick={onClick}>{body}</button>;
  return <div className="quick">{body}</div>;
}

function Price({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return <div className="price"><span>{label}</span><strong>{value}</strong>{sub && <small>{sub}</small>}</div>;
}

function Choice({ label, values, current, set }: { label: string; values: string[]; current: string; set: (v: string) => void }) {
  return <div className="choice"><label>{label}</label><div>{values.map(v => <button key={v} className={v === current ? "active" : ""} onClick={() => set(v)}>{v}</button>)}</div></div>;
}

function InfoAction({ icon, title, detail, href, destination }: { icon: string; title: string; detail: string; href: string; destination: string }) {
  return <TrackedLink className="infoAction" href={href} destination={destination}><span>{icon}</span><div><strong>{title}</strong><small>{detail}</small></div><b>↗</b></TrackedLink>;
}
