import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../product.service';
import { Cart, LineItem, Order } from '../models';
import { CartStore } from '../cart.store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirm-checkout',
  templateUrl: './confirm-checkout.component.html',
  styleUrl: './confirm-checkout.component.css'
})
export class ConfirmCheckoutComponent implements OnInit {

  // TODO Task 3
  private fb = inject(FormBuilder)
  protected form!: FormGroup
  private cartStore = inject(CartStore)
  private productService = inject(ProductService)
  protected cart$ = this.cartStore.getCart
  protected totalPrice$ = this.cartStore.getTotalPrice$
  private order!: Order
  private router = inject(Router)

  ngOnInit(): void {
    this.form = this.createForm()
  }

  createForm(): FormGroup {
    return this.fb.group({
      name: this.fb.control<string>('', [Validators.required]),
      address: this.fb.control<string>('', [Validators.required, Validators.minLength(3)]),
      priority: this.fb.control<boolean>(false),
      comments: this.fb.control<string>('')
    })
  }

  placeOrder(): void {
    this.order = this.form.value
    this.cart$.subscribe(cart => this.order.cart = cart)
    console.info('order: ', this.order)
    this.productService.checkout(this.order).subscribe({
      next: (response: string) => {
        console.info('Order response: ', response);
        alert(JSON.stringify(response));
        this.cartStore.resetCart()
        this.router.navigate(['/'])
      },
      error: err => { alert(JSON.stringify(err.error)); }
    })
  }
}
