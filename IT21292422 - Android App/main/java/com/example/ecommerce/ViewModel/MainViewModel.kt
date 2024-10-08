import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.ecommerce.Model.BrandModel
import com.example.ecommerce.Model.ItemModel
import com.example.ecommerce.Model.SliderModel
import com.example.ecommerce.network.RetrofitInstance
import kotlinx.coroutines.launch

class MainViewModel : ViewModel() {
    private val _banners = MutableLiveData<MutableList<SliderModel>>()
    private val _brands = MutableLiveData<MutableList<BrandModel>>()
    private val _products = MutableLiveData<MutableList<ItemModel>>()
    private val _error = MutableLiveData<String>()

    val banners: LiveData<MutableList<SliderModel>> = _banners
    val brands: LiveData<MutableList<BrandModel>> = _brands
    val products: LiveData<MutableList<ItemModel>> = _products
    val error: LiveData<String> = _error

    fun getBanners() {
        viewModelScope.launch {
            try {
                val response = RetrofitInstance.api.getBanners()
                if (response.isSuccessful) {
                    _banners.value = response.body()
                } else {
                    _error.value = "Error: ${response.code()}"
                }
            } catch (e: Exception) {
                _error.value = "Error: ${e.message}"
            }
        }
    }

    fun getProducts() {
        viewModelScope.launch {
            try {
                val response = RetrofitInstance.api.getProducts()
                if (response.isSuccessful) {
                    _products.value = response.body()
                } else {
                    _error.value = "Error: ${response.code()}"
                }
            } catch (e: Exception) {
                _error.value = "Error: ${e.message}"
            }
        }
    }
}