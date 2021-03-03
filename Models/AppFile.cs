using System;
using System.ComponentModel.DataAnnotations;

namespace FrankBlog.Models
{
    public class AppFile
    {
        public int Id { get; set; }

        public byte[] Content { get; set; }

        [Display(Name = "File Name")]
        public string UntrustedName { get; set; }

        [DataType(DataType.Date)]
        public DateTime Upload { get; set; }
    }
}
