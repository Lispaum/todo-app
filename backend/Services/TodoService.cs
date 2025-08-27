using TodosDotNet.Models;
using TodosDotNet.Repositories;

namespace TodosDotNet.Services;

public class TodoService : ITodoService
{
    private readonly ITodoRepository _repository;

    public TodoService(ITodoRepository repository)
    {
        _repository = repository;
    }

    public async Task<IEnumerable<TodoItem>> GetAllAsync()
        => await _repository.GetAllAsync();

    public async Task<TodoItem?> GetByIdAsync(int id)
        => await _repository.GetByIdAsync(id);

    public async Task CreateAsync(TodoItem todo)
    {
        if (string.IsNullOrWhiteSpace(todo.Title))
            throw new ArgumentException("O título é obrigatório");

        await _repository.AddAsync(todo);
    }

    public async Task UpdateAsync(TodoItem todo)
        => await _repository.UpdateAsync(todo);

    public async Task DeleteAsync(int id)
        => await _repository.DeleteAsync(id);
}
