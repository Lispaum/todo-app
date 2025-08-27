using TodosDotNet.Models;

namespace TodosDotNet.Repositories;

public interface ITodoRepository
{
    Task<IEnumerable<TodoItem>> GetAllAsync();
    Task<TodoItem?> GetByIdAsync(int id);
    Task AddAsync(TodoItem todo);
    Task UpdateAsync(TodoItem todo);
    Task DeleteAsync(int id);
}
