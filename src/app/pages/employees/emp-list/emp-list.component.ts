import { Component, TemplateRef } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../../services/api.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-emp-list',
  templateUrl: './emp-list.component.html',
  styleUrls: ['./emp-list.component.scss']
})
export class EmpListComponent {
  modalRef!: BsModalRef;
  employees: any[] = [];
  filterByDes:any[] = [];
  designations: any[] = [];
  isLoading: boolean;
  employeeId:any;
  departmentDrp:string="";
  pageNo = 1;
  p: number = 1;
  pagingConfig = {
    'currentPage'  : 1,
    'itemsPerPage': 5,
    'totalItems' : 0
  }
  departments: any;
  depat: string = "";
  constructor(private api: ApiService,private modalService: BsModalService,
    private toastr: ToastrService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {

  }

  ngOnInit(): void {
    this.getDesignations();
    this.getEmployees();    
    this.getDepartments()
  }
  getDesignations() {
    this.api.getDesignations().subscribe(resp => {
      if (Array.isArray(resp.designations)) {
        resp.designations.sort((a, b) => a.name.localeCompare(b.name));
        this.designations = resp.designations;
      } else {
        console.error('Designations data is not an array:', resp.designations);
      }
    });
  }

  
  getDepartments()
  {
    this.api.getDepartments().subscribe(resp => {
      
      this.departments = resp.departments
    });
  }

  getEmployees() {
    this.spinner.show();
    this.pageNo =this.pagingConfig.currentPage;
    this.filterByDes = [];
    this.pagingConfig.totalItems  = 0;
    this.api.getEmployeesByPageNo(this.pageNo-1, this.depat).subscribe(resp => {
      this.spinner.hide();      
      this.employees = resp.employees;  
      console.log(this.employees);
      
      this.filterByDes = this.employees;
      this.pagingConfig.totalItems = resp['totalCount'] ; 
      // this.filterByDesignation("-1");    
    }, (err) =>{
      this.spinner.hide();
      this.employees =[];
      this.toastr.error(err);
    })
  }
  filterByDesignation(id){
    if(id === '-1'){
      this.filterByDes = this.employees;
    } else {
      this.filterByDes = this.employees.filter(emp => emp.designation?._id == id)
    }
  }
  multipleImport(){
    this.router.navigate(["/employee/add"]);
  }
  addEmployee(){
    this.router.navigate(["/employee/create"]);
  }
  openDeleteModal(template: TemplateRef<any>, data: any){
    this.employeeId = data._id;
    this.modalRef = this.modalService.show(template);
  }
  deleteEmpl() {
    this.api.deleteEmployee(this.employeeId ).subscribe(resp => {
      this.closePopup();
      this.toastr.success(resp.message, "Employee  Deleted successFully");
      this.getEmployees()
    },
      (err) => {
        this.isLoading = false;
        console.error(err);
      })
  }
  closePopup(){
    this.modalRef.hide();
  }
  detailClick(employee){
    this.router.navigate(["/employee/detail/"+ employee._id]);
  }
  onChangeDepart(event){
    // this.filterByDes = [];
    // this.filterByDesignation(event.target.value);
    this.departmentDrp = event.target.value;
    this.depat =  event.target.value
    console.log(this.depat);
    
    this.getEmployees();
  }
  pageChanged(event: any): void {
    this.pagingConfig.currentPage  = event;
    this.getEmployees();
   }

}
