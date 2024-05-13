using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class addedCombatLog : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "combatLog",
                table: "Scene",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "CombatId",
                table: "Player",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "CombatId",
                table: "Monster",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Statement",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Speaker = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Text = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DialogueId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Statement", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Statement_Scene_DialogueId",
                        column: x => x.DialogueId,
                        principalTable: "Scene",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Player_CombatId",
                table: "Player",
                column: "CombatId");

            migrationBuilder.CreateIndex(
                name: "IX_Monster_CombatId",
                table: "Monster",
                column: "CombatId");

            migrationBuilder.CreateIndex(
                name: "IX_Statement_DialogueId",
                table: "Statement",
                column: "DialogueId");

            migrationBuilder.AddForeignKey(
                name: "FK_Monster_Scene_CombatId",
                table: "Monster",
                column: "CombatId",
                principalTable: "Scene",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Player_Scene_CombatId",
                table: "Player",
                column: "CombatId",
                principalTable: "Scene",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Monster_Scene_CombatId",
                table: "Monster");

            migrationBuilder.DropForeignKey(
                name: "FK_Player_Scene_CombatId",
                table: "Player");

            migrationBuilder.DropTable(
                name: "Statement");

            migrationBuilder.DropIndex(
                name: "IX_Player_CombatId",
                table: "Player");

            migrationBuilder.DropIndex(
                name: "IX_Monster_CombatId",
                table: "Monster");

            migrationBuilder.DropColumn(
                name: "combatLog",
                table: "Scene");

            migrationBuilder.DropColumn(
                name: "CombatId",
                table: "Player");

            migrationBuilder.DropColumn(
                name: "CombatId",
                table: "Monster");
        }
    }
}
