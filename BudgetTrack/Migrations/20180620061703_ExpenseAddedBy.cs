using Microsoft.EntityFrameworkCore.Migrations;

namespace BudgetTrack.Migrations
{
    public partial class ExpenseAddedBy : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "AddedBy",
                table: "Expenses",
                maxLength: 50,
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AddedBy",
                table: "Expenses");
        }
    }
}
