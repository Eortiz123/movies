using Microsoft.EntityFrameworkCore;
using Test_Aplications.Models;

namespace Test_Aplications.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
        public DbSet<Movie> Movies{ get; set; }
    }
}
