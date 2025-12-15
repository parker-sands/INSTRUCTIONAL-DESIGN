import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { MapPin, ArrowLeft, Briefcase, Award } from 'lucide-react';

const teamData: Record<string, any> = {
  'parker-sands': {
    name: 'Parker Sands',
    location: 'Urbana, IL (CST)',
    role: 'Instructional Designer',
    initial: 'P',
    color: 'bg-illini-industrial',
    bio: "Parker Sands brings over 16 years of experience in public school education to the team. With a diverse skillset spanning audio and video production, graphic design, web development, and computer programming, Parker has a track record of creating engaging curriculum, including multiple middle school classes designed from the ground up. Outside of design, Parker has spent over 5 years coaching high school tennis and leading adult fitness programs."
  },
  'charlie-stancik': {
    name: 'Charlie Stancik',
    location: 'San Francisco, CA (PST)',
    role: 'Instructional Designer',
    initial: 'C',
    color: 'bg-illini-arches',
    bio: "Charlie Stancik specializes in the technical and strategic sides of instructional design. With a strong technical background in scripting, API building, and full-stack development, Charlie bridges the gap between content and code. Currently, Charlie manages project lifecycles and oversees the onboarding process for all new employees and clients onto the company's proprietary software platforms."
  },
  'paige-miller': {
    name: 'Paige Miller',
    location: 'Ardmore, OK (CST)',
    role: 'Instructional Designer',
    initial: 'P',
    color: 'bg-illini-patina',
    bio: "Paige Miller is a creative specialist focusing on visual storytelling through videography, photography, and editing. An expert in the Apple hardware and software ecosystem, Paige excels at producing high-quality multimedia assets. As a training instructor, Paige is dedicated to delivering content in an engaging and accessible manner, ensuring learning experiences resonate with diverse audiences."
  }
};

const TeamMemberDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const member = teamData[id || ''];

  if (!member) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="space-y-8 animate-fade-in-up max-w-7xl mx-auto">
      <Link to="/" className="inline-flex items-center gap-2 text-illini-industrial font-bold hover:underline mb-4 text-lg">
        <ArrowLeft size={24} /> Back to Portfolio
      </Link>

      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200">
        <div className={`${member.color} p-12 text-white relative overflow-hidden`}>
           <div className="absolute top-0 right-0 p-12 opacity-10 transform translate-x-1/4 -translate-y-1/4">
             <div className="w-80 h-80 rounded-full bg-white blur-3xl"></div>
           </div>
           <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
             <div className="w-40 h-40 rounded-full bg-white text-illini-blue flex items-center justify-center text-6xl font-black shadow-2xl border-8 border-white/20">
               {member.initial}
             </div>
             <div className="text-center md:text-left">
               <h1 className="text-5xl md:text-6xl font-extrabold font-montserrat mb-4">{member.name}</h1>
               <div className="flex flex-wrap justify-center md:justify-start gap-6 text-blue-50 font-bold text-xl">
                 <span className="flex items-center gap-2 bg-black/10 px-4 py-2 rounded-full"><Briefcase size={22}/> {member.role}</span>
                 <span className="flex items-center gap-2 bg-black/10 px-4 py-2 rounded-full"><MapPin size={22}/> {member.location}</span>
               </div>
             </div>
           </div>
        </div>

        <div className="p-10 md:p-16">
          <h2 className="text-3xl font-bold text-illini-blue mb-10 font-montserrat flex items-center gap-4">
            <div className="p-3 bg-illini-orange/10 rounded-xl">
              <Award className="text-illini-orange" size={32} />
            </div>
            Background & Expertise
          </h2>
          <div className="p-8 rounded-3xl bg-illini-cloud border border-slate-200 hover:border-illini-orange transition-all shadow-sm">
            <p className="text-2xl text-illini-storm-dark leading-loose font-medium font-serif">
              {member.bio}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamMemberDetail;