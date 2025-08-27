using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace todos_dotnet.Migrations
{
    /// <inheritdoc />
    public partial class AddDescriptionAndStatus : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "IsComplete",
                table: "TodoItems",
                newName: "Status");

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAt",
                table: "TodoItems",
                type: "TEXT",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "TodoItems",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<DateTime>(
                name: "UpdatedAt",
                table: "TodoItems",
                type: "TEXT",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CreatedAt",
                table: "TodoItems");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "TodoItems");

            migrationBuilder.DropColumn(
                name: "UpdatedAt",
                table: "TodoItems");

            migrationBuilder.RenameColumn(
                name: "Status",
                table: "TodoItems",
                newName: "IsComplete");
        }
    }
}
