using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PasswordPicsReact.Data;
using PasswordPicsReact.Web.Views;
using System.Text.Json;

namespace PasswordPicsReact.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImagesController : ControllerBase
    {
        private readonly string _connectionString;

        public ImagesController(IConfiguration config)
        {
            _connectionString = config.GetConnectionString("ConStr");
        }

        [HttpPost("add")]
        public int AddImage(ImageVM vm)
        {
            int index = vm.Base64.IndexOf(',');
            string base64 = vm.Base64.Substring(index + 1);
            byte[] image = Convert.FromBase64String(base64);
            string fileName = $"{Guid.NewGuid()}";
            Image i = new Image { GuidName = fileName, Views = 1 };
            System.IO.File.WriteAllBytes($"Uploads/{fileName}", image);
            ImageRepository repo = new ImageRepository(_connectionString);
            return repo.AddImage(i, vm.Password);
        }

        [HttpGet("byid")]
        public ViewImageVM GetById(int id)
        {
            ImageRepository repo = new ImageRepository(_connectionString);
            Image i = repo.GetById(id);
            repo.AddView(id);

            List<int> alreadyViewed = HttpContext.Session.Get<List<int>>("already-viewed");
            if(alreadyViewed == null)
            {
                alreadyViewed = new List<int>();
            }

            ViewImageVM vm = new ViewImageVM 
            {
                Image = i,
                AllowIn = alreadyViewed.Contains(id)
            };

            if(!vm.AllowIn)
            {
                alreadyViewed.Add(id);
                HttpContext.Session.Set("already-viewed", alreadyViewed);
            }

            return vm;
        }

        [HttpGet("ViewImage")]
        public IActionResult ViewImage(string imageFileName)
        {
            var bytes = System.IO.File.ReadAllBytes($"Uploads/{imageFileName}");
            return File(bytes, "image/jpeg");
        }

        [HttpPost("check")]
        public bool VerifyPassword(VerifyVM vm)
        {
            ImageRepository repo = new ImageRepository(_connectionString);
            return repo.VerifyPassword(vm.Password, vm.ImageId);
        }
    }

    public static class SessionExtensions
    {
        public static void Set<T>(this ISession session, string key, T value)
        {
            session.SetString(key, JsonSerializer.Serialize(value));
        }

        public static T Get<T>(this ISession session, string key)
        {
            string value = session.GetString(key);

            return value == null ? default(T) :
                JsonSerializer.Deserialize<T>(value);
        }
    }
}
