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
    public class OrderController : ControllerBase
    {
        private readonly ShopDbContext dbContext;
        public OrderController(ShopDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet]
        public async Task<IActionResult> GetOrders()
        {
            var orders = await dbContext.Orders.ToListAsync();
            return Ok(orders);
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> GetOrderById(int id)
        {
            var order = await dbContext.Orders.FindAsync(id);
            if (order == null)
            {
                return NotFound();
            }
            return Ok(order);
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> CreateOrder(CreateOrderDto createOrderDto)
        {
            var order = new Order();
            foreach (var item in createOrderDto.Items)
            {
                var product = await dbContext.Products.FindAsync(item.ProductId);
                if(product is null)
                {
                    return NotFound();
                }
                if (product.Quantity < item.Quantity)
                {
                    return BadRequest(
                        $"Not enough stock for {product.Name}"
                    );
                }

                var orderItem = new OrderItem
                {
                    ProductId = product.Id,
                    Quantity = item.Quantity,
                    Price = product.Price
                };
                order.OrderItems.Add(orderItem);
                order.TotalPrice += product.Price * item.Quantity;
                product.Quantity -= item.Quantity;
            }
            dbContext.Orders.Add(order);
            await dbContext.SaveChangesAsync();
            return Ok(order);
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> DeleteOrder(int id)
        {
            var order = await dbContext.Orders
                .Include(p=> p.OrderItems)
                .FirstOrDefaultAsync(p => p.Id == id);

            if (order == null)
            {
                return NotFound();
            }

            dbContext.Orders.Remove(order);
            await dbContext.SaveChangesAsync();
            return Ok(order);
        }


    }
 }
