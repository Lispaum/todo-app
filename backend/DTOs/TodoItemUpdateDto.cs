using System.ComponentModel.DataAnnotations;
using TodosDotNet.Models;

namespace TodosDotNet.DTOs;

public class TodoItemUpdateDto
{
    [Required(ErrorMessage = "Title is required")]
    public required string Title { get; set; }

    [Required(ErrorMessage = "Description is required")]
    public required string Description { get; set; }

    [Required(ErrorMessage = "Status is required")]
    public required TodoStatus Status { get; set; }
}
