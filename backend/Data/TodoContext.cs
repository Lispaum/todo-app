using Microsoft.EntityFrameworkCore;
using TodosDotNet.Models;

namespace TodosDotNet.Data;

public class TodoContext : DbContext
{
    public TodoContext(DbContextOptions<TodoContext> options) : base(options) { }

    public DbSet<TodoItem> TodoItems { get; set; }
}
