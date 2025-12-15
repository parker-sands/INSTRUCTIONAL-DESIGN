import React from 'react';
import { Building, MapPin, Users, TrendingUp, Globe, Layers } from 'lucide-react';

const OrganizationProfile: React.FC = () => {
  return (
    <div className="space-y-12 max-w-7xl mx-auto">
      <div className="border-b border-illini-storm-light pb-6">
        <h1 className="text-4xl md:text-5xl font-extrabold text-illini-blue font-montserrat mb-3">Organization Profile</h1>
        <p className="text-2xl text-illini-storm">Innovation and Technology Insight (ITI)</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-12">
        
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-10">
          <section className="bg-white p-10 rounded-2xl shadow-sm border-l-8 border-illini-orange">
            <h2 className="text-3xl font-bold text-illini-blue mb-6 font-montserrat flex items-center gap-3">
              <Building className="text-illini-orange" size={32} /> About ITI
            </h2>
            <div className="prose text-xl text-illini-storm-dark leading-relaxed">
              <p className="mb-6">
                Founded in 1988, <strong>Innovation and Technology Insight (ITI)</strong> provides information technology integration services and solutions to technology-driven organizations around the world.
              </p>
              <p>
                ITI specializes in B2B IT solutions, secure infrastructure, outsourcing, and on-site consultation for digital transformation. The company serves clients in manufacturing, finance, healthcare, education, and media across <strong>43 countries</strong>.
              </p>
            </div>
          </section>

          <section className="bg-white p-10 rounded-2xl shadow-sm border-l-8 border-illini-industrial">
            <h2 className="text-3xl font-bold text-illini-blue mb-6 font-montserrat flex items-center gap-3">
              <Users className="text-illini-industrial" size={32} /> Workforce Demographics
            </h2>
            <div className="grid sm:grid-cols-2 gap-8">
              <div className="bg-illini-cloud p-6 rounded-xl">
                <div className="text-5xl font-bold text-illini-blue mb-2">20,000</div>
                <div className="text-base text-illini-storm uppercase font-bold tracking-wide">Total Employees</div>
              </div>
               <div className="bg-illini-cloud p-6 rounded-xl">
                <div className="text-5xl font-bold text-illini-blue mb-2">37.7</div>
                <div className="text-base text-illini-storm uppercase font-bold tracking-wide">Avg. Age (Full-time)</div>
              </div>
              <ul className="space-y-4 text-lg text-illini-storm-dark sm:col-span-2 mt-2">
                <li className="flex justify-between border-b border-slate-200 pb-2">
                  <span>Full-time / Contract</span>
                  <span className="font-bold">70% / 30%</span>
                </li>
                 <li className="flex justify-between border-b border-slate-200 pb-2">
                  <span>Engineers (Software/System)</span>
                  <span className="font-bold">85%</span>
                </li>
                 <li className="flex justify-between border-b border-slate-200 pb-2">
                  <span>Education (4-Year Degree+)</span>
                  <span className="font-bold">95%</span>
                </li>
                <li className="flex justify-between border-b border-slate-200 pb-2">
                  <span>Gender Ratio (Male:Female)</span>
                  <span className="font-bold">5 : 1</span>
                </li>
              </ul>
            </div>
          </section>

           <section className="bg-white p-10 rounded-2xl shadow-sm border-l-8 border-illini-berry">
            <h2 className="text-3xl font-bold text-illini-blue mb-6 font-montserrat flex items-center gap-3">
              <TrendingUp className="text-illini-berry" size={32} /> Strategic Goals
            </h2>
            <div className="text-xl text-illini-storm-dark leading-relaxed space-y-4">
              <p>
                ITI has been aggressively expanding since 2012. In 2017, ITI budgeted <strong>$20 million</strong> for annual Learning & Development (11% of overall budget) to accommodate rapid growth.
              </p>
              <p>
                <strong>Key Goal:</strong> Expansion into Latin America, Asia, Europe, and Africa, requiring an increase in project managers and engineers.
              </p>
            </div>
          </section>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-8">
          <div className="bg-illini-blue text-white p-8 rounded-2xl shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <MapPin className="text-illini-orange" size={28} />
              <h3 className="font-bold font-montserrat text-2xl">Locations</h3>
            </div>
            <ul className="space-y-6 text-lg">
              <li>
                <strong className="block text-illini-orange mb-1">Headquarters</strong>
                Chicago Loop, Illinois, USA
              </li>
              <li>
                <strong className="block text-blue-200 mb-1">Tech Center</strong>
                Schaumburg, Illinois
              </li>
              <li>
                <strong className="block text-blue-200 mb-1">R & D Center</strong>
                Champaign-Urbana, Illinois
              </li>
            </ul>
            <div className="mt-8 pt-8 border-t border-white/20">
              <h4 className="font-bold mb-4 flex items-center gap-2 text-xl"><Globe size={24}/> Global Offices</h4>
              <p className="text-sm text-blue-200 leading-relaxed font-medium">
                NYC, Los Angeles, Seattle, Dallas, Atlanta, Toronto, Vancouver, Mexico City, Buenos Aires, Nairobi, Johannesburg, Cairo, Riyadh, Tokyo, Taipei, Seoul, Shanghai, Hong Kong, Singapore, Manila, Bangkok, Kuala Lumpur, Dubai, London, Berlin, Paris, St. Petersburg.
              </p>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-md border-t-8 border-illini-industrial relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-5">
               <Layers size={120} />
             </div>
             <h3 className="font-bold font-montserrat text-illini-blue mb-6 text-xl relative z-10">L&D Department Structure</h3>
             <p className="text-base text-illini-storm-dark mb-6 relative z-10">
               The Learning & Development team was recently divided into three units:
             </p>
             <ul className="space-y-4 text-base relative z-10">
               <li className="flex items-center gap-3">
                 <div className="w-8 h-8 rounded-full bg-illini-industrial text-white flex items-center justify-center font-bold text-sm shadow-sm">1</div>
                 <div className="px-4 py-3 bg-blue-50 rounded-lg text-illini-industrial font-bold border border-blue-100 w-full shadow-sm">Skills Training</div>
               </li>
               <li className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-illini-orange text-white flex items-center justify-center font-bold text-sm shadow-sm">2</div>
                  <div className="px-4 py-3 bg-orange-50 rounded-lg text-illini-orange font-bold border border-orange-200 w-full shadow-md">Management Development</div>
               </li>
               <li className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-illini-berry text-white flex items-center justify-center font-bold text-sm shadow-sm">3</div>
                  <div className="px-4 py-3 bg-purple-50 rounded-lg text-illini-berry font-bold border border-purple-100 w-full shadow-sm">Mandatory Training</div>
               </li>
             </ul>
             <p className="text-sm text-illini-industrial font-bold mt-8 italic text-center bg-blue-50 p-3 rounded-lg border border-blue-100">
               Team #10 is assigned to the Management Development unit.
             </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default OrganizationProfile;