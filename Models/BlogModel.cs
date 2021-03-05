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

    }
}
