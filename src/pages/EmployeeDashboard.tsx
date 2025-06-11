import React, { useState } from 'react';
import { Umbrella, Flag, Cross } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import LeaveBalanceCard from '../components/LeaveBalanceCard';
import { mockLeaveBalance } from '../data/mockData';

export default function EmployeeDashboard() {
  const [formData, setFormData] = useState({
    leaveType: '',
    startDate: '',
    endDate: '',
    reason: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.leaveType || !formData.startDate || !formData.endDate || !formData.reason) {
      alert('Please fill in all fields');
      return;
    }
    
    // Create new leave request
    const newRequest = {
      id: Date.now().toString(),
      employeeName: 'Current User',
      employeeId: 'EMP005',
      leaveType: formData.leaveType as 'casual' | 'emergency' | 'sick',
      startDate: formData.startDate,
      endDate: formData.endDate,
      reason: formData.reason,
      status: 'pending' as const,
      submittedDate: new Date().toISOString().split('T')[0],
    };
    
    // In a real app, this would be sent to a backend
    console.log('New leave request:', newRequest);
    alert('Leave request submitted successfully!');
    
    // Reset form
    setFormData({
      leaveType: '',
      startDate: '',
      endDate: '',
      reason: '',
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar userType="employee" />
      
      <div className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          {/* Leave Balances */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-indigo-600 mb-6">Leave Balances</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <LeaveBalanceCard
                title="Casual Leaves"
                count={mockLeaveBalance.casual}
                icon={Umbrella}
                iconColor="bg-blue-500"
                bgColor="bg-white"
              />
              <LeaveBalanceCard
                title="Emergency Leaves"
                count={mockLeaveBalance.emergency}
                icon={Flag}
                iconColor="bg-red-500"
                bgColor="bg-white"
              />
              <LeaveBalanceCard
                title="Sick Leaves"
                count={mockLeaveBalance.sick}
                icon={Cross}
                iconColor="bg-green-500"
                bgColor="bg-white"
              />
            </div>
          </div>

          {/* Leave Request Form */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-semibold text-indigo-600 mb-6">Leave Request Form</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="leaveType" className="block text-sm font-medium text-slate-700 mb-2">
                  Leave Type
                </label>
                <select
                  id="leaveType"
                  name="leaveType"
                  value={formData.leaveType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                >
                  <option value="">Select leave type</option>
                  <option value="casual">Casual Leave</option>
                  <option value="sick">Sick Leave</option>
                  <option value="emergency">Emergency Leave</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="startDate" className="block text-sm font-medium text-slate-700 mb-2">
                    Start Date
                  </label>
                  <input
                    type="date"
                    id="startDate"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="endDate" className="block text-sm font-medium text-slate-700 mb-2">
                    End Date
                  </label>
                  <input
                    type="date"
                    id="endDate"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="reason" className="block text-sm font-medium text-slate-700 mb-2">
                  Reason for Leave
                </label>
                <textarea
                  id="reason"
                  name="reason"
                  rows={4}
                  value={formData.reason}
                  onChange={handleChange}
                  placeholder="Briefly explain the reason for your leave..."
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors resize-none"
                />
              </div>

              <div className="flex justify-end space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => setFormData({ leaveType: '', startDate: '', endDate: '', reason: '' })}
                  className="px-6 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}