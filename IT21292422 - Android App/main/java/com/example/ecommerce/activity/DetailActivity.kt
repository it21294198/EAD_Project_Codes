package com.example.ecommerce.activity

import android.content.Intent
import android.os.Bundle
import android.view.View
import android.widget.Toast
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import androidx.recyclerview.widget.RecyclerView
import com.example.ecommerce.Adapter.SliderAdapter
import com.example.ecommerce.Model.ItemModel
import com.example.ecommerce.Model.SliderModel
import com.example.ecommerce.R
import com.example.ecommerce.databinding.ActivityDetailBinding
import com.example.ecommerce.manager.CartManager

class DetailActivity : BaseActivity() {
    private lateinit var binding: ActivityDetailBinding
    private lateinit var item: ItemModel
    private lateinit var cartManager: CartManager

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityDetailBinding.inflate(layoutInflater)
        setContentView(binding.root)
        getDetails()
        banners()
    }

    private fun banners(){
        val sliderItems = ArrayList<SliderModel>()
        for(imageUrl in item.imageUrl){
            sliderItems.add(SliderModel(imageUrl.toString()))
        }
        binding.slider.adapter=SliderAdapter(sliderItems,binding.slider)
        binding.slider.clipToPadding=true
        binding.slider.clipChildren=true
        binding.slider.offscreenPageLimit=1

        if(sliderItems.size>1){
            binding.dotsIndicator.visibility = View.VISIBLE
            binding.dotsIndicator.attachTo(binding.slider)
        }
    }

    private fun getDetails(){
        val items = intent.getSerializableExtra("item") as? ItemModel
        if(items != null){
            binding.titleText.text = items.name
            binding.priceTxt.text = "Rs. ${items.price}"
            binding.descriptionText.text = items.detail
        }
        binding.backBtn.setOnClickListener{finish()}

        binding.cartBtn.setOnClickListener {
        cartManager = CartManager()
        cartManager.addItem(items!!)
        Toast.makeText(this, "${items.name} added to cart", Toast.LENGTH_SHORT).show()
        startActivity(Intent(this@DetailActivity, CartActivity::class.java))
        }
    }
}