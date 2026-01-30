"use client";
import { useRef } from "react";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
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

          <motion.div variants={item} className="mt-10">
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

function TeamCard({
  name,
  role,
  img,
  tags,
  pos = "50% 50%",
  zoom = 0.92,
}: {
  name: string;
  role: string;
  img: string;
  tags: string[];
  pos?: string;
  zoom?: number;
}) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 220, damping: 18 }}
      className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white/75 shadow-[0_10px_30px_rgba(2,6,23,0.06)] backdrop-blur"
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
              onError={(e) => {
                const el = e.currentTarget as HTMLImageElement;
                el.src = "/placeholder-avatar.png";
              }}
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

        <div className="relative p-6">
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
              Équipe Mission
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {tags.map((t) => (
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
        </div>
      </div>
    </motion.div>
  );
}

function Navbar({ presentation }: { presentation: any }) {
  const links = [
    { id: "home", label: "Accueil" },
    { id: "context", label: "Contexte" },
    { id: "goals", label: "Objectifs" },
    { id: "refs", label: "Référentiels" },
    { id: "team", label: "Équipe" },
    { id: "plan", label: "Déroulement" },
  ];

  return (
    <div className="pointer-events-none fixed left-0 right-0 top-0 z-50">
      <div className="pointer-events-auto mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-10">
        <div className="flex items-center gap-3">
          <div className="relative h-10 w-28">
            <Image src="/adoc-logo.png" alt="ADOC" fill className="object-contain" />
          </div>
        </div>

        <nav className="hidden items-center gap-2 rounded-full border border-slate-200 bg-white/70 p-2 shadow-sm backdrop-blur md:flex">
          {links.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className="rounded-full px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <button
            onClick={() => presentation.setEnabled(!presentation.enabled)}
            className="rounded-full px-4 py-2 text-sm font-semibold shadow-sm transition"
            style={{
              background: presentation.enabled
                ? "rgba(10,47,115,0.12)"
                : `linear-gradient(135deg, ${COLORS.blue}, ${COLORS.blue2})`,
              color: presentation.enabled ? COLORS.blue : "white",
              border: presentation.enabled ? "1px solid rgba(10,47,115,0.15)" : "none",
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
      </div>
    </div>
  );
}

export default function Page() {
  
  const { scrollYProgress } = useScroll();
  const bar = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // ✅ PRESENTATION MODE
const scrollRef = useRef<HTMLElement | null>(null);

const sections = ["home", "context", "goals", "refs", "team", "plan"];
const presentation = usePresentationMode(sections, scrollRef as any);

  return (
    <main className="h-[100svh] w-full snap-y snap-mandatory overflow-y-auto scroll-smooth bg-white">
      <Navbar presentation={presentation} />

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
          <motion.div variants={container} initial="hidden" animate="show" className="max-w-4xl">
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
              Audit de l’exploitation <span style={{ color: COLORS.blue }}>en régie intéressée</span>
            </motion.h1>

            <motion.p variants={item} className="mt-5 max-w-3xl text-pretty text-base leading-relaxed text-slate-700 md:text-lg">
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
        subtitle="La mission s’inscrit dans le cadre du contrat de régie intéressée relatif à l’exploitation d’infrastructures à péage, avec des exigences de transparence, traçabilité et conformité."
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
            title="Fiabilité des recettes"
            text="Exactitude, traçabilité et cohérence entre trafic réel, transactions enregistrées et recettes perçues."
          />
          <Card
            icon={<CheckCircle2 size={22} style={{ color: COLORS.blue }} />}
            title="Exhaustivité"
            text="S’assurer que toutes les transactions effectuées au péage sont bien intégrées dans le système central."
          />
          <Card
            icon={<Scale size={22} style={{ color: COLORS.blue }} />}
            title="Conformité"
            text="Vérifier l’alignement aux obligations contractuelles, aux textes applicables et aux procédures internes."
          />
          <Card
            icon={<ShieldCheck size={22} style={{ color: COLORS.blue }} />}
            title="Amélioration"
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
            text="Contrat de régie intéressée et annexes • Procédures internes • Dispositifs de contrôle."
          />
          <Card
            icon={<Scale size={22} style={{ color: COLORS.blue }} />}
            title="Textes & pratiques"
            text="Dispositions légales et réglementaires applicables • Normes et bonnes pratiques professionnelles."
          />
        </div>
      </Section>

      {/* ÉQUIPE */}
      <Section id="team" eyebrow="Organisation & points de contact" title="Équipe de mission" subtitle="Photo">
        <div className="grid gap-4 md:grid-cols-2">
          <TeamCard
            name="Alpha Gueye"
            role="Chef de mission"
            img="/team-1.png"
            zoom={0.82}
            pos="50% 50%"
            tags={["Pilotage", "Supervision", "Validation livrables"]}
          />
          <TeamCard
            name="Mouhamadou Mansour SOW"
            role="Auditeur senior — Audit financier & recettes"
            img="/team-2.png"
            zoom={0.92}
            pos="50% 50%"
            tags={["Recettes", "Exhaustivité", "Exactitude"]}
          />
          <TeamCard
            name="Fatou Kine Gueye"
            role="Auditeur — Contrôle interne & organisation"
            img="/team-3.png"
            zoom={0.92}
            pos="50% 55%"
            tags={["Procédures", "Séparation tâches", "Supervision"]}
          />
          <TeamCard
            name="Mariama Diallo"
            role="Auditeur SI / Data — Systèmes de péage"
            img="/team-4.png"
            zoom={0.9}
            pos="50% 55%"
            tags={["Transactions", "Trafic", "Sécurité accès"]}
          />
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
                <span className="font-semibold">Respect</span> du calendrier prévisionnel
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
