using Microsoft.EntityFrameworkCore;
using TodoList.Api.Models;

namespace TodoList.Api.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<User> Users => Set<User>();
        public DbSet<TaskItem> Tasks => Set<TaskItem>();

        protected override void OnModelCreating(ModelBuilder modelBuilder) {
            base.OnModelCreating(modelBuilder);

            // Relacionamento User -> TaskItem (1:N)
            modelBuilder.Entity<User>()
                .HasMany(u => u.Tasks)
                .WithOne(u => u.User!)
                .HasForeignKey(t => t.UserId);
        }
    }
}
