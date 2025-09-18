using System.ComponentModel.DataAnnotations;

namespace TodoList.Api.DTOs
{
    public class TaskCreateDto
    {
        [Required, MaxLength(100)]
        public string Title { get; set; } = string.Empty;

        public string Description { get; set; } = string.Empty;

        [MaxLength(50)]
        public string Category { get; set; } = string.Empty;
    }
}
