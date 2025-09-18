using TodoList.Api.DTOs;

namespace TodoList.Api.Services
{
    public interface ITaskService
    {
        Task<TaskResponseDto> CreateTaskAsync(TaskCreateDto dto, int userId);
        Task<IEnumerable<TaskResponseDto>> GetTasksAsync(int? userId = null, string? category = null);
        Task<TaskResponseDto?> GetTaskByIdAsync(int id);
        Task<TaskResponseDto?> UpdateTaskAsync(int id, TaskUpdateDto dto);
        Task<bool> DeleteTaskAsync(int id);
    }
}
