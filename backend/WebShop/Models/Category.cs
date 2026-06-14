using System.Text.Json.Serialization;

namespace WebShop.Models
{
    public class Category
    {
        public int Id { get; set; }
        public required string Name { get; set; }

        [JsonIgnore]
        public List<Product> Products { get; set; } = [];

    }
}
