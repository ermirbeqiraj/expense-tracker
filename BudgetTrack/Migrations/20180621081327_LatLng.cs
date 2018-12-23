using Microsoft.EntityFrameworkCore.Migrations;

namespace BudgetTrack.Migrations
{
    public partial class LatLng : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<float>(
                name: "Latitude",
                table: "Expenses",
                nullable: true);

            migrationBuilder.AddColumn<float>(
                name: "Longitude",
                table: "Expenses",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Latitude",
                table: "Expenses");

            migrationBuilder.DropColumn(
                name: "Longitude",
                table: "Expenses");
        }
    }
}
