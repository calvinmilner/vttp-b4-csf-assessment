import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {Router} from '@angular/router';
import { CartStore } from './cart.store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy {

  // NOTE: you are free to modify this component

  private router = inject(Router)
  protected cartStore = inject(CartStore)
  itemCount!: number
  private sub!: Subscription

  ngOnInit(): void {
    this.sub = this.cartStore.getProductCount$.subscribe((count: number) => {this.itemCount = count})
  }

  checkout(): void {
    // this.sub = this.cartStore.getProductCount$.subscribe((count: number) => {this.itemCount = count})
    if(this.itemCount == 0) {
      return alert('Cart is empty')
    }
    this.router.navigate([ '/checkout' ])
  }

  ngOnDestroy(): void {
      this.sub.unsubscribe()
  }
}
