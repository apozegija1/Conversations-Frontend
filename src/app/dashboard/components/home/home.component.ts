import { Component, OnInit } from '@angular/core';

@Component({
    templateUrl: 'home.component.html',
    styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {


    constructor() {
    }

    ngOnInit() {
    }
}

/*selectPaymentType(type: PaymentTypeModel) {
  this.selectedPaymentType = type;
  this.orderService.notifyPaymentTypeChanged(type);
  const user = this.authService.getCurrentUser();
  const order = {
    employeeId: user.userId,
    paymentTypeId: this.selectedPaymentType.id,
    date: new Date().toLocaleDateString(),
    status: 'Active',
    orderType: 'new'
  };

  this.orderApiService.create(order).subscribe((createdOrder: OrderModel) => {

    const products = this.productService.getProductsSelected();
    const productOrderRequests: Observable<any>[] = products.map((product) => {
      return this.productOrderApiService.create({
        productId: product.product.id,
        quantity: product.quantity,
        orderId: createdOrder.id
      });
    });

    forkJoin(productOrderRequests).subscribe(results => {
      this.orderService.notifyOrderCreated(createdOrder);
    });
  });
}*/
