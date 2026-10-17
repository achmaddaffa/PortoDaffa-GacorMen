import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { 
    Printer, 
    ArrowLeft, 
    Mail, 
    Phone, 
    MapPin, 
    ExternalLink, 
    GraduationCap, 
    Briefcase, 
    Users, 
    Wrench, 
    CheckCircle2,
    FileText,
    Download
} from 'lucide-react';

const LinkedinIcon = (props) => (
    <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
        <rect x="2" y="9" width="4" height="12"></rect>
        <circle cx="4" cy="4" r="2"></circle>
    </svg>
);

export default function CV({ profile }) {
    const [viewMode, setViewMode] = useState('pdf'); // 'pdf' | 'interactive'

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="min-h-screen bg-[#07090E] text-slate-100 font-sans antialiased selection:bg-indigo-500 selection:text-white py-8 px-4 sm:px-6 lg:px-8 print:bg-white print:text-black print:p-0">
            <Head title="Curriculum Vitae - Achmad Daffa Ihtifazuddin" />

            {/* Top Toolbar (Hidden when printing) */}
            <div className="max-w-5xl mx-auto mb-6 flex flex-wrap items-center justify-between gap-4 print:hidden">
                <Link
                    href="/"
                    className="inline-flex items-center space-x-2 text-xs font-semibold text-slate-400 hover:text-indigo-400 transition bg-[#0D121F]/80 px-4 py-2.5 rounded-xl border border-slate-800"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Kembali ke Website Portfolio</span>
                </Link>

                {/* View Switcher */}
                <div className="flex items-center bg-[#0D121F] p-1 rounded-xl border border-slate-800 text-xs font-medium">
                    <button
                        onClick={() => setViewMode('pdf')}
                        className={`px-3.5 py-1.5 rounded-lg transition ${
                            viewMode === 'pdf'
                                ? 'bg-indigo-600 text-white font-bold shadow-sm'
                                : 'text-slate-400 hover:text-white'
                        }`}
                    >
                        Dokumen Asli (PDF)
                    </button>
                    <button
                        onClick={() => setViewMode('interactive')}
                        className={`px-3.5 py-1.5 rounded-lg transition ${
                            viewMode === 'interactive'
                                ? 'bg-indigo-600 text-white font-bold shadow-sm'
                                : 'text-slate-400 hover:text-white'
                        }`}
                    >
                        Teks Responsif
                    </button>
                </div>

                <div className="flex items-center space-x-3">
                    {/* Direct Download Button for original PDF */}
                    <a
                        href="/dokumen/CV-Achmad-Daffa-Ihtifazuddin.pdf"
                        download="CV-Achmad-Daffa-Ihtifazuddin.pdf"
                        className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs uppercase tracking-wider transition shadow-lg shadow-indigo-600/25"
                    >
                        <Download className="w-4 h-4" />
                        <span>Download PDF CV</span>
                    </a>

                    <button
                        onClick={handlePrint}
                        className="inline-flex items-center space-x-2 p-2.5 rounded-xl bg-[#0D121F] text-slate-300 hover:text-white border border-slate-800 transition"
                        title="Cetak CV"
                    >
                        <Printer className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* View Mode: PDF iframe or Interactive Document */}
            {viewMode === 'pdf' ? (
                <div className="max-w-6xl xl:max-w-7xl mx-auto h-[88vh] bg-[#0D121F] border border-slate-800 rounded-3xl overflow-hidden shadow-2xl p-2 sm:p-3">
                    <iframe
                        src="/dokumen/CV-Achmad-Daffa-Ihtifazuddin.pdf#toolbar=1&view=FitH"
                        title="CV Achmad Daffa Ihtifazuddin"
                        className="w-full h-full rounded-2xl border border-slate-800 bg-[#07090E]"
                    />
                </div>
            ) : (
                /* Main CV Paper Container */
                <main id="printable-cv" className="max-w-4xl mx-auto bg-[#0D121F]/90 print:bg-white border border-slate-800 print:border-none rounded-3xl print:rounded-none p-6 sm:p-10 lg:p-12 shadow-2xl print:shadow-none space-y-8 print:space-y-6 text-slate-200 print:text-slate-900">
                    
                    {/* Header Section */}
                    <header className="border-b border-slate-800 print:border-slate-300 pb-6 space-y-4">
                        <div className="space-y-2">
                            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white print:text-slate-950 uppercase">
                                ACHMAD DAFFA IHTIFAZUDDIN
                            </h1>
                            <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs font-mono text-slate-300 print:text-slate-700">
                                <a href="tel:089649691208" className="inline-flex items-center space-x-1.5 hover:text-indigo-400 print:text-black">
                                    <Phone className="w-3.5 h-3.5 text-indigo-400 print:text-blue-700" />
                                    <span>089649691208</span>
                                </a>
                                <span className="text-slate-600 print:text-slate-400">•</span>
                                <a href="mailto:achmaddaffaihtifazuddin@gmail.com" className="inline-flex items-center space-x-1.5 hover:text-indigo-400 print:text-black">
                                    <Mail className="w-3.5 h-3.5 text-indigo-400 print:text-blue-700" />
                                    <span>achmaddaffaihtifazuddin@gmail.com</span>
                                </a>
                                <span className="text-slate-600 print:text-slate-400">•</span>
                                <a href="https://www.linkedin.com/in/achmaddaffaihtifazuddin" target="_blank" rel="noreferrer" className="inline-flex items-center space-x-1.5 hover:text-indigo-400 print:text-black">
                                    <LinkedinIcon className="w-3.5 h-3.5 text-indigo-400 print:text-blue-700" />
                                    <span>linkedin.com/in/achmaddaffaihtifazuddin</span>
                                </a>
                            </div>
                            <p className="text-xs font-mono text-slate-400 print:text-slate-600">
                                Karanganyar, Jawa Tengah, Indonesia
                            </p>
                        </div>

                        {/* Summary Paragraph */}
                        <p className="text-xs sm:text-sm leading-relaxed text-slate-300 print:text-slate-800 text-justify pt-1">
                            Mahasiswa Teknik Mesin Universitas Gadjah Mada semester 5 dengan peminatan Piping Engineering. Memiliki kemampuan membaca dan membuat Piping and Instrumentation Diagram (P&ID) serta pengalaman menggunakan SolidWorks, AutoCAD, Fusion 360, ANSYS, dan Abaqus untuk desain mekanik, desain manufaktur, dan analisis elemen hingga (FEA). Memiliki ketertarikan pada bidang mechanical design, manufacturing, piping, dan engineering analysis. Termotivasi untuk mengembangkan kompetensi teknis dan berkontribusi melalui program magang di bidang engineering.
                        </p>
                    </header>

                    {/* Section 1: Experiences / Selected Engineering Projects */}
                    <section className="space-y-4">
                        <h2 className="text-base sm:text-lg font-bold text-indigo-400 print:text-blue-800 uppercase tracking-wider border-b border-slate-800/80 print:border-slate-300 pb-1.5 flex items-center space-x-2">
                            <Briefcase className="w-4 h-4 text-indigo-400 print:text-blue-700" />
                            <span>Experiences Selected Engineering Projects</span>
                        </h2>

                        <div className="space-y-4 text-xs sm:text-sm">
                            <div className="space-y-1">
                                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between font-bold text-white print:text-slate-950">
                                    <h3>Monitoring Cahaya dan Input Analog Berbasis Arduino UNO R3 - <span className="font-normal text-slate-400 print:text-slate-600">Universitas Gadjah Mada</span></h3>
                                    <span className="text-xs font-mono text-indigo-400/90 print:text-slate-600">Aug 2026 - Sep 2026</span>
                                </div>
                                <ul className="list-disc list-inside text-slate-300 print:text-slate-700 text-xs sm:text-sm pl-2 space-y-0.5">
                                    <li>Mengembangkan sistem monitoring berbasis Arduino UNO R3 untuk mengukur intensitas cahaya dan variasi input analog menggunakan LDR dan potentiometer, dengan visualisasi data secara real-time menggunakan Python.</li>
                                </ul>
                            </div>

                            <div className="space-y-1">
                                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between font-bold text-white print:text-slate-950">
                                    <h3>Mechanical Design and Development of a 3-DOF Articulated Robot Arm - <span className="font-normal text-slate-400 print:text-slate-600">Universitas Gadjah Mada</span></h3>
                                    <span className="text-xs font-mono text-indigo-400/90 print:text-slate-600">Apr 2026 - Jun 2026</span>
                                </div>
                                <ul className="list-disc list-inside text-slate-300 print:text-slate-700 text-xs sm:text-sm pl-2 space-y-0.5">
                                    <li>Merancang robot arm articulated 3-DOF menggunakan SOLIDWORKS dengan mengintegrasikan berbagai komponen mekanik untuk mendukung pergerakan yang efisien dan kestabilan struktur.</li>
                                </ul>
                            </div>

                            <div className="space-y-1">
                                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between font-bold text-white print:text-slate-950">
                                    <h3>Design of a Portable Bamboo Slat Splitting Machine with Roller Feeding System and Diesel Power Drive - <span className="font-normal text-slate-400 print:text-slate-600">Universitas Gadjah Mada</span></h3>
                                    <span className="text-xs font-mono text-indigo-400/90 print:text-slate-600">Oct 2025 - Nov 2025</span>
                                </div>
                                <ul className="list-disc list-inside text-slate-300 print:text-slate-700 text-xs sm:text-sm pl-2 space-y-0.5">
                                    <li>Merancang mesin pembelah bilah bambu portabel bertenaga diesel menggunakan SOLIDWORKS, termasuk sistem roller feeding dan transmisi mekanik.</li>
                                </ul>
                            </div>

                            <div className="space-y-1">
                                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between font-bold text-white print:text-slate-950">
                                    <h3>Design of a Shell and Tube Heat Exchanger - <span className="font-normal text-slate-400 print:text-slate-600">Universitas Gadjah Mada</span></h3>
                                    <span className="text-xs font-mono text-indigo-400/90 print:text-slate-600">Apr 2025 - Jun 2025</span>
                                </div>
                                <ul className="list-disc list-inside text-slate-300 print:text-slate-700 text-xs sm:text-sm pl-2 space-y-0.5">
                                    <li>Merancang shell-and-tube heat exchanger dengan fokus pada performa termal, efisiensi perpindahan panas, dan desain mekanik.</li>
                                </ul>
                            </div>

                            <div className="space-y-1">
                                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between font-bold text-white print:text-slate-950">
                                    <h3>Stress Analysis of a Mobile Crane Hook Using FEA - <span className="font-normal text-slate-400 print:text-slate-600">Universitas Gadjah Mada</span></h3>
                                    <span className="text-xs font-mono text-indigo-400/90 print:text-slate-600">May 2025 - Jun 2025</span>
                                </div>
                                <ul className="list-disc list-inside text-slate-300 print:text-slate-700 text-xs sm:text-sm pl-2 space-y-0.5">
                                    <li>Mengoptimalkan desain crane hook menggunakan SOLIDWORKS FEA dan topology optimization untuk mengurangi bobot dengan tetap mempertahankan integritas struktur dan kapasitas beban.</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Section 2: Pendidikan */}
                    <section className="space-y-3">
                        <h2 className="text-base sm:text-lg font-bold text-indigo-400 print:text-blue-800 uppercase tracking-wider border-b border-slate-800/80 print:border-slate-300 pb-1.5 flex items-center space-x-2">
                            <GraduationCap className="w-4 h-4 text-indigo-400 print:text-blue-700" />
                            <span>Pendidikan</span>
                        </h2>

                        <div className="space-y-1 text-xs sm:text-sm">
                            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between font-bold text-white print:text-slate-950">
                                <h3>Universitas Gadjah Mada - <span className="font-normal text-slate-400 print:text-slate-600">Yogyakarta, Indonesia</span></h3>
                                <span className="text-xs font-mono text-indigo-400 print:text-blue-800">Aug 2024</span>
                            </div>
                            <p className="text-xs sm:text-sm text-slate-300 print:text-slate-800 font-semibold">
                                Bachelor Degree Mechanical Engineering Technology, <strong className="text-indigo-300 print:text-black">3.32/4.00</strong>
                            </p>
                            <p className="text-xs text-slate-400 print:text-slate-600">
                                • Concentration: Piping Engineering
                            </p>
                        </div>
                    </section>

                    {/* Section 3: Pengalaman Organisasi & Kepanitiaan */}
                    <section className="space-y-4">
                        <h2 className="text-base sm:text-lg font-bold text-indigo-400 print:text-blue-800 uppercase tracking-wider border-b border-slate-800/80 print:border-slate-300 pb-1.5 flex items-center space-x-2">
                            <Users className="w-4 h-4 text-indigo-400 print:text-blue-700" />
                            <span>Pengalaman Organisasi dan Kepanitiaan</span>
                        </h2>

                        <div className="space-y-3 text-xs sm:text-sm divide-y divide-slate-800/40 print:divide-slate-200">
                            <div className="space-y-1 pt-2">
                                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between font-bold text-white print:text-slate-950">
                                    <h3>Jama'ah Shalahuddin - <span className="font-normal text-slate-400 print:text-slate-600">Yogyakarta, Indonesia</span></h3>
                                    <span className="text-xs font-mono text-indigo-400 print:text-slate-600">Jul 2025 - Feb 2026</span>
                                </div>
                                <p className="text-xs text-indigo-300/90 print:text-slate-800 font-medium">Head of Cooperation and Upgrading Division</p>
                                <ul className="list-disc list-inside text-slate-300 print:text-slate-700 text-xs pl-2 space-y-0.5">
                                    <li>Memimpin kemitraan strategis dan program pengembangan anggota untuk mendukung program kewirausahaan.</li>
                                    <li>Mengoordinasikan kolaborasi lintas divisi untuk memperkuat pengembangan organisasi.</li>
                                </ul>
                            </div>

                            <div className="space-y-1 pt-2">
                                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between font-bold text-white print:text-slate-950">
                                    <h3>Institutional Benchmarking Visit - <span className="font-normal text-slate-400 print:text-slate-600">Surabaya, Malang, Indonesia</span></h3>
                                    <span className="text-xs font-mono text-slate-400 print:text-slate-600">Jun 2025</span>
                                </div>
                                <p className="text-xs text-slate-300 print:text-slate-700 font-medium">Representative of the Sharia Entrepreneurship Department</p>
                                <ul className="list-disc list-inside text-slate-400 print:text-slate-700 text-xs pl-2 space-y-0.5">
                                    <li>Mewakili organisasi dalam kunjungan benchmarking ke Universitas Airlangga dan Universitas Brawijaya.</li>
                                    <li>Memfasilitasi pertukaran pengetahuan dan memperkuat kolaborasi antarkampus.</li>
                                </ul>
                            </div>

                            <div className="space-y-1 pt-2">
                                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between font-bold text-white print:text-slate-950">
                                    <h3>RDK (Ramadhan Di Kampus) UGM</h3>
                                    <span className="text-xs font-mono text-slate-400 print:text-slate-600">Nov 2025 - Mar 2026</span>
                                </div>
                                <p className="text-xs text-slate-300 print:text-slate-700 font-medium">VIP Services Staff</p>
                                <ul className="list-disc list-inside text-slate-400 print:text-slate-700 text-xs pl-2">
                                    <li>Mengoordinasikan pelayanan dan konsumsi bagi pembicara undangan serta tamu khusus.</li>
                                </ul>
                            </div>

                            <div className="space-y-1 pt-2">
                                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between font-bold text-white print:text-slate-950">
                                    <h3>SAJADHA Qurban Volunteer Program - <span className="font-normal text-slate-400 print:text-slate-600">Yogyakarta, Indonesia</span></h3>
                                    <span className="text-xs font-mono text-slate-400 print:text-slate-600">Apr 2025 - Jun 2025</span>
                                </div>
                                <p className="text-xs text-slate-300 print:text-slate-700 font-medium">Logistics & Equipment Staff</p>
                                <ul className="list-disc list-inside text-slate-400 print:text-slate-700 text-xs pl-2">
                                    <li>Mengoordinasikan persiapan logistik dan peralatan untuk mendukung kegiatan pengabdian masyarakat secara efektif.</li>
                                </ul>
                            </div>

                            <div className="space-y-1 pt-2">
                                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between font-bold text-white print:text-slate-950">
                                    <h3>Mechanical Fair UGM 2025</h3>
                                    <span className="text-xs font-mono text-slate-400 print:text-slate-600">Feb 2025 - May 2025</span>
                                </div>
                                <p className="text-xs text-slate-300 print:text-slate-700 font-medium">Finance & Treasury Staff</p>
                                <ul className="list-disc list-inside text-slate-400 print:text-slate-700 text-xs pl-2">
                                    <li>Mengelola pencatatan keuangan, memantau anggaran, dan memproses transaksi untuk memastikan operasional keuangan yang transparan.</li>
                                </ul>
                            </div>

                            <div className="space-y-1 pt-2">
                                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between font-bold text-white print:text-slate-950">
                                    <h3>RBM (Ramadhan Bersama Mardhliyah) - <span className="font-normal text-slate-400 print:text-slate-600">Yogyakarta, Indonesia</span></h3>
                                    <span className="text-xs font-mono text-slate-400 print:text-slate-600">Jan 2025 - Apr 2025</span>
                                </div>
                                <p className="text-xs text-slate-300 print:text-slate-700 font-medium">Logistics and Security Division Staff</p>
                                <ul className="list-disc list-inside text-slate-400 print:text-slate-700 text-xs pl-2">
                                    <li>Mengelola inventaris, distribusi peralatan, dan penataan lokasi serta mendukung pengaturan peserta dan keamanan acara.</li>
                                </ul>
                            </div>

                            <div className="space-y-1 pt-2">
                                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between font-bold text-white print:text-slate-950">
                                    <h3>Event Volunteer – BerbagiRasa 2025 BEM KM UGM - <span className="font-normal text-slate-400 print:text-slate-600">Yogyakarta, Indonesia</span></h3>
                                    <span className="text-xs font-mono text-slate-400 print:text-slate-600">Aug 2025 - Oct 2025</span>
                                </div>
                                <p className="text-xs text-slate-300 print:text-slate-700 font-medium">Subkoordinator Perlengkapan</p>
                                <ul className="list-disc list-inside text-slate-400 print:text-slate-700 text-xs pl-2">
                                    <li>Mendukung operasional acara, koordinasi peserta, dan kegiatan mental health awareness.</li>
                                </ul>
                            </div>

                            <div className="space-y-1 pt-2">
                                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between font-bold text-white print:text-slate-950">
                                    <h3>Barokah Sembada Pangan</h3>
                                    <span className="text-xs font-mono text-slate-400 print:text-slate-600">- Sekarang</span>
                                </div>
                                <p className="text-xs text-slate-300 print:text-slate-700 font-medium">Store Manager (Family-Owned Grocery Store)</p>
                                <ul className="list-disc list-inside text-slate-400 print:text-slate-700 text-xs pl-2 space-y-0.5">
                                    <li>Mengelola operasional harian toko, inventaris, penetapan harga, dan pelayanan pelanggan.</li>
                                </ul>
                            </div>

                            <div className="space-y-1 pt-2">
                                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between font-bold text-white print:text-slate-950">
                                    <h3>Junior High School Alumni Association</h3>
                                    <span className="text-xs font-mono text-slate-400 print:text-slate-600">Jul 2026</span>
                                </div>
                                <p className="text-xs text-slate-300 print:text-slate-700 font-medium">Guest Speaker for the Launching Event</p>
                                <ul className="list-disc list-inside text-slate-400 print:text-slate-700 text-xs pl-2">
                                    <li>Menyampaikan pengalaman pendidikan dan wawasan motivasional untuk menginspirasi siswa sekolah menengah pertama.</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Section 4: Keterampilan / Skills */}
                    <section className="space-y-3">
                        <h2 className="text-base sm:text-lg font-bold text-indigo-400 print:text-blue-800 uppercase tracking-wider border-b border-slate-800/80 print:border-slate-300 pb-1.5 flex items-center space-x-2">
                            <Wrench className="w-4 h-4 text-indigo-400 print:text-blue-700" />
                            <span>Keterampilan</span>
                        </h2>

                        <div className="space-y-2 text-xs sm:text-sm">
                            <div>
                                <strong className="text-white print:text-slate-950">Hardskill (Teknis): </strong>
                                <span className="text-slate-300 print:text-slate-800">
                                    Design & CAD (SolidWorks, Fusion 360, AutoCAD, AutoPlant3D), Analysis & Simulation (ANSYS, Abaqus), Reverse Engineering, Material Selection, Heat Transfer Analysis
                                </span>
                            </div>

                            <div>
                                <strong className="text-white print:text-slate-950">Soft Skills (Nonteknis): </strong>
                                <span className="text-slate-300 print:text-slate-800">
                                    Team Leadership, Team Coordination, Problem Solving, Critical thinking, Task & Project Management, Communication
                                </span>
                            </div>
                        </div>
                    </section>

                    {/* Footer Signature */}
                    <footer className="pt-6 border-t border-slate-800 print:border-slate-300 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 font-mono gap-2">
                        <span>Curriculum Vitae • Achmad Daffa Ihtifazuddin</span>
                        <span>Universitas Gadjah Mada (UGM)</span>
                    </footer>
                </main>
            )}
        </div>
    );
}
