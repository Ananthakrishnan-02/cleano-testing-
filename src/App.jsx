import { useState } from "react";

/* ---- EDIT THESE ---- */
const PHONE = "91XXXXXXXXXX";        // WhatsApp number, country code first, no +
const PHONE_DISPLAY = "+91 XXXXX XXXXX";
const EMAIL = "hello@yourdomain.com";
const LOGO_SRC = "";                  // paste your logo URL or data: URI (optional)
/* -------------------- */

const wa = (t) => "https://wa.me/" + PHONE + "?text=" + encodeURIComponent(t);
const HI = "Hi Cleano, I would like a deep cleaning quote.";

const SERVICES = [
  ["Full home deep cleaning","Floors, fans, windows, walls, cabinets and every hidden corner."],
  ["Kitchen cleaning","Chimney, tiles, cabinets and appliances, fully degreased."],
  ["Bathroom cleaning","Stains, limescale and grout scrubbed, then sanitised."],
  ["Sofa & carpet shampooing","Deep extraction for dirt, odour and allergens."],
  ["Water tank cleaning","Overhead and underground tanks, cleaned hygienically."],
  ["Post-construction cleaning","Dust, paint and cement marks cleared before you move in."],
  ["Office deep cleaning","Desks, pantry, washrooms and floors, scheduled around your hours."],
  ["Move-in / move-out","Leave it spotless, or start fresh in your new place."],
];
const WHY = [
  ["Clean spaces","We work from a detailed checklist, so nothing gets skipped, from ceiling fans to skirting boards."],
  ["Fresh environment","Safe, eco-conscious products that are gentle on your family and pets."],
  ["Happy you","Crews who turn up on time, and a quote you understand before we start."],
];
const STEPS = [
  ["Enquire","Send us your service and property details by form or WhatsApp."],
  ["Get a quote","We reply with a clear price and available slots."],
  ["We clean","Our crew arrives on time with their own equipment."],
  ["Walk through","Check the work with us before we leave."],
];
const FAQ = [
  ["How do I get a quote?","Fill in the form or message us on WhatsApp with the service and property size. We’ll reply with a price and available slots."],
  ["Do I need to provide any equipment?","No. The crew brings professional equipment and cleaning products."],
  ["Is it safe for children and pets?","We use eco-conscious products. If anyone at home has allergies, tell us and we’ll plan around it."],
  ["Which areas do you cover?","Trivandrum and nearby. Send us your location and we’ll confirm."],
];

function Header(){
  const [open,setOpen] = useState(false);
  const c = ()=>setOpen(false);
  return (
    <header><div className="wrap nav">
      <a className="logo" href="#top">{LOGO_SRC ? <img src={LOGO_SRC} alt="Cleano Cleaning Service"/> : <>Clean<b>o</b></>}</a>
      <button className="burger" aria-label="Menu" onClick={()=>setOpen(!open)}>{open?"✕":"☰"}</button>
      <nav className={"links"+(open?" open":"")}>
        <a href="#services" onClick={c}>Services</a><a href="#how" onClick={c}>How it works</a>
        <a href="#faq" onClick={c}>FAQ</a><a className="btn" href="#enquire" onClick={c}>Get a quote</a>
      </nav>
    </div></header>
  );
}

function Hero(){
  const [f,setF] = useState({n:"",p:"",s:"Full home deep cleaning",a:""});
  const set = k => e => setF({...f,[k]:e.target.value});
  const submit = e => { e.preventDefault();
    window.open(wa("Hi Cleano! I’m "+f.n+" ("+f.p+"). I need: "+f.s+". Area/size: "+f.a),"_blank"); };
  return (
    <div className="hero" id="top"><div className="wrap">
      <div>
        <h1>A deep clean that you can <span>see and smell.</span></h1>
        <p className="lead">Cleano sends trained crews with professional equipment to homes and offices across Trivandrum.</p>
        <div className="row">
          <a className="btn" href="#enquire">Get a free quote</a>
          <a className="btn line" href={wa(HI)} target="_blank" rel="noopener">WhatsApp us</a>
        </div>
        <p className="areas"><b>Serving Trivandrum.</b> Tell us your area and property size in the form and we’ll confirm availability.</p>
      </div>
      <form className="form" id="enquire" onSubmit={submit}>
        <h3>Get a free quote</h3><p>We’ll reply on WhatsApp.</p>
        <label htmlFor="n">Name</label><input id="n" required value={f.n} onChange={set("n")}/>
        <label htmlFor="p">Phone</label><input id="p" required inputMode="tel" placeholder="+91" value={f.p} onChange={set("p")}/>
        <label htmlFor="s">Service</label>
        <select id="s" value={f.s} onChange={set("s")}>
          {["Full home deep cleaning","Kitchen deep cleaning","Bathroom deep cleaning","Sofa & carpet shampooing","Water tank cleaning","Post-construction cleaning","Office deep cleaning","Move-in / move-out cleaning"].map(o=><option key={o}>{o}</option>)}
        </select>
        <label htmlFor="a">Area and property size</label><input id="a" placeholder="e.g. Kowdiar, 3 BHK" value={f.a} onChange={set("a")}/>
        <button className="btn" type="submit">Send on WhatsApp</button>
      </form>
    </div></div>
  );
}

const Services = () => (
  <section id="services"><div className="wrap">
    <h2>What we clean</h2><p className="intro">One bathroom or a whole villa. Pick a service and ask for a quote.</p>
    <ul className="svc">{SERVICES.map(([t,d],i)=>(
      <li key={t}><a href="#enquire"><em>{String(i+1).padStart(2,"0")}</em><h3>{t}</h3><p>{d}</p><i>→</i></a></li>))}
    </ul>
  </div></section>
);

const Why = () => (
  <section><div className="wrap">
    <h2>Clean spaces. Fresh environment. Happy you.</h2><p className="intro">That’s our name’s promise, and how we run every job.</p>
    <div className="cols3">{WHY.map(([t,d])=><div key={t}><h3>{t}</h3><p>{d}</p></div>)}</div>
  </div></section>
);

const How = () => (
  <section id="how"><div className="wrap">
    <h2>How it works</h2><p className="intro">Four steps, and the first takes a minute.</p>
    <div className="steps">{STEPS.map(([t,d])=><div key={t}><h3>{t}</h3><p>{d}</p></div>)}</div>
  </div></section>
);

const Review = () => (
  <section><div className="wrap"><div className="quote">
    <div><blockquote>“Add a real review from one of your customers here.”</blockquote><small>Customer name, area</small></div>
    <p>Placeholder: replace with a genuine review from a customer you’ve worked with, ideally with their first name and area.</p>
  </div></div></section>
);

const Faq = () => (
  <section id="faq"><div className="wrap">
    <h2>Questions</h2><p className="intro">The ones we hear most.</p>
    <div className="faqbox">{FAQ.map(([q,a],i)=>(
      <details key={q} open={i===0}><summary>{q}</summary><p>{a}</p></details>))}
    </div>
  </div></section>
);

const Cta = () => (
  <section className="cta"><div className="wrap">
    <h2>Tell us what needs cleaning. We’ll send a quote.</h2>
    <a className="btn" href={wa(HI)} target="_blank" rel="noopener">Chat on WhatsApp</a>
  </div></section>
);

const Footer = () => (
  <footer><div className="wrap">
    <div className="fcols">
      <div><h4>Cleano Cleaning Service</h4>Clean spaces. Fresh environment. Happy you.<br/>Trivandrum, Kerala</div>
      <div><h4>Services</h4><a href="#services">Home deep cleaning</a><a href="#services">Kitchen & bathroom</a><a href="#services">Sofa & carpet</a><a href="#services">Water tank</a></div>
      <div><h4>Company</h4><a href="#how">How it works</a><a href="#faq">FAQ</a><a href="#enquire">Get a quote</a></div>
      <div><h4>Contact</h4>Phone: {PHONE_DISPLAY}<br/>Email: {EMAIL}</div>
    </div>
    <div className="copy">© 2026 Cleano Cleaning Service. All rights reserved.</div>
  </div></footer>
);

const App = () => (<>
  <Header/><Hero/><Services/><Why/><How/><Review/><Faq/><Cta/><Footer/>
  <a className="wa" href={wa(HI)} target="_blank" rel="noopener">WhatsApp</a>
</>);

export default App;
