using System.ComponentModel.DataAnnotations;

namespace TodoList.Api.DTOs
{
    public class UserLoginDto
    {
        [Required]
        public string Username { get; set; } = string.Empty;

        [Required]
        public string Password { get; set; } = string.Empty;
    }
}
