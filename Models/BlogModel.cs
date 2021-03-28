using Microsoft.AspNetCore.Http;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FrankBlog.Models
{
    public class BlogModel
    {
        [Key]
        public int Id { get; set; }

        [Column(TypeName ="varchar(50)")]
        public string FileName { get; set; }

        public string FileSrc { get; set; }

        // not mapped means not save to sql server
        [NotMapped]
        public IFormFile File { get; set; }

        [NotMapped]
        public string Blog { get; set; }
    }
}
