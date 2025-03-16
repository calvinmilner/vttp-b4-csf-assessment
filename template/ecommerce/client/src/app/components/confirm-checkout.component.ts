import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../product.service';
import { Order } from '../models';
import { CartStore } from '../cart.store';

@Component({
  selector: 'app-confirm-checkout',
  templateUrl: './confirm-checkout.component.html',
  styleUrl: './confirm-checkout.component.css'
})
export class ConfirmCheckoutComponent implements OnInit{

  // TODO Task 3
private fb = inject(FormBuilder)
protected form!: FormGroup
private cartStore = inject(CartStore)
private productService = inject(ProductService)

ngOnInit(): void {
    this.form = this.createForm()
    this.cartStore.getCart
}

createForm() : FormGroup {
  return this.fb.group({
    name: this.fb.control<string>('', [Validators.required]),
    address: this.fb.control<string>('', [Validators.required, Validators.minLength(3)]),
    priority: this.fb.control<boolean>(false),
    comments: this.fb.control<string>('')
  })
}

placeOrder(order: Order): void {
  this.productService.checkout(order)
}
}
