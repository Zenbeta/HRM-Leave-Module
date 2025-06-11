import { LeaveRequest, LeaveBalance } from '../types/leave';

export const mockLeaveBalance: LeaveBalance = {
  casual: 12,
  emergency: 5,
  sick: 6,
};

export const mockLeaveRequests: LeaveRequest[] = [
  {
    id: '1',
    employeeName: 'John Smith',
    employeeId: 'EMP001',
    leaveType: 'casual',
    startDate: '2024-01-15',
    endDate: '2024-01-17',
    reason: 'Family vacation planned for the long weekend. Need to attend my sister\'s wedding.',
    status: 'pending',
    submittedDate: '2024-01-10',
  },
  {
    id: '2',
    employeeName: 'Sarah Johnson',
    employeeId: 'EMP002',
    leaveType: 'sick',
    startDate: '2024-01-12',
    endDate: '2024-01-14',
    reason: 'Feeling unwell with flu-like symptoms. Doctor advised rest.',
    status: 'pending',
    submittedDate: '2024-01-11',
  },
  {
    id: '3',
    employeeName: 'Michael Brown',
    employeeId: 'EMP003',
    leaveType: 'emergency',
    startDate: '2024-01-20',
    endDate: '2024-01-22',
    reason: 'Family emergency - need to travel to hometown immediately due to medical situation.',
    status: 'approved',
    submittedDate: '2024-01-18',
    approvedBy: 'Manager',
    approvedDate: '2024-01-19',
  },
  {
    id: '4',
    employeeName: 'Emily Davis',
    employeeId: 'EMP004',
    leaveType: 'casual',
    startDate: '2024-01-25',
    endDate: '2024-01-26',
    reason: 'Personal work - need to handle some important documentation.',
    status: 'rejected',
    submittedDate: '2024-01-22',
    approvedBy: 'Manager',
    approvedDate: '2024-01-23',
    rejectionReason: 'Peak business period, cannot approve leave during this time.',
  },
];