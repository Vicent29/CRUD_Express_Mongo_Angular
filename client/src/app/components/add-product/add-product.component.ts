import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';
import { ToastrService } from 'ngx-toastr';
import { AbstractControl, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  form: FormGroup = new FormGroup({
    prod_nom: new FormControl(''),
    id_prod_typ: new FormControl(''),
    prod_desc: new FormControl(''),
    precio: new FormControl(''),
    id_prod_cat: new FormControl(''),
  });
  firstSubmit: Boolean = true;

  constructor(
    private productService: ProductService,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,
    private router: Router,
    ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        prod_nom: ['', [Validators.required, Validators.minLength(4)]],
        id_prod_typ: ['', [Validators.required, Validators.minLength(4)]],
        prod_desc: ['', [Validators.required, Validators.minLength(4)]],
        precio: ['', [Validators.required, Validators.pattern("^[0-9]*$"),Validators.minLength(1)]],
        id_prod_cat: ['', [Validators.required, Validators.minLength(4)]],
      },
    );
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  addProduct(): void {
    console.log(this.form.controls);
    this.firstSubmit = false;
    if (this.form.valid) {
      this.productService.create(this.form.value)
        .subscribe({
          next: (res) => {
            this.toastrService.success("This product has been aded");
            this.router.navigate(['/product']);
          },
          error: (e) => this.toastrService.error("Can't add this product")
        });
    }
  }
}
