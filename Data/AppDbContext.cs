using Microsoft.EntityFrameworkCore;
using MStarTest.Models;

namespace MStarTest.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> opts) : base(opts)
        {
        }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<Manufacturer>()
                .HasMany(m => m.Products)
                .WithOne(p => p.Manufacturer)
                .HasForeignKey(p => p.ManufacturerId);

            builder.Entity<ProductType>()
                .HasMany(t => t.Products)
                .WithOne(p => p.ProductType)
                .HasForeignKey(p => p.ProductTypeId);

            builder.Entity<Stock>()
                .HasMany(s => s.Moviments)
                .WithOne(m => m.Stock)
                .HasForeignKey(m => m.StockId);

            builder.Entity<Product>()
                .HasMany(p => p.Moviments)
                .WithOne(m => m.Product)
                .HasForeignKey(m => m.ProductId);
        }



        public DbSet<Product> Products { get; set; }
        public DbSet<Manufacturer> Manufacturers { get; set; }
        public DbSet<ProductType> ProductTypes { get; set; }
        public DbSet<Stock> Stocks { get; set; }
        public DbSet<Movement> Moviments { get; set; }
    }
}
