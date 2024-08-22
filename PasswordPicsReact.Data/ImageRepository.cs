using Microsoft.EntityFrameworkCore;

namespace PasswordPicsReact.Data
{
    public class ImageRepository
    {
        private readonly string _connectionString;

        public ImageRepository(string connectionString)
        {
            _connectionString = connectionString;   
        }

        public int AddImage(Image i, string password)
        {
            i.PasswordHash = BCrypt.Net.BCrypt.HashPassword(password);
            ImagesDataContext context = new ImagesDataContext(_connectionString);
            context.Images.Add(i);
            context.SaveChanges();
            return i.Id;
        }

        public Image GetById(int id)
        {
            ImagesDataContext context = new ImagesDataContext(_connectionString);
            return context.Images.FirstOrDefault(i => i.Id == id);
        }

        public void AddView(int imageId)
        {
            ImagesDataContext context = new ImagesDataContext(_connectionString);
            context.Database.ExecuteSqlInterpolated($"UPDATE Images SET Views = (Views + 1) WHERE Id = {imageId}");
        }

        public bool VerifyPassword(string password, int id)
        {
            Image image = GetById(id);
            return BCrypt.Net.BCrypt.Verify(password, image.PasswordHash);
        }
    }
}
