using Microsoft.EntityFrameworkCore.Migrations;

namespace BudgetTrack.Migrations
{
    public partial class ExpenseActiveProp : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Active",
                table: "Expenses",
                nullable: true,
                defaultValue: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Active",
                table: "Expenses");
        }
    }
}
