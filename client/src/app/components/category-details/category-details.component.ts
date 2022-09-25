import { Component, Input, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/models/category.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.css']
})
export class CategoryDetailsComponent implements OnInit {

  @Input() viewMode = false;

  @Input() currentCategory: Category = {
    id_cat: '',
    cat_name: ''
  };

  message = '';

  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private toastrService: ToastrService,
    private router: Router) { }

  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getCategory(this.route.snapshot.params["id"]);
    }
  }

  getCategory(id: string): void {
    this.categoryService.get(id)
      .subscribe({
        next: (data) => {
          this.currentCategory = data;
        },
        error: (e) => console.error(e)
      });
  }

  updatePublished(status: boolean): void {
    const data = {
      id_cat: this.currentCategory.id_cat,
      cat_name: this.currentCategory.cat_name
    };
    this.message = '';
    this.categoryService.update(this.currentCategory.slug, data)
      .subscribe({
        next: (res) => {
          this.message = res.message ? res.message : 'The status was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }

  updateCategory(): void {
    this.message = '';

    this.categoryService.update(this.currentCategory.slug, this.currentCategory)
      .subscribe({
        next: (res) => {
          this.toastrService.success("The "+ this.currentCategory.cat_name +" was updated successfully!");
          this.message = res.message ? res.message : 'This category was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }

  deleteCategory(): void {
    this.categoryService.delete(this.currentCategory.slug)
      .subscribe({
        next: (res) => {
          this.toastrService.success("The "+ this.currentCategory.cat_name +" was deleted successfully!");
          this.router.navigate(['/category']);
        },
        error: (e) => console.error(e)
      });
  }

}
