import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface LeaveBalanceCardProps {
  title: string;
  count: number;
  icon: LucideIcon;
  iconColor: string;
  bgColor: string;
}

export default function LeaveBalanceCard({ title, count, icon: Icon, iconColor, bgColor }: LeaveBalanceCardProps) {
  return (
    <div className={`${bgColor} rounded-lg p-6 shadow-sm`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-slate-600 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold text-slate-800 mt-2">{count}</p>
        </div>
        <div className={`${iconColor} p-3 rounded-full`}>
          <Icon size={24} className="text-white" />
        </div>
      </div>
    </div>
  );
}