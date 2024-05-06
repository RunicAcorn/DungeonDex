using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class addingCascade : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Location_Campaigns_CampaignId",
                table: "Location");

            migrationBuilder.DropForeignKey(
                name: "FK_Quest_Campaigns_CampaignId",
                table: "Quest");

            migrationBuilder.AddForeignKey(
                name: "FK_Location_Campaigns_CampaignId",
                table: "Location",
                column: "CampaignId",
                principalTable: "Campaigns",
                principalColumn: "CampaignId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Quest_Campaigns_CampaignId",
                table: "Quest",
                column: "CampaignId",
                principalTable: "Campaigns",
                principalColumn: "CampaignId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Location_Campaigns_CampaignId",
                table: "Location");

            migrationBuilder.DropForeignKey(
                name: "FK_Quest_Campaigns_CampaignId",
                table: "Quest");

            migrationBuilder.AddForeignKey(
                name: "FK_Location_Campaigns_CampaignId",
                table: "Location",
                column: "CampaignId",
                principalTable: "Campaigns",
                principalColumn: "CampaignId");

            migrationBuilder.AddForeignKey(
                name: "FK_Quest_Campaigns_CampaignId",
                table: "Quest",
                column: "CampaignId",
                principalTable: "Campaigns",
                principalColumn: "CampaignId");
        }
    }
}
