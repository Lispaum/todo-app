using Microsoft.EntityFrameworkCore;
using TodosDotNet.Data;
using TodosDotNet.Repositories;
using TodosDotNet.Services;
using System.Text.Json.Serialization;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Adiciona CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:5173") // endereço do frontend
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// Controllers + Enum como string
builder.Services.AddControllers()
.AddJsonOptions(options =>
    {
       options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
    });;

// Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "Todo API", Version = "v1" });
});

// Repository & Service
builder.Services.AddScoped<ITodoRepository, TodoRepository>();
builder.Services.AddScoped<ITodoService, TodoService>();
builder.Services.AddScoped<ITodoRepository, TodoRepository>();
builder.Services.AddScoped<ITodoService, TodoService>();

// DbContext SQLite
builder.Services.AddDbContext<TodoContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

var app = builder.Build();
app.UseCors("AllowFrontend");

// Swagger no desenvolvimento
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
        {
            c.SwaggerEndpoint("/swagger/v1/swagger.json", "Todo API v1");
        });
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();
