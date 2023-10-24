using System.ComponentModel.DataAnnotations.Schema;

namespace MStarTest.Models
{

    [Table("manufacturers")]
    public class Manufacturer : SimpleModel
    {
        public ICollection<Product>? Products { get; set; }
    }
}
