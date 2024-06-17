using Microsoft.EntityFrameworkCore;
using BookmarkManagerAPI.Models;

namespace BookmarkManagerAPI.Data
{
    public class BookmarkContext : DbContext
    {
        public DbSet<Category> Categories { get; set; }
        public DbSet<Bookmark> Bookmarks { get; set; }

        public BookmarkContext(DbContextOptions<BookmarkContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Category>()
                .HasMany(c => c.Bookmarks)
                .WithOne(b => b.Category)
                .HasForeignKey(b => b.CategoryId);
        }
    }
}