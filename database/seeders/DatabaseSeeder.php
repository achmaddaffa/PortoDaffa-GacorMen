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
                'bio_summary' => 'I am a Mechanical Engineering Technology student at the School of Vocational Studies, Universitas Gadjah Mada (UGM), with a strong interest in innovation, technology, and problem-solving. I enjoy designing and optimizing mechanical systems, and I have built solid teamwork and communication skills through collaborative technical projects. I am currently in my 5th semester, focusing on piping engineering and P&ID, and I am looking for an internship at an oil & gas company where I can apply my project experience to real engineering challenges.',
                'university' => 'Universitas Gadjah Mada (UGM)',
                'study_program' => 'D4 Mechanical Engineering Technology, School of Vocational Studies',
                'semester' => 'Semester 5',
                'focus_area' => 'Piping Engineering, P&ID, Manufacturing Design',
                'internship_seeking' => 'Seeking an internship in the oil & gas industry',
                'goals_academic' => 'During my studies, I aim to excel academically, take an active role in organizations and committees, and join engineering competitions.',
                'goals_career' => 'My career aspiration is to become a professional mechanical engineer or an industrial leader who contributes to technological advancement in Indonesia, solving real-world challenges with integrity and dedication to the nation.',
                'email' => 'daffaihtifazuddin@ugm.ac.id',
                'phone' => '+62 812-3456-7890',
                'location' => 'Central Java / D.I. Yogyakarta, Indonesia',
                'linkedin_url' => 'https://linkedin.com/in/achmad-daffa-ihtifazuddin',
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

        // Projects
        $projects = [
            [
                'title' => 'Piping & Instrumentation Diagram (P&ID) for Crude Distillation Pre-Flash System',
                'slug' => 'pid-crude-distillation-pre-flash-system',
                'category' => 'Piping Engineering',
                'role' => 'Piping Engineer & Lead P&ID Drafter',
                'tools' => 'AutoCAD Plant 3D, ASME B31.3, API Standards',
                'year' => '2024',
                'description' => 'Comprehensive P&ID schematic development for a crude pre-flash separation column and pump manifold.',
                'problem' => 'Designing an oil & gas fluid handling system requires strict adherence to ASME B31.3 codes, proper pressure relief sizing, and fail-safe instrument loops to prevent thermal overpressure.',
                'solution' => 'Engineered end-to-end piping diagrams including pump dual-isolation valves, bypass lines, flow control loops, and high-pressure emergency shutdown (ESD) interlocks.',
                'result' => 'Delivered an industry-compliant engineering documentation package with zero line clashes and verified hazardous fluids safety specifications.',
                'image_url' => 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=900',
                'demo_url' => 'https://drive.google.com/drive/folders/daffa-pid',
                'drive_url' => 'https://drive.google.com/drive/folders/daffa-pid',
                'is_featured' => true,
                'sort_order' => 1,
            ],
            [
                'title' => 'High-Pressure Gas Flange & Valve Manifold Stress FEA Analysis',
                'slug' => 'high-pressure-flange-valve-fea-analysis',
                'category' => 'Analysis & Simulation',
                'role' => 'FEA Simulation Specialist',
                'tools' => 'SolidWorks, ANSYS Mechanical, Abaqus',
                'year' => '2024',
                'description' => 'Non-linear stress and fatigue simulation on class-600 ANSI high-pressure flange assemblies under cyclical thermal and internal hydraulic pressure.',
                'problem' => 'Severe cyclical pressure surges up to 150 bar resulted in risk of gasket seat leakage and localized plastic deformation in neck fillets.',
                'solution' => 'Performed finite element mesh convergence study, applied non-linear elastoplastic material properties, and optimized bolt pre-tension torque sequence.',
                'result' => 'Achieved 28% reduction in peak localized von Mises stress and validated a minimum safety factor of 2.25 under maximum operating envelope.',
                'image_url' => 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&q=80&w=900',
                'demo_url' => null,
                'drive_url' => 'https://drive.google.com/drive/folders/daffa-fea',
                'is_featured' => true,
                'sort_order' => 2,
            ],
            [
                'title' => 'Modular Skid Piping Spool 3D Layout & Fabrication BOM Optimization',
                'slug' => 'modular-skid-piping-spool-layout-bom',
                'category' => 'Design & CAD',
                'role' => 'Lead CAD Designer',
                'tools' => 'SolidWorks Routing, Fusion 360, GD&T',
                'year' => '2023 - 2024',
                'description' => '3D parametric spool modeling, structural frame skid design, and automated bill-of-materials generator for offshore platform skid.',
                'problem' => 'Strict skid footprint limitations required tight bend radii and compact support spacing while preserving ergonomic valve operation and maintenance access.',
                'solution' => 'Devised an isometric 3D routing arrangement with modular spring supports, vibration dampening clamps, and customized flanged connections.',
                'result' => 'Reduced total skid footprint by 15%, eliminated workshop rework, and generated an accurate 100% verified fabrication BOM cut list.',
                'image_url' => 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=900',
                'demo_url' => null,
                'drive_url' => 'https://drive.google.com/drive/folders/daffa-cad',
                'is_featured' => true,
                'sort_order' => 3,
            ],
        ];

        foreach ($projects as $project) {
            Project::updateOrCreate(
                ['slug' => $project['slug']],
                $project
            );
        }

        // Experiences & Education
        $experiences = [
            [
                'type' => 'education',
                'title' => 'D4 Mechanical Engineering Technology',
                'organization' => 'Universitas Gadjah Mada (UGM) - School of Vocational Studies',
                'period' => '2022 - Present (Semester 5)',
                'location' => 'Yogyakarta, Indonesia',
                'description' => 'Focusing in-depth on Piping Engineering, P&ID, manufacturing processes, thermo-fluid mechanics, and CAD/FEA simulation.',
                'sort_order' => 1,
            ],
            [
                'type' => 'experience',
                'title' => 'Mechanical Design & Piping Engineering Lead',
                'organization' => 'UGM Engineering Laboratory & Student Project',
                'period' => '2023 - 2024',
                'location' => 'Yogyakarta, Indonesia',
                'description' => 'Led mechanical 3D modeling, stress simulation, piping isometric drawings, and prototype fabrication validation.',
                'sort_order' => 2,
            ],
            [
                'type' => 'organization',
                'title' => 'Active Member & Technical Committee',
                'organization' => 'Mechanical Engineering Student Association (KMTM / HMTM) UGM',
                'period' => '2022 - Present',
                'location' => 'Yogyakarta, Indonesia',
                'description' => 'Coordinated engineering CAD design workshops, technical seminars, and team collaborative projects.',
                'sort_order' => 3,
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
