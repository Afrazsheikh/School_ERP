import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  schoolInfo={
    "name":"ERP School & College",
    "address":"Chyakunjo, Moylapotha, New York",
    "phoneNo":"(91) 123456789",
    "email":"school@gmail.com"
  };
  paymentMethod = [{ _id: "Card", name: "Card" }, { _id: "Cash", name: "Cash" },{ _id: "Cheque", name: "Cheque" },{ _id: "Bank Transfer", name: "Bank Transfer" },
  { _id: "Other", name: "Other" },{ _id: "Paypal", name: "Paypal" },{ _id: "Stripe", name: "Stripe" },{ _id: "PayUmoney", name: "PayUmoney" },{ _id: "Paystack", name: "Paystack" },
  { _id: "Razorpay", name: "Razorpay" },{ _id: "SSLcommerz", name: "SSLcommerz" },{ _id: "Jazzcash", name: "Jazzcash" },{ _id: "Midtrans", name: "Midtrans" },{ _id: "Flutter Wave", name: "Flutter Wave" }
   ];
   AccountMethod = [{ _id: "STB", name: "STB" }, { _id: "Janata bank", name: "Janata bank" }];
  concessionList = [{ _id: "0", name: "0" }, { _id: "10", name: "10%" },{ _id: "15", name: "15%" }]
  feeMode = [{ _id: "quarterly", name: "Quarterly" }, { _id: "monthly", name: "Monthly" },{ _id: "anually", name: "Anually" }];
  aceYear = [{ _id: "2023-2024", name: "2023-2024" },{ _id: "2024-2025", name: "2024-2025" }];
  genderList = [{_id:"Male", name:"Male"}, {_id:"Female", name:"Female"},{_id:"Other", name:"Other"}];

  typeList=[{ _id: "Registration Application", name: "Registration Application" },{ _id: "Admission Application", name: "Admission Application" }]

  bloodGrList=[{_id:"A+", name:"A+"}, {_id:'A-', name:"A-"},{_id:'B+', name:"B+"},{_id:'B-', name:"B-"},{_id:'O+', name:"O+"},
  {_id:'O-', name:"O-"},{_id:'AB+', name:"AB+"},{_id:'AB-', name:"AB-"}];
  
  religionList =[{_id:"Hinduism", name:"Hinduism"},{_id:"Christians ", name:"Christians "},{_id:"Muslims", name:"Muslims"},
  {_id:"Sikhs", name:"Sikhs"},{_id:"Jains", name:"Jains"},{_id:"Buddhists", name:"Buddhists"}];

  castList = [{_id:"BC", name:"BC"},{_id:"ОВС", name:"ОВС"},{_id:"OC", name:"OC"}, {_id:"ST", name:"ST"}, {_id:"SC", name:"SC"}, {_id:"BC-A", name:"BC-A"},
  {_id:"BC-B", name:"BC-B"},{_id:"BC-C", name:"BC-C"},{_id:"BC-D", name:"BC-D"}, {_id:"BC-E", name:"BC-E"}, {_id:"SC-A", name:"SC-A"}, {_id:"SC-B", name:"SC-B"},{_id:"SC-C", name:"SC-C"},{_id:"SC-D", name:"SC-D"},
  {_id:"Others", name:"Others"},{_id:"AO", name:"AO"},{_id:"NT-A", name:"NT-A"}, {_id:"NT-B", name:"NT-B"}, {_id:"NT-C", name:"NT-C"}, {_id:"NT-D", name:"NT-D"}
];

  language =[{_id:"Gujarati", name:"Gujarati"},{_id:"Hindi", name:"Hindi"},{_id:"English", name:"English"},
  {_id:"Marathi", name:"Marathi "},{_id:"Telugu", name:"Telugu"},{_id:"Tamil", name:"Tamil"},  {_id:"Urdu", name:"Urdu"},
  {_id:"Kannada", name:"Kannada"},{_id:"Bengali", name:"Bengali"},{_id:"Odia", name:"Odia"},  {_id:"Malayalam", name:"Malayalam"},
  {_id:"Punjabi", name:"Punjabi"},{_id:"Assamese", name:"Assamese"}];

  relationShipList= [{_id:"Father", name:"Father"},{_id:"Mother", name:"Mother"},{_id:"Others", name:"Others"}];

  occupationsList= [{_id:"Govt.Job", name:"Govt.Job"},{_id:"Private Job", name:"Private Job"},{_id:"Business", name:"Business"},{_id:"Others", name:"Others"}];

  educationList= [{_id:"School", name:"School"},{_id:"Graduate", name:"Graduate"},{_id:"Post Graduate", name:"Post Graduate"},{_id:"Others", name:"Others"}];
  indiaStateList =[{"key":"AP", "name":"Andhra Pradesh"}, 
{"key":"AR" , "name":"Arunachal Pradesh"},
{"key":"AS" , "name":"Assam"},
{"key":"BR" , "name":"Bihar"},
{"key":"CT" , "name":"Chhattisgarh"},
{"key":"GA" , "name":"Goa"},
{"key":"GJ" , "name":"Gujarat"},
{"key":"HR" , "name":"Haryana"},
{"key":"HP" , "name":"Himachal Pradesh"},
{"key":"JK" , "name":"Jammu and Kashmir"},
{"key":"JH" , "name":"Jharkhand"},
{"key":"KA" , "name":"Karnataka"},
{"key":"KL" , "name":"Kerala"},
{"key":"MP" , "name":"Madhya Pradesh"},
{"key":"MH" , "name":"Maharashtra"},
{"key":"MN" , "name":"Manipur"},
{"key":"ML" , "name":"Meghalaya"},
{"key":"MZ" , "name":"Mizoram"},
{"key":"NL" , "name":"Nagaland"},
{"key":"OR" , "name":"Odisha"},
{"key":"PB" , "name":"Punjab"},
{"key":"RJ" , "name":"Rajasthan"},
{"key":"SK" , "name":"Sikkim"},
{"key":"TN" , "name":"Tamil Nadu"},
{"key":"TG" , "name":"Telangana"},
{"key":"TR" , "name":"Tripura"},
{"key":"UT" , "name":"Uttarakhand"},
{"key":"UP" , "name":"Uttar Pradesh"},
{"key":"WB" , "name":"West Bengal"},
{"key":"AN" , "name":"Andaman and Nicobar Islands"},
{"key":"CH" , "name":"Chandigarh"},
{"key":"DN" , "name":"Dadra and Nagar Haveli"},
{"key":"DD" , "name":"Daman and Diu"},
{"key":"DL" , "name":"Delhi"},
{"key":"LD" , "name":"Lakshadweep"},
{"key":"PY" , "name":"Puducherry"}];
  studentDetailBackAction = {
    "isBack": false,
    "academicYear":"",
    "studentClass":"",
    "section":""
  };
 
   constructor() { }
}
