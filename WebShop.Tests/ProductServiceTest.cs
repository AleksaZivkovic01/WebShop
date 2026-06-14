using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebShop.Models;
using WebShop.Services;

namespace WebShop.Tests
{
    public class ProductServiceTest
    {
        [Fact]
        public void GetProductsCount_ReturnsCorrectCount()
        {
            // Arrange
            var service = new ProductService();

            var products = new List<Product>
            {
                new Product { Name = "Product 1", Price = 10, Quantity = 1, CategoryId = 1 },
                new Product { Name = "Product 2", Price = 20, Quantity = 2, CategoryId = 1 },
                new Product { Name = "Product 3", Price = 30, Quantity = 3, CategoryId = 1 }
            };

            // Act
            var result = service.GetProductsCount(products);

            // Assert
            Assert.Equal(3, result);
        }
    }
}
