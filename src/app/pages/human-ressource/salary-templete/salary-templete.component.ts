import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-salary-templete',
  templateUrl: './salary-templete.component.html',
  styleUrls: ['./salary-templete.component.scss']
}) 
export class SalaryTempleteComponent implements OnInit {

  isLoading: boolean;
  salaryForm: FormGroup;
  salaries: any[] = [];
  selectedSal: any;
  selectedRow:any;
  tableHeader:any;
  modalRef!: BsModalRef;
  @ViewChild('template', { read: TemplateRef }) editTemplate:TemplateRef<any>;
  @ViewChild('deletemplate', { read: TemplateRef }) deleteTemplate:TemplateRef<any>;
  constructor(private api: ApiService, private toastr: ToastrService, private router: Router,
    private modalService: BsModalService)
  {
    this.salaryForm = new FormGroup({
      salaryGrade: new FormControl(null, [Validators.required]),
      basicSalary: new FormControl(null, [Validators.required]),
      overTimeRatePerHr: new FormControl(0),
      allowances: new FormArray([
        new FormGroup({
          name:  new FormControl(null, [Validators.required]),
          amount: new FormControl(0, [Validators.required])
        })
      ]),
      deductions: new FormArray([
        new FormGroup({
          name:  new FormControl(null, [Validators.required]),
          amount: new FormControl(0, [Validators.required])
        })
      ]),
      basicSal: new FormControl({value: 0, disabled: true}),
      totalAllowance: new FormControl({value: 0, disabled: true}),
      totalDeduction: new FormControl({value: 0, disabled: true}),
      netSal: new FormControl({value: 0, disabled: true})
    })
  }

  ngOnInit(): void {
    this.getSalaryTemplatesA();
    this.tableHeader = {
      data: [
        {  field: "autoNo", dataType:"autoNo", title: 'S. No', sort: false, visible: true, search:false },
        {  field: "salaryGrade", dataType: "string", title: 'Salary Grades', sort: true, visible: true, search:true },
        {  field: "basicSalary", dataType: "string", title: 'Basic Salary', sort: true, visible: true, search:true },
        {  field: "overTimeRatePerHr", dataType: "string", title: 'Over Time Rate(Per Hour)', sort: true, visible: true, search:true },
        {  field: "action", dataType:"action", title: 'Action', sort: false, visible: true, search:false }
       ],
      searchPlaceholder:"Search by Salary Grades, Basic Salary and Over Time",
      sortBy: { field: 'salaryGrade', asc: true },
      toolbar: {
        show: true,
        visibleOn: 'visibility',
        config: {
          view: {
            show: true,
            callback: () => { },
          },
          edit: {
            show: true,
            callback: () => {},
          },
          delete: {
            show: true,
            callback: () => {},
          },
        },
      },
    }
  }

  getSalaryTemplates()
  {
    this.api.getSalaryTemplates().subscribe(resp => {
      console.log(resp);
      
      this.salaries = resp.feeGroups;
    })
  }


  getSalaryTemplatesA()
  {
    this.api.getSalaryTemplates().subscribe(resp => {
      console.log(resp);
      
      this.salaries = resp.salaries;

    })
  }
  get allowancesFields() {
    return this.salaryForm.get('allowances') as FormArray;
  }

  get deductionsFields() {
    return this.salaryForm.get('deductions') as FormArray;
  }

  addAllowancesField()
  {
    this.allowancesFields.push(
      new FormGroup({
        name:  new FormControl(null, [Validators.required]),
        amount: new FormControl(0, [Validators.required])
      })
    )
  }

  addDeductionsField()
  {
    this.deductionsFields.push(
      new FormGroup({
        name:  new FormControl(null, [Validators.required]),
        amount: new FormControl(0, [Validators.required])
      })
    )
  }

  updateDetails()
  {
    let basicSal, totalAllowance = 0, totalDeduction = 0, netAmount = 0;

    basicSal = (this.salaryForm.get('basicSalary')?.value) ? this.salaryForm.get('basicSalary')?.value : 0;

    this.allowancesFields.controls.forEach(field => {
      totalAllowance += field.get('amount')?.value;
    });

    this.deductionsFields.controls.forEach(field => {
      totalDeduction += field.get('amount')?.value;
    });

    netAmount = basicSal + totalAllowance - totalDeduction;

    this.salaryForm.patchValue({
      basicSal: this.salaryForm.get('basicSalary')?.value,
      totalAllowance,
      totalDeduction,
      netSal: netAmount
    })
  }

  addSalaryTemplate()
  {
    this.isLoading = true;
    this.api.addSalary(this.salaryForm.value).subscribe(resp => {
      this.isLoading = false;
      this.salaryForm.reset();
      this.toastr.success(resp.message, "Salary template add success");
      this.getSalaryTemplatesA();
    },
    (err) => {
      this.isLoading = false;
      this.toastr.error(err, "Salary template add failed");
      console.error(err);
    })
  }

  deleteSalary()
  {
    this.isLoading = true;
    this.api.deleteSalary(this.selectedSal._id).subscribe(resp => {
      this.isLoading = false;
      this.closePopup();
      this.getSalaryTemplatesA();
    },
    (err) => {
      this.isLoading = false;
      console.error(err);
    })
  }
  closePopup(){
    this.modalRef.hide();
  }
  rowEvent($event: any) {
    this.selectedRow = $event.lead;
    if($event['event'] === 'edit'){
      this.router.navigate(['/human-resource/salary-templete/'+this.selectedRow._id]);
    }
    if($event['event'] === 'delete'){
      this.openDeleteModal(this.deleteTemplate)
    }
    if($event['event'] === 'view'){
      this.openModal(this.editTemplate)
    }
  }
  openModal(template: TemplateRef<any>){
    this.selectedSal = this.selectedRow;
    this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
  }
  openDeleteModal(template: TemplateRef<any>){
    this.selectedSal = this.selectedRow;
    this.modalRef = this.modalService.show(template);
  }
}
