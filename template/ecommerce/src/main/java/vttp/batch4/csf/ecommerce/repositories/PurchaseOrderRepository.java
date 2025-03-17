package vttp.batch4.csf.ecommerce.repositories;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import vttp.batch4.csf.ecommerce.models.LineItem;
import vttp.batch4.csf.ecommerce.models.Order;

@Repository
public class PurchaseOrderRepository {

  @Autowired
  private JdbcTemplate template;

  // IMPORTANT: DO NOT MODIFY THIS METHOD.
  // If this method is changed, any assessment task relying on this method will
  // not be marked
  // You may only add Exception to the method's signature
  public void create(Order order) {
    // TODO Task 3
    template.update(
        "INSERT INTO purchase_orders (order_id, date, name, address, priority, comments) VALUES (?,?,?,?,?,?)",
        order.getOrderId(), order.getDate(), order.getName(), order.getAddress(), order.isPriority(),
        order.getComments());
    saveLineItems(order.getOrderId(), order.getCart().getLineItems());
  }

  private void saveLineItems(String orderId, List<LineItem> lineItems) {
    for (LineItem li : lineItems) {
      template.update("INSERT INTO line_items (order_id, prod_id, quantity, name, price) VALUES (?, ?, ?, ?, ?)",
          orderId, li.getProductId(), li.getQuantity(), li.getName(), li.getPrice());
    }
  }
}
