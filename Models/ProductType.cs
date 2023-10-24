using System.ComponentModel.DataAnnotations.Schema;

namespace MStarTest.Models
{
    [Table("product_types")]
    public class ProductType : SimpleModel    {

        public ICollection<Product> Products { get; set;} = new List<Product>();
    }
}
