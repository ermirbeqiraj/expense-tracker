using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace BudgetTrack.Migrations
{
    public partial class IntroExpeseGroup : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ParentId",
                table: "ExpenseCategory");

            migrationBuilder.AddColumn<int>(
                name: "ExpenseGroupId",
                table: "ExpenseCategory",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "ExpenseGroup",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ExpenseGroup", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ExpenseCategory_ExpenseGroupId",
                table: "ExpenseCategory",
                column: "ExpenseGroupId");

            migrationBuilder.AddForeignKey(
                name: "FK_ExpenseCategory_ExpenseGroup_ExpenseGroupId",
                table: "ExpenseCategory",
                column: "ExpenseGroupId",
                principalTable: "ExpenseGroup",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ExpenseCategory_ExpenseGroup_ExpenseGroupId",
                table: "ExpenseCategory");

            migrationBuilder.DropTable(
                name: "ExpenseGroup");

            migrationBuilder.DropIndex(
                name: "IX_ExpenseCategory_ExpenseGroupId",
                table: "ExpenseCategory");

            migrationBuilder.DropColumn(
                name: "ExpenseGroupId",
                table: "ExpenseCategory");

            migrationBuilder.AddColumn<int>(
                name: "ParentId",
                table: "ExpenseCategory",
                nullable: true);
        }
    }
}
