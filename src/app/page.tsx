"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import {
  ArrowDown,
  CheckCircle2,
  FileText,
  Scale,
  ShieldCheck,
  Calendar,
  Users,
  Cpu,
  BadgeCheck,
  Menu,
  X,
  User,
} from "lucide-react";

// ✅ ajuste ce chemin selon ton projet
import { usePresentationMode } from "@/app/hooks/usePresentationMode";

const COLORS = {
  blue: "#0A2F73",
  blue2: "#3F5F99",
  gray: "#C9C9C9",
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 14, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.55 },
  },
};

function Section({
  id,
  eyebrow,
  title,
  subtitle,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className="relative h-[100svh] w-full snap-start overflow-hidden"
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(1100px 700px at 20% 20%, rgba(63,95,153,0.18), transparent 60%)," +
            "radial-gradient(1000px 700px at 80% 30%, rgba(10,47,115,0.18), transparent 55%)," +
            "linear-gradient(180deg, rgba(255,255,255,0.95), rgba(248,250,252,0.92))",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.25]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(201,201,201,0.25) 1px, transparent 1px)," +
            "linear-gradient(to bottom, rgba(201,201,201,0.22) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(600px 420px at 50% 35%, black 30%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto flex h-full max-w-6xl flex-col justify-center px-6 md:px-10">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ amount: 0.55, once: true }}
          className="w-full"
        >
          <motion.p
            variants={item}
            className="mb-3 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm backdrop-blur"
          >
            <span
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: COLORS.blue2 }}
            />
            {eyebrow}
          </motion.p>

          <motion.h2
            variants={item}
            className="text-balance text-3xl font-semibold tracking-tight text-slate-900 md:text-5xl"
          >
            {title}
          </motion.h2>

          {subtitle ? (
            <motion.p
              variants={item}
              className="mt-4 max-w-3xl text-pretty text-base leading-relaxed text-slate-700 md:text-lg"
            >
              {subtitle}
            </motion.p>
          ) : null}

          {/* ✅ léger réduit pour éviter les débordements dans les sections "100svh" */}
          <motion.div variants={item} className="mt-8">
            {children}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function Card({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 220, damping: 18 }}
      className="group relative rounded-3xl border border-slate-200 bg-white/75 p-6 shadow-[0_10px_30px_rgba(2,6,23,0.06)] backdrop-blur"
    >
      <div
        className="absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(900px 240px at 20% 0%, rgba(63,95,153,0.22), transparent 55%)," +
            "radial-gradient(900px 240px at 90% 10%, rgba(10,47,115,0.18), transparent 50%)",
        }}
      />
      <div className="relative">
        <div
          className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl"
          style={{
            background:
              "linear-gradient(135deg, rgba(10,47,115,0.14), rgba(63,95,153,0.14))",
            border: "1px solid rgba(201,201,201,0.4)",
          }}
        >
          {icon}
        </div>
        <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-700">{text}</p>
      </div>
    </motion.div>
  );
}

/** ✅ Zone 1 : Alpha (avec photo) + mini liste collaborateurs en bas */
function TeamCard({
  name,
  role,
  img,
  tags,
  collaborators = [],
  pos = "50% 50%",
  zoom = 0.92,
}: {
  name: string;
  role: string;
  img: string;
  tags: string[];
  collaborators?: Array<{ name: string; role: string }>;
  pos?: string;
  zoom?: number;
}) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 220, damping: 18 }}
      className="group relative h-full overflow-hidden rounded-3xl border border-slate-200 bg-white/75 shadow-[0_10px_30px_rgba(2,6,23,0.06)] backdrop-blur"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(900px 240px at 20% 0%, rgba(63,95,153,0.18), transparent 55%)," +
            "radial-gradient(900px 240px at 90% 10%, rgba(10,47,115,0.16), transparent 50%)",
        }}
      />

      <div className="relative grid grid-cols-[220px_1fr]">
        {/* left */}
        <div className="relative">
          <div
            className="absolute inset-0"
            style={{
              background:
                `radial-gradient(420px 220px at 25% 25%, rgba(63,95,153,0.35), transparent 60%),` +
                `radial-gradient(420px 220px at 85% 20%, rgba(10,47,115,0.30), transparent 60%),` +
                `linear-gradient(135deg, rgba(10,47,115,0.12), rgba(63,95,153,0.10))`,
            }}
          />

          <div className="relative h-full min-h-[220px] w-full">
            <Image
              src={img}
              alt={name}
              fill
              sizes="220px"
              priority={false}
              style={{
                objectFit: "contain",
                objectPosition: pos,
                transform: `scale(${zoom})`,
              }}
              className="p-3"
            />
          </div>

          <div className="absolute left-3 top-3 inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/40 px-3 py-2 text-xs font-semibold text-slate-800 backdrop-blur">
            <span
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: COLORS.blue }}
            />
            ADOC
          </div>
        </div>

        {/* right */}
        <div className="relative flex flex-col p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-lg font-semibold text-slate-900">{name}</p>
              <p className="mt-1 text-sm text-slate-700">{role}</p>
            </div>

            <div
              className="rounded-2xl px-3 py-2 text-xs font-semibold"
              style={{
                color: COLORS.blue,
                background: "rgba(10,47,115,0.08)",
                border: `1px solid rgba(10,47,115,0.15)`,
              }}
            >
              Directeur de mission
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {tags.slice(0, 3).map((t) => (
              <span
                key={t}
                className="rounded-full px-3 py-1 text-xs"
                style={{
                  background: "rgba(63,95,153,0.10)",
                  border: `1px solid rgba(201,201,201,0.45)`,
                  color: "rgba(2,6,23,0.78)",
                }}
              >
                {t}
              </span>
            ))}
          </div>

          <div className="mt-5 flex items-center gap-2 text-xs text-slate-600">
            <BadgeCheck size={16} style={{ color: COLORS.blue2 }} />
            Équipe pluridisciplinaire • Confidentialité • Indépendance
          </div>

          {/* ✅ mini-liste collaborateurs pour équilibrer la hauteur avec Zone 2 */}
          {collaborators.length > 0 && (
            <>
              <div className="mt-5 h-px w-full bg-slate-200/80" />
              <div className="mt-4">
                <p className="text-xs font-semibold text-slate-700">
                  Collaborateurs (sous la supervision)
                </p>

                <div className="mt-3 grid gap-2">
                  {collaborators.slice(0, 2).map((c) => (
                    <div
                      key={c.name}
                      className="rounded-2xl border border-slate-200 bg-white/70 px-4 py-3"
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className="mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-xl"
                          style={{
                            background:
                              "linear-gradient(135deg, rgba(10,47,115,0.10), rgba(63,95,153,0.10))",
                            border: "1px solid rgba(201,201,201,0.35)",
                          }}
                        >
                          <User size={16} style={{ color: COLORS.blue }} />
                        </div>

                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-slate-900">
                            {c.name}
                          </p>
                          <p className="mt-0.5 text-sm text-slate-700">{c.role}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}

/** ✅ Zone 2 : Liste compacte + scroll interne (plus de débordement) */
function TeamList({
  members,
  maxItems = 5,
}: {
  members: Array<{
    name: string;
    role: string;
    tags?: string[];
  }>;
  maxItems?: number;
}) {
  return (
    <div className="h-full rounded-3xl border border-slate-200 bg-white/75 p-5 shadow-[0_10px_30px_rgba(2,6,23,0.06)] backdrop-blur md:p-6">
      <div className="mb-4 flex items-center justify-between gap-3">
        <p className="text-sm font-semibold text-slate-900">Autres membres</p>
        <span
          className="rounded-full px-3 py-1 text-xs font-semibold"
          style={{
            color: COLORS.blue,
            background: "rgba(10,47,115,0.08)",
            border: `1px solid rgba(10,47,115,0.15)`,
          }}
        >
          Équipe Mission
        </span>
      </div>

      {/* ✅ Scroll interne : évite le débordement dans la section 100svh */}
      <div className="max-h-[460px] overflow-auto overscroll-contain pr-1">
        <div className="grid gap-2">
          {members.slice(0, maxItems).map((m) => (
            <div
              key={m.name}
              className="rounded-2xl border border-slate-200 bg-white/70 p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-slate-900">
                    {m.name}
                  </p>
                  <p className="mt-1 text-sm text-slate-700">{m.role}</p>
                </div>
              </div>

              {m.tags?.length ? (
                <div className="mt-3 flex flex-wrap gap-2">
                  {m.tags.slice(0, 2).map((t) => (
                    <span
                      key={t}
                      className="rounded-full px-3 py-1 text-xs"
                      style={{
                        background: "rgba(63,95,153,0.08)",
                        border: `1px solid rgba(201,201,201,0.45)`,
                        color: "rgba(2,6,23,0.75)",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2 text-xs text-slate-600">
        <BadgeCheck size={16} style={{ color: COLORS.blue2 }} />
        Équipe pluridisciplinaire • Confidentialité • Indépendance
      </div>
    </div>
  );
}

function Navbar({
  presentation,
  collapsed,
  setCollapsed,
}: {
  presentation: any;
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
}) {
  const [open, setOpen] = useState(false);

  const links = [
    { id: "home", label: "Accueil" },
    { id: "context", label: "Contexte" },
    { id: "goals", label: "Objectifs" },
    { id: "refs", label: "Référentiels" },
    { id: "team", label: "Équipe" },
    { id: "plan", label: "Déroulement" },
  ];

  if (collapsed && open) setOpen(false);

  return (
    <div className="pointer-events-none fixed left-0 right-0 top-0 z-50">
      <motion.div
        className="pointer-events-auto mx-auto flex max-w-6xl items-center justify-between px-6 md:px-10"
        animate={{
          paddingTop: collapsed ? 10 : 16,
          paddingBottom: collapsed ? 10 : 16,
        }}
        transition={{ type: "spring", stiffness: 220, damping: 24 }}
      >
        {/* LEFT (logo) */}
        <motion.div
          className="flex items-center gap-3 rounded-full border border-slate-200 bg-white/70 shadow-sm backdrop-blur"
          animate={{
            paddingLeft: collapsed ? 10 : 14,
            paddingRight: collapsed ? 10 : 14,
            paddingTop: collapsed ? 8 : 10,
            paddingBottom: collapsed ? 8 : 10,
          }}
          transition={{ type: "spring", stiffness: 220, damping: 24 }}
        >
          <motion.div
            className="relative"
            animate={{ width: collapsed ? 80 : 112, height: collapsed ? 28 : 40 }}
            transition={{ type: "spring", stiffness: 220, damping: 24 }}
          >
            <Image
              src="/adoc-logo.png"
              alt="ADOC"
              fill
              className="object-contain"
            />
          </motion.div>
        </motion.div>

        {/* CENTER (desktop links) */}
        <motion.nav
          className="hidden items-center gap-2 rounded-full border border-slate-200 bg-white/70 p-2 shadow-sm backdrop-blur md:flex"
          animate={{
            opacity: collapsed ? 0 : 1,
            scale: collapsed ? 0.98 : 1,
            pointerEvents: collapsed ? ("none" as any) : ("auto" as any),
          }}
          transition={{ duration: 0.18 }}
        >
          {links.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className="rounded-full px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
            >
              {l.label}
            </a>
          ))}
        </motion.nav>

        {/* RIGHT (actions) */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="pointer-events-auto inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-4 py-2 text-sm font-semibold text-slate-800 shadow-sm backdrop-blur hover:bg-white"
          >
            {collapsed ? (
              <>
                <Menu size={18} /> Menu
              </>
            ) : (
              <>
                <X size={18} /> Réduire
              </>
            )}
          </button>

          <div className="hidden items-center gap-3 md:flex">
            <button
              onClick={() => presentation.setEnabled(!presentation.enabled)}
              className="rounded-full px-4 py-2 text-sm font-semibold shadow-sm transition"
              style={{
                background: presentation.enabled
                  ? "rgba(10,47,115,0.12)"
                  : `linear-gradient(135deg, ${COLORS.blue}, ${COLORS.blue2})`,
                color: presentation.enabled ? COLORS.blue : "white",
                border: presentation.enabled
                  ? "1px solid rgba(10,47,115,0.15)"
                  : "none",
              }}
            >
              {presentation.enabled ? "Quitter présentation" : "Mode présentation"}
            </button>

            <a
              href="#plan"
              className="rounded-full px-4 py-2 text-sm font-semibold text-white shadow-sm"
              style={{
                background: `linear-gradient(135deg, ${COLORS.blue}, ${COLORS.blue2})`,
              }}
            >
              Prochaines étapes
            </a>
          </div>

          {/* MOBILE MENU */}
          <button
            onClick={() => setOpen(!open)}
            className="pointer-events-auto inline-flex items-center justify-center rounded-full border border-slate-200 bg-white/70 p-3 shadow-sm backdrop-blur hover:bg-white md:hidden"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </motion.div>

      {/* dropdown mobile */}
      {open && (
        <div className="pointer-events-auto mx-auto mt-2 max-w-6xl px-6 md:hidden">
          <div className="rounded-3xl border border-slate-200 bg-white/90 p-3 shadow-sm backdrop-blur">
            <div className="grid gap-1">
              {links.map((l) => (
                <a
                  key={l.id}
                  href={`#${l.id}`}
                  onClick={() => setOpen(false)}
                  className="rounded-2xl px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-100"
                >
                  {l.label}
                </a>
              ))}
            </div>

            <div className="mt-3 flex gap-2">
              <button
                onClick={() => {
                  presentation.setEnabled(!presentation.enabled);
                  setOpen(false);
                }}
                className="flex-1 rounded-2xl px-4 py-3 text-sm font-semibold text-white"
                style={{
                  background: `linear-gradient(135deg, ${COLORS.blue}, ${COLORS.blue2})`,
                }}
              >
                {presentation.enabled ? "Quitter présentation" : "Mode présentation"}
              </button>

              <a
                href="#plan"
                onClick={() => setOpen(false)}
                className="flex-1 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-center text-sm font-semibold text-slate-800"
              >
                Prochaines étapes
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Page() {
  const scrollRef = useRef<HTMLElement | null>(null);

  const { scrollY, scrollYProgress } = useScroll({
    container: scrollRef as any,
  });
  const bar = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const [navCollapsed, setNavCollapsed] = useState(false);

  useMotionValueEvent(scrollY, "change", (v) => {
    const threshold = window.innerHeight * 0.7;
    setNavCollapsed(v > threshold);
  });

  const sections = ["home", "context", "goals", "refs", "team", "plan"];
  const presentation = usePresentationMode(sections, scrollRef as any);

  return (
    <main
      ref={scrollRef as any}
      className="h-[100svh] w-full snap-y snap-mandatory overflow-y-auto scroll-smooth bg-white"
    >
      <Navbar
        presentation={presentation}
        collapsed={navCollapsed}
        setCollapsed={setNavCollapsed}
      />

      {/* progress bar */}
      <div className="fixed left-0 top-0 z-50 h-1 w-full bg-transparent">
        <motion.div
          style={{
            width: bar,
            height: "100%",
            background: `linear-gradient(90deg, ${COLORS.blue}, ${COLORS.blue2})`,
          }}
        />
      </div>

      {/* HERO */}
      <section id="home" className="relative h-[100svh] snap-start overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-slate-50" />
          <div className="absolute inset-0">
            <Image
              src="/bridge.jpg"
              alt="Infrastructures"
              fill
              className="object-cover opacity-80"
              priority
            />
          </div>
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.92) 60%, rgba(255,255,255,0.98) 100%)",
            }}
          />
        </div>

        <div className="relative mx-auto flex h-full max-w-6xl flex-col justify-center px-6 md:px-10">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="max-w-4xl"
          >
            <motion.p
              variants={item}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm backdrop-blur"
            >
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: COLORS.blue2 }} />
              Réunion de démarrage • Audit de l’exploitation en régie intéressée
            </motion.p>

            <motion.h1
              variants={item}
              className="mt-6 text-balance text-4xl font-semibold tracking-tight text-slate-900 md:text-6xl"
            >
              Audit de l’exploitation{" "}
              <span style={{ color: COLORS.blue }}>en régie intéressée</span>
            </motion.h1>

            <motion.p
              variants={item}
              className="mt-5 max-w-3xl text-pretty text-base leading-relaxed text-slate-700 md:text-lg"
            >
              Tronçons AIBD–Mbour • AIBD–Thiès–Touba • Pont à péage de Foundiougne
              <br />
              <span className="font-medium">Période auditée :</span> 1er juillet 2021 – 30 juin 2025
            </motion.p>

            <motion.div variants={item} className="mt-8 flex flex-wrap gap-3">
              <a
                href="#context"
                className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white shadow-sm"
                style={{ background: `linear-gradient(135deg, ${COLORS.blue}, ${COLORS.blue2})` }}
              >
                Démarrer <ArrowDown size={18} />
              </a>
              <a
                href="#plan"
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-800 shadow-sm backdrop-blur hover:bg-white"
              >
                Voir le déroulement <Calendar size={18} />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CONTEXTE */}
      <Section
        id="context"
        eyebrow="Cadre de la mission"
        title="Contexte de la mission"
        subtitle="La mission s’inscrit dans le cadre du suivi et du contrôle de l'execution du contrat de régie intéressée relatif à l’exploitation d’infrastructures à péage. Elle intervient dans un contexte d’exigence renforcée de transparence, de traçabilité et de sécurisation des opérations, notamment celles liées au trafic, à l’enregistrement des transactions et à la collecte des recettes. À ce titre, l’audit vise à apprécier la fiabilité du dispositif d’exploitation et la cohérence entre les données du système, les encaissements réalisés et les reportings produits."
      >
        <div className="grid gap-4 md:grid-cols-3">
          <Card
            icon={<FileText size={22} style={{ color: COLORS.blue }} />}
            title="Cadre contractuel"
            text="Mission réalisée au titre du dispositif de régie intéressée, incluant les obligations d’exploitation et de suivi."
          />
          <Card
            icon={<ShieldCheck size={22} style={{ color: COLORS.blue }} />}
            title="Gouvernance"
            text="Renforcer la traçabilité, la fiabilité et la sécurisation des processus liés aux recettes."
          />
          <Card
            icon={<Users size={22} style={{ color: COLORS.blue }} />}
            title="Collaboration"
            text="Démarche structurée avec échanges réguliers, accès aux informations et validation des constats."
          />
        </div>
      </Section>

      {/* OBJECTIFS */}
      <Section
        id="goals"
        eyebrow="Ce que l’audit cherche à sécuriser"
        title="Objectifs de la mission"
        subtitle="Objectif général : apprécier la fiabilité et la conformité du dispositif d’exploitation, de collecte, de suivi et de reversement des recettes."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <Card
            icon={<CheckCircle2 size={22} style={{ color: COLORS.blue }} />}
            title="Audit Financier"
            text="Exactitude, traçabilité et cohérence entre trafic réel, transactions enregistrées et recettes perçues."
          />
          <Card
            icon={<CheckCircle2 size={22} style={{ color: COLORS.blue }} />}
            title="Audit du SI"
            text="S’assurer que toutes les transactions effectuées au péage sont bien intégrées dans le système central."
          />
          <Card
            icon={<Scale size={22} style={{ color: COLORS.blue }} />}
            title="Audit Administratif"
            text="Vérifier l’alignement aux obligations contractuelles, aux textes applicables et aux procédures internes."
          />
          <Card
            icon={<ShieldCheck size={22} style={{ color: COLORS.blue }} />}
            title="Audit Organisationnel"
            text="Identifier les zones de risque et proposer des recommandations opérationnelles, pragmatiques et priorisées."
          />
        </div>
      </Section>

      {/* RÉFÉRENTIELS */}
      <Section
        id="refs"
        eyebrow="Normes & documents"
        title="Référentiels et normes"
        subtitle="Les travaux seront conduits sur la base des référentiels contractuels, des dispositions applicables et des bonnes pratiques professionnelles d’audit."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <Card
            icon={<FileText size={22} style={{ color: COLORS.blue }} />}
            title="Référentiels"
            text="Normes ISSAI • Normes ISA • Normes ISRS • COSO • ISO 9001 • ISO 31000 • ISO 27001 ."
          />
          <Card
            icon={<Scale size={22} style={{ color: COLORS.blue }} />}
            title="Textes & pratiques"
            text="Dispositions légales et réglementaires applicables • Normes et bonnes pratiques professionnelles."
          />
        </div>
      </Section>

      {/* ✅ ÉQUIPE : on force une hauteur commune et on met scroll interne Zone2 */}
      <Section
        id="team"
        eyebrow="Organisation & points de contact"
        title="Équipe de mission"
        subtitle="Equipe"
      >
        <div className="grid gap-4 md:grid-cols-2 md:items-stretch">
          {/* Zone 1 */}
          <div className="h-full">
            <TeamCard
              name="Alpha Youssoupha GUEYE — 22 ans"
              role="Expert-comptable diplômé • Directeur de mission"
              img="/team-1.png"
              zoom={0.86}
              pos="50% 50%"
              tags={["Pilotage", "Supervision", "Validation livrables", "Qualité"]}
              collaborators={[
                { name: "Mouhamadou Mansour sow", role: "Préparation dossiers • Suivi pièces" },
                { name: "Ndeye Fatou Ndiaye", role: "Contrôles • Documentation" },
              ]}
            />
          </div>

          {/* Zone 2 */}
          <div className="h-full">
            <TeamList
              members={[
                {
                  name: "Mouhamadou DIOUCK — 20 ans",
                  role: "Auditeur financier • Chef de mission",
                  tags: ["Coordination terrain", "Reporting"],
                },
                {
                  name: "Babacar Sedikh FALL — 11 ans",
                  role: "Auditeur",
                  tags: ["CAC", "Contrôle Interne"],
                },
                {
                  name: "Djibril GUEYE — 18 ans",
                  role: "Spécialiste en système d’information",
                  tags: ["SI péage", "Sécurité accès"],
                },
                {
                  name: "Dominique NDONG — 47 ans",
                  role: "Ingénieur en génie civil",
                  tags: ["Visites terrain", "Constats techniques"],
                },
                {
                  name: "Dramane Camara — 5 ans",
                  role: "Auditeur",
                  tags: ["Contrôle interne", "Tests"],
                },
                // ✅ si tu ajoutes encore des gens, Zone 2 ne débordera pas (scroll interne)
                // { name: "...", role: "...", tags: ["...", "..."] },
              ]}
              maxItems={10}
            />
          </div>
        </div>
      </Section>

      {/* DÉROULEMENT */}
      <Section
        id="plan"
        eyebrow="Phases & jalons"
        title="Déroulement de la mission"
        subtitle="La mission est conduite de manière progressive, structurée et collaborative, avec échanges contradictoires et restitution des conclusions."
      >
        <div className="grid gap-4 md:grid-cols-3">
          <Card
            icon={<BadgeCheck size={22} style={{ color: COLORS.blue }} />}
            title="1. Cadrage"
            text="Prise de connaissance • périmètre • plan de test • demandes documentaires."
          />
          <Card
            icon={<Users size={22} style={{ color: COLORS.blue }} />}
            title="2. Travaux"
            text="Entretiens • tests • rapprochements • contrôles SI/CI • analyses."
          />
          <Card
            icon={<Cpu size={22} style={{ color: COLORS.blue }} />}
            title="3. Restitution"
            text="Constats • échanges contradictoires • recommandations • livrables."
          />
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl border border-slate-200 bg-white/70 p-6 shadow-sm backdrop-blur">
            <p className="text-sm font-semibold" style={{ color: COLORS.blue }}>
              Prochaines étapes
            </p>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              <li>• Validation des interlocuteurs et canaux</li>
              <li>• Transmission des documents prioritaires</li>
              <li>• Confirmation du calendrier & jalons</li>
            </ul>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white/70 p-6 shadow-sm backdrop-blur md:col-span-2">
            <p className="text-sm font-semibold" style={{ color: COLORS.blue }}>
              Facteurs clés de succès
            </p>
            <div className="mt-3 grid gap-3 md:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-white/60 p-4 text-sm text-slate-700">
                <span className="font-semibold">Accès</span> aux documents et systèmes
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white/60 p-4 text-sm text-slate-700">
                <span className="font-semibold">Disponibilité</span> des interlocuteurs clés
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white/60 p-4 text-sm text-slate-700">
                <span className="font-semibold">Communication</span> fluide et continue
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white/60 p-4 text-sm text-slate-700">
                <span className="font-semibold">Calendrier</span> 09 février au 09 mai 2026
              </div>
            </div>
          </div>
        </div>

        <footer className="mt-10 flex items-center justify-between gap-4 text-xs text-slate-600">
          <span>© {new Date().getFullYear()} ADOC Audit & Conseil</span>
          <a
            href="#home"
            className="rounded-full border border-slate-200 bg-white/70 px-4 py-2 shadow-sm backdrop-blur hover:bg-white"
          >
            Retour en haut
          </a>
        </footer>
      </Section>

      {/* ✅ PRESENTATION HUD */}
      {presentation.enabled && (
        <>
          <div className="fixed bottom-6 right-6 z-50 rounded-full bg-white/80 px-4 py-2 text-sm font-medium shadow backdrop-blur">
            Slide {presentation.index + 1} / {presentation.total}
          </div>

          <div className="fixed bottom-6 left-6 z-50 flex gap-2">
            <button
              onClick={presentation.prev}
              className="rounded-full border border-slate-200 bg-white/80 px-4 py-2 shadow backdrop-blur hover:bg-white"
            >
              ←
            </button>
            <button
              onClick={presentation.next}
              className="rounded-full border border-slate-200 bg-white/80 px-4 py-2 shadow backdrop-blur hover:bg-white"
            >
              →
            </button>
          </div>
        </>
      )}
    </main>
  );
}
