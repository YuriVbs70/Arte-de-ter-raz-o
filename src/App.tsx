import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Clock3,
  Facebook,
  Chrome as Home,
  Instagram,
  Printer,
  Quote,
  ShoppingBag,
  X,
  Zap,
} from "lucide-react";

const bonuses = [
  {
    number: "01",
    title: "Etiquetas “Cada coisa no seu lugar”",
    description:
      "Etiquetas prontas para imprimir, recortar e identificar roupas, alimentos, documentos, produtos de limpeza e outras categorias, facilitando devolver cada item ao lugar certo",
    image: "/bonus-etiquetas.webp",
    alt: "Bônus de etiquetas para identificar e organizar os objetos da casa",
  },
  {
    number: "02",
    title: "Organização para casas pequenas",
    description:
      "Estratégias visuais para aproveitar melhor armários, paredes, portas e espaços reduzidos, criando mais espaço sem precisar se desfazer do que é importante",
    image: "/bonus-casas-pequenas.webp",
    alt: "Bônus de organização para aproveitar melhor os espaços de casas pequenas",
  },
  {
    number: "03",
    title: "Checklist visual da casa organizada",
    description:
      "Uma lista visual organizada por ambientes para marcar cada ação concluída, acompanhar seu progresso e manter a casa em ordem com menos esforço",
    image: "/bonus-checklist-visual.webp",
    alt: "Bônus de checklist visual com as etapas de organização da casa",
  },
];

const demoImages = [
  {
    src: "/guia-como-usar-kit.webp",
    alt: "Guia visual explicando como usar o kit de organização da casa",
  },
  {
    src: "/mapa-rotina-visual-casa.webp",
    alt: "Mapa visual da rotina diária, semanal e mensal da casa",
  },
  {
    src: "/mapa-cozinha-organizada.webp",
    alt: "Mapa visual com o fluxo para manter a cozinha organizada",
  },
];

const testimonials = [
  {
    name: "Marina G.",
    location: "Curitiba — PR",
    comment: "Eu nunca arrumei tudo tão rápido.",
    source: "Instagram",
    photo: "/cliente-marina.webp",
  },
  {
    name: "Fernanda S.",
    location: "Guarulhos — SP",
    comment:
      "Meu marido chegou do trabalho e ficou chocado com a casa. Me ajudou muito.",
    source: "Instagram",
    photo: "/cliente-fernanda.webp",
  },
  {
    name: "Vanilda C.",
    location: "Sinop — MT",
    comment: "Muito legal! Deixei colado na parede para sempre conseguir ver.",
    source: "Facebook",
    photo: "/cliente-vanilda.webp",
  },
  {
    name: "Luana P.",
    location: "Recife — PE",
    comment:
      "Consegui mais tempo para meu filho e, depois, até ele me ajudou a manter a casa arrumada.",
    source: "Facebook",
    photo: "/cliente-luana.webp",
  },
];

function SimplePackageUpsell({
  open,
  onClose,
  onChooseComplete,
  onKeepSimple,
}: {
  open: boolean;
  onClose: () => void;
  onChooseComplete: () => void;
  onKeepSimple: () => void;
}) {
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) =>
      event.key === "Escape" && onClose();
    window.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[110] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="simple-package-upsell-title"
    >
      <button
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Fechar oferta"
      />
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-[#E7D8CE] bg-[#FFFCF9] p-7 text-center shadow-2xl sm:p-9">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 text-neutral-500 transition hover:bg-[#F5ECE6]"
          aria-label="Fechar"
        >
          <X className="h-5 w-5" />
        </button>
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#E8F6DF] text-[#315C36]">
          <ShoppingBag className="h-7 w-7" />
        </div>
        <h2
          id="simple-package-upsell-title"
          className="mx-auto max-w-sm text-2xl font-extrabold leading-tight text-[#332824]"
        >
          Tem certeza de que não prefere o pacote completo?
        </h2>
        <img
          src="/pacote-completo.webp"
          alt="Pacote completo com os 20 guias visuais e os três bônus"
          decoding="async"
          className="mt-5 h-44 w-full rounded-2xl object-cover object-center shadow-sm"
        />
        <p className="mt-4 leading-relaxed text-[#6D5A52]">
          Se levar o kit completo, faremos o preço de{" "}
          <strong className="text-[#315C36]">R$ 22,90</strong> — só mais{" "}
          <strong>R$ 5</strong> para levar o pacote completo!
        </p>
        <button
          onClick={onChooseComplete}
          className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-[#B8EFA4] px-6 py-4 font-extrabold text-[#17391F] shadow-[0_10px_32px_rgba(184,239,164,.42)] ring-1 ring-white/50 transition hover:bg-[#A8E68F] active:scale-[.98]"
        >
          Quero levar o pacote completo
          <ArrowRight className="h-5 w-5" />
        </button>
        <button
          onClick={onKeepSimple}
          className="mt-4 bg-transparent px-3 py-2 text-sm text-neutral-500 underline-offset-4 transition hover:text-neutral-700 hover:underline"
        >
          Não irei aproveitar essa oportunidade
        </button>
      </div>
    </div>
  );
}

function CtaButton({
  onClick,
  label = "Quero conhecer o kit",
  variant = "default",
}: {
  onClick: () => void;
  label?: string;
  variant?: "default" | "maps";
}) {
  const colors =
    variant === "maps"
      ? "bg-[#B8EFA4] text-[#17391F] shadow-[0_10px_32px_rgba(184,239,164,.42)] ring-1 ring-white/40 hover:bg-[#A8E68F]"
      : "bg-[#D9796B] text-white shadow-[0_10px_30px_rgba(217,121,107,.24)] hover:bg-[#C96659]";
  return (
    <button
      onClick={onClick}
      className={`group inline-flex items-center justify-center gap-2 rounded-xl px-7 py-4 text-sm font-extrabold uppercase tracking-wide transition active:scale-[.98] ${colors}`}
    >
      {label}
      <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
    </button>
  );
}

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.08 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ${visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"} ${className}`}
    >
      {children}
    </div>
  );
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white">
      <button
        className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="font-bold">{question}</span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 transition ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div
        className={`grid transition-all duration-300 ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
      >
        <div className="overflow-hidden">
          <p className="px-5 pb-5 leading-relaxed text-neutral-600">{answer}</p>
        </div>
      </div>
    </div>
  );
}

function useCountdown(durationInSeconds: number) {
  const [secondsLeft, setSecondsLeft] = useState(durationInSeconds);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setSecondsLeft((current) => Math.max(0, current - 1));
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  const minutes = Math.floor(secondsLeft / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (secondsLeft % 60).toString().padStart(2, "0");

  return `${minutes}:${seconds}`;
}

export default function App() {
  const [simplePackageUpsellOpen, setSimplePackageUpsellOpen] = useState(false);
  const countdown = useCountdown(17 * 60);
  const goToCheckout = (url: string) => window.location.assign(url);
  const chooseDiscountedCompletePackage = () => {
    setSimplePackageUpsellOpen(false);
    goToCheckout("https://pay.lowify.com.br/checkout.php?product_id=MHiCNV");
  };
  const keepSimplePackage = () => {
    setSimplePackageUpsellOpen(false);
    goToCheckout("https://pay.lowify.com.br/checkout?product_id=oSCTzK");
  };
  const scrollToCompleteOffer = () =>
    document
      .getElementById("oferta-completa")
      ?.scrollIntoView({ behavior: "smooth", block: "center" });
  return (
    <div className="min-h-screen bg-white text-neutral-900 antialiased">
      <SimplePackageUpsell
        open={simplePackageUpsellOpen}
        onClose={() => setSimplePackageUpsellOpen(false)}
        onChooseComplete={chooseDiscountedCompletePackage}
        onKeepSimple={keepSimplePackage}
      />
      {/* 1 — VENDA DIRETA */}
      <header className="relative overflow-hidden bg-[#3E332F] text-white">
        <div className="relative z-20 border-b border-red-800 bg-red-600 px-4 py-3 text-white">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-3 gap-y-2 text-center">
            <span className="text-xs font-black uppercase tracking-[.14em] sm:text-sm">
              Essa oferta irá encerrar em:
            </span>
            <span
              className="rounded-lg bg-red-950 px-3 py-1.5 text-lg font-black tabular-nums tracking-wider text-white shadow-sm"
              aria-live="polite"
              aria-label={`Tempo restante: ${countdown}`}
            >
              {countdown}
            </span>
          </div>
        </div>
        <img
          aria-hidden="true"
          src="/hero-casa-organizada-oliva-1600.webp"
          srcSet="/hero-casa-organizada-oliva-900.webp 900w, /hero-casa-organizada-oliva-1600.webp 1600w"
          sizes="100vw"
          fetchPriority="high"
          decoding="async"
          alt=""
          className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#3E332F]/80 via-[#3E332F]/45 to-transparent"
        />
        <div className="pointer-events-none absolute right-0 top-20 z-[1] h-80 w-80 rounded-full bg-[#F3C8BF]/15 blur-[120px]" />
        <div className="relative z-10 mx-auto grid min-h-[720px] max-w-6xl items-center gap-12 px-5 py-16 md:grid-cols-[1.05fr_.95fr] md:py-20">
          <div className="contents md:order-2 md:block">
            <div className="order-1 text-center">
              <h1
                className="mx-auto max-w-3xl text-4xl font-bold leading-[1.1] tracking-[-0.01em] text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)] sm:text-5xl md:text-6xl"
                style={{
                  fontFamily: "'Spectral', Georgia, serif",
                }}
              >
                20 mapas visuais com princípios japoneses que irão deixar sua
                casa sempre arrumada.
              </h1>
            </div>
            <div className="order-3 flex justify-center md:mt-8">
              <CtaButton
                onClick={scrollToCompleteOffer}
                label="Quero acessar os mapas"
                variant="maps"
              />
            </div>
          </div>
          <div className="order-2 relative mx-auto w-full max-w-md md:order-1">
            <img
              src="/kit-visual-casa-organizada-720.webp"
              srcSet="/kit-visual-casa-organizada-720.webp 720w, /kit-visual-casa-organizada-1200.webp 1200w"
              sizes="(min-width: 768px) 448px, calc(100vw - 40px)"
              alt="Kit Visual Para Organizar Sua Casa com princípios japoneses, apresentado em computador, celular e guias impressos"
              fetchPriority="high"
              decoding="async"
              width="1200"
              height="800"
              className="relative block h-auto w-full rounded-3xl"
            />
            <div className="relative mt-4 grid grid-cols-4 overflow-hidden rounded-2xl border border-white/10 bg-[#153D2C] text-white shadow-2xl">
              {[
                {
                  icon: Printer,
                  title: "Pronto para imprimir ou acessar no celular.",
                },
                {
                  icon: Clock3,
                  title:
                    "Tenha mais tempo para aproveitar folgas e descansos em casa.",
                },
                {
                  icon: Zap,
                  title: "Ferramenta prática",
                  text: "Economize tempo e energia nas decisões.",
                },
                {
                  icon: Home,
                  title: "Para toda a casa",
                  text: "Do quarto à cozinha, tudo no lugar.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="flex min-w-0 flex-col items-center border-r border-white/10 px-2 py-4 text-center last:border-r-0 sm:px-3"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#F2A99D]/70 text-[#F2A99D]">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <p className="mt-3 text-[9px] font-black uppercase leading-tight tracking-wide sm:text-[10px]">
                    {item.title}
                  </p>
                  {item.text && (
                    <p className="mt-1 text-[9px] font-black uppercase leading-tight tracking-wide text-white sm:text-[10px]">
                      {item.text}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* 2 — DEMONSTRATIVO */}
      <section className="bg-[#FFF8F3] py-20">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal className="text-center">
            <h2
              className="mx-auto max-w-4xl text-3xl font-bold leading-tight text-[#352C29] md:text-5xl"
              style={{ fontFamily: "'Spectral', Georgia, serif" }}
            >
              Veja na prática um dos materiais que você vai receber.
            </h2>
            <p className="section-copy mx-auto max-w-2xl">
              Cada página transforma uma decisão difícil em um caminho claro:
              olhar, escolher e aplicar no ambiente.
            </p>
          </Reveal>
          <Reveal className="mt-12 overflow-hidden py-4">
            <div className="showcase-track flex w-max gap-5">
              {[...demoImages, ...demoImages].map((image, i) => (
                <div
                  key={`${image.src}-${i}`}
                  aria-hidden={i >= demoImages.length}
                  className="w-[72vw] max-w-sm shrink-0 md:w-[340px]"
                >
                  <img
                    src={image.src}
                    alt={i < demoImages.length ? image.alt : ""}
                    loading="lazy"
                    decoding="async"
                    className="block h-auto w-full rounded-2xl border border-neutral-200 bg-white shadow-lg"
                  />
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* 3 — BENEFÍCIOS */}
      <section className="bg-[#3A302C] py-20 text-white">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal className="text-center">
            <h2 className="section-title mx-auto max-w-3xl text-white">
              Mapas criados para facilitar a organização e gastar menos tempo e
              energia.
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { emoji: "⏰", badge: "✨", title: "Menos tempo decidindo" },
              { emoji: "🏷️", badge: "✅", title: "Um lugar para cada coisa" },
              { emoji: "🧺", badge: "✨", title: "Menos acúmulo" },
              { emoji: "🏡", badge: "💚", title: "Casa fácil de manter" },
            ].map((item) => (
              <article
                key={item.title}
                className="group rounded-3xl border border-white/10 bg-[#443733] p-6 shadow-lg transition duration-300 hover:-translate-y-1 hover:border-[#F2A99D]/40 hover:bg-[#4B3B36] hover:shadow-2xl"
              >
                <div className="relative flex h-24 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-[#FFF8F3] via-[#F7E5DE] to-[#EBC4BA] shadow-inner">
                  <div className="absolute -left-5 -top-5 h-16 w-16 rounded-full bg-white/60 blur-xl" />
                  <span
                    className="relative text-5xl drop-shadow-sm transition duration-300 group-hover:scale-110"
                    role="img"
                    aria-hidden="true"
                  >
                    {item.emoji}
                  </span>
                  <span
                    className="absolute bottom-2.5 right-2.5 flex h-8 w-8 items-center justify-center rounded-full bg-[#153D2C] text-sm shadow-md"
                    aria-hidden="true"
                  >
                    {item.badge}
                  </span>
                </div>
                <h3 className="mt-5 text-center text-lg font-black">
                  {item.title}
                </h3>
              </article>
            ))}
          </div>
          <Reveal className="mt-10 text-center">
            <CtaButton
              onClick={scrollToCompleteOffer}
              label="Quero acessar os mapas"
              variant="maps"
            />
          </Reveal>
        </div>
      </section>

      {/* 5 — IDEAL PARA */}
      <section className="bg-[#F7EEE8] py-20">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal className="text-center">
            <h2
              className="text-3xl font-bold uppercase leading-tight text-red-600 md:text-4xl"
              style={{ fontFamily: "'Spectral', Georgia, serif" }}
            >
              Ideal para você que:
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              {
                visual: (
                  <img
                    src="/sticker-mulher-confusa.webp"
                    alt="Mulher em dúvida sobre por onde começar"
                    loading="lazy"
                    decoding="async"
                    className="h-16 w-16 object-contain"
                  />
                ),
                title:
                  "Já se sentiu perdida sem saber por onde começar a organizar",
                text: "Ao abrir o mapa, você já saberá todos os passos",
              },
              {
                visual: (
                  <img
                    src="/sticker-meia-cadeira.webp"
                    alt="Meia deixada fora do lugar sobre uma cadeira"
                    loading="lazy"
                    decoding="async"
                    className="h-16 w-16 object-contain"
                  />
                ),
                title: "Percebe objetos fora do lugar certo",
                text: "Veja os melhores lugares para cada objeto",
              },
              {
                visual: (
                  <img
                    src="/sticker-mulher-relogio.webp"
                    alt="Mulher cansada olhando para o relógio"
                    loading="lazy"
                    decoding="async"
                    className="h-16 w-16 object-contain"
                  />
                ),
                title:
                  "Sente que passa muito tempo arrumando e, logo em seguida, já está tudo bagunçado",
                text: "Com os mapas, você automatiza a organização e consegue terminar tudo mais rápido",
              },
            ].map((item, i) => (
              <Reveal key={item.title} delay={i * 90}>
                <article className="h-full rounded-2xl bg-white p-6 shadow-sm">
                  <div className="flex h-16 items-center">{item.visual}</div>
                  <h3 className="mt-6 text-lg font-black leading-tight text-red-600">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                    {item.text}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-5">
            <article className="flex flex-col gap-5 rounded-2xl bg-white p-6 shadow-sm md:flex-row md:items-center md:p-8">
              <img
                src="/sticker-tarefas-desiguais.webp"
                alt="Mulher limpando enquanto um homem está sentado"
                loading="lazy"
                decoding="async"
                className="h-20 w-24 shrink-0 object-contain"
              />
              <div>
                <h3 className="text-lg font-black leading-tight text-red-600">
                  Percebe que faz a maior parte ou tudo sozinha
                </h3>
                <p className="mt-3 leading-relaxed text-neutral-600">
                  Mostre de maneira visual o que deve ser feito
                </p>
              </div>
            </article>
          </Reveal>
        </div>
      </section>

      {/* 6 — RELATOS */}
      <section className="bg-[#FFF8F3] py-20">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal className="text-center">
            <p className="eyebrow">Relatos de quem já aplicou</p>
            <h2 className="section-title mx-auto max-w-3xl">
              Casas mais leves, rotinas mais tranquilas.
            </h2>
            <p className="section-copy mx-auto max-w-2xl">
              Experiências compartilhadas por clientes que usaram os mapas na
              rotina de casa.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {testimonials.map((testimonial, i) => (
              <Reveal key={testimonial.name} delay={(i % 2) * 100}>
                <article className="flex h-full flex-col rounded-3xl border border-[#E8D8D1] bg-white p-6 shadow-sm md:p-7">
                  <div className="flex items-center gap-4">
                    <img
                      src={testimonial.photo}
                      alt={`Foto de ${testimonial.name}`}
                      loading="lazy"
                      decoding="async"
                      width="160"
                      height="160"
                      className="h-16 w-16 shrink-0 rounded-full object-cover ring-4 ring-[#F7EEE8]"
                    />
                    <div>
                      <h3 className="text-lg font-black text-[#3E332F]">
                        {testimonial.name}
                      </h3>
                      <p className="mt-1 text-sm font-semibold text-[#9A7067]">
                        {testimonial.location}
                      </p>
                    </div>
                  </div>
                  <div className="mt-6 flex flex-1 gap-3">
                    <Quote className="h-7 w-7 shrink-0 fill-[#F3C8BF] text-[#D9796B]" />
                    <p className="text-lg font-semibold leading-relaxed text-[#4A3D38]">
                      “{testimonial.comment}”
                    </p>
                  </div>
                  <div className="mt-6 flex items-center gap-2 border-t border-[#F0E2DC] pt-4 text-sm font-bold text-[#8C6A62]">
                    {testimonial.source === "Instagram" ? (
                      <Instagram className="h-5 w-5 text-[#C85C78]" />
                    ) : (
                      <Facebook className="h-5 w-5 text-[#5576A8]" />
                    )}
                    Comentário feito no {testimonial.source}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 7 — PRODUTO PRINCIPAL */}
      <section className="bg-[#3A302C] py-20 text-white">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal className="text-center">
            <h2 className="section-title text-white">O que você irá receber</h2>
            <p className="section-copy mx-auto max-w-3xl text-[#E8D5CE]">
              Um pacote com os 20 guias visuais e instruções de como usá-los,
              prontos para acessar pelo celular ou imprimir. Se você optar pela
              impressão, o material já foi preparado para encadernar ou deixar
              cada mapa separado no local onde será utilizado — por exemplo, na
              parede do quarto do seu filho ou na cozinha — para que você e
              todos da casa possam ver o que precisa ser feito.
            </p>
          </Reveal>
          <Reveal className="mx-auto mt-12 max-w-5xl">
            <img
              src="/kit-visual-casa-organizada-720.webp"
              srcSet="/kit-visual-casa-organizada-720.webp 720w, /kit-visual-casa-organizada-1200.webp 1200w"
              sizes="(min-width: 1024px) 1024px, calc(100vw - 40px)"
              alt="Mockup completo do Kit Visual para organizar a casa, com guias, computador, tablet e celular"
              loading="lazy"
              decoding="async"
              width="1200"
              height="800"
              className="block h-auto w-full rounded-3xl"
            />
          </Reveal>
        </div>
      </section>

      {/* 8 — BÔNUS */}
      <section className="bg-[#3A302C] pb-20 text-white">
        <div className="mx-auto max-w-6xl border-t border-white/10 px-5 pt-20">
          <Reveal className="text-center">
            <h2 className="section-title text-white">
              Além dos 20 guias, você recebe 3 bônus.
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {bonuses.map((bonus, i) => (
              <Reveal key={bonus.title} delay={i * 100}>
                <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-[#F2A99D]/20 bg-white/5 shadow-xl">
                  <div className="relative overflow-hidden bg-[#FFF8F3]">
                    <img
                      src={bonus.image}
                      alt={bonus.alt}
                      loading="lazy"
                      decoding="async"
                      className="aspect-[4/5] w-full object-cover object-top transition duration-500 hover:scale-[1.02]"
                    />
                    <span className="absolute right-4 top-4 rounded-full bg-[#3A302C]/85 px-3 py-1.5 text-sm font-black text-white shadow-lg backdrop-blur-sm">
                      Bônus {bonus.number}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-xl font-black leading-tight">
                      {bonus.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-[#E8D5CE]">
                      {bonus.description}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-16">
            <div className="rounded-3xl border border-[#5C4942] bg-[#2D2522] p-5 shadow-2xl md:p-8">
              <h3
                className="text-center text-xl font-bold md:text-2xl"
                style={{ fontFamily: "'Spectral', Georgia, serif" }}
              >
                Pronto em 3 passos — receba e comece a organizar
              </h3>
              <div className="mt-7 grid gap-4 md:grid-cols-3">
                {[
                  {
                    step: "Passo 1",
                    title: "Escolha seu pacote",
                    text: "Compare as opções e escolha a que combina melhor com a rotina da sua casa.",
                  },
                  {
                    step: "Passo 2",
                    title: "Receba seu acesso",
                    text: "Após a confirmação da compra, receba o material digital diretamente no seu e-mail ou WhatsApp, de acordo com o que você preferir.",
                  },
                  {
                    step: "Passo 3",
                    title: "Aplique no seu ritmo",
                    text: "Acesse pelo celular ou imprima os mapas e comece pelo ambiente que mais precisa.",
                  },
                ].map((item) => (
                  <article
                    key={item.step}
                    className="rounded-2xl border border-[#5C4942] bg-[#221C19] p-5"
                  >
                    <span className="inline-flex rounded-full bg-[#F3D2C8] px-5 py-1.5 text-[10px] font-black uppercase tracking-widest text-[#6B3932]">
                      {item.step}
                    </span>
                    <h4 className="mt-5 font-black text-white">{item.title}</h4>
                    <p className="mt-3 text-sm leading-relaxed text-[#E0D0C8]">
                      {item.text}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 9 — OFERTA */}
      <section id="oferta" className="bg-[#F7EEE8] py-20">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal className="text-center">
            <p className="eyebrow">Escolha a melhor opção</p>
            <h2 className="section-title">
              Eu poderia facilmente cobrar por isso...
            </h2>
            <div className="mx-auto mt-8 max-w-xl overflow-hidden rounded-3xl border border-[#E4CFC7] bg-[#FFFCFA] text-left shadow-lg">
              <div className="space-y-3 p-6 md:p-7">
                {[
                  ["20 Guias visuais", "R$ 32"],
                  ["Etiquetas", "R$ 28"],
                  ["Organização para casas pequenas", "R$ 19"],
                  ["Checklist visual", "R$ 14"],
                ].map(([item, price]) => (
                  <div
                    key={item}
                    className="flex items-center justify-between gap-4 border-b border-[#F0E2DC] pb-3 text-sm font-semibold text-[#554641] last:border-0 last:pb-0 md:text-base"
                  >
                    <span>{item}</span>
                    <span className="shrink-0 font-black text-[#8F5B52]">
                      {price}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between bg-[#3A302C] px-6 py-5 text-white md:px-7">
                <span className="text-lg font-black">Total</span>
                <span className="text-2xl font-black line-through decoration-[#F2A99D] decoration-2">
                  R$ 93
                </span>
              </div>
            </div>
            <div className="mx-auto mt-8 max-w-3xl rounded-2xl bg-[#F3C8BF] px-5 py-5 text-[#5E342E] shadow-sm">
              <p
                className="text-xl font-bold leading-tight md:text-2xl"
                style={{ fontFamily: "'Spectral', Georgia, serif" }}
              >
                Mas, somente nesta oportunidade, você pode levar por:
              </p>
              <ChevronDown className="mx-auto mt-3 h-7 w-7 animate-bounce" />
            </div>
          </Reveal>
          <div className="mx-auto mt-10 grid max-w-4xl gap-6 md:grid-cols-2">
            <Reveal>
              <article className="flex h-full flex-col rounded-3xl border border-[#E8D8D1] bg-[#FFFCFA] p-7 shadow-sm">
                <p className="text-xs font-black uppercase tracking-[.2em] text-[#9A7067]">
                  Pacote simples
                </p>
                <h3 className="mt-3 text-2xl font-black">Kit Visual</h3>
                <p className="mt-2 text-neutral-500">
                  Para começar com os 20 guias principais.
                </p>
                <div className="my-7">
                  <div className="flex flex-wrap items-end gap-x-4 gap-y-2">
                    <span className="text-6xl font-black leading-none text-[#B65347] line-through decoration-[#8F3F36] decoration-[3px]">
                      R$ 32
                    </span>
                    <span className="pb-1 text-sm font-semibold text-neutral-400">
                      44% de desconto
                    </span>
                  </div>
                  <p className="mt-4 text-xs font-bold uppercase tracking-widest text-[#9A7067]">
                    Hoje por apenas
                  </p>
                  <span className="mt-1 block text-4xl font-black text-[#153D2C]">
                    R$ 17,90
                  </span>
                  <p className="mt-1 text-sm text-neutral-500">
                    pagamento único
                  </p>
                </div>
                <div className="mb-8 space-y-3">
                  {["20 guias visuais"].map((item) => (
                    <p
                      key={item}
                      className="flex items-center gap-2 font-semibold"
                    >
                      <Check className="h-5 w-5 text-[#B65347]" />
                      {item}
                    </p>
                  ))}
                </div>
                <CtaButton
                  onClick={() => setSimplePackageUpsellOpen(true)}
                  label="Quero o pacote simples"
                  variant="maps"
                />
              </article>
            </Reveal>
            <Reveal delay={120}>
              <article
                id="oferta-completa"
                className="relative flex h-full scroll-mt-8 flex-col overflow-hidden rounded-3xl border-2 border-[#C8AA86] bg-[#F2E6D5] p-7 text-[#3F332A] shadow-2xl"
              >
                <div className="absolute right-0 top-0 rounded-bl-2xl bg-[#5F765F] px-4 py-2 text-xs font-black uppercase tracking-widest text-white">
                  Mais completo
                </div>
                <p className="text-xs font-black uppercase tracking-[.2em] text-[#7B5A40]">
                  Pacote completo
                </p>
                <h3 className="mt-3 text-2xl font-black">Kit + 3 bônus</h3>
                <p className="mt-2 text-[#6B5A50]">
                  Para aplicar e manter o sistema com mais apoio.
                </p>
                <img
                  src="/pacote-completo.webp"
                  alt="Pacote completo com os 20 guias visuais e os três bônus"
                  loading="lazy"
                  decoding="async"
                  className="mt-5 aspect-[4/3] w-full rounded-2xl object-cover object-center shadow-md"
                />
                <div className="my-7">
                  <div className="flex flex-wrap items-end gap-x-4 gap-y-2">
                    <span className="text-6xl font-black leading-none text-[#B65347] line-through decoration-[#8F3F36] decoration-[3px]">
                      R$ 93
                    </span>
                    <span className="pb-1 text-sm font-semibold text-neutral-400">
                      70% de desconto
                    </span>
                  </div>
                  <p className="mt-4 text-xs font-bold uppercase tracking-widest text-[#7B6454]">
                    Hoje por apenas
                  </p>
                  <span className="mt-1 block text-4xl font-black text-[#153D2C]">
                    R$ 27,90
                  </span>
                  <p className="mt-1 text-sm text-[#75675E]">pagamento único</p>
                </div>
                <div className="mb-8 space-y-3">
                  {[
                    "Todos os 20 guias",
                    "Bônus 1 — Etiquetas “Cada coisa no seu lugar”",
                    "Bônus 2 — Organização para casas pequenas",
                    "Bônus 3 — Checklist visual da casa organizada",
                  ].map((item) => (
                    <p
                      key={item}
                      className="flex items-center gap-2 font-semibold"
                    >
                      <Check className="h-5 w-5 shrink-0 text-[#5F765F]" />
                      {item}
                    </p>
                  ))}
                </div>
                <CtaButton
                  onClick={() =>
                    goToCheckout(
                      "https://pay.lowify.com.br/checkout?product_id=EQIN0e",
                    )
                  }
                  label="Quero o pacote completo"
                  variant="maps"
                />
              </article>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 10 — FAQ */}
      <section className="bg-[#FFF8F3] py-20">
        <div className="mx-auto max-w-3xl px-5">
          <Reveal className="text-center">
            <p className="eyebrow">Perguntas frequentes</p>
            <h2 className="section-title">Antes de escolher seu pacote</h2>
          </Reveal>
          <div className="mt-10 space-y-3">
            {[
              {
                q: "O material funciona em casas pequenas?",
                a: "Sim. Os princípios de classificação, definição de lugares e manutenção podem ser adaptados a casas e apartamentos de diferentes tamanhos.",
              },
              {
                q: "Preciso comprar organizadores?",
                a: "Não. A proposta é avaliar e organizar primeiro o que você já possui. Depois, você decide se algum organizador realmente é necessário.",
              },
              {
                q: "Como vou receber o kit?",
                a: "O kit é digital. Após a confirmação da compra, você receberá o acesso por e-mail ou WhatsApp, de acordo com a sua preferência.",
              },
              {
                q: "Posso usar pelo celular?",
                a: "Sim. Os guias foram pensados para consulta digital e também poderão ser impressos.",
              },
              {
                q: "Qual é a diferença entre os pacotes?",
                a: "O pacote simples inclui os 20 guias. O pacote completo reúne os mesmos guias e mais os três bônus apresentados nesta página.",
              },
            ].map((item) => (
              <FaqItem key={item.q} question={item.q} answer={item.a} />
            ))}
          </div>
        </div>
      </section>

      {/* 11 — RODAPÉ */}
      <footer className="bg-[#2D2522] py-12 text-white">
        <div className="mx-auto max-w-6xl px-5">
          <div className="grid gap-10 border-b border-white/10 pb-10 md:grid-cols-[1.3fr_1fr]">
            <div>
              <p className="text-2xl font-black">Casa Organizada</p>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#E0D0C8]">
                Soluções visuais para ajudar famílias a organizar cada ambiente,
                dividir melhor as tarefas e manter uma rotina mais leve.
              </p>
            </div>
            <div>
              <p className="text-sm font-black uppercase tracking-[.18em] text-[#F2A99D]">
                Informações
              </p>
              <div className="mt-4 space-y-2 text-sm text-[#E0D0C8]">
                <p>Produto 100% digital</p>
                <p>Acesso pelo celular ou material para impressão</p>
                <p>Entrega por e-mail ou WhatsApp</p>
                <p>Atendimento e suporte após a compra</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between gap-3 pt-8 text-center text-xs text-[#B5A39B] md:flex-row md:text-left">
            <p>© 2026 Casa Organizada. Todos os direitos reservados.</p>
            <p>
              Resultados variam conforme a rotina e a aplicação do material.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
