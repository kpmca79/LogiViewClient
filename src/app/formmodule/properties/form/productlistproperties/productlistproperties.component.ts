import { Component, OnInit, Input } from '@angular/core';
import { Form } from "../../../../model/Form";
import { FormField } from "../../../../model/FormField";
import { MessagingService } from "../../../../services/messaging.service";
import {FormService} from   "../../../../services/form.service";
import { ProductList } from "app/model/ProductList";
import { Product } from "app/model/Product";

@Component({
  selector: 'productlistproperties',
  templateUrl: './productlistproperties.component.html',
  styleUrls: ['./productlistproperties.component.css']
})
export class ProductlistpropertiesComponent implements OnInit {

  @Input() frm:Form;
  @Input() actvieFormField:FormField;
  icons;
  tmpOptions;
  lstPrd:ProductList;
  currency;
  multiLevel=false;
  product;
  oldproduct;
  activeTab=1;
  createProductFlag=false;
  operator:String[]=['=','!=','Contains','!Contains','Starts with','!Starts with','Ends with','!Ends with','>','>=','<','<=','Specified','!Specified'];
    
    constructor(private mService: MessagingService,private frmSrv :FormService) { }
  ngOnInit(): void {
      this.lstPrd=this.actvieFormField.productList;
      this.icons=this.frmSrv.getMatIcons();
      this.tmpOptions=this.arrTostrOptions(this.actvieFormField.selOptions);
      this.currency=this.frmSrv.getCurrency();
      if(this.actvieFormField.selOptions)
          this.actvieFormField.selOptions.forEach(val=>{val.strSubOps=this.arrTostrSubOptions(val.subOps)});
  }
  createProduct()
  {
     console.log('Inside cretate product');
      this.product=new Product();
      this.activeTab=2;
      this.createProductFlag=true;
      
      
  }
  saveProduct()
  {
      if(!this.actvieFormField.productList)
          this.actvieFormField.productList=new ProductList();
      if(!this.actvieFormField.productList.products)
          this.actvieFormField.productList.products=[];
      if(this.product && this.createProductFlag)
          this.actvieFormField.productList.products.push(this.product);
      this.createProductFlag=false; 
      console.log("####@@this.actvieFormField.productList@@@@@@@=>",this.actvieFormField.productList)
      console.log("####@@this.product@@@@@@@=>",this.product)
      this.lstPrd=this.actvieFormField.productList;
      console.log("####@@this.lstPrd@@@@@@@=>",this.lstPrd)
      this.lstPrd.products.length
      this.activeTab=1;
      
  }
  editProduct(pr)
  {
      this.product=pr;
      this.activeTab=2;
      this.createProductFlag=false;
  }
  arrTostrOptions(arr)
  {
      let strOptions="";
      if(arr)
      arr.forEach(val=>{strOptions+=val.name+"\n";})
      return strOptions;
  }
  arrTostrSubOptions(arr)
  {
      let strOptions="";
      if(arr)
      arr.forEach(val=>{strOptions+=val+"\n";})
      return strOptions;
  }
  textareaContentChange()
  {
      let optionVal=[];
      if(this.tmpOptions)
         optionVal=this.tmpOptions.split('\n');
      this.actvieFormField.selOptions=[];
      optionVal.forEach(val=>{
          if(val)
          {
              val=val.trim();
              this.actvieFormField.selOptions.push({name:val,subOps:null,strSubOps:null});
          }
      })
      
  }
  
  suboptTextareaContentChange(grpOpt)
  {
      console.log("ffffffff===>",grpOpt);
      let optionVal=[];
      if(grpOpt.strSubOps)
          optionVal=[]=grpOpt.strSubOps.split('\n')
      grpOpt.subOps=[];
      optionVal.forEach(val=>{
          if(val)
          {
              val=val.trim();
              grpOpt.subOps.push(val);
          }
      })
//      if(this.actvieFormField.selOptions)
//          this.actvieFormField.selOptions.forEach(val=>{
//              if(val.name==grpOpt.name)
//                  val.
//          });
      console.log("ffffffff===>",grpOpt);
         
  }
  multiLevelChk()
  {
      this.actvieFormField.dropDownMultiLevel=true;
      
  }
  singleLevelCkh()
  {
      this.actvieFormField.dropDownMultiLevel=false;
  }
  openCloseRightPanel()
  {
      let obj:any={id:'close'}
      console.log("9999999999999999999999999999")
      this.mService.produce(obj);
  }
}
