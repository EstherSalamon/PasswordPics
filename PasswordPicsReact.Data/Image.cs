using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PasswordPicsReact.Data
{
    public class Image
    {
        public int Id { get; set; }
        public string GuidName { get; set; }
        public int Views { get; set; }
        public string PasswordHash { get; set; }
    }
}
