import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  category: Category = {
    id_cat: '',
    cat_name: ''
  };
  submitted = false;

  constructor(
    private categoryService: CategoryService,
    private toastrService: ToastrService
    ) { }

  ngOnInit(): void {
  }

  saveCategory(): void {
    const data = {
      id_cat: this.category.id_cat,
      cat_name: this.category.cat_name
    };

    this.categoryService.create(data)
      .subscribe({
        next: (res) => {
          this.toastrService.success('Added successfully!','The category '+ data.cat_name + ' added successfully!');
          this.submitted = true;
        },
        error: (e) => console.error(e)
      });
  }

  newCategory(): void {
    this.submitted = false;
    this.category = {
      id_cat: '',
      cat_name: ''
    };
  }

}
