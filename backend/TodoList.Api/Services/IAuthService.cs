using TodoList.Api.DTOs;

namespace TodoList.Api.Services
{
    public interface IAuthService
    {
        Task<UserResponseDto> RegisterAsync(UserRegisterDto dto);
        Task<UserResponseDto> LoginAsync(UserLoginDto dto);
    }
}
