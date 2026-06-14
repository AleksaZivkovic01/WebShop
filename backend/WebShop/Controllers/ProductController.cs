using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebShop.Data;
using WebShop.DTOs;
using WebShop.Models;

namespace WebShop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly ShopDbContext dbContext;
        public ProductController(ShopDbContext dbContext)   
        {
            this.dbContext = dbContext;
        }

        [HttpGet]
        public async Task<IActionResult> GetProducts()
        {
            var products = await dbContext.Products.ToListAsync();

            return Ok(products);
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> GetProductById(int id)
        {
            var product = await dbContext.Products.FindAsync(id);
            if (product == null)
            {
                return NotFound();
            }
            return Ok(product);
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<IActionResult> CreateProduct(CreateProductDto createProductDto)
        {
            var product = new Product
            {
                Name = createProductDto.Name,
                Price = createProductDto.Price,
                Quantity = createProductDto.Quantity,
                ImageUrl = createProductDto.ImageUrl,
                CategoryId = createProductDto.CategoryId
            };
            dbContext.Products.Add(product);
            await dbContext.SaveChangesAsync();
            return Ok(product);
        }

        [Authorize(Roles = "Admin")]
        [HttpPut]
        [Route("{id}")]
        public async Task<IActionResult> UpdateProduct(int id, UpdateProductDto updateProductDtocs)
        {
            var product = await dbContext.Products.FindAsync(id);
            if (product == null)
            {
                return NotFound();
            }
            product.Name = updateProductDtocs.Name;
            product.Price = updateProductDtocs.Price;
            product.Quantity = updateProductDtocs.Quantity;
            product.ImageUrl = updateProductDtocs.ImageUrl;
            product.CategoryId = updateProductDtocs.CategoryId;

            await dbContext.SaveChangesAsync();
            return Ok(product);
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var product = await dbContext.Products.FindAsync(id);
            if (product == null)
            {
                return NotFound();
            }
            dbContext.Products.Remove(product);
            await dbContext.SaveChangesAsync();
            return Ok();
        }
    }
}
