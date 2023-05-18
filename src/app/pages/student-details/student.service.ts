import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  aceYear = [{ _id: "2020-2021", name: "2020-2021" }, { _id: "2021-2022", name: "2021-2022" }, { _id: "2022-2023", name: "2022-2023" }];
  genderList = [{_id:"Male", name:"Male"}, {_id:"Female", name:"Female"},{_id:"Other", name:"Other"}];

  typeList=[{ _id: "TYPE-A", name: "TYPE-A" },{ _id: "TYPE-B", name: "TYPE-B" }]

  bloodGrList=[{_id:"A+", name:"A+"}, {_id:'A-', name:"A-"},{_id:'B+', name:"B+"},{_id:'B-', name:"B-"},{_id:'O+', name:"O+"},
  {_id:'O-', name:"O-"},{_id:'AB+', name:"AB+"},{_id:'AB-', name:"AB-"}];
  
  religionList =[{_id:"Hinduism", name:"Hinduism"},{_id:"Christians ", name:"Christians "},{_id:"Muslims", name:"Muslims"},
  {_id:"Sikhs", name:"Sikhs"},{_id:"Jains", name:"Jains"},{_id:"Buddhists", name:"Buddhists"}];

  castList = [{_id:"SC", name:"SC"},{_id:"ST", name:"ST"},{_id:"OBC", name:"OBC"}, {_id:"GENERAL", name:"General"}];

  language =[{_id:"Gujarati", name:"Gujarati"},{_id:"Hindi", name:"Hindi"},{_id:"English", name:"English"},
  {_id:"Marathi", name:"Marathi "},{_id:"Telugu", name:"Telugu"},{_id:"Tamil", name:"Tamil"},  {_id:"Urdu", name:"Urdu"},
  {_id:"Kannada", name:"Kannada"},{_id:"Bengali", name:"Bengali"},{_id:"Odia", name:"Odia"},  {_id:"Malayalam", name:"Malayalam"},
  {_id:"Punjabi", name:"Punjabi"},{_id:"Assamese", name:"Assamese"}];

  relationShipList= [{_id:"Father", name:"Father"},{_id:"Mother", name:"Mother"},{_id:"Others", name:"Others"}];

  occupationsList= [{_id:"Govt.Job", name:"Govt.Job"},{_id:"Private Job", name:"Private Job"},{_id:"Business", name:"Business"},{_id:"Others", name:"Others"}];

  educationList= [{_id:"School", name:"School"},{_id:"Graduate", name:"Graduate"},{_id:"Post Graduate", name:"Post Graduate"},{_id:"Others", name:"Others"}];
  
  studentDetailBackAction = {
    "isBack": false,
    "academicYear":"",
    "studentClass":"",
    "section":""
  };
   constructor() { }
}
