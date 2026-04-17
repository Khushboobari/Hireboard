import React from 'react';

const StatusBadge = ({ status }) => {
  let styles = "px-2.5 py-1 rounded-full text-xs font-semibold capitalize tracking-wide border ";
  
  switch(status?.toLowerCase()) {
    case 'applied':
      styles += "bg-blue-50 text-blue-700 border-blue-200";
      break;
    case 'shortlisted':
      styles += "bg-emerald-50 text-emerald-700 border-emerald-200";
      break;
    case 'rejected':
      styles += "bg-rose-50 text-rose-700 border-rose-200";
      break;
    case 'active':
      styles += "bg-green-50 text-green-700 border-green-200";
      break;
    case 'closed':
      styles += "bg-slate-100 text-slate-600 border-slate-200";
      break;
    default:
      styles += "bg-gray-100 text-gray-700 border-gray-200";
  }

  return (
    <span className={styles}>
      {status || 'Unknown'}
    </span>
  );
};

export default StatusBadge;
