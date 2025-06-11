export interface LeaveRequest {
  id: string;
  employeeName: string;
  employeeId: string;
  leaveType: 'casual' | 'emergency' | 'sick';
  startDate: string;
  endDate: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedDate: string;
  approvedBy?: string;
  approvedDate?: string;
  rejectionReason?: string;
}

export interface LeaveBalance {
  casual: number;
  emergency: number;
  sick: number;
}