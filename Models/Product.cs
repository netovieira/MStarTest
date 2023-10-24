using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MStarTest.Models
{
    [Table("products")]
    public class Product : SimpleModel
    {

        [Column("manufacturer_id")]
        [Required(ErrorMessage = "O campo fabricante é obrigatório.")]
        public int ManufacturerId { get; set; }

        [Column("description")]
        public string? Description { get; set; }


        [Column("price")]
        [Required(ErrorMessage = "O campo preço é obrigatório.")]
        public float Price { get; set; }


        [Column("product_type_id")]
        [Required(ErrorMessage = "O campo tipo é obrigatório.")]
        public int ProductTypeId { get; set; }

        public Manufacturer? Manufacturer { get; set; }

        public string? ManufacturerName { get; set; }

        public ProductType? ProductType { get; set; }

        public string? ProductTypeName { get; set; }

        public ICollection<Movement> Moviments { get; set; } = new List<Movement>();

    }
}
