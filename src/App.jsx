import React, { useState, useEffect, useMemo } from 'react';
import { Dumbbell, PlayCircle, Check, Flame, Clock, Target, ChevronLeft, Home, ListChecks } from 'lucide-react';

/* ============ DATA — دمبل وعقلة فقط ============ */
const DAYS = [
  {
    key: 'push', num: '01', title: 'دفع', full: 'يوم الدفع', muscles: 'الصدر · الأكتاف · الترايسبس', duration: '34 دقيقة',
    warmup: 'تدوير الكتفين بدمبل خفيف جدًا 15 مرة، ضغط أرضي بدون وزن 2×8 للإحماء، تمديد الصدر الديناميكي 30 ثانية.',
    cooldown: 'إطالة الصدر على الحائط 30 ثانية لكل جانب، إطالة الترايسبس فوق الرأس 30 ثانية.',
    exercises: [
      { name: 'ضغط الدمبل الأرضي', target: 'الصدر والترايسبس', sets: '4×10–12', rest: 75, tip: 'استلقِ على الأرض والركبتين مثنيتين، أنزل الدمبلز حتى تلامس الأرض المرفقان برفق ثم ادفع للأعلى بثبات.', video: 'vAFw7EPL4eM', anim: { type: 'bob', amp: 6, dur: '1.6s' } },
      { name: 'ضغط الكتف بالدمبل', target: 'الأكتاف', sets: '4×10–12', rest: 75, tip: 'ادفع الدمبلز للأعلى في خط مستقيم فوق الكتفين مباشرة، وتجنب قوس أسفل الظهر أثناء الدفع.', video: 'lfb3ffbrd4Q', anim: { type: 'swing', ox: 70, oy: 40, a1: -10, a2: 50, dur: '1.5s' } },
      { name: 'رفرفة جانبية بالدمبل', target: 'الكتف الجانبي', sets: '3×12–15', rest: 60, tip: 'ارفع الدمبلز جانبًا حتى ارتفاع الكتف بميل بسيط للأمام، وتحكم في النزول ببطء لتفادي الاعتماد على الزخم.', video: '-hyAJdSFzT4', anim: { type: 'swing', ox: 66, oy: 45, a1: 10, a2: 80, dur: '1.3s' } },
      { name: 'كسّارة الجمجمة بالدمبل', target: 'الترايسبس', sets: '3×10–12', rest: 60, tip: 'استلقِ وأنزل الدمبلز نحو الجبهة بثني المرفقين فقط، مع تثبيت العضدين عموديًا طوال الحركة.', video: 'QXzhjRnYRT0', anim: { type: 'swing', ox: 70, oy: 35, a1: 0, a2: -60, dur: '1.4s' } },
      { name: 'رفرفة أمامية بالدمبل', target: 'الكتف الأمامي', sets: '3×12', rest: 50, tip: 'ارفع الدمبل أمامك حتى ارتفاع الكتف بذراع شبه مستقيمة، وتجنب التأرجح بالجذع.', video: 'fKMIHZD9S98', anim: { type: 'swing', ox: 70, oy: 40, a1: -10, a2: 60, dur: '1.5s' } },
    ],
  },
  {
    key: 'pull', num: '02', title: 'سحب', full: 'يوم السحب', muscles: 'الظهر · البايسبس · قبضة اليد', duration: '32 دقيقة',
    warmup: 'تعليق حر على العقلة 20 ثانية للإحماء، دوران الذراعين للخلف 15 مرة، شد الكتفين للخلف 15 مرة.',
    cooldown: 'إطالة الظهر العلوي بمد الذراعين للأمام 30 ثانية، إطالة البايسبس على الحائط 30 ثانية.',
    exercises: [
      { name: 'العقلة (Pull-Up)', target: 'الظهر العريض والبايسبس', sets: '4×حتى الفشل', rest: 90, tip: 'ابدأ من تعليق كامل واسحب الذقن فوق العقلة بضم لوحي الكتف، وتحكم في النزول ببطء بدل الإفلات.', video: 'vw5Xmu5CIew', anim: { type: 'bob', amp: -8, dur: '1.8s' } },
      { name: 'سحب الدمبل بالانحناء', target: 'الظهر', sets: '4×10–12', rest: 75, tip: 'انحنِ للأمام مع ظهر مستقيم واسحب الدمبلز نحو الخصر مع ضم لوحي الكتف في القمة.', video: '6TSP1TRMUzs', anim: { type: 'swing', ox: 70, oy: 38, a1: 20, a2: -45, dur: '1.4s' } },
      { name: 'سحب فوق الرأس بالدمبل', target: 'الظهر العريض والصدر', sets: '3×12', rest: 60, tip: 'استلقِ عرضيًا وحرّك دمبل واحد من فوق الرأس إلى فوق الصدر بذراعين شبه مستقيمتين، مع شد القفص الصدري.', video: 'uH52ROQkROg', anim: { type: 'swing', ox: 50, oy: 30, a1: -20, a2: 60, dur: '1.6s' } },
      { name: 'تجعيد البايسبس بالدمبل', target: 'البايسبس', sets: '3×12', rest: 50, tip: 'ثبّت المرفقين بجانب الجسم وارفع الدمبلز بحركة تحكم كاملة دون تأرجح الكتفين.', video: 'M2Nbw9tunoY', anim: { type: 'swing', ox: 66, oy: 45, a1: -5, a2: 75, dur: '1.3s' } },
      { name: 'تجعيد المطرقة', target: 'البايسبس والساعد', sets: '3×12', rest: 50, tip: 'أمسك الدمبل بقبضة محايدة (الإبهام للأعلى) وارفعه بثبات — يبني سمك الذراع والساعد.', video: 'BRVDS6HVR9Q', anim: { type: 'swing', ox: 66, oy: 45, a1: -5, a2: 75, dur: '1.3s' } },
    ],
  },
  {
    key: 'legs', num: '03', title: 'أرجل', full: 'يوم الأرجل', muscles: 'الفخذ الأمامي والخلفي · المؤخرة · السمانة', duration: '36 دقيقة',
    warmup: 'قرفصاء بدون وزن 15 مرة، طعنات متأرجحة بدون وزن 10 لكل رجل، دوران الكاحل 15 لكل جهة.',
    cooldown: 'إطالة الفخذ الأمامي واقفًا 30 ثانية لكل رجل، إطالة أوتار الركبة الخلفية جالسًا 30 ثانية.',
    exercises: [
      { name: 'قرفصاء الكوب بالدمبل', target: 'الفخذ الأمامي والمؤخرة', sets: '4×12', rest: 75, tip: 'أمسك الدمبل عموديًا أمام الصدر، وانزل حتى يوازي الفخذ الأرض مع بقاء الصدر مرفوعًا.', video: 'k_EhLGvM8TQ', anim: { type: 'bob', amp: 10, dur: '1.6s' } },
      { name: 'الطعنات المتحركة بالدمبل', target: 'الفخذ والمؤخرة أحاديًا', sets: '3×12 لكل رجل', rest: 70, tip: 'أمسك دمبل بكل يد وخذ خطوة واسعة، وحافظ على الركبة الأمامية فوق الكاحل لا أبعد.', video: 'Pbmj6xPo-Hw', anim: { type: 'bob', amp: 9, dur: '1.7s' } },
      { name: 'الرفعة الرومانية بالدمبل', target: 'أوتار الركبة والمؤخرة', sets: '4×10–12', rest: 75, tip: 'مفصلة عند الورك مع ركبتين شبه مستقيمتين، وأنزل الدمبلز قريبة من الساقين مع ظهر مستقيم تمامًا.', video: '2SHsk9AzdjA', anim: { type: 'bob', amp: -7, dur: '1.6s' } },
      { name: 'القرفصاء البلغارية بالدمبل', target: 'الفخذ أحاديًا', sets: '3×10 لكل رجل', rest: 70, tip: 'ضع القدم الخلفية مرتفعة على كرسي وأمسك دمبل بكل يد، وحافظ على الجذع مستقيمًا أثناء النزول.', video: 'DeCnHqrN22U', anim: { type: 'bob', amp: 8, dur: '1.7s' } },
      { name: 'رفعة السمانة بالدمبل', target: 'السمانة', sets: '4×15–20', rest: 45, tip: 'أمسك الدمبلز بجانبك وارتفع على أطراف الأصابع بأقصى مدى ممكن، وثبّت لثانية في القمة.', video: 'k8ipHzKeAkQ', anim: { type: 'bob', amp: -4, dur: '1s' } },
    ],
  },
  {
    key: 'core', num: '04', title: 'كور', full: 'يوم الكور والقبضة', muscles: 'البطن · الجذع · قبضة اليد', duration: '28 دقيقة',
    warmup: 'دوران الجذع 15 مرة لكل جهة، تعليق حر على العقلة 20 ثانية، تمدد جانبي 10 لكل جهة.',
    cooldown: 'إطالة الكوبرا لأسفل الظهر 30 ثانية، إطالة جانبية للجذع 20 ثانية لكل جهة.',
    exercises: [
      { name: 'رفع الساقين معلقًا على العقلة', target: 'أسفل البطن وقبضة اليد', sets: '3×10–12', rest: 60, tip: 'تعلّق بذراعين مستقيمتين وارفع الساقين حتى الأفقي دون تأرجح الجسم، وانزل ببطء.', video: 'Pr1ieGZ5atk', anim: { type: 'swing', ox: 40, oy: 60, a1: 60, a2: 0, dur: '1.4s' } },
      { name: 'الالتفاف الروسي بالدمبل', target: 'البطن الجانبي (المائلة)', sets: '3×20', rest: 45, tip: 'اجلس بميل خلفي بسيط وارفع القدمين قليلًا، ولفّ الدمبل من جانب لآخر بحركة بطيئة ومتحكمة.', video: 'TfTUk2AjV7g', anim: { type: 'swing', ox: 50, oy: 50, a1: -20, a2: 20, dur: '0.9s' } },
      { name: 'بلانك محمّل بالدمبل', target: 'الجذع العميق', sets: '3×30–40 ثانية', rest: 45, tip: 'ضع دمبل خفيف على أسفل الظهر وحافظ على خط مستقيم من الرأس للكاحل طوال المدة.', video: 'H88Ip-MUWn0', anim: { type: 'pulse', dur: '2.2s' } },
      { name: 'رفع الركبتين معلقًا', target: 'أسفل البطن وقبضة اليد', sets: '3×12–15', rest: 50, tip: 'تعلّق على العقلة وارفع الركبتين نحو الصدر بتحكم كامل دون الاستعانة بتأرجح الجسم.', video: 'BI7wrB3Crsc', anim: { type: 'swing', ox: 40, oy: 60, a1: 50, a2: -10, dur: '1.2s' } },
      { name: 'المشي بالدمبل (Farmer\'s Carry)', target: 'الجذع والقبضة والثبات العام', sets: '3×30–40 متر', rest: 60, tip: 'أمسك دمبلين ثقيلين بجانبيك وامشِ بخطوات ثابتة مع جذع منتصب وأكتاف للخلف — تمرين شامل للثبات.', video: 'y1r9toPQNkM', anim: { type: 'bob', amp: 3, dur: '0.8s' } },
    ],
  },
];

const WEEK = [
  { name: 'السبت', val: 'دفع' }, { name: 'الأحد', val: 'سحب' }, { name: 'الاثنين', val: 'راحة' },
  { name: 'الثلاثاء', val: 'أرجل' }, { name: 'الأربعاء', val: 'كور' }, { name: 'الخميس', val: 'راحة' }, { name: 'الجمعة', val: 'راحة نشطة' },
];
const DAY_KEY_MAP = { 'دفع': 'push', 'سحب': 'pull', 'أرجل': 'legs', 'كور': 'core' };
const todayStr = () => new Date().toISOString().slice(0, 10);
const TOTAL_EX = DAYS.reduce((s, d) => s + d.exercises.length, 0);

/* ============ KINETIC ICON ============ */
function KineIcon({ anim, size = 50 }) {
  const style = {
    '--amp': anim.amp !== undefined ? anim.amp + 'px' : '0px',
    '--dur': anim.dur || '1.6s',
    '--ox': anim.ox !== undefined ? anim.ox + '%' : '50%',
    '--oy': anim.oy !== undefined ? anim.oy + '%' : '50%',
    '--a1': anim.a1 !== undefined ? anim.a1 + 'deg' : '0deg',
    '--a2': anim.a2 !== undefined ? anim.a2 + 'deg' : '0deg',
  };
  return (
    <div className="kine-box" style={{ width: size, height: size }}>
      <svg viewBox="0 0 80 80" width={size} height={size}>
        {anim.type === 'pulse' && <circle className="kine-pulse" style={style} cx="40" cy="40" r="26" fill="none" stroke="var(--data)" strokeWidth="2.5" />}
        <g className={anim.type === 'bob' ? 'kine-bob' : ''} style={anim.type === 'bob' ? style : undefined}>
          <circle cx="40" cy="18" r="7" fill="var(--muted)" />
          <rect x="34" y="25" width="12" height="26" rx="5" fill="var(--muted)" />
          <rect x="22" y="28" width="10" height="6" rx="3" fill="var(--muted)" />
          <rect x="34" y="52" width="6" height="18" rx="3" fill="var(--muted)" />
          <rect x="40" y="52" width="6" height="18" rx="3" fill="var(--muted)" />
          <g className={anim.type === 'swing' ? 'kine-swing' : ''} style={anim.type === 'swing' ? style : undefined}>
            <rect x="46" y="28" width="12" height="6" rx="3" fill="var(--accent)" />
          </g>
        </g>
      </svg>
    </div>
  );
}

/* ============ VIDEO PLAYER ============ */
function VideoBlock({ videoId }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="video-block">
      {!open ? (
        <button className="video-thumb" onClick={() => setOpen(true)} style={{ backgroundImage: `url(https://img.youtube.com/vi/${videoId}/hqdefault.jpg)` }}>
          <span className="video-thumb-overlay">
            <PlayCircle size={34} />
            <span>شاهد الشرح</span>
          </span>
        </button>
      ) : (
        <div className="video-frame-wrap">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1&autoplay=1`}
            title="شرح التمرين"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      )}
    </div>
  );
}

/* ============ APP ============ */
export default function App() {
  const [view, setView] = useState('home'); // home | day
  const [activeDay, setActiveDay] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [progress, setProgress] = useState({});

  useEffect(() => {
    try {
      const raw = localStorage.getItem('wk-progress');
      if (raw) setProgress(JSON.parse(raw));
    } catch (e) {}
    setLoaded(true);
  }, []);

  const persist = (val) => {
    try { localStorage.setItem('wk-progress', JSON.stringify(val)); } catch (e) { console.error(e); }
  };

  const toggleEx = (dayKey, i) => {
    const key = `${todayStr()}-${dayKey}-${i}`;
    const updated = { ...progress, [key]: !progress[key] };
    setProgress(updated);
    persist(updated);
  };

  const dayCompletion = (day, dateStr = todayStr()) => {
    const done = day.exercises.filter((_, i) => progress[`${dateStr}-${day.key}-${i}`]).length;
    return Math.round((done / day.exercises.length) * 100);
  };

  const streak = useMemo(() => {
    let s = 0, d = new Date();
    for (let i = 0; i < 60; i++) {
      const ds = d.toISOString().slice(0, 10);
      const hasAny = Object.keys(progress).some(k => k.startsWith(ds + '-') && progress[k]);
      if (hasAny) s++;
      else if (ds !== todayStr()) break;
      d.setDate(d.getDate() - 1);
    }
    return s;
  }, [progress]);

  const totalDoneToday = useMemo(() => {
    const ds = todayStr();
    return Object.keys(progress).filter(k => k.startsWith(ds + '-') && progress[k]).length;
  }, [progress]);

  const todayWeek = WEEK[(new Date().getDay() + 1) % 7];
  const todayDayKey = DAY_KEY_MAP[todayWeek.val];
  const todayDay = DAYS.find(d => d.key === todayDayKey);

  if (!loaded) return <div className="protocol-root loading-screen"><div className="loader-ring" /></div>;

  return (
    <div className="protocol-root">
      <style>{CSS}</style>

      <header className="app-header">
        <div className="eyebrow"><span className="dot" />البروتوكول</div>
        <h1>برنامج تمارين منزلي <span>دمبل وعقلة فقط</span></h1>
        <div className="pulse-box"><svg viewBox="0 0 340 40" preserveAspectRatio="none"><path className="pulse-path" d="M0,20 L40,20 L52,4 L64,36 L76,20 L110,20 L122,10 L134,30 L146,20 L340,20" /></svg></div>
        <div className="hstats">
          <div className="hchip"><Flame size={13} color="var(--accent)" /><b>{streak}</b>يوم متتالي</div>
          <div className="hchip"><Target size={13} color="var(--data)" /><b>{totalDoneToday}</b>تمرين اليوم</div>
          <div className="hchip"><ListChecks size={13} color="var(--success)" /><b>{TOTAL_EX}</b>تمرين إجمالي</div>
        </div>
      </header>

      {view === 'home' && (
        <main className="content fade-in">
          <div className="today-hero" onClick={() => { if (todayDay) { setActiveDay(DAYS.findIndex(d => d.key === todayDay.key)); setView('day'); } }}>
            {todayDay ? (
              <>
                <div className="today-hero-top">
                  <span className="today-label">تمرين اليوم</span>
                  <span className="today-pct">{dayCompletion(todayDay)}%</span>
                </div>
                <div className="today-hero-name">{todayDay.full}</div>
                <div className="today-hero-muscles">{todayDay.muscles} · {todayDay.duration}</div>
                <div className="today-hero-bar"><div style={{ width: `${dayCompletion(todayDay)}%` }} /></div>
                <div className="today-hero-cta">ابدأ التمرين <ChevronLeft size={15} /></div>
              </>
            ) : (
              <div className="today-hero-rest">يوم راحة اليوم — استعد لجدولك الأسبوعي.</div>
            )}
          </div>

          <div className="section-label">الأيام التدريبية</div>
          <div className="day-grid">
            {DAYS.map((d, i) => (
              <div className="day-card" key={d.key} onClick={() => { setActiveDay(i); setView('day'); }}>
                <div className="day-card-top">
                  <span className="dc-num">DAY {d.num}</span>
                  <span className="dc-pct">{dayCompletion(d)}%</span>
                </div>
                <div className="dc-title">{d.title}</div>
                <div className="dc-muscles">{d.muscles}</div>
                <div className="dc-bar"><div style={{ width: `${dayCompletion(d)}%` }} /></div>
                <div className="dc-meta"><Clock size={11} /> {d.duration} · {d.exercises.length} تمارين</div>
              </div>
            ))}
          </div>

          <div className="section-label">الجدول الأسبوعي</div>
          <div className="week-strip">
            {WEEK.map((w, i) => (
              <div key={i} className={'wd' + (DAY_KEY_MAP[w.val] ? ' on' : '')}>
                <div className="wd-name">{w.name}</div>
                <div className="wd-val">{w.val}</div>
              </div>
            ))}
          </div>
        </main>
      )}

      {view === 'day' && (
        <main className="content fade-in">
          <button className="back-btn" onClick={() => setView('home')}><ChevronLeft size={15} style={{ transform: 'rotate(180deg)' }} /> رجوع للرئيسية</button>

          <div className="day-tabs">
            {DAYS.map((d, i) => (
              <div key={d.key} className={'day-tab' + (i === activeDay ? ' active' : '')} onClick={() => setActiveDay(i)}>
                <div className="n">DAY {d.num}</div><div className="t">{d.title}</div>
              </div>
            ))}
          </div>

          <WorkoutPanel day={DAYS[activeDay]} progress={progress} onToggle={toggleEx} pct={dayCompletion(DAYS[activeDay])} />
        </main>
      )}
    </div>
  );
}

function WorkoutPanel({ day, progress, onToggle, pct }) {
  const circ = 2 * Math.PI * 24;
  return (
    <div className="panel">
      <div className="panel-head">
        <div><h2>{day.full}</h2><div className="muscles">{day.muscles} · {day.duration}</div></div>
        <div className="gauge">
          <svg width="58" height="58" viewBox="0 0 58 58">
            <circle cx="29" cy="29" r="24" stroke="var(--surface-2)" strokeWidth="5" fill="none" />
            <circle cx="29" cy="29" r="24" stroke="var(--data)" strokeWidth="5" fill="none" strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={circ - (circ * pct) / 100} transform="rotate(-90 29 29)" />
          </svg>
          <span>{pct}%</span>
        </div>
      </div>

      <details className="section-card"><summary>الإحماء قبل البدء</summary><p>{day.warmup}</p></details>

      <div className="ex-list">
        {day.exercises.map((ex, i) => {
          const done = !!progress[`${todayStr()}-${day.key}-${i}`];
          return (
            <div className={'ex' + (done ? ' done' : '')} key={i}>
              <div className="ex-top">
                <KineIcon anim={ex.anim} />
                <div className="ex-mid">
                  <div className="ex-name">{ex.name}</div>
                  <div className="ex-target">{ex.target}</div>
                </div>
                <button className="ex-check" onClick={() => onToggle(day.key, i)}>{done ? <Check size={16} /> : ''}</button>
              </div>
              <div className="ex-row2">
                <div className="ex-reps">{ex.sets}</div>
                <RestBtn seconds={ex.rest} />
              </div>
              <div className="ex-tip">{ex.tip}</div>
              <VideoBlock videoId={ex.video} />
            </div>
          );
        })}
      </div>

      <details className="section-card" style={{ marginTop: 14 }}><summary>التهدئة بعد الانتهاء</summary><p>{day.cooldown}</p></details>
    </div>
  );
}

function RestBtn({ seconds }) {
  const [left, setLeft] = useState(null);
  useEffect(() => {
    if (left === null) return;
    if (left <= 0) { setLeft(null); return; }
    const t = setTimeout(() => setLeft(left - 1), 1000);
    return () => clearTimeout(t);
  }, [left]);
  return (
    <button className={'rest-btn' + (left !== null ? ' active' : '')} disabled={left !== null} onClick={() => setLeft(seconds)}>
      {left !== null ? `${left} ث متبقية` : `⏱ راحة ${seconds} ث`}
    </button>
  );
}

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cairo:wght@500;700;800;900&family=Tajawal:wght@400;500;700&family=JetBrains+Mono:wght@500;700&display=swap');
.protocol-root{
  --bg:#12141a; --surface:#1b1e26; --surface-2:#232732; --line:#2b2f3b;
  --text:#f3f4f6; --muted:#8b90a0; --accent:#ff5a36; --accent-dim:#3a2119; --data:#4fd1c5; --data-dim:#173330; --success:#39ff88;
  font-family:'Tajawal',sans-serif; color:var(--text); background:radial-gradient(circle at 20% 0%, #1a1d26 0%, var(--bg) 45%, #0d0e12 100%);
  direction:rtl; border-radius:20px; min-height:100%; max-width:660px; margin:0 auto; overflow:hidden;
  box-shadow:0 30px 80px -30px rgba(0,0,0,.6);
}
.protocol-root *{box-sizing:border-box;}
.loading-screen{display:flex;align-items:center;justify-content:center;height:320px;}
.loader-ring{width:34px;height:34px;border-radius:50%;border:3px solid var(--surface-2);border-top-color:var(--accent);animation:spin 0.8s linear infinite;}
@keyframes spin{to{transform:rotate(360deg);}}
.fade-in{animation:fadeIn .35s ease;}
@keyframes fadeIn{from{opacity:0;transform:translateY(6px);}to{opacity:1;transform:translateY(0);}}
@media (prefers-reduced-motion:reduce){.protocol-root *{animation-duration:.001ms !important;}}

.app-header{padding:26px 22px 18px;border-bottom:1px solid var(--line);background:linear-gradient(160deg,#1d2029,#15171d);position:relative;}
.app-header::after{content:"";position:absolute;inset:0;background:radial-gradient(circle at 90% -10%, rgba(255,90,54,.12), transparent 60%);pointer-events:none;}
.eyebrow{font-family:'JetBrains Mono',monospace;color:var(--data);font-size:11px;letter-spacing:2px;display:flex;align-items:center;gap:7px;text-transform:uppercase;}
.eyebrow .dot{width:6px;height:6px;border-radius:50%;background:var(--success);animation:blink 1.6s infinite;}
@keyframes blink{0%,100%{opacity:1;}50%{opacity:.25;}}
.app-header h1{font-family:'Cairo',sans-serif;font-weight:900;font-size:24px;margin:10px 0 10px;line-height:1.3;}
.app-header h1 span{color:var(--accent);display:block;font-size:14px;font-weight:700;margin-top:3px;}
.pulse-box{height:30px;}
.pulse-box svg{width:100%;height:100%;}
.pulse-path{stroke:var(--data);stroke-width:2;fill:none;stroke-dasharray:340;stroke-dashoffset:340;animation:draw 3.2s linear infinite;}
@keyframes draw{to{stroke-dashoffset:-340;}}
.hstats{display:flex;gap:8px;margin-top:14px;flex-wrap:wrap;}
.hchip{font-family:'JetBrains Mono',monospace;background:var(--surface-2);border:1px solid var(--line);border-radius:9px;padding:7px 11px;font-size:11px;display:flex;align-items:center;gap:6px;}
.hchip b{font-size:13px;}

.content{padding:18px;}

.today-hero{background:linear-gradient(155deg,var(--accent-dim),var(--surface));border:1px solid var(--line);border-radius:18px;padding:20px;cursor:pointer;transition:.2s;position:relative;overflow:hidden;}
.today-hero:hover{border-color:var(--accent);transform:translateY(-1px);}
.today-hero-top{display:flex;justify-content:space-between;align-items:center;}
.today-label{font-family:'JetBrains Mono',monospace;font-size:11px;color:var(--accent);letter-spacing:1px;}
.today-pct{font-family:'JetBrains Mono',monospace;font-size:13px;color:var(--data);font-weight:700;}
.today-hero-name{font-family:'Cairo',sans-serif;font-weight:900;font-size:22px;margin:8px 0 4px;}
.today-hero-muscles{color:var(--muted);font-size:12.5px;}
.today-hero-bar{height:6px;background:var(--surface-2);border-radius:4px;margin:14px 0 12px;overflow:hidden;}
.today-hero-bar div{height:100%;background:linear-gradient(90deg,var(--accent),#ff8a5c);border-radius:4px;transition:width .4s;}
.today-hero-cta{display:flex;align-items:center;gap:4px;font-family:'Cairo',sans-serif;font-weight:700;font-size:13px;color:var(--accent);}
.today-hero-rest{color:var(--muted);font-size:13.5px;padding:6px 0;}

.section-label{font-family:'Cairo',sans-serif;font-weight:800;font-size:14px;color:var(--muted);margin:24px 4px 12px;letter-spacing:.3px;}

.day-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;}
.day-card{background:var(--surface);border:1px solid var(--line);border-radius:16px;padding:14px;cursor:pointer;transition:.2s;}
.day-card:hover{border-color:var(--data);transform:translateY(-2px);}
.day-card-top{display:flex;justify-content:space-between;align-items:center;}
.dc-num{font-family:'JetBrains Mono',monospace;font-size:10px;color:var(--muted);}
.dc-pct{font-family:'JetBrains Mono',monospace;font-size:11px;color:var(--data);font-weight:700;}
.dc-title{font-family:'Cairo',sans-serif;font-weight:800;font-size:17px;margin:6px 0 4px;}
.dc-muscles{color:var(--muted);font-size:10.5px;line-height:1.5;min-height:30px;}
.dc-bar{height:4px;background:var(--surface-2);border-radius:3px;margin:10px 0 8px;overflow:hidden;}
.dc-bar div{height:100%;background:var(--data);border-radius:3px;}
.dc-meta{font-size:10.5px;color:var(--muted);display:flex;align-items:center;gap:4px;}

.week-strip{display:grid;grid-template-columns:repeat(7,1fr);gap:6px;}
.wd{background:var(--surface);border:1px solid var(--line);border-radius:11px;padding:10px 3px;text-align:center;}
.wd.on{border-color:var(--accent);background:var(--accent-dim);}
.wd-name{font-size:9.5px;color:var(--muted);}
.wd-val{font-family:'Cairo',sans-serif;font-weight:800;font-size:11px;margin-top:4px;}
.wd.on .wd-val{color:var(--accent);}

.back-btn{display:flex;align-items:center;gap:4px;background:none;border:none;color:var(--muted);font-family:'Tajawal',sans-serif;font-size:12.5px;cursor:pointer;margin-bottom:14px;padding:0;}
.back-btn:hover{color:var(--text);}

.day-tabs{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-bottom:16px;}
.day-tab{background:var(--surface);border:1px solid var(--line);border-radius:12px;padding:10px 6px;text-align:center;cursor:pointer;transition:.2s;}
.day-tab:hover{border-color:var(--accent);}
.day-tab .n{font-family:'JetBrains Mono',monospace;color:var(--muted);font-size:10px;}
.day-tab .t{font-family:'Cairo',sans-serif;font-weight:800;font-size:13px;margin-top:3px;}
.day-tab.active{border-color:var(--accent);background:var(--accent-dim);}
.day-tab.active .n{color:var(--accent);}

.panel{background:var(--surface);border:1px solid var(--line);border-radius:18px;padding:18px;}
.panel-head{display:flex;justify-content:space-between;align-items:flex-start;gap:14px;margin-bottom:16px;}
.panel-head h2{font-family:'Cairo',sans-serif;font-weight:900;font-size:20px;margin:0 0 4px;}
.muscles{color:var(--muted);font-size:12px;}
.gauge{position:relative;width:58px;height:58px;flex-shrink:0;}
.gauge span{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-family:'JetBrains Mono',monospace;font-size:11px;font-weight:700;}

.section-card{background:var(--surface-2);border:1px solid var(--line);border-radius:12px;padding:12px 14px;margin-bottom:14px;}
.section-card summary{cursor:pointer;font-family:'Cairo',sans-serif;font-weight:700;font-size:13px;color:var(--data);list-style:none;}
.section-card summary::-webkit-details-marker{display:none;}
.section-card p{color:var(--muted);font-size:12.5px;line-height:1.8;margin:8px 0 0;}

.ex-list{display:flex;flex-direction:column;gap:12px;}
.ex{background:var(--surface-2);border:1px solid var(--line);border-radius:14px;padding:14px;transition:.2s;}
.ex.done{border-color:var(--success);background:linear-gradient(160deg,#12241c,var(--surface-2));}
.ex-top{display:flex;align-items:center;gap:12px;}
.kine-box{flex-shrink:0;background:var(--surface);border-radius:10px;}
.ex-mid{flex:1;min-width:0;}
.ex-name{font-family:'Cairo',sans-serif;font-weight:800;font-size:14.5px;}
.ex-target{color:var(--muted);font-size:11px;margin-top:2px;}
.ex-check{width:28px;height:28px;border-radius:8px;border:2px solid var(--line);background:transparent;color:var(--success);cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
.ex.done .ex-check{border-color:var(--success);}
.ex-row2{display:flex;justify-content:space-between;align-items:center;margin-top:10px;}
.ex-reps{font-family:'JetBrains Mono',monospace;font-weight:700;color:var(--accent);font-size:13.5px;}
.rest-btn{font-family:'JetBrains Mono',monospace;font-size:11px;background:var(--surface);border:1px solid var(--line);color:var(--muted);border-radius:8px;padding:5px 10px;cursor:pointer;}
.rest-btn.active{color:var(--data);border-color:var(--data);}
.ex-tip{color:var(--muted);font-size:12px;line-height:1.7;border-right:2px solid var(--data);padding-right:9px;margin-top:10px;}

.video-block{margin-top:12px;}
.video-thumb{width:100%;aspect-ratio:16/9;border-radius:12px;border:1px solid var(--line);background-size:cover;background-position:center;position:relative;cursor:pointer;overflow:hidden;padding:0;}
.video-thumb-overlay{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;background:linear-gradient(180deg,rgba(18,20,26,.35),rgba(18,20,26,.75));color:#fff;font-family:'Cairo',sans-serif;font-weight:700;font-size:12.5px;transition:.2s;}
.video-thumb:hover .video-thumb-overlay{background:linear-gradient(180deg,rgba(18,20,26,.2),rgba(18,20,26,.65));}
.video-frame-wrap{position:relative;width:100%;aspect-ratio:16/9;border-radius:12px;overflow:hidden;border:1px solid var(--line);}
.video-frame-wrap iframe{position:absolute;inset:0;width:100%;height:100%;border:0;}

.kine-bob{animation:kineBob var(--dur) ease-in-out infinite;}
@keyframes kineBob{0%,100%{transform:translateY(0);}50%{transform:translateY(var(--amp));}}
.kine-swing{animation:kineSwing var(--dur) ease-in-out infinite;transform-box:fill-box;transform-origin:var(--ox) var(--oy);}
@keyframes kineSwing{0%,100%{transform:rotate(var(--a1));}50%{transform:rotate(var(--a2));}}
.kine-pulse{animation:kinePulse var(--dur) ease-in-out infinite;transform-box:fill-box;transform-origin:center;}
@keyframes kinePulse{0%,100%{opacity:.25;transform:scale(1);}50%{opacity:.7;transform:scale(1.15);}}

@media (max-width:420px){ .day-grid{grid-template-columns:1fr;} }
`;
