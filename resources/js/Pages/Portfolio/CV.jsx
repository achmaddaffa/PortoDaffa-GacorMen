import React from 'react';
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
    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="min-h-screen bg-[#07090E] text-slate-100 font-sans antialiased selection:bg-indigo-500 selection:text-white py-8 px-4 sm:px-6 lg:px-8 print:bg-white print:text-black print:p-0">
            <Head title="Curriculum Vitae - Achmad Daffa Ihtifazuddin" />

            {/* Top Toolbar (Hidden when printing) */}
            <div className="max-w-4xl mx-auto mb-6 flex flex-wrap items-center justify-between gap-4 print:hidden">
                <Link
                    href="/"
                    className="inline-flex items-center space-x-2 text-xs font-semibold text-slate-400 hover:text-indigo-400 transition bg-[#0D121F]/80 px-4 py-2.5 rounded-xl border border-slate-800"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Kembali ke Website Portfolio</span>
                </Link>

                <div className="flex items-center space-x-3">
                    <button
                        onClick={handlePrint}
                        className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs uppercase tracking-wider transition shadow-lg shadow-indigo-600/25"
                    >
                        <Printer className="w-4 h-4" />
                        <span>Cetak / Simpan PDF</span>
                    </button>
                </div>
            </div>

            {/* Main CV Paper Container */}
            <main id="printable-cv" className="max-w-4xl mx-auto bg-[#0D121F]/90 print:bg-white border border-slate-800 print:border-none rounded-3xl print:rounded-none p-6 sm:p-10 lg:p-12 shadow-2xl print:shadow-none space-y-8 print:space-y-6 text-slate-200 print:text-slate-900">
                
                {/* Header Section */}
                <header className="border-b border-slate-800 print:border-slate-300 pb-6 space-y-4">
                    <div className="space-y-2">
                        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white print:text-slate-950 uppercase">
                            Achmad Daffa Ihtifazuddin
                        </h1>
                        <p className="text-sm font-semibold text-indigo-400 print:text-blue-700">
                            Piping Engineering & Mechanical Design Enthusiast • Universitas Gadjah Mada
                        </p>
                    </div>

                    {/* Contact Badges */}
                    <div className="flex flex-wrap items-center gap-y-2 gap-x-5 text-xs font-mono text-slate-300 print:text-slate-700">
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
                        <span className="text-slate-600 print:text-slate-400">•</span>
                        <span className="inline-flex items-center space-x-1.5 text-slate-400 print:text-black">
                            <MapPin className="w-3.5 h-3.5 text-indigo-400 print:text-blue-700" />
                            <span>Karanganyar, Jawa Tengah, Indonesia</span>
                        </span>
                    </div>

                    {/* Summary Paragraph */}
                    <p className="text-xs sm:text-sm leading-relaxed text-slate-300 print:text-slate-800 text-justify pt-1">
                        Mahasiswa Teknik Mesin Universitas Gadjah Mada semester 5 dengan peminatan Piping Engineering. Mampu membaca dan membuat P&ID, serta berpengalaman menggunakan SolidWorks, AutoCAD, Fusion 360, ANSYS, dan Abaqus untuk desain mekanik, desain manufaktur, dan Finite Element Analysis (FEA). Siap berkontribusi dan terus berkembang melalui program magang.
                    </p>
                </header>

                {/* Section 1: Experiences / Selected Engineering Projects */}
                <section className="space-y-4">
                    <h2 className="text-base sm:text-lg font-bold text-indigo-400 print:text-blue-800 uppercase tracking-wider border-b border-slate-800/80 print:border-slate-300 pb-1.5 flex items-center space-x-2">
                        <Briefcase className="w-4 h-4 text-indigo-400 print:text-blue-700" />
                        <span>Experiences & Selected Engineering Projects</span>
                    </h2>

                    <div className="space-y-4 text-xs sm:text-sm">
                        {/* Project 1 */}
                        <div className="space-y-1">
                            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between font-bold text-white print:text-slate-950">
                                <h3>Mechanical Design and Development of a 3-DOF Articulated Robot Arm</h3>
                                <span className="text-xs font-mono text-cyan-400/90 print:text-slate-600">Universitas Gadjah Mada</span>
                            </div>
                            <ul className="list-disc list-inside text-slate-300 print:text-slate-700 text-xs sm:text-sm pl-2 space-y-0.5">
                                <li>Designed a 3-DOF robotic arm using SOLIDWORKS, integrating mechanical components for efficient motion and structural stability.</li>
                            </ul>
                        </div>

                        {/* Project 2 */}
                        <div className="space-y-1">
                            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between font-bold text-white print:text-slate-950">
                                <h3>Design of a Portable Bamboo Slat Splitting Machine with Roller Feeding System and Diesel Power Drive</h3>
                                <span className="text-xs font-mono text-cyan-400/90 print:text-slate-600">Universitas Gadjah Mada</span>
                            </div>
                            <ul className="list-disc list-inside text-slate-300 print:text-slate-700 text-xs sm:text-sm pl-2 space-y-0.5">
                                <li>Designed a portable diesel-powered bamboo splitting machine using SOLIDWORKS, including roller feeding and mechanical transmission systems.</li>
                            </ul>
                        </div>

                        {/* Project 3 */}
                        <div className="space-y-1">
                            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between font-bold text-white print:text-slate-950">
                                <h3>Analisis Tegangan Crane Hook (mobile crane) dengan FEA</h3>
                                <span className="text-xs font-mono text-cyan-400/90 print:text-slate-600">Universitas Gadjah Mada</span>
                            </div>
                            <ul className="list-disc list-inside text-slate-300 print:text-slate-700 text-xs sm:text-sm pl-2 space-y-0.5">
                                <li>Optimized crane hook design using SOLIDWORKS FEA and topology optimization to reduce weight while maintaining structural integrity and load capacity.</li>
                            </ul>
                        </div>

                        {/* Project 4 */}
                        <div className="space-y-1">
                            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between font-bold text-white print:text-slate-950">
                                <h3>Design of a Shell and Tube Heat Exchanger</h3>
                                <span className="text-xs font-mono text-cyan-400/90 print:text-slate-600">Universitas Gadjah Mada</span>
                            </div>
                            <ul className="list-disc list-inside text-slate-300 print:text-slate-700 text-xs sm:text-sm pl-2 space-y-0.5">
                                <li>Designed a shell-and-tube heat exchanger, focusing on thermal performance, heat transfer efficiency, and mechanical design.</li>
                            </ul>
                        </div>

                        {/* Project 5 */}
                        <div className="space-y-1">
                            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between font-bold text-white print:text-slate-950">
                                <h3>Monitoring Cahaya dan Input Analog Berbasis Arduino UNO R3</h3>
                                <span className="text-xs font-mono text-cyan-400/90 print:text-slate-600">Universitas Gadjah Mada</span>
                            </div>
                            <ul className="list-disc list-inside text-slate-300 print:text-slate-700 text-xs sm:text-sm pl-2 space-y-0.5">
                                <li>Developed an Arduino UNO R3-based monitoring system to measure light intensity and analog input variations using an LDR and potentiometer, with real-time data visualization in Python.</li>
                            </ul>
                        </div>

                        {/* Non-Tech Experience */}
                        <div className="space-y-1">
                            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between font-bold text-white print:text-slate-950">
                                <h3>Barokah Sembada Pangan</h3>
                                <span className="text-xs font-mono text-slate-400 print:text-slate-600">Store Manager (Family-Owned Grocery Store)</span>
                            </div>
                            <ul className="list-disc list-inside text-slate-300 print:text-slate-700 text-xs sm:text-sm pl-2 space-y-0.5">
                                <li>Managed daily operations of a family-owned grocery store, including inventory, purchasing, pricing, and customer service.</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Section 2: Pendidikan */}
                <section className="space-y-4">
                    <h2 className="text-base sm:text-lg font-bold text-indigo-400 print:text-blue-800 uppercase tracking-wider border-b border-slate-800/80 print:border-slate-300 pb-1.5 flex items-center space-x-2">
                        <GraduationCap className="w-4 h-4 text-indigo-400 print:text-blue-700" />
                        <span>Pendidikan</span>
                    </h2>

                    <div className="space-y-3 text-xs sm:text-sm">
                        <div className="space-y-1">
                            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between font-bold text-white print:text-slate-950">
                                <h3>Universitas Gadjah Mada <span className="font-normal text-slate-400 print:text-slate-600">- Yogyakarta, Indonesia</span></h3>
                                <span className="text-xs font-mono text-indigo-400 print:text-blue-800">Aug 2024 - Sekarang</span>
                            </div>
                            <p className="text-xs sm:text-sm font-semibold text-slate-300 print:text-slate-800">
                                Bachelor Degree Mechanical Engineering Technology • <strong className="text-indigo-300 print:text-black">IPK: 3.39 / 4.00</strong>
                            </p>
                            <ul className="list-disc list-inside text-slate-400 print:text-slate-700 text-xs pl-2">
                                <li>Guest Speaker for the Junior High School Alumni Association Launching Event</li>
                            </ul>
                        </div>

                        <div className="space-y-1 pt-1">
                            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between font-bold text-white print:text-slate-950">
                                <h3>SMAS IT IBNU ABBAS KLATEN <span className="font-normal text-slate-400 print:text-slate-600">- Klaten, Indonesia</span></h3>
                                <span className="text-xs font-mono text-slate-400 print:text-slate-600">Jul 2021 - Jun 2024</span>
                            </div>
                            <p className="text-xs text-slate-400 print:text-slate-700">Senior High School, Science</p>
                        </div>
                    </div>
                </section>

                {/* Section 3: Pengalaman Organisasi & Kepanitiaan */}
                <section className="space-y-4">
                    <h2 className="text-base sm:text-lg font-bold text-indigo-400 print:text-blue-800 uppercase tracking-wider border-b border-slate-800/80 print:border-slate-300 pb-1.5 flex items-center space-x-2">
                        <Users className="w-4 h-4 text-indigo-400 print:text-blue-700" />
                        <span>Pengalaman Organisasi dan Kepanitiaan</span>
                    </h2>

                    <div className="space-y-2.5 text-xs sm:text-sm divide-y divide-slate-800/40 print:divide-slate-200">
                        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between pt-2">
                            <div>
                                <h3 className="font-bold text-white print:text-slate-950">Jama'ah Shalahuddin <span className="font-normal text-slate-400">- Yogyakarta</span></h3>
                                <p className="text-xs text-slate-300 print:text-slate-700">Head of Cooperation and Upgrading Division</p>
                            </div>
                            <span className="text-xs font-mono text-indigo-400 print:text-slate-600">Jul 2025 - Feb 2026</span>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between pt-2">
                            <div>
                                <h3 className="font-bold text-white print:text-slate-950">Jama'ah Shalahuddin <span className="font-normal text-slate-400">- Yogyakarta</span></h3>
                                <p className="text-xs text-slate-300 print:text-slate-700">Cooperation and Upgrading Division Staff</p>
                            </div>
                            <span className="text-xs font-mono text-slate-400 print:text-slate-600">Jan 2025 - Jul 2025</span>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between pt-2">
                            <div>
                                <h3 className="font-bold text-white print:text-slate-950">Institutional Benchmarking Visit <span className="font-normal text-slate-400">- Surabaya, Malang</span></h3>
                                <p className="text-xs text-slate-300 print:text-slate-700">Representative of the Sharia Entrepreneurship Department</p>
                            </div>
                            <span className="text-xs font-mono text-slate-400 print:text-slate-600">Jun 2025</span>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between pt-2">
                            <div>
                                <h3 className="font-bold text-white print:text-slate-950">SAJADHA Qurban Volunteer Program <span className="font-normal text-slate-400">- Yogyakarta</span></h3>
                                <p className="text-xs text-slate-300 print:text-slate-700">Logistics & Equipment Staff</p>
                            </div>
                            <span className="text-xs font-mono text-slate-400 print:text-slate-600">Apr 2025 - Jun 2025</span>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between pt-2">
                            <div>
                                <h3 className="font-bold text-white print:text-slate-950">Event Volunteer – BerbagiRasa 2025 BEM KM UGM <span className="font-normal text-slate-400">- Yogyakarta</span></h3>
                                <p className="text-xs text-slate-300 print:text-slate-700">Subkoordinator Perlengkapan</p>
                            </div>
                            <span className="text-xs font-mono text-slate-400 print:text-slate-600">Aug 2025 - Oct 2025</span>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between pt-2">
                            <div>
                                <h3 className="font-bold text-white print:text-slate-950">Mechanical Fair UGM 2025</h3>
                                <p className="text-xs text-slate-300 print:text-slate-700">Finance & Treasury Staff</p>
                            </div>
                            <span className="text-xs font-mono text-slate-400 print:text-slate-600">Feb 2025 - May 2025</span>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between pt-2">
                            <div>
                                <h3 className="font-bold text-white print:text-slate-950">RBM (Ramadhan Bersama Mardhliyah) <span className="font-normal text-slate-400">- Yogyakarta</span></h3>
                                <p className="text-xs text-slate-300 print:text-slate-700">Logistics and Security Division Staff</p>
                            </div>
                            <span className="text-xs font-mono text-slate-400 print:text-slate-600">Jan 2025 - Apr 2025</span>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between pt-2">
                            <div>
                                <h3 className="font-bold text-white print:text-slate-950">RDK (Ramadhan Di Kampus) UGM</h3>
                                <p className="text-xs text-slate-300 print:text-slate-700">VIP Services Staff</p>
                            </div>
                            <span className="text-xs font-mono text-slate-400 print:text-slate-600">Nov 2025 - Mar 2026</span>
                        </div>
                    </div>
                </section>

                {/* Section 4: Keterampilan / Skills */}
                <section className="space-y-4">
                    <h2 className="text-base sm:text-lg font-bold text-indigo-400 print:text-blue-800 uppercase tracking-wider border-b border-slate-800/80 print:border-slate-300 pb-1.5 flex items-center space-x-2">
                        <Wrench className="w-4 h-4 text-indigo-400 print:text-blue-700" />
                        <span>Keterampilan & Engineering Matrix</span>
                    </h2>

                    <div className="space-y-3 text-xs sm:text-sm">
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-2">
                            <span className="md:col-span-4 font-bold text-white print:text-slate-950">Engineering Software:</span>
                            <span className="md:col-span-8 text-slate-300 print:text-slate-800">
                                SolidWorks, Fusion 360, AutoCAD, ANSYS Mechanical, Abaqus
                            </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-12 gap-2">
                            <span className="md:col-span-4 font-bold text-white print:text-slate-950">Technical Specialization:</span>
                            <span className="md:col-span-8 text-slate-300 print:text-slate-800">
                                Piping Engineering (ASME B31.3), P&ID Development, Finite Element Analysis (FEA), Reverse Engineering, Material Selection, Heat Transfer Analysis
                            </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-12 gap-2">
                            <span className="md:col-span-4 font-bold text-white print:text-slate-950">Soft Skills:</span>
                            <span className="md:col-span-8 text-slate-300 print:text-slate-800">
                                Team Leadership, Team Coordination, Problem Solving, Critical Thinking, Task & Project Management, Technical Communication
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
        </div>
    );
}
