import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-crudoperation',
  templateUrl: './crudoperation.component.html',
  styleUrls: ['./crudoperation.component.css']
})
export class CrudoperationComponent {
  Customer : any[] = [];
  isResultLoaded = false;
  isUpdateFormActive = false;
 
  sno: string="";
  name: string ="";
  address: string ="";
  pincode: string ="";
  city : string ="";
  country :string = "";
 
  constructor(private http: HttpClient )
  {
    this.getAllCustomer();
  }
 
  ngOnInit(): void {
  }
 
  getAllCustomer()
  {
    this.http.get("http://localhost:3302/getdetails")
    .subscribe((resultData: any)=>
    {
        this.isResultLoaded = true;
        console.log(resultData.data);
        this.Customer = resultData.data;
    });
  }

  register()
  {
    let bodyData = {
      "name" : this.name,
      "address" : this.address,
      "pincode" : this.pincode,
      "city" : this.city,
      "country" : this.country
    };
 
    this.http.post("http://localhost:3302/add",bodyData)
    .subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Customer Registered Successfully");
        // this.getAllCustomer();
    });
  }
 

  save()
  {
    if(this.sno == '')
    {
        this.register();
    }
      else
      {
       this.UpdateRecords();
      }      
 
  }

  
  setUpdate(data: any)
  {
   this.name = data.name;
   this.address = data.address;
   this.pincode = data.pincode;
   this.city = data.city;
   this.country = data.country;
  
 
   this.sno = data.sno;
  }
 
  UpdateRecords()
  {
    let bodyData =
    {
      "name" : this.name,
      "address" : this.address,
      "pincode" : this.pincode,
      "city" : this.city,
      "country" : this.country
    };
    
    this.http.put("http://localhost:3302/update"+ "/"+ this.sno,bodyData)
    .subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Customer Details Updated")
        this.getAllCustomer();
      
    });
  }

 
  setDelete(data: any)
  {
    this.http.delete("http://localhost:3302/delete"+"/"+ data.sno)
    .subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Customer Deleted");
        this.getAllCustomer();
    });
  }
}

 


