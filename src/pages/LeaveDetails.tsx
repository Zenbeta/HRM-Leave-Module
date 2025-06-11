import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, User, FileText, Clock, CheckCircle, XCircle } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import { mockLeaveRequests } from '../data/mockData';

export default function LeaveDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="text-orange-500" size={24} />;
      case 'approved':
        return <CheckCircle className="text-green-500" size={24} />;
      case 'rejected':
        return <XCircle className="text-red-500" size={24} />;
      default:
        return <Clock className="text-gray-500" size={24} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'approved':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'rejected':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getLeaveTypeColor = (leaveType: string) => {
    switch (leaveType) {
      case 'casual':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'sick':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'emergency':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
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
            <h1 className="text-3xl font-bold text-slate-800">Leave Request Details</h1>
          </div>

          {/* Main Content */}
          <div className="bg-white rounded-lg shadow-sm">
            {/* Header Section */}
            <div className="p-8 border-b border-slate-200">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-slate-800 mb-2">{request.employeeName}</h2>
                  <p className="text-slate-600">Employee ID: {request.employeeId}</p>
                </div>
                <div className="flex items-center space-x-3">
                  {getStatusIcon(request.status)}
                  <span className={`px-4 py-2 rounded-lg border font-medium ${getStatusColor(request.status)}`}>
                    {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-slate-100 rounded-lg">
                    <Calendar size={20} className="text-slate-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Leave Type</p>
                    <span className={`px-3 py-1 rounded-lg border text-sm font-medium ${getLeaveTypeColor(request.leaveType)}`}>
                      {request.leaveType.charAt(0).toUpperCase() + request.leaveType.slice(1)} Leave
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-slate-100 rounded-lg">
                    <Calendar size={20} className="text-slate-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Duration</p>
                    <p className="font-medium text-slate-800">{calculateLeaveDays(request.startDate, request.endDate)} day(s)</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-slate-100 rounded-lg">
                    <Clock size={20} className="text-slate-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Submitted</p>
                    <p className="font-medium text-slate-800">{request.submittedDate}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Details Section */}
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center space-x-2">
                    <Calendar size={20} />
                    <span>Leave Dates</span>
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between py-2 px-4 bg-slate-50 rounded-lg">
                      <span className="text-slate-600">Start Date:</span>
                      <span className="font-medium text-slate-800">{request.startDate}</span>
                    </div>
                    <div className="flex justify-between py-2 px-4 bg-slate-50 rounded-lg">
                      <span className="text-slate-600">End Date:</span>
                      <span className="font-medium text-slate-800">{request.endDate}</span>
                    </div>
                    <div className="flex justify-between py-2 px-4 bg-indigo-50 rounded-lg">
                      <span className="text-indigo-600 font-medium">Total Days:</span>
                      <span className="font-bold text-indigo-800">{calculateLeaveDays(request.startDate, request.endDate)}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center space-x-2">
                    <User size={20} />
                    <span>Request Status</span>
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between py-2 px-4 bg-slate-50 rounded-lg">
                      <span className="text-slate-600">Status:</span>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status).replace('border-', 'border ')}`}>
                        {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                      </span>
                    </div>
                    {request.approvedBy && (
                      <div className="flex justify-between py-2 px-4 bg-slate-50 rounded-lg">
                        <span className="text-slate-600">Processed By:</span>
                        <span className="font-medium text-slate-800">{request.approvedBy}</span>
                      </div>
                    )}
                    {request.approvedDate && (
                      <div className="flex justify-between py-2 px-4 bg-slate-50 rounded-lg">
                        <span className="text-slate-600">Processed Date:</span>
                        <span className="font-medium text-slate-800">{request.approvedDate}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Reason Section */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center space-x-2">
                  <FileText size={20} />
                  <span>Reason for Leave</span>
                </h3>
                <div className="p-4 bg-slate-50 rounded-lg">
                  <p className="text-slate-700 leading-relaxed">{request.reason}</p>
                </div>
              </div>

              {/* Rejection Reason */}
              {request.status === 'rejected' && request.rejectionReason && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-red-600 mb-4 flex items-center space-x-2">
                    <XCircle size={20} />
                    <span>Rejection Reason</span>
                  </h3>
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-700 leading-relaxed">{request.rejectionReason}</p>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex justify-end space-x-4 pt-6 border-t border-slate-200">
                <Link
                  to="/manager"
                  className="px-6 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  Back to Dashboard
                </Link>
                {request.status === 'pending' && (
                  <Link
                    to={`/manager/approve/${request.id}`}
                    className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    Process Request
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}