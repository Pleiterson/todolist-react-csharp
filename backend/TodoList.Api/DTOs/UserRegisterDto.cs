using System.ComponentModel.DataAnnotations;

namespace TodoList.Api.DTOs
{
    public class UserRegisterDto
    {
        [Required]
        [MinLength(3, ErrorMessage = "O username deve ter no mínimo 3 caracteres.")]
        public string Username { get; set; } = string.Empty;

        [Required]
        [MinLength(6, ErrorMessage = "A senha deve ter no mínimo 6 caracteres.")]
        public string Password { get; set; } = string.Empty;
    }
}
