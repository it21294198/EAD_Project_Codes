package com.example.ecommerce.manager

import com.example.ecommerce.Model.ItemModel

class CartManager {
    //private val cartItems: ArrayList<ItemModel> = ArrayList()
    val cartItems = arrayListOf(
        ItemModel(
            id = "1",
            name = "WiFi - Router",
            category = "electronics",
            detail = "This is a brand new WiFi Router with 5 years warranty",
            imageUrl = "https://res.cloudinary.com/dhzgmok7k/image/upload/v1713457717/resources/nobltiatthos5n60c4ll.jpg",
            vendorId = "002121",
            price = 5000.00,
            quantity = 2,
            tags = arrayOf("wifi", "router", "internet"),
            status = 0,
            createdAt = "2024-01-01T12:00:00Z",
            updatedAt = "2024-01-02T12:00:00Z"
        ),
        ItemModel(
            id = "2",
            name = "Headphone",
            category = "electronics",
            detail = "This is a brand new WiFi Router with 5 years warranty",
            imageUrl = "https://res.cloudinary.com/dhzgmok7k/image/upload/v1713456393/resources/71Hx8b6HGbL._AC_SL1500__lucseb.jpg",
            vendorId = "002121",
            price = 2000.00,
            quantity = 2,
            tags = arrayOf("wifi", "router", "internet"),
            status = 0,
            createdAt = "2024-01-01T12:00:00Z",
            updatedAt = "2024-01-02T12:00:00Z"
        )
    )
    fun addItem(item: ItemModel){
        val existingItem = cartItems.find{ it.id == item.id}
        if(existingItem != null){
            existingItem.quantity += item.quantity
        }else{
            cartItems.add(item)
        }
    }

    fun removeItem(item: ItemModel){
        cartItems.removeIf { it.id == item.id }
    }

    fun updateQuantity(productId: String, newQuantity: Int){
        val item = cartItems.find{ it.id == productId}
        item?.let{
            it.quantity = newQuantity
        }
    }

    fun getTotalPrice(): Double {
        return cartItems.sumOf { it.price * it.quantity }
    }

    fun fetchCartItems(): ArrayList<ItemModel>{
        return cartItems
    }
}