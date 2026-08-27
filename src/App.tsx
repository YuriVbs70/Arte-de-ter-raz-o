import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Eye,
  MessageSquareQuote,
  Pencil,
  Save,
  ShieldCheck,
  Target,
  X,
} from "lucide-react";

const CHECKOUT_URL = (import.meta.env.VITE_CHECKOUT_URL as string | undefined)?.trim();
const PRODUCT_PRICE = (import.meta.env.VITE_PRODUCT_PRICE as string | undefined)?.trim() || "R$ 27,90";
const REFERENCE_PRICE = (import.meta.env.VITE_REFERENCE_PRICE as string | undefined)?.trim() || "R$ 64";

const strategyPages = [
  { src: "/produto-final-estrategia-03.webp", alt: "Estratégia 3: transforme uma afirmação relativa em absoluta" },
  { src: "/produto-final-estrategia-08.webp", alt: "Estratégia 8: irrite para tirar o adversário do controle" },
  { src: "/produto-final-estrategia-14.webp", alt: "Estratégia 14: declare vitória antes de responder" },
  { src: "/produto-final-estrategia-21.webp", alt: "Estratégia 21: responda a um truque com outro truque" },
  { src: "/produto-final-estrategia-29.webp", alt: "Estratégia 29: mude de assunto quando estiver perdendo" },
  { src: "/produto-final-estrategia-35.webp", alt: "Estratégia 35: mostre que a tese prejudica quem a defende" },
];

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.08 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ transitionDelay: `${delay}ms` }} className={`transition-all duration-700 ${visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"} ${className}`}>
      {children}
    </div>
  );
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="overflow-hidden rounded-2xl border border-[#D9C9A5]/35 bg-[#151515]">
      <button className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left" onClick={() => setOpen(!open)} aria-expanded={open}>
        <span className="font-bold text-[#F7F1E5]">{question}</span>
        <ChevronDown className={`h-5 w-5 shrink-0 text-[#D7A52A] transition ${open ? "rotate-180" : ""}`} />
      </button>
      <div className={`grid transition-all duration-300 ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
        <div className="overflow-hidden"><p className="px-5 pb-5 leading-relaxed text-[#C8C0B3]">{answer}</p></div>
      </div>
    </div>
  );
}

function useCountdown(durationInSeconds: number) {
  const [secondsLeft, setSecondsLeft] = useState(durationInSeconds);
  useEffect(() => {
    const timer = window.setInterval(() => setSecondsLeft((current) => Math.max(0, current - 1)), 1000);
    return () => window.clearInterval(timer);
  }, []);
  const minutes = Math.floor(secondsLeft / 60).toString().padStart(2, "0");
  const seconds = (secondsLeft % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

function CheckoutNotice({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="checkout-notice-title">
      <button className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} aria-label="Fechar aviso" />
      <div className="relative w-full max-w-md rounded-3xl border border-[#D7A52A]/35 bg-[#111] p-7 text-center text-white shadow-2xl">
        <button onClick={onClose} className="absolute right-4 top-4 rounded-full p-2 text-[#AFA89D] transition hover:bg-white/10" aria-label="Fechar"><X className="h-5 w-5" /></button>
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#D7A52A]/15 text-[#F0BD3C]"><ShieldCheck className="h-7 w-7" /></div>
        <h2 id="checkout-notice-title" className="mt-5 text-2xl font-black">Checkout em configuração</h2>
        <p className="mt-3 leading-relaxed text-[#C8C0B3]">O link seguro de pagamento será conectado aqui antes da publicação da oferta.</p>
        <button onClick={onClose} className="mt-7 w-full rounded-xl bg-[#D7A52A] px-6 py-4 font-black text-[#17130B] transition hover:bg-[#E6B83E]">Entendi</button>
      </div>
    </div>
  );
}

function CtaButton({ onClick, label = "Quero dominar as 38 estratégias", dark = false }: { onClick: () => void; label?: string; dark?: boolean }) {
  return (
    <button onClick={onClick} className={`group inline-flex items-center justify-center gap-2 rounded-xl px-7 py-4 text-sm font-black uppercase tracking-[.08em] transition active:scale-[.98] ${dark ? "bg-[#111] text-[#F4C44D] shadow-xl hover:bg-black" : "bg-[#D7A52A] text-[#17130B] shadow-[0_12px_36px_rgba(215,165,42,.28)] hover:bg-[#E8B638]"}`}>
      {label}<ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
    </button>
  );
}

export default function App() {
  const countdown = useCountdown(17 * 60);
  const [checkoutNoticeOpen, setCheckoutNoticeOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const pageRef = useRef<HTMLDivElement>(null);
  const publicFiguresRef = useRef<HTMLDivElement>(null);
  const scrollPublicFigures = (direction: number) => publicFiguresRef.current?.scrollBy({ left: direction * 320, behavior: "smooth" });
  const scrollToOffer = () => document.getElementById("oferta")?.scrollIntoView({ behavior: "smooth", block: "center" });
  const goToCheckout = () => {
    if (CHECKOUT_URL) {
      window.location.assign(CHECKOUT_URL);
      return;
    }
    setCheckoutNoticeOpen(true);
  };

  useEffect(() => {
    const root = pageRef.current;
    if (!root) return;
    const storageKey = "arte-razao-text-edits";
    const saved = JSON.parse(localStorage.getItem(storageKey) || "{}") as Record<string, string>;
    const elements = Array.from(root.querySelectorAll<HTMLElement>("h1, h2, h3, h4, p, span")).filter((element) => !element.children.length && !element.closest("button") && !element.hasAttribute("aria-live"));
    const cleanups: Array<() => void> = [];

    elements.forEach((element, index) => {
      const original = element.dataset.originalText || element.textContent || "";
      element.dataset.originalText = original;
      let hash = 0;
      for (const character of original) hash = ((hash << 5) - hash + character.charCodeAt(0)) | 0;
      const key = `${element.tagName.toLowerCase()}-${Math.abs(hash)}-${index}`;
      element.dataset.editKey = key;
      if (saved[key] !== undefined && element.textContent !== saved[key]) element.textContent = saved[key];
      element.contentEditable = editMode ? "true" : "false";
      element.spellcheck = editMode;
      if (editMode) element.dataset.liveEditable = "true";
      else delete element.dataset.liveEditable;

      const persist = () => {
        const current = JSON.parse(localStorage.getItem(storageKey) || "{}") as Record<string, string>;
        current[key] = element.textContent || "";
        localStorage.setItem(storageKey, JSON.stringify(current));
      };
      element.addEventListener("input", persist);
      cleanups.push(() => element.removeEventListener("input", persist));
    });

    return () => cleanups.forEach((cleanup) => cleanup());
  }, [editMode]);

  return (
    <div ref={pageRef} className="min-h-screen bg-[#0B0B0B] text-white antialiased">
      <CheckoutNotice open={checkoutNoticeOpen} onClose={() => setCheckoutNoticeOpen(false)} />
      <button type="button" onClick={() => setEditMode((active) => !active)} className={`fixed bottom-5 right-5 z-[100] flex items-center gap-2 rounded-full border px-5 py-3 text-sm font-black shadow-2xl transition ${editMode ? "border-[#F0CE78] bg-[#D7A52A] text-[#17130B]" : "border-[#D7A52A]/50 bg-[#111] text-[#F0BD3C] hover:border-[#D7A52A]"}`} aria-pressed={editMode}>{editMode ? <Save className="h-4 w-4" /> : <Pencil className="h-4 w-4" />}{editMode ? "Salvar textos" : "Editar textos"}</button>

      <header className="relative overflow-hidden border-b border-[#D7A52A]/20 bg-[#080808]">
        <div className="relative z-30 border-b border-[#7E160F] bg-[#B3261E] px-4 py-3 text-white">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-3 gap-y-2 text-center">
            <span className="text-xs font-black uppercase tracking-[.14em] sm:text-sm">Condição especial encerra em:</span>
            <span className="rounded-lg bg-[#650E0A] px-3 py-1.5 text-lg font-black tabular-nums tracking-wider shadow-sm" aria-live="polite" aria-label={`Tempo restante: ${countdown}`}>{countdown}</span>
          </div>
        </div>
        <img
          src="/hero-xadrez.png"
          alt=""
          aria-hidden="true"
          fetchPriority="high"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/35 to-black/90 lg:bg-gradient-to-r lg:from-black/95 lg:via-black/60 lg:to-black/25" />
        <div className="relative z-10 mx-auto grid min-h-[calc(100svh-68px)] max-w-7xl items-center gap-7 px-5 py-8 sm:min-h-[820px] sm:px-7 sm:py-12 lg:min-h-[760px] lg:grid-cols-[.88fr_1.12fr] lg:grid-rows-[auto_auto] lg:gap-x-10 lg:gap-y-6 lg:px-5 lg:py-20">
          <div className="lg:col-start-1 lg:row-start-1">
            <h1 className="max-w-3xl text-[2.55rem] font-black leading-[1.02] tracking-[-.04em] text-white drop-shadow-[0_3px_12px_rgba(0,0,0,.9)] sm:text-5xl md:text-6xl">Tenha um resumo visual rápido e consultável de 38 estratégias para nunca mais ser enganado ou perder um debate.</h1>
          </div>
          <div className="relative mx-auto flex h-[290px] w-full max-w-[620px] items-center justify-center sm:h-[390px] lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:h-[570px] lg:max-w-[760px]">
            <div aria-hidden="true" className="absolute inset-[10%] rounded-full bg-[#D7A52A]/15 blur-3xl" />
            <img src="/mockup-produto-transparente-v8.png" alt="Coleção completa Nunca Mais Perca Uma Discussão" fetchPriority="high" className="relative h-full w-full object-contain drop-shadow-[0_24px_45px_rgba(0,0,0,.8)]" />
          </div>
          <div className="lg:col-start-1 lg:row-start-2 lg:self-start">
            <p className="mx-auto max-w-2xl text-center text-xl font-semibold leading-relaxed text-[#EEE8DC] drop-shadow-[0_2px_6px_rgba(0,0,0,1)] sm:text-2xl lg:text-xl lg:text-[#D4CEC2]">Um kit pronto para consulta e esteja preparado quando tentarem manipular o que você disse.</p>
            <div className="mt-5 flex justify-center lg:mt-6"><CtaButton onClick={scrollToOffer} /></div>
          </div>
        </div>
      </header>

      <section className="bg-[#F3EBDD] py-20 text-[#1A1712]">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal className="text-center"><p className="eyebrow">Veja por dentro</p><h2 className="section-title mx-auto max-w-4xl">Uma estratégia completa em cada página.</h2><p className="section-copy mx-auto max-w-2xl">Sem blocos intermináveis de teoria: você vê o truque, acompanha uma situação prática e encontra uma forma objetiva de reagir.</p></Reveal>
          <Reveal className="mt-12 overflow-hidden py-5">
            <div className="showcase-track flex w-max gap-4">
              {[...strategyPages, ...strategyPages].map((image, index) => (
                <div key={`${image.src}-${index}`} aria-hidden={index >= strategyPages.length} className="w-[72vw] max-w-[300px] shrink-0 sm:w-[45vw] lg:w-[260px]"><img src={image.src} alt={index < strategyPages.length ? image.alt : ""} loading="lazy" decoding="async" className="block h-auto w-full rounded-xl border border-[#A98945]/35 bg-[#111] shadow-lg" /></div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-[#0D0D0D] py-20">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal className="text-center"><p className="eyebrow-light">Feito para consulta rápida</p><h2 className="section-title mx-auto max-w-3xl text-white">Pare de perceber a manipulação só depois que a conversa termina.</h2></Reveal>
          <div className="mt-10 grid grid-cols-2 gap-2.5 sm:mt-12 sm:gap-4 lg:grid-cols-4">
            {[
              { icon: Eye, image: "/card-reconheca-truque.png", title: "Reconheça o truque", text: "Identifique padrões de desvio, pressão e distorção enquanto eles acontecem." },
              { icon: MessageSquareQuote, image: "/card-tenha-resposta.png", title: "Tenha uma resposta", text: "Use modelos curtos para recuperar o foco sem entrar no jogo do outro." },
              { icon: Target, image: "/card-volte-ponto.png", title: "Volte ao ponto", text: "Separe afirmação, prova e conclusão para não perder o fio da conversa." },
              { icon: ShieldCheck, image: "/card-proteja-posicao.png", title: "Proteja sua posição", text: "Defenda seu argumento com firmeza, clareza e autocontrole." },
            ].map((item, index) => (
              <Reveal key={item.title} delay={index * 80} className="h-full"><article className="group relative flex min-h-[230px] h-full flex-col overflow-hidden rounded-2xl border border-white/15 bg-[#151515] p-4 shadow-xl transition hover:-translate-y-1 hover:border-[#D7A52A]/60 sm:min-h-[320px] sm:rounded-3xl sm:p-6"><img src={item.image} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105" /><div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/45 to-black/95" /><div className="relative flex items-center gap-2.5 sm:gap-3"><div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#D7A52A]/25 bg-black/55 text-[#F0BD3C] backdrop-blur-sm sm:h-12 sm:w-12 sm:rounded-xl"><item.icon className="h-5 w-5 sm:h-6 sm:w-6" /></div><h3 className="text-base font-black leading-tight text-white drop-shadow-lg sm:text-xl">{item.title}</h3></div><p className="relative mt-auto pt-6 text-xs leading-relaxed text-[#E2DCD1] drop-shadow-lg sm:text-sm">{item.text}</p></article></Reveal>
            ))}
          </div>
          <Reveal className="mt-10 text-center"><CtaButton onClick={scrollToOffer} /></Reveal>
        </div>
      </section>

      <section className="bg-[#E8DDC8] py-20 text-[#18140D]">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal className="text-center"><p className="eyebrow">Ideal para você que</p><h2 className="section-title mx-auto max-w-3xl">Já teve a sensação de que estava certo, mas perdeu o controle da conversa.</h2></Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {[
              { number: "01", title: "Já travou por estar sob pressão, nervoso, ou não sabia o que responder", text: "Você conhece o assunto, mas se perde quando surgem interrupções, ironias ou perguntas em sequência." },
              { number: "02", title: "Precisa provar seus pontos para outras pessoas", text: "Reuniões, negociações, entrevistas, apresentações e conversas familiares exigem respostas rápidas." },
              { number: "03", title: "Já esteve na razão e mesmo assim fizeram você parecer errado", text: "Você busca reconhecer raciocínios manipulativos sem precisar decorar um tratado de filosofia." },
            ].map((item) => (
              <article key={item.number} className="rounded-3xl border border-[#B99A5C]/35 bg-[#F7F1E6] p-7 shadow-sm"><span className="text-4xl font-black text-[#B88616]">{item.number}</span><h3 className="mt-5 text-xl font-black">{item.title}</h3><p className="mt-3 leading-relaxed text-[#625847]">{item.text}</p></article>
            ))}
          </div>
        </div>
      </section>

      <section className="overflow-hidden bg-[#121212] py-20">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal className="text-center">
            <p className="eyebrow-light">A origem das estratégias</p>
            <h2 className="section-title mx-auto max-w-4xl text-white">Baseado no livro “A arte de ter razão”, escrito por Arthur Schopenhauer.</h2>
          </Reveal>
          <Reveal className="relative mx-auto mt-12 max-w-[330px]">
            <div className="absolute -inset-12 rounded-full bg-[#D7A52A]/15 blur-3xl" />
            <img src="/livro-arte-de-ter-razao-original.jpg" alt="Capa de A Arte de Ter Razão, de Arthur Schopenhauer, com o retrato do filósofo" loading="lazy" className="relative w-full rounded-xl shadow-[0_24px_70px_rgba(0,0,0,.65)]" />
          </Reveal>
          <Reveal className="mt-16 text-center">
            <p className="eyebrow-light">Conhecimento aplicado</p>
            <h3 className="mx-auto max-w-3xl text-3xl font-black leading-tight text-white sm:text-4xl">Figuras públicas que estudaram essa arte</h3>
          </Reveal>
          <div ref={publicFiguresRef} className="hide-scrollbar mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto overflow-y-hidden pb-2 overscroll-x-contain">
            {[
              { image: "/figura-eneas-carneiro.jpg", name: "Enéas Carneiro" },
              { image: "/figura-danilo-gentili.jpg", name: "Danilo Gentili" },
              { image: "/figura-leandro-karnal.jpg", name: "Leandro Karnal" },
              { image: "/figura-clovis-de-barros.jpg", name: "Clóvis de Barros Filho" },
            ].map((item, index) => (
              <Reveal key={item.name} delay={index * 70} className="w-[72vw] max-w-[290px] shrink-0 snap-center sm:w-[42vw] lg:w-[calc(25%_-_12px)] lg:max-w-none">
                <article className="group relative aspect-[4/5] overflow-hidden rounded-3xl border border-[#D7A52A]/30 bg-[#1A1917] shadow-xl">
                  <img src={item.image} alt={item.name} loading="lazy" className="absolute inset-0 h-full w-full object-cover object-top transition duration-500 group-hover:scale-105" />
                  <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                    <h4 className="text-xl font-black text-white drop-shadow-lg sm:text-2xl">{item.name}</h4>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
          <p className="mt-2 text-center text-sm font-semibold text-[#9F9688] sm:hidden">Deslize para o lado para ver mais →</p>
          <div className="mt-5 hidden items-center justify-center gap-3 sm:flex">
            <button type="button" onClick={() => scrollPublicFigures(-1)} aria-label="Ver figuras anteriores" className="flex h-12 w-12 items-center justify-center rounded-full border border-[#D7A52A]/35 bg-[#1A1917] text-[#F0BD3C] transition hover:border-[#D7A52A] hover:bg-[#24211B]"><ChevronLeft className="h-6 w-6" /></button>
            <button type="button" onClick={() => scrollPublicFigures(1)} aria-label="Ver próximas figuras" className="flex h-12 w-12 items-center justify-center rounded-full border border-[#D7A52A]/35 bg-[#1A1917] text-[#F0BD3C] transition hover:border-[#D7A52A] hover:bg-[#24211B]"><ChevronRight className="h-6 w-6" /></button>
          </div>
        </div>
      </section>

      <section className="bg-[#F3EBDD] py-20 text-[#1A1712]">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal className="text-center"><p className="eyebrow">O que você recebe</p><h2 className="section-title mx-auto max-w-4xl">As 38 estratégias prontas e com exemplos reais.</h2><p className="section-copy mx-auto max-w-3xl">Um resumo ilustrado com todas as estratégias por página, pronto para abrir e aplicar.</p></Reveal>
          <Reveal className="mx-auto mt-12 max-w-5xl">
            <figure className="overflow-hidden rounded-[2rem] border border-[#B99A5C]/40 bg-white p-2 shadow-[0_24px_65px_rgba(73,52,18,.18)] sm:p-3">
              <img src="/livro-premium-escritorio.png" alt="Livro Nunca Mais Perca Uma Discussão em um escritório executivo com tabuleiro de xadrez" loading="lazy" className="block aspect-[16/9] w-full rounded-[1.5rem] object-cover" />
            </figure>
          </Reveal>
          <Reveal className="mx-auto mt-10 max-w-4xl text-center">
            <p className="text-xl font-semibold leading-relaxed text-[#514634] sm:text-2xl">Só com este resumo, você já estaria preparado. Mas não quero que esteja apenas preparado: quero que seja você quem está no controle da situação. Por isso, além do guia, você receberá bônus que vão colocar você à frente de quem adquiriu apenas o livro.</p>
          </Reveal>
        </div>
      </section>

      <section className="bg-[#0B0B0B] py-20">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal className="text-center"><p className="eyebrow-light">Bônus exclusivos</p><h2 className="section-title mx-auto max-w-3xl text-white">Materiais que irão acelerar a sua habilidade.</h2></Reveal>
          <Reveal className="mx-auto mt-12 max-w-5xl">
            <article className="grid items-center gap-8 overflow-hidden rounded-[2rem] border border-[#D7A52A]/30 bg-[#15130F] p-3 shadow-2xl sm:p-5 md:grid-cols-[1.1fr_.9fr] md:gap-10 md:p-8">
              <div className="overflow-hidden rounded-[1.5rem] border border-[#D7A52A]/30 bg-black shadow-2xl"><img src="/bonus-01-cartas-resposta-rapida.png" alt="Bônus com 38 cartas de resposta rápida" loading="lazy" className="block aspect-square h-full w-full object-cover" /></div>
              <div className="px-3 pb-5 md:px-0 md:pb-0"><p className="text-xs font-black uppercase tracking-[.2em] text-[#F0BD3C]">Bônus 1 de 4</p><h3 className="mt-3 text-3xl font-black">38 Cartas de Resposta Rápida</h3><p className="mt-4 leading-relaxed text-[#BFB7AA]">Baralho que te prepara com respostas rápidas.</p><p className="mt-7 text-2xl font-black text-[#F0BD3C] line-through decoration-2">R$16</p></div>
            </article>
          </Reveal>
          <Reveal className="mx-auto mt-6 max-w-5xl">
            <article className="grid items-center gap-8 overflow-hidden rounded-[2rem] border border-[#D7A52A]/30 bg-[#15130F] p-3 shadow-2xl sm:p-5 md:grid-cols-[.9fr_1.1fr] md:gap-10 md:p-8">
              <div className="overflow-hidden rounded-[1.5rem] border border-[#D7A52A]/30 bg-black shadow-2xl md:order-2"><img src="/bonus-02-dez-truques.png" alt="Bônus com os 10 truques mais usados em discussões" loading="lazy" className="block aspect-square h-full w-full object-cover" /></div>
              <div className="px-3 pb-5 md:order-1 md:px-0 md:pb-0"><p className="text-xs font-black uppercase tracking-[.2em] text-[#F0BD3C]">Bônus 2 de 4</p><h3 className="mt-3 text-3xl font-black">Os 10 Truques Mais Usados em Discussões</h3><p className="mt-4 leading-relaxed text-[#BFB7AA]">Os truques mais usados por manipuladores. Mesmo que recebesse somente este bônus, você já estaria à frente da maioria das pessoas.</p><p className="mt-7 text-2xl font-black text-[#F0BD3C] line-through decoration-2">R$22</p></div>
            </article>
          </Reveal>
          <Reveal className="mx-auto mt-6 max-w-5xl">
            <article className="grid items-center gap-8 overflow-hidden rounded-[2rem] border border-[#D7A52A]/30 bg-[#15130F] p-3 shadow-2xl sm:p-5 md:grid-cols-[1.1fr_.9fr] md:gap-10 md:p-8">
              <div className="overflow-hidden rounded-[1.5rem] border border-[#D7A52A]/30 bg-black shadow-2xl"><img src="/bonus-03-mapa-manipulacoes.png" alt="Mapa visual das manipulações em uma discussão" loading="lazy" className="block aspect-square h-full w-full object-cover" /></div>
              <div className="px-3 pb-5 md:px-0 md:pb-0"><p className="text-xs font-black uppercase tracking-[.2em] text-[#F0BD3C]">Bônus 3 de 4</p><h3 className="mt-3 text-3xl font-black">Mapa Visual das Manipulações</h3><p className="mt-4 leading-relaxed text-[#BFB7AA]">Um mapa de consulta rápida para identificar padrões de manipulação, proteger seu argumento e recuperar o foco da conversa.</p><p className="mt-7 text-2xl font-black text-[#F0BD3C] line-through decoration-2">R$12</p></div>
            </article>
          </Reveal>
          <Reveal className="mx-auto mt-6 max-w-5xl">
            <article className="grid items-center gap-8 overflow-hidden rounded-[2rem] border border-[#D7A52A]/30 bg-[#15130F] p-3 shadow-2xl sm:p-5 md:grid-cols-[.9fr_1.1fr] md:gap-10 md:p-8">
              <div className="overflow-hidden rounded-[1.5rem] border border-[#D7A52A]/30 bg-black shadow-2xl md:order-2"><img src="/bonus-04-respostas-coringa.png" alt="Guia com 20 respostas coringa para ganhar tempo e pensar" loading="lazy" className="block aspect-square h-full w-full object-cover" /></div>
              <div className="px-3 pb-5 md:order-1 md:px-0 md:pb-0"><p className="text-xs font-black uppercase tracking-[.2em] text-[#F0BD3C]">Bônus 4 de 4</p><h3 className="mt-3 text-3xl font-black">20 Respostas Coringa</h3><p className="mt-4 leading-relaxed text-[#BFB7AA]">Respostas prontas para ganhar tempo, organizar o raciocínio, retomar o foco e testar argumentos antes de responder.</p><p className="mt-7 text-2xl font-black text-[#F0BD3C] line-through decoration-2">R$14</p></div>
            </article>
          </Reveal>
        </div>
      </section>

      <section id="oferta" className="overflow-hidden bg-[#050505] py-20 text-white">
        <div className="mx-auto max-w-5xl px-5">
          <Reveal className="text-center"><p className="text-xs font-black uppercase tracking-[.2em] text-[#D7A52A]">Condição de lançamento</p><h2 className="mx-auto mt-4 max-w-4xl text-2xl font-black leading-snug text-white md:text-3xl">A decisão que tomar neste momento influenciará a maneira como as pessoas irão respeitá-lo daqui em diante. Você pode escolher: “Quero ser mais respeitado” ou “Quero manter as coisas como estão?”</h2></Reveal>
          <Reveal className="relative mx-auto mt-14 max-w-xl">
            <div aria-hidden="true" className="absolute -inset-10 rounded-full bg-[#D7A52A]/20 blur-3xl" />
            <div aria-hidden="true" className="absolute -inset-2 rounded-[2.5rem] bg-gradient-to-br from-[#F4CD68] via-[#A87918] to-[#4A3107] shadow-[0_0_55px_rgba(215,165,42,.22)]" />
            <article className="relative overflow-hidden rounded-[2rem] border border-[#F0CE78] bg-[#F8F2E7] text-[#17130B] shadow-[0_30px_80px_rgba(0,0,0,.55)]">
              <div className="bg-[#111] px-6 py-4 text-center text-xs font-black uppercase tracking-[.2em] text-[#F2C24C]">Acesso completo • pagamento único</div>
              <div className="p-7 md:p-9"><h3 className="text-2xl font-black">Kit visual para nunca perder um debate</h3><p className="mt-2 text-[#685D49]">Todas as 38 estratégias já decifradas.</p><div className="my-7 rounded-2xl border border-[#CDB77E] bg-[#EEE1C5]/75 px-4 py-7 text-center shadow-inner"><p className="text-sm font-bold uppercase tracking-widest text-[#786A4C]">Valor total <span>{REFERENCE_PRICE}</span> • por apenas</p><div className="mt-2 flex flex-wrap items-center justify-center gap-3"><p className="text-6xl font-black tracking-tight text-[#17130B]">{PRODUCT_PRICE}</p><span className="text-xs font-semibold text-[#52785B]/70">56% de desconto</span></div><p className="mt-2 text-sm font-semibold text-[#6D624E]">Pagamento único • garantia premium de 7 dias</p></div><div className="mb-8 space-y-3">{["Guia digital com 38 estratégias", "Exemplos, alertas e respostas prontas", "Acesso imediato após a compra", "Arquivo em alta qualidade"].map((item) => (<p key={item} className="flex items-center gap-3 font-semibold"><Check className="h-5 w-5 text-[#8B6205]" />{item}</p>))}</div><div className="text-center"><CtaButton onClick={goToCheckout} label="Quero acessar agora" dark /><p className="mt-4 flex items-center justify-center gap-2 text-xs text-[#6A5E47]"><ShieldCheck className="h-4 w-4" />Compra protegida e entrega digital</p></div></div>
            </article>
          </Reveal>
        </div>
      </section>

      <section className="bg-[#111] py-20">
        <div className="mx-auto max-w-3xl px-5">
          <Reveal className="text-center"><p className="eyebrow-light">Perguntas frequentes</p><h2 className="section-title text-white">Antes de garantir seu acesso</h2></Reveal>
          <div className="mt-10 space-y-3">
            {[
              { q: "O produto é físico?", a: "Não. É um material 100% digital em PDF. Você poderá acessar pelo celular, tablet ou computador." },
              { q: "Preciso conhecer filosofia ou lógica?", a: "Não. Cada estratégia foi transformada em uma página visual com explicação direta, exemplo prático e orientação de resposta." },
              { q: "O guia ensina a manipular pessoas?", a: "A proposta é reconhecer táticas de má-fé, compreender como elas funcionam e saber responder com clareza. Use o conteúdo de forma responsável." },
              { q: "Como recebo o acesso?", a: "Após a confirmação do pagamento, o acesso ao arquivo digital é enviado pelos dados informados na compra." },
              { q: "Posso imprimir?", a: "Sim. O arquivo foi preparado em páginas verticais de alta qualidade e também pode ser consultado diretamente nas telas dos seus dispositivos." },
            ].map((item) => <FaqItem key={item.q} question={item.q} answer={item.a} />)}
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-[#090909] py-12 text-white">
        <div className="mx-auto max-w-6xl px-5"><div className="grid gap-10 border-b border-white/10 pb-10 md:grid-cols-[1.3fr_1fr]"><div><p className="text-2xl font-black text-[#F0BD3C]">A Arte de Ter Razão</p><p className="mt-3 max-w-xl text-sm leading-relaxed text-[#BDB5A7]">Um guia visual para reconhecer estratégias de argumentação, recuperar o foco da conversa e responder com mais clareza.</p></div><div><p className="text-sm font-black uppercase tracking-[.18em] text-[#F0BD3C]">Informações</p><div className="mt-4 space-y-2 text-sm text-[#BDB5A7]"><p>Produto 100% digital</p><p>Acesso pelo celular, tablet ou computador</p><p>Entrega após a confirmação do pagamento</p><p>Uso pessoal e responsável</p></div></div></div><div className="flex flex-col items-center justify-between gap-3 pt-8 text-center text-xs text-[#8F897E] md:flex-row md:text-left"><p>© 2026 A Arte de Ter Razão. Todos os direitos reservados.</p><p>Este material não garante resultados e não substitui aconselhamento profissional.</p></div></div>
      </footer>
    </div>
  );
}
