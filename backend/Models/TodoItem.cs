namespace TodosDotNet.Models;

public class TodoItem
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;

    public TodoStatus Status { get; set; } = TodoStatus.Pending;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? UpdatedAt { get; set; }
}

public enum TodoStatus
{
    Pending,
    InProgress,
    Completed
}
