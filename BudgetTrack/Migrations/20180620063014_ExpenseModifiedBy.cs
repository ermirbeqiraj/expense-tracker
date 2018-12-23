using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace BudgetTrack.Migrations
{
    public partial class ExpenseModifiedBy : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ModifiedBy",
                table: "Expenses",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "ModifiedDate",
                table: "Expenses",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ModifiedBy",
                table: "Expenses");

            migrationBuilder.DropColumn(
                name: "ModifiedDate",
                table: "Expenses");
        }
    }
}
