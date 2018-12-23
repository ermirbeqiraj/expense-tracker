using Microsoft.EntityFrameworkCore.Migrations;

namespace BudgetTrack.Migrations
{
    public partial class ExpenseDecimalType : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<decimal>(
                name: "Ammount",
                table: "Expenses",
                type: "DECIMAL(16,2)",
                nullable: false,
                oldClrType: typeof(decimal));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<decimal>(
                name: "Ammount",
                table: "Expenses",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "DECIMAL(16,2)");
        }
    }
}
