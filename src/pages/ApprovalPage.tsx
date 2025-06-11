import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import { mockLeaveRequests } from '../data/mockData';

export default function ApprovalPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [decision, setDecision] = useState<'approved' | 'rejected' | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const request = mockLeaveRequests.find(req => req.id === id);

  if (!request) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar userType="manager" />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-slate-800 mb-4">Request Not Found</h1>
            <Link to="/manager" className="text-indigo-600 hover:text-indigo-700">
              Return to Manager Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!decision) {
      alert('Please select an approval decision');
      return;
    }

    if (decision === 'rejected' && !rejectionReason.trim()) {
      alert('Please provide a reason for rejection');
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      const updatedRequest = {
        ...request,
        status: decision,
        approvedBy: 'Manager',
        approvedDate: new Date().toISOString().split('T')[0],
        ...(decision === 'rejected' && { rejectionReason }),
      };

      console.log('Updated request:', updatedRequest);
      alert(`Leave request ${decision} successfully!`);
      navigate('/manager/status');
    }, 1000);
  };

  const calculateLeaveDays = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const timeDiff = end.getTime() - start.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1;
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar userType="manager" />
      
      <div className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center space-x-4 mb-8">
            <button
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-slate-200 rounded-lg transition-colors"
            >
              <ArrowLeft size={20} className="text-slate-600" />
            </button>
            <h1 className="text-3xl font-bold text-slate-800">Process Leave Request</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Request Summary */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-slate-800 mb-6">Request Summary</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between py-3 border-b border-slate-100">
                  <span className="text-slate-600">Employee:</span>
                  <span className="font-medium text-slate-800">{request.employeeName}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-slate-100">
                  <span className="text-slate-600">Employee ID:</span>
                  <span className="font-medium text-slate-800">{request.employeeId}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-slate-100">
                  <span className="text-slate-600">Leave Type:</span>
                  <span className="font-medium text-slate-800 capitalize">{request.leaveType} Leave</span>
                </div>
                <div className="flex justify-between py-3 border-b border-slate-100">
                  <span className="text-slate-600">Duration:</span>
                  <span className="font-medium text-slate-800">
                    {request.startDate} to {request.endDate}
                  </span>
                </div>
                <div className="flex justify-between py-3 border-b border-slate-100">
                  <span className="text-slate-600">Total Days:</span>
                  <span className="font-bold text-indigo-600">
                    {calculateLeaveDays(request.startDate, request.endDate)} day(s)
                  </span>
                </div>
                <div className="flex justify-between py-3">
                  <span className="text-slate-600">Submitted:</span>
                  <span className="font-medium text-slate-800">{request.submittedDate}</span>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-semibold text-slate-800 mb-3">Reason</h3>
                <div className="p-4 bg-slate-50 rounded-lg">
                  <p className="text-slate-700">{request.reason}</p>
                </div>
              </div>
            </div>

            {/* Approval Form */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-slate-800 mb-6">Make Decision</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-4">
                    Approval Decision
                  </label>
                  <div className="space-y-3">
                    <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-green-50 transition-colors">
                      <input
                        type="radio"
                        name="decision"
                        value="approved"
                        checked={decision === 'approved'}
                        onChange={(e) => setDecision(e.target.value as 'approved')}
                        className="sr-only"
                      />
                      <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                        decision === 'approved' ? 'border-green-500 bg-green-500' : 'border-slate-300'
                      }`}>
                        {decision === 'approved' && <div className="w-2 h-2 bg-white rounded-full" />}
                      </div>
                      <CheckCircle size={20} className="text-green-500 mr-3" />
                      <div>
                        <div className="font-medium text-slate-800">Approve Request</div>
                        <div className="text-sm text-slate-600">Grant the leave request as submitted</div>
                      </div>
                    </label>

                    <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-red-50 transition-colors">
                      <input
                        type="radio"
                        name="decision"
                        value="rejected"
                        checked={decision === 'rejected'}
                        onChange={(e) => setDecision(e.target.value as 'rejected')}
                        className="sr-only"
                      />
                      <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                        decision === 'rejected' ? 'border-red-500 bg-red-500' : 'border-slate-300'
                      }`}>
                        {decision === 'rejected' && <div className="w-2 h-2 bg-white rounded-full" />}
                      </div>
                      <XCircle size={20} className="text-red-500 mr-3" />
                      <div>
                        <div className="font-medium text-slate-800">Reject Request</div>
                        <div className="text-sm text-slate-600">Deny the leave request</div>
                      </div>
                    </label>
                  </div>
                </div>

                {decision === 'rejected' && (
                  <div>
                    <label htmlFor="rejectionReason" className="block text-sm font-medium text-slate-700 mb-2">
                      Reason for Rejection *
                    </label>
                    <textarea
                      id="rejectionReason"
                      value={rejectionReason}
                      onChange={(e) => setRejectionReason(e.target.value)}
                      rows={4}
                      placeholder="Please provide a clear reason for rejecting this leave request..."
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors resize-none"
                      required
                    />
                  </div>
                )}

                {decision && (
                  <div className={`flex items-start space-x-3 p-4 rounded-lg ${
                    decision === 'approved' ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
                  }`}>
                    <AlertTriangle size={20} className={decision === 'approved' ? 'text-green-600' : 'text-red-600'} />
                    <div className={`text-sm ${decision === 'approved' ? 'text-green-700' : 'text-red-700'}`}>
                      <p className="font-medium mb-1">
                        {decision === 'approved' ? 'Approval Confirmation' : 'Rejection Confirmation'}
                      </p>
                      <p>
                        {decision === 'approved' 
                          ? 'This will approve the leave request and notify the employee.'
                          : 'This will reject the leave request and notify the employee with your reason.'
                        }
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex justify-end space-x-4 pt-6 border-t border-slate-200">
                  <Link
                    to={`/manager/request/${request.id}`}
                    className="px-6 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    Cancel
                  </Link>
                  <button
                    type="submit"
                    disabled={!decision || isSubmitting}
                    className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                      decision === 'approved'
                        ? 'bg-green-600 hover:bg-green-700 text-white'
                        : decision === 'rejected'
                        ? 'bg-red-600 hover:bg-red-700 text-white'
                        : 'bg-slate-300 text-slate-500 cursor-not-allowed'
                    }`}
                  >
                    {isSubmitting ? 'Processing...' : `Submit ${decision ? decision.charAt(0).toUpperCase() + decision.slice(1) : 'Decision'}`}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}