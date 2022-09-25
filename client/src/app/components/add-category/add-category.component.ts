import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';
import { ToastrService } from 'ngx-toastr';
import { AbstractControl, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  form: FormGroup = new FormGroup({
    id_cat: new FormControl(''),
    cat_name: new FormControl('')
  });
  firstSubmit: Boolean = true;

  constructor(
    private categoryService: CategoryService,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        id_cat: ['', [Validators.required, Validators.minLength(4)]],
        cat_name: ['', [Validators.required, Validators.minLength(4)]]
      },
    );
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  addCategory(): void {
    console.log(this.form.controls);
    this.firstSubmit = false;
    // this.firstSubmit = false;
    if (this.form.valid) {
      this.categoryService.create(this.form.value)
        .subscribe({
          next: (res) => {
            this.toastrService.success("This category has been aded");
            this.router.navigate(['/category']);
          },
          error: (e) => this.toastrService.error("Can't add this category")
        });
    }
  }

}
