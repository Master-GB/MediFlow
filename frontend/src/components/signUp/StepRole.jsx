import { useState } from 'react';
import { User, Building2, Sparkles, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import LandingNav from '../landingPage/landingNav';

const StepRole = ({ role, setRole, next }) => {
    const navigate = useNavigate();
    const [hoveredRole, setHoveredRole] = useState(null);
    const roles = [
        {
            id: 'patient',
            title: 'Patient',
            description: 'Access your health records, book appointments, and manage your healthcare journey',
            icon: User,
            gradient: 'from-blue-500 via-sky-500 to-indigo-500',
            benefits: ['Easy Doctor Discovery', 'Health Tracking & History', 'AI-Powered Health Insights', 'Digital Prescriptions & Records']
        },
        {
            id: 'clinic',
            title: 'Clinic',
            description: 'Manage appointments, patient records, doctors and streamline your practice operations',
            icon: Building2,
            gradient: 'from-emerald-500 via-teal-500 to-cyan-500',
            benefits: ['Patient Management', 'Analytics Dashboard', 'Team Collaboration', 'Doctor & Staff Coordination']
        }
    ];

    const handleRoleSelect = (roleId) => {
        setRole(roleId);
    };

    const handleContinue = () => {
        if (role) {
            next();
        }
    };

    return (
        <div className="min-h-screen w-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 overflow-x-hidden m-0 p-0">
            <LandingNav/>
            {/* Animated background elements */}
            <div className="fixed inset-0 overflow-hidden">
                <div className="absolute -top-32 -right-32 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse pointer-events-none"></div>
                <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse pointer-events-none" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl animate-pulse pointer-events-none" style={{ animationDelay: '2s' }}></div>
            </div>

            <div className="w-full max-w-5xl mx-auto relative z-10 px-4 sm:px-6 py-8 mt-20">
                {/* Header */}
                <div className="text-center mb-12 animate-fade-in">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-2">
                        <Sparkles className="w-8 h-8 text-cyan-400" />
                        <span className="text-5xl text-gray-300 font-bold ">Welcome to MediFlow Platform</span>
                    </div>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                        Select how you'd like to continue and unlock your personalized experience
                    </p>
                </div>

                {/* Role Cards */}
                <div className="grid md:grid-cols-2 gap-8 mb-8 max-w-4xl mx-auto">
                    {roles.map((roleItem, index) => {
                        const Icon = roleItem.icon;
                        const isHovered = hoveredRole === roleItem.id;
                        const isSelected = role === roleItem.id;

                        return (
                            <div
                                key={roleItem.id}
                                onMouseEnter={() => setHoveredRole(roleItem.id)}
                                onMouseLeave={() => setHoveredRole(null)}
                                onClick={() => handleRoleSelect(roleItem.id)}
                                className={`relative group cursor-pointer transition-all duration-500 ${isSelected ? 'scale-105' : 'hover:scale-105'
                                    }`}
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                {/* Glow effect */}
                                <div className={`absolute inset-0 bg-linear-to-r ${roleItem.gradient} opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-500 rounded-2xl`}></div>

                                {/* Card */}
                                <div className={`relative bg-white/5 backdrop-blur-xl rounded-2xl p-5 transition-all duration-500 overflow-hidden ${isSelected
                                        ? 'shadow-2xl'
                                        : isHovered
                                            ? 'border border-white/50 shadow-xl'
                                            : 'border border-white/10 shadow-lg'
                                    }`}>
                                    {/* Gradient border using pseudo-element */}
                                    {isSelected && (
                                        <div 
                                            className="absolute inset-0 rounded-2xl p-0.5"
                                            style={{
                                                background: `linear-gradient(90deg, ${role === 'patient' ? '#3b82f6, #0ea5e9, #6366f1' : '#10b981, #14b8a6, #06b6d4'})`,
                                                WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                                                WebkitMaskComposite: 'xor',
                                                maskComposite: 'exclude',
                                                pointerEvents: 'none'
                                            }}
                                        />
                                    )}
                                    {/* Icon */}
                                    <div className={`w-14 h-14 rounded-xl bg-linear-to-r ${roleItem.gradient} p-0.5 mb-4 transition-transform duration-500 ${isHovered ? 'rotate-6 scale-110' : ''
                                        }`}>
                                        <div className="w-full h-full bg-slate-900 rounded-xl flex items-center justify-center">
                                            <Icon className={`w-7 h-7 text-white transition-all duration-500 ${isHovered ? 'scale-110' : ''
                                                }`} />
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <h2 className="text-2xl font-bold text-white mb-2 transition-all duration-300">
                                        {roleItem.title}
                                    </h2>
                                    <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                                        {roleItem.description}
                                    </p>

                                    {/* Benefits */}
                                    <div className="space-y-2">
                                        {roleItem.benefits.map((benefit, idx) => (
                                            <div
                                                key={idx}
                                                className={`flex items-center gap-2 text-gray-300 transition-all duration-300 ${isHovered ? 'translate-x-2' : ''
                                                    }`}
                                                style={{ transitionDelay: `${idx * 50}ms` }}
                                            >
                                                <div className={`w-1.5 h-1.5 rounded-full bg-linear-to-r ${roleItem.gradient}`}></div>
                                                <span className="text-xs">{benefit}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Selection indicator */}
                                    {isSelected && (
                                        <div className="absolute top-4 right-4">
                                            <div className={`w-6 h-6 rounded-full bg-linear-to-r ${roleItem.gradient} flex items-center justify-center animate-pulse`}>
                                                <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Step Indicator */}
                <div className="flex justify-center mb-5">
                    <div className="flex items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium bg-blue-500 text-white `}>
                            1
                        </div>
                        <div className="w-16 h-0.5 bg-white/20 mx-2"></div>
                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium bg-white/10 text-gray-400">
                            2
                        </div>
                        <div className="w-16 h-0.5 bg-white/20 mx-2"></div>
                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium bg-white/10 text-gray-400">
                            3
                        </div>
                    </div>
                </div>

                {/* Footer with Links and Continue Button */}
                <div className="mt-1 mb-4 space-y-4 text-center animate-fade-in">
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-4 text-gray-500 text-sm">
                        <div className="flex items-center gap-1">
                            <span>Need help?</span>
                            <a
                                href="/contact"
                                className="text-cyan-400 hover:text-cyan-300 cursor-pointer hover:underline transition-colors flex items-center gap-1"
                            >
                                Contact Support
                            </a>
                        </div>
                        <div className="hidden sm:block w-px h-4 bg-gray-600"></div>
                        <div className="flex items-center gap-1">
                            <span>Already have an account?</span>
                            <a
                                href="/signIn"
                                className="text-cyan-400 hover:text-cyan-300 cursor-pointer hover:underline transition-colors font-medium flex items-center gap-1 group"
                            >
                                Sign In
                                <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100  mt-1 transition-opacity duration-200 -translate-x-1 group-hover:translate-x-0" />
                            </a>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <button
                            onClick={handleContinue}
                            disabled={!role}
                            className={`group px-8 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 ${role
                                    ? 'bg-linear-to-r from-blue-600 to-cyan-500 text-white hover:shadow-lg cursor-pointer hover:shadow-blue-500/50'
                                    : 'bg-white/10 text-gray-500 cursor-not-allowed'
                                }`}
                        >
                            <span>Continue</span>
                            <ArrowRight className={`w-5 h-5 transition-transform duration-300 ${role ? 'group-hover:translate-x-1' : ''
                                }`} />
                        </button>
                    </div>
                </div>
            </div>

            <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
      `}</style>
        </div>
    );
};

export default StepRole;