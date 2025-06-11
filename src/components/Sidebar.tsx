import React from 'react';
import { FileText, Search, Calendar, Users } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface SidebarProps {
  userType: 'employee' | 'manager';
}

export default function Sidebar({ userType }: SidebarProps) {
  const location = useLocation();

  const employeeNavItems = [
    { icon: FileText, label: 'Onboarding Form', path: '/employee' },
    { icon: Search, label: 'Search Employee', path: '/employee/search' },
    { icon: Calendar, label: 'Leave Request', path: '/employee/leave' },
  ];

  const managerNavItems = [
    { icon: Users, label: 'Leave Approvals', path: '/manager' },
    { icon: Calendar, label: 'Approval Status', path: '/manager/status' },
  ];

  const navItems = userType === 'employee' ? employeeNavItems : managerNavItems;
  const title = userType === 'employee' ? 'Employee Dashboard' : 'Manager Dashboard';

  return (
    <div className="w-64 bg-slate-800 text-white min-h-screen p-6">
      <h1 className="text-xl font-semibold mb-8">{title}</h1>
      
      <nav className="space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-orange-500 text-white'
                  : 'text-slate-300 hover:bg-slate-700 hover:text-white'
              }`}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
      
      <div className="mt-8 pt-8 border-t border-slate-700">
        <Link
          to={userType === 'employee' ? '/manager' : '/employee/leave'}
          className="text-sm text-slate-400 hover:text-white transition-colors"
        >
          Switch to {userType === 'employee' ? 'Manager' : 'Employee'} View
        </Link>
      </div>
    </div>
  );
}