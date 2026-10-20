<?php

namespace Database\Seeders;

use App\Models\ContactMessage;
use App\Models\Experience;
use App\Models\Profile;
use App\Models\Project;
use App\Models\Skill;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Admin user for logging into the admin panel
        User::updateOrCreate(
            ['email' => 'admin@daffa.eng'],
            [
                'name' => 'Achmad Daffa Ihtifazuddin',
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
            ]
        );

        // Profile Data
        Profile::updateOrCreate(
            ['id' => 1],
            [
                'full_name' => 'Achmad Daffa Ihtifazuddin',
                'headline' => 'Mechanical Engineering Student | Piping Engineering Enthusiast',
                'bio_summary' => 'Mahasiswa Teknik Mesin Universitas Gadjah Mada semester 5 dengan peminatan Piping Engineering. Mampu membaca dan membuat P&ID, serta berpengalaman menggunakan SolidWorks, AutoCAD, Fusion 360, ANSYS, dan Abaqus untuk desain mekanik, desain manufaktur, dan Finite Element Analysis (FEA). Siap berkontribusi dan terus berkembang melalui program magang.',
                'university' => 'Universitas Gadjah Mada (UGM)',
                'study_program' => 'D4 Mechanical Engineering Technology, School of Vocational Studies',
                'semester' => 'Semester 5',
                'focus_area' => 'Piping Engineering, P&ID, Manufacturing Design',
                'internship_seeking' => 'Seeking an internship in the oil & gas industry',
                'goals_academic' => 'During my studies, I aim to excel academically, take an active role in organizations and committees, and join engineering competitions.',
                'goals_career' => 'My career aspiration is to become a professional mechanical engineer or an industrial leader who contributes to technological advancement in Indonesia, solving real-world challenges with integrity and dedication to the nation.',
                'email' => 'achmaddaffaihtifazuddin@gmail.com',
                'phone' => '089649691208',
                'location' => 'Karanganyar, Jawa Tengah, Indonesia',
                'linkedin_url' => 'https://www.linkedin.com/in/achmaddaffaihtifazuddin',
                'github_url' => 'https://github.com/daffaihtifazuddin',
                'drive_portfolio_url' => 'https://drive.google.com/drive/folders/daffa-portfolio',
                'resume_path' => null,
                'avatar_url' => 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600',
                'hero_badge' => 'Open for Oil & Gas Internship',
            ]
        );

        // Technical Skills
        $skills = [
            // Design & CAD
            [
                'name' => 'SolidWorks',
                'category' => 'Design & CAD',
                'proficiency' => 92,
                'icon' => 'Box',
                'description' => '3D parametric modeling, complex sheet metal, pipe routing & assembly design',
                'sort_order' => 1,
            ],
            [
                'name' => 'Fusion 360',
                'category' => 'Design & CAD',
                'proficiency' => 88,
                'icon' => 'Cpu',
                'description' => 'Generative design, cloud CAD collaboration, and manufacturing toolpaths',
                'sort_order' => 2,
            ],
            [
                'name' => 'AutoCAD',
                'category' => 'Design & CAD',
                'proficiency' => 90,
                'icon' => 'PenTool',
                'description' => '2D drafting, technical orthographic projections, and isometric drawings',
                'sort_order' => 3,
            ],

            // Analysis & Simulation
            [
                'name' => 'ANSYS Mechanical',
                'category' => 'Analysis & Simulation',
                'proficiency' => 85,
                'icon' => 'Activity',
                'description' => 'Static structural analysis, thermal gradient checks, and meshing optimization',
                'sort_order' => 4,
            ],
            [
                'name' => 'Abaqus',
                'category' => 'Analysis & Simulation',
                'proficiency' => 82,
                'icon' => 'Zap',
                'description' => 'Non-linear material behavior, boundary conditions, and deformation modeling',
                'sort_order' => 5,
            ],
            [
                'name' => 'Finite Element Analysis (FEA)',
                'category' => 'Analysis & Simulation',
                'proficiency' => 86,
                'icon' => 'Compass',
                'description' => 'Stress concentration analysis, safety factor evaluation, and modal study',
                'sort_order' => 6,
            ],

            // Engineering Focus
            [
                'name' => 'Piping Engineering',
                'category' => 'Engineering Focus',
                'proficiency' => 93,
                'icon' => 'Layers',
                'description' => 'ASME B31.3 compliance, pipe sizing, support spacing, and thermal expansion',
                'sort_order' => 7,
            ],
            [
                'name' => 'P&ID Development',
                'category' => 'Engineering Focus',
                'proficiency' => 91,
                'icon' => 'GitCommit',
                'description' => 'Piping & Instrumentation Diagrams, instrumentation loops, control logic',
                'sort_order' => 8,
            ],
            [
                'name' => 'Manufacturing Design',
                'category' => 'Engineering Focus',
                'proficiency' => 88,
                'icon' => 'Settings',
                'description' => 'DFM/DFA, welding symbols, tolerance stack-up (GD&T), fabrication drawing',
                'sort_order' => 9,
            ],

            // Soft Skills
            [
                'name' => 'Teamwork & Collaboration',
                'category' => 'Soft Skills',
                'proficiency' => 95,
                'icon' => 'Users',
                'description' => 'Cross-functional engineering project communication and peer synchronization',
                'sort_order' => 10,
            ],
            [
                'name' => 'Technical Communication',
                'category' => 'Soft Skills',
                'proficiency' => 92,
                'icon' => 'MessageSquare',
                'description' => 'Technical report authoring, client presentation, and design documentation',
                'sort_order' => 11,
            ],
            [
                'name' => 'Analytical Problem-Solving',
                'category' => 'Soft Skills',
                'proficiency' => 94,
                'icon' => 'Target',
                'description' => 'Root-cause analysis, engineering optimization, and pragmatic solution finding',
                'sort_order' => 12,
            ],
        ];

        foreach ($skills as $skill) {
            Skill::updateOrCreate(
                ['name' => $skill['name']],
                $skill
            );
        }

        // Projects from CV
        $projects = [
            [
                'title' => 'Mechanical Design and Development of a 3-DOF Articulated Robot Arm',
                'slug' => 'mechanical-design-3dof-articulated-robot-arm',
                'category' => 'Design & CAD',
                'role' => 'Mechanical CAD Designer',
                'tools' => 'SOLIDWORKS, Kinematic Analysis, 3D Assembly',
                'year' => '2024',
                'description' => 'Designed a 3-DOF robotic arm using SOLIDWORKS, integrating mechanical components for efficient motion and structural stability.',
                'problem' => 'Need for an optimized 3-degree-of-freedom robotic manipulator with balanced torque distribution and minimal joint backlash.',
                'solution' => 'Modeled individual arm segments, actuators, and link mechanisms in SOLIDWORKS with dynamic motion simulation and interference detection.',
                'result' => 'Delivered complete 3D assembly and manufacturing part drawings ensuring smooth angular displacement and high structural rigidity.',
                'image_url' => 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=900',
                'demo_url' => null,
                'drive_url' => null,
                'is_featured' => true,
                'sort_order' => 1,
            ],
            [
                'title' => 'Design of a Portable Bamboo Slat Splitting Machine with Roller Feeding System and Diesel Power Drive',
                'slug' => 'portable-bamboo-slat-splitting-machine',
                'category' => 'Design & CAD',
                'role' => 'Lead Machine Designer',
                'tools' => 'SOLIDWORKS, Mechanical Transmission, Machine Design',
                'year' => '2024',
                'description' => 'Designed a portable diesel-powered bamboo splitting machine using SOLIDWORKS, including roller feeding and mechanical transmission systems.',
                'problem' => 'Manual bamboo splitting is labor-intensive, hazardous, and yields inconsistent slat thicknesses for construction and handicraft industries.',
                'solution' => 'Engineered a motorized roller feeding mechanism coupled to a diesel power unit with interchangeable radial wedge cutters.',
                'result' => 'Multiplied processing throughput by 4x with uniform slat cutting and enhanced operator safety through ergonomic guard placement.',
                'image_url' => 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=900',
                'demo_url' => null,
                'drive_url' => null,
                'is_featured' => true,
                'sort_order' => 2,
            ],
            [
                'title' => 'Analisis Tegangan Crane Hook (mobile crane) dengan FEA',
                'slug' => 'analisis-tegangan-crane-hook-fea',
                'category' => 'Analysis & Simulation',
                'role' => 'FEA Simulation Engineer',
                'tools' => 'SOLIDWORKS Simulation, FEA, Topology Optimization',
                'year' => '2024',
                'description' => 'Optimized crane hook design using SOLIDWORKS FEA and topology optimization to reduce weight while maintaining structural integrity and load capacity.',
                'problem' => 'Excess deadweight in standard mobile crane lifting hooks increases hoist inertia while stress concentrations at critical radii risk fatigue failure.',
                'solution' => 'Conducted von Mises stress simulations, mesh convergence analyses, and iterative topology optimization along load path contours.',
                'result' => 'Reduced hook mass significantly while verifying a safety factor > 2.5 under maximum certified rated capacity.',
                'image_url' => 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&q=80&w=900',
                'demo_url' => null,
                'drive_url' => null,
                'is_featured' => true,
                'sort_order' => 3,
            ],
            [
                'title' => 'Design of a Shell and Tube Heat Exchanger',
                'slug' => 'design-shell-and-tube-heat-exchanger',
                'category' => 'Engineering Focus',
                'role' => 'Thermal & Mechanical Designer',
                'tools' => 'SolidWorks, Thermal Calculations, TEMA Standards',
                'year' => '2024',
                'description' => 'Designed a shell-and-tube heat exchanger, focusing on thermal performance, heat transfer efficiency, and mechanical design.',
                'problem' => 'Balancing tube bundle pressure drop and thermal effectiveness under varying industrial process fluid flow regimes.',
                'solution' => 'Calculated overall heat transfer coefficient (U), baffle spacing, and pitch layout according to TEMA and ASME codes.',
                'result' => 'Maximized thermal duty efficiency with optimized tube sheet thickness and minimal fouling potential.',
                'image_url' => 'https://images.unsplash.com/photo-1581092162384-8987c1d64718?auto=format&fit=crop&q=80&w=900',
                'demo_url' => null,
                'drive_url' => null,
                'is_featured' => true,
                'sort_order' => 4,
            ],
            [
                'title' => 'Monitoring Cahaya dan Input Analog Berbasis Arduino UNO R3',
                'slug' => 'monitoring-cahaya-input-analog-arduino',
                'category' => 'Engineering Focus',
                'role' => 'Instrumentation & Controls Specialist',
                'tools' => 'Arduino UNO R3, LDR Sensor, Python Data Visualization',
                'year' => '2024',
                'description' => 'Developed an Arduino UNO R3-based monitoring system to measure light intensity and analog input variations using an LDR and potentiometer, with real-time data visualization in Python.',
                'problem' => 'Need for accurate real-time telemetry logging of analog sensor fluctuations with automated serial data capture.',
                'solution' => 'Programmed micro-controller firmware for ADC signal conditioning and developed a Python plotting interface via PySerial and Matplotlib.',
                'result' => 'Continuous high-fidelity data logging with live response graphing and zero packet loss over serial communication.',
                'image_url' => 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=900',
                'demo_url' => null,
                'drive_url' => null,
                'is_featured' => false,
                'sort_order' => 5,
            ],
        ];

        foreach ($projects as $project) {
            Project::updateOrCreate(
                ['slug' => $project['slug']],
                $project
            );
        }

        // Experiences & Education from CV
        $experiences = [
            [
                'type' => 'education',
                'title' => 'Bachelor Degree Mechanical Engineering Technology',
                'organization' => 'Universitas Gadjah Mada (UGM) - Yogyakarta, Indonesia',
                'period' => 'Aug 2024 - Sekarang',
                'location' => 'Yogyakarta, Indonesia',
                'description' => 'IPK: 3.32 / 4.00. Guest Speaker for the Junior High School Alumni Association Launching Event. Fokus pada Piping Engineering, P&ID, Desain Manufaktur, dan FEA.',
                'sort_order' => 1,
            ],
            [
                'type' => 'education',
                'title' => 'Senior High School, Science',
                'organization' => 'SMAS IT IBNU ABBAS KLATEN',
                'period' => 'Jul 2021 - Jun 2024',
                'location' => 'Klaten, Indonesia',
                'description' => 'Pendidikan Menengah Atas dengan fokus peminatan Ilmu Pengetahuan Alam (IPA).',
                'sort_order' => 2,
            ],
            [
                'type' => 'experience',
                'title' => 'Head of Cooperation and Upgrading Division',
                'organization' => "Jama'ah Shalahuddin",
                'period' => 'Jul 2025 - Feb 2026',
                'location' => 'Yogyakarta, Indonesia',
                'description' => 'Memimpin divisi kerja sama eksternal dan peningkatan kapasitas internal organisasi.',
                'sort_order' => 3,
            ],
            [
                'type' => 'experience',
                'title' => 'Cooperation and Upgrading Division Staff',
                'organization' => "Jama'ah Shalahuddin",
                'period' => 'Jan 2025 - Jul 2025',
                'location' => 'Yogyakarta, Indonesia',
                'description' => 'Staff pelaksana divisi kerja sama dan program upgrading anggota.',
                'sort_order' => 4,
            ],
            [
                'type' => 'experience',
                'title' => 'Representative of the Sharia Entrepreneurship Department',
                'organization' => 'Institutional Benchmarking Visit',
                'period' => 'Jun 2025',
                'location' => 'Surabaya, Malang, Indonesia',
                'description' => 'Perwakilan resmi departemen kewirausahaan dalam kunjungan benchmarking antar institusi.',
                'sort_order' => 5,
            ],
            [
                'type' => 'experience',
                'title' => 'Subkoordinator Perlengkapan',
                'organization' => 'Event Volunteer – BerbagiRasa 2025 BEM KM UGM',
                'period' => 'Aug 2025 - Oct 2025',
                'location' => 'Yogyakarta, Indonesia',
                'description' => 'Bertanggung jawab atas koordinasi pengadaan dan manajemen logistik perlengkapan acara.',
                'sort_order' => 6,
            ],
            [
                'type' => 'experience',
                'title' => 'Finance & Treasury Staff',
                'organization' => 'Mechanical Fair UGM 2025',
                'period' => 'Feb 2025 - May 2025',
                'location' => 'Yogyakarta, Indonesia',
                'description' => 'Mengelola anggaran, pencatatan transaksi, dan perbendaharaan acara tahunan Mechanical Fair UGM.',
                'sort_order' => 7,
            ],
            [
                'type' => 'experience',
                'title' => 'VIP Services Staff',
                'organization' => 'RDK (Ramadhan Di Kampus) UGM',
                'period' => 'Nov 2025 - Mar 2026',
                'location' => 'Yogyakarta, Indonesia',
                'description' => 'Pelayanan dan keprotokoleran tamu VIP pada rangkaian acara akbar Ramadhan di Kampus UGM.',
                'sort_order' => 8,
            ],
        ];

        foreach ($experiences as $exp) {
            Experience::updateOrCreate(
                ['title' => $exp['title'], 'organization' => $exp['organization']],
                $exp
            );
        }

        // Sample Inquiry Contact Message
        ContactMessage::updateOrCreate(
            ['email' => 'recruiter@pertamina-internship.com'],
            [
                'name' => 'Oil & Gas Talent Acquisition',
                'subject' => 'Internship Opportunity - Piping Engineering Division',
                'message' => 'Hello Daffa, we reviewed your mechanical and piping portfolio with great interest. We would like to invite you for an interview regarding our upcoming internship batch.',
                'is_read' => false,
            ]
        );
    }
}
