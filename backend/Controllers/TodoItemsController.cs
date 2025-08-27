using Microsoft.AspNetCore.Mvc;
using TodosDotNet.Models;
using TodosDotNet.Services;
using TodosDotNet.DTOs;

namespace TodosDotNet.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TodoItemsController : ControllerBase
{
    private readonly ITodoService _service;

    public TodoItemsController(ITodoService service)
    {
        _service = service;
    }


    [HttpPost]
    public async Task<IActionResult> Create([FromBody] TodoItemCreateDto dto)
    {
        var todo = new TodoItem
        {
            Title = dto.Title,
            Description = dto.Description,
            Status = TodoStatus.Pending
        };

        await _service.CreateAsync(todo);

        return CreatedAtAction(nameof(Get), new { id = todo.Id }, todo);
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
        => Ok(await _service.GetAllAsync());

    [HttpGet("{id}")]
    public async Task<IActionResult> Get(int id)
    {
        var todo = await _service.GetByIdAsync(id);
        if (todo == null) return NotFound();
        return Ok(todo);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] TodoItemUpdateDto dto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var existing = await _service.GetByIdAsync(id);
        if (existing == null) return NotFound();

        existing.Title = dto.Title;
        existing.Description = dto.Description;
        existing.Status = dto.Status;

        await _service.UpdateAsync(existing);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var existing = await _service.GetByIdAsync(id);
        if (existing == null) return NotFound();

        await _service.DeleteAsync(id);
        return NoContent();
    }
}
