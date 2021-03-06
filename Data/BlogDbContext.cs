using FrankBlog.Models;
using Microsoft.EntityFrameworkCore;

namespace FrankBlog.Data
{
    public class BlogDbContext : DbContext
    {
        public BlogDbContext (DbContextOptions<BlogDbContext> options) : base(options)
        {
        }

        // this will be used as table name
        public DbSet<BlogModel> Blogs { get; set; }
    }
}
