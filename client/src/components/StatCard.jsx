import React from 'react'

const StatCard = ({ title, value, icon: Icon, colorClass }) => {
  return (
    <div className="card p-6 flex items-center gap-4">
      <div className={`p-4 rounded-xl ${colorClass} bg-opacity-10 flex-shrink-0`}>
        <Icon className={`w-8 h-8 ${colorClass.replace('bg-', 'text-')}`} />
      </div>
      <div>
        <h4 className="text-sm font-medium text-slate-500 uppercase tracking-wide">{title}</h4>
        <p className="text-3xl font-bold text-slate-800 mt-1">{value}</p>
      </div>
    </div>
  )
}

export default StatCard
