using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class NPCchanges : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_NPC_Monster_hasMonsterStatsId",
                table: "NPC");

            migrationBuilder.DropIndex(
                name: "IX_NPC_hasMonsterStatsId",
                table: "NPC");

            migrationBuilder.DropColumn(
                name: "Class",
                table: "NPC");

            migrationBuilder.DropColumn(
                name: "Image",
                table: "NPC");

            migrationBuilder.DropColumn(
                name: "Location",
                table: "NPC");

            migrationBuilder.DropColumn(
                name: "hasMonsterStatsId",
                table: "NPC");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Class",
                table: "NPC",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Image",
                table: "NPC",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Location",
                table: "NPC",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "hasMonsterStatsId",
                table: "NPC",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_NPC_hasMonsterStatsId",
                table: "NPC",
                column: "hasMonsterStatsId");

            migrationBuilder.AddForeignKey(
                name: "FK_NPC_Monster_hasMonsterStatsId",
                table: "NPC",
                column: "hasMonsterStatsId",
                principalTable: "Monster",
                principalColumn: "Id");
        }
    }
}
