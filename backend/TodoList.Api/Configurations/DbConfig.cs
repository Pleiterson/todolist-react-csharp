using Microsoft.EntityFrameworkCore;
using TodoList.Api.Data;

namespace TodoList.Api.Configurations
{
    public static class DbConfig
    {
        public static IServiceCollection AddDatabaseConfiguration(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<AppDbContext>(options =>
                options.UseNpgsql(configuration.GetConnectionString("DefaultConnection")));

            return services;
        }
    }
}
