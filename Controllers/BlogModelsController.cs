using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using FrankBlog.Data;
using FrankBlog.Models;
using System.IO;

using System.Net;
using System.Net.Http;

namespace FrankBlog.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BlogModelsController : ControllerBase
    {
        private readonly BlogDbContext _context;
        private readonly IWebHostEnvironment _hostEnvironment;

        public BlogModelsController(BlogDbContext context, IWebHostEnvironment hostEnvironment)
        {
            _context = context;
            this._hostEnvironment = hostEnvironment;
        }

        // GET: api/BlogModels
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BlogModel>>> GetBlogs()
        {
            return await _context.Blogs
                .Select(blog => new BlogModel()
                {
                    FileName = blog.FileName,
                    FileSrc = String.Format("{0}://{1}{2}/Blogs/{3}", Request.Scheme, Request.Host, Request.PathBase, blog.FileName)
                })
                .ToListAsync();
        }

        // GET: api/BlogModels/5
        [HttpGet("{id}")]
        public async Task<ActionResult<BlogModel>> GetBlogModel(int id)
        {
            var blogModel = await _context.Blogs.FindAsync(id);

            if (blogModel == null)
            {
                return NotFound();
            }

            return blogModel;
        }

        // PUT: api/BlogModels/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBlogModel(int id, BlogModel blogModel)
        {
            if (id != blogModel.Id)
            {
                return BadRequest();
            }

            _context.Entry(blogModel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BlogModelExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/BlogModels
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        // form itself has only a file field
        // other field like file name need to handle by controller
        public async Task<ActionResult<BlogModel>> PostBlogModel([FromForm]BlogModel blogModel)
        {
            blogModel.FileName = await SaveBlog(blogModel.File);
            _context.Blogs.Add(blogModel);
            await _context.SaveChangesAsync();

            return StatusCode(201);
        }

        // DELETE: api/BlogModels/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBlogModel(int id)
        {
            var blogModel = await _context.Blogs.FindAsync(id);
            if (blogModel == null)
            {
                return NotFound();
            }

            _context.Blogs.Remove(blogModel);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool BlogModelExists(int id)
        {
            return _context.Blogs.Any(e => e.Id == id);
        }

        [NonAction]
        public async Task<string> SaveBlog(IFormFile file)
        {
            string fileName = new String(Path.GetFileNameWithoutExtension(file.FileName).ToArray()).Replace(' ', '-');
            var existingBlog = _context.Blogs
                .Where(b => b.FileName.Contains(fileName))
                .ToList();
            // TODO: handle error when submitted doc existed in database
            //if (existingBlog.Any())
            //{
            //    Console.WriteLine("handle error");

            //    throw new System.Web.Http.HttpResponseException(HttpStatusCode.NotFound);
            //}
            fileName += Path.GetExtension(file.FileName);
            var filePath = Path.Combine(_hostEnvironment.ContentRootPath, "Blogs", fileName);
            using (var fileStream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(fileStream);
            }
            return fileName;
        }
    }
}
