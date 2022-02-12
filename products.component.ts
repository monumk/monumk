import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor(private http: HttpClient, private cookie: CookieService, private router: Router) { }

  email:string=''
  user:string=''
  cartItems:any[]= [];
  currentItem:any={};
  alldata:any={};
  total:number=0;
  serchProductName:string='';
  categoryName:string='';
  categories:any[]=[];
  products:any[]=[];
  oneProduct:any;

  ngOnInit(): void {
    this.GetProducts("http://127.0.0.1:3200/products").subscribe(data => this.products=data);
    this.GetCategory().subscribe(data => this.categories = data);
    this.user='Guest';
  }

  GetSearchProductName(e:any){
    this.serchProductName = e.target.value.toLowerCase();
  }



  ChangeCategory(e:any){
    this.GetProducts(`http://127.0.0.1:3200/products/${e.target.value}`).subscribe(data => this.products = data);
  }


  GetProducts(url:any):Observable<any[]>{
    return this.http.get<any[]>(url);
  }


  GetProductById(url:any):Observable<any>{
    return this.http.get<any>(url);
  }


  SearchProduct(){
    this.GetProducts(`http://127.0.0.1:3200/product/by/${this.serchProductName}`).subscribe(data => this.products=data);
  }

  GetOneProduct(url:any):Observable<any>{
    return this.http.get<any>(url);
  }


  AddtoCart(e:any){
    if(this.cookie.get('userid')==''){
      alert('Please Login');
      this.router.navigate(['/login']);
    }else{
          
      this.currentItem = this.products.find(function(data){
            return data.id==e;
          })

          this.cartItems.unshift(this.currentItem);
        
          this.CoutnCart();
          
          alert('item added to Cart');
          this.alldata= {
              email: this.cookie.get('userid'),
              price: this.currentItem.price,
              image: this.currentItem.image,
              title: this.currentItem.title
          }
          this.http.post('http://127.0.0.1:3200/cart/items',this.alldata).subscribe();
          this.GetCartItems().subscribe(data => this.total = data.length);
    }
  }

  CoutnCart(){
    if(this.cookie.get('userid')==''){
      this.total=0;
    }else{
      this.GetCartItems().subscribe(data => this.total = data.length);
    }
  }



  GetCartItems():Observable<any[]>{
    this.email = this.cookie.get('userid');
    return this.http.get<any[]>(`http://127.0.0.1:3200/cartitems/${this.email}`);
  }


  GetCategory():Observable<any[]>{
    return this.http.get<any[]>('http://127.0.0.1:3200/categories');
  }
}
