namespace WebShop.DTOs
{
    public class UpdateProductDto
    {
        public required string Name { get; set; }
        public decimal Price { get; set; }
        public int Quantity { get; set; }
        public string? ImageUrl { get; set; }
        public int CategoryId { get; set; }
    }
}
