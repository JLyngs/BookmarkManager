using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BookmarkManagerAPI.Models;
using BookmarkManagerAPI.Data;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;

namespace BookmarkManagerAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookmarksController : ControllerBase
    {
        private readonly BookmarkContext _context;
        private readonly ILogger<BookmarksController> _logger;

        public BookmarksController(BookmarkContext context, ILogger<BookmarksController> logger)
        {
            _context = context;
            _logger = logger;
        }

        [HttpPost]
        public async Task<ActionResult<Bookmark>> PostBookmark(Bookmark bookmark)
        {
            if (string.IsNullOrEmpty(bookmark.Title))
            {
                return BadRequest("Title is required.");
            }

            _context.Bookmarks.Add(bookmark);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetBookmark), new { id = bookmark.Id }, bookmark);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Bookmark>>> GetBookmarks([FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 10)
        {
            return await _context.Bookmarks
                                 .Skip((pageNumber - 1) * pageSize)
                                 .Take(pageSize)
                                 .ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Bookmark>> GetBookmark(int id)
        {
            var bookmark = await _context.Bookmarks.FindAsync(id);

            if (bookmark == null)
            {
                return NotFound();
            }

            return bookmark;
        }

        [HttpGet("ByCategory/{categoryId}")]
        public async Task<ActionResult<IEnumerable<Bookmark>>> GetBookmarksByCategory(int categoryId)
        {
            var bookmarks = await _context.Bookmarks
                                          .Where(b => b.CategoryId == categoryId)
                                          .ToListAsync();

            if (bookmarks == null || bookmarks.Count == 0)
            {
                return NotFound();
            }

            return bookmarks;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutBookmark(int id, Bookmark bookmark)
        {
            if (id != bookmark.Id)
            {
                return BadRequest();
            }

            _context.Entry(bookmark).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BookmarkExists(id))
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

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBookmark(int id)
        {
            var bookmark = await _context.Bookmarks.FindAsync(id);
            if (bookmark == null)
            {
                return NotFound();
            }

            _context.Bookmarks.Remove(bookmark);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool BookmarkExists(int id)
        {
            return _context.Bookmarks.Any(e => e.Id == id);
        }
    }
}