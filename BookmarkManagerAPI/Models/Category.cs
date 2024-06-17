namespace BookmarkManagerAPI.Models
{
    public class Category
    {
        private ICollection<Bookmark> bookmarks = new List<Bookmark>();

        public int? Id { get; set; }
        public string? Name { get; set; }
        public ICollection<Bookmark> Bookmarks { get => bookmarks; set => bookmarks = value; }
    }
}