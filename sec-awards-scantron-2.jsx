const { useState, useRef } = React;

const LEGEND = [
  { letter: "A", abbr: "ALA", school: "Alabama",       color: "#9E1B32" },
  { letter: "B", abbr: "LSU", school: "LSU",            color: "#461D7C" },
  { letter: "C", abbr: "OM",  school: "Ole Miss",       color: "#CE1126" },
  { letter: "D", abbr: "SC",  school: "South Carolina", color: "#73000A" },
  { letter: "E", abbr: "VAN", school: "Vanderbilt",     color: "#B8960C" },
];

const AWARDS = [
  {
    q: "01", category: "SCHOLAR-ATHLETE OF THE YEAR",
    answer: "A", player: "Karly Weathers",
    position: "Forward · Crimson Tide",
    highlight: "3.99 GPA · Nursing Major · SEC Academic Honor Roll",
    stats: [
      { label: "GPA",      value: "3.99"       },
      { label: "Major",    value: "Nursing"    },
      { label: "PPG",      value: "9.5"        },
      { label: "RPG",      value: "6.1"        },
      { label: "APG",      value: "3.3"        },
      { label: "Academic", value: "Honor Roll" },
    ],
    note: "One of the nation's elite student-athletes, combining a 3.99 GPA in Nursing with consistent on-court impact for the Crimson Tide.",
  },
  {
    q: "02", category: "PLAYER OF THE YEAR",
    answer: "E", player: "Mikayla Blakes",
    position: "Guard · Commodores",
    highlight: "27.1 PPG · Led the Entire NCAA in Scoring",
    stats: [
      { label: "PPG",         value: "27.1"  },
      { label: "RPG",         value: "3.8"   },
      { label: "APG",         value: "4.6"   },
      { label: "SPG",         value: "2.9"   },
      { label: "FG%",         value: "46.6%" },
      { label: "30-PT Games", value: "12"    },
    ],
    note: "First Commodore in program history to win SEC Player of the Year. Led the entire nation in scoring as part of Vanderbilt's historic 3-award sweep.",
  },
  {
    q: "03", category: "FRESHMAN OF THE YEAR",
    answer: "E", player: "Aubrey Galvan",
    position: "Guard · Commodores",
    highlight: "5.9 APG · No. 1 Among All NCAA Freshmen",
    stats: [
      { label: "PPG",      value: "12.9"        },
      { label: "RPG",      value: "3.5"         },
      { label: "APG",      value: "5.9"         },
      { label: "SPG",      value: "2.7"         },
      { label: "A/TO",     value: "2.6"         },
      { label: "AST Rank", value: "No. 1 Frosh" },
    ],
    note: "Leads all NCAA freshmen in assists per game. The engine behind Vanderbilt's historic three-award sweep, the first in SEC history.",
  },
  {
    q: "04", category: "NEWCOMER OF THE YEAR",
    answer: "C", player: "Cotie McMahon",
    position: "Guard / Forward · Rebels",
    highlight: "19.9 PPG · Transfer from Ohio State",
    stats: [
      { label: "PPG",         value: "19.9"       },
      { label: "RPG",         value: "5.4"        },
      { label: "APG",         value: "2.9"        },
      { label: "SEC PPG",     value: "21.0"       },
      { label: "Career Pts",  value: "2,038"      },
      { label: "Prev School", value: "Ohio State" },
    ],
    note: "5th Ole Miss player all-time to reach 2,000 career points. Transferred from Ohio State and immediately became one of the SEC's premier players.",
  },
  {
    q: "05", category: "DEFENSIVE PLAYER OF THE YEAR",
    answer: "D", player: "Raven Johnson",
    position: "Guard · Gamecocks",
    highlight: "A/TO 3.33 · 4th Nationally · 5th Gamecock Ever to Win",
    stats: [
      { label: "PPG",       value: "10.0"    },
      { label: "APG",       value: "5.4"     },
      { label: "SPG",       value: "1.6"     },
      { label: "A/TO",      value: "3.33"    },
      { label: "NCAA A/TO", value: "4th"     },
      { label: "3PT% Drop", value: "8.3 pts" },
    ],
    note: "8th guard and 5th Gamecock to win DPOY, joining A'ja Wilson, Aliyah Boston, Destanni Henderson and Zia Cooke.",
  },
  {
    q: "06", category: "SIXTH WOMAN OF THE YEAR",
    answer: "B", player: "MiLaysia Fulwiley",
    position: "Guard · Tigers",
    highlight: "14.1 PPG · 3.1 SPG Off the Bench",
    stats: [
      { label: "PPG",    value: "14.1"      },
      { label: "RPG",    value: "3.9"       },
      { label: "APG",    value: "3.5"       },
      { label: "SPG",    value: "3.1"       },
      { label: "Blocks", value: "41"        },
      { label: "Role",   value: "Off Bench" },
    ],
    note: "Only the 3rd Tiger ever to win, joining Sylvia Fowles (2005) and Allison Hightower (2008). Starter numbers off the bench.",
  },
  {
    q: "07", category: "COACH OF THE YEAR",
    answer: "E", player: "Shea Ralph",
    position: "Head Coach · Commodores",
    highlight: "27-4 · First-Ever Triple Award Sweep in SEC History",
    stats: [
      { label: "Record",       value: "27-4"     },
      { label: "SEC Wins",     value: "13"       },
      { label: "Home",         value: "16-0"     },
      { label: "SEC Win%",     value: "76.5%"    },
      { label: "Awards Swept", value: "3 of 3"   },
      { label: "Historic",     value: "1st Ever" },
    ],
    note: "First program in SEC history to sweep Player of the Year, Freshman of the Year, and Coach of the Year in the same season.",
  },
];

function getLeg(l) { return LEGEND.find(x => x.letter === l); }
function statCol(c) { return c === "#B8960C" ? "#d4aa00" : c; }
const BC = "'Barlow Condensed', sans-serif";

function FlipCard({ award, onClose }) {
  const [flipped, setFlipped] = useState(false);
  const lg  = getLeg(award.answer);
  const col = statCol(lg.color);

  return (
    <div style={{ padding: "10px 16px 14px", background: "rgba(0,48,135,0.05)", borderTop: "2px solid #003087" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
        <span style={{ fontFamily: BC, fontWeight: 500, fontSize: "8px", letterSpacing: ".14em", textTransform: "uppercase", color: "#4b5563" }}>
          {award.player}
        </span>
        <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: BC, fontWeight: 500, fontSize: "9px", letterSpacing: ".1em", color: "#4b5563", padding: 0 }}>
          CLOSE ✕
        </button>
      </div>

      <div style={{ perspective: "1000px", width: "100%", cursor: "pointer" }} onClick={() => setFlipped(f => !f)}>
        <div style={{
          position: "relative",
          transformStyle: "preserve-3d",
          transition: "transform 0.52s cubic-bezier(.4,0,.2,1)",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}>
          <div style={{
            backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden",
            background: "#fff", borderRadius: "3px",
            border: "1px solid #e2e8f0", overflow: "hidden",
            visibility: flipped ? "hidden" : "visible",
          }}>
            <div style={{ height: "3px", background: lg.color }} />
            <div style={{ padding: "12px 16px 0" }}>
              <div style={{ fontFamily: BC, fontWeight: 500, fontSize: "9px", letterSpacing: ".16em", textTransform: "uppercase", color: col, marginBottom: "5px" }}>
                {award.category}
              </div>
              <div style={{ fontFamily: BC, fontWeight: 700, fontSize: "24px", color: "#0f1a2e", letterSpacing: ".01em", lineHeight: 1.0, textTransform: "uppercase" }}>
                {award.player}
              </div>
              <div style={{ fontFamily: BC, fontWeight: 400, fontSize: "11px", color: "#4b5563", marginTop: "4px", letterSpacing: ".07em", textTransform: "uppercase" }}>
                {award.position}
              </div>
              <div style={{ fontFamily: BC, fontStyle: "italic", fontWeight: 400, fontSize: "11.5px", color: "#374151", marginTop: "8px", paddingTop: "8px", borderTop: "1px solid #eef0f3", lineHeight: 1.4 }}>
                {award.highlight}
              </div>
            </div>
            <div style={{ padding: "8px 16px", marginTop: "10px", background: "#f8fafc", borderTop: "1px solid #f1f5f9", fontFamily: BC, fontWeight: 500, fontSize: "8px", letterSpacing: ".16em", textTransform: "uppercase", color: "#4b5563" }}>
              FLIP FOR STATS
            </div>
          </div>

          <div style={{
            position: "absolute", inset: 0,
            backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            background: "#0f1a2e", borderRadius: "3px",
            border: `2px solid ${lg.color}`,
            display: "flex", flexDirection: "column", overflow: "hidden",
            visibility: flipped ? "visible" : "hidden",
          }}>
            <div style={{ background: lg.color, padding: "8px 14px 7px", flexShrink: 0 }}>
              <div style={{ fontFamily: BC, fontWeight: 500, fontSize: "8px", letterSpacing: ".16em", textTransform: "uppercase", color: "rgba(255,255,255,0.8)", marginBottom: "2px" }}>
                {award.category}
              </div>
              <div style={{ fontFamily: BC, fontWeight: 700, fontSize: "17px", color: "#fff", letterSpacing: ".02em", lineHeight: 1.05, textTransform: "uppercase" }}>
                {award.player}
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gridTemplateRows: "1fr 1fr", flex: 1 }}>
              {award.stats.map((s, i) => (
                <div key={s.label} style={{
                  padding: "10px 12px 8px",
                  borderRight: i % 3 !== 2 ? "1px solid rgba(255,255,255,0.07)" : "none",
                  borderBottom: i < 3 ? "1px solid rgba(255,255,255,0.07)" : "none",
                  display: "flex", flexDirection: "column", justifyContent: "center",
                }}>
                  <div style={{ fontFamily: BC, fontWeight: 700, fontSize: "17px", color: col, lineHeight: 1, letterSpacing: ".01em", textTransform: "uppercase" }}>
                    {s.value}
                  </div>
                  <div style={{ fontFamily: BC, fontWeight: 500, fontSize: "7.5px", color: "rgba(255,255,255,0.55)", letterSpacing: ".12em", textTransform: "uppercase", marginTop: "3px" }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
            <div style={{ padding: "7px 14px 10px", borderTop: "1px solid rgba(255,255,255,0.07)", flexShrink: 0 }}>
              <div style={{ fontFamily: BC, fontStyle: "italic", fontWeight: 400, fontSize: "10px", color: "rgba(255,255,255,0.6)", lineHeight: 1.5 }}>
                {award.note}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SecScantron() {
  const [activeQ, setActiveQ] = useState(null);
  const [glowing, setGlowing] = useState(null);
  const [showKey, setShowKey] = useState(false);
  const rowRefs = useRef({});

  function handleClick(award) {
    setGlowing(award.q);
    setTimeout(() => setGlowing(null), 700);
    if (activeQ === award.q) { setActiveQ(null); return; }
    setActiveQ(award.q);
    setTimeout(() => rowRefs.current[award.q]?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
  }

  return (
    <div style={{ minHeight: "100vh", background: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,400;0,500;0,600;0,700;0,900;1,400;1,500&display=swap');
        @keyframes rect-pulse {
          0%   { transform: scale(1);    filter: brightness(1);    }
          35%  { transform: scale(1.22); filter: brightness(1.38); }
          70%  { transform: scale(1.06); filter: brightness(1.1);  }
          100% { transform: scale(1);    filter: brightness(1);    }
        }
        .rect-pulse  { animation: rect-pulse 0.65s ease forwards; }
        .rect-filled { transition: filter .15s, transform .15s; cursor: pointer; }
        .rect-filled:hover { filter: brightness(1.18); transform: scale(1.08); }
      `}</style>

      <div style={{ background: "#f5f2eb", borderRadius: "3px", boxShadow: "0 2px 8px rgba(0,0,0,0.18), 0 16px 56px rgba(0,0,0,0.15)", width: "100%", maxWidth: "520px", overflow: "hidden" }}>

        <div style={{ background: "#003087", padding: "12px 18px 10px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "10px" }}>
          <div>
            <div style={{ fontFamily: BC, fontWeight: 600, fontSize: "14px", letterSpacing: ".2em", textTransform: "uppercase", color: "#fff" }}>
              Southeastern Conference
            </div>
            <div style={{ fontFamily: BC, fontWeight: 400, fontSize: "10px", color: "rgba(255,255,255,0.85)", letterSpacing: ".12em", textTransform: "uppercase", marginTop: "2px" }}>
              Official Awards · 2025-2026 Season
            </div>
          </div>
          <div style={{ background: "#CFAC5B", color: "#003087", fontFamily: BC, fontWeight: 500, fontSize: "7.5px", letterSpacing: ".09em", textTransform: "uppercase", padding: "4px 9px", borderRadius: "2px", whiteSpace: "nowrap", flexShrink: 0 }}>
            FORM #POSTSEASONAWARDS
          </div>
        </div>
        <div style={{ height: "3px", background: "#CFAC5B" }} />

        <div style={{ padding: "12px 18px 10px", borderBottom: "1px solid #c8c4bb" }}>
          <div style={{ fontFamily: BC, fontWeight: 600, fontSize: "12px", color: "#0f1a2e", letterSpacing: ".05em", textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            2026 SEC Women's Basketball Postseason Awards
          </div>
          <div style={{ fontFamily: BC, fontWeight: 400, fontSize: "9px", color: "#4b5563", letterSpacing: ".13em", textTransform: "uppercase", marginTop: "4px" }}>
            Tap the filled answer to reveal each award winner · March 3, 2026
          </div>
        </div>

        <div style={{ padding: "8px 18px", borderBottom: "1px solid #c8c4bb", background: "rgba(0,48,135,0.03)", display: "flex", alignItems: "center", gap: "8px", flexWrap: "nowrap", overflowX: "auto" }}>
          <span style={{ fontFamily: BC, fontWeight: 600, fontSize: "8px", letterSpacing: ".16em", textTransform: "uppercase", color: "#4b5563", flexShrink: 0 }}>KEY:</span>
          {LEGEND.map((l, i) => (
            <div key={l.letter} style={{ display: "flex", alignItems: "center", gap: "3px", flexShrink: 0 }}>
              {i > 0 && <span style={{ color: "#c4bfb6", fontSize: "8px", marginRight: "2px" }}>·</span>}
              <div style={{ width: "17px", height: "12px", borderRadius: "2px", background: l.color, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontFamily: BC, fontWeight: 600, fontSize: "8px" }}>
                {l.letter}
              </div>
              <span style={{ fontFamily: BC, fontWeight: 600, fontSize: "9.5px", color: "#374151", letterSpacing: ".03em" }}>{l.abbr}</span>
              <span style={{ fontFamily: BC, fontWeight: 400, fontSize: "9.5px", color: "#4b5563" }}>{l.school}</span>
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "22px 1fr auto", gap: "8px", padding: "7px 18px 5px", borderBottom: "1px solid #c8c4bb", alignItems: "center" }}>
          <span style={{ fontFamily: BC, fontWeight: 500, fontSize: "7.5px", letterSpacing: ".16em", color: "#6b7280", textTransform: "uppercase" }}>#</span>
          <span style={{ fontFamily: BC, fontWeight: 500, fontSize: "7.5px", letterSpacing: ".16em", color: "#6b7280", textTransform: "uppercase" }}>Award</span>
          <div style={{ display: "flex", gap: "5px" }}>
            {LEGEND.map(l => (
              <div key={l.letter} style={{ width: "28px", textAlign: "center", fontFamily: BC, fontWeight: 700, fontSize: "9px", color: l.color, letterSpacing: ".04em" }}>
                {l.letter}
              </div>
            ))}
          </div>
        </div>

        {AWARDS.map(award => {
          const lg = getLeg(award.answer);
          const isOpen    = activeQ === award.q;
          const isGlowing = glowing === award.q;
          return (
            <div key={award.q} ref={el => rowRefs.current[award.q] = el}>
              <div style={{
                display: "grid", gridTemplateColumns: "22px 1fr auto",
                gap: "8px", padding: "20px 18px",
                borderBottom: isOpen ? "none" : "1px solid rgba(160,155,145,0.3)",
                alignItems: "center",
                background: isOpen ? "rgba(0,48,135,0.05)" : "transparent",
                transition: "background .12s",
              }}>
                <span style={{ fontFamily: BC, fontWeight: 400, fontSize: "11px", color: "#6b7280" }}>{award.q}</span>
                <div style={{ fontFamily: BC, fontWeight: 600, fontSize: "11.5px", color: "#0f1a2e", letterSpacing: ".05em", textTransform: "uppercase", lineHeight: 1.3 }}>
                  {award.category}
                </div>
                <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
                  {LEGEND.map(l => {
                    const filled = l.letter === award.answer;
                    return (
                      <div
                        key={l.letter}
                        className={filled ? `rect-filled${isGlowing ? " rect-pulse" : ""}` : ""}
                        onClick={filled ? () => handleClick(award) : undefined}
                        style={{
                          width: "28px", height: "14px", borderRadius: "2px",
                          border: filled ? "none" : "1.5px solid #a8a39a",
                          background: filled ? l.color : "transparent",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontFamily: BC, fontWeight: 600, fontSize: "8.5px",
                          color: filled ? "#fff" : "transparent",
                          cursor: filled ? "pointer" : "default",
                          letterSpacing: ".04em",
                          boxShadow: isOpen && filled ? `0 0 0 2px ${l.color}55` : "none",
                          transition: "box-shadow .2s",
                        }}
                      >
                        {filled ? l.letter : ""}
                      </div>
                    );
                  })}
                </div>
              </div>
              {isOpen && (
                <div style={{ borderBottom: "1px solid rgba(160,155,145,0.3)" }}>
                  <FlipCard award={award} onClose={() => setActiveQ(null)} />
                </div>
              )}
            </div>
          );
        })}

        <div style={{ borderTop: "1px dashed #ccc9c0", padding: "10px 18px 12px", background: "#ede9e1" }}>
          <button onClick={() => setShowKey(k => !k)} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px", padding: 0 }}>
            <span style={{ fontFamily: BC, fontWeight: 600, fontSize: "8.5px", letterSpacing: ".16em", textTransform: "uppercase", color: "#1a1a1a" }}>Answer Key</span>
            <span style={{ fontFamily: BC, fontSize: "8px", color: "#555", display: "inline-block", transform: showKey ? "rotate(90deg)" : "rotate(0deg)", transition: "transform .2s" }}>▶</span>
          </button>
          {showKey && (
            <div style={{ marginTop: "8px", display: "flex", flexWrap: "wrap", gap: "4px 14px" }}>
              {AWARDS.map(award => {
                const lg = getLeg(award.answer);
                return (
                  <div key={award.q} style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                    <span style={{ fontFamily: BC, fontWeight: 600, fontSize: "9.5px", color: "#1a1a1a", minWidth: "18px" }}>{award.q}.</span>
                    <div style={{ width: "17px", height: "12px", borderRadius: "2px", background: lg.color, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontFamily: BC, fontWeight: 600, fontSize: "7.5px" }}>
                      {award.answer}
                    </div>
                    <span style={{ fontFamily: BC, fontWeight: 600, fontSize: "9.5px", color: "#1a1a1a" }}>{lg.abbr}</span>
                    <span style={{ fontFamily: BC, fontWeight: 400, fontSize: "9.5px", color: "#444" }}>{award.player}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div style={{ background: "#003087", padding: "8px 18px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontFamily: BC, fontWeight: 500, fontSize: "8px", letterSpacing: ".1em", textTransform: "uppercase", color: "rgba(255,255,255,0.75)" }}>
            2026 SEC Women's Basketball
          </span>
          <span style={{ fontFamily: BC, fontWeight: 400, fontSize: "8px", color: "rgba(255,255,255,0.75)" }}>
            secsports.com · March 3, 2026
          </span>
        </div>

      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<SecScantron />);
