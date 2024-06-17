namespace BookmarkManagerAPI.Models
{
    public class Bookmark
    {
        public int Id { get; set; }
        public string Title { get; set; } // Ensure this property is not nullable
        public string? Url { get; set; }
        public int CategoryId { get; set; }
        public Category? Category { get; set; }
    }
}