import React, { useRef, useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Save, UserCheck, GraduationCap, MapPin, Mail, Phone, Link2, Target, Briefcase, Upload, Trash2, ImageIcon } from 'lucide-react';

export default function ProfileSetting({ profile }) {
    const fileInput = useRef(null);
    const [preview, setPreview] = useState(profile?.avatar_src || null);
    const [removeAvatar, setRemoveAvatar] = useState(false);
    const [dragging, setDragging] = useState(false);

    const { data, setData, post, processing, errors, progress } = useForm({
        full_name: profile?.full_name || '',
        headline: profile?.headline || '',
        bio_summary: profile?.bio_summary || '',
        university: profile?.university || 'Universitas Gadjah Mada',
        study_program: profile?.study_program || '',
        semester: profile?.semester || 'Semester 5',
        focus_area: profile?.focus_area || '',
        internship_seeking: profile?.internship_seeking || '',
        goals_academic: profile?.goals_academic || '',
        goals_career: profile?.goals_career || '',
        email: profile?.email || '',
        phone: profile?.phone || '',
        location: profile?.location || 'Central Java, Indonesia',
        linkedin_url: profile?.linkedin_url || '',
        github_url: profile?.github_url || '',
        drive_portfolio_url: profile?.drive_portfolio_url || '',
        hero_badge: profile?.hero_badge || '',
        avatar: null,
        remove_avatar: false,
    });

    const pickFile = (file) => {
        if (!file) return;
        setData('avatar', file);
        setRemoveAvatar(false);
        setData('remove_avatar', false);
        setPreview(URL.createObjectURL(file));
    };

    const clearPhoto = () => {
        setData('avatar', null);
        setRemoveAvatar(true);
        setData('remove_avatar', true);
        setPreview(null);
        if (fileInput.current) fileInput.current.value = '';
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/admin/profile-setting', { forceFormData: true });
    };

    return (
        <AdminLayout title="Kelola Profil & Bio Portfolio">
            <Head title="Edit Profil - Daffa Admin" />

            <div className="max-w-5xl mx-auto space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-xl font-bold text-white tracking-tight">Pengaturan Informasi Portfolio</h1>
                        <p className="text-xs text-slate-400">Sesuaikan informasi diri, bio UGM, fokus perpipaan, dan kontak yang tampil di halaman utama.</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Primary Info Card */}
                    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-5">
                        <div className="flex items-center space-x-2 text-cyan-400 font-semibold text-sm pb-2 border-b border-slate-800">
                            <UserCheck className="w-4 h-4" />
                            <span>Identitas Utama & Tagline</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-medium text-slate-300 mb-1.5">Nama Lengkap</label>
                                <input
                                    type="text"
                                    value={data.full_name}
                                    onChange={(e) => setData('full_name', e.target.value)}
                                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 text-sm focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none"
                                />
                                {errors.full_name && <p className="text-xs text-rose-400 mt-1">{errors.full_name}</p>}
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-slate-300 mb-1.5">Headline / Subtitle</label>
                                <input
                                    type="text"
                                    value={data.headline}
                                    onChange={(e) => setData('headline', e.target.value)}
                                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 text-sm focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none"
                                />
                                {errors.headline && <p className="text-xs text-rose-400 mt-1">{errors.headline}</p>}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-medium text-slate-300 mb-1.5">Status Badge (Hero)</label>
                                <input
                                    type="text"
                                    value={data.hero_badge}
                                    onChange={(e) => setData('hero_badge', e.target.value)}
                                    placeholder="Available for Oil & Gas Internship"
                                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 text-sm focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none"
                                />
                            </div>
                        </div>

                        {/* Foto Profil — upload file */}
                        <div>
                            <label className="block text-xs font-medium text-slate-300 mb-2">Foto Profil</label>
                            <div
                                className={`flex flex-col sm:flex-row gap-4 p-4 rounded-2xl bg-slate-950 border transition ${dragging ? 'border-cyan-400/70 bg-cyan-500/5' : 'border-slate-700'}`}
                                onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                                onDragLeave={() => setDragging(false)}
                                onDrop={(e) => {
                                    e.preventDefault();
                                    setDragging(false);
                                    pickFile(e.dataTransfer.files?.[0]);
                                }}
                            >
                                <div className="shrink-0 w-28 aspect-[3/4] rounded-xl overflow-hidden bg-slate-900 border border-slate-700 flex items-center justify-center">
                                    {preview ? (
                                        <img src={preview} alt="Pratinjau foto profil" className="w-full h-full object-cover object-center" />
                                    ) : (
                                        <div className="text-center space-y-1 px-2">
                                            <ImageIcon className="w-7 h-7 text-slate-600 mx-auto" />
                                            <span className="block text-[10px] text-slate-600 leading-tight">Belum ada foto</span>
                                        </div>
                                    )}
                                </div>

                                <div className="flex-1 space-y-2">
                                    <input
                                        ref={fileInput}
                                        type="file"
                                        accept="image/jpeg,image/png,image/webp"
                                        onChange={(e) => pickFile(e.target.files?.[0])}
                                        className="hidden"
                                        id="avatar-file"
                                    />
                                    <div className="flex flex-wrap items-center gap-2">
                                        <button
                                            type="button"
                                            onClick={() => fileInput.current?.click()}
                                            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 text-xs font-semibold flex items-center gap-2 border border-slate-600 transition"
                                        >
                                            <Upload className="w-3.5 h-3.5" />
                                            <span>{preview ? 'Ganti Foto' : 'Unggah Foto'}</span>
                                        </button>

                                        {(preview || removeAvatar) && (
                                            <button
                                                type="button"
                                                onClick={clearPhoto}
                                                className="px-4 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 text-xs font-semibold flex items-center gap-2 border border-rose-500/30 transition"
                                            >
                                                <Trash2 className="w-3.5 h-3.5" />
                                                <span>Hapus</span>
                                            </button>
                                        )}
                                    </div>
                                    <p className="text-[11px] text-slate-400 leading-relaxed">
                                        Tarik & lepas foto ke sini, atau klik <span className="text-slate-200 font-medium">Unggah Foto</span>.
                                    </p>
                                    <p className="text-[11px] text-slate-500 leading-relaxed">
                                        JPG, PNG, atau WebP · maks 4 MB · rasio disarankan 3:4 (potret).
                                        Foto tampil di kartu hero beranda dan bisa diunduh pengunjung.
                                    </p>
                                    {data.avatar && (
                                        <p className="text-[11px] text-cyan-400 font-mono">
                                            {data.avatar.name} · {(data.avatar.size / 1024 / 1024).toFixed(2)} MB
                                            {progress ? ` · ${progress.percentage}%` : ''}
                                        </p>
                                    )}
                                    {errors.avatar && <p className="text-xs text-rose-400">{errors.avatar}</p>}
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-slate-300 mb-1.5">About Me (Bio Lengkap)</label>
                            <textarea
                                rows={4}
                                value={data.bio_summary}
                                onChange={(e) => setData('bio_summary', e.target.value)}
                                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 text-sm focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none"
                            />
                            {errors.bio_summary && <p className="text-xs text-rose-400 mt-1">{errors.bio_summary}</p>}
                        </div>
                    </div>

                    {/* Academic & Focus Details */}
                    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-5">
                        <div className="flex items-center space-x-2 text-cyan-400 font-semibold text-sm pb-2 border-b border-slate-800">
                            <GraduationCap className="w-4 h-4" />
                            <span>Pendidikan & Fokus Keteknikan (UGM)</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-medium text-slate-300 mb-1.5">Universitas / Institusi</label>
                                <input
                                    type="text"
                                    value={data.university}
                                    onChange={(e) => setData('university', e.target.value)}
                                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 text-sm focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-slate-300 mb-1.5">Program Studi & Fakultas</label>
                                <input
                                    type="text"
                                    value={data.study_program}
                                    onChange={(e) => setData('study_program', e.target.value)}
                                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 text-sm focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-xs font-medium text-slate-300 mb-1.5">Semester</label>
                                <input
                                    type="text"
                                    value={data.semester}
                                    onChange={(e) => setData('semester', e.target.value)}
                                    placeholder="Semester 5"
                                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 text-sm focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-slate-300 mb-1.5">Fokus Studi</label>
                                <input
                                    type="text"
                                    value={data.focus_area}
                                    onChange={(e) => setData('focus_area', e.target.value)}
                                    placeholder="Piping Engineering, P&ID"
                                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 text-sm focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-slate-300 mb-1.5">Target Magang</label>
                                <input
                                    type="text"
                                    value={data.internship_seeking}
                                    onChange={(e) => setData('internship_seeking', e.target.value)}
                                    placeholder="Seeking an internship in the oil & gas industry"
                                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 text-sm focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Goals & Aspirations */}
                    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-5">
                        <div className="flex items-center space-x-2 text-cyan-400 font-semibold text-sm pb-2 border-b border-slate-800">
                            <Target className="w-4 h-4" />
                            <span>Goals & Aspirations (Cita-cita & Komitmen)</span>
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-slate-300 mb-1.5">Target Semasa Studi (Academic & Org Goals)</label>
                            <textarea
                                rows={2}
                                value={data.goals_academic}
                                onChange={(e) => setData('goals_academic', e.target.value)}
                                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 text-sm focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-slate-300 mb-1.5">Aspirasi Karir (Career Aspirations)</label>
                            <textarea
                                rows={3}
                                value={data.goals_career}
                                onChange={(e) => setData('goals_career', e.target.value)}
                                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 text-sm focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none"
                            />
                        </div>
                    </div>

                    {/* Contact & Social Links */}
                    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-5">
                        <div className="flex items-center space-x-2 text-cyan-400 font-semibold text-sm pb-2 border-b border-slate-800">
                            <Link2 className="w-4 h-4" />
                            <span>Kontak & Tautan Eksternal</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-xs font-medium text-slate-300 mb-1.5">Email</label>
                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 text-sm focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-slate-300 mb-1.5">Nomor WhatsApp/Telepon</label>
                                <input
                                    type="text"
                                    value={data.phone}
                                    onChange={(e) => setData('phone', e.target.value)}
                                    placeholder="+62 8..."
                                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 text-sm focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-slate-300 mb-1.5">Lokasi</label>
                                <input
                                    type="text"
                                    value={data.location}
                                    onChange={(e) => setData('location', e.target.value)}
                                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 text-sm focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-xs font-medium text-slate-300 mb-1.5">LinkedIn URL</label>
                                <input
                                    type="url"
                                    value={data.linkedin_url}
                                    onChange={(e) => setData('linkedin_url', e.target.value)}
                                    placeholder="https://linkedin.com/in/..."
                                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 text-sm focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-slate-300 mb-1.5">GitHub URL</label>
                                <input
                                    type="url"
                                    value={data.github_url}
                                    onChange={(e) => setData('github_url', e.target.value)}
                                    placeholder="https://github.com/..."
                                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 text-sm focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-slate-300 mb-1.5">Google Drive / CAD Portfolio URL</label>
                                <input
                                    type="url"
                                    value={data.drive_portfolio_url}
                                    onChange={(e) => setData('drive_portfolio_url', e.target.value)}
                                    placeholder="https://drive.google.com/..."
                                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 text-sm focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end pt-2">
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm flex items-center space-x-2 transition shadow-lg shadow-cyan-500/25 disabled:opacity-50"
                        >
                            <Save className="w-4 h-4" />
                            <span>{processing ? 'Menyimpan...' : 'Simpan Perubahan'}</span>
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
