using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class AddImageData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ImagePath",
                table: "Posts");

            migrationBuilder.DropColumn(
                name: "ThumbnailPath",
                table: "Posts");

            migrationBuilder.AddColumn<int>(
                name: "ImageDataId",
                table: "Posts",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Images",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    ImagePath = table.Column<string>(type: "TEXT", nullable: false),
                    ThumbNailPath = table.Column<string>(type: "TEXT", nullable: false),
                    ImageWidth = table.Column<int>(type: "INTEGER", nullable: false),
                    ImageHeight = table.Column<int>(type: "INTEGER", nullable: false),
                    ImageSize = table.Column<long>(type: "INTEGER", nullable: false),
                    ImageFormat = table.Column<string>(type: "TEXT", nullable: false),
                    PostId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Images", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Posts_ImageDataId",
                table: "Posts",
                column: "ImageDataId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Posts_Images_ImageDataId",
                table: "Posts",
                column: "ImageDataId",
                principalTable: "Images",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Posts_Images_ImageDataId",
                table: "Posts");

            migrationBuilder.DropTable(
                name: "Images");

            migrationBuilder.DropIndex(
                name: "IX_Posts_ImageDataId",
                table: "Posts");

            migrationBuilder.DropColumn(
                name: "ImageDataId",
                table: "Posts");

            migrationBuilder.AddColumn<string>(
                name: "ImagePath",
                table: "Posts",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ThumbnailPath",
                table: "Posts",
                type: "TEXT",
                nullable: true);
        }
    }
}
