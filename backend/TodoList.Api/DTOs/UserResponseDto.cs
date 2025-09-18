namespace TodoList.Api.DTOs
{
    public class UserResponseDto
    {
        public int Id { get; set; }

        public string Username { get; set; } = string.Empty;

        public string Token { get; set; } = string.Empty;
    }
}
