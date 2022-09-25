import { Component, Input, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  @Input() viewMode = false;

  @Input() currentProduct: Product = {
    prod_nom: '',
    id_prod_typ: '',
    prod_desc: '',
    precio: '',
    id_prod_cat: ''
  };

  message = '';

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private toastrService: ToastrService,
    private router: Router) { }

  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getProduct(this.route.snapshot.params["id"]);
    }
  }

  getProduct(id: string): void {
    this.productService.get(id)
      .subscribe({
        next: (data) => {
          this.currentProduct = data;
        },
        error: (e) => console.error(e)
      });
  }

  updatePublished(status: boolean): void {
    const data = {
      prod_nom: this.currentProduct.prod_nom,
      id_prod_typ: this.currentProduct.id_prod_typ,
      prod_desc: this.currentProduct.prod_desc,
      precio: this.currentProduct.precio,
      id_prod_cat: this.currentProduct.id_prod_cat
    };
    this.message = '';
    this.productService.update(this.currentProduct.slug, data)
      .subscribe({
        next: (res) => {
          this.message = res.message ? res.message : 'The status was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }

  updateProduct(): void {
    this.message = '';

    this.productService.update(this.currentProduct.slug, this.currentProduct)
      .subscribe({
        next: (res) => {
          this.toastrService.success("The "+ this.currentProduct.id_prod_typ +" "+ this.currentProduct.prod_nom + " was updated successfully!");
          this.message = res.message ? res.message : 'This product was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }

  deleteProduct(): void {
    this.productService.delete(this.currentProduct.slug)
      .subscribe({
        next: (res) => {
          this.toastrService.success("The "+ this.currentProduct.id_prod_typ +" "+ this.currentProduct.prod_nom + " was deleted successfully!");
          this.router.navigate(['/product']);
        },
        error: (e) => console.error(e)
      });
  }

}
