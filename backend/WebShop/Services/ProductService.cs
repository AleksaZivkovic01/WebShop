using WebShop.Models;

namespace WebShop.Services
{
    public class ProductService
    {
        public int GetProductsCount(List<Product> products)
        {
            return products.Count;
        }
    }
}
