
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

    readonly addLineItem = this.updater<LineItem>((slice: Cart, lineItems: LineItem) => {
        console.info('lineItems', lineItems)
        return {
            lineItems: [...slice.lineItems, lineItems]
        } as Cart
    })

    readonly getCart = this.select<Cart>((slice: Cart) => slice)

    readonly getProductCount$ = this.select<number>((slice: Cart) => new Set(slice.lineItems.map((item: LineItem) => item.prodId)).size)

}
