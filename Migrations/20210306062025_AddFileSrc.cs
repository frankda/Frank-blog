using Microsoft.EntityFrameworkCore.Migrations;

namespace FrankBlog.Migrations
{
    public partial class AddFileSrc : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "FileSrc",
                table: "Blogs",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FileSrc",
                table: "Blogs");
        }
    }
}
