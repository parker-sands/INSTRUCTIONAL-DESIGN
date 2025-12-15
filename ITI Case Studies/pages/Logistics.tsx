import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { Briefcase, Clock, DollarSign } from 'lucide-react';
import { BudgetItem } from '../types';

const budgetData: BudgetItem[] = [
  { role: 'Senior Instructional Designer', annualSalary: 100000, monthlyEquivalent: 8333, percentTime: 100, costForMonth: 8333 },
  { role: 'Associate Instructional Designer', annualSalary: 80000, monthlyEquivalent: 6667, percentTime: 100, costForMonth: 6667 },
  { role: 'Assistant Instructional Designer', annualSalary: 65000, monthlyEquivalent: 5417, percentTime: 100, costForMonth: 5417 },
  { role: 'IT Subject Matter Expert', annualSalary: 125000, monthlyEquivalent: 10125, percentTime: 10, costForMonth: 1013 },
  { role: 'Translation Services Specialist', annualSalary: 70000, monthlyEquivalent: 5833, percentTime: 15, costForMonth: 875 },
  { role: 'IT/LMS Support Specialist', annualSalary: 90000, monthlyEquivalent: 7500, percentTime: 10, costForMonth: 750 },
];

// Illini Supporting Colors - Order corresponds to rows in the table
const COLORS = [
  '#1D58A7', // Industrial (Senior ID)
  '#009FD4', // Arches (Associate ID)
  '#007E8E', // Patina (Assistant ID)
  '#5C0E41', // Berry (SME)
  '#FCB316', // Harvest (Translation)
  '#006230', // Prairie (Support)
];

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);
};

const Logistics: React.FC = () => {
  const totalCost = budgetData.reduce((acc, item) => acc + item.costForMonth, 0);

  return (
    <div className="space-y-8">
      {/* Resources Text - Full Width */}
      <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
        <h2 className="text-xl font-bold text-illini-blue mb-6 flex items-center gap-2 font-montserrat">
          <Briefcase className="text-illini-orange" /> Resource Implications
        </h2>
        <div className="prose text-illini-storm-dark max-w-none">
          <p className="mb-4">
            Developing this three-part online training will require collaboration across several ITI business units.
          </p>
          <ul className="list-disc pl-5 space-y-2 mb-4">
            <li><strong>Instructional Design Team:</strong> Design the phishing, password creation, and device safety activities.</li>
            <li><strong>Human Resources:</strong> Support policy language accuracy.</li>
            <li><strong>IT Security SMEs:</strong> Ensure scenarios reflect correct digital security practices.</li>
            <li><strong>Translation Services:</strong> Support localization for ITI’s global workforce (20,000 employees).</li>
            <li><strong>IT Department:</strong> Assist with LMS integration, testing, and platform support.</li>
          </ul>
          <div className="bg-illini-cloud p-4 rounded-lg border border-slate-200 text-sm mt-6 flex gap-3">
            <Clock className="text-illini-storm flex-shrink-0" />
            <span>
              <strong>Timeline:</strong> The full training is expected to be designed and developed within <strong>one month</strong> using existing internal staff.
            </span>
          </div>
        </div>
      </section>

      {/* Side-by-Side Grid for Table and Chart */}
      <div className="grid lg:grid-cols-3 gap-8 items-start">
        
        {/* Budget Table - Span 2 */}
        <section className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <h2 className="text-xl font-bold text-illini-blue mb-6 flex items-center gap-2 font-montserrat">
            <DollarSign className="text-illini-orange" /> Budget Breakdown
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-illini-storm-dark">
              <thead className="text-xs text-white uppercase bg-illini-blue border-b border-illini-blue">
                <tr>
                  <th className="px-4 py-3">Role / Department</th>
                  <th className="px-4 py-3 text-right">Annual Salary</th>
                  <th className="px-4 py-3 text-right">1-Month Eq.</th>
                  <th className="px-4 py-3 text-center">% Time Used</th>
                  <th className="px-4 py-3 text-right">Cost (1 Month)</th>
                </tr>
              </thead>
              <tbody>
                {budgetData.map((item, index) => (
                  <tr key={index} className="bg-white border-b border-illini-cloud hover:bg-illini-cloud transition-colors">
                    <td className="px-4 py-4 font-medium text-illini-blue flex items-center gap-3">
                      {/* Color indicator corresponding to chart */}
                      <div 
                        className="w-3 h-3 rounded-full flex-shrink-0" 
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        aria-hidden="true"
                      ></div>
                      {item.role}
                    </td>
                    <td className="px-4 py-4 text-right">{formatCurrency(item.annualSalary)}</td>
                    <td className="px-4 py-4 text-right">{formatCurrency(item.monthlyEquivalent)}</td>
                    <td className="px-4 py-4 text-center">{item.percentTime}%</td>
                    <td className="px-4 py-4 text-right font-bold text-illini-storm-dark">{formatCurrency(item.costForMonth)}</td>
                  </tr>
                ))}
                <tr className="bg-illini-cloud border-t-2 border-illini-industrial">
                  <td className="px-4 py-4 font-bold text-illini-blue">TOTAL ESTIMATED COST</td>
                  <td className="hidden md:table-cell"></td>
                  <td className="hidden md:table-cell"></td>
                  <td className="hidden md:table-cell"></td>
                  <td className="px-4 py-4 text-right font-bold text-illini-blue text-lg">{formatCurrency(totalCost)}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-illini-storm mt-4 italic">
            All project labor is covered by existing staff and budgeted within ITI’s current operations ("sunken costs"). No additional financial expenditure is required.
          </p>
        </section>

        {/* Visual Column - Span 1 */}
        <div className="space-y-8">
           <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 h-96 flex flex-col">
            <h3 className="font-bold text-illini-blue mb-4 text-center font-montserrat">Cost Distribution</h3>
            <div className="flex-1 w-full min-h-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={budgetData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="costForMonth"
                    nameKey="role"
                  >
                    {budgetData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: number) => formatCurrency(value)}
                    itemStyle={{ color: '#13294B' }}
                  />
                  {/* Legend removed as per request */}
                </PieChart>
              </ResponsiveContainer>
            </div>
          </section>

          <div className="bg-illini-blue text-white p-6 rounded-2xl text-sm shadow-md">
            <h4 className="text-white font-bold mb-2 font-montserrat">Note on Scale</h4>
            <p className="text-white/90">
              Given ITI’s scale (20,000 employees across 43 global offices), we anticipate involvement from members of HR’s Learning & Development subunit, translation specialists, and IT/LMS support personnel.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Logistics;