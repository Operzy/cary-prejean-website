import React, { useEffect, useRef, useState, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Play, ChevronRight, BarChart, Settings, Compass, Quote, ArrowUpRight, XCircle, CheckCircle2, ArrowLeft, X, ArrowRight, LayoutDashboard, Copy, Check } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const PHONE_NUMBER = "(225) 931-7453";

// ------------------------------
// SHARED COMPONENTS
// ------------------------------

const NoiseOverlay = () => (
  <svg className="noise-overlay" xmlns="http://www.w3.org/2000/svg">
    <filter id="noise">
      <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
    </filter>
    <rect width="100%" height="100%" filter="url(#noise)" />
  </svg>
);

const SectionHeading = ({ pre, title, titleDrama, align = "left", dark = false }) => (
  <div className={`mb-12 md:mb-16 ${align === 'center' ? 'text-center mx-auto' : ''}`}>
    {pre && <div className={`font-mono text-xs uppercase tracking-widest ${dark ? 'text-accentLight' : 'text-accent'} mb-4 font-bold`}>{pre}</div>}
    <h2 className={`text-4xl md:text-5xl lg:text-6xl font-sans tracking-tight ${dark ? 'text-white' : 'text-textMain'} leading-[1.1]`}>
      {title} <br className="hidden md:block"/> <span className={`font-drama italic font-medium ${dark ? 'text-white/80' : 'text-accent'}`}>{titleDrama}</span>
    </h2>
  </div>
);

const TestimonialsSection = ({ disableAnimation = false }) => {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    if (disableAnimation) {
      ScrollTrigger.refresh();
      return;
    }
    let ctx = gsap.context(() => {
      gsap.from('.test-card', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
        },
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out'
      });
    }, containerRef);
    return () => ctx.revert();
  }, [disableAnimation]);

  const testimonials = [
    {
      text: "Both my partner and I are pretty educated, but we found somebody who was a lot smarter than us... He became a trusted finance advisor, tax planner, much better than our CPA. Need somebody you can trust. So he's the guy for that.",
      author: "Elena Volnova",
      title: "Co-Founder at Petstore Direct, LLC"
    },
    {
      text: "I was looking for a fractional CFO. What I got was much more than that... Through our passionate conversations, they always progressed and made us move with courage as we certainly began to trust him more and more.",
      author: "Domenico Ponti",
      title: "Co-Founder, Partners Plus, LLC"
    },
    {
      text: "The issue I was having was getting an outsourced accounting firm under control. He made the process seamless. I picked up the phone, called Cary, and ten days later I knew who was coming in. He's instrumental.",
      author: "Elena Volnova",
      title: "Co-Founder at Petstore Direct, LLC"
    }
  ];

  return (
    <section ref={containerRef} className="py-20 px-6 bg-background relative border-t border-borderLight/50">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div key={i} className={`test-card group relative p-8 rounded-[2rem] bg-surface border border-borderLight flex flex-col justify-between hover:shadow-xl hover:border-accent/20 transition-all duration-500 overflow-hidden ${disableAnimation ? 'opacity-100 translate-y-0' : ''}`}>
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div>
                <Quote className="w-8 h-8 text-accent/20 mb-6 group-hover:text-accent/60 transition-colors" />
                <p className="text-textMain font-sans leading-relaxed mb-8 flex-1 text-sm md:text-base font-medium">"{t.text}"</p>
              </div>
              <div className="border-t border-borderLight/60 pt-6 mt-4">
                <p className="font-mono text-xs text-textMain font-bold tracking-tight">{t.author}</p>
                <p className="text-[10px] text-textMuted mt-1 uppercase tracking-widest">{t.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="py-16 border-t border-borderLight bg-primary text-center">
    <div className="max-w-6xl mx-auto px-6">
      <div className="flex flex-wrap justify-center gap-6 md:gap-10 mb-12">
        {['Home', 'Free Training', 'Profit Acceleration', 'Our Mission', 'Books', 'Testimonials'].map((link) => (
          <button key={link} className="text-white/60 hover:text-white font-sans text-sm font-medium transition-colors">
            {link}
          </button>
        ))}
      </div>
      <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full bg-white/10 border border-white/20">
        <div className="w-2 h-2 rounded-full bg-accentLight animate-pulse" />
        <span className="font-mono text-xs uppercase tracking-widest text-white/90 font-bold">System Operational</span>
      </div>
      <p className="font-mono text-xs text-white/40 tracking-tight block">
        &copy; {new Date().getFullYear()} Strategic Business Advisors, LLC. All rights reserved.
      </p>
    </div>
  </footer>
);

// ------------------------------
// MODAL & FUNNEL VIEWS
// ------------------------------

const QualifierModal = ({ isOpen, onClose, onComplete }) => {
  const [step, setStep] = useState(1);
  const modalRef = useRef(null);
  
  useEffect(() => {
    if (isOpen) {
      gsap.fromTo(modalRef.current, 
        { scale: 0.95, opacity: 0, y: 20 },
        { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }
      );
    } else {
      setTimeout(() => setStep(1), 400); 
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const nextStep = () => { if (step < 4) setStep(step + 1); };

  const OptionBtn = ({ label }) => (
    <button onClick={nextStep} className="w-full text-left p-5 rounded-2xl border border-borderLight hover:border-accent bg-surface hover:bg-surfaceHover transition-all flex items-center justify-between group">
      <span className="font-sans font-medium text-textMain group-hover:text-accent transition-colors">{label}</span>
      <ChevronRight className="w-5 h-5 text-textMuted group-hover:text-accent group-hover:translate-x-1 transition-all" />
    </button>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-primary/80 backdrop-blur-md" onClick={onClose} />
      <div ref={modalRef} className="relative w-full max-w-lg bg-background rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-borderLight">
        <div className="bg-surface px-6 py-4 flex items-center justify-between border-b border-borderLight z-10">
          <div className="flex items-center gap-2">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-white text-xs font-mono">{step}</span>
            <span className="text-xs font-mono uppercase tracking-widest text-textMuted font-bold">of 4</span>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-surfaceHover rounded-full transition-colors text-textMuted">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="w-full h-1 bg-borderLight">
          <div className="h-full bg-accent transition-all duration-300" style={{ width: `${(step / 4) * 100}%` }} />
        </div>
        <div className="p-8 relative">
          {step === 1 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500">
              <h3 className="text-2xl font-sans font-bold text-textMain mb-2">What is your current monthly revenue?</h3>
              <p className="text-sm text-textMuted mb-6">This helps us customize our strategic approach.</p>
              <div className="space-y-3">
                <OptionBtn label="Under $10k / month" />
                <OptionBtn label="$10k - $50k / month" />
                <OptionBtn label="Over $50k / month" />
              </div>
            </div>
          )}
          {step === 2 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500">
              <button onClick={() => setStep(step - 1)} className="text-accent flex items-center gap-1 text-sm font-medium mb-4 hover:underline">
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <h3 className="text-2xl font-sans font-bold text-textMain mb-2">What is your biggest bottleneck right now?</h3>
              <p className="text-sm text-textMuted mb-6">Select the area that causes the most pain.</p>
              <div className="space-y-3">
                <OptionBtn label="Poor Cash Flow & Margins" />
                <OptionBtn label="Lack of Systems & Processes" />
                <OptionBtn label="Burnout & No Time" />
                <OptionBtn label="Hiring & Retention" />
              </div>
            </div>
          )}
          {step === 3 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500">
              <button onClick={() => setStep(step - 1)} className="text-accent flex items-center gap-1 text-sm font-medium mb-4 hover:underline">
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <h3 className="text-2xl font-sans font-bold text-textMain mb-2">Are you ready to invest resources to get to the next level?</h3>
              <p className="text-sm text-textMuted mb-6">Our frameworks require active implementation.</p>
              <div className="space-y-3">
                <OptionBtn label="Yes, I am ready to scale." />
                <OptionBtn label="No, just looking around." />
              </div>
            </div>
          )}
          {step === 4 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500">
              <button onClick={() => setStep(step - 1)} className="text-accent flex items-center gap-1 text-sm font-medium mb-4 hover:underline">
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <h3 className="text-2xl font-sans font-bold text-textMain mb-2">Last step. Where should we send your info?</h3>
              <p className="text-sm text-textMuted mb-6">Enter your best details below to proceed to the booking page.</p>
              <form onSubmit={(e) => { e.preventDefault(); onComplete(); }} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono text-textMuted uppercase mb-1">Full Name</label>
                  <input type="text" required className="w-full bg-surface border border-borderLight rounded-xl px-4 py-3 text-textMain focus:outline-none focus:border-accent transition-colors" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-xs font-mono text-textMuted uppercase mb-1">Email Address</label>
                  <input type="email" required className="w-full bg-surface border border-borderLight rounded-xl px-4 py-3 text-textMain focus:outline-none focus:border-accent transition-colors" placeholder="john@example.com" />
                </div>
                <div>
                  <label className="block text-xs font-mono text-textMuted uppercase mb-1">Phone Number</label>
                  <input type="tel" required className="w-full bg-surface border border-borderLight rounded-xl px-4 py-3 text-textMain focus:outline-none focus:border-accent transition-colors" placeholder="(555) 555-5555" />
                </div>
                <button type="submit" className="magnetic-btn w-full mt-4 group relative flex items-center justify-center px-6 py-4 bg-primary text-white rounded-xl font-sans text-base font-bold tracking-wide shadow-md hover:bg-accent transition-colors duration-300">
                  <span className="relative z-10 flex items-center gap-2">Submit & Book Call <ArrowUpRight className="w-4 h-4" /></span>
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const BookingPage = ({ setView }) => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen bg-background relative flex flex-col justify-between">
      <NoiseOverlay />
      <div className="absolute top-0 left-0 w-full h-[400px] bg-gradient-to-b from-accent/5 to-transparent pointer-events-none -z-10" />
      
      <div className="pt-10 px-6 flex-1">
        <div className="max-w-5xl mx-auto">
          <button onClick={() => setView('funnel')} className="mb-10 text-accent flex items-center gap-2 text-sm font-medium hover:underline bg-white px-4 py-2 rounded-full shadow-sm border border-borderLight inline-flex">
            <ArrowLeft className="w-4 h-4" /> Back to Website
          </button>

          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-50 text-green-700 border border-green-200 rounded-full text-xs font-mono font-bold uppercase tracking-widest mb-6">
              <CheckCircle2 className="w-4 h-4" /> Application Approved
            </div>
            <h1 className="text-4xl md:text-5xl font-sans font-bold text-textMain tracking-tight mb-4">
              Secure Your Strategy Session
            </h1>
            <p className="text-lg text-textMuted max-w-2xl mx-auto">
              Please select a time that works best for you. If you don't find a time that works, reach out to us at cary@strategicbusinessadvisors.org.
            </p>
          </div>

          <div className="w-full max-w-4xl mx-auto bg-white rounded-3xl shadow-xl border border-borderLight p-2 overflow-hidden mb-20 relative z-10">
            <div className="w-full h-[650px] bg-surface flex flex-col items-center justify-center rounded-[1.5rem] border border-dashed border-borderLight/80">
              <div className="w-16 h-16 bg-blue-50 text-accent rounded-full flex items-center justify-center mb-6">
                <Settings className="w-8 h-8 animate-spin-slow" />
              </div>
              <h3 className="text-2xl font-bold text-textMain font-sans mb-2">Loading Scheduling Portal...</h3>
              <p className="text-textMuted font-mono text-sm">(Calendly Embed Placeholder)</p>
            </div>
          </div>
          
          <div className="max-w-4xl mx-auto pt-10">
            <SectionHeading title="Don't just take" titleDrama="our word for it." align="center" />
          </div>
        </div>
      </div>
      
      <TestimonialsSection disableAnimation={true} />
      <Footer />
    </div>
  );
};

// ------------------------------
// ADS DASHBOARD (/ads)
// ------------------------------

const CopyBlock = ({ title, text }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="bg-surface border border-borderLight rounded-2xl p-6 group hover:border-accent/40 transition-colors">
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-mono text-xs uppercase tracking-widest text-textMuted font-bold flex items-center gap-2">
          {title}
        </h4>
        <button onClick={handleCopy} className="text-textMuted hover:text-accent transition-colors flex items-center gap-1 text-xs font-mono bg-background px-2 py-1 rounded">
          {copied ? <Check className="w-3 h-3"/> : <Copy className="w-3 h-3"/>}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <p className="text-textMain font-sans leading-relaxed">"{text}"</p>
    </div>
  );
};

const AdsDashboard = ({ setView }) => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const hooks = [
    "If your business makes over $250k a year but your bank account disagrees, watch this.",
    "Growing a business and starting a business are not the same thing. Here is what your CPA isn't telling you.",
    "Are you running your business, or is it running you? The fractional CFO framework changes everything.",
    "The exact 3-step strategy Trifecta Sports used to stop cash-bleeding and start scaling.",
    "If you're too busy putting out fires to look at your margins, you're losing money.",
    "You don't need platitudes to grow your company. You need actionable financial data.",
    "Stop trying to out-sell bad profit margins. Do this instead.",
    "A standard CPA tells you what happened last year. A Fractional CFO tells you what happens tomorrow.",
    "Loss of freedom. Negative health. Poor cash flow. This isn't what you signed up for when you started.",
    "Here is how a Petstore scaled rapidly once they stopped ignoring their unit economics."
  ];

  const bodies = [
    "Every successful business hits a ceiling where hustle stops working. You start losing good employees, your cash flow tightens, and the stress isolates you. I've coached thousands of small business owners to break through this by implementing what I call 'The Well-Oiled Machine.' First, we set up actionable weekly dashboards. Next, we build playbooks to plug inefficiencies. Finally, we establish strategic planning for the exact future you want.",
    
    "Most business owners are stuck in 'The Reality': always on, extremely stressed, with zero freedom and poor cash flow. They think they just need more sales. But more sales on broken systems just scales the chaos. You need to get to 'The Next Level'. By bringing in a strategic advisor, we take you from reactionary panic to predicting growth. We standardize your margins, increase your ROI, and finally give you back the freedom you started this business to have.",
    
    "When the founders of Petstore Direct came to me, they were dealing with the exact same growing pains you are. They had sales, but their outsourced accounting was out of control and their margins were a mess. Within 10 days of implementing our strategic financial frameworks, they had total clarity. They went from dreading the numbers to knowing exactly what levers to pull to scale predictably."
  ];

  const ctas = [
    "Click below to secure a completely free 30-minute intro call. We'll discuss your specific goals and lay out a roadmap for your next level.",
    "Don't just take my word for it. Click the link to see the exact 3-step formula we use to increase profits and cash flow instantly.",
    "Stop guessing with your margins. Tap the button below, grab a time on my calendar, and let's get your business out of the weeds."
  ];

  // Generate combinations
  const combinedAds = [];
  for (let h of hooks) {
    for (let b of bodies) {
      for (let c of ctas) {
        combinedAds.push({ hook: h, body: b, cta: c });
      }
    }
  }
  
  // Confine to exactly 50 for the presentation
  const presentationAds = combinedAds.slice(0, 50);

  const FullAdCard = ({ ad, index }) => {
    const [copied, setCopied] = useState(false);
    const fullText = `${ad.hook}\n\n${ad.body}\n\n${ad.cta}`;
    
    const handleCopy = () => {
      navigator.clipboard.writeText(fullText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    };

    return (
      <div className="bg-surface border border-borderLight rounded-[1.5rem] p-8 shadow-sm group hover:border-accent/40 hover:shadow-xl transition-all duration-300 flex flex-col h-full relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent/20 to-transparent group-hover:via-accent transition-all duration-500" />
        
        <div className="flex items-center justify-between mb-6 border-b border-borderLight/50 pb-4">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-xs font-mono font-bold">
              {index + 1}
            </span>
            <span className="text-textMain font-bold tracking-tight">Ad Variation</span>
          </div>
          <button onClick={handleCopy} className="text-textMuted hover:text-accent transition-colors flex items-center gap-1 text-[11px] font-mono uppercase tracking-widest bg-background border border-borderLight px-3 py-1.5 rounded-full">
            {copied ? <Check className="w-3 h-3"/> : <Copy className="w-3 h-3"/>}
            {copied ? 'Copied' : 'Copy Full'}
          </button>
        </div>
        
        <div className="space-y-4 flex-1">
          <p className="text-textMain font-bold bg-accent/5 p-3 rounded-xl border border-accent/10">"{ad.hook}"</p>
          <p className="text-textMuted text-sm leading-relaxed">{ad.body}</p>
          <p className="text-primary font-medium text-sm pt-2">{ad.cta}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background relative flex flex-col justify-between">
      <div className="absolute top-0 left-0 w-full h-[400px] bg-primary pointer-events-none" />
      
      <div className="pt-20 px-6 flex-1 z-10 pb-32">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-10 text-white">
            <button onClick={() => setView('funnel')} className="flex items-center gap-2 text-sm font-medium hover:text-accentLight transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to Funnel
            </button>
            <div className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest">
              <LayoutDashboard className="w-4 h-4" /> Internal Dashboard
            </div>
          </div>

          <div className="mb-16">
            <h1 className="text-4xl md:text-6xl font-sans font-bold text-white tracking-tight mb-4">
              The Ad Library
            </h1>
            <p className="text-lg text-white/70 max-w-2xl">
              50 Ready-to-launch ad variations generated using our proprietary modular hook and storytelling matrix. Built specifically for the Strategic Business Advisors offer.
            </p>
          </div>

          {/* Render 50 Unique Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {presentationAds.map((ad, i) => (
              <FullAdCard key={i} ad={ad} index={i} />
            ))}
          </div>

        </div>
      </div>
      <Footer />
    </div>
  );
};


// ------------------------------
// MAIN APP COMPONENT
// ------------------------------

const VslFunnel = ({ setView }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const contrastRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from('.contrast-item', {
        scrollTrigger: {
          trigger: contrastRef.current,
          start: 'top 80%',
        },
        y: 30, opacity: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out'
      });
    }, contrastRef);
    return () => ctx.revert();
  }, []);

  const openModal = (e) => {
    e?.preventDefault();
    setIsModalOpen(true);
  };

  const handleComplete = () => {
    setIsModalOpen(false);
    setView('booking');
  };

  const interactiveRows = [
    { pain: "Loss of freedom", gain: "Regain freedom & recapture dream" },
    { pain: "Loss of good employees", gain: "Retain committed employees" },
    { pain: "Always on, no time to rest", gain: "Navigate growth & make progress" },
    { pain: "Stress, anxiety, isolation", gain: "Improve health & reduce stress" },
    { pain: "Poor cash flow", gain: "Increase cash flow & ROI" },
    { pain: "Negative health impacts", gain: "Get business to the next level" }
  ];

  return (
    <>
      <QualifierModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onComplete={handleComplete} />

      <section className="relative min-h-[100dvh] bg-grid flex flex-col items-center justify-center pt-24 pb-16 px-6 overflow-hidden z-10">
        <div className="absolute top-[10%] left-[20%] w-[500px] h-[500px] bg-accentLight/20 rounded-full blur-[120px] mix-blend-multiply animate-float pointer-events-none -z-10" />

        <div className="max-w-5xl mx-auto w-full flex flex-col items-center text-center relative z-20">
          <div className="hero-anim inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-accent/20 bg-accent/5 backdrop-blur-md shadow-sm mb-10">
            <span className="w-2 h-2 rounded-full bg-accent relative flex items-center justify-center">
               <span className="absolute w-full h-full rounded-full bg-accent animate-ping opacity-75"></span>
            </span>
            <span className="text-xs font-mono tracking-wider text-primary uppercase font-bold">Attention Coaches Doing $10k+/Month</span>
          </div>

          <h1 className="hero-anim text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.05] font-sans font-bold text-textMain mb-6">
            We Build Paid Acquisition Systems In 7 Days That Help Coaches Consistently Generate 10–20+ Qualified Booked Calls Every Month, <br className="hidden lg:block" />
            <span className="font-drama italic text-accent font-medium relative">
               Without Setup Fees, Long Timelines, Or Guesswork.
            </span>
          </h1>

          <p className="hero-anim text-lg md:text-xl text-textMuted font-sans max-w-2xl mx-auto mb-16 leading-relaxed">
            We build reliable client acquisition systems for coaches who want predictable growth without expensive upfront fees, months of waiting, or having to learn and manage ads themselves.
          </p>

          <div className="hero-anim w-full max-w-[1000px] mx-auto mb-12 relative group z-10">
            <div className="video-bezel relative rounded-[2rem] overflow-hidden bg-black aspect-video z-10 w-full h-full">
               <video 
                className="w-full h-full object-cover"
                controls 
                poster="https://strategicbusinessadvisors.org/wp-content/uploads/2026/03/poster_placeholder.jpg"
                src="https://strategicbusinessadvisors.org/wp-content/uploads/2026/03/Cary%20Prejean%20Video%201_V6(1).mp4"
              ></video>
            </div>
          </div>

          <div className="hero-anim">
            <button onClick={openModal} className="magnetic-btn group relative inline-flex items-center justify-center px-12 py-6 bg-accent text-white rounded-full font-sans text-lg font-bold tracking-wide shadow-xl hover:shadow-2xl mb-4 transition-all duration-300 hover:bg-blue-700">
              <span className="relative z-10 flex items-center gap-3">
                Book a 30-Minute Intro Call 
                <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </span>
            </button>
            <p className="text-sm font-mono text-textMuted tracking-tight block">cary@strategicbusinessadvisors.org</p>
          </div>
        </div>
      </section>

      {/* Light Mode Sweep Transformation Section */}
      <section ref={contrastRef} className="py-32 px-6 bg-primary border-t border-primary overflow-hidden relative">
        <div className="max-w-6xl mx-auto relative z-10">
          
          <div className="text-center max-w-4xl mx-auto mb-20 contrast-item">
            <h2 className="text-3xl md:text-5xl font-sans tracking-tight text-white mb-6">
              Starting a business and growing a business <br/> <span className="font-drama italic text-accentLight">are not the same.</span>
            </h2>
            <p className="text-lg text-white/80 font-medium">
              Small business owners often experience significant growing pains. Hover to reveal the Next Level.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 lg:gap-6 max-w-5xl mx-auto contrast-item">
            {interactiveRows.map((row, i) => (
              <div key={i} className="group relative w-full h-24 overflow-hidden rounded-2xl bg-white shadow-md border border-borderLight cursor-crosshair">
                <div className="absolute inset-0 flex items-center px-8 transition-transform duration-500 ease-in-out group-hover:translate-x-[-100%]">
                  <XCircle className="w-6 h-6 text-red-500 shrink-0 mr-4" />
                  <span className="text-lg font-bold font-sans text-textMain">{row.pain}</span>
                </div>
                <div className="absolute inset-0 flex items-center justify-between px-8 bg-accent transition-transform duration-500 ease-in-out translate-x-[100%] group-hover:translate-x-0">
                  <div className="flex items-center">
                    <CheckCircle2 className="w-6 h-6 text-white shrink-0 mr-4" />
                    <span className="text-lg font-bold font-sans text-white tracking-wide">{row.gain}</span>
                  </div>
                  <ArrowRight className="w-5 h-5 text-white/70" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Proof / Case Studies Block */}
      <section className="py-32 px-6 bg-surface border-t border-borderLight/50 relative z-10">
        <div className="max-w-6xl mx-auto">
          <SectionHeading pre="Proven Results" title="Financial Transformations." titleDrama="Case Studies." align="center" />
          
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-16 mt-8">
            {[
              { name: "Trifecta Sports Therapy", video: "https://strategicbusinessadvisors.org/wp-content/uploads/2026/03/cary-prejean-case-study-%232.mp4" },
              { name: "LAP Services", video: "https://strategicbusinessadvisors.org/wp-content/uploads/2026/03/LAP%20Services%20case%20study_V1.mp4" },
            ].map((t, i) => (
              <div key={i} className="case-study group relative flex flex-col items-center text-center">
                <div className="w-full relative rounded-3xl overflow-hidden bg-black aspect-video shadow-xl border border-borderLight/60 mb-8 group-hover:shadow-2xl transition-shadow duration-500">
                  <video className="w-full h-full object-cover" controls src={t.video}></video>
                </div>
                <h4 className="text-3xl md:text-4xl font-bold font-sans text-textMain tracking-tight mb-2">{t.name}</h4>
                <p className="text-xs font-mono text-accent uppercase tracking-widest font-bold">Client Success Story</p>
              </div>
            ))}
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="case-study group relative flex flex-col items-center text-center">
              <div className="w-full relative rounded-3xl overflow-hidden bg-black aspect-video shadow-xl border border-borderLight/60 mb-8 group-hover:shadow-2xl transition-shadow duration-500">
                <video className="w-full h-full object-cover" controls src="https://strategicbusinessadvisors.org/wp-content/uploads/2026/03/PetStoreDirect%20client%20testimonial.mp4"></video>
              </div>
              <h4 className="text-3xl md:text-4xl font-bold font-sans text-textMain tracking-tight mb-2">Petstore Direct</h4>
              <p className="text-xs font-mono text-accent uppercase tracking-widest font-bold">Client Success Story</p>
            </div>
          </div>
        </div>
      </section>

      <TestimonialsSection disableAnimation={true} />

      {/* About Cary Section */}
      <section className="py-32 px-6 bg-background relative flex items-center justify-center border-y border-borderLight z-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16 lg:gap-24 relative z-10 w-full">
          
          <div className="md:w-[45%]">
            <SectionHeading pre="The Founder" title="Meet Your" titleDrama="Advisor." align="left" />
            
            <div className="space-y-6 text-textMuted font-sans text-lg">
              <p>As a business owner, nothing is more frustrating than feeling stuck. You can see what's possible, but you're too busy putting out fires. <span className="text-textMain font-medium">It doesn't have to be this way.</span></p>
              <p>I've coached thousands of busy business owners to get to the next level. Regardless of your industry, you don't need platitudes and inspiration. You need strategic insights and solutions.</p>
              <p className="text-primary italic font-drama text-2xl leading-normal mt-4 border-l-4 border-accent pl-6">
                "Given the demands of running a business, you need more than bookkeeping. Leverage my strategic and financial business experience to reach your next level goals."
              </p>
            </div>

            <div className="mt-12">
              <p className="font-sans font-bold text-xl tracking-tight text-textMain mb-1">CARY PREJEAN, CPA</p>
              <p className="text-sm text-textMuted font-mono uppercase tracking-wider">Founder, Strategic Business Advisors, LLC</p>
            </div>
          </div>

          <div className="md:w-[55%] w-full flex justify-end">
            <div className="relative rounded-[2rem] overflow-hidden aspect-[4/5] w-full max-w-lg shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] bg-white border border-borderLight p-2">
              <div className="w-full h-full rounded-[1.5rem] overflow-hidden bg-surface relative">
                <img 
                  src="/cary.webp" 
                  alt="Cary Prejean" 
                  className="w-full h-full object-cover grayscale opacity-90 transition-transform duration-[2s] ease-out hover:scale-105"
                  onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800"; }}
                />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Protocol / The Well-Oiled Machine */}
      <section className="py-32 px-6 bg-surface relative overflow-hidden z-10">
        <div className="absolute inset-0 bg-grid pointer-events-none opacity-50" />
        <div className="max-w-6xl mx-auto relative z-10">
          <SectionHeading pre="Here's how it works" title="The Well-Oiled" titleDrama="Machine." align="center" />
          <p className="text-center text-textMuted max-w-xl mx-auto mb-20 text-lg">
            The three-step process to get your small business out of the weeds and to the next level.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: BarChart, title: "Actionable Financial Data", items: ["Easy-to-understand data", "Weekly dashboards", "Strategic insights"] },
              { icon: Settings, title: "Building Blocks for Growth", items: ["Identify inefficiencies", "Process playbooks", "Leverage quick wins"] },
              { icon: Compass, title: "Strategic Planning", items: ["Goal and vision casting", "Building for the future", "Next-level alignment"] }
            ].map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={i} className="process-card group relative p-8 rounded-[2rem] border border-borderLight bg-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 overflow-hidden flex flex-col h-full">
                  <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-background border border-borderLight mb-8 group-hover:bg-accent group-hover:border-accent transition-colors duration-500 relative z-10">
                    <Icon className="w-6 h-6 text-primary group-hover:text-white transition-colors duration-500" />
                  </div>
                  
                  <h3 className="text-2xl font-sans font-bold text-textMain mb-6 relative z-10">{step.title}</h3>
                  <ul className="space-y-4 mb-10 flex-1 relative z-10">
                    {step.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                          <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                        </div>
                        <span className="text-textMuted font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="font-mono text-xs text-textMuted uppercase tracking-widest border-t border-borderLight pt-6 relative z-10 flex items-center justify-between">
                    <span>Phase 0{i + 1}</span>
                    <div className="w-8 h-px bg-borderLight group-hover:bg-accent transition-colors" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final CTA Execution Bridge */}
      <section className="py-32 px-6 bg-background border-t border-borderLight relative w-full overflow-hidden z-10">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <SectionHeading pre="Execution" title="It's Easy to" titleDrama="Get Started." align="center" />
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 mb-16 text-textMain font-mono text-xs md:text-sm tracking-wide">
            <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-full border border-borderLight shadow-sm">
              <span className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs">1</span>
              Book consult
            </div>
            <ChevronRight className="w-4 h-4 text-borderLight hidden md:block" />
            <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-full border border-borderLight shadow-sm">
              <span className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs">2</span>
              Discuss goals
            </div>
            <ChevronRight className="w-4 h-4 text-borderLight hidden md:block" />
            <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-full border border-accent shadow-sm text-accent font-bold">
              <span className="w-6 h-6 rounded-full bg-accent text-white flex items-center justify-center text-xs">3</span>
              Fast track
            </div>
          </div>

          <div className="inline-flex flex-col items-center gap-6">
            <button onClick={openModal} className="magnetic-btn inline-flex items-center justify-center px-12 py-6 bg-accent text-white rounded-full font-sans text-xl font-bold tracking-wide shadow-xl hover:shadow-2xl hover:bg-blue-700 transition-colors">
              <span className="relative z-10 flex items-center gap-3">
                Book a 30-Minute Intro Call 
                <ArrowUpRight className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </span>
            </button>
          </div>

          <div className="mt-28 p-12 rounded-[3rem] bg-white border border-borderLight shadow-xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-accent" />
            <h2 className="text-3xl md:text-5xl font-sans tracking-tight text-textMain leading-[1.3] max-w-3xl mx-auto">
              Avoid the Pitfalls of <br/> Growing Your Business. <br/>
              <span className="font-drama italic text-accent mt-4 block">Next Level Your Growth and Lead the Pack.</span>
            </h2>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default function App() {
  const [view, setView] = useState('funnel');

  useEffect(() => {
    // Read the pathname on mount to catch '/ads' directly
    if (window.location.pathname === '/ads') {
      setView('ads');
    } else {
      setView('funnel');
    }
  }, []);

  return (
    <main className="min-h-screen bg-background relative selection:bg-accent selection:text-white pb-0">
      <NoiseOverlay />
      {view === 'funnel' && <VslFunnel setView={setView} />}
      {view === 'booking' && <BookingPage setView={setView} />}
      {view === 'ads' && <AdsDashboard setView={setView} />}
    </main>
  );
}
