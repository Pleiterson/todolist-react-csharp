using System.ComponentModel.DataAnnotations;

namespace TodoList.Api.Models
{
    public class TaskItem
    {
        public int Id { get; set; }

        [Required, MaxLength(100)]
        public string Title { get; set; } = string.Empty;

        public string Description { get; set; } = string.Empty;

        public bool IsCompleted { get; set; } = false;

        [MaxLength(50)]
        public string Category { get; set; } = string.Empty;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        // Relacionamento: cada tarefa pertence a um usuário
        public int UserId { get; set; }

        public User? User { get; set; }
    }
}
