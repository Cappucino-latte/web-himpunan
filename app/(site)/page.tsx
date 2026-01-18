'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, Code2, Users, Trophy, Zap, Quote, UserPlus, Info, 
  Target, Compass, Cpu, Globe, Heart, Shield, Clock 
} from 'lucide-react';
import { cn } from '@/lib/utils';

// --- IMPORTS ---
import { Navbar } from '@/components/shared/Navbar';
import { Footer } from '@/components/shared/Footer';
import { IntroNetwork } from '@/components/ui/IntroNetwork';
import { MagicButton } from '@/components/ui/MagicButton';
import Hero3D from '@/components/home/Hero3D';

// --- DATA DUMMY (Bisa dipindah ke file terpisah nanti) ---

const DEPARTEMEN = [
  { name: "PSDM", desc: "Pengembangan Sumber Daya Mahasiswa", icon: Users, color: "text-yellow-400" },
  { name: "KOMINFO", desc: "Komunikasi & Informasi Digital", icon: Globe, color: "text-cyan-400" },
  { name: "RISTEK", desc: "Riset & Teknologi", icon: Cpu, color: "text-blue-400" },
  { name: "SOSMA", desc: "Sosial Masyarakat", icon: Heart, color: "text-pink-400" },
  { name: "ADVOKASI", desc: "Advokasi & Kesejahteraan", icon: Shield, color: "text-green-400" },
  { name: "MINBAT", desc: "Minat & Bakat", icon: Trophy, color: "text-purple-400" },
];

const PAST_CHAIRMEN = [
  { year: "2019/2020", name: "Nama Ketua 1", period: "Perintis" },
  { year: "2020/2021", name: "Nama Ketua 2", period: "Pembangunan" },
  { year: "2021/2022", name: "Nama Ketua 3", period: "Ekspansi" },
  { year: "2022/2023", name: "Nama Ketua 4", period: "Inovasi" },
  { year: "2023/2024", name: "Nama Ketua 5", period: "Digitalisasi" },
];

const MISI_LIST = [
  "Menyelenggarakan kegiatan yang menunjang akademik dan non-akademik.",
  "Membangun jejaring kerjasama dengan pihak internal dan eksternal.",
  "Mewadahi aspirasi dan kreativitas mahasiswa Informatika.",
  "Menciptakan iklim organisasi yang kekeluargaan dan profesional."
];

// --- UI HELPERS ---

const SectionHeading = ({ title, subtitle }: { title: string, subtitle: string }) => (
  <div className="text-center mb-16 relative z-10 px-4">
    <motion.span 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-cyan-400 font-mono text-[10px] md:text-xs tracking-[0.3em] uppercase block mb-3"
    >
      {subtitle}
    </motion.span>
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 }}
      className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60"
    >
      {title}
    </motion.h2>
  </div>
);

const BentoCard = ({ title, desc, icon: Icon, className, delay }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: delay * 0.1 }}
    viewport={{ once: true }}
    className={cn(
      "group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8 hover:bg-white/10 transition-colors duration-300 h-full flex flex-col",
      className
    )}
  >
    <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-cyan-500/20 blur-3xl rounded-full group-hover:bg-cyan-500/30 transition-all" />
    <div className="relative z-10 flex flex-col h-full">
      <div className="w-12 h-12 rounded-xl bg-black/50 border border-white/10 flex items-center justify-center mb-6 text-cyan-400 group-hover:scale-110 transition-transform shadow-lg">
        <Icon size={24} />
      </div>
      <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
      <p className="text-sm text-neutral-400 leading-relaxed">{desc}</p>
    </div>
  </motion.div>
);

const ProjectCard = ({ title, category, image, date }: any) => (
  <div className="group relative rounded-2xl overflow-hidden border border-white/10 bg-neutral-900/50 aspect-[4/3] md:aspect-video flex flex-col justify-end p-6 hover:border-cyan-500/50 transition-all cursor-pointer">
    <div className={`absolute inset-0 bg-gradient-to-br ${image} opacity-60 group-hover:opacity-80 transition-opacity duration-500`} />
    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
    
    <div className="relative z-10 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
      <div className="flex justify-between items-center mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
        <span className="text-[10px] font-mono text-cyan-300 px-2 py-1 rounded bg-cyan-950/80 border border-cyan-500/30 backdrop-blur-md">
          {category}
        </span>
        <span className="text-[10px] text-white/70 font-mono">{date}</span>
      </div>
      <h3 className="text-xl md:text-2xl font-bold text-white mb-1 group-hover:text-cyan-300 transition-colors">{title}</h3>
    </div>
  </div>
);

// --- MAIN PAGE ---

export default function Home() {
  const [isLaunched, setIsLaunched] = useState(false);

  return (
    <main className="min-h-screen w-full bg-[#020617] text-white selection:bg-cyan-500/30 overflow-x-hidden">
      
      {/* === INTRO OVERLAY === */}
      <AnimatePresence mode="wait">
        {!isLaunched && (
          <motion.div
            key="intro"
            exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
          >
             <div className="w-full h-full absolute inset-0">
               <IntroNetwork onStart={() => setIsLaunched(true)} />
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* === MAIN CONTENT === */}
      {isLaunched && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative w-full"
        >
          {/* NAVBAR */}
          <Navbar />

          {/* --- HERO SECTION --- */}
          <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden py-20">
            <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
               <Hero3D /> 
            </div>
            
            <div className="relative z-10 text-center px-4 w-full max-w-5xl mx-auto mt-10 md:mt-0">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/30 border border-cyan-500/30 mb-8 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs font-mono text-cyan-400 tracking-wider">FAKULTAS TEKNOLOGI INFORMASI</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl lg:text-9xl font-black tracking-tighter mb-8 leading-[0.9]">
                <span className="block text-white drop-shadow-2xl">HIMATIKA</span>
                <span className="block text-2xl md:text-5xl lg:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-blue-800 via-blue-500 to-cyan-300 mt-2 font-bold tracking-normal drop-shadow-[0_0_10px_rgba(6,182,212,0.6)]">
                  UNU YOGYAKARTA
                </span>
              </h1>
              
              <p className="text-base md:text-xl text-neutral-400 max-w-2xl mx-auto mb-12 leading-relaxed font-light px-4">
                Wadah kolaborasi mahasiswa Informatika untuk mengembangkan 
                <span className="text-white"> Hard Skill</span>, 
                <span className="text-white"> Soft Skill</span>, dan 
                <span className="text-white"> Teknologi</span> masa depan.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full px-6">
                <div className="w-full sm:w-auto flex justify-center">
                   <MagicButton title="Join Us" icon={<UserPlus size={18} />} position="right" />
                </div>
                <a href="#about" className="h-12 w-full sm:w-auto px-8 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 hover:border-cyan-500/30 transition-all font-medium backdrop-blur-sm text-sm tracking-wide flex items-center justify-center group cursor-pointer">
                  <span className="group-hover:text-cyan-300 transition-colors flex items-center gap-2">
                    <Info size={16} /> Tentang Kami
                  </span>
                </a>
              </div>
            </div>
            
            {/* Scroll Indicator */}
            <motion.div 
               initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
               className="absolute bottom-10 flex flex-col items-center gap-2 opacity-50 z-10 pointer-events-none"
            >
              <span className="text-[10px] tracking-widest uppercase">Scroll Down</span>
              <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent" />
            </motion.div>
          </section>

          {/* --- SECTION: VISI & MISI (Tech HUD Style) --- */}
          <section id="visi-misi" className="py-24 px-6 relative bg-[#02040a]">
            {/* Background Grid Halus */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f29372e_1px,transparent_1px),linear-gradient(to_bottom,#1f29372e_1px,transparent_1px)] bg-[size:2rem_2rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

            <div className="max-w-6xl mx-auto relative z-10">
              
              {/* Section Header */}
              <div className="text-center mb-16">
                 <div className="inline-flex items-center gap-2 mb-2 px-3 py-1 rounded-sm bg-cyan-950/30 border border-cyan-500/20 text-cyan-400 font-mono text-[10px] tracking-widest uppercase">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"/>
                    System_Core_Values
                 </div>
                 <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
                    Visi & Misi
                 </h2>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* --- KARTU VISI (HUD Style) --- */}
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="group relative p-8 md:p-10 bg-[#050a14] border border-white/5 overflow-hidden transition-all hover:border-cyan-500/50"
                >
                   {/* HUD Corner Accents (Hiasan Sudut) */}
                   <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-500/50 rounded-tl-lg group-hover:w-full group-hover:h-full group-hover:rounded-none group-hover:border-cyan-500/20 transition-all duration-500" />
                   <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan-500/50 rounded-br-lg group-hover:w-full group-hover:h-full group-hover:rounded-none group-hover:border-cyan-500/20 transition-all duration-500" />

                   {/* Label Tech */}
                   <div className="flex items-center justify-between mb-8">
                      <div className="flex items-center gap-3">
                         <div className="p-2 bg-cyan-500/10 rounded border border-cyan-500/20 text-cyan-400">
                           <Target size={24} />
                         </div>
                         <h3 className="text-2xl font-bold text-white tracking-wide">VISI KAMI</h3>
                      </div>
                      <span className="font-mono text-xs text-neutral-600 group-hover:text-cyan-400 transition-colors">DIR_V1.0</span>
                   </div>

                   {/* Konten Visi */}
                   <p className="text-xl md:text-2xl font-light text-neutral-300 leading-relaxed relative z-10">
                     "Menjadikan HIMATIKA sebagai sentra inovasi digital yang <span className="text-cyan-400 font-medium">Progresif</span>, <span className="text-blue-400 font-medium">Adaptif</span>, dan berlandaskan nilai <span className="text-green-400 font-medium">Aswaja</span>."
                   </p>

                   {/* Background Glow Halus */}
                   <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-cyan-500/10 blur-[80px] group-hover:bg-cyan-500/20 transition-all" />
                </motion.div>


                {/* --- KARTU MISI (List Style) --- */}
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="group relative p-8 md:p-10 bg-[#050a14] border border-white/5 overflow-hidden transition-all hover:border-purple-500/50"
                >
                   {/* HUD Corner Accents */}
                   <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-purple-500/50 rounded-tr-lg group-hover:w-full group-hover:h-full group-hover:rounded-none group-hover:border-purple-500/20 transition-all duration-500" />
                   <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-purple-500/50 rounded-bl-lg group-hover:w-full group-hover:h-full group-hover:rounded-none group-hover:border-purple-500/20 transition-all duration-500" />

                   {/* Label Tech */}
                   <div className="flex items-center justify-between mb-8">
                      <div className="flex items-center gap-3">
                         <div className="p-2 bg-purple-500/10 rounded border border-purple-500/20 text-purple-400">
                           <Compass size={24} />
                         </div>
                         <h3 className="text-2xl font-bold text-white tracking-wide">MISI KAMI</h3>
                      </div>
                      <span className="font-mono text-xs text-neutral-600 group-hover:text-purple-400 transition-colors">EXEC_PROTOCOLS</span>
                   </div>

                   {/* List Misi */}
                   <ul className="space-y-5 relative z-10">
                      {[
                        "Mengembangkan potensi akademik dan soft-skill mahasiswa.",
                        "Membangun kolaborasi strategis dengan industri teknologi.",
                        "Mewadahi aspirasi mahasiswa secara inklusif dan solutif.",
                        "Menciptakan budaya organisasi yang profesional & kekeluargaan."
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-4 group/item">
                          {/* Custom Bullet Point: Terminal Prompt Style */}
                          <div className="mt-1 font-mono text-purple-500 text-xs opacity-50 group-hover/item:opacity-100 group-hover/item:translate-x-1 transition-all">
                            {`0${i+1} >`}
                          </div>
                          <p className="text-neutral-400 group-hover/item:text-neutral-200 transition-colors">
                            {item}
                          </p>
                        </li>
                      ))}
                   </ul>

                    {/* Background Glow Halus */}
                   <div className="absolute -top-20 -left-20 w-64 h-64 bg-purple-500/10 blur-[80px] group-hover:bg-purple-500/20 transition-all" />
                </motion.div>

              </div>
            </div>
          </section>

          {/* --- SECTION: SAMBUTAN KETUA --- */}
          <section id="about" className="py-20 px-6 relative bg-black/30 border-y border-white/5">
             <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
                <motion.div 
                  initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                  className="relative group mx-auto md:mx-0 max-w-md w-full"
                >
                  <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-2xl opacity-20 blur-xl group-hover:opacity-40 transition-opacity" />
                  <div className="relative aspect-[3/4] md:aspect-[4/5] rounded-2xl overflow-hidden border border-white/10 bg-neutral-900">
                    <div className="absolute inset-0 bg-gradient-to-b from-neutral-800 to-black flex items-center justify-center text-neutral-600">
                       <Users size={64} opacity={0.5} />
                       <span className="absolute bottom-10 font-mono text-xs tracking-widest">FOTO KETUA</span>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                   initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                   className="text-center md:text-left"
                >
                  <div className="flex justify-center md:justify-start">
                    <Quote className="text-cyan-500 mb-6" size={48} />
                  </div>
                  <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                    "Mencetak Generasi <span className="text-cyan-400">Informatika</span> yang Berkompeten."
                  </h2>
                  <p className="text-neutral-400 text-lg leading-relaxed mb-8">
                    Selamat datang di website resmi HIMATIKA UNU Yogyakarta. 
                    Kami berkomitmen menjadi rumah bagi ide-ide liar dan inovasi teknologi. 
                    Di sini, baris kode bukan sekadar tugas kuliah, tapi alat untuk mengubah dunia.
                  </p>
                  
                  <div className="flex items-center justify-center md:justify-start gap-4">
                    <div className="w-12 h-[1px] bg-white/20" />
                    <div>
                      <h4 className="font-bold text-white">Nama Ketua Hima</h4>
                      <p className="text-xs text-cyan-400 font-mono">KETUA HIMATIKA 2025/2026</p>
                    </div>
                  </div>
                </motion.div>
             </div>
          </section>

          {/* --- SECTION BARU: DEPARTEMEN --- */}
          <section id="departemen" className="py-20 px-6 bg-[#020617]">
            <div className="max-w-6xl mx-auto">
              <SectionHeading title="Our Departments" subtitle="STRUKTUR ORGANISASI" />
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {DEPARTEMEN.map((dept, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-cyan-500/30 transition-all group cursor-default"
                  >
                    <div className={`w-12 h-12 rounded-lg bg-black/50 border border-white/10 flex items-center justify-center mb-4 ${dept.color} group-hover:scale-110 transition-transform`}>
                      <dept.icon size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{dept.name}</h3>
                    <p className="text-sm text-neutral-400">{dept.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

           {/* --- SECTION BARU: KETUA DARI MASA KE MASA (TIMELINE) --- */}
           <section className="py-20 px-6 bg-black/50 border-y border-white/5 overflow-hidden">
            <div className="max-w-6xl mx-auto">
              <SectionHeading title="Hall of Fame" subtitle="KETUA DARI MASA KE MASA" />
              
              <div className="relative">
                {/* Garis Timeline */}
                <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent -translate-y-1/2 hidden md:block" />
                
                <div className="flex overflow-x-auto pb-8 pt-4 gap-8 md:justify-center no-scrollbar snap-x">
                  {PAST_CHAIRMEN.map((item, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="snap-center shrink-0 w-[200px] flex flex-col items-center text-center group"
                    >
                      <div className="w-24 h-24 rounded-full border-2 border-white/10 bg-neutral-900 overflow-hidden mb-4 relative z-10 group-hover:border-cyan-500 transition-colors shadow-2xl">
                         {/* Placeholder Avatar */}
                         <div className="w-full h-full flex items-center justify-center bg-neutral-800 text-neutral-500">
                           <Users size={32} />
                         </div>
                      </div>
                      <div className="px-3 py-1 rounded-full bg-cyan-950/50 border border-cyan-500/20 text-[10px] text-cyan-400 font-mono mb-2">
                        {item.year}
                      </div>
                      <h4 className="font-bold text-white text-sm">{item.name}</h4>
                      <p className="text-xs text-neutral-500 mt-1">Kabinet {item.period}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* --- SECTION 3: KEUNGGULAN (EXISTING) --- */}
          <section className="py-20 px-6 bg-[#020617] relative">
            <div className="max-w-6xl mx-auto">
              <SectionHeading title="Why Join Us?" subtitle="KEUNGGULAN & MANFAAT" />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-fr">
                <BentoCard 
                  className="md:col-span-2 md:row-span-2 bg-gradient-to-br from-neutral-900 to-black"
                  title="Practical Learning Ecosystem" 
                  desc="Kami tidak hanya belajar teori. HIMATIKA menyediakan lab mini, server playground, dan proyek nyata (Real-world Projects) untuk mengasah skill codingmu."
                  icon={Code2} delay={1}
                />
                <BentoCard title="Career Networking" desc="Terhubung dengan alumni yang bekerja di Unicorn dan Startup teknologi." icon={Users} delay={2} />
                <BentoCard title="Tech Workshops" desc="Rutin mengadakan workshop React, Python, IoT, dan UI/UX setiap bulan." icon={Zap} delay={3} />
                <BentoCard className="md:col-span-3" title="Internal Competitions" desc="Asah mental juara melalui Hackathon internal dan lomba CTF (Capture The Flag)." icon={Trophy} delay={4} />
              </div>
            </div>
          </section>

          {/* --- SECTION 4: PROKER UTAMA (EXISTING) --- */}
          <section id="proker" className="py-20 px-6 bg-[#020617]">
             <div className="max-w-6xl mx-auto">
                <SectionHeading title="Flagship Programs" subtitle="PROGRAM KERJA UNGGULAN" />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <ProjectCard title="INFORMATALKS 2026" category="SEMINAR" date="Coming Soon" image="from-blue-600 to-cyan-500" />
                  <ProjectCard title="MAKRAB & Social" category="GATHERING" date="Oct 2025" image="from-purple-600 to-indigo-500" />
                  <ProjectCard title="Study Banding Tech" category="VISIT" date="Dec 2025" image="from-emerald-600 to-teal-500" />
                </div>

                <div className="mt-12 text-center">
                  <button className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-mono text-sm border-b border-cyan-500/30 pb-1 hover:border-cyan-400 transition-all">
                    LIHAT SEMUA AGENDA <ArrowRight size={14} />
                  </button>
                </div>
             </div>
          </section>

          {/* FOOTER */}
          <Footer />

        </motion.div>
      )}
    </main>
  );
}