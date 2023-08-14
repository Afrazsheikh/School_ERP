import { Injectable } from '@angular/core';
import { routes } from '../../constants/routes';
@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  admission = {
    "name":"Admission",
    "url":"/admission",
    "icon":"account_circle",
     "subMenu":[{
      "url":routes.C_ADMISSION, "name":"Create Admission"
     },
     {
      "url":routes.CAT_ADMISSION, "name":"Category"
     },
     {
      "url":routes.MUL_ADMISSION, "name":"Multiple Import"
     },
     {
      "url":routes.TYPE_ADMISSION, "name":"Type"
     }
    ]
  }
  attendance = {
    "name":"Attendance",
    "url":"/attendance",
    "icon":"leaderboard",
     "subMenu":[{
      "url":routes.ATTENDANCE_EMPLOYEE, "name":"Employee"
     },
     {
      "url":routes.ATTENDANCE_STUDENT,"name":"Student"
     }
    ]
  }
  fees = {
    "name":"Fees",
    "url":"/fees",
    "icon":"monetization_on",
     "subMenu":[{
      "url":routes.FEES_CATEGORY, "name":"Fee Category"
     },
     {
      "url":routes.FEES_TYPE,"name":"Fee List"
     },
     {
      "url":routes.FEES_TRANSPORT,"name":"Transport List"
     },
     {
      "url":routes.STUDENT_HISTORY,"name":"Student History"
     }
    ]
  }
  academic = {
    "name":"Academic",
    "url":"/academic",
    "icon":"account_balance",
     "subMenu":[{
      "url":routes.ACADE_CLASS, "name":"Control Classes"
     },
     {
      "url":routes.ACADE_ASSIGN,"name":"Assign Class Teacher"
     },
     {
      "url":routes.ACADE_SUB,"name":"Subject"
     },
     {
      "url":routes.ACADE_CLASS_ASSIGN,"name":"Class Assign"
     },
     {
      "url":routes.ACADE_CLASS_SCH,"name":"Class Schedule"
     },
     {
      "url":routes.ACADE_TEACHER_SCH,"name":"Teacher Schedule"
     },
     {
      "url":routes.ACADE_STUDENT_PROMOTION,"name":"Promotion"
     }
    ]
  }
  studentList ={
    "name":"Student",
    "url":routes.STUDNT_LIST,
    "icon":"contacts",
     "subMenu":[{ "url":routes.STUDNT_LIST, "name":"Student List"}]
  }
  constructor() { }

}
