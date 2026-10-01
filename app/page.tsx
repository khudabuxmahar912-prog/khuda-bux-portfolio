'use client';

import { useState } from 'react';
import Link from 'next/link';
import { supabase } from '../src/lib/supabase';

export default function Home() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const { error: dbError } = await supabase
        .from('messages')
        .insert([
          { 
            name: formData.name, 
            email: formData.email, 
            message: formData.message 
          }
        ]);

      if (dbError) throw dbError;

      await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus('error');
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 font-sans px-6 py-12 max-w-6xl mx-auto">
      {/* Hero Section */}
      <header className="mb-16 border-b border-slate-800 pb-12">
        <div className="inline-block bg-teal-500/10 border border-teal-500/30 text-teal-400 font-medium text-xs px-3 py-1 rounded-full mb-4">
          Available for Opportunities
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-4 tracking-tight">
          Khuda Bux <span className="text-teal-400">.</span>
        </h1>
        <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mb-6 font-light leading-relaxed">
          Web Developer, AI/ML Enthusiast & AI Automation Specialist building responsive web applications, intelligent automation, and robust APIs.
        </p>
        <div className="flex flex-wrap gap-4 items-center">
          <Link href="#projects" className="bg-teal-400 hover:bg-teal-500 text-slate-950 font-bold px-6 py-3 rounded-xl transition shadow-lg shadow-teal-500/10">
            View Projects
          </Link>
          <a 
            href="/assets/resume/Khuda-Bux-CV.jpeg" 
            download="Khuda-Bux-CV.jpeg"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-xl transition shadow-lg shadow-blue-600/10 flex items-center gap-2"
          >
            Download CV 📥
          </a>
          <a 
            href="https://github.com/khudabuxmahar912-prog" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="border border-slate-700 hover:border-slate-500 bg-slate-900/50 text-slate-200 px-6 py-3 rounded-xl transition flex items-center gap-2"
          >
            GitHub Profile ↗
          </a>
          <Link href="#contact" className="border border-slate-800 hover:bg-slate-900 text-slate-400 hover:text-white px-6 py-3 rounded-xl transition">
            Contact Me
          </Link>
        </div>
      </header>

      {/* About Section */}
      <section className="mb-16">
        <div className="bg-slate-900/60 border border-slate-800 p-8 rounded-2xl">
          <p className="text-teal-400 text-xs font-semibold tracking-wider uppercase mb-2">ABOUT ME</p>
          <h2 className="text-2xl font-bold text-white mb-4">Passionate Software Developer & AI Builder</h2>
          <p className="text-slate-300 leading-relaxed">
            I specialize in full-stack web development, user interface design, and AI automation. With hands-on experience in modern web frameworks, version control workflows, and data structures, I build applications that solve real-world problems.
          </p>
        </div>
      </section>

      {/* Skills & Technologies */}
      <section className="mb-16">
        <div className="mb-6">
          <p className="text-teal-400 text-xs font-semibold tracking-wider uppercase mb-1">SKILLS & TECH STACK</p>
          <h2 className="text-3xl font-bold text-white">Technologies & Tools</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-xl">
            <h3 className="text-lg font-semibold text-teal-400 mb-3">Web & Frontend Development</h3>
            <div className="flex flex-wrap gap-2">
              {['Next.js', 'React', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'Responsive Web Design', 'UI/UX Design'].map((skill) => (
                <span key={skill} className="bg-slate-800/80 border border-slate-700/60 text-slate-200 px-3 py-1.5 rounded-lg text-sm">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-xl">
            <h3 className="text-lg font-semibold text-teal-400 mb-3">Backend, AI & Automation</h3>
            <div className="flex flex-wrap gap-2">
              {['Python', 'Java', 'Data Structures & Algorithms', 'REST APIs', 'AI & ML Fundamentals', 'Generative AI', 'AI Automation', 'Git & GitHub'].map((skill) => (
                <span key={skill} className="bg-slate-800/80 border border-slate-700/60 text-slate-200 px-3 py-1.5 rounded-lg text-sm">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Experience & Hackathons */}
      <section className="mb-16">
        <div className="mb-6">
          <p className="text-teal-400 text-xs font-semibold tracking-wider uppercase mb-1">EXPERIENCE & HACKATHONS</p>
          <h2 className="text-3xl font-bold text-white">Achievements & Participation</h2>
        </div>
        <div className="space-y-6">
          <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-xl hover:border-slate-700 transition">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-xl font-bold text-white">WeAreDevelopers Hackathon 2026</h3>
              <span className="text-xs bg-teal-500/10 text-teal-400 border border-teal-500/20 px-3 py-1 rounded-full font-mono">2026</span>
            </div>
            <p className="text-slate-400 text-sm mb-3">SIPA Signal Project Team Member</p>
            <p className="text-slate-300 text-sm leading-relaxed">
              Contributed as a primary developer on the SIPA Signal project, engineering rule-based modules to extract and remove filler phrases from AI-generated transcripts.
            </p>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-xl hover:border-slate-700 transition">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-xl font-bold text-white">NASA Space Apps Challenge 2026</h3>
              <span className="text-xs bg-teal-500/10 text-teal-400 border border-teal-500/20 px-3 py-1 rounded-full font-mono">2026</span>
            </div>
            <p className="text-slate-400 text-sm mb-3">AI Disaster Intelligence Project</p>
            <p className="text-slate-300 text-sm leading-relaxed">
              Designed the system architecture and proof-of-concept for an AI-powered Earth & Disaster Intelligence platform.
            </p>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="mb-16">
        <div className="mb-8">
          <p className="text-teal-400 text-xs font-semibold tracking-wider uppercase mb-1">FEATURED PROJECTS</p>
          <h2 className="text-3xl font-bold text-white">Selected Work</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* SIPA Signal */}
          <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-xl flex flex-col justify-between hover:border-teal-500/40 transition">
            <div>
              <span className="text-xs text-teal-400 font-mono uppercase">AI & Text Processing</span>
              <h3 className="text-xl font-bold text-white mt-1 mb-2">SIPA Signal</h3>
              <p className="text-slate-400 text-sm mb-4">
                An intelligent text filter and extraction tool designed to clean up AI conversational transcripts and filler phrases.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="bg-slate-800 text-xs text-slate-300 px-2.5 py-1 rounded-md">Python</span>
                <span className="bg-slate-800 text-xs text-slate-300 px-2.5 py-1 rounded-md">Pattern Matching</span>
              </div>
            </div>
            <a href="https://github.com/soulinpsyabstract/sipa-signal" target="_blank" rel="noopener noreferrer" className="text-teal-400 hover:text-teal-300 font-medium text-sm flex items-center gap-1">
              View Repository ↗
            </a>
          </div>

          {/* DecodeLabs Internship */}
          <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-xl flex flex-col justify-between hover:border-teal-500/40 transition">
            <div>
              <span className="text-xs text-teal-400 font-mono uppercase">Full Stack Projects</span>
              <h3 className="text-xl font-bold text-white mt-1 mb-2">DecodeLabs Internship</h3>
              <p className="text-slate-400 text-sm mb-4">
                Comprehensive collection of web applications, interactive UI components, and software tasks built during internship.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="bg-slate-800 text-xs text-slate-300 px-2.5 py-1 rounded-md">JavaScript</span>
                <span className="bg-slate-800 text-xs text-slate-300 px-2.5 py-1 rounded-md">HTML5 / CSS3</span>
              </div>
            </div>
            <a href="https://github.com/khudabuxmahar912-prog/DecodeLabs-Internship" target="_blank" rel="noopener noreferrer" className="text-teal-400 hover:text-teal-300 font-medium text-sm flex items-center gap-1">
              View Repository ↗
            </a>
          </div>

          {/* Student REST API */}
          <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-xl flex flex-col justify-between hover:border-teal-500/40 transition">
            <div>
              <span className="text-xs text-teal-400 font-mono uppercase">Backend System</span>
              <h3 className="text-xl font-bold text-white mt-1 mb-2">Student REST API</h3>
              <p className="text-slate-400 text-sm mb-4">
                RESTful backend API project engineered for full CRUD management of student records and server endpoints.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="bg-slate-800 text-xs text-slate-300 px-2.5 py-1 rounded-md">Node.js</span>
                <span className="bg-slate-800 text-xs text-slate-300 px-2.5 py-1 rounded-md">REST API</span>
              </div>
            </div>
            <a href="https://github.com/khudabuxmahar912-prog/student-api-project" target="_blank" rel="noopener noreferrer" className="text-teal-400 hover:text-teal-300 font-medium text-sm flex items-center gap-1">
              View Repository ↗
            </a>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact" className="bg-slate-900/80 border border-slate-800 p-8 rounded-2xl max-w-2xl mx-auto shadow-xl">
        <p className="text-teal-400 text-xs font-semibold tracking-wider uppercase mb-1">GET IN TOUCH</p>
        <h2 className="text-3xl font-bold text-white mb-2">Send Me A Message</h2>
        <p className="text-slate-400 text-sm mb-6">Interested in collaboration or hiring? Fill out the form below.</p>

        {status === 'success' ? (
          <div className="bg-teal-500/10 border border-teal-500/30 text-teal-300 p-4 rounded-xl text-center">
            Thank you! Your message has been sent successfully.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Your Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Khuda Bux"
                className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl p-3 text-sm focus:outline-none focus:border-teal-400 transition"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Your Email</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="khudabux@example.com"
                className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl p-3 text-sm focus:outline-none focus:border-teal-400 transition"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Your Message</label>
              <textarea
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Let's build something together..."
                className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl p-3 text-sm focus:outline-none focus:border-teal-400 transition"
              ></textarea>
            </div>
            <button
              type="submit"
              disabled={status === 'submitting'}
              className="w-full bg-teal-400 hover:bg-teal-500 text-slate-950 font-bold py-3.5 rounded-xl transition shadow-lg shadow-teal-500/10 disabled:opacity-50"
            >
              {status === 'submitting' ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        )}
      </section>

      {/* Footer */}
      <footer className="mt-20 pt-8 border-t border-slate-800 text-center text-slate-500 text-xs">
        © {new Date().getFullYear()} Khuda Bux. Built with Next.js & Tailwind CSS.
      </footer>
    </main>
  );
}