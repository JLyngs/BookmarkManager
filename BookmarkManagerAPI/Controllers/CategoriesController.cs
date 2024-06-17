using BookmarkManagerAPI.Data;
using BookmarkManagerAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;

[ApiController]
[Route("api/[controller]")]
public class CategoriesController : ControllerBase
{
    private readonly BookmarkContext _context;
    private readonly ILogger<CategoriesController> _logger;

    public CategoriesController(BookmarkContext context, ILogger<CategoriesController> logger)
    {
        _context = context;
        _logger = logger;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Category>>> GetCategories([FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 10)
    {
        return await _context.Categories
                             .Skip((pageNumber - 1) * pageSize)
                             .Take(pageSize)
                             .ToListAsync();
    }

    [HttpPost]
    public async Task<ActionResult<Category>> PostCategory(Category category)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        _context.Categories.Add(category);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetCategories), new { id = category.Id }, category);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteCategory(int id)
    {
        var category = await _context.Categories.FindAsync(id);
        if (category == null)
        {
            return NotFound();
        }

        _context.Categories.Remove(category);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}