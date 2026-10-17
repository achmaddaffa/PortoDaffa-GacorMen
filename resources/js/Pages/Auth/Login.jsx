import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { Mail, Lock, Eye, EyeOff, ArrowLeft, ShieldCheck, KeyRound } from 'lucide-react';

export default function Login({ status, canResetPassword }) {
    const [showPassword, setShowPassword] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: true,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-cyan-500 selection:text-slate-950 flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden">
            <Head title="Admin Login - Achmad Daffa Portfolio" />

            {/* Background Blueprint Grid & Ambient Glows */}
            <div className="absolute inset-0 bg-grid-pattern opacity-60 pointer-events-none"></div>
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-b from-cyan-600/15 via-blue-600/10 to-transparent blur-3xl pointer-events-none"></div>

            {/* Back to Home Button */}
            <div className="w-full max-w-md mb-6 flex justify-between items-center z-10">
                <Link
                    href="/"
                    className="inline-flex items-center space-x-2 text-xs font-semibold text-slate-400 hover:text-cyan-400 transition"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Kembali ke Website Portfolio</span>
                </Link>
                <span className="text-[11px] font-mono text-cyan-400/80 bg-cyan-950/40 px-2.5 py-1 rounded-md border border-cyan-800/40">
                    CMS v2.0
                </span>
            </div>

            {/* Login Card */}
            <div className="w-full max-w-md bg-slate-900/85 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 space-y-6 shadow-2xl relative z-10">
                {/* Header Brand */}
                <div className="text-center space-y-3">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-500 to-blue-600 flex items-center justify-center mx-auto shadow-lg shadow-indigo-500/25">
                        <KeyRound className="w-7 h-7 text-white" />
                    </div>
                    <div>
                        <h1 className="text-xl font-extrabold text-white tracking-tight">Admin Portal</h1>
                        <p className="text-xs text-cyan-400 font-mono">Achmad Daffa Ihtifazuddin Portfolio</p>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                        Masuk untuk mengelola data proyek CAD, matriks keahlian, riwayat studi UGM, dan pesan rekruter.
                    </p>
                </div>

                {status && (
                    <div className="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs font-medium text-center">
                        {status}
                    </div>
                )}

                {/* Form */}
                <form onSubmit={submit} className="space-y-4">
                    <div>
                        <label className="block text-xs font-medium text-slate-300 mb-1.5">Email Administrator</label>
                        <div className="relative">
                            <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                            <input
                                id="email"
                                type="email"
                                required
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                placeholder="admin@daffa.eng"
                                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 text-sm focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition"
                            />
                        </div>
                        {errors.email && <p className="text-xs text-rose-400 mt-1">{errors.email}</p>}
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-slate-300 mb-1.5">Password</label>
                        <div className="relative">
                            <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                            <input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                required
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                placeholder="••••••••"
                                className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 text-sm focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3.5 top-3 text-slate-500 hover:text-slate-300"
                            >
                                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        </div>
                        {errors.password && <p className="text-xs text-rose-400 mt-1">{errors.password}</p>}
                    </div>

                    <div className="flex items-center justify-between text-xs pt-1">
                        <label className="flex items-center space-x-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={data.remember}
                                onChange={(e) => setData('remember', e.target.checked)}
                                className="w-3.5 h-3.5 rounded text-cyan-500 border-slate-700 bg-slate-950 focus:ring-cyan-500"
                            />
                            <span className="text-slate-400">Ingat Saya</span>
                        </label>

                        {canResetPassword && (
                            <Link
                                href={route('password.request')}
                                className="text-slate-400 hover:text-cyan-400 transition"
                            >
                                Lupa Password?
                            </Link>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition shadow-lg shadow-cyan-500/25 flex items-center justify-center space-x-2 disabled:opacity-50 mt-2"
                    >
                        <ShieldCheck className="w-4 h-4" />
                        <span>{processing ? 'Memproses...' : 'Masuk ke Panel Admin'}</span>
                    </button>
                </form>
            </div>

            {/* Bottom Footer */}
            <p className="text-[11px] text-slate-600 mt-8 text-center z-10 font-mono">
                © {new Date().getFullYear()} Achmad Daffa Ihtifazuddin • UGM Vocational School
            </p>
        </div>
    );
}
