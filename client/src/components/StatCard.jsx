import React from 'react';
import { motion } from 'framer-motion';

const StatCard = ({ title, value, icon: Icon, colorClass }) => {
  const iconColor = colorClass.replace('bg-', 'text-');
  
  return (
    <motion.div 
      whileHover={{ y: -5, shadow: "0 20px 40px rgba(0,0,0,0.05)" }}
      className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm flex flex-col gap-6"
    >
      <div className={`w-14 h-14 rounded-2xl ${colorClass} bg-opacity-10 flex items-center justify-center ${iconColor}`}>
        <Icon className="w-7 h-7" />
      </div>
      <div>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">{title}</p>
        <h4 className="text-4xl font-black text-slate-800 tracking-tighter">{value}</h4>
      </div>
    </motion.div>
  );
}

export default StatCard;
