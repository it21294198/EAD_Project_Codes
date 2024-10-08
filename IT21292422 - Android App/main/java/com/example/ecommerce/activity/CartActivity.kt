package com.example.ecommerce.activity

import android.os.Bundle
import android.view.View
import android.widget.Toast
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import androidx.recyclerview.widget.LinearLayoutManager
import com.example.ecommerce.Adapter.CartAdapter
import com.example.ecommerce.Model.ItemModel
import com.example.ecommerce.R
import com.example.ecommerce.databinding.ActivityCartBinding
import com.example.ecommerce.manager.CartManager

class CartActivity : BaseActivity() {
    private lateinit var binding: ActivityCartBinding
    private lateinit var cartAdapter: CartAdapter
    private lateinit var cartManager: CartManager

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityCartBinding.inflate(layoutInflater)
        setContentView(binding.root)

        cartManager = CartManager()

        setVariable()
        initCartList()
        calculateCart()
        handleEmptyCartVisibility()
    }

    private fun initCartList(){
        val cartItems = cartManager.fetchCartItems()

        binding.viewCart.layoutManager=LinearLayoutManager(this, LinearLayoutManager.VERTICAL, false)

        cartAdapter = CartAdapter(cartItems, this,
            onQuantityChanged = { item->
                cartManager.updateQuantity(item.id, item.quantity)
                calculateCart()
                handleEmptyCartVisibility()
            },
            onItemRemoved = { item: ItemModel ->
                cartManager.removeItem(item)
                Toast.makeText(this, "${item.name} removed from cart", Toast.LENGTH_SHORT).show()
                calculateCart()
                handleEmptyCartVisibility()
            }
        )
        binding.viewCart.adapter = cartAdapter
    }

    private fun handleEmptyCartVisibility(){
        val cartItems = cartManager.fetchCartItems()
        with(binding){
            emptyText.visibility = if(cartItems.isEmpty()) View.VISIBLE else View.GONE
            cartScroll.visibility = if(cartItems.isEmpty()) View.GONE else View.VISIBLE
        }
    }

    private fun calculateCart(){
    val itemTotal = cartManager.getTotalPrice()
    val roundedTotal = String.format("%.2f", itemTotal)
        with(binding){
            totalText.text="Rs.$roundedTotal"
        }
    }

    private fun setVariable() {
        binding.backBtn.setOnClickListener{finish()}
    }
}