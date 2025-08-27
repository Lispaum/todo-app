using TodosDotNet.Models;

namespace TodosDotNet.Services;

public interface ITodoService
{
    Task<IEnumerable<TodoItem>> GetAllAsync();
    Task<TodoItem?> GetByIdAsync(int id);
    Task CreateAsync(TodoItem todo);
    Task UpdateAsync(TodoItem todo);
    Task DeleteAsync(int id);
}
