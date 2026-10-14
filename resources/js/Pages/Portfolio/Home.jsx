import React, { useState } from 'react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { 
    Flame, 
    ArrowRight, 
    Download, 
    Mail, 
    MapPin, 
    Phone, 
    ExternalLink, 
    CheckCircle2, 
    AlertCircle, 
    Cpu, 
    Layers, 
    Compass, 
    Settings, 
    GraduationCap, 
    Target, 
    Send, 
    FolderKanban, 
    Wrench, 
    Star, 
    ChevronRight, 
    Menu, 
    X, 
    ShieldCheck, 
    FileText, 
    Eye 
} from 'lucide-react';

const LinkedinIcon = (props) => (
    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
        <rect x="2" y="9" width="4" height="12"></rect>
        <circle cx="4" cy="4" r="2"></circle>
    </svg>
);

export default function Home({ profile, projects = [], skills = [], experiences = [] }) {
    const { flash, auth } = usePage().props;
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedSkillCategory, setSelectedSkillCategory] = useState('All');
    const [activeModalProject, setActiveModalProject] = useState(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Contact Form
    const { data, setData, post, processing, errors, reset, recentlySuccessful } = useForm({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const handleContactSubmit = (e) => {
        e.preventDefault();
        post('/contact', {
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    };

    // Filter projects
    const projectCategories = ['All', 'Piping Engineering', 'Design & CAD', 'Analysis & Simulation'];
    const filteredProjects = selectedCategory === 'All' 
        ? projects 
        : projects.filter(p => p.category === selectedCategory);

    // Filter skills
    const skillCategories = ['All', 'Design & CAD', 'Analysis & Simulation', 'Engineering Focus', 'Soft Skills'];
    const filteredSkills = selectedSkillCategory === 'All'
        ? skills
        : skills.filter(s => s.category === selectedSkillCategory);

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-cyan-500 selection:text-slate-950 relative overflow-x-hidden">
            <Head>
                <title>{`${profile?.full_name || 'Achmad Daffa Ihtifazuddin'} - Mechanical & Piping Engineering Portfolio`}</title>
                <meta name="description" content="Portfolio of Achmad Daffa Ihtifazuddin. Mechanical Engineering Technology student at UGM specializing in Piping Engineering, P&ID, SolidWorks, and ANSYS FEA Simulation." />
            </Head>

            {/* Background Grid Pattern & Ambient Glows */}
            <div className="absolute inset-0 bg-grid-pattern opacity-70 pointer-events-none"></div>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-cyan-600/15 via-blue-600/10 to-transparent blur-3xl pointer-events-none"></div>
            <div className="absolute top-[1200px] right-0 w-[500px] h-[500px] bg-amber-500/5 blur-3xl pointer-events-none"></div>

            {/* Navigation Bar */}
            <header className="sticky top-0 z-50 glass-panel border-b border-slate-800/80 transition-all">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    {/* Brand */}
                    <a href="#" className="flex items-center space-x-3 group">
                        <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
                            <Flame className="w-5 h-5 text-slate-950" />
                        </div>
                        <div>
                            <span className="font-extrabold text-lg tracking-tight text-white block group-hover:text-cyan-400 transition">
                                Portfolio
                            </span>
                        </div>
                    </a>

                    {/* Desktop Navigation Links */}
                    <nav className="hidden lg:flex items-center space-x-8 text-sm font-medium text-slate-300">
                        <a href="#about" className="hover:text-cyan-400 transition">About</a>
                        <a href="#skills" className="hover:text-cyan-400 transition">Technical Skills</a>
                        <a href="#projects" className="hover:text-cyan-400 transition">Projects & CAD</a>
                        <a href="#education" className="hover:text-cyan-400 transition">Education</a>
                        <Link href="/cv" className="text-cyan-400 font-bold hover:text-cyan-300 transition flex items-center space-x-1 bg-cyan-950/40 px-3 py-1 rounded-lg border border-cyan-500/30">
                            <FileText className="w-3.5 h-3.5" />
                            <span>Curriculum Vitae</span>
                        </Link>
                        <a href="#contact" className="hover:text-cyan-400 transition">Contact</a>
                    </nav>

                    {/* Action buttons */}
                    <div className="hidden lg:flex items-center space-x-4">
                        {auth?.user ? (
                            <Link
                                href="/admin/dashboard"
                                className="px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 transition"
                            >
                                Admin Dashboard
                            </Link>
                        ) : (
                            <Link
                                href="/login"
                                className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-slate-400 hover:text-slate-200 hover:bg-slate-900 border border-slate-800 transition"
                            >
                                Admin Login
                            </Link>
                        )}

                        <a
                            href="#contact"
                            className="px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition shadow-lg shadow-cyan-500/25"
                        >
                            Hire / Connect
                        </a>
                    </div>

                    {/* Mobile Hamburger */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="lg:hidden p-2 rounded-xl bg-slate-900 text-slate-300 border border-slate-800"
                    >
                        {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>

                {/* Mobile Menu Dropdown */}
                {mobileMenuOpen && (
                    <div className="lg:hidden bg-slate-900/95 border-b border-slate-800 px-6 py-5 space-y-4">
                        <div className="flex flex-col space-y-3 text-sm font-medium">
                            <a href="#about" onClick={() => setMobileMenuOpen(false)} className="hover:text-cyan-400">About</a>
                            <a href="#skills" onClick={() => setMobileMenuOpen(false)} className="hover:text-cyan-400">Technical Skills</a>
                            <a href="#projects" onClick={() => setMobileMenuOpen(false)} className="hover:text-cyan-400">Projects & CAD</a>
                            <a href="#education" onClick={() => setMobileMenuOpen(false)} className="hover:text-cyan-400">Education</a>
                            <Link href="/cv" onClick={() => setMobileMenuOpen(false)} className="text-cyan-400 font-bold flex items-center space-x-1.5">
                                <FileText className="w-4 h-4" />
                                <span>Curriculum Vitae</span>
                            </Link>
                            <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="hover:text-cyan-400">Contact</a>
                        </div>
                        <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                            {auth?.user ? (
                                <Link href="/admin/dashboard" className="text-xs font-bold text-cyan-400">Admin Dashboard</Link>
                            ) : (
                                <Link href="/login" className="text-xs text-slate-400">Admin Login</Link>
                            )}
                            <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="px-4 py-2 rounded-lg bg-cyan-500 text-slate-950 text-xs font-bold">
                                Contact
                            </a>
                        </div>
                    </div>
                )}
            </header>

            {/* HERO SECTION */}
            <section className="relative pt-12 pb-20 md:pt-20 md:pb-32 px-6">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    {/* Left Column: Bio Details */}
                    <div className="lg:col-span-7 space-y-6">
                        {/* Live Seeking Internship Badge */}
                        <div className="inline-flex items-center space-x-2.5 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold">
                            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
                            <span>{profile?.hero_badge || 'Seeking an internship in the oil & gas industry'}</span>
                        </div>

                        <div className="space-y-3">
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
                                {profile?.full_name || 'Achmad Daffa Ihtifazuddin'}
                            </h1>
                            <p className="text-lg sm:text-xl font-medium text-cyan-400 tracking-wide">
                                {profile?.headline || 'Mechanical Engineering Student | Piping Engineering Enthusiast'}
                            </p>
                            <p className="text-sm font-mono text-slate-400">
                                📍 {profile?.location || 'Karanganyar, Jawa Tengah, Indonesia'}
                            </p>
                        </div>

                        <p className="text-base text-slate-300 leading-relaxed max-w-2xl">
                            {profile?.bio_summary || 'Mahasiswa Teknik Mesin Universitas Gadjah Mada semester 5 dengan peminatan Piping Engineering. Mampu membaca dan membuat P&ID, serta berpengalaman menggunakan SolidWorks, AutoCAD, Fusion 360, ANSYS, dan Abaqus untuk desain mekanik, desain manufaktur, dan Finite Element Analysis (FEA). Siap berkontribusi dan terus berkembang melalui program magang.'}
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-wrap items-center gap-4 pt-3">
                            <Link
                                href="/cv"
                                className="px-6 py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm tracking-wide transition shadow-xl shadow-cyan-500/25 flex items-center space-x-2"
                            >
                                <FileText className="w-4 h-4" />
                                <span>Buka Halaman CV</span>
                            </Link>

                            <a
                                href="#projects"
                                className="px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold text-sm transition flex items-center space-x-2"
                            >
                                <span>Lihat Proyek & CAD</span>
                                <ArrowRight className="w-4 h-4" />
                            </a>

                            <a
                                href="#contact"
                                className="px-5 py-3.5 rounded-xl bg-slate-900/60 hover:bg-slate-800 text-slate-300 border border-slate-800 font-medium text-sm transition flex items-center space-x-2"
                            >
                                <Mail className="w-4 h-4 text-cyan-400" />
                                <span>Kontak</span>
                            </a>

                            {profile?.drive_portfolio_url && (
                                <a
                                    href={profile.drive_portfolio_url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="px-4 py-3.5 rounded-xl bg-cyan-950/40 hover:bg-cyan-900/40 text-cyan-300 border border-cyan-800/40 text-xs font-semibold flex items-center space-x-2 transition"
                                >
                                    <ExternalLink className="w-4 h-4" />
                                    <span>Drive CAD Portfolio</span>
                                </a>
                            )}
                        </div>

                        {/* Quick tags */}
                        <div className="pt-4 flex flex-wrap gap-2 text-xs font-mono text-slate-400">
                            <span className="px-3 py-1 rounded-lg bg-slate-900/80 border border-slate-800">ASME B31.3 Piping</span>
                            <span className="px-3 py-1 rounded-lg bg-slate-900/80 border border-slate-800">P&ID Development</span>
                            <span className="px-3 py-1 rounded-lg bg-slate-900/80 border border-slate-800">SolidWorks 3D CAD</span>
                            <span className="px-3 py-1 rounded-lg bg-slate-900/80 border border-slate-800">ANSYS FEA Stress</span>
                        </div>
                    </div>

                    {/* Right Column: Blueprint CAD Interactive Card */}
                    <div className="lg:col-span-5 relative">
                        <div className="relative rounded-3xl glass-card border border-cyan-500/30 p-6 md:p-8 space-y-6 shadow-2xl overflow-hidden group">
                            {/* Ambient Top Glow */}
                            <div className="absolute -top-20 -right-20 w-44 h-44 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none"></div>

                            {/* Blueprint Card Header */}
                            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                                <div className="flex items-center space-x-3">
                                    <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
                                    <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                                    <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
                                    <span className="text-xs font-mono text-slate-400 pl-2">UGM-ENG-SYS-05</span>
                                </div>
                                <span className="text-[11px] font-mono font-bold text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded border border-cyan-500/20">
                                    VERIFIED TECH
                                </span>
                            </div>

                            {/* Engineering Schematic Highlight */}
                            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
                                <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                                    <span>FOCUS DISCIPLINE</span>
                                    <span className="text-cyan-400 font-bold">OIL & GAS SPEC</span>
                                </div>
                                <div className="text-lg font-bold text-white tracking-wide">
                                    {profile?.focus_area || 'Piping Engineering & P&ID Design'}
                                </div>
                                <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                                    {profile?.bio_summary || 'Spesialisasi dalam perutean pipa proses, standardisasi diagram alir P&ID, simulasi tegangan elemen hingga (FEA), dan pemodelan CAD parametrik 3D.'}
                                </p>
                            </div>

                            {/* Key Performance Indicators */}
                            <div className="grid grid-cols-2 gap-3 font-mono">
                                <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
                                    <span className="text-[10px] text-slate-400 block uppercase">CAD & Tools</span>
                                    <span className="text-xl font-extrabold text-cyan-300">{skills.filter(s => s.category === 'Design & CAD').length || 3}+ CAD</span>
                                    <span className="text-[10px] text-slate-500 block truncate">SolidWorks & AutoCAD</span>
                                </div>
                                <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
                                    <span className="text-[10px] text-slate-400 block uppercase">FEA Analysis</span>
                                    <span className="text-xl font-extrabold text-amber-300">{skills.filter(s => s.category === 'Analysis & Simulation').length || 3}+ FEA</span>
                                    <span className="text-[10px] text-slate-500 block truncate">ANSYS & Abaqus</span>
                                </div>
                                <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
                                    <span className="text-[10px] text-slate-400 block uppercase">Institution</span>
                                    <span className="text-xl font-extrabold text-emerald-300 truncate block">UGM</span>
                                    <span className="text-[10px] text-slate-500 block truncate">{profile?.semester || 'Semester 5'}</span>
                                </div>
                                <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
                                    <span className="text-[10px] text-slate-400 block uppercase">Industry Target</span>
                                    <span className="text-xl font-extrabold text-white truncate block">Oil & Gas</span>
                                    <span className="text-[10px] text-slate-500 block truncate">Internship Ready</span>
                                </div>
                            </div>

                            {/* Bottom Blueprint Footer */}
                            <div className="pt-2 flex items-center justify-between text-[11px] font-mono text-slate-400">
                                <span className="flex items-center space-x-1.5">
                                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                                    <span>ASME & API Standard Driven</span>
                                </span>
                                <span className="text-cyan-400 font-bold">{profile?.semester || 'Semester 5'} Active</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ABOUT ME SECTION */}
            <section id="about" className="py-20 px-6 border-t border-slate-900 bg-slate-950/60 relative">
                <div className="max-w-7xl mx-auto space-y-12">
                    <div className="text-center space-y-3 max-w-2xl mx-auto">
                        <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
                            About Me
                        </span>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                            Profil & Filosofi Rekayasa
                        </h2>
                        <p className="text-sm text-slate-400">
                            Membangun sistem mekanis yang efisien, andal, dan aman melalui pendekatan analitis dan simulasi digital modern.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="p-6 rounded-2xl glass-card border border-slate-800 hover:border-cyan-500/40 transition space-y-4">
                            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
                                <Layers className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-bold text-white">Piping & P&ID Precision</h3>
                            <p className="text-sm text-slate-400 leading-relaxed">
                                Berfokus pada perancangan diagram instrumentasi dan perpipaan (P&ID) serta tata letak 3D spool pipa dengan mengacu pada standar industri minyak & gas seperti ASME B31.3.
                            </p>
                        </div>

                        <div className="p-6 rounded-2xl glass-card border border-slate-800 hover:border-amber-500/40 transition space-y-4">
                            <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
                                <Cpu className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-bold text-white">FEA & Computational Analysis</h3>
                            <p className="text-sm text-slate-400 leading-relaxed">
                                Menggunakan perangkat lunak ANSYS Mechanical dan Abaqus untuk menganalisis tegangan von Mises, ekspansi termal flens pipa, dan verifikasi faktor keamanan sebelum fabrikasi.
                            </p>
                        </div>

                        <div className="p-6 rounded-2xl glass-card border border-slate-800 hover:border-emerald-500/40 transition space-y-4">
                            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                                <Settings className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-bold text-white">Design for Manufacturing (DFM)</h3>
                            <p className="text-sm text-slate-400 leading-relaxed">
                                Menguasai SolidWorks, Fusion 360, dan AutoCAD untuk menghasilkan gambar kerja ortogonal, simbol pengelasan presisi, toleransi geometri (GD&T), dan BOM cut list.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* TECHNICAL SKILLS MATRIX */}
            <section id="skills" className="py-20 px-6 border-t border-slate-900 bg-slate-900/30">
                <div className="max-w-7xl mx-auto space-y-12">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div className="space-y-3">
                            <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
                                Engineering Capabilities
                            </span>
                            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                                Matriks Keahlian & Software
                            </h2>
                            <p className="text-sm text-slate-400 max-w-xl">
                                Keterampilan perangkat lunak teknik, analisis simulasi, perancangan perpipaan, dan soft skills kolaboratif yang terasah di UGM.
                            </p>
                        </div>

                        {/* Skill Category Pills */}
                        <div className="flex flex-wrap gap-2">
                            {skillCategories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedSkillCategory(cat)}
                                    className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition ${
                                        selectedSkillCategory === cat
                                            ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                                            : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                                    }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Skills Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredSkills.map((skill) => (
                            <div
                                key={skill.id}
                                className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800/90 hover:border-cyan-500/40 transition space-y-3 group"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <span className="text-[10px] font-mono uppercase text-cyan-400 font-semibold">{skill.category}</span>
                                        <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition">{skill.name}</h3>
                                    </div>
                                    <span className="text-sm font-mono font-bold text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-lg border border-cyan-500/20">
                                        {skill.proficiency}%
                                    </span>
                                </div>

                                {/* Progress bar */}
                                <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden p-0.5 border border-slate-800">
                                    <div
                                        className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full rounded-full transition-all duration-700 ease-out"
                                        style={{ width: `${skill.proficiency}%` }}
                                    ></div>
                                </div>

                                {skill.description && (
                                    <p className="text-xs text-slate-400 leading-relaxed pt-1">
                                        {skill.description}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ENGINEERING PROJECTS & CASE STUDIES */}
            <section id="projects" className="py-20 px-6 border-t border-slate-900 bg-slate-950">
                <div className="max-w-7xl mx-auto space-y-12">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div className="space-y-3">
                            <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
                                Portfolio Showcase
                            </span>
                            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                                Proyek Rekayasa & Studi Kasus
                            </h2>
                            <p className="text-sm text-slate-400 max-w-xl">
                                Implementasi nyata perancangan P&ID, simulasi beban fluida dan tegangan flens, serta permodelan CAD 3D spool pipa offshore.
                            </p>
                        </div>

                        {/* Project Category Filter */}
                        <div className="flex flex-wrap gap-2">
                            {projectCategories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${
                                        selectedCategory === cat
                                            ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20 font-bold'
                                            : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                                    }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Projects Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredProjects.map((project) => (
                            <div
                                key={project.id}
                                className="rounded-3xl glass-card border border-slate-800/90 hover:border-cyan-500/50 transition-all flex flex-col justify-between overflow-hidden group shadow-xl hover:shadow-cyan-500/5"
                            >
                                <div>
                                    {/* Project Image */}
                                    <div className="relative aspect-video overflow-hidden bg-slate-900">
                                        {project.image_url ? (
                                            <img
                                                src={project.image_url}
                                                alt={project.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-950 text-cyan-400 font-mono text-sm">
                                                CAD / FEA Model
                                            </div>
                                        )}

                                        <div className="absolute top-3 left-3 flex items-center gap-2">
                                            <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-slate-950/80 backdrop-blur-md text-cyan-300 border border-cyan-500/30">
                                                {project.category}
                                            </span>
                                            {project.year && (
                                                <span className="px-2 py-1 rounded-lg text-[10px] font-mono bg-slate-950/80 backdrop-blur-md text-slate-300 border border-slate-800">
                                                    {project.year}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Card Content */}
                                    <div className="p-6 space-y-4">
                                        <div className="space-y-1.5">
                                            {project.role && (
                                                <span className="text-xs font-semibold text-slate-400 block font-mono">
                                                    Role: {project.role}
                                                </span>
                                            )}
                                            <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition leading-snug">
                                                {project.title}
                                            </h3>
                                        </div>

                                        <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                                            {project.description}
                                        </p>

                                        {/* CV-Style Problem & Result Highlights */}
                                        {project.result && (
                                            <div className="p-3 rounded-xl bg-slate-950/60 border border-emerald-500/20 text-xs text-emerald-300 font-mono space-y-1">
                                                <span className="text-[10px] text-slate-400 uppercase block">Engineered Outcome:</span>
                                                <p className="line-clamp-2">{project.result}</p>
                                            </div>
                                        )}

                                        {/* Tools badge list */}
                                        {project.tools && (
                                            <div className="flex flex-wrap gap-1.5 pt-1">
                                                {project.tools.split(',').map((tool, idx) => (
                                                    <span key={idx} className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800 text-slate-300 border border-slate-700/60">
                                                        {tool.trim()}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Card Footer Actions */}
                                <div className="p-6 pt-0 border-t border-slate-800/60 mt-4 flex items-center justify-between gap-3">
                                    <button
                                        onClick={() => setActiveModalProject(project)}
                                        className="inline-flex items-center space-x-1.5 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition"
                                    >
                                        <Eye className="w-3.5 h-3.5" />
                                        <span>Detail Cepat</span>
                                    </button>

                                    <div className="flex items-center space-x-2">
                                        {project.drive_url && (
                                            <a
                                                href={project.drive_url}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
                                                title="Buka File Drive"
                                            >
                                                <ExternalLink className="w-3.5 h-3.5" />
                                            </a>
                                        )}
                                        <Link
                                            href={`/projects/${project.slug}`}
                                            className="px-3.5 py-1.5 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-300 border border-cyan-500/30 text-xs font-semibold flex items-center space-x-1 transition"
                                        >
                                            <span>Studi Kasus</span>
                                            <ChevronRight className="w-3.5 h-3.5" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* EDUCATION & JOURNEY */}
            <section id="education" className="py-20 px-6 border-t border-slate-900 bg-slate-900/20">
                <div className="max-w-5xl mx-auto space-y-12">
                    <div className="text-center space-y-3">
                        <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
                            Academic & Experience
                        </span>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                            Pendidikan & Riwayat Perjalanan
                        </h2>
                        <p className="text-sm text-slate-400">
                            Komitmen akademik dan dedikasi praktis di Universitas Gadjah Mada serta organisasi teknik.
                        </p>
                    </div>

                    <div className="relative pl-6 md:pl-8 border-l border-slate-800 space-y-8">
                        {experiences.map((exp) => (
                            <div key={exp.id} className="relative group">
                                {/* Dot on timeline */}
                                <div className="absolute -left-[31px] md:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-cyan-500 ring-4 ring-slate-950 group-hover:scale-125 transition-transform"></div>

                                <div className="p-6 rounded-2xl glass-card border border-slate-800 hover:border-cyan-500/30 transition space-y-2">
                                    <div className="flex flex-wrap items-center justify-between gap-2">
                                        <span className="text-xs font-mono text-cyan-400 font-semibold">{exp.period}</span>
                                        {exp.location && (
                                            <span className="text-xs text-slate-500 font-mono">{exp.location}</span>
                                        )}
                                    </div>

                                    <h3 className="text-lg font-bold text-white">{exp.title}</h3>
                                    <p className="text-sm font-medium text-slate-300">{exp.organization}</p>
                                    
                                    {exp.description && (
                                        <p className="text-xs text-slate-400 leading-relaxed pt-2">
                                            {exp.description}
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* GOALS & ASPIRATIONS */}
            <section id="goals" className="py-20 px-6 border-t border-slate-900 bg-slate-950 relative">
                <div className="max-w-5xl mx-auto space-y-12">
                    <div className="text-center space-y-3">
                        <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
                            Vision & Purpose
                        </span>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                            Goals & Aspirations
                        </h2>
                        <p className="text-sm text-slate-400">
                            Komitmen jangka panjang untuk industri keteknikan dan kemajuan teknologi nasional Indonesia.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="p-8 rounded-3xl glass-card border border-cyan-500/20 space-y-4 relative overflow-hidden">
                            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center font-bold">
                                <GraduationCap className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-white">Target Semasa Studi (Academic)</h3>
                            <p className="text-sm text-slate-300 leading-relaxed">
                                {profile?.goals_academic || 'During my studies, I aim to excel academically, take an active role in organizations and committees, and join engineering competitions.'}
                            </p>
                        </div>

                        <div className="p-8 rounded-3xl glass-card border border-amber-500/20 space-y-4 relative overflow-hidden">
                            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold">
                                <Target className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-white">Aspirasi Karir (Career Vision)</h3>
                            <p className="text-sm text-slate-300 leading-relaxed">
                                {profile?.goals_career || 'My career aspiration is to become a professional mechanical engineer or an industrial leader who contributes to technological advancement in Indonesia, solving real-world challenges with integrity and dedication to the nation.'}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CONTACT & RECRUITER INQUIRIES */}
            <section id="contact" className="py-20 px-6 border-t border-slate-900 bg-slate-900/40 relative">
                <div className="max-w-7xl mx-auto space-y-12">
                    <div className="text-center space-y-3 max-w-2xl mx-auto">
                        <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
                            Get In Touch
                        </span>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                            Hubungi Achmad Daffa
                        </h2>
                        <p className="text-sm text-slate-400">
                            Terbuka untuk kesempatan magang (internship) di sektor Oil & Gas, kolaborasi rekayasa perpipaan, dan proyek CAD/FEA simulation.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                        {/* Left: Contact Info Cards */}
                        <div className="lg:col-span-5 space-y-4">
                            <div className="p-6 rounded-2xl glass-card border border-slate-800 space-y-4">
                                <h3 className="text-base font-bold text-white">Informasi Kontak Langsung</h3>
                                
                                <div className="space-y-4 text-sm">
                                    <div className="flex items-start space-x-3 text-slate-300">
                                        <Mail className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                                        <div>
                                            <span className="text-xs text-slate-500 block">Email:</span>
                                            <a href={`mailto:${profile?.email}`} className="text-white hover:text-cyan-400 font-medium transition">
                                                {profile?.email || 'daffaihtifazuddin@ugm.ac.id'}
                                            </a>
                                        </div>
                                    </div>

                                    {profile?.phone && (
                                        <div className="flex items-start space-x-3 text-slate-300">
                                            <Phone className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                                            <div>
                                                <span className="text-xs text-slate-500 block">Telepon / WhatsApp:</span>
                                                <span className="text-white font-medium">{profile.phone}</span>
                                            </div>
                                        </div>
                                    )}

                                    <div className="flex items-start space-x-3 text-slate-300">
                                        <MapPin className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                                        <div>
                                            <span className="text-xs text-slate-500 block">Lokasi:</span>
                                            <span className="text-white font-medium">{profile?.location || 'Central Java / Yogyakarta, Indonesia'}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Social / External Links */}
                            <div className="p-6 rounded-2xl glass-card border border-slate-800 space-y-3">
                                <h3 className="text-base font-bold text-white">Tautan Portofolio Digital</h3>
                                <div className="space-y-2 pt-1">
                                    {profile?.linkedin_url && (
                                        <a
                                            href={profile.linkedin_url}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 hover:bg-slate-800 border border-slate-800/80 text-xs text-slate-200 transition"
                                        >
                                            <span className="flex items-center space-x-2">
                                                <LinkedinIcon className="w-4 h-4 text-blue-400" />
                                                <span>LinkedIn Profile</span>
                                            </span>
                                            <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                                        </a>
                                    )}

                                    {profile?.drive_portfolio_url && (
                                        <a
                                            href={profile.drive_portfolio_url}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 hover:bg-slate-800 border border-slate-800/80 text-xs text-slate-200 transition"
                                        >
                                            <span className="flex items-center space-x-2">
                                                <FileText className="w-4 h-4 text-amber-400" />
                                                <span>Google Drive CAD Repository</span>
                                            </span>
                                            <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Right: Contact Form */}
                        <div className="lg:col-span-7">
                            <form
                                onSubmit={handleContactSubmit}
                                className="p-8 rounded-3xl glass-card border border-slate-800 space-y-5"
                            >
                                <div className="space-y-1">
                                    <h3 className="text-lg font-bold text-white">Kirim Pesan atau Penawaran Magang</h3>
                                    <p className="text-xs text-slate-400">Pesan akan langsung tersimpan di panel admin Daffa.</p>
                                </div>

                                {recentlySuccessful && (
                                    <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 flex items-center space-x-3 text-xs font-medium">
                                        <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-emerald-400" />
                                        <span>Terima kasih! Pesan Anda telah terkirim dan segera direspon oleh Achmad Daffa.</span>
                                    </div>
                                )}

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-medium text-slate-300 mb-1.5">Nama Anda / Perusahaan *</label>
                                        <input
                                            type="text"
                                            required
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            placeholder="Contoh: HR Pertamina / Schlumberger"
                                            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 text-sm focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none"
                                        />
                                        {errors.name && <p className="text-xs text-rose-400 mt-1">{errors.name}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-xs font-medium text-slate-300 mb-1.5">Email Rekruter / Koresponden *</label>
                                        <input
                                            type="email"
                                            required
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            placeholder="recruiter@company.com"
                                            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 text-sm focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none"
                                        />
                                        {errors.email && <p className="text-xs text-rose-400 mt-1">{errors.email}</p>}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-slate-300 mb-1.5">Subjek</label>
                                    <input
                                        type="text"
                                        value={data.subject}
                                        onChange={(e) => setData('subject', e.target.value)}
                                        placeholder="Peluang Magang Piping Engineering / Diskusi Proyek"
                                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 text-sm focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-slate-300 mb-1.5">Isi Pesan *</label>
                                    <textarea
                                        rows={4}
                                        required
                                        value={data.message}
                                        onChange={(e) => setData('message', e.target.value)}
                                        placeholder="Tuliskan detail undangan wawancara atau pertanyaan teknis..."
                                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 text-sm focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none"
                                    />
                                    {errors.message && <p className="text-xs text-rose-400 mt-1">{errors.message}</p>}
                                </div>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition shadow-lg shadow-cyan-500/25 flex items-center justify-center space-x-2 disabled:opacity-50"
                                >
                                    <Send className="w-4 h-4" />
                                    <span>{processing ? 'Mengirimkan Pesan...' : 'Kirim Pesan Sekarang'}</span>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* QUICK PREVIEW MODAL */}
            {activeModalProject && (
                <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
                    <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 md:p-8 space-y-6 shadow-2xl">
                        <div className="flex items-start justify-between pb-3 border-b border-slate-800">
                            <div>
                                <span className="text-xs font-mono text-cyan-400 font-semibold">{activeModalProject.category}</span>
                                <h3 className="text-xl font-bold text-white mt-1">{activeModalProject.title}</h3>
                            </div>
                            <button
                                onClick={() => setActiveModalProject(null)}
                                className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {activeModalProject.image_url && (
                            <img
                                src={activeModalProject.image_url}
                                alt={activeModalProject.title}
                                className="w-full h-56 object-cover rounded-2xl border border-slate-800"
                            />
                        )}

                        <div className="space-y-4 text-xs">
                            {activeModalProject.problem && (
                                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                                    <span className="font-bold text-rose-400 block uppercase">Problem:</span>
                                    <p className="text-slate-300 leading-relaxed">{activeModalProject.problem}</p>
                                </div>
                            )}

                            {activeModalProject.solution && (
                                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                                    <span className="font-bold text-cyan-400 block uppercase">Solution:</span>
                                    <p className="text-slate-300 leading-relaxed">{activeModalProject.solution}</p>
                                </div>
                            )}

                            {activeModalProject.result && (
                                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                                    <span className="font-bold text-emerald-400 block uppercase">Result:</span>
                                    <p className="text-slate-300 leading-relaxed">{activeModalProject.result}</p>
                                </div>
                            )}
                        </div>

                        <div className="flex items-center justify-between pt-2">
                            <Link
                                href={`/projects/${activeModalProject.slug}`}
                                className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition"
                            >
                                Buka Halaman Studi Kasus
                            </Link>

                            <button
                                onClick={() => setActiveModalProject(null)}
                                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
                            >
                                Tutup
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* FOOTER */}
            <footer className="border-t border-slate-900 bg-slate-950 py-12 px-6">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-slate-500">
                    <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold">
                            <Flame className="w-4 h-4" />
                        </div>
                        <p>© {new Date().getFullYear()} Achmad Daffa Ihtifazuddin. D4 Mechanical Engineering Technology, Universitas Gadjah Mada.</p>
                    </div>

                    <div className="flex items-center space-x-6">
                        <a href="#about" className="hover:text-cyan-400 transition">About</a>
                        <a href="#projects" className="hover:text-cyan-400 transition">Projects</a>
                        <a href="#contact" className="hover:text-cyan-400 transition">Contact</a>
                        <span className="text-slate-700">|</span>
                        <Link href="/login" className="text-cyan-400 hover:underline font-mono">
                            Admin Portal
                        </Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}
