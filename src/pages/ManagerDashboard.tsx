import React from 'react';
import { Eye, Clock, CheckCircle, XCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { mockLeaveRequests } from '../data/mockData';

export default function ManagerDashboard() {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="text-orange-500" size={20} />;
      case 'approved':
        return <CheckCircle className="text-green-500" size={20} />;
      case 'rejected':
        return <XCircle className="text-red-500" size={20} />;
      default:
        return <Clock className="text-gray-500" size={20} />;
    }
  };

  const getStatusBadge = (status: string) => {
    const baseClasses = "px-3 py-1 rounded-full text-xs font-medium";
    switch (status) {
      case 'pending':
        return `${baseClasses} bg-orange-100 text-orange-800`;
      case 'approved':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'rejected':
        return `${baseClasses} bg-red-100 text-red-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  const getLeaveTypeColor = (leaveType: string) => {
    switch (leaveType) {
      case 'casual':
        return 'text-blue-600 bg-blue-50';
      case 'sick':
        return 'text-green-600 bg-green-50';
      case 'emergency':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const pendingRequests = mockLeaveRequests.filter(req => req.status === 'pending');
  const processedRequests = mockLeaveRequests.filter(req => req.status !== 'pending');

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar userType="manager" />
      
      <div className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-slate-800 mb-8">Leave Request Management</h1>
          
          {/* Pending Requests */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-slate-700 mb-4">
              Pending Requests ({pendingRequests.length})
            </h2>
            
            {pendingRequests.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                <p className="text-slate-500">No pending leave requests</p>
              </div>
            ) : (
              <div className="space-y-4">
                {pendingRequests.map((request) => (
                  <div key={request.id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-4 mb-3">
                          <h3 className="text-lg font-semibold text-slate-800">{request.employeeName}</h3>
                          <span className="text-sm text-slate-500">({request.employeeId})</span>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${getLeaveTypeColor(request.leaveType)}`}>
                            {request.leaveType.charAt(0).toUpperCase() + request.leaveType.slice(1)} Leave
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-slate-600 mb-3">
                          <div>
                            <span className="font-medium">Duration:</span> {request.startDate} to {request.endDate}
                          </div>
                          <div>
                            <span className="font-medium">Submitted:</span> {request.submittedDate}
                          </div>
                          <div className="flex items-center space-x-1">
                            {getStatusIcon(request.status)}
                            <span className={getStatusBadge(request.status)}>{request.status.charAt(0).toUpperCase() + request.status.slice(1)}</span>
                          </div>
                        </div>
                        
                        <p className="text-slate-600 text-sm">{request.reason}</p>
                      </div>
                      
                      <div className="ml-6 flex space-x-2">
                        <Link
                          to={`/manager/request/${request.id}`}
                          className="flex items-center space-x-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
                        >
                          <Eye size={16} />
                          <span>View</span>
                        </Link>
                        <Link
                          to={`/manager/approve/${request.id}`}
                          className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                        >
                          <CheckCircle size={16} />
                          <span>Approve</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Recent Processed Requests */}
          <div>
            <h2 className="text-xl font-semibold text-slate-700 mb-4">
              Recently Processed ({processedRequests.length})
            </h2>
            
            {processedRequests.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                <p className="text-slate-500">No processed requests</p>
              </div>
            ) : (
              <div className="space-y-4">
                {processedRequests.map((request) => (
                  <div key={request.id} className="bg-white rounded-lg shadow-sm p-6 opacity-75">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-4 mb-3">
                          <h3 className="text-lg font-semibold text-slate-800">{request.employeeName}</h3>
                          <span className="text-sm text-slate-500">({request.employeeId})</span>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${getLeaveTypeColor(request.leaveType)}`}>
                            {request.leaveType.charAt(0).toUpperCase() + request.leaveType.slice(1)} Leave
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-slate-600 mb-3">
                          <div>
                            <span className="font-medium">Duration:</span> {request.startDate} to {request.endDate}
                          </div>
                          <div>
                            <span className="font-medium">Submitted:</span> {request.submittedDate}
                          </div>
                          <div>
                            <span className="font-medium">Processed:</span> {request.approvedDate}
                          </div>
                          <div className="flex items-center space-x-1">
                            {getStatusIcon(request.status)}
                            <span className={getStatusBadge(request.status)}>{request.status.charAt(0).toUpperCase() + request.status.slice(1)}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="ml-6">
                        <Link
                          to={`/manager/request/${request.id}`}
                          className="flex items-center space-x-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
                        >
                          <Eye size={16} />
                          <span>View Details</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}