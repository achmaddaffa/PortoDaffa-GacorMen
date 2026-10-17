import React, { useState } from 'react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { 
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
    Eye,
    Printer,
    Briefcase,
    Users
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
    const [isCvModalOpen, setIsCvModalOpen] = useState(false);
    const [cvTab, setCvTab] = useState('pdf');
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

    const handlePrintCV = () => {
        window.print();
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
        <div className="min-h-screen bg-[#07090E] text-slate-100 font-sans antialiased selection:bg-indigo-500 selection:text-white relative overflow-x-hidden">
            <Head>
                <title>{`${profile?.full_name || 'Achmad Daffa Ihtifazuddin'} - Mechanical & Piping Engineering Portfolio`}</title>
                <meta name="description" content="Portfolio of Achmad Daffa Ihtifazuddin. Mechanical Engineering Technology student at UGM specializing in Piping Engineering, P&ID, SolidWorks, and ANSYS FEA Simulation." />
            </Head>

            {/* Ambient Lighting & Blueprint Grid Pattern */}
            <div className="absolute inset-0 bg-grid-pattern opacity-60 pointer-events-none"></div>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[850px] h-[450px] bg-gradient-to-b from-indigo-600/15 via-blue-600/10 to-transparent blur-3xl pointer-events-none"></div>
            <div className="absolute top-[1300px] right-0 w-[500px] h-[500px] bg-indigo-500/5 blur-3xl pointer-events-none"></div>

            {/* Navigation Bar */}
            <header className="sticky top-0 z-40 glass-panel border-b border-slate-800/80 transition-all">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    {/* Brand */}
                    <a href="#" className="flex items-center group">
                        <span className="font-extrabold text-xl tracking-tight text-white block group-hover:text-indigo-400 transition">
                            Portfolio
                        </span>
                    </a>

                    {/* Desktop Navigation Links */}
                    <nav className="hidden lg:flex items-center space-x-8 text-sm font-medium text-slate-300">
                        <a href="#about" className="hover:text-indigo-400 transition">About</a>
                        <a href="#skills" className="hover:text-indigo-400 transition">Technical Skills</a>
                        <a href="#projects" className="hover:text-indigo-400 transition">Projects & CAD</a>
                        <a href="#education" className="hover:text-indigo-400 transition">Education</a>
                        <a href="#contact" className="hover:text-indigo-400 transition">Contact</a>
                    </nav>

                    {/* Action buttons */}
                    <div className="hidden lg:flex items-center space-x-4">
                        {auth?.user && (
                            <Link
                                href="/admin/dashboard"
                                className="px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-indigo-500/15 hover:bg-indigo-500/25 text-indigo-300 border border-indigo-500/30 transition"
                            >
                                Admin Dashboard
                            </Link>
                        )}

                        <a
                            href="#contact"
                            className="px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-indigo-600 hover:bg-indigo-500 text-white transition shadow-lg shadow-indigo-600/25"
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
                    <div className="lg:hidden bg-[#0A0E1A]/95 border-b border-slate-800 px-6 py-5 space-y-4">
                        <div className="flex flex-col space-y-3 text-sm font-medium">
                            <a href="#about" onClick={() => setMobileMenuOpen(false)} className="hover:text-indigo-400">About</a>
                            <a href="#skills" onClick={() => setMobileMenuOpen(false)} className="hover:text-indigo-400">Technical Skills</a>
                            <a href="#projects" onClick={() => setMobileMenuOpen(false)} className="hover:text-indigo-400">Projects & CAD</a>
                            <a href="#education" onClick={() => setMobileMenuOpen(false)} className="hover:text-indigo-400">Education</a>
                            <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="hover:text-indigo-400">Contact</a>
                        </div>
                        <div className={`pt-4 border-t border-slate-800 flex items-center ${auth?.user ? 'justify-between' : 'justify-end'}`}>
                            {auth?.user && (
                                <Link href="/admin/dashboard" className="text-xs font-bold text-indigo-400">Admin Dashboard</Link>
                            )}
                            <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-xs font-bold">
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
                        <div className="space-y-3">
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
                                {profile?.full_name || 'Achmad Daffa Ihtifazuddin'}
                            </h1>
                            <p className="text-lg sm:text-xl font-medium text-indigo-400 tracking-wide">
                                {profile?.headline || 'Mechanical Engineering Student | Piping Engineering Enthusiast'}
                            </p>
                        </div>

                        <p className="text-base text-slate-300 leading-relaxed max-w-2xl">
                            {profile?.bio_summary || 'Mahasiswa Teknik Mesin Universitas Gadjah Mada semester 5 dengan peminatan Piping Engineering. Mampu membaca dan membuat P&ID, serta berpengalaman menggunakan SolidWorks, AutoCAD, Fusion 360, ANSYS, dan Abaqus untuk desain mekanik, desain manufaktur, dan Finite Element Analysis (FEA). Siap berkontribusi dan terus berkembang melalui program magang.'}
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-wrap items-center gap-4 pt-3">
                            {/* "Lihat CV" Button -> Replaces Drive CAD Portfolio button with Preview & PDF Download */}
                            <button
                                onClick={() => setIsCvModalOpen(true)}
                                className="px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm tracking-wide transition shadow-xl shadow-indigo-600/25 flex items-center space-x-2.5 cursor-pointer group"
                            >
                                <FileText className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                <span>Lihat CV</span>
                            </button>

                            <a
                                href="#projects"
                                className="px-6 py-3.5 rounded-xl bg-[#0D121F] hover:bg-[#131B2E] text-slate-200 border border-slate-700/80 font-semibold text-sm transition flex items-center space-x-2"
                            >
                                <span>Lihat Proyek & CAD</span>
                                <ArrowRight className="w-4 h-4" />
                            </a>

                            <a
                                href="#contact"
                                className="px-5 py-3.5 rounded-xl bg-[#0D121F]/60 hover:bg-[#131B2E] text-slate-300 border border-slate-800 font-medium text-sm transition flex items-center space-x-2"
                            >
                                <Mail className="w-4 h-4 text-indigo-400" />
                                <span>Kontak</span>
                            </a>
                        </div>

                    </div>

                    {/* Right Column: Blueprint CAD Bento Card */}
                    <div className="lg:col-span-5 relative">
                        <div className="relative rounded-3xl glass-card border border-indigo-500/20 p-6 md:p-8 space-y-6 shadow-2xl overflow-hidden group">
                            {/* Ambient Top Glow */}
                            <div className="absolute -top-20 -right-20 w-44 h-44 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none"></div>

                            {/* Blueprint Card Header */}
                            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                                <div className="flex items-center space-x-3">
                                    <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
                                    <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                                    <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
                                    <span className="text-xs font-mono text-slate-400 pl-2">UGM-ENG-SYS-05</span>
                                </div>
                                <span className="text-[11px] font-mono font-bold text-indigo-400 bg-indigo-500/10 px-2.5 py-0.5 rounded border border-indigo-500/20">
                                    VERIFIED TECH
                                </span>
                            </div>

                            {/* Engineering Schematic Highlight */}
                            <div className="p-4 rounded-2xl bg-[#07090E]/80 border border-slate-800 space-y-3">
                                <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                                    <span>FOCUS DISCIPLINE</span>
                                    <span className="text-indigo-400 font-bold">OIL & GAS SPEC</span>
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
                                <div className="p-3.5 rounded-xl bg-[#0D121F]/80 border border-slate-800/80">
                                    <span className="text-[10px] text-slate-400 block uppercase">CAD & Tools</span>
                                    <span className="text-xl font-extrabold text-indigo-300">{skills.filter(s => s.category === 'Design & CAD').length || 3}+ CAD</span>
                                    <span className="text-[10px] text-slate-500 block truncate">SolidWorks & AutoCAD</span>
                                </div>
                                <div className="p-3.5 rounded-xl bg-[#0D121F]/80 border border-slate-800/80">
                                    <span className="text-[10px] text-slate-400 block uppercase">FEA Analysis</span>
                                    <span className="text-xl font-extrabold text-blue-300">{skills.filter(s => s.category === 'Analysis & Simulation').length || 3}+ FEA</span>
                                    <span className="text-[10px] text-slate-500 block truncate">ANSYS & Abaqus</span>
                                </div>
                                <div className="p-3.5 rounded-xl bg-[#0D121F]/80 border border-slate-800/80">
                                    <span className="text-[10px] text-slate-400 block uppercase">Institution</span>
                                    <span className="text-xl font-extrabold text-emerald-300 truncate block">UGM</span>
                                    <span className="text-[10px] text-slate-500 block truncate">IPK 3.39 / 4.00</span>
                                </div>
                                <div className="p-3.5 rounded-xl bg-[#0D121F]/80 border border-slate-800/80">
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
                                <span className="text-indigo-400 font-bold">{profile?.semester || 'Semester 5'} Active</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ABOUT ME SECTION */}
            <section id="about" className="py-20 px-6 border-t border-slate-800/80 bg-[#080B14]/60 relative">
                <div className="max-w-7xl mx-auto space-y-12">
                    <div className="text-center space-y-3 max-w-2xl mx-auto">
                        <span className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
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
                        <div className="p-6 rounded-2xl glass-card border border-slate-800/90 hover:border-indigo-500/40 transition space-y-4">
                            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
                                <Layers className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-bold text-white">Piping & P&ID Precision</h3>
                            <p className="text-sm text-slate-400 leading-relaxed">
                                Berfokus pada perancangan diagram instrumentasi dan perpipaan (P&ID) serta tata letak 3D spool pipa dengan mengacu pada standar industri minyak & gas seperti ASME B31.3.
                            </p>
                        </div>

                        <div className="p-6 rounded-2xl glass-card border border-slate-800/90 hover:border-blue-500/40 transition space-y-4">
                            <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
                                <Cpu className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-bold text-white">FEA & Computational Analysis</h3>
                            <p className="text-sm text-slate-400 leading-relaxed">
                                Menggunakan perangkat lunak ANSYS Mechanical dan Abaqus untuk menganalisis tegangan von Mises, ekspansi termal flens pipa, dan verifikasi faktor keamanan sebelum fabrikasi.
                            </p>
                        </div>

                        <div className="p-6 rounded-2xl glass-card border border-slate-800/90 hover:border-emerald-500/40 transition space-y-4">
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
            <section id="skills" className="py-20 px-6 border-t border-slate-800/80 bg-[#07090E]">
                <div className="max-w-7xl mx-auto space-y-12">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div className="space-y-3">
                            <span className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
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
                                            ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                                            : 'bg-[#0D121F] text-slate-400 hover:text-white border border-slate-800'
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
                                className="p-5 rounded-2xl bg-[#0D121F]/80 border border-slate-800 hover:border-indigo-500/40 transition space-y-3 group"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <span className="text-[10px] font-mono uppercase text-indigo-400 font-semibold">{skill.category}</span>
                                        <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition">{skill.name}</h3>
                                    </div>
                                    <span className="text-sm font-mono font-bold text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-lg border border-indigo-500/20">
                                        {skill.proficiency}%
                                    </span>
                                </div>

                                {/* Progress bar */}
                                <div className="w-full bg-[#07090E] h-2 rounded-full overflow-hidden p-0.5 border border-slate-800">
                                    <div
                                        className="bg-gradient-to-r from-indigo-500 to-blue-500 h-full rounded-full transition-all duration-700 ease-out"
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
            <section id="projects" className="py-20 px-6 border-t border-slate-800/80 bg-[#080B14]/80">
                <div className="max-w-7xl mx-auto space-y-12">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div className="space-y-3">
                            <span className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
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
                                            ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20 font-bold'
                                            : 'bg-[#0D121F] text-slate-400 hover:text-white border border-slate-800'
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
                                className="rounded-3xl glass-card border border-slate-800/90 hover:border-indigo-500/50 transition-all flex flex-col justify-between overflow-hidden group shadow-xl hover:shadow-indigo-500/5"
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
                                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#0D121F] to-[#07090E] text-indigo-400 font-mono text-sm">
                                                CAD / FEA Model
                                            </div>
                                        )}

                                        <div className="absolute top-3 left-3 flex items-center gap-2">
                                            <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-[#07090E]/80 backdrop-blur-md text-indigo-300 border border-indigo-500/30">
                                                {project.category}
                                            </span>
                                            {project.year && (
                                                <span className="px-2 py-1 rounded-lg text-[10px] font-mono bg-[#07090E]/80 backdrop-blur-md text-slate-300 border border-slate-800">
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
                                            <h3 className="text-lg font-bold text-white group-hover:text-indigo-400 transition leading-snug">
                                                {project.title}
                                            </h3>
                                        </div>

                                        <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                                            {project.description}
                                        </p>

                                        {/* CV-Style Problem & Result Highlights */}
                                        {project.result && (
                                            <div className="p-3 rounded-xl bg-[#07090E]/70 border border-emerald-500/20 text-xs text-emerald-300 font-mono space-y-1">
                                                <span className="text-[10px] text-slate-400 uppercase block">Engineered Outcome:</span>
                                                <p className="line-clamp-2">{project.result}</p>
                                            </div>
                                        )}

                                        {/* Tools badge list */}
                                        {project.tools && (
                                            <div className="flex flex-wrap gap-1.5 pt-1">
                                                {project.tools.split(',').map((tool, idx) => (
                                                    <span key={idx} className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#131B2E] text-slate-300 border border-slate-700/60">
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
                                        className="inline-flex items-center space-x-1.5 text-xs font-bold text-indigo-400 hover:text-indigo-300 transition"
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
                                                className="p-2 rounded-xl bg-[#131B2E] hover:bg-[#1C2742] text-slate-300 hover:text-white transition"
                                                title="Buka File Drive"
                                            >
                                                <ExternalLink className="w-3.5 h-3.5" />
                                            </a>
                                        )}
                                        <Link
                                            href={`/projects/${project.slug}`}
                                            className="px-3.5 py-1.5 rounded-xl bg-indigo-500/15 hover:bg-indigo-500/25 text-indigo-300 border border-indigo-500/30 text-xs font-semibold flex items-center space-x-1 transition"
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
            <section id="education" className="py-20 px-6 border-t border-slate-800/80 bg-[#07090E]">
                <div className="max-w-5xl mx-auto space-y-12">
                    <div className="text-center space-y-3">
                        <span className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
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
                                <div className="absolute -left-[31px] md:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-indigo-500 ring-4 ring-[#07090E] group-hover:scale-125 transition-transform"></div>

                                <div className="p-6 rounded-2xl glass-card border border-slate-800 hover:border-indigo-500/30 transition space-y-2">
                                    <div className="flex flex-wrap items-center justify-between gap-2">
                                        <span className="text-xs font-mono text-indigo-400 font-semibold">{exp.period}</span>
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
            <section id="goals" className="py-20 px-6 border-t border-slate-800/80 bg-[#080B14]/80 relative">
                <div className="max-w-5xl mx-auto space-y-12">
                    <div className="text-center space-y-3">
                        <span className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
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
                        <div className="p-8 rounded-3xl glass-card border border-indigo-500/20 space-y-4 relative overflow-hidden">
                            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-bold">
                                <GraduationCap className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-white">Target Semasa Studi (Academic)</h3>
                            <p className="text-sm text-slate-300 leading-relaxed">
                                {profile?.goals_academic || 'During my studies, I aim to excel academically, take an active role in organizations and committees, and join engineering competitions.'}
                            </p>
                        </div>

                        <div className="p-8 rounded-3xl glass-card border border-blue-500/20 space-y-4 relative overflow-hidden">
                            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold">
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
            <section id="contact" className="py-20 px-6 border-t border-slate-800/80 bg-[#07090E] relative">
                <div className="max-w-7xl mx-auto space-y-12">
                    <div className="text-center space-y-3 max-w-2xl mx-auto">
                        <span className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
                            Get In Touch
                        </span>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                            Kontak
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                        {/* Left: Contact Info Cards */}
                        <div className="lg:col-span-5 space-y-4">
                            <div className="p-6 rounded-2xl glass-card border border-slate-800 space-y-4">
                                <h3 className="text-base font-bold text-white">Informasi Kontak Langsung</h3>
                                
                                <div className="space-y-4 text-sm">
                                    <div className="flex items-start space-x-3 text-slate-300">
                                        <Mail className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" />
                                        <div>
                                            <span className="text-xs text-slate-500 block">Email:</span>
                                            <a href={`mailto:${profile?.email || 'achmaddaffaihtifazuddin@gmail.com'}`} className="text-white hover:text-indigo-400 font-medium transition">
                                                {profile?.email || 'achmaddaffaihtifazuddin@gmail.com'}
                                            </a>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-3 text-slate-300">
                                        <Phone className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" />
                                        <div>
                                            <span className="text-xs text-slate-500 block">Telepon / WhatsApp:</span>
                                            <span className="text-white font-medium">{profile?.phone || '089649691208'}</span>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-3 text-slate-300">
                                        <MapPin className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" />
                                        <div>
                                            <span className="text-xs text-slate-500 block">Lokasi:</span>
                                            <span className="text-white font-medium">{profile?.location || 'Karanganyar, Jawa Tengah, Indonesia'}</span>
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
                                            className="flex items-center justify-between p-3 rounded-xl bg-[#0D121F]/80 hover:bg-[#131B2E] border border-slate-800/80 text-xs text-slate-200 transition"
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
                                            className="flex items-center justify-between p-3 rounded-xl bg-[#0D121F]/80 hover:bg-[#131B2E] border border-slate-800/80 text-xs text-slate-200 transition"
                                        >
                                            <span className="flex items-center space-x-2">
                                                <FileText className="w-4 h-4 text-indigo-400" />
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
                                            className="w-full px-3.5 py-2.5 rounded-xl bg-[#07090E] border border-slate-700 text-slate-100 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
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
                                            className="w-full px-3.5 py-2.5 rounded-xl bg-[#07090E] border border-slate-700 text-slate-100 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
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
                                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#07090E] border border-slate-700 text-slate-100 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
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
                                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#07090E] border border-slate-700 text-slate-100 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
                                    />
                                    {errors.message && <p className="text-xs text-rose-400 mt-1">{errors.message}</p>}
                                </div>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs uppercase tracking-wider transition shadow-lg shadow-indigo-600/25 flex items-center justify-center space-x-2 disabled:opacity-50"
                                >
                                    <Send className="w-4 h-4" />
                                    <span>{processing ? 'Mengirimkan Pesan...' : 'Kirim Pesan Sekarang'}</span>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* CURRICULUM VITAE PREVIEW & PDF DOWNLOAD MODAL */}
            {isCvModalOpen && (
                <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6">
                    <div className="relative w-full max-w-6xl xl:max-w-7xl h-[92vh] max-h-[95vh] bg-[#090D17] border border-slate-700/80 rounded-3xl shadow-2xl flex flex-col overflow-hidden my-auto">
                        {/* Top Sticky Header */}
                        <div className="px-5 py-3.5 border-b border-slate-800 bg-[#0D121F] flex flex-wrap items-center justify-between gap-3 sticky top-0 z-10 shrink-0">
                            <div>
                                <span className="text-[10px] font-mono uppercase tracking-wider text-indigo-400 font-semibold block">
                                    Curriculum Vitae Preview
                                </span>
                                <h3 className="text-base sm:text-lg font-bold text-white">
                                    {profile?.full_name || 'Achmad Daffa Ihtifazuddin'}
                                </h3>
                            </div>

                            {/* View Mode Switcher */}
                            <div className="flex items-center bg-[#07090E] p-1 rounded-xl border border-slate-800 text-xs font-medium">
                                <button
                                    onClick={() => setCvTab('pdf')}
                                    className={`px-3 py-1.5 rounded-lg transition ${
                                        cvTab === 'pdf'
                                            ? 'bg-indigo-600 text-white font-bold shadow-sm'
                                            : 'text-slate-400 hover:text-white'
                                    }`}
                                >
                                    Dokumen Asli (PDF)
                                </button>
                                <button
                                    onClick={() => setCvTab('interactive')}
                                    className={`px-3 py-1.5 rounded-lg transition ${
                                        cvTab === 'interactive'
                                            ? 'bg-indigo-600 text-white font-bold shadow-sm'
                                            : 'text-slate-400 hover:text-white'
                                    }`}
                                >
                                    Teks Responsif
                                </button>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex items-center space-x-2">
                                {/* Download PDF CV Button */}
                                <a
                                    href="/dokumen/CV-Achmad-Daffa-Ihtifazuddin.pdf"
                                    download="CV-Achmad-Daffa-Ihtifazuddin.pdf"
                                    className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs uppercase tracking-wider transition flex items-center space-x-1.5 shadow-lg shadow-indigo-600/25"
                                >
                                    <Download className="w-4 h-4" />
                                    <span>Download PDF</span>
                                </a>

                                {/* Print Button */}
                                <button
                                    onClick={handlePrintCV}
                                    className="p-2 rounded-xl bg-[#131B2E] text-slate-300 hover:text-white border border-slate-700 transition"
                                    title="Cetak CV"
                                >
                                    <Printer className="w-4 h-4" />
                                </button>

                                {/* Open in New Tab */}
                                <a
                                    href="/dokumen/CV-Achmad-Daffa-Ihtifazuddin.pdf"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="p-2 rounded-xl bg-[#131B2E] text-slate-300 hover:text-white border border-slate-700 transition"
                                    title="Buka Dokumen PDF di Tab Baru"
                                >
                                    <ExternalLink className="w-4 h-4" />
                                </a>

                                {/* Close Button */}
                                <button
                                    onClick={() => setIsCvModalOpen(false)}
                                    className="p-2 rounded-xl bg-[#131B2E] text-slate-400 hover:text-white border border-slate-700 transition"
                                    title="Tutup Modal"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Modal Body: Switch between PDF embed and Interactive View */}
                        {cvTab === 'pdf' ? (
                            <div className="flex-1 min-h-0 p-2 sm:p-3 bg-[#07090E] flex flex-col overflow-hidden">
                                <iframe
                                    src="/dokumen/CV-Achmad-Daffa-Ihtifazuddin.pdf#toolbar=1&view=FitH"
                                    title="CV Achmad Daffa Ihtifazuddin PDF Preview"
                                    className="w-full h-full flex-1 rounded-2xl border border-slate-800 bg-[#090D17]"
                                />
                            </div>
                        ) : (
                            <div className="flex-1 min-h-0 overflow-y-auto p-6 sm:p-8 space-y-8 bg-[#090D17] text-slate-200">
                                <div id="printable-cv" className="space-y-8 max-w-5xl mx-auto">
                                    {/* CV Header */}
                                    <header className="border-b border-slate-800 pb-6 space-y-4">
                                        <div className="space-y-1">
                                            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight uppercase">
                                                ACHMAD DAFFA IHTIFAZUDDIN
                                            </h1>
                                            <div className="flex flex-wrap items-center gap-y-1 gap-x-3 text-xs font-mono text-slate-300">
                                                <span>089649691208</span>
                                                <span className="text-slate-600">•</span>
                                                <span>achmaddaffaihtifazuddin@gmail.com</span>
                                                <span className="text-slate-600">•</span>
                                                <span>www.linkedin.com/in/achmaddaffaihtifazuddin</span>
                                            </div>
                                            <p className="text-xs font-mono text-slate-400">
                                                Karanganyar, Jawa Tengah, Indonesia
                                            </p>
                                        </div>

                                        {/* Summary Paragraph */}
                                        <p className="text-xs sm:text-sm leading-relaxed text-slate-300 text-justify pt-1">
                                            Mahasiswa Teknik Mesin Universitas Gadjah Mada semester 5 dengan peminatan Piping Engineering. Memiliki kemampuan membaca dan membuat Piping and Instrumentation Diagram (P&ID) serta pengalaman menggunakan SolidWorks, AutoCAD, Fusion 360, ANSYS, dan Abaqus untuk desain mekanik, desain manufaktur, dan analisis elemen hingga (FEA). Memiliki ketertarikan pada bidang mechanical design, manufacturing, piping, dan engineering analysis. Termotivasi untuk mengembangkan kompetensi teknis dan berkontribusi melalui program magang di bidang engineering.
                                        </p>
                                    </header>

                                    {/* Section 1: Experiences / Selected Engineering Projects */}
                                    <section className="space-y-4">
                                        <h2 className="text-sm sm:text-base font-bold text-indigo-400 uppercase tracking-wider border-b border-slate-800 pb-1.5 flex items-center space-x-2">
                                            <Briefcase className="w-4 h-4 text-indigo-400" />
                                            <span>Experiences Selected Engineering Projects</span>
                                        </h2>

                                        <div className="space-y-4 text-xs sm:text-sm">
                                            <div className="space-y-1">
                                                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between font-bold text-white">
                                                    <h3>Monitoring Cahaya dan Input Analog Berbasis Arduino UNO R3 - <span className="font-normal text-slate-400">Universitas Gadjah Mada</span></h3>
                                                    <span className="text-xs font-mono text-indigo-400/90">Aug 2026 - Sep 2026</span>
                                                </div>
                                                <ul className="list-disc list-inside text-slate-300 text-xs sm:text-sm pl-2 space-y-0.5">
                                                    <li>Mengembangkan sistem monitoring berbasis Arduino UNO R3 untuk mengukur intensitas cahaya dan variasi input analog menggunakan LDR dan potentiometer, dengan visualisasi data secara real-time menggunakan Python.</li>
                                                </ul>
                                            </div>

                                            <div className="space-y-1">
                                                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between font-bold text-white">
                                                    <h3>Mechanical Design and Development of a 3-DOF Articulated Robot Arm - <span className="font-normal text-slate-400">Universitas Gadjah Mada</span></h3>
                                                    <span className="text-xs font-mono text-indigo-400/90">Apr 2026 - Jun 2026</span>
                                                </div>
                                                <ul className="list-disc list-inside text-slate-300 text-xs sm:text-sm pl-2 space-y-0.5">
                                                    <li>Merancang robot arm articulated 3-DOF menggunakan SOLIDWORKS dengan mengintegrasikan berbagai komponen mekanik untuk mendukung pergerakan yang efisien dan kestabilan struktur.</li>
                                                </ul>
                                            </div>

                                            <div className="space-y-1">
                                                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between font-bold text-white">
                                                    <h3>Design of a Portable Bamboo Slat Splitting Machine with Roller Feeding System and Diesel Power Drive - <span className="font-normal text-slate-400">Universitas Gadjah Mada</span></h3>
                                                    <span className="text-xs font-mono text-indigo-400/90">Oct 2025 - Nov 2025</span>
                                                </div>
                                                <ul className="list-disc list-inside text-slate-300 text-xs sm:text-sm pl-2 space-y-0.5">
                                                    <li>Merancang mesin pembelah bilah bambu portabel bertenaga diesel menggunakan SOLIDWORKS, termasuk sistem roller feeding dan transmisi mekanik.</li>
                                                </ul>
                                            </div>

                                            <div className="space-y-1">
                                                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between font-bold text-white">
                                                    <h3>Design of a Shell and Tube Heat Exchanger - <span className="font-normal text-slate-400">Universitas Gadjah Mada</span></h3>
                                                    <span className="text-xs font-mono text-indigo-400/90">Apr 2025 - Jun 2025</span>
                                                </div>
                                                <ul className="list-disc list-inside text-slate-300 text-xs sm:text-sm pl-2 space-y-0.5">
                                                    <li>Merancang shell-and-tube heat exchanger dengan fokus pada performa termal, efisiensi perpindahan panas, dan desain mekanik.</li>
                                                </ul>
                                            </div>

                                            <div className="space-y-1">
                                                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between font-bold text-white">
                                                    <h3>Stress Analysis of a Mobile Crane Hook Using FEA - <span className="font-normal text-slate-400">Universitas Gadjah Mada</span></h3>
                                                    <span className="text-xs font-mono text-indigo-400/90">May 2025 - Jun 2025</span>
                                                </div>
                                                <ul className="list-disc list-inside text-slate-300 text-xs sm:text-sm pl-2 space-y-0.5">
                                                    <li>Mengoptimalkan desain crane hook menggunakan SOLIDWORKS FEA dan topology optimization untuk mengurangi bobot dengan tetap mempertahankan integritas struktur dan kapasitas beban.</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </section>

                                    {/* Section 2: Pendidikan */}
                                    <section className="space-y-3">
                                        <h2 className="text-sm sm:text-base font-bold text-indigo-400 uppercase tracking-wider border-b border-slate-800 pb-1.5 flex items-center space-x-2">
                                            <GraduationCap className="w-4 h-4 text-indigo-400" />
                                            <span>Pendidikan</span>
                                        </h2>

                                        <div className="space-y-1 text-xs sm:text-sm">
                                            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between font-bold text-white">
                                                <h3>Universitas Gadjah Mada - <span className="font-normal text-slate-400">Yogyakarta, Indonesia</span></h3>
                                                <span className="text-xs font-mono text-indigo-400">Aug 2024</span>
                                            </div>
                                            <p className="text-xs sm:text-sm text-slate-300 font-semibold">
                                                Bachelor Degree Mechanical Engineering Technology, <strong className="text-indigo-300">3.32/4.00</strong>
                                            </p>
                                            <p className="text-xs text-slate-400">
                                                • Concentration: Piping Engineering
                                            </p>
                                        </div>
                                    </section>

                                    {/* Section 3: Pengalaman Organisasi & Kepanitiaan */}
                                    <section className="space-y-4">
                                        <h2 className="text-sm sm:text-base font-bold text-indigo-400 uppercase tracking-wider border-b border-slate-800 pb-1.5 flex items-center space-x-2">
                                            <Users className="w-4 h-4 text-indigo-400" />
                                            <span>Pengalaman Organisasi dan Kepanitiaan</span>
                                        </h2>

                                        <div className="space-y-3 text-xs sm:text-sm divide-y divide-slate-800/40">
                                            <div className="space-y-1 pt-2">
                                                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between font-bold text-white">
                                                    <h3>Jama'ah Shalahuddin - <span className="font-normal text-slate-400">Yogyakarta, Indonesia</span></h3>
                                                    <span className="text-xs font-mono text-indigo-400">Jul 2025 - Feb 2026</span>
                                                </div>
                                                <p className="text-xs text-indigo-300/90 font-medium">Head of Cooperation and Upgrading Division</p>
                                                <ul className="list-disc list-inside text-slate-300 text-xs pl-2 space-y-0.5">
                                                    <li>Memimpin kemitraan strategis dan program pengembangan anggota untuk mendukung program kewirausahaan.</li>
                                                    <li>Mengoordinasikan kolaborasi lintas divisi untuk memperkuat pengembangan organisasi.</li>
                                                </ul>
                                            </div>

                                            <div className="space-y-1 pt-2">
                                                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between font-bold text-white">
                                                    <h3>Institutional Benchmarking Visit - <span className="font-normal text-slate-400">Surabaya, Malang, Indonesia</span></h3>
                                                    <span className="text-xs font-mono text-slate-400">Jun 2025</span>
                                                </div>
                                                <p className="text-xs text-slate-300 font-medium">Representative of the Sharia Entrepreneurship Department</p>
                                                <ul className="list-disc list-inside text-slate-400 text-xs pl-2 space-y-0.5">
                                                    <li>Mewakili organisasi dalam kunjungan benchmarking ke Universitas Airlangga dan Universitas Brawijaya.</li>
                                                    <li>Memfasilitasi pertukaran pengetahuan dan memperkuat kolaborasi antarkampus.</li>
                                                </ul>
                                            </div>

                                            <div className="space-y-1 pt-2">
                                                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between font-bold text-white">
                                                    <h3>RDK (Ramadhan Di Kampus) UGM</h3>
                                                    <span className="text-xs font-mono text-slate-400">Nov 2025 - Mar 2026</span>
                                                </div>
                                                <p className="text-xs text-slate-300 font-medium">VIP Services Staff</p>
                                                <ul className="list-disc list-inside text-slate-400 text-xs pl-2">
                                                    <li>Mengoordinasikan pelayanan dan konsumsi bagi pembicara undangan serta tamu khusus.</li>
                                                </ul>
                                            </div>

                                            <div className="space-y-1 pt-2">
                                                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between font-bold text-white">
                                                    <h3>SAJADHA Qurban Volunteer Program - <span className="font-normal text-slate-400">Yogyakarta, Indonesia</span></h3>
                                                    <span className="text-xs font-mono text-slate-400">Apr 2025 - Jun 2025</span>
                                                </div>
                                                <p className="text-xs text-slate-300 font-medium">Logistics & Equipment Staff</p>
                                                <ul className="list-disc list-inside text-slate-400 text-xs pl-2">
                                                    <li>Mengoordinasikan persiapan logistik dan peralatan untuk mendukung kegiatan pengabdian masyarakat secara efektif.</li>
                                                </ul>
                                            </div>

                                            <div className="space-y-1 pt-2">
                                                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between font-bold text-white">
                                                    <h3>Mechanical Fair UGM 2025</h3>
                                                    <span className="text-xs font-mono text-slate-400">Feb 2025 - May 2025</span>
                                                </div>
                                                <p className="text-xs text-slate-300 font-medium">Finance & Treasury Staff</p>
                                                <ul className="list-disc list-inside text-slate-400 text-xs pl-2">
                                                    <li>Mengelola pencatatan keuangan, memantau anggaran, dan memproses transaksi untuk memastikan operasional keuangan yang transparan.</li>
                                                </ul>
                                            </div>

                                            <div className="space-y-1 pt-2">
                                                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between font-bold text-white">
                                                    <h3>RBM (Ramadhan Bersama Mardhliyah) - <span className="font-normal text-slate-400">Yogyakarta, Indonesia</span></h3>
                                                    <span className="text-xs font-mono text-slate-400">Jan 2025 - Apr 2025</span>
                                                </div>
                                                <p className="text-xs text-slate-300 font-medium">Logistics and Security Division Staff</p>
                                                <ul className="list-disc list-inside text-slate-400 text-xs pl-2">
                                                    <li>Mengelola inventaris, distribusi peralatan, dan penataan lokasi serta mendukung pengaturan peserta dan keamanan acara.</li>
                                                </ul>
                                            </div>

                                            <div className="space-y-1 pt-2">
                                                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between font-bold text-white">
                                                    <h3>Event Volunteer – BerbagiRasa 2025 BEM KM UGM - <span className="font-normal text-slate-400">Yogyakarta, Indonesia</span></h3>
                                                    <span className="text-xs font-mono text-slate-400">Aug 2025 - Oct 2025</span>
                                                </div>
                                                <p className="text-xs text-slate-300 font-medium">Subkoordinator Perlengkapan</p>
                                                <ul className="list-disc list-inside text-slate-400 text-xs pl-2">
                                                    <li>Mendukung operasional acara, koordinasi peserta, dan kegiatan mental health awareness.</li>
                                                </ul>
                                            </div>

                                            <div className="space-y-1 pt-2">
                                                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between font-bold text-white">
                                                    <h3>Barokah Sembada Pangan</h3>
                                                    <span className="text-xs font-mono text-slate-400">- Sekarang</span>
                                                </div>
                                                <p className="text-xs text-slate-300 font-medium">Store Manager (Family-Owned Grocery Store)</p>
                                                <ul className="list-disc list-inside text-slate-400 text-xs pl-2 space-y-0.5">
                                                    <li>Mengelola operasional harian toko, inventaris, penetapan harga, dan pelayanan pelanggan.</li>
                                                </ul>
                                            </div>

                                            <div className="space-y-1 pt-2">
                                                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between font-bold text-white">
                                                    <h3>Junior High School Alumni Association</h3>
                                                    <span className="text-xs font-mono text-slate-400">Jul 2026</span>
                                                </div>
                                                <p className="text-xs text-slate-300 font-medium">Guest Speaker for the Launching Event</p>
                                                <ul className="list-disc list-inside text-slate-400 text-xs pl-2">
                                                    <li>Menyampaikan pengalaman pendidikan dan wawasan motivasional untuk menginspirasi siswa sekolah menengah pertama.</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </section>

                                    {/* Section 4: Keterampilan / Skills */}
                                    <section className="space-y-3">
                                        <h2 className="text-sm sm:text-base font-bold text-indigo-400 uppercase tracking-wider border-b border-slate-800 pb-1.5 flex items-center space-x-2">
                                            <Wrench className="w-4 h-4 text-indigo-400" />
                                            <span>Keterampilan</span>
                                        </h2>

                                        <div className="space-y-2 text-xs sm:text-sm">
                                            <div>
                                                <strong className="text-white">Hardskill (Teknis): </strong>
                                                <span className="text-slate-300">
                                                    Design & CAD (SolidWorks, Fusion 360, AutoCAD, AutoPlant3D), Analysis & Simulation (ANSYS, Abaqus), Reverse Engineering, Material Selection, Heat Transfer Analysis
                                                </span>
                                            </div>

                                            <div>
                                                <strong className="text-white">Soft Skills (Nonteknis): </strong>
                                                <span className="text-slate-300">
                                                    Team Leadership, Team Coordination, Problem Solving, Critical thinking, Task & Project Management, Communication
                                                </span>
                                            </div>
                                        </div>
                                    </section>
                                </div>
                            </div>
                        )}

                        {/* Modal Action Footer */}
                        <div className="p-4 sm:p-5 border-t border-slate-800 bg-[#0D121F] flex items-center justify-between shrink-0">
                            <span className="text-xs font-mono text-slate-400 hidden sm:inline">
                                Format Resmi Dokumen CV • Achmad Daffa Ihtifazuddin
                            </span>

                            <div className="flex items-center space-x-3 ml-auto sm:ml-0">
                                <a
                                    href="/dokumen/CV-Achmad-Daffa-Ihtifazuddin.pdf"
                                    download="CV-Achmad-Daffa-Ihtifazuddin.pdf"
                                    className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs uppercase tracking-wider transition shadow-lg shadow-indigo-600/25 flex items-center space-x-2"
                                >
                                    <Download className="w-4 h-4" />
                                    <span>Download PDF CV</span>
                                </a>
                                <button
                                    onClick={() => setIsCvModalOpen(false)}
                                    className="px-4 py-2.5 rounded-xl bg-[#131B2E] text-slate-300 hover:text-white border border-slate-700 text-xs font-semibold"
                                >
                                    Tutup
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* QUICK PROJECT PREVIEW MODAL */}
            {activeModalProject && (
                <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
                    <div className="bg-[#090D17] border border-slate-700 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 md:p-8 space-y-6 shadow-2xl">
                        <div className="flex items-start justify-between pb-3 border-b border-slate-800">
                            <div>
                                <span className="text-xs font-mono text-indigo-400 font-semibold">{activeModalProject.category}</span>
                                <h3 className="text-xl font-bold text-white mt-1">{activeModalProject.title}</h3>
                            </div>
                            <button
                                onClick={() => setActiveModalProject(null)}
                                className="p-2 rounded-xl bg-[#131B2E] text-slate-400 hover:text-white border border-slate-700"
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
                                <div className="p-4 rounded-xl bg-[#07090E] border border-slate-800 space-y-1">
                                    <span className="font-bold text-rose-400 block uppercase">Problem:</span>
                                    <p className="text-slate-300 leading-relaxed">{activeModalProject.problem}</p>
                                </div>
                            )}

                            {activeModalProject.solution && (
                                <div className="p-4 rounded-xl bg-[#07090E] border border-slate-800 space-y-1">
                                    <span className="font-bold text-indigo-400 block uppercase">Solution:</span>
                                    <p className="text-slate-300 leading-relaxed">{activeModalProject.solution}</p>
                                </div>
                            )}

                            {activeModalProject.result && (
                                <div className="p-4 rounded-xl bg-[#07090E] border border-slate-800 space-y-1">
                                    <span className="font-bold text-emerald-400 block uppercase">Result:</span>
                                    <p className="text-slate-300 leading-relaxed">{activeModalProject.result}</p>
                                </div>
                            )}
                        </div>

                        <div className="flex items-center justify-between pt-2">
                            <Link
                                href={`/projects/${activeModalProject.slug}`}
                                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs uppercase tracking-wider transition"
                            >
                                Buka Halaman Studi Kasus
                            </Link>

                            <button
                                onClick={() => setActiveModalProject(null)}
                                className="px-4 py-2 rounded-xl bg-[#131B2E] text-slate-300 text-xs font-semibold border border-slate-700"
                            >
                                Tutup
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* FOOTER */}
            <footer className="border-t border-slate-800/80 bg-[#07090E] py-12 px-6">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-slate-500">
                    <div className="flex items-center space-x-3">
                        <p>© {new Date().getFullYear()} Achmad Daffa Ihtifazuddin.</p>
                    </div>

                    <div className="flex items-center space-x-6">
                        <a href="#about" className="hover:text-indigo-400 transition">About</a>
                        <a href="#projects" className="hover:text-indigo-400 transition">Projects</a>
                        <button onClick={() => setIsCvModalOpen(true)} className="hover:text-indigo-400 transition">
                            Lihat CV
                        </button>
                        <a href="#contact" className="hover:text-indigo-400 transition">Contact</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
