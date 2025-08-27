using System.ComponentModel.DataAnnotations;
using TodosDotNet.Models;

namespace TodosDotNet.DTOs;

public class TodoItemCreateDto
{
    [Required(ErrorMessage = "Title is required")]
    public required string Title { get; set; }

    [Required(ErrorMessage = "Description is required")]
    public required string Description { get; set; }

    public TodoStatus Status { get; set; } = TodoStatus.Pending; // valor default
}