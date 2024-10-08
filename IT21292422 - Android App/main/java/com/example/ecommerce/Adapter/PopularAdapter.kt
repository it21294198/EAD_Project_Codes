package com.example.ecommerce.Adapter

import android.content.Context
import android.content.Intent
import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import com.bumptech.glide.load.resource.bitmap.CenterCrop
import com.bumptech.glide.request.RequestOptions
import com.example.ecommerce.Model.ItemModel
import com.example.ecommerce.R
import com.example.ecommerce.activity.DetailActivity
import com.example.ecommerce.databinding.ViewholderRecommendedBinding

class PopularAdapter(val items: MutableList<ItemModel>) : RecyclerView.Adapter<PopularAdapter.ViewHolder>() {
    private var context: Context? = null
    class ViewHolder(val binding: ViewholderRecommendedBinding) :
            RecyclerView.ViewHolder(binding.root)

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): PopularAdapter.ViewHolder {
        context = parent.context
            val binding=ViewholderRecommendedBinding.inflate(LayoutInflater.from(context),parent,false)
            return ViewHolder(binding)
    }

    override fun getItemCount(): Int = items.size

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        holder.binding.tileText.text=items[position].name
        holder.binding.priceText.text="Rs."+items[position].price.toString()

        val imageUrl = items[position].imageUrl
        val requestOptions = RequestOptions().transform(CenterCrop())

        Glide.with(holder.itemView.context)
                .load(imageUrl[0])
                .apply(requestOptions)
                .into(holder.binding.pic)

        holder.itemView.setOnClickListener {
            val intent = Intent(holder.itemView.context, DetailActivity::class.java)
            intent.putExtra("object", items[position])
            holder.itemView.context.startActivity(intent)
        }

    }
}