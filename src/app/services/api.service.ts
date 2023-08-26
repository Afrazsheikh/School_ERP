import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private httpClient: HttpClient) {}

  // Login

  loginMethod(postData): Observable<any> {
    return this.httpClient
      .post(environment.apiBaseUrl + '/employee/teacher/login', postData)
      .pipe(catchError(this.errorHandler));
  }

  // Exam Master
  createExam(postData: FormData): Observable<any> {
    return this.httpClient.post(environment.apiBaseUrl + '/exam', postData);
  }
  createExamTerm(postData: FormData): Observable<any> {
    return this.httpClient.post(environment.apiBaseUrl + '/examTerm', postData);
  }
  createGrades(postData: FormData): Observable<any> {
    return this.httpClient.post(environment.apiBaseUrl + '/grade', postData);
  }
  createMarksEntry(postData: FormData): Observable<any> {
    return this.httpClient.post(environment.apiBaseUrl + '/marks', postData);
  }
  marksDistribution(postData: FormData): Observable<any> {
    return this.httpClient.post(
      environment.apiBaseUrl + '/marksDistribution',
      postData
    );
  }

  updateMarksDistribution(postData: any): Observable<any> {
    return this.httpClient
      .put(environment.apiBaseUrl + '/marksDistribution', postData)
      .pipe(catchError(this.errorHandler));
  }
  updateExamTerm(postData: any): Observable<any> {
    return this.httpClient
      .put(environment.apiBaseUrl + '/examTerm', postData)
      .pipe(catchError(this.errorHandler));
  }
  deleteMarksDistribution(id: string): Observable<any> {
    return this.httpClient
      .delete(environment.apiBaseUrl + '/marksDistribution/' + id)
      .pipe(catchError(this.errorHandler));
  }
  deleteExamTerm(id: string): Observable<any> {
    return this.httpClient
      .delete(environment.apiBaseUrl + '/examTerm/' + id)
      .pipe(catchError(this.errorHandler));
  }
  deleteGrade(id: string): Observable<any> {
    return this.httpClient
      .delete(environment.apiBaseUrl + '/grade/' + id)
      .pipe(catchError(this.errorHandler));
  }

  getExamTerms(): Observable<any> {
    return this.httpClient
      .get(environment.apiBaseUrl + '/examTerm/all')
      .pipe(catchError(this.errorHandler));
  }
  getAllExam(): Observable<any> {
    return this.httpClient
      .get(environment.apiBaseUrl + '/exam/all')
      .pipe(catchError(this.errorHandler));
  }
  getAllMarksDistubutions(): Observable<any> {
    return this.httpClient
      .get(environment.apiBaseUrl + '/marksDistribution/all')
      .pipe(catchError(this.errorHandler));
  }
  getAllGrades(): Observable<any> {
    return this.httpClient
      .get(environment.apiBaseUrl + '/grade/all')
      .pipe(catchError(this.errorHandler));
  }

  updateExam(examId: string, postData: any): Observable<any> {
    postData['examId'] = examId;
    return this.httpClient
      .put(environment.apiBaseUrl + '/exam', postData)
      .pipe(catchError(this.errorHandler));
  }
  // certificate
  getCertificate(): Observable<any> {
    return this.httpClient
      .get(environment.apiBaseUrl + '/certificate/all')
      .pipe(catchError(this.errorHandler));
  }

  getStudentCertificate(filter: string): Observable<any> {
    let apiURL = filter.length
      ? '/certificate/student?' + filter
      : '/certificate/student';
    return this.httpClient
      .get(environment.apiBaseUrl + apiURL)
      .pipe(catchError(this.errorHandler));
  }

  getEmployeeCertificate(filter: string): Observable<any> {
    let apiURL = filter.length
      ? '/certificate/employee?' + filter
      : '/certificate/employee';
    return this.httpClient
      .get(environment.apiBaseUrl + apiURL)
      .pipe(catchError(this.errorHandler));
  }

  createCertificate(postData: FormData): Observable<any> {
    return this.httpClient
      .post(environment.apiBaseUrl + '/certificate', postData)
      .pipe(catchError(this.errorHandler));
  }

  updateCertificate(id: string, postData: FormData): Observable<any> {
    return this.httpClient
      .put(environment.apiBaseUrl + '/certificate/' + id, postData)
      .pipe(catchError(this.errorHandler));
  }

  deleteCertificate(certId: string): Observable<any> {
    return this.httpClient
      .delete(environment.apiBaseUrl + '/certificate/' + certId)
      .pipe(catchError(this.errorHandler));
  }

  getApplicableCertificates(userType: string): Observable<any> {
    return this.httpClient
      .get(environment.apiBaseUrl + '/certificate/' + userType)
      .pipe(catchError(this.errorHandler));
  }

  studentSearch(postData: any): Observable<any> {
    return this.httpClient
      .post(environment.apiBaseUrl + '/student/search', postData)
      .pipe(catchError(this.errorHandler));
  }
  studentSearchByYearAndClass(postData: any): Observable<any> {
    return this.httpClient
      .post(environment.apiBaseUrl + '/student/searchByYearandClass', postData)
      .pipe(catchError(this.errorHandler));
  }
  updateInvoiceStudentModeWise(postData: any): Observable<any> {
    return this.httpClient
      .put(environment.apiBaseUrl + '/updateModeStatus', postData)
      .pipe(catchError(this.errorHandler));
  }
  allocationReportSearch(postData: any): Observable<any> {
    return this.httpClient
      .post(environment.apiBaseUrl + '/student/vehicleRoutes/search', postData)
      .pipe(catchError(this.errorHandler));
  }

  getEmployeeByRole(roleId: string): Observable<any> {
    return this.httpClient
      .get(environment.apiBaseUrl + '/employee/designation/' + roleId)
      .pipe(catchError(this.errorHandler));
  }

  //Student Accounting
  addFeeType(postData: FormData): Observable<any> {
    return this.httpClient
      .post(environment.apiBaseUrl + '/feeType', postData)
      .pipe(catchError(this.errorHandler));
  }

  feeTypeList(): Observable<any> {
    return this.httpClient
      .get(environment.apiBaseUrl + '/feeType/all/')
      .pipe(catchError(this.errorHandler));
  }
  feeTypeGroup() {
    return this.httpClient
      .get(environment.apiBaseUrl + '/feeGroup/all/')
      .pipe(catchError(this.errorHandler));
  }

  addFineSetup(postData: FormData): Observable<any> {
    return this.httpClient
      .post(environment.apiBaseUrl + '/fineSetup', postData)
      .pipe(catchError(this.errorHandler));
  }
  fineSetupList() {
    return this.httpClient
      .get(environment.apiBaseUrl + '/fineSetup/all/')
      .pipe(catchError(this.errorHandler));
  }

  getSalaryTemplates(): Observable<any> {
    return this.httpClient
      .get(environment.apiBaseUrl + '/salary/all')
      .pipe(catchError(this.errorHandler));
  }

  getSalaryTemplateById(id: string): Observable<any> {
    return this.httpClient
      .get(environment.apiBaseUrl + '/salary/receipt/' + id)
      .pipe(catchError(this.errorHandler));
  }

  addSalary(postData: any): Observable<any> {
    return this.httpClient
      .post(environment.apiBaseUrl + '/salary', postData)
      .pipe(catchError(this.errorHandler));
  }

  updateSalary(postData: any): Observable<any> {
    return this.httpClient
      .put(environment.apiBaseUrl + '/salary', postData)
      .pipe(catchError(this.errorHandler));
  }

  deleteSalary(id: string): Observable<any> {
    return this.httpClient
      .delete(environment.apiBaseUrl + '/salary/' + id)
      .pipe(catchError(this.errorHandler));
  }

  getAllEmployees(): Observable<any> {
    return this.httpClient
      .get(environment.apiBaseUrl + '/employee/all/')
      .pipe(catchError(this.errorHandler));
  }
  getEmployeesByPageNo(pageNo: number,designation:string): Observable<any> {
    return this.httpClient
      .get(environment.apiBaseUrl + '/employee/all/'+pageNo+"/"+designation)
      .pipe(catchError(this.errorHandler));
  }
  getAllEmployeesById(id: string): Observable<any> {
    return this.httpClient
      .get(environment.apiBaseUrl + '/employee/' + id)
      .pipe(catchError(this.errorHandler));
  }
  getEmployeesIdWiseSalaryData(id: string): Observable<any> {
    return this.httpClient
      .get(environment.apiBaseUrl + '/salaryReceipt/employees/' + id)
      .pipe(catchError(this.errorHandler));
  }
  
  fineSetupListById(id: string) {
    return this.httpClient
      .get(environment.apiBaseUrl + '/fineSetup/' + id)
      .pipe(catchError(this.errorHandler));
  }
  feeTypeListByid(id: string) {
    return this.httpClient
      .get(environment.apiBaseUrl + '/feeType/' + id)
      .pipe(catchError(this.errorHandler));
  }
  updateEmpSal(postData: any): Observable<any> {
    const salaryData = {
      salaryGrades: postData,
    };

    return this.httpClient
      .put(environment.apiBaseUrl + '/employee/salaryGrade', salaryData)
      .pipe(catchError(this.errorHandler));
  }
  deleteFineSetup(id: string): Observable<any> {
    return this.httpClient
      .delete(environment.apiBaseUrl + '/fineSetup/' + id)
      .pipe(catchError(this.errorHandler));
  }
  deleteFeeType(id: string): Observable<any> {
    return this.httpClient
      .delete(environment.apiBaseUrl + '/feeType/' + id)
      .pipe(catchError(this.errorHandler));
  }
  getLeaveCategory(): Observable<any> {
    return this.httpClient
      .get(environment.apiBaseUrl + '/leavesCategory/all')
      .pipe(catchError(this.errorHandler));
  }
  getEmpDesignation(): Observable<any> {
    return this.httpClient
      .get(environment.apiBaseUrl + '')
      .pipe(catchError(this.errorHandler));
  }

  // emplye
  getDesignaionsEmpl(): Observable<any> {
    return this.httpClient
      .get(environment.apiBaseUrl + '/designation/all')
      .pipe(catchError(this.errorHandler));
  }
  getDesignaions(): Observable<any> {
    return this.httpClient
      .get(environment.apiBaseUrl + '/designation/all')
      .pipe(catchError(this.errorHandler));
  }
  getTeacherList(): Observable<any> {
    return this.httpClient
      .get(environment.apiBaseUrl + '/allTeacher/Teacher')
      .pipe(catchError(this.errorHandler));
  }
  getDesignationById(id: string): Observable<any> {
    return this.httpClient
      .get(environment.apiBaseUrl + '/employee/designation/'+id)
      .pipe(catchError(this.errorHandler));
  }

  addLeave(postData: any): Observable<any> {
    return this.httpClient
      .post(environment.apiBaseUrl + '/leavesCategory', postData)
      .pipe(catchError(this.errorHandler));
  }

  updateLeave(postData: any): Observable<any> {
    return this.httpClient
      .put(environment.apiBaseUrl + '/leavesCategory', postData)
      .pipe(catchError(this.errorHandler));
  }

  deleteLeave(id: string): Observable<any> {
    return this.httpClient
      .delete(environment.apiBaseUrl + '/leavesCategory/' + id)
      .pipe(catchError(this.errorHandler));
  }

  getLeaveApplication(): Observable<any> {
    return this.httpClient
      .get(environment.apiBaseUrl + '/leavesRequest/all')
      .pipe(catchError(this.errorHandler));
  }

  addLeaveRequest(postData: any): Observable<any> {
    return this.httpClient
      .post(environment.apiBaseUrl + '/leavesRequest', postData)
      .pipe(catchError(this.errorHandler));
  }

  updateLeaveRequestStatus(postData: any): Observable<any> {
    return this.httpClient
      .put(environment.apiBaseUrl + '/leavesRequest/status', postData)
      .pipe(catchError(this.errorHandler));
  }

  deleteLeaveRequest(id: string): Observable<any> {
    return this.httpClient
      .delete(environment.apiBaseUrl + '/leavesRequest/' + id)
      .pipe(catchError(this.errorHandler));
  }

  // Transport Routes
  getAllRoutes(): Observable<any> {
    return this.httpClient
      .get(environment.apiBaseUrl + '/route/all')
      .pipe(catchError(this.errorHandler));
  }

  addRoute(postData: any): Observable<any> {
    return this.httpClient
      .post(environment.apiBaseUrl + '/route', postData)
      .pipe(catchError(this.errorHandler));
  }

  updateRoute(routeId: string, postData: any): Observable<any> {
    return this.httpClient
      .put(environment.apiBaseUrl + '/route/' + routeId, postData)
      .pipe(catchError(this.errorHandler));
  }
  updategrade(gradeId: string, postData: any): Observable<any> {
    postData['gradeId'] = gradeId;
    return this.httpClient
      .put(environment.apiBaseUrl + '/grade', postData)
      .pipe(catchError(this.errorHandler));
  }

  updateFeeType(feeId: string, postData: any): Observable<any> {
    postData['feeTypeId'] = feeId;
    return this.httpClient
      .put(environment.apiBaseUrl + '/feeType', postData)
      .pipe(catchError(this.errorHandler));
  }

  updateFine(fineSetupId: string, postData: any): Observable<any> {
    postData['fineSetupId'] = fineSetupId;
    return this.httpClient
      .put(environment.apiBaseUrl + '/fineSetup', postData)
      .pipe(catchError(this.errorHandler));
  }

  deleteRoute(id: string): Observable<any> {
    return this.httpClient
      .delete(environment.apiBaseUrl + '/route/' + id)
      .pipe(catchError(this.errorHandler));
  }

  // Transport Vehicles
  getAllVehicles(): Observable<any> {
    return this.httpClient
      .get(environment.apiBaseUrl + '/vehicle/all')
      .pipe(catchError(this.errorHandler));
  }

  addVehicle(postData: any): Observable<any> {
    return this.httpClient
      .post(environment.apiBaseUrl + '/vehicle', postData)
      .pipe(catchError(this.errorHandler));
  }

  updateVehicle(vehicleId: string, postData: any): Observable<any> {
    return this.httpClient
      .put(environment.apiBaseUrl + '/vehicle/' + vehicleId, postData)
      .pipe(catchError(this.errorHandler));
  }

  deleteVehicle(id: string): Observable<any> {
    return this.httpClient
      .delete(environment.apiBaseUrl + '/vehicle/' + id)
      .pipe(catchError(this.errorHandler));
  }

  // Transport Stop Pages
  getAllStopPages(): Observable<any> {
    return this.httpClient
      .get(environment.apiBaseUrl + '/stoppage/all')
      .pipe(catchError(this.errorHandler));
  }

  addStopPage(postData: any): Observable<any> {
    return this.httpClient
      .post(environment.apiBaseUrl + '/stoppage', postData)
      .pipe(catchError(this.errorHandler));
  }

  updateStopPage(stopId: string, postData: any): Observable<any> {
    return this.httpClient
      .put(environment.apiBaseUrl + '/stoppage/' + stopId, postData)
      .pipe(catchError(this.errorHandler));
  }

  deleteStopPage(id: string): Observable<any> {
    return this.httpClient
      .delete(environment.apiBaseUrl + '/stoppage/' + id)
      .pipe(catchError(this.errorHandler));
  }

  // Transport Assign Vehicle
  getAllVehicleAssigns(): Observable<any> {
    return this.httpClient
      .get(environment.apiBaseUrl + '/vehicleroute/all')
      .pipe(catchError(this.errorHandler));
  }

  assignVehicle(postData: any): Observable<any> {
    return this.httpClient
      .post(environment.apiBaseUrl + '/vehicleroute', postData)
      .pipe(catchError(this.errorHandler));
  }

  updateAssignVehicle(stopId: string, postData: any): Observable<any> {
    return this.httpClient
      .put(environment.apiBaseUrl + '/vehicleroute/' + stopId, postData)
      .pipe(catchError(this.errorHandler));
  }

  deleteAssignVehicle(id: string): Observable<any> {
    return this.httpClient
      .delete(environment.apiBaseUrl + '/vehicleroute/' + id)
      .pipe(catchError(this.errorHandler));
  }
  // employe /employee/designation/:designationId'

  // Student Details
  getAllStudents(): Observable<any> {
    return this.httpClient
      .get(environment.apiBaseUrl + '/student/all')
      .pipe(catchError(this.errorHandler));
  }
  deleteStudent(_id: string): Observable<any> {
    return this.httpClient
      .delete(environment.apiBaseUrl + '/student/' + _id)
      .pipe(catchError(this.errorHandler));
  }
  //Employees, Departments and Designations  '/employee/all'  employee
  addEmpployee(postData: any): Observable<any> {
    return this.httpClient
      .post(environment.apiBaseUrl + '/employee', postData)
      .pipe(catchError(this.errorHandler));
  }
  deleteEmploye(_id: string): Observable<any> {
    return this.httpClient
      .delete(environment.apiBaseUrl + '/employee/' + _id)
      .pipe(catchError(this.errorHandler));
  }

  updateEmpployee(postData: any): Observable<any> {
    // postData["id"] = _id;

    return this.httpClient
      .put(environment.apiBaseUrl + '/employee/', postData)
      .pipe(catchError(this.errorHandler));
  }

  getDepartments(): Observable<any> {
    return this.httpClient
      .get(environment.apiBaseUrl + '/department/all')
      .pipe(catchError(this.errorHandler));
  }
  getEmployess(): Observable<any> {
    return this.httpClient
      .get(environment.apiBaseUrl + '/employee/all')
      .pipe(catchError(this.errorHandler));
  }

  addDepartment(postData: any): Observable<any> {
    return this.httpClient
      .post(environment.apiBaseUrl + '/department', postData)
      .pipe(catchError(this.errorHandler));
  }

  updateDepartment(deptId: string, postData: any): Observable<any> {
    postData['id'] = deptId;
    return this.httpClient
      .put(environment.apiBaseUrl + '/department', postData)
      .pipe(catchError(this.errorHandler));
  }

  deleteDepartment(deptId: string): Observable<any> {
    return this.httpClient
      .delete(environment.apiBaseUrl + '/department/' + deptId)
      .pipe(catchError(this.errorHandler));
  }

  getDesignations(): Observable<any> {
    return this.httpClient
      .get(environment.apiBaseUrl + '/designation/all')
      .pipe(catchError(this.errorHandler));
  }

  addDesignation(postData: any): Observable<any> {
    return this.httpClient
      .post(environment.apiBaseUrl + '/designation', postData)
      .pipe(catchError(this.errorHandler));
  }

  updateDesignation(deptId: string, postData: any,): Observable<any> {
    postData['id'] = deptId; 
    return this.httpClient
      .put(environment.apiBaseUrl + '/designation', postData )
      .pipe(catchError(this.errorHandler));
  }

  deleteDesignation(deptId: string): Observable<any> {
    return this.httpClient
      .delete(environment.apiBaseUrl + '/designation/' + deptId)
      .pipe(catchError(this.errorHandler));
  }
  deleteEmployee(_id: string): Observable<any> {
    return this.httpClient
      .delete(environment.apiBaseUrl + '/employee/' + _id)
      .pipe(catchError(this.errorHandler));
  }
  //Acadamic '/class'   /class/all
  addAcadamic(postData: any): Observable<any> {
    return this.httpClient
      .post(environment.apiBaseUrl + '/academic', postData)
      .pipe(catchError(this.errorHandler));
  }

  addClass(postData: any): Observable<any> {
    return this.httpClient
      .post(environment.apiBaseUrl + '/class', postData)
      .pipe(catchError(this.errorHandler));
  }

  addSection(postData: any): Observable<any> {
    return this.httpClient
      .post(environment.apiBaseUrl + '/section', postData)
      .pipe(catchError(this.errorHandler));
  }
  getAllSection(): Observable<any> {
    return this.httpClient
      .get(environment.apiBaseUrl + '/section/all')
      .pipe(catchError(this.errorHandler));
  }
  getAllClass(): Observable<any> {
    return this.httpClient
      .get(environment.apiBaseUrl + '/class/all')
      .pipe(catchError(this.errorHandler));
  }

  updateclass(postData: any, ClassID: String): Observable<any> {
    return this.httpClient
      .put(environment.apiBaseUrl + '/class', +ClassID, postData)
      .pipe(catchError(this.errorHandler));
  }
  updateSection(postData: any): Observable<any> {
    return this.httpClient
      .put(environment.apiBaseUrl + '/section', postData)
      .pipe(catchError(this.errorHandler));
  }
  deleteClass(id: string): Observable<any> {
    return this.httpClient
      .delete(environment.apiBaseUrl + '/class/' + id)
      .pipe(catchError(this.errorHandler));
  }
  deleteClassNewApi(payload: any){
    return this.httpClient
    .put(environment.apiBaseUrl + '/academic/subject/remove', payload)
    .pipe(catchError(this.errorHandler));
  }
  deleteSection(id: string): Observable<any> {
    return this.httpClient
      .delete(environment.apiBaseUrl + '/section/' + id)
      .pipe(catchError(this.errorHandler));
  }
  addSubject(postData: any): Observable<any> {
    return this.httpClient
      .post(environment.apiBaseUrl + '/subject', postData)
      .pipe(catchError(this.errorHandler));
  }
  getAllSubjects(): Observable<any> {
    return this.httpClient
      .get(environment.apiBaseUrl + '/subject/all')
      .pipe(catchError(this.errorHandler));
  }
  updateSubject(postData: any): Observable<any> {
    return this.httpClient
      .put(environment.apiBaseUrl + '/subject', postData)
      .pipe(catchError(this.errorHandler));
  }
  deleteSubject(id: string): Observable<any> {
    return this.httpClient
      .delete(environment.apiBaseUrl + '/subject/' + id)
      .pipe(catchError(this.errorHandler));
  }
  addTeacher(postData: any): Observable<any> {
    return this.httpClient
      .put(environment.apiBaseUrl + '/academic/teachers/add', postData)
      .pipe(catchError(this.errorHandler));
  }
  removeAssignTechare(payload: any): Observable<any> {
    return this.httpClient
      .delete(environment.apiBaseUrl + '/academic/teacher/remove', {
        body: payload,
      })
      .pipe(catchError(this.errorHandler));
  }
  addExpensReport(postData: any): Observable<any> {
    return this.httpClient
      .post(environment.apiBaseUrl + '/vehicle/expense', postData)
      .pipe(catchError(this.errorHandler));
  }
  updateExpense(expenseId: string, postData: any): Observable<any> {
    return this.httpClient
      .put(environment.apiBaseUrl + '/vehicle/expense/' + expenseId, postData)
      .pipe(catchError(this.errorHandler));
  }
  deleteVehicleExpense(id: string): Observable<any> {
    return this.httpClient
      .delete(environment.apiBaseUrl + '/vehicle/:id/expense/' + id)
      .pipe(catchError(this.errorHandler));
  }
  getAllExapense(vehicleId: String): Observable<any> {
    return this.httpClient
      .get(environment.apiBaseUrl + '/vehicle/' + vehicleId)
      .pipe(catchError(this.errorHandler));
  }

  addEnquery(postData: any): Observable<any> {
    // postData["id"] = vehicleId;
    return this.httpClient
      .post(environment.apiBaseUrl + '/enquiry', postData)
      .pipe(catchError(this.errorHandler));
  }
  getEnquery(): Observable<any> {
    // postData["id"] = vehicleId;
    return this.httpClient
      .get(environment.apiBaseUrl + '/enquiry/all')
      .pipe(catchError(this.errorHandler));
  }
  updateEnq(enquiryID: string, postData: any): Observable<any> {
    return this.httpClient
      .put(environment.apiBaseUrl + '/enquiry/' + enquiryID, postData)
      .pipe(catchError(this.errorHandler));
  }

  deleteenquiry(id: string): Observable<any> {
    return this.httpClient
      .delete(environment.apiBaseUrl + '/enquiry/' + id)
      .pipe(catchError(this.errorHandler));
  }

  addCallLog(postData: any): Observable<any> {
    // postData["id"] = vehicleId;
    return this.httpClient
      .post(environment.apiBaseUrl + '/calllog', postData)
      .pipe(catchError(this.errorHandler));
  }
  getAllCallLogs(): Observable<any> {
    // postData["id"] = vehicleId;
    return this.httpClient
      .get(environment.apiBaseUrl + '/calllog/all')
      .pipe(catchError(this.errorHandler));
  }
  updateCall(callID: string, postData: any): Observable<any> {
    return this.httpClient
      .put(environment.apiBaseUrl + '/calllog/' + callID, postData)
      .pipe(catchError(this.errorHandler));
  }
  deletCall(id: string): Observable<any> {
    return this.httpClient
      .delete(environment.apiBaseUrl + '/calllog/' + id)
      .pipe(catchError(this.errorHandler));
  }

  addVisitorLog(postData: any): Observable<any> {
    // postData["id"] = vehicleId;
    return this.httpClient
      .post(environment.apiBaseUrl + '/visitorlog', postData)
      .pipe(catchError(this.errorHandler));
  }
  getAllVisitor(): Observable<any> {
    // postData["id"] = vehicleId;
    return this.httpClient
      .get(environment.apiBaseUrl + '/visitorlog/all')
      .pipe(catchError(this.errorHandler));
  }
  updateVisitor(visitorID: string, postData: any): Observable<any> {
    return this.httpClient
      .put(environment.apiBaseUrl + '/visitorlog/' + visitorID, postData)
      .pipe(catchError(this.errorHandler));
  }
  deleteVisitor(id: string): Observable<any> {
    return this.httpClient
      .delete(environment.apiBaseUrl + '/visitorlog/' + id)
      .pipe(catchError(this.errorHandler));
  }
  assignClassTeacher(postData: any): Observable<any> {
    return this.httpClient
      .post(environment.apiBaseUrl + '/teacher/add', postData)
      .pipe(catchError(this.errorHandler));
  }
  //admision category
  getTeacherSchedule(data): Observable<any> {
    return this.httpClient
      .post(environment.apiBaseUrl + '/schedule/teacher', data)
      .pipe(catchError(this.errorHandler));
  }
  getClassAllSchedule(data): Observable<any> {
    return this.httpClient
      .post(environment.apiBaseUrl + '/schedule/academics', data)
      .pipe(catchError(this.errorHandler));
  }
  addSchedule(data): Observable<any> {
    return this.httpClient
      .post(environment.apiBaseUrl + '/schedule', data)
      .pipe(catchError(this.errorHandler));
  }
  updateSchedule(data): Observable<any> {
    return this.httpClient
      .put(environment.apiBaseUrl + '/schedule', data)
      .pipe(catchError(this.errorHandler));
  }
  getScheculeDataByDay(postData: any,day:string): Observable<any> {
    return this.httpClient
      .post(environment.apiBaseUrl + '/schedule/academics/'+day, postData)
      .pipe(catchError(this.errorHandler));
  }
  getSalaryMonthWise(month, year): Observable<any> {
    return this.httpClient
      .get(environment.apiBaseUrl + '/salaryReceipt/' + month + '/' + year)
      .pipe(catchError(this.errorHandler));
  }
  getEmployeeSalaryWithStatusBYMonth(monthAndYear): Observable<any> {
    return this.httpClient
      .get(environment.apiBaseUrl + '/salaryReceipt/' + monthAndYear)
      .pipe(catchError(this.errorHandler));
  }
  getSalaryMonthAndEmpWise(employeeId, monthAndYear): Observable<any> {
    return this.httpClient
      .get(
        environment.apiBaseUrl +
          '/salaryReceipt/employee/' +
          employeeId +
          '/' +
          monthAndYear
      )
      .pipe(catchError(this.errorHandler));
  }
  createSalaryReceipt(data): Observable<any> {
    return this.httpClient
      .post(environment.apiBaseUrl + '/salaryReceipt', data)
      .pipe(catchError(this.errorHandler));
  }
  updateSalaryReceipt(data): Observable<any> {
    return this.httpClient
      .post(environment.apiBaseUrl + '/salaryReceipt', data)
      .pipe(catchError(this.errorHandler));
  }
  getCategory(): Observable<any> {
    return this.httpClient
      .get(environment.apiBaseUrl + '/category/all')
      .pipe(catchError(this.errorHandler));
  }
  saveCategory(postData: any): Observable<any> {
    return this.httpClient
      .post(environment.apiBaseUrl + '/category', postData)
      .pipe(catchError(this.errorHandler));
  }
  updateCategory(postData: any): Observable<any> {
    return this.httpClient
      .put(environment.apiBaseUrl + '/category', postData)
      .pipe(catchError(this.errorHandler));
  }
  deleteCategory(id: string): Observable<any> {
    return this.httpClient
      .delete(environment.apiBaseUrl + '/category/' + id)
      .pipe(catchError(this.errorHandler));
  }
  // admission

  addAdmission(postData: any): Observable<any> {
    return this.httpClient
      .post(environment.apiBaseUrl + '/student/admission', postData)
      .pipe(catchError(this.errorHandler));
  }
  editStudent(postData: any, id: any): Observable<any> {
    return this.httpClient
      .put(environment.apiBaseUrl + '/student/' + id, postData)
      .pipe(catchError(this.errorHandler));
  }
  deleteTransportationRecord(id): Observable<any> {
    return this.httpClient
      .delete(environment.apiBaseUrl + '/student/vehicleRoutes/remove/', {
        body: id,
      })
      .pipe(catchError(this.errorHandler));
  }
  getHomeWorkSubmissionList(postData: any): Observable<any> {
    return this.httpClient
      .post(environment.apiBaseUrl + '/homework-submission/filter', postData)
      .pipe(catchError(this.errorHandler));
  }
  getHomeWorkList(postData: any): Observable<any> {
    return this.httpClient
      .post(
        environment.apiBaseUrl + '/homework/academic/range/search',
        postData
      )
      .pipe(catchError(this.errorHandler));
  }
  addHomeWork(postData: any): Observable<any> {
    return this.httpClient
      .post(environment.apiBaseUrl + '/homework', postData)
      .pipe(catchError(this.errorHandler));
  }
  updateHomeWork(postData: any): Observable<any> {
    return this.httpClient
      .put(environment.apiBaseUrl + '/homework', postData)
      .pipe(catchError(this.errorHandler));
  }
  deleteHomeWork(id: any): Observable<any> {
    return this.httpClient
      .delete(environment.apiBaseUrl + '/homework/' + id)
      .pipe(catchError(this.errorHandler));
  }
  studentList(postData: any) {
    return this.httpClient
      .post(environment.apiBaseUrl + '/student/search', postData)
      .pipe(catchError(this.errorHandler));
  }
  getStudentById(id: any) {
    return this.httpClient
      .get(environment.apiBaseUrl + '/student/fetch/' + id)
      .pipe(catchError(this.errorHandler));
  }
  updateStudentRoute(postData: any) {
    return this.httpClient
      .post(environment.apiBaseUrl + '/student/vehicleRoutes', postData)
      .pipe(catchError(this.errorHandler));
  }
  getMarksByAcademicAndStudentId(postData: any) {
    return this.httpClient
      .post(environment.apiBaseUrl + '/marks/student', postData)
      .pipe(catchError(this.errorHandler));
  }
  getMarksByAcademicAndStudent(postData: any) {
    return this.httpClient
      .put(environment.apiBaseUrl + '/marks/students', postData)
      .pipe(catchError(this.errorHandler));
  }
  getMarksByAcademicPagWise(postData: any, pageNo: any) {
    return this.httpClient
      .post(environment.apiBaseUrl + '/marks/student/page/'+ pageNo, postData)
      .pipe(catchError(this.errorHandler));
  }
  uploadCSV(postData: any): Observable<any> {
    return this.httpClient
      .post(environment.apiBaseUrl + '/student/uploadcsv', postData)
      .pipe(catchError(this.errorHandler));
  }
  AssignSubject(postData: any): Observable<any> {
    return this.httpClient
      .put(environment.apiBaseUrl + '/academic/subjects/add', postData)
      .pipe(catchError(this.errorHandler));
  }

  getAllStudent(): Observable<any> {
    return this.httpClient
      .get(environment.apiBaseUrl + '/student/all')
      .pipe(catchError(this.errorHandler));
  }
  getAllAcademic(): Observable<any> {
    return this.httpClient
      .get(environment.apiBaseUrl + '/academic/all')
      .pipe(catchError(this.errorHandler));
  }
  getMarksAll(): Observable<any> {
    return this.httpClient
      .get(environment.apiBaseUrl + '/marks/all')
      .pipe(catchError(this.errorHandler));
  }

  getMarksAllById(data): Observable<any> {
    return this.httpClient
      .post(environment.apiBaseUrl + '/marks/student', data)
      .pipe(catchError(this.errorHandler));
  }

  updateMarks(postData): Observable<any> {
    return this.httpClient
      .put(environment.apiBaseUrl + '/marks', postData)
      .pipe(catchError(this.errorHandler));
  }
  getGuardianAll(): Observable<any> {
    return this.httpClient
      .get(environment.apiBaseUrl + '/guardian/all')
      .pipe(catchError(this.errorHandler));
  }

  // App Settings---Banner, Notice Board

  getBanners(): Observable<any> {
    return this.httpClient
      .get(environment.apiBaseUrl + '/bannerAll')
      .pipe(catchError(this.errorHandler));
  }

  getNotices(): Observable<any> {
    return this.httpClient
      .get(environment.apiBaseUrl + '/allNoticeBoard')
      .pipe(catchError(this.errorHandler));
  }

  getNotifications(): Observable<any> {
    return this.httpClient
      .get(environment.apiBaseUrl + '/notificationAll')
      .pipe(catchError(this.errorHandler));
  }

  addBanner(postData: any): Observable<any> {
    return this.httpClient
      .post(environment.apiBaseUrl + '/banner', postData)
      .pipe(catchError(this.errorHandler));
  }

  addNotice(postData: any): Observable<any> {
    return this.httpClient
      .post(environment.apiBaseUrl + '/noticeBoard', postData)
      .pipe(catchError(this.errorHandler));
  }

  addNotification(postData: any): Observable<any> {
    return this.httpClient
      .post(environment.apiBaseUrl + '/createNotification', postData)
      .pipe(catchError(this.errorHandler));
  }

  getRaisedTickets(): Observable<any> {
    return this.httpClient
      .get(environment.apiBaseUrl + '/raiseTicket/all')
      .pipe(catchError(this.errorHandler));
  }

  updateTicketStatus(postData): Observable<any> {
    return this.httpClient
      .put(environment.apiBaseUrl + '/raiseTicket/status', postData)
      .pipe(catchError(this.errorHandler));
  }

  updateLeaveStatus(postData): Observable<any> {
    return this.httpClient
      .put(environment.apiBaseUrl + '/leavesRequest/status', postData)
      .pipe(catchError(this.errorHandler));
  }
  getAllAcademicData(postData: any): Observable<any> {
    return this.httpClient
      .post(environment.apiBaseUrl + '/academic/details', postData)
      .pipe(catchError(this.errorHandler));
  }

  getAcademics(id): Observable<any> {
    return this.httpClient
      .get(environment.apiBaseUrl + '/academic/id/' + id)
      .pipe(catchError(this.errorHandler));
  }
  feeAllocation(postData: any): Observable<any> {
    return this.httpClient
      .post(environment.apiBaseUrl + '/student/allocate', postData)
      .pipe(catchError(this.errorHandler));
  }
  uploadCSVEmploye(postData: any): Observable<any> {
    return this.httpClient
      .post(environment.apiBaseUrl + '/employee/uploadcsv', postData)
      .pipe(catchError(this.errorHandler));
  }
  getAllFeeCategory(): Observable<any> {
    return this.httpClient
      .get(environment.apiBaseUrl + '/feeCategory/all')
      .pipe(catchError(this.errorHandler));
  }
  createFeeCategory(postData: any): Observable<any> {
    return this.httpClient
      .post(environment.apiBaseUrl + '/createFeeCat', postData)
      .pipe(catchError(this.errorHandler));
  }
  updateFeeCategory(id: any, postData: any): Observable<any> {
    return this.httpClient
      .put(environment.apiBaseUrl + '/updateFeeCategory/' + id, postData)
      .pipe(catchError(this.errorHandler));
  }
  deleteFeeCategoryById(id: string): Observable<any> {
    return this.httpClient
      .delete(environment.apiBaseUrl + '/delete/' + id)
      .pipe(catchError(this.errorHandler));
  }
  getAllFeeType(): Observable<any> {
    return this.httpClient
      .get(environment.apiBaseUrl + '/academicFeeType/all')
      .pipe(catchError(this.errorHandler));
  }
  createFeeType(postData: any): Observable<any> {
    return this.httpClient
      .post(environment.apiBaseUrl + '/createfeetype', postData)
      .pipe(catchError(this.errorHandler));
  }
  getFeeTypeYearwise(postData: any) {
    return this.httpClient
      .post(environment.apiBaseUrl + '/getfeetype/year', postData)
      .pipe(catchError(this.errorHandler));
  }
  getFeeDataYearwise(postData: any) {
    return this.httpClient
      .post(environment.apiBaseUrl + '/feeData/studentIdandyearWise', postData)
      .pipe(catchError(this.errorHandler));
  }
  getFeeTypeClassandYearWise(postData: any) {
    return this.httpClient
      .post(environment.apiBaseUrl + '/getClassandYearWise', postData)
      .pipe(catchError(this.errorHandler));
  }
  getAllTransportationList(): Observable<any> {
    return this.httpClient
      .get(environment.apiBaseUrl + '/transportfee/all')
      .pipe(catchError(this.errorHandler));
  }
  getYearWiseTransportationList(postData: any): Observable<any> {
    return this.httpClient
      .post(environment.apiBaseUrl + '/transportfee/year', postData)
      .pipe(catchError(this.errorHandler));
  }
  createTransportFee(postData: any): Observable<any> {
    return this.httpClient
      .post(environment.apiBaseUrl + '/transportfee/create', postData)
      .pipe(catchError(this.errorHandler));
  }
  updateTransportFee(id: any, postData: any): Observable<any> {
    return this.httpClient
      .put(environment.apiBaseUrl + '/transportfee/update/' + id, postData)
      .pipe(catchError(this.errorHandler));
  }
  deleteTransportFee(id: any): Observable<any> {
    return this.httpClient
      .delete(environment.apiBaseUrl + '/transportfee/delete/' + id)
      .pipe(catchError(this.errorHandler));
  }
  getAllFeeMode(): Observable<any> {
    return this.httpClient
      .get(environment.apiBaseUrl + '/getAllMode')
      .pipe(catchError(this.errorHandler));
  }
  studenWiseFeeCategoryStore(postData: any): Observable<any> {
    return this.httpClient
      .post(environment.apiBaseUrl + '/createFeeConcession', postData)
      .pipe(catchError(this.errorHandler));
  }
  getAllFeeMonth(id: string): Observable<any> {
    return this.httpClient
      .get(environment.apiBaseUrl + '/allFeeMonth/' + id)
      .pipe(catchError(this.errorHandler));
  }
  promoteToAllStudent(postData: any): Observable<any> {
    return this.httpClient
      .post(environment.apiBaseUrl + '/promoteAll', postData)
      .pipe(catchError(this.errorHandler));
  }
  promoteWithSelectedStudent(postData: any): Observable<any> {
    return this.httpClient
      .post(environment.apiBaseUrl + '/notPromoteAll', postData)
      .pipe(catchError(this.errorHandler));
  }
  getStudentAttendanceData(postData: any): Observable<any> {
    return this.httpClient
      .post(environment.apiBaseUrl + '/showAttandanceList', postData)
      .pipe(catchError(this.errorHandler));
  }
  getEmployeeAttendance(postData: any): Observable<any> {
    return this.httpClient
      .post(environment.apiBaseUrl + '/empAttandance/filter', postData)
      .pipe(catchError(this.errorHandler));
  }
  updateEmployeeAttendance(postData: any): Observable<any> {
    return this.httpClient
      .post(environment.apiBaseUrl + '/empAttandance/create', postData)
      .pipe(catchError(this.errorHandler));
  }
  createPrincipalReport(postData: any): Observable<any> {
    return this.httpClient
      .post(environment.apiBaseUrl + '/createReport', postData)
      .pipe(catchError(this.errorHandler));
  }
  getPrincipalReport(postData: any): Observable<any> {
    return this.httpClient
      .post(environment.apiBaseUrl + '/getReportByDate', postData)
      .pipe(catchError(this.errorHandler));
  }
  createAdmissionType(postData: any): Observable<any> {
    return this.httpClient
      .post(environment.apiBaseUrl + '/createType', postData)
      .pipe(catchError(this.errorHandler));
  }
  getAdmissionTypeAll(): Observable<any> {
    return this.httpClient
      .get(environment.apiBaseUrl + '/type/all')
      .pipe(catchError(this.errorHandler));
  }
  updateAdmissionType(postData): Observable<any> {
    return this.httpClient
      .put(environment.apiBaseUrl + '/updateType', postData)
      .pipe(catchError(this.errorHandler));
  }
  deleteAdmissionType(id: string): Observable<any> {
    return this.httpClient
      .delete(environment.apiBaseUrl + '/type/' + id)
      .pipe(catchError(this.errorHandler));
  }
  getActiveInactiveStudent(postData: any, status:boolean): Observable<any> {
    return this.httpClient
      .post(environment.apiBaseUrl + "/students/active/"+status+"/academic", postData)
      .pipe(catchError(this.errorHandler));
  }
  getStudentStrengthReport(postData: any, type:string): Observable<any> {
    return this.httpClient
      .post(environment.apiBaseUrl + "/students/filter/"+type+"", postData)
      .pipe(catchError(this.errorHandler));
  }
  getEmployeeAttendanceReport(postData: any): Observable<any> {
    return this.httpClient
      .post(environment.apiBaseUrl + "/filteremp/attandance", postData)
      .pipe(catchError(this.errorHandler));
  }
  getStudentAttendanceReport(postData: any): Observable<any> {
    return this.httpClient
      .post(environment.apiBaseUrl + "/filterStudent/attandance", postData)
      .pipe(catchError(this.errorHandler));
  }

  deleteBannerById(id: string): Observable<any> {
     return this.httpClient
      .delete(environment.apiBaseUrl + '/banner/delete', {
        body: id,
      })
      .pipe(catchError(this.errorHandler));
  }
  deleteNotificationById(id: string): Observable<any> {
    return this.httpClient
     .delete(environment.apiBaseUrl + '/notification/delete', {
       body: id,
     })
     .pipe(catchError(this.errorHandler));
 }
 deleteNoticeById(id: string): Observable<any> {
  return this.httpClient
   .delete(environment.apiBaseUrl + '/noticeBoard/delete', {
     body: id,
   })
   .pipe(catchError(this.errorHandler));
}
getdashbaoradData(): Observable<any> {
  return this.httpClient
    .get(environment.apiBaseUrl + '/dashbaoradData')
    .pipe(catchError(this.errorHandler));
}
getRaiseTicket(): Observable<any> {
  return this.httpClient
    .get(environment.apiBaseUrl + '/getAllRaiseTicket')
    .pipe(catchError(this.errorHandler));
}
getAllVehicle(): Observable<any> {
  return this.httpClient
    .get(environment.apiBaseUrl + '/getAllVehicle')
    .pipe(catchError(this.errorHandler));
}
getSectionCount(): Observable<any> {
  return this.httpClient
    .get(environment.apiBaseUrl + '/classSectionCount')
    .pipe(catchError(this.errorHandler));
}
  isEmptyObject(obj) {
    for (var property in obj) {
      if (obj.hasOwnProperty(property)) {
        return false;
      }
    }
    return true;
  }
  errorHandler(error: {
    error: {
      messge: string;
    };
    status: any;
    message: any;
  }) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.messge;
    } else {
      errorMessage = `${error.error.messge}`;
    }
    console.log(error);
    return throwError(errorMessage);
  }
}
