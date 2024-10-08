package com.example.ecommerce.Model

import java.io.Serializable

data class ItemModel(
    var id: String,
    var name: String,
    var category: String,
    var vendorId: String,
    var status: Int,
    var price: Double,
    var quantity: Int,
    var imageUrl: String,
    var detail: String,
    var tags: Array<String>,
    var createdAt: String,
    var updatedAt: String
): Serializable
