using System.ComponentModel.DataAnnotations;

namespace WebShop.DTOs
{
    public class RegisterDto
    {
        public required string UserName { get; set; }
        public required string Password { get; set; }
        public required string Email { get; set; }
    }
}
