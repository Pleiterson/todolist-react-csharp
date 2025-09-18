using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using TodoList.Api.DTOs;
using TodoList.Api.Services;

namespace TodoList.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class TasksController : ControllerBase
    {
        private readonly ITaskService _taskService;

        public TasksController(ITaskService taskService)
        {
            _taskService = taskService;
        }

        // GET /api/tasks?category=Work
        [HttpGet]
        public async Task<IActionResult> GetTasks([FromQuery] string? category)
        {
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
            var tasks = await _taskService.GetTasksAsync(userId, category);

            return Ok(tasks);
        }

        // GET /api/tasks/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetTask(int id)
        {
            var task = await _taskService.GetTaskByIdAsync(id);

            return task == null ? NotFound() : Ok(task);
        }

        // POST /api/tasks
        [HttpPost]
        public async Task<IActionResult> CreateTask(TaskCreateDto dto)
        {
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
            var task = await _taskService.CreateTaskAsync(dto, userId);

            return CreatedAtAction(nameof(GetTask), new { id = task.Id }, task);
        }

        // PUT /api/tasks/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTask(int id, TaskUpdateDto dto)
        {
            var task = await _taskService.UpdateTaskAsync(id, dto);

            return task == null ? NotFound() : Ok(task);
        }

        // DELETE /api/tasks/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTask(int id)
        {
            var deleted = await _taskService.DeleteTaskAsync(id);

            return deleted ? NoContent() : NotFound();
        }
    }
}
