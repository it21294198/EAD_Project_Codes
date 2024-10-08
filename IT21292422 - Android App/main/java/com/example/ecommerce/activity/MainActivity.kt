package com.example.ecommerce.activity

import MainViewModel
import android.content.Intent
import android.os.Bundle
import android.view.View
import androidx.lifecycle.Observer
import androidx.recyclerview.widget.GridLayoutManager
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import androidx.viewpager2.widget.CompositePageTransformer
import androidx.viewpager2.widget.MarginPageTransformer
import com.example.ecommerce.Adapter.BrandAdapter
import com.example.ecommerce.Adapter.PopularAdapter
import com.example.ecommerce.Model.SliderModel
import com.example.ecommerce.Adapter.SliderAdapter
import com.example.ecommerce.databinding.ActivityMainBinding

class MainActivity : BaseActivity() {
    private val viewModel=MainViewModel()
    private lateinit var binding: ActivityMainBinding
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding=ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)
        initBanner()
       // initBrand()
        initPopular()
        initBottomMenu()
    }

    private fun initBottomMenu() {
        binding.cartBtn.setOnClickListener {
            startActivity(Intent(this@MainActivity, CartActivity::class.java))
        }
    }

    private fun initBanner(){
        binding.progressBarBanner.visibility = View.VISIBLE
            viewModel.banners.observe(this, Observer { items ->
                banners(items)
                binding.progressBarBanner.visibility=View.GONE
            })
        viewModel.getBanners()
    }
    private fun banners(images: List<SliderModel>){
        binding.viewPagerSlider.adapter= SliderAdapter(images, binding.viewPagerSlider)
        binding.viewPagerSlider.clipToPadding=false
        binding.viewPagerSlider.clipChildren=false
        binding.viewPagerSlider.offscreenPageLimit=3
        binding.viewPagerSlider.getChildAt(0).overScrollMode=RecyclerView.OVER_SCROLL_NEVER
        val compositePageTransformer = CompositePageTransformer().apply{
            addTransformer(MarginPageTransformer(40))
        }
        binding.viewPagerSlider.setPageTransformer(compositePageTransformer)
        if(images.size>1){
            binding.dotsIndicator.visibility = View.VISIBLE
            binding.dotsIndicator.attachTo(binding.viewPagerSlider)
        }
    }

//    private fun initBrand(){
//        binding.progressBarBrand.visibility = View.VISIBLE
//        viewModel.brands.observe(this, Observer {
//            binding.viewBrand.layoutManager =
//                LinearLayoutManager(this@MainActivity,LinearLayoutManager.HORIZONTAL,false)
//            binding.viewBrand.adapter = BrandAdapter(it)
//            binding.progressBarBrand.visibility = View.GONE
//        })
//       // viewModel.getBrand()
//    }

    private fun initPopular(){
        binding.progressBarPopular.visibility = View.VISIBLE
        viewModel.products.observe(this, Observer {
            binding.viewPopular.layoutManager = GridLayoutManager(this@MainActivity,2)
            binding.viewPopular.adapter = PopularAdapter(it!!)
            binding.progressBarPopular.visibility = View.GONE
        })
       viewModel.getProducts()
    }
}