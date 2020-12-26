import { Component, OnInit, Input, ViewChild,HostListener } from '@angular/core';
import { Form } from "../../model/Form";
import { FormField } from "../../model/FormField";
import { MessagingService } from "../../services/messaging.service";
import {FormService} from   "../../services/form.service";
import { SafeStyle, DomSanitizer } from "@angular/platform-browser";
import { ProductList } from "app/model/ProductList";
import { Product } from "app/model/Product";
@Component({
  selector: 'productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.css']
})
export class ProductlistComponent implements OnInit {

   @Input() frm:Form;
   @Input() actvieFormField:FormField;
   @Input() drpDownFontColor:string;
   @Input() drpDownBGColor:string;
   
   productList: ProductList;
   showBill=false;
  
  constructor(private mService: MessagingService,private frmSrv :FormService, private _sanitizer: DomSanitizer) { }
  
  ngOnInit(): void {
   
      if(this.actvieFormField.productList)
         if(this.actvieFormField.productList.products)
             this.actvieFormField.productList.products.forEach(p=>{if(!p.quantity)p.quantity=0});
//      this.productList=new ProductList();
//      let product=new Product();
//      this.productList.products= [];
//      product.defaultimage="https://www.amazon.in/images/I/71A4FOEgLnL._UL1500_.jpg";
//      product.title="Shozie Men's Running Sports Shoes";
//      product.make="Shozie";
//      product.description="Flaunt with these stylish and unique red casual shoes as per the latest fashion trend from the house of Shozie, Brand known for its wide range of men's casual, formal, sports/running, ethnic, party wear shoes. This pair is having classic style which will add glamour to your look. These shoes go well with your casual wear. Team it with your casual attire to complete your perfect casual or party look.";
////      product.description="Flaunt with these stylish and unique red casual shoes.";
//      product.priceNote="Inclusive of all taxes";
//      product.price=1000.00;
//      
//          
//      
//      this.productList.currency="INR";
//      this.productList.currencysymbol=this.frmSrv.getCurrency().get("rupee");
//      this.productList.products.push(product);
      
  }
  sanitizeHTML( style: string ): SafeStyle {
      return this._sanitizer.bypassSecurityTrustStyle( style );
  }
  updateQuantity(value:number,prd:Product)
  {
    
          prd.quantity=value;
     
        
      this.generateBillAmount();
      
  }
  generateBillAmount()
  {
      if(this.actvieFormField.productList && this.actvieFormField.productList.products){
          let subtotal=0.0;
          let total=0.0;
          let taxamt=0.0
          this.actvieFormField.productList.products.forEach(prd=>{
              subtotal=subtotal+(prd.quantity.valueOf()*prd.price.valueOf());
          });
          if(this.actvieFormField.productList.taxrate)
              this.actvieFormField.productList.taxamount=(subtotal/this.actvieFormField.productList.taxrate.valueOf());
          else
              this.actvieFormField.productList.taxamount=0;
          if(!this.actvieFormField.productList.deliverychrg)
              this.actvieFormField.productList.deliverychrg=0;
          if(subtotal>0)
          {    total=subtotal+this.actvieFormField.productList.taxamount.valueOf()+this.actvieFormField.productList.deliverychrg.valueOf();
              this.actvieFormField.productList.subtotal=subtotal;
               this.actvieFormField.productList.total=total;
               this.actvieFormField.productList.showbill=true;
          }
          else
              this.actvieFormField.productList.showbill=false;
          
      }
          
  }
  setDropDownCSS()
  {
     let tmpthis=this;
      $( '.mat-option').each( function() {
          this.style.setProperty( '--comp-color', tmpthis.drpDownFontColor);
          this.style.setProperty( '--comp-bg-color', tmpthis.drpDownBGColor);
      });
      $( '.select-group-label-frm .mat-optgroup-label').each( function() {
          this.style.setProperty( '--comp-color', tmpthis.drpDownFontColor);
          this.style.setProperty( '--comp-bg-color', tmpthis.drpDownBGColor);
      });
      
  }

  
  
}
