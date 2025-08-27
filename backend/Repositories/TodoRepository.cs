using Microsoft.EntityFrameworkCore;
using TodosDotNet.Data;
using TodosDotNet.Models;

namespace TodosDotNet.Repositories;

public class TodoRepository : ITodoRepository
{
    private readonly TodoContext _context;

    public TodoRepository(TodoContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<TodoItem>> GetAllAsync()
        => await _context.TodoItems.ToListAsync();

    public async Task<TodoItem?> GetByIdAsync(int id)
        => await _context.TodoItems.FindAsync(id);

    public async Task AddAsync(TodoItem todo)
    {
        _context.TodoItems.Add(todo);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateAsync(TodoItem todo)
    {
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(int id)
    {
        var todo = await _context.TodoItems.FindAsync(id);
        if (todo != null)
        {
            _context.TodoItems.Remove(todo);
            await _context.SaveChangesAsync();
        }
    }
}
