package vttp.batch4.csf.ecommerce.controllers;


import java.io.StringReader;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import jakarta.json.Json;
import jakarta.json.JsonArray;
import jakarta.json.JsonObject;
import jakarta.json.JsonReader;
import vttp.batch4.csf.ecommerce.models.Cart;
import vttp.batch4.csf.ecommerce.models.LineItem;
import vttp.batch4.csf.ecommerce.models.Order;
import vttp.batch4.csf.ecommerce.services.PurchaseOrderService;

@Controller
public class OrderController {

  @Autowired
  private PurchaseOrderService poSvc;

  // IMPORTANT: DO NOT MODIFY THIS METHOD.
  // If this method is changed, any assessment task relying on this method will
  // not be marked
  @PostMapping(path = "/api/order", consumes = MediaType.APPLICATION_JSON_VALUE)
  @ResponseBody
  public ResponseEntity<String> postOrder(@RequestBody String payload) {

    // TODO Task 3
    System.out.println(payload);
    JsonReader reader = Json.createReader(new StringReader(payload));
    JsonObject j = reader.readObject();
    Order order = new Order();
    order.setName(j.getString("name"));
    order.setAddress(j.getString("address"));
    order.setPriority(j.getBoolean("priority"));
    order.setComments(j.getString("comments"));
    JsonArray jArr = j.getJsonObject("cart").getJsonArray("lineItems");

    List<LineItem> lineItems = new ArrayList<>();
    for(int i = 0; i < jArr.size(); i++) {
      LineItem li = new LineItem();
      JsonObject jObj = jArr.getJsonObject(i);
      li.setProductId(jObj.getString("prodId"));
      li.setQuantity(jObj.getInt("quantity"));
      li.setName(jObj.getString("name"));
      li.setPrice((float) jObj.getJsonNumber("price").doubleValue());
      lineItems.add(li);
    }

    Cart cart = new Cart();
    cart.setLineItems(lineItems);
    order.setCart(cart);
    try{
    poSvc.createNewPurchaseOrder(order);
    JsonObject msg = Json.createObjectBuilder().add("orderId", order.getOrderId()).build();
    return ResponseEntity.ok(msg.toString());
    } catch (Exception ex) {
      JsonObject msg = Json.createObjectBuilder().add("message", ex.getMessage()).build();
      return ResponseEntity.status(400).body(msg.toString());
    }
  }
}
