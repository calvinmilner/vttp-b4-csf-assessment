
// TODO Task 2

import { ComponentStore, OnStoreInit } from "@ngrx/component-store";
import { Cart, LineItem } from "./models";
import { Injectable } from "@angular/core";

const INIT: Cart = {
    lineItems: []
}
@Injectable({ providedIn: 'root' })
// Use the following class to implement your store
export class CartStore extends ComponentStore<Cart> {
    constructor() {
        super(INIT);
    }

    // Mutators
    readonly addLineItem = this.updater<LineItem>((slice: Cart, lineItems: LineItem) => {
        console.info('lineItems', lineItems)
        return {
            lineItems: [...slice.lineItems, lineItems]
        } as Cart
    })

    readonly resetCart = this.updater((slice: Cart) => {
        return { lineItems: [] } as Cart;
    })

    // Selectors
    readonly getCart = this.select<Cart>((slice: Cart) => {
        console.info('Cart state updated: ', slice)
        return slice})

    readonly getProductCount$ = this.select<number>((slice: Cart) => new Set(slice.lineItems.map((item: LineItem) => item.prodId)).size)

    readonly getTotalPrice$ = this.select<number>((slice : Cart) => slice.lineItems.reduce((sum, item) => sum + item.price * item.quantity, 0))

}
