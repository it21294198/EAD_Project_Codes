package com.example.ecommerce.network

import com.example.ecommerce.Model.ItemModel
import com.example.ecommerce.Model.SliderModel
import retrofit2.http.GET
import retrofit2.Call
import retrofit2.Response

interface API {
    @GET("api/products")
    suspend fun getProducts(): Response<MutableList<ItemModel>>

    @GET("/api/carousels")
    suspend fun getBanners(): Response<MutableList<SliderModel>>
}