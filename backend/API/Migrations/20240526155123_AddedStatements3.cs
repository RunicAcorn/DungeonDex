using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class AddedStatements3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Statement_Scene_DialogueId",
                table: "Statement");

            migrationBuilder.AlterColumn<int>(
                name: "DialogueId",
                table: "Statement",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Statement_Scene_DialogueId",
                table: "Statement",
                column: "DialogueId",
                principalTable: "Scene",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Statement_Scene_DialogueId",
                table: "Statement");

            migrationBuilder.AlterColumn<int>(
                name: "DialogueId",
                table: "Statement",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_Statement_Scene_DialogueId",
                table: "Statement",
                column: "DialogueId",
                principalTable: "Scene",
                principalColumn: "Id");
        }
    }
}
