using Microsoft.EntityFrameworkCore;
using TodoList.Api.Data;
using TodoList.Api.DTOs;
using TodoList.Api.Models;

namespace TodoList.Api.Services
{
    public class TaskService : ITaskService
    {
        private readonly AppDbContext _context;

        public TaskService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<TaskResponseDto> CreateTaskAsync(TaskCreateDto dto, int userId)
        {
            var task = new TaskItem
            {
                Title = dto.Title,
                Description = dto.Description,
                Category = dto.Category,
                UserId = userId,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            _context.Tasks.Add(task);
            await _context.SaveChangesAsync();

            return MapToDto(task);
        }

        public async Task<IEnumerable<TaskResponseDto>> GetTasksAsync(int? userId = null, string? category = null)
        {
            var query = _context.Tasks.AsQueryable();

            if (userId.HasValue)
                query = query.Where(t => t.UserId == userId.Value);

            if (!string.IsNullOrEmpty(category))
                query = query.Where(t => t.Category == category);

            var tasks = await query.ToListAsync();

            return tasks.Select(MapToDto);
        }

        public async Task<TaskResponseDto?> GetTaskByIdAsync(int id)
        {
            var task = await _context.Tasks.FindAsync(id);

            return task == null ? null : MapToDto(task);
        }

        public async Task<TaskResponseDto?> UpdateTaskAsync(int id, TaskUpdateDto dto)
        {
            var task = await _context.Tasks.FindAsync(id);

            if (task == null) return null;

            task.Title = dto.Title;
            task.Description = dto.Description;
            task.IsCompleted = dto.IsCompleted;
            task.Category = dto.Category;
            task.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            return MapToDto(task);
        }

        public async Task<bool> DeleteTaskAsync(int id)
        {
            var task = await _context.Tasks.FindAsync(id);

            if (task == null) return false;

            _context.Tasks.Remove(task);
            await _context.SaveChangesAsync();

            return true;
        }

        private TaskResponseDto MapToDto(TaskItem task) => new TaskResponseDto
        {
            Id = task.Id,
            Title = task.Title,
            Description = task.Description,
            IsCompleted = task.IsCompleted,
            Category = task.Category,
            UserId = task.UserId,
            CreatedAt = task.CreatedAt,
            UpdatedAt = task.UpdatedAt
        };
    }
}
