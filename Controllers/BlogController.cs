using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FrankBlog.Data;
using FrankBlog.Models;

namespace FrankBlog.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BlogController : ControllerBase
    {
        private readonly BlogDbContext _context;

        public BlogController(BlogDbContext context)
        {
            _context = context;
        }

        // GET: api/Blog
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BlogModel>>> GetFile()
        {
            return await _context.Blogs.ToListAsync();
        }

        // GET: api/Blog/5
        [HttpGet("{id}")]
        public async Task<ActionResult<BlogModel>> GetAppFile(int id)
        {
            var appFile = await _context.Blogs.FindAsync(id);

            if (appFile == null)
            {
                return NotFound();
            }

            return appFile;
        }

        // PUT: api/Blog/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAppFile(int id, BlogModel appFile)
        {
            if (id != appFile.Id)
            {
                return BadRequest();
            }

            _context.Entry(appFile).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AppFileExists(id))
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

        // POST: api/Blog
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<BlogModel>> PostAppFile(BlogModel appFile)
        {
            _context.Blogs.Add(appFile);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAppFile", new { id = appFile.Id }, appFile);
        }

        // DELETE: api/Blog/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAppFile(int id)
        {
            var appFile = await _context.Blogs.FindAsync(id);
            if (appFile == null)
            {
                return NotFound();
            }

            _context.Blogs.Remove(appFile);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool AppFileExists(int id)
        {
            return _context.Blogs.Any(e => e.Id == id);
        }
    }
}
