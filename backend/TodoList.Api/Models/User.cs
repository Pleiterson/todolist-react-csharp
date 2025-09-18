using System.ComponentModel.DataAnnotations;

namespace TodoList.Api.Models {
	public class User
	{
		public int Id { get; set; }

		[Required, MinLength(3)]
		public string Username { get; set; } = string.Empty;

		[Required]
		public string PasswordHash { get; set; } = string.Empty;

		public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

		// Relacionamento: um usuário pode ter várias tarefas
		public ICollection<TaskItem>? Tasks { get; set; } = new List<TaskItem>();
	}
}
