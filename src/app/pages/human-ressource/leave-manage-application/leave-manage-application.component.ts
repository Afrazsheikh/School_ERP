import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import * as moment from 'moment';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-leave-manage-application',
  templateUrl: './leave-manage-application.component.html',
  styleUrls: ['./leave-manage-application.component.scss'],
})
export class LeaveManageApplicationComponent implements OnInit {
  leaveApps: any[] = [];
  filteredLeaveApps: any[] = [];
  leaveCats: any[] = [];
  employees: any[] = [];
  employeesNewList: any[] = [];
  designations: any[] = [];
  leaveForm: FormGroup;
  editLeaveForm: FormGroup;
  selectedLeave: any;
  isLoading: boolean;
  fileData: any;
  designFilter: string = 'select';
  selectedRow: any;
  tableHeader: any;
  modalRef!: BsModalRef;
  @ViewChild('viewLeave', { read: TemplateRef }) viewLeave: TemplateRef<any>;
  @ViewChild('deletePrompt', { read: TemplateRef })
  deleteTemplate: TemplateRef<any>;
  constructor(
    private api: ApiService,
    private toastr: ToastrService,
    private modalService: BsModalService
  ) {
    this.leaveForm = new FormGroup({
      toDate: new FormControl<Date | null>(null, [Validators.required]),
      fromDate: new FormControl<Date | null>(null, [Validators.required]),
      leaveType: new FormControl('select', [Validators.required]),
      employee: new FormControl('select', [Validators.required]),
      reason: new FormControl(null, [Validators.required]),
      status: new FormControl('PENDING'),
      designation: new FormControl(),
    });
  }

  ngOnInit(): void {
    this.getLeaveApplication();
    this.getLeavesCategory();
    this.tableHeader = {
      data: [
        {
          field: 'autoNo',
          dataType: 'autoNo',
          title: 'S. No',
          sort: false,
          visible: true,
          search: false,
        },
        {
          field: 'roleName',
          dataType: 'string',
          title: 'Role',
          sort: true,
          visible: true,
          search: true,
        },
        {
          field: 'applicantName',
          dataType: 'string',
          title: 'Applicant Name',
          sort: true,
          visible: true,
          search: true,
        },
        {
          field: 'levelCategory',
          dataType: 'string',
          title: 'Leave Category',
          sort: true,
          visible: true,
          search: true,
          width: '13%',
        },
        {
          field: 'fromDate',
          dataType: 'date',
          title: 'Date of Start',
          sort: true,
          visible: true,
          search: true,
          width: '13%',
        },
        {
          field: 'toDate',
          dataType: 'date',
          title: 'Date of End',
          sort: true,
          visible: true,
          search: true,
        },
        {
          field: 'days',
          dataType: 'string',
          title: 'Days',
          sort: true,
          visible: true,
          search: true,
          width: '8%',
        },
        {
          field: 'status',
          dataType: 'status',
          title: 'Status',
          sort: true,
          visible: true,
          search: true,
          width: '8%',
        },
        {
          field: 'action',
          dataType: 'action',
          title: 'Action',
          sort: false,
          visible: true,
          search: false,
        },
      ],
      searchPlaceholder: 'Search by Role, Applicant Name and Category',
      sortBy: { field: 'roleName', asc: true },
      toolbar: {
        show: true,
        visibleOn: 'visibility',
        config: {
          view: {
            show: true,
            callback: () => {},
          },
          delete: {
            show: true,
            callback: () => {},
          },
        },
      },
    };
  }
  onChangeDepart(event) {
    // this.filterByDes = [];
    // this.filterByDesignation(event.target.value);
    this.getDesignationByIdData(event.target.value);
  }
  getDesignationByIdData(id) {
    this.employeesNewList = [];
    this.leaveForm.patchValue({
      employee: '',
    });
    this.api.getDesignationById(id).subscribe((resp) => {
      this.employeesNewList = resp?.employees;
    });
  }
  getDesignations() {
    this.api.getDesignations().subscribe((resp) => {
      if (Array.isArray(resp.designations)) {
        resp.designations.sort((a, b) => a.name.localeCompare(b.name));
        this.designations = resp.designations;
        this.filteredLeaveApps.forEach((leave, index) => {
          if (leave.employee) {
            leave.employee.designation = this.designations.find(
              (design) => design._id === leave.employee?.designation
            );
          }
        });
  
        console.log(this.designations);
      } else {
        console.error('Designations data is not an array:', resp.designations);
      }
    });
  }
  

  getLeaveApplication() {
    this.getDesignations();
    this.api.getLeaveApplication().subscribe((resp) => {
      this.leaveApps = resp.leavesRequest;
      this.filteredLeaveApps = resp.leavesRequest;
      this.filteredLeaveApps = this.filteredLeaveApps.filter(
        (leave) => leave.employee || leave.student
      );
      this.getFilteredLeaves();
    });
  }

  getFilteredLeaves() {
    if (this.designFilter !== 'select') {
      if (this.designFilter === 'student') {
        this.filteredLeaveApps = this.leaveApps.filter(
          (leave) => leave.student
        );
      } else {
        this.filteredLeaveApps = this.leaveApps.filter(
          (leave) => leave.employee?.designation?._id === this.designFilter
        );
      }
      console.log('GetFiltercall\n\n');
      console.log(this.filteredLeaveApps);
    }
    this.filteredLeaveApps.forEach((element) => {
      element['roleName'] = element.employee
        ? element.employee.designation.name
        : 'Student';
      element['applicantName'] = element.employee
        ? element.employee.name
        : element.student.firstName + ' ' + element.student.lastName;
      element['levelCategory'] = element.leaveType.name;
    });
  }

  getLeavesCategory() {
    this.api.getLeaveCategory().subscribe((resp) => {
      this.leaveCats = resp.leavesCategory;
      this.getEmployees();
    });
  }

  getEmployees() {
    this.api.getAllEmployees().subscribe((resp) => {
      this.employees = resp.employees;
    });
  }

  onFilesDropped(files: NgxFileDropEntry[]) {
    console.log(files);
    if (files.length > 1) {
      alert('Please upload a single file');
    } else {
      for (const droppedFile of files) {
        if (droppedFile.fileEntry.isFile) {
          const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
          fileEntry.file((file: File) => {
            this.fileData = file;
          });
        }
      }
    }
  }

  addLeaveRequest() {
    this.isLoading = true;

    let postData = new FormData();
    postData.append(
      'toDate',
      moment(this.leaveForm.value.toDate).format('MM-DD-yyyy')
    );
    postData.append(
      'fromDate',
      moment(this.leaveForm.value.fromDate).format('MM-DD-yyyy')
    );
    postData.append('leaveType', this.leaveForm.value.leaveType);
    postData.append('employee', this.leaveForm.value.employee);
    postData.append('reason', this.leaveForm.value.reason);
    if (this.fileData) {
      postData.append('file', this.fileData);
    }

    console.log(postData);

    this.api.addLeaveRequest(postData).subscribe(
      (resp) => {
        this.isLoading = false;
        document.getElementById('addModalDismissBtn')?.click();
        this.toastr.success(resp.message, 'Leave request add success');
        this.leaveForm.reset();
        this.fileData = null;
        this.getLeaveApplication();
      },
      (err) => {
        this.isLoading = false;
        this.toastr.error(err, 'Leave request add failed');
      }
    );
  }
  openQuickModalForAddLeave(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
  }
  openQuickModal(template: TemplateRef<any>, data: any) {
    this.selectedLeave = data;
    this.leaveForm.patchValue({
      status: data.status,
    });
    this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
  }
  closePopup() {
    this.modalRef.hide();
  }
  updateStatus() {
    this.isLoading = true;
    const postData = {
      leavesRequestId: this.selectedLeave._id,
      status: this.leaveForm.value.status,
    };
    this.api.updateLeaveRequestStatus(postData).subscribe(
      (resp) => {
        console.log(resp);
        this.isLoading = false;
        // document.getElementById('updateStatusModal')?.click();
        this.closePopup();
        this.getLeaveApplication();
      },
      (err) => {
        this.isLoading = false;
        console.error(err);
      }
    );
  }

  deleteLeave() {
    this.isLoading = true;
    this.api.deleteLeaveRequest(this.selectedLeave._id).subscribe(
      (resp) => {
        console.log(resp);
        this.isLoading = false;
        this.closePopup();
        this.getLeaveApplication();
      },
      (err) => {
        this.isLoading = false;
        console.error(err);
      }
    );
  }
  rowEvent($event: any) {
    this.selectedRow = $event.lead;
    if ($event['event'] === 'view') {
      this.openQuickModal(this.viewLeave, this.selectedRow);
    }
    if ($event['event'] === 'delete') {
      this.selectedLeave = this.selectedRow;
      this.openDeleteModal(this.deleteTemplate, this.selectedRow);
    }
  }
  openDeleteModal(template: TemplateRef<any>, data: any) {
    this.modalRef = this.modalService.show(template);
  }
}
